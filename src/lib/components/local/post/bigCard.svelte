<script lang="ts">
    import type {PostData} from "$local/post/index";
    import {AspectRatio} from "$shadcn/aspect-ratio";
    import {cn} from "$lib/utils";

    let {
        class: className,
        trunkAt = 150,
        headingLevel = 'h1',
        titleStyle = 'h-[60px] text-2xl ',
        id, title, body, date, cover, tags = []
    } = $props<PostData & {
        class?: string;
        trunkAt?: number;
        headingLevel?: 'h2' | 'h3';
        titleStyle?: string;
        descriptionStyle?: string;
    }>();

    const HeadingTag = $derived(headingLevel);
    const truncatedBody = $derived(body ? (body.length > trunkAt ? body.slice(0, trunkAt) + '...' : body) : '');
    const needsTruncation = $derived(body ? body.length > trunkAt : false);

    function navigate() {
        window.location.href = `/post/${id}`;
    }
</script>

<article
        class={cn(
            "flex flex-col gap-3 w-full overflow-hidden text-card-foreground rounded-none p-2 ",
            className
        )}
        data-tags={tags.join(', ')}
        id={id}>

    {#if cover}
        <div class="cursor-pointer"
             onclick={navigate}
             onkeydown={(e) => { if (e.key === 'Enter') navigate() }}
             tabindex="0"
             role="link"
             aria-label={`Read more about ${title}`}>
            <AspectRatio ratio={16 / 9} class="bg-muted">
                <img src={cover} alt={`Cover image for ${title}`}
                     class="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"/>
            </AspectRatio>
        </div>
    {/if}

    <section aria-label="Tags" class="mt-auto my-3 h-[25px] overflow-hidden px-4">
        {#if tags.length > 0}
            <ul class="flex flex-row gap-1.5 overflow-hidden">
                {#each tags.slice(0, 5) as tag}
                    <li>
                        <a href={`/blog?search=${encodeURIComponent(tag)}`}
                           class="inline-block text-xs bg-secondary/50 text-secondary-foreground light:hover:bg-primary light:hover:text-muted dark:hover:text-muted-foreground rounded-none px-1.5 py-0.5 transition-colors duration-150"
                           aria-label={`View posts tagged with ${tag}`}>
                            {tag}
                        </a>
                    </li>
                {/each}
            </ul>
        {/if}

        {#if tags.length > 5}
            <li>
                <a href={`/blog?search=${encodeURIComponent(tags.slice(3).join(','))}`}
                   class="inline-block text-xs bg-secondary/50 text-secondary-foreground light:hover:bg-primary light:hover:text-muted dark:hover:text-muted-foreground rounded-none px-1.5 py-0.5 transition-colors duration-150"
                   aria-label={`View posts tagged with ${tags.slice(3).join(', ')}`}>
                    +{tags.length - 5}
                </a>
            </li>
        {/if}
    </section>

    <div class="flex flex-col flex-grow">
        <header class="w-full flex flex-col gap-1 mb-2 px-4">
            <svelte:element class={cn(titleStyle, "text-primary overflow-hidden")} this={HeadingTag}>
                <a class="text-primary hover:underline line-clamp-2" href={`/post/${id}`}>
                    {title}
                </a>
            </svelte:element>
        </header>


        {#if needsTruncation}
            <div class="mt-auto text-right w-full flex justify-end">
            </div>
        {/if}
    </div>
</article>