export type LinkData = {
    title: string;
    url: string;
};

export type PeopleData = {
    first_name: string;
    last_name: string;
    links?: Array<[string, string]>
};

export type PostData = {
    id: string;
    title: string;
    body?: string;
    link?: string;
    date: Date;
    dateModified?: Date;
    stringDate?: string;
    cover: string;
    tags: Array<string>;
    people?: Array<PeopleData>;
    links?: Array<LinkData>;
    markdown?: string;
};

export { default as Post } from './post.svelte';
export { default as PostList } from './list.svelte';
export { default as SmallCard } from './smallCard.svelte';
export { default as BigCard } from './bigCard.svelte';