<script lang="ts">
    import { setMode, mode } from "mode-watcher";
    import { buttonVariants } from "$shadcn/button";


    function handleModeChange() {
        if ($mode === "dark")
            setMode("light");
         else
            setMode("dark");

    }
</script>

<div class="w-screen">
    <div class="flex flex-col gap-4 p-4 md:p-6 w-full max-w-screen-lg mx-auto border-b min-h-[3rem] border-x">

        <div class="w-full h-full flex justify-between items-center align-middle flex-wrap sm:flex-nowrap">
            <div class="flex gap-4 items-center">
                <a
                        href="/"
                        class="md:text-2xl font-bold sm:text-lg"
                >Adrian Donnelly</a>
            </div>

            <div class="flex items-center sm:gap-2 md:gap-4 gap-2">
                <a href="/blog" class="sm:text-sm md:text-lg text-sm font-medium">Blog</a>
                <a href="/projects" class="sm:text-sm md:text-lg text-sm font-medium">Projects</a>
                <a href="/contact" class="sm:text-sm md:text-lg text-sm font-medium">Contact</a>
                <a href="/about" class="sm:text-sm md:text-lg text-sm font-medium">About</a>
                <a href="/cv" class="sm:text-sm md:text-lg text-sm font-medium">CV</a>

<!--                &lt;!&ndash; Theme Toggle &ndash;&gt;-->
<!--                <div class="flex items-center gap-2">-->
<!--                    <button-->
<!--                            class={buttonVariants({ variant: "ghost" })}-->
<!--                            on:click={handleModeChange}>-->
<!--                        {#if $mode !== "dark"}-->
<!--                            <span class="text-sm">🌙</span>-->
<!--                        {:else}-->
<!--                            <span class="text-sm">☀️</span>-->
<!--                        {/if}-->
<!--                    </button>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</div>