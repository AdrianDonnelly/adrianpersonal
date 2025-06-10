<script lang="ts">
	import { BigCard, type PostData } from "$local/post/index";

	let { start = 0, end = undefined, data = [] } = $props<{
		start?: number;
		end?: number;
		data?: PostData[];
	}>();

	const items = $derived(data.slice(start, end));
</script>

{#each items as post (post.id)}
    <BigCard {...post} />
    <div class="h-6 border-y"></div>
{/each}