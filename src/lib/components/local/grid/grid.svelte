<script lang="ts">
    import {cn} from "$lib/utils";

	let {
		rows = 1,
        smallRows = 1,
        columns = 1,
        smallColumns = 1,
        slotRows = 2,
        slotColumns = 6,
        class: className = "",
        cellClass = "",
		children
    } = $props<{
        rows?: number;
		smallRows?: number;
        columns?: number;
		smallColumns?: number;
		cellClass?: string;
        class?: string;
    }>();

	let parentWidth = $state(0);
	let sqaureSize = $state(0);

	let slotX = $state(0);
	let slotY = $state(0);

	let isSmall = $state(false);
	let _columns = $state(columns);
	let _rows = $state(rows);

	$effect(() => {
        isSmall = parentWidth < 640;
        _columns = isSmall ? smallColumns : columns;
        _rows = isSmall ? smallRows : rows;
    });

	$effect(() => {
		sqaureSize = parentWidth / _columns;

		const centerX = Math.floor(_columns / 2);
		const centerY = Math.floor(_rows / 2);

		slotX = centerX - Math.floor(slotColumns / 2);
		slotY = centerY - Math.floor(slotRows / 2);
    });
</script>

<div bind:clientWidth={parentWidth} class={cn(className, "relative")}>
    {#each Array(_rows) as _, rowIndex}
        <div class="flex">
            {#each Array(_columns) as _, columnIndex}
                <div
                    class={cn(
                        columnIndex < columns - 1 ? "border-r" : "",
                        rowIndex < rows - 1 ? "border-b" : "",
                        cellClass
                    )}
                    style="width: {sqaureSize}px; height: {sqaureSize}px; transition: color 0.3s ease-in-out, transform 0s;"
                >
                </div>
            {/each}
        </div>
    {/each}

    {#if slotX > 0 && slotY > 0}
        <div
            class="absolute top-0 left-0"
            style="
                left: {slotX * sqaureSize}px;
                top: {slotY * sqaureSize}px;
                width: {slotColumns * sqaureSize}px;
                height: {slotRows * sqaureSize}px;
            "
        >
            {@render children?.()}
        </div>
    {/if}
</div>