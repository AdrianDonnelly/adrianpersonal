<script lang='ts'>
    import {FeaturedPosts, RecentPosts} from '$lib/posts';
    import {BigCard, SmallCard} from "$local/post";
    import {CustomHead} from "$local/head";
    import {cn} from "$lib/utils";
    import {InfoCard} from "$local/infoCard/index.js";
    import {Scrambler} from "$lib/components/ui/text"

    // You might need to adjust the paths for these components if they are different in your project.

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

<div class='flex p-10 flex-col w-full  mx-auto -x'>

    <div class='w-full h-full flex justify-between items-center'>
        <h2 class='font-bold text-2xl p-2'>
            Featured Posts
        </h2>
    </div>

    {#if FeaturedPosts && FeaturedPosts.length > 0}
        <div class='w-full h-full flex justify-between items-center md:flex-nowrap flex-wrap'>
            {#each FeaturedPosts as post, i}
                <span class={cn(`flex-grow md:max-w-[50%] max-w-[100%]`, i !== FeaturedPosts.length - 1 && '-r')}>
                    <BigCard {...post}/>
                </span>
            {/each}
        </div>
    {:else}
        <p class="p-4 text-center text-muted-foreground">No featured posts to display yet.</p>
    {/if}

    <div class="h-6 min-h-6 -y"></div>

    <div class='w-full h-full flex justify-between items-center -b bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            Achievements
        </h2>
    </div>

    <div class=" -b flex h-10 items-center">
        <p class="w-10 h-10 -r flex items-center justify-center text-muted-foreground font-bold">
            0
        </p>
        <p class="p-2 text-sm text-muted-foreground">
            Entrepreneurial Endeavors
        </p>
    </div>

    <InfoCard
            buttonLink="/post/_Serros_ML"
            buttonText="Read about it"
            description="A programmable, event-driven AI customer support assistant. Our idea? Streamline customer service without over-relying on LLMs, which are often hit-or-miss when it comes to structured tasks."
            imgAlt="SerrosML"
            imgSrc="/assets/SerrosML.png"
            title="SerrosML"/>

    <div class="w-full border-b flex h-10 items-center">
        <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
            1
        </p>
        <p class="p-2 text-sm text-muted-foreground">
            Studies
        </p>
    </div>
    <InfoCard
            buttonLink=""
            buttonText="Soon"
            description="Completed my 3rd year of Computing with Software Development from Technological University Dublin."
            imgAlt="TU Dublin"
            imgSrc="/assets/tud.png"
            note="3.0 GPA average"
            title="Completed my 3rd year in TU Dublin"/>

    <div class="w-full border-b flex h-10 items-center">
        <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
            2
        </p>
        <p class="p-2 text-sm text-muted-foreground">
            Experience
        </p>
    </div>

    <InfoCard
            buttonLink="/post/_MC_Departure"
            buttonText="Read about it"
            description="Currently Completing a 6 month internship with Mastercard's CTMC team, working primarily in java. During my time here working with my team, it has tought me so much about software development that cant be learned in a classroom"
            imgAlt="Mastercard"
            imgSrc="/assets/mc.png"
            title="Mastercard"/>


    <div class="h-6 min-h-6"></div>

    <div class='w-full h-full flex justify-between items-center -y'>
        <h2 class='font-bold text-2xl p-2'>
            Recent Posts
        </h2>
        <div class="hidden sm:flex align-middle items-center gap-x-3 text-sm text-muted-foreground -l self-stretch">
            <h3 class="text-center w-[8rem] font-bold">
                Date Published
            </h3>
        </div>
    </div>

    {#if RecentPosts && RecentPosts.length > 0}
        <div class='w-full h-full flex flex-col justify-between items-center '>
            {#each RecentPosts as post, i }
                <span class={cn('w-full post-small flex-grow transition duration-200 hover:bg-gray-100 hover:text-black', i !== RecentPosts.length - 1 && '-b')}>
                    <SmallCard {...post}/>
                </span>
            {/each}
        </div>
    {:else}
        <p class="p-4 text-center text-muted-foreground">No recent posts to display yet.</p>
    {/if}

    <div class="h-6 -t min-h-6"></div>

</div>