<script lang="ts">
	import {Post, type PostData, SmallCard} from "$local/post/index";
    import {cn} from "$lib/utils";
    import {Author, Publisher} from "$lib/people";
    import {onMount} from "svelte";
    import {GetRandomPosts, RecentPosts} from "$lib/posts";

    import Twitter from "lucide-svelte/icons/twitter";
    import LinkedIn from "lucide-svelte/icons/linkedin";
    import Email from "lucide-svelte/icons/mail";
    import Link from "lucide-svelte/icons/link";
	import {Button} from "@/ui/button";
    import {InfoCard} from "$local/infoCard";


    type Props = PostData & { class?: string };
    type $$props = Props;
    let className: $$props["class"];
    const props = $$props as Props & { class?: string };

	function truncate(text: string, length: number = 155) {
		if (!text) return '';
		if (text.length <= length) return text;
		let truncated = text.substring(0, length);
		let lastSpace = truncated.lastIndexOf(' ');
		if (lastSpace > 0) truncated = truncated.substring(0, lastSpace);
		return truncated + '...';
	}

    const randomPosts = GetRandomPosts(3);
    const tags = props.tags ?? [];
    const formattedTags = tags.map(tag => tag.replace(/ /g, '-').toLowerCase());
    const peopleTags = (props.people ?? []).map(person => `${person.first_name}-${person.last_name}`.toLowerCase());
    const titleTags = props.title.split(' ').map(tag => tag.toLowerCase());
    const allTags = [...formattedTags, ...peopleTags, ...titleTags];
    const prettyTags = allTags.join(', ');
	const postDescription = truncate(props.body ?? '', 155);
	const publishedDate = props.date.toISOString();
	const modifiedDate = props.dateModified?.toISOString() ?? publishedDate;
	const id = props.id;
	const cover = props.cover ?? 'https://adriandonnelly.me//logo.png';
	const title = props.title ?? 'Adrian Donnelly';

	const tagOpen = `<script type="application/ld+json">`;
	const tagClose = `<\/script>`;
</script>

<svelte:head>
    <title>{props.title} - Adrian Donnelly</title>
    <meta name="description" content={postDescription} />
    <meta name="keywords" content={prettyTags} />

    <meta name="googlebot-news" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="https://adriandonnelly.me//post/{props.id}" />

    <meta property="og:title" content="{props.title} - Adrian Donnelly" />
    <meta property="og:description" content={postDescription} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={props.cover} />
    <meta property="og:url" content="https://adriandonnelly.me//post/{props.id}" />
    <meta property="og:site_name" content="Adrian Donnelly" />

    {#if publishedDate} <meta property="article:published_time" content={publishedDate} /> {/if}
    {#if modifiedDate} <meta property="article:modified_time" content={modifiedDate} /> {/if}
    {#each allTags as tag} <meta property="article:tag" content={tag} /> {/each}

    <meta property="article:author" content="Adrian Donnelly" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{props.title} - Adrian Donnelly" />
    <meta name="twitter:description" content={postDescription} />
    <meta name="twitter:image" content={props.cover} /> <link rel="icon" href="/favicon.ico" type="image/x-icon" />

    {@html tagOpen + JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": postDescription,
        "image": cover,
        "author": {
            "@type": "Person",
            "name": "Adrian Donnelly",
            "url": "https://adriandonnelly.me//about"
        },
        "publisher": {
            "@type": "Person",
            "name": "Adrian Donnelly",
            "logo": {
                "@type": "ImageObject",
                "url": "https://adriandonnelly.me//logo.png"
            }
        },
        "url": `https://adriandonnelly.me//post/${id}`,
        "datePublished": publishedDate,
        "dateModified": modifiedDate,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://adriandonnelly.me//post/${id}`
        }
    }) + tagClose}
</svelte:head>

