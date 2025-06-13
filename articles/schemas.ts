import * as NV from 'noise_validator';

type ParsedFile = {
    ArticleID: string;
    ContentLocation: string;
    Hash: string;
    Extension: string;
}

type ParsedFiles = Array<ParsedFile>;

type LinkData = {
    title: string;
    url: string;
};

type PeopleData = {
    first_name: string;
    last_name: string;
    links?: Array<[string, string]>
};

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
    links?: Array<LinkData>;
};

const LinkSchema = new NV.Schema({
    title: NV.String,
    url: NV.String
});

const PeopleSchema = new NV.Schema({
    first_name: NV.String,
    last_name: NV.String,
    links: NV.Optional(NV.Array(NV.Array(NV.String)))
});

const PostSchema = new NV.Schema({
    title: NV.String,
    body: NV.Optional(NV.String),
    link: NV.Optional(NV.String),
    date: NV.String,
    dateModified: NV.Optional(NV.String),
    cover: NV.String,
    tags: NV.Array(NV.String),
    links: NV.Optional(NV.Array(LinkSchema)),
    people: NV.Optional(NV.Array(NV.String))
});

type SitemapURL = {
    path: string,
    priority: number,
    changefreq: string
};

type Config = {
    sitemap: Array<SitemapURL>
    featured: Array<string>
};

const SitemapSchema = new NV.Schema({
    path: NV.String,
    priority: NV.Number,
    changefreq: NV.String
});

const ConfigSchema = new NV.Schema({
    sitemap: NV.Array(SitemapSchema),
    featured: NV.Array(NV.String)
});

export type {
    LinkData,
    PeopleData,
    PostData,
    Config,
    SitemapURL,
    ParsedFiles,
    ParsedFile
}

export {
    LinkSchema,
    PeopleSchema,
    PostSchema,
    ConfigSchema
}