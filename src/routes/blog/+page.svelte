<script lang='ts'>
	import {browser} from '$app/environment';
	import {Posts, RecentPosts, searcher} from '$lib/posts';
	import {Label} from "$shadcn/label";
	import {Input} from "$shadcn/input";
	import {type PostData, PostList} from "$local/post";
	import {CustomHead} from "$local/head";
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import * as Pagination from "$shadcn/pagination";
	import {Grid} from "$local/grid";
    import {onMount} from "svelte";

	// --- State using Svelte 5 Runes ---
	let currentPage = $state(1);
	let archive = $state(false);
	let archiveYear = $state(0);
	let filteredPosts = $state<PostData[]>([...Posts]);

	const perPage = 3;
	let search = "";

	// --- Derived State ---
	const start = $derived((currentPage - 1) * perPage);
	const end = $derived(start + perPage);

	// --- Search Debounce ---
	let debounceTimer: number;

	function debouncedExecuteSearch(searchTerm: string): void {
		clearTimeout(debounceTimer);
		debounceTimer = window.setTimeout(() => executeSearch(searchTerm), 200);
	}

	// --- Functions ---
	function executeSearch(searchTerm: string): void {
		searchTerm = searchTerm.trim();
		let basePosts = [...Posts];
		let newFilteredPosts = searchTerm === "" ? basePosts : searcher.search(searchTerm) as PostData[];

		if (archive) newFilteredPosts = newFilteredPosts.filter((post: PostData) => {
			try {
				const postDate = typeof post.date === 'string' ? new Date(post.date) : post.date;
				const postYear = postDate.getFullYear();
				return !isNaN(postYear) && postYear === archiveYear;
			} catch (e) {
				console.error("Invalid date encountered for post:", post.id, post.date);
				return false;
			}
		});

		filteredPosts = newFilteredPosts;
		currentPage = 1;
	}

	// - Effect to sync state with URL params
	$effect(() => {
		if (!browser) return;
		const urlParams = new URLSearchParams(window.location.search);
		const yearParam = urlParams.get('year');
		const searchParam = urlParams.get('search');

		const newArchive = yearParam !== null;
		const newArchiveYear = parseInt(yearParam || '0');
		const newSearch = searchParam || "";

		let stateChanged = false;

		if (archive !== newArchive) {
			archive = newArchive;
			stateChanged = true;
		}

		if (archiveYear !== newArchiveYear) {
			archiveYear = newArchiveYear;
			stateChanged = true;
		}

		if (search !== newSearch) {
			search = newSearch;
			stateChanged = true;
		}

		if (stateChanged) executeSearch(newSearch);
	});

    // - Stupid hack for a stupid bug
    // 'TypeError: Cannot read properties of undefined (reading 'disabled')' on
    // pagination when navigating to the page from a link
    let isMounted = $state(false);
    onMount(() => {
        isMounted = true;
    });
</script>

<CustomHead
        title="Blog Posts"
        description="Search, browse, and read blog posts."
        image="https://grzegorz.ie/assets/metadata_image.png"
        breadCrumbs={[
            { name: "Home", url: "https://grzegorz.ie/" },
            ...RecentPosts.map(post => ({
                name: post.title,
                url: `/post/${post.id}`
            }))
        ]}
/>

<div class='flex flex-col w-full max-w-screen-lg mx-auto min-h-[95vh] border-x border-b'>
    <div class='w-full flex justify-between items-center  bg-muted/25 h-[5rem] border-b'>
        <h2 class='font-bold text-2xl p-2'>
            Blog
        </h2>
    </div>

    <div class='flex flex-col'>
        <Grid
                rows={4}
                columns={12}
                smallColumns={8}
                smallRows={4}
                class="w-full h-full border-b"
                cellClass="hover:bg-primary dark:hover:bg-primary transition-color duration-500"
        >
            <div class="border-r border-b h-full p-2 flex flex-col items-center justify-center gap-1 bg-[#09090b]">
                <h2 class='font-bold text-2xl '>
                    Search
                </h2>
                <p class='text-muted-foreground m-0 hidden md:block md:gap-2'>
                    Search for posts by title, content, tags, years, or authors.
                </p>
                <Input
                        bind:value={search}
                        oninput={() => debouncedExecuteSearch(search)}
                        type="text"
                        class="rounded-none border-0 bg-muted/25"
                        id="search-input"
                        placeholder="Search for posts..."/>
            </div>
        </Grid>
    </div>


    <div class="h-6  min-h-6"></div>
    <div class='w-full flex justify-between items-center border-y bg-muted/25 h-[5rem]'>
        <h2 class='font-bold text-2xl p-2'>
            {#if archive}
                Archive {archiveYear}
            {:else}
                Posts
            {/if}
        </h2>

        <p class="text-sm text-muted-foreground p-2">
            {filteredPosts.length} posts found
        </p>
    </div>


    {#if filteredPosts.length === 0 || !isMounted}
        <div class="flex-grow flex items-center justify-center">
            <p class='text-muted-foreground text-center'>
                No posts found matching your criteria.
            </p>
        </div>
    {:else}
        <div class='flex flex-col flex-grow bg-mute'>
            <div class='flex flex-col'>
                <PostList start={start} end={end} data={filteredPosts}/>
            </div>

            <div class='flex justify-center bg-muted/25 p-4'>
                <Pagination.Root
                        count={filteredPosts.length}
                        perPage={perPage}
                        bind:page={currentPage}
                >
                    {#snippet children({pages, currentPage: _currentPage})}
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.PrevButton/>
                            </Pagination.Item>

                            {#each pages as page (page.key)}
                                {#if page.type === "ellipsis"}
                                    <Pagination.Item>
                                        <Pagination.Ellipsis/>
                                    </Pagination.Item>
                                {:else}
                                    <Pagination.Item isVisible={_currentPage === page.value}>
                                        <Pagination.Link
                                                {page}
                                                isActive={_currentPage === page.value}
                                                aria-label={`Go to page ${page.value}`}
                                        >
                                            {page.value}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                {/if}
                            {/each}

                            <Pagination.Item>
                                <Pagination.NextButton/>
                            </Pagination.Item>
                        </Pagination.Content>
                    {/snippet}
                </Pagination.Root>
            </div>
        </div>
    {/if}
</div>