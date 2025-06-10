<script lang="ts">
	import type {PostData} from "$local/post/index";
	import {AspectRatio} from "$shadcn/aspect-ratio";
	import {cn} from "$lib/utils";
	import SvelteMarkdown from 'svelte-markdown';
	import {Grid} from "$local/grid";
	import {Button} from "@/ui/button";

	let {
		class: className,
		showCoverImage = true,
		headingLevel = 'h1',
		id,
		title,
		body,
		markdown,
		date,
		dateModified,
		cover,
		tags = [],
		people = [],
		link
	} = $props<PostData & {
		class?: string;
		showCoverImage?: boolean;
		headingLevel?: 'h1' | 'h2';
	}>();

	const hasMarkdown = $derived(!!markdown);
	const content = $derived(hasMarkdown ? markdown : body);
	const HeadingTag = $derived(headingLevel);
</script>

<style>
    /* Styles specific to the full article markdown rendering */
    .markdown-container :global(img) { /* Use :global for nested elements */
        max-width: 100%;
        -top: 1px solid var(--);
        -bottom: 1px solid var(--);
        height: auto;
    }

    .markdown-container :global(h1),
    .markdown-container :global(h2),
    .markdown-container :global(h3),
    .markdown-container :global(h4) {
        font-weight: bold;
        -bottom: 1px solid var(--); /* Simplified variable access */

        -top: 1px solid var(--);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background-color: color-mix(in oklab, var(--muted) 25%, transparent)
    }

    .markdown-container :global(h1) {
        font-size: 2rem;
    }

    .markdown-container :global(h2) {
        font-size: 1.5rem;
    }

    .markdown-container :global(h3) {
        font-size: 1.25rem;
    }

    .markdown-container :global(h4) {
        font-size: 1rem;
    }

    .markdown-container :global(p) {
        line-height: 1.5;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .markdown-container :global(em) {
        font-style: italic;
    }

    .markdown-container :global(strong) {
        font-weight: bold;
    }

    .markdown-container :global(blockquote) {
        -left: 0.25rem solid var(--);
        color: inherit;
        background-color: color-mix(in oklab, var(--muted) 25%, transparent);
        padding-bottom: 0.25rem;
    }

    .markdown-container :global(code) {
        background-color: var(--muted); /* Use theme variables */
        padding: 0.2rem 0.4rem;
        -radius: 0.25rem;
        font-size: 0.9em; /* Relative size */
        color: var(--muted-foreground);
    }

    .markdown-container :global(pre) {
        background-color: var(--muted);
        padding: 0.8rem;
        -radius: 0.25rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-size: 0.9em;
        color: var(--foreground);
        overflow-x: auto;
    }

    .markdown-container :global(pre code) {
        background-color: transparent;
        padding: 0;
        -radius: 0;
        font-size: inherit; /* Inherit from pre */
        color: inherit;
    }

    .markdown-container :global(a) {
        color: var(--primary); /* Use theme primary color */
        text-decoration: none;
    }

    .markdown-container :global(a:hover) {
        text-decoration: underline;
    }

    .markdown-container :global(ul),
    .markdown-container :global(ol) {
        padding-left: 1.5rem;
        list-style-position: outside; /* More common */
    }

    .markdown-container :global(ul) {
        list-style-type: disc;
    }

    .markdown-container :global(ol) {
        list-style-type: decimal;
    }

    .markdown-container :global(li) {
        line-height: 1.5;
    }

    .markdown-container :global(table) {
        width: 100%;
        -collapse: collapse;
        : 1px solid var(--);
    }

    .markdown-container :global(th),
    .markdown-container :global(td) {
        : 1px solid var(--);
        padding: 0.5rem 0.75rem;
        text-align: left;
    }

    .markdown-container :global(th) {
        background-color: var(--muted);
        font-weight: bold;
    }

    /* sr-only utility class */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        : 0;
    }
</style>

<article class={cn("w-full flex flex-col", className)} {id} data-tags={tags.join(', ')}>
    <div class='flex flex-col'>
    </div>

    <header class="w-full flex flex-col">
        <div class='flex flex-col gap-5 -b bg-muted/25 items-center'>
            <div class="text-sm flex">
                <time dateTime={date.toISOString()} class={cn(
                    "text-primary p-3 -l px-5 text-center",
                    (!dateModified && !link) && "-r",
                    (!dateModified && link) && "-r",
                )}>
                    Published: {date.toLocaleDateString()}
                </time>

                {#if dateModified}
                    <time dateTime={dateModified.toISOString()} class="text-primary p-3 px-5 -x text-center">
                        Modified: {dateModified.toLocaleDateString()}
                    </time>
                {/if}

                {#if link}
                    <Button class="rounded-none light:hover:bg-primary dark:hover:bg-primary h-full hover:text-black p-3 px-5 -r text-center" variant="ghost" href={link}>
                        View original post
                    </Button>
                {/if}
            </div>
        </div>
    </header>

    {#if showCoverImage && cover}
        <figure>
            <AspectRatio ratio={16 / 9} class="bg-muted rounded-none overflow-hidden">
                <img src={cover} alt="Cover image for {title}" class="object-cover w-full h-full"/>
            </AspectRatio>
        </figure>
    {/if}

    {#if people.length > 0}
        <section aria-label="Mentioned People" class="sr-only">
            <h2>People Mentioned</h2>
            <ul>
                {#each people as person}
                    <li>
                        <span>{person.first_name} {person.last_name}</span>
                        {#if person.links && person.links.length > 0}
                            <ul>
                                {#each person.links as personLink}
                                    <li><a href={personLink[0]} target="_blank"
                                           rel="noopener noreferrer">{personLink[1]}</a></li>
                                {/each}
                            </ul>
                        {/if}
                    </li>
                {/each}
            </ul>
        </section>
    {/if}

    <section class="w-full flex prose max-w-none markdown-container flex-col gap-3 mb-2" aria-label="Post content">
        {#if hasMarkdown}
            <SvelteMarkdown source={content}/>
        {:else}
            <div>
                {@html content.replace(/\n/g, '<br>')}
            </div>
        {/if}
    </section>

    {#if tags.length > 0}
        <div class="h-6 -t min-h-6"></div>
        <div class='w-full h-full flex justify-between items-center -t bg-muted/25'>
            <h2 class='font-bold text-2xl p-2'>
                Tags
            </h2>
        </div>

        <footer class="-t">
            <section aria-label="Tags">
                <ul class="flex flex-row flex-wrap gap-2 p-2">
                    {#each tags as tag}
                        <a href={`/blog?search=${encodeURIComponent(tag)}`}
                           class="inline-block text-xs bg-secondary/50 text-secondary-foreground light:hover:bg-primary hover:text-primary-foreground rounded-none px-1.5 py-0.5 transition-colors duration-150"
                           aria-label={`View posts tagged with ${tag}`}>
                            {tag}
                        </a>
                    {/each}
                </ul>
            </section>
        </footer>
    {/if}
</article>