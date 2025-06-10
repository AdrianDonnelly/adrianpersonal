<script lang='ts'>
    import { FeaturedPosts, PostYears, RecentPosts, Posts } from '$lib/posts';
    import { BigCard, SmallCard } from "$local/post";
    import { Button } from "$shadcn/button";
    import { CustomHead } from "$local/head";
    import { cn } from "$lib/utils";
    import * as Card from "$shadcn/card";
    import { InfoCard } from "$local/infoCard/index.js";
    import { Separator } from "$lib/components/ui/separator";

    // You might need to adjust the paths for these components if they are different in your project.

    // Define breadCrumbs dynamically within the <script> block
    let breadCrumbs = [
        { name: "Home", url: "https://adriandonnelly.me/" },
        { name: "About", url: "https://adriandonnelly.me/about" },
        { name: "Contact", url: "https://adriandonnelly.me/contact" },
        { name: "Blog", url: "https://adriandonnelly.me/blog" },
        { name: "Projects", url: "https://adriandonnelly.me/projects" },
        //{ name: "Resume", url: "https://adriandonnelly.me/cv" },
    ];

    // Conditionally add RecentPosts to breadCrumbs
    if (RecentPosts && RecentPosts.length > 0) {
        breadCrumbs = [
            ...breadCrumbs, // Spread existing items
            ...RecentPosts.slice(0, 3).map(post => ({ // Spread the new items
                name: post.title,
                url: `/post/${post.id}`
            }))
        ];
    }
</script>

<svelte:head>
    <title>Adrian Donnelly</title>
    <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
    <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
</svelte:head>

<CustomHead
        {breadCrumbs}
/>
<style>
    /* These styles are taken directly from your example and adapted for dark mode */
    .fade-bottom {
        background: #09090B; /* Dark background color */
        background: linear-gradient(0deg, rgba(9, 9, 11, 1) 0%, rgba(9, 9, 11, 1) 7%, rgba(9, 9, 11, 0) 100%);
    }

    .fade-top {
        background: #09090B; /* Dark background color */
        background: linear-gradient(180deg, rgba(9, 9, 11, 1) 0%, rgba(9, 9, 11, 1) 7%, rgba(9, 9, 11, 0) 100%);
    }

    .circle-gradient {
        background: #ffffff; /* Light background for the gradient start */
        background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(9, 9, 11, 1) 85%); /* Gradient from transparent white to dark */
    }

    /* Styles for hover effect on small posts, adapted for better visibility if needed */
    .post-small:hover li,
    .post-small:hover header time,
    .post-small:hover section a,
    .post-small:hover a,
    .post-small:hover time {
        background-color: inherit;
        color: black !important; /* Ensure text color becomes black on hover */
    }
    .post-small:hover .read-more {
        background-color: rgb(243 244 246 / var(--tw-bg-opacity)); /* Tailwind gray-100 */
    }
</style>

