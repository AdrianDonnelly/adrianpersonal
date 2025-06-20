import type {PeopleData, PostData, SitemapURL} from "./schemas";

const RouteTemplate = `
<script lang="ts">/**
    THIS FILE IS AUTOGENERATED. DO NOT MODIFY.
    IT WILL BE OVERWRITTEN ON THE NEXT BUILD.
**/
    import {Article} from "$local/article";
    import {<ARTICLE_ID> as ArticleData } from "$lib/generated/posts";
</script>
<Article {...ArticleData}/>
`;

const PostDataArticleTemplate = `
const <ARTICLE_ID>: PostData = <ARTICLE_DATA>;
`;

const PeopleTemplate = `/**
    THIS FILE IS AUTOGENERATED. DO NOT MODIFY.
    IT WILL BE OVERWRITTEN ON THE NEXT BUILD.
**/
export type PeopleData = {
    first_name: string;
    last_name: string;
    links?: Array<[string, string]>
};
export const People: Record<string, PeopleData> = {
    <PEOPLE>
};
`;

const PostDataTemplate = `/**
    THIS FILE IS AUTOGENERATED. DO NOT MODIFY.
    IT WILL BE OVERWRITTEN ON THE NEXT BUILD.
**/
import { People, type PeopleData } from './people';
type PostData = {
    id: string;
    title: string;
    body?: string;
    link?: string;
    date: Date;
    dateModified?: Date;
    stringDate: string;
    markdown: string;
    cover: string;
    tags: Array<string>;
    people?: Array<PeopleData>;
    links?: Array<{
        title: string;
        url: string;
    }>;
};

<ARTICLES>

const FeaturedArticles = [<FEAT_ARTICLE_IDS>];
const PostYears: Array<[number, number]> = [<YEARS>];
const AllArticles = [<ARTICLE_IDS>];
export { <ARTICLE_IDS>, AllArticles, PostYears, FeaturedArticles };
`;

const SiteMapTemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    <SITE_MAP>
</urlset>
`;

function BuildPeopleObject(people: Record<string, PeopleData>): string {
    const stringified = [];
    for (const [key, value] of Object.entries(people)) stringified.push(`${key}: ${JSON.stringify(value)}`);
    const joined = stringified.join(',\n    ');
    return PeopleTemplate.replace('<PEOPLE>', joined);
}

function BuildPeopleReferences(people: Array<string>): string {
    const stringified = [];
    for (const person of people) stringified.push(`People.${person}`);
    const joined = stringified.join(', ');
    return joined;
}

function BuildPostDataObject(article: PostData): string {
    const peopleReferences = BuildPeopleReferences((article?.people || []) as unknown as Array<string>);
    const stringDate = `new Date('${article.date.toISOString()}')`;

    // @ts-ignore
    article.date = '<DATE>';
    let stringified = JSON.stringify(article).replace(/"people":\["(.*?)"]/g, `"people":[${peopleReferences}]`);

    if (article.dateModified) {
        const lastModified = `new Date('${article.dateModified.toISOString()}')`;
        stringified = stringified.replace(/"dateModified":"(.*?)"/g, `"dateModified":${lastModified}`);
    }

    stringified = stringified.replace(/"date":"(.*?)"/g, `"date":${stringDate}`);
    return PostDataArticleTemplate.replace('<ARTICLE_DATA>', stringified).replace('<ARTICLE_ID>', article.id);
}

function BuildPostDataObjectArray(articles: Record<string, PostData>, years: Array<[number, number]>, featured: Record<string, PostData>): string {
    const stringified = [];
    const ids = [];
    for (const [key, value] of Object.entries(articles)) {
        stringified.push(BuildPostDataObject(value));
        ids.push(key);
    }

    const joined = stringified.join('\n');
    const joinedIds = ids.join(', ');
    const yearsStringified = years.map(([year, count]) => `[${year}, ${count}]`).join(', ');

    const featIds = [];
    for (const [key] of Object.entries(featured)) featIds.push(key);
    const joinedFeatIds = featIds.join(', ');

    let template = PostDataTemplate.replace('<ARTICLES>', joined);
    template = template.replace('<ARTICLE_IDS>', joinedIds);
    template = template.replace('<ARTICLE_IDS>', joinedIds);
    template = template.replace('<YEARS>', yearsStringified);
    template = template.replace('<FEAT_ARTICLE_IDS>', joinedFeatIds);

    return template;
}

function BuildRouteTemplate(articleId: string): string {
    return RouteTemplate.replace('<ARTICLE_ID>', articleId);
}

function BuildSiteMap(urls: Array<SitemapURL>, posts: Record<string, PostData>): string {
    const stringified = [];
    for (const url of urls) {
        stringified.push(`
    <url>
        <loc>https://adriandonnelly.me/${url.path}</loc>
        <priority>${url.priority}</priority>
        <changefreq>${url.changefreq}</changefreq>
    </url>`);
    }
    for (const [key] of Object.entries(posts)) {
        stringified.push(`
    <url>
        <loc>https://adriandonnelly.me/post/${key}</loc>
        <priority>0.5</priority>
        <changefreq>daily</changefreq>
    </url>`);
    }
    const joined = stringified.join('\n');
    return SiteMapTemplate.replace('<SITE_MAP>', joined);
}

export {
    BuildPeopleObject,
    BuildPostDataObject,
    BuildPostDataObjectArray,
    BuildRouteTemplate,
    BuildSiteMap
};
