<script lang='ts'>
    import {FeaturedPosts, RecentPosts} from '$lib/posts';
    import {BigCard, SmallCard} from "$local/post";
    import {CustomHead} from "$local/head";
    import {cn} from "$lib/utils";
    import {InfoCard} from "$local/infoCard/index.js";
    import {Scrambler} from "$lib/components/ui/text"

    // You might need to adjust the paths for these components if they are different in your project.
    // test
    // Define breadCrumbs dynamically within the <script> block
    let breadCrumbs = [
        {name: "Home", url: "https://adriandonnelly.me/"},
        {name: "About", url: "https://adriandonnelly.me/about"},
        {name: "Contact", url: "https://adriandonnelly.me/contact"},
        {name: "Blog", url: "https://adriandonnelly.me/blog"},
        {name: "Projects", url: "https://adriandonnelly.me/projects"},
        {name: "Resume", url: "https://adriandonnelly.me/cv"},
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


<div class="w-dvw h-dvh text-sm sm:text-xl md:text-2xl justify-center items-center font-normal text-light overflow-hidden p-12 sm:p-20 flex flex-col md:p-24 space-y-10 bg-black text-white">
    <div class="text-left w-full">
        <Scrambler
                characters="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z . ! ? : ; ' + − * / = > < € $ £ ¥ & @ # % _ ~ \ | ( ) [ ] < >"
                className="font-azeret-mono"
                revealDirection="start"
                scrambleSpeed={50}
                sequential={true}
                text="Adrian Donnelly"
                useOriginalCharsOnly={false}
        />
        <Scrambler
                characters="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z . ! ? : ; ' + − * / = > < € $ £ ¥ & @ # % _ ~ \ | ( ) [ ] < >"
                className="font-azeret-mono"
                revealDirection="start"
                scrambleSpeed={50}
                sequential={true}
                text="Software Engineer"
                useOriginalCharsOnly={false}
        />
    </div>
</div>

<div class='flex pt-10 flex-col col-span-2 w-full mx-auto'>

    <div class='w-full h-full flex justify-between items-center'>
        <h2 class='font-bold text-2xl p-2'>
            Featured Posts
        </h2>
    </div>

    {#if FeaturedPosts && FeaturedPosts.length > 0}
        <div class='h-full grid grid-cols-1 md:grid-cols-2 gap-4 pb-5'>
            {#each FeaturedPosts as post}
                <div class="col-span-1">
                    <BigCard {...post}/>
                </div>
            {/each}
        </div>
    {:else}
        <p class="p-4 text-center text-muted-foreground">No featured posts to display yet.</p>
    {/if}

    <div class="h-6 min-h-6 -y"></div>
</div>