<div class='flex flex-col w-full max-w-screen-lg mx-auto border-x'>

    <div class='w-full h-full flex justify-between items-center border-y bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            Featured Posts
        </h2>
    </div>

    {#if FeaturedPosts && FeaturedPosts.length > 0}
        <div class='w-full h-full flex justify-between items-center md:flex-nowrap flex-wrap'>
            {#each FeaturedPosts as post, i}
                <span class={cn(`flex-grow md:max-w-[50%] max-w-[100%]`, i !== FeaturedPosts.length - 1 && 'border-r')}>
                    <BigCard {...post}/>
                </span>
            {/each}
        </div>
    {:else}
        <p class="p-4 text-center text-muted-foreground">No featured posts to display yet.</p>
    {/if}

    <div class="h-6 min-h-6 border-y"></div>

    <div class='w-full h-full flex justify-between items-center border-b bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            What have I been up to?
        </h2>
    </div>

    <div class=" border-b flex h-10 items-center">
        <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
            0
        </p>
        <p class="p-2 text-sm text-muted-foreground">
            Entrepreneurial Endeavors
        </p>
    </div>

    <InfoCard
            buttonText="Learn More"
            buttonLink="/post/my-entrepreneurial-journey"
            imgSrc="/assets/ef.png"
            imgAlt="Entrepreneurial Journey"
            title="Launching a New Venture"
            description="Actively exploring and building new projects in the startup space, leveraging my software development background to bring innovative ideas to life."
    />

    <div class=" border-b flex h-10 items-center">
        <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
            1
        </p>
        <p class="p-2 text-sm text-muted-foreground">
            Academic Achievements
        </p>
    </div>
    <InfoCard
            buttonText="View Transcript"
            buttonLink="/cv"
            imgSrc="/assets/tud.png"
            imgAlt="TU Dublin"
            note="Achieved a First Class Honours degree."
            title="Graduated from Technological University Dublin"
            description="Successfully completed a comprehensive program in Computing with Software Development, focusing on modern software engineering principles and practices."
    />

    <div class=" border-b flex h-10 items-center">
        <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
            2
        </p>
        <p class="p-2 text-sm text-muted-foreground">
            Professional Experience
        </p>
    </div>

    <InfoCard
            buttonText="Read about it"
            buttonLink="/post/mastercard-experience"
            imgSrc="/assets/mc.png"
            imgAlt="Mastercard"
            title="Software Engineer at Mastercard"
            description="Gained valuable experience working on high-performance Java and TypeScript microservices within Mastercard's MPGS team, contributing to critical payment solutions."
    />

    <div class="h-6 min-h-6"></div>

    <div class='w-full h-full flex justify-between items-center border-y bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            Recent Posts
        </h2>
        <div class="hidden sm:flex align-middle items-center gap-x-3 text-sm text-muted-foreground border-l self-stretch">
            <h3 class="text-center w-[8rem] font-bold">
                Date Published
            </h3>
        </div>
    </div>

    {#if RecentPosts && RecentPosts.length > 0}
        <div class='w-full h-full flex flex-col justify-between items-center '>
            {#each RecentPosts as post, i }
                <span class={cn('w-full post-small flex-grow transition duration-200 hover:bg-gray-100 hover:text-black', i !== RecentPosts.length - 1 && 'border-b')}>
                    <SmallCard {...post}/>
                </span>
            {/each}
        </div>
    {:else}
        <p class="p-4 text-center text-muted-foreground">No recent posts to display yet.</p>
    {/if}

    <div class="h-6 border-t min-h-6"></div>

    <div class='w-full h-full flex justify-between items-center border-y bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            Archive
        </h2>
    </div>

    {#if PostYears && PostYears.length > 0}
        <div class='w-full h-full flex justify-between items-center'>
            {#each PostYears as year, i}
                <a class={cn(
                    "flex-grow pl-5 py-2 hover:bg-gray-100 hover:text-black transition duration-200",
                    i !== PostYears.length - 1 && 'border-r',)}
                   href="/blog?year={year[0]}">
                    <h2 class="text-xl font-bold">{year[0]}</h2>
                    <p class="text-muted-foreground text-sm">{year[1]} posts</p>
                </a>
            {/each}
        </div>
    {:else}
        <p class="p-4 text-center text-muted-foreground">No archives to display yet.</p>
    {/if}

    <div class="h-6 border-t min-h-6"></div>

    <div class='w-full h-full flex justify-between items-center border-y bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            View All Posts
        </h2>
        <div class="flex align-middle items-center gap-x-3 text-sm text-muted-foreground border-l self-stretch">
            <h3 class="text-center px-5">
                {Posts?.length ?? 0} Posts across {PostYears?.length ?? 0} Years
            </h3>
        </div>
    </div>

    <div class='border-b'>
        <Button href='/blog' class='w-full p-7 rounded-none light:hover:bg-primary dark:hover:bg-primary hover:text-black' variant="ghost">
            View All Posts
        </Button>
    </div>
</div>