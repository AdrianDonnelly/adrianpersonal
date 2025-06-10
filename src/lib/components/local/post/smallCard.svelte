<script lang="ts">
	import type {PostData} from "$local/post/index";
	import {cn} from "$lib/utils";

	let {
		class: className,
		headingLevel = 'h3',
		id, title, date, tags = []
	} = $props<Pick<PostData, 'id' | 'title' | 'date' | 'tags'> & {
		class?: string;
		headingLevel?: 'h2' | 'h3';
	}>();

	const HeadingTag = $derived(headingLevel);
	const dateWidth = "w-[8rem]";
</script>

<article
        data-tags={tags.join(', ')}
        class={cn("flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 w-full", className)}
        id={id}>

    <header class="flex-grow p-4">
        <svelte:element this={HeadingTag} class="text-base md:text-lg font-medium">
            <a href={`/post/${id}`} class="text-primary hover:underline">
                {title ?? 'Untitled Post'}
            </a>
        </svelte:element>

        <div class="flex flex-wrap gap-x-2 gap-y-1 items-center text-sm text-muted-foreground list-none mt-1">
            {#each tags.slice(0,3) as tag}
                <li>
                    <a href={`/blog?search=${encodeURIComponent(tag)}`}
                       class="inline-block text-xs bg-secondary/50 text-secondary-foreground light:hover:bg-primary hover:text-primary-foreground rounded-none px-1.5 py-0.5 transition-colors duration-150"
                       aria-label={`View posts tagged with ${tag}`}>
                        {tag}
                    </a>
                </li>
            {/each}

            {#if tags.length > 3}
                <li>
                    <a href={`/blog?search=${encodeURIComponent(tags.slice(3).join(','))}`}
                       class="inline-block text-xs bg-secondary/50 text-secondary-foreground light:hover:bg-primary hover:text-primary-foreground rounded-none px-1.5 py-0.5 transition-colors duration-150"
                       aria-label={`View posts tagged with ${tags.slice(3).join(', ')}`}>
                        +{tags.length - 3}
                    </a>
                </li>
            {/if}
        </div>
    </header>

    <div class="hidden sm:flex align-middle items-center gap-x-3 text-sm text-muted-foreground border-l self-stretch">
        <time dateTime={date.toISOString()} class={cn(dateWidth, "text-center")}>
            {date.toLocaleDateString()}
        </time>
    </div>
</article>