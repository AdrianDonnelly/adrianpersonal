import fs from 'fs';
import {type Config, type ParsedFiles, PeopleSchema, type PostData, PostSchema} from "./schemas";
import type {PeopleData} from "../src/lib/components/local/post";
import {BuildPeopleObject, BuildPostDataObjectArray, BuildRouteTemplate, BuildSiteMap} from "./templates";
import fsExtra from 'fs-extra';
import stripMarkdown from 'remove-markdown';
import {ConvertReference, ConvertReferences, SplitTableOfContents} from "./markdown";
import {ReadConfig} from "./config";
import sharp from "sharp";

const posts = './articles/posts';
const build = './articles/build';
const folders = fs.readdirSync(posts);
const contentDir = '/images/';
console.log(`Found ${folders.length} posts, building...`);

// -- Prep the build process
if (fs.existsSync(build)) fs.rmdirSync(build, { recursive: true });
fs.mkdirSync(build);

const PostYears: Array<[number, number]> = [];
const Files: ParsedFiles = [];
const People: Record<string, PeopleData> = {};
let RawPosts: Record<string, PostData> = {};

async function ReadPeople() {
    const people = Bun.file(`./articles/people.json`, { type: 'application/json' });
    const peopleData = await people.json();
    for (const [key, value] of Object.entries(peopleData)) People[key] = await PeopleSchema.validate(value) as unknown as PeopleData;
    console.log(`Loaded ${Object.keys(People).length} people.`);
}

function ReadArticle(folder: string) {
    const markdown = Bun.file(`${posts}/${folder}/article.md`, { type: 'text/markdown' });
    const metadata = Bun.file(`${posts}/${folder}/article.json`, { type: 'application/json' });
    fs.mkdirSync(`${posts}/${folder}/content`, { recursive: true });
    const content = fs.readdirSync(`${posts}/${folder}/content`);

    return {
        markdown,
        metadata,
        content
    };
}

async function BuildArticle(folder: string) {
    const {markdown, metadata, content} = ReadArticle(folder);
    const validatedMetadata = await PostSchema.validate(await metadata.json()) as unknown as PostData;

    validatedMetadata.date = new Date(validatedMetadata.date);
    const year = validatedMetadata.date.getFullYear();
    const index = PostYears.findIndex(([y, _]) => y === year);
    if (index === -1) PostYears.push([year, 1]);
    else PostYears[index][1]++;

    validatedMetadata.stringDate = validatedMetadata.date.toLocaleDateString('en-IE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (validatedMetadata.dateModified) {
        validatedMetadata.dateModified = new Date(validatedMetadata.dateModified);
        if (validatedMetadata.dateModified.getTime() < validatedMetadata.date.getTime())
            console.warn(`Post ${folder} has a last modified date before the original date.`);
        console.log(`Post ${folder} has a last modified date.`);
    }

    validatedMetadata.markdown = await markdown.text();
    content.forEach((file) => {
        const location = `${posts}/${folder}/content/${file}`;
        Files.push({
            ArticleID: folder,
            ContentLocation: location,
            Hash: Bun.hash(location).toString(),
            Extension: 'webp'
        })
    });

    validatedMetadata.cover = ConvertReference(validatedMetadata.cover, folder, contentDir, Files);
    validatedMetadata.markdown = ConvertReferences(validatedMetadata.markdown, folder, contentDir, Files);

    const people = validatedMetadata.people || [];
    for (const person of people) if (!People[person as unknown as string]) throw new Error(`Person ${person} not found in People.`);

    if (
        (!validatedMetadata.body || validatedMetadata.body.length === 0) &&
        (!validatedMetadata.markdown || validatedMetadata.markdown.length === 0)
    ) throw new Error(`Post ${folder} has no body or markdown content.`);

    if (validatedMetadata.markdown && validatedMetadata.markdown.length > 0) {
        const [_, data] = SplitTableOfContents(validatedMetadata.markdown);
        const stripped = stripMarkdown(data);
        if (stripped.length < 100) console.warn(`Post ${folder} has less than 100 words.`);
        validatedMetadata.body = stripped.slice(0, 200);
    }

    let id = folder.replace(/-/g, '_');
    id = '_' + id.trim();

    validatedMetadata.id = id;
    RawPosts[id] = validatedMetadata;

    console.log(`
--- Post ${folder} ---
Title: ${validatedMetadata.title}
Date: ${validatedMetadata.stringDate}
Cover: ${validatedMetadata.cover}
People: ${people.join(', ')}
Tags: ${validatedMetadata.tags.join(', ')}
    `)
}

async function BuildStaticFolder(config: Config) {
    console.log(`Sorting Posts Years...`);
    PostYears.sort((a, b) => a[0] - b[0]);

    console.log(`Sorting Posts...`);
    const sortedPosts = [];
    for (const post of Object.values(RawPosts)) sortedPosts.push(post);
    sortedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
    RawPosts = {};
    for (const post of sortedPosts) RawPosts[post.id] = post;

    console.log(`Fetching Featured Posts...`);
    const featured = sortedPosts.filter((post) => config.featured.includes(post.id));
    if (featured.length !== config.featured.length) throw new Error(`Featured posts not found.`);
    const featuredPosts: Record<string, PostData> = {};
    for (const post of featured) featuredPosts[post.id] = post;

    console.log(`Creating People file...`);
    const peopleFile = Bun.file(`${build}/src/lib/generated/people.ts`, { type: 'text/javascript' });
    await Bun.write(peopleFile, BuildPeopleObject(People));

    console.log(`Creating Post files...`);
    const postFiles = Bun.file(`${build}/src/lib/generated/posts.ts`, { type: 'text/javascript' });
    await Bun.write(postFiles, BuildPostDataObjectArray(RawPosts, PostYears, featuredPosts));

    console.log(`Creating Routes file...`);
    for (const postID of Object.keys(RawPosts)) {
        fs.mkdirSync(`${build}/src/routes/post/${postID}`, { recursive: true });
        const route = Bun.file(`${build}/src/routes/post/${postID}/+page.svelte`, { type: 'text/html' });
        await Bun.write(route, BuildRouteTemplate(postID));
    }

    console.log(`Creating Sitemap file...`);
    const sitemap = Bun.file(`${build}/static/sitemap.xml`, { type: 'text/xml' });
    await Bun.write(sitemap, BuildSiteMap(config.sitemap, RawPosts));
}

async function Build() {
    await ReadPeople();
    const config = await ReadConfig();
    console.log(`Loaded ${config.featured.length} featured posts.`);

    for (const folder of folders) {
        console.log(`Building ${folder}...`);
        await BuildArticle(folder);
        console.log(`Built ${folder}\n`);
    }

    console.log('Building static folder...');
    await BuildStaticFolder(config);

    console.log('Build complete, copying files...');
    fsExtra.copySync(`${build}/src`, './src', { overwrite: true });
    fsExtra.copySync(`${build}/static`, './static', { overwrite: true });
    console.log('Files copied');

    console.log(`Copying ${Files.length} images / content...`);
    for (const { ContentLocation, Hash } of Files) {
        const newPath = `./static/${contentDir}/${Hash}.webp`.replace(/\/\//g, '/');
        console.log(`Copying ${ContentLocation} to ${newPath}`);
        if (await Bun.file(newPath).exists()) {
            console.log(`File ${newPath} already exists, skipping.`);
            continue;
        }
        await sharp(ContentLocation).webp({
            nearLossless: true,
        }).toFile(newPath);
    }
}

await Build();