<div class={cn(className, 'w-screen flex justify-center items-center ')}>
    <div class='w-full h-full flex flex-col align-top -x'>
        <Post {...props}/>

        <div class="h-6 -t min-h-6"></div>
        <div class='w-full h-full flex justify-between items-center -y bg-muted/25'>
            <h2 class='font-bold text-2xl p-2'>
                Share
            </h2>
        </div>

        <div class="flex justify-center">
            <a
                href={`https://www.twitter.com/intent/tweet?text=Check out this post on Adrian Donnelly's blog: ${props.title}&url=https://adriandonnelly.me//post/${props.id}`}
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 -x p-3 light:hover:bg-primary dark:hover:bg-primary hover:text-black"
                aria-label="Share on Twitter / X"
            >
                <Twitter size={24} class="stroke-[1.5px]"/>
                <p class="sr-only">Share on Twitter</p>
            </a>

            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&title=${props.title}&summary=${props.body}&url=https://adriandonnelly.me//post/${props.id}`}
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 -r p-3 light:hover:bg-primary dark:hover:bg-primary hover:text-black"
                aria-label="Share on LinkedIn"
            >
                <LinkedIn size={24} class="stroke-[1.5px]"/>
                <p class="sr-only">Share on LinkedIn</p>
            </a>

            <a
                href={`mailto:?subject=${props.title}&body=Check out this post on Adrian Donnelly's blog: https://adriandonnelly.me//post/${props.id}`}
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 -r p-3 light:hover:bg-primary dark:hover:bg-primary hover:text-black"
                aria-label="Share via Email"
            >
                <Email size={24} class="stroke-[1.5px]"/>
                <p class="sr-only">Share via Email</p>
            </a>

            <a
                on:click={() => navigator.clipboard.writeText(`https://adriandonnelly.me//post/${props.id}`)}
                href="#"
                class="text-gray-400 -r p-3 light:hover:bg-primary dark:hover:bg-primary hover:text-black"
                aria-label="Copy Link"
            >
                <Link size={24} class="stroke-[1.5px]"/>
                <p class="sr-only">Copy Link</p>
            </a>
        </div>

        {#if props.people ?? 0 > 0}
            <div class="h-6 -t min-h-6"></div>
            <div class='w-full h-full flex justify-between items-center -t bg-muted/25'>
                <h2 class='font-bold text-2xl p-2'>
                    People Mentioned
                </h2>
            </div>

            <section aria-label="People Mentioned" class="flex justify-between align-middle flex-col">
                <div class="flex flex-col -b">
                    {#each props.people ?? [] as person, i}
                        <div class="-t flex items-start h-full">
                            <div
                                    style="height: inherit"
                                    class="-r h-full flex-grow">
                                <p class="md:w-10 md:min-w-10 w-[4rem] min-h-10 min-w-[4rem] flex items-center justify-center text-muted-foreground font-bold">
                                    {i + 1}
                                </p>
                            </div>

                            {#if person.links ?? 0 > 0}
                                <Button
                                        style="height: inherit;"
                                        class="rounded-none light:hover:bg-primary dark:hover:bg-primary p-2 w-[50%] min-w-[50%] max-w-[50%] h-full hover:text-black  px-2  flex items-start justify-start"
                                        variant="ghost" href={(person.links ?? [['', '']])[0][0]}>
                                    {person.first_name} {person.last_name}
                                </Button>
                            {:else}
                                <span
                                        style="height: inherit;"
                                        class="p-2 w-[50%] min-w-[50%] max-w-[50%]">
                                    {person.first_name} {person.last_name}
                                </span>
                            {/if}

                            <div
                                    style="height: inherit"
                                    class="flex flex-col w-full md:w-[50%] h-full overflow-hidden">
                                {#each person.links ?? [] as link, j}
                                    <div style="height: inherit" class={cn("flex items-center overflow-hidden", j !== (person.links ?? []).length - 1 && '-b')}>
                                        <div
                                                style="height: inherit;"
                                                class="w-full md:w-[35%] md:min-w-[35%] -l text-left">

                                            <Button
                                                    style="height: inherit;"
                                                    class="rounded-none light:hover:bg-primary dark:hover:bg-primary text-xs h-full hover:text-black p-1 text-left px-2 w-full "
                                                    variant="ghost" href={link[0]}>
                                                {link[1]}
                                            </Button>
                                        </div>

                                        <div class="flex-grow h-full -l hidden md:block overflow-ellipsis">
                                            <Button
                                                    class="hidden md:flex items-center justify-start w-full p-2 px-2 text-xs text-muted-foreground light:hover:bg-primary dark:hover:bg-primary hover:text-black rounded-none"
                                                    variant="ghost"
                                                    href={link[0]}
                                            >
                                                {link[0]}
                                            </Button>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </section>
        {/if}

        {#if props.links ?? 0 > 0}
            <div class="h-6 min-h-6"></div>
            <div class='w-full h-full flex justify-between items-center -t bg-muted/25'>
                <h2 class='font-bold text-2xl p-2'>
                    Links
                </h2>
            </div>

            <div class="flex flex-col -b">
                {#each props.links ?? [] as link, i }
                    <div class=" -t flex h-[4rem] md:h-10 items-center overflow-hidden">
                        <p class="md:w-10 md:min-w-10 w-[4rem] min-w-[4rem] -r flex items-center justify-center text-muted-foreground font-bold h-[4rem] md:h-10">
                            {i + 1}
                        </p>

                        <Button
                                style="height: inherit;"
                                class="rounded-none light:hover:bg-primary dark:hover:bg-primary p-2 w-full md:w-[50%] h-full hover:text-black px-2 flex items-start justify-start"
                                variant="ghost" href={link.url}>
                            {link.title}
                        </Button>

                        <Button
                                class="hidden md:flex items-center justify-start w-1/2 h-full p-2 px-2 text-xs text-muted-foreground -l whitespace-nowrap light:hover:bg-primary dark:hover:bg-primary hover:text-black rounded-none"
                                variant="ghost"
                                href={link.url}
                        >
                            {link.url}
                        </Button>
                    </div>
                {/each}
            </div>
        {/if}

        <div class="h-6 min-h-6"></div>
        <div class='w-full h-full flex justify-between items-center -y bg-muted/25'>
            <h2 class='font-bold text-2xl p-2'>
                Read More
            </h2>
            <div class="hidden sm:flex align-middle items-center gap-x-3 text-sm text-muted-foreground -l self-stretch">
                <h3 class="text-center w-[8rem] font-bold">
                    Date Published
                </h3>
            </div>
        </div>

        <div class='w-full h-full flex flex-col justify-between items-center '>
            <style>
                .post-small:hover li,
                .post-small:hover header time,
                .post-small:hover section a,
                .post-small:hover a,
                .post-small:hover time {
                    background-color: inherit;
                    color: black!important;
                }
                .post-small:hover .read-more {
                    background-color: rgb(243 244 246 / var(--tw-bg-opacity));
                }
            </style>

            {#each randomPosts as post, i}
                <span class={cn('w-full post-small flex-grow transition duration-200 hover:bg-gray-100 hover:text-black', i !== RecentPosts.length - 1 && '-b')}>
                    <SmallCard {...post}/>
                </span>
            {/each}
        </div>

        <div class="h-6 min-h-6"></div>

    </div>
</div>