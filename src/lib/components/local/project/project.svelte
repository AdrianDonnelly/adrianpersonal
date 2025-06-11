<script lang="ts">
	import * as Card from "$shadcn/card";
	import {Button} from "$shadcn/button";
	import {cn} from "$lib/utils";
	import {AspectRatio} from "$shadcn/aspect-ratio";
    import type {Snippet} from "svelte";

	let {
		index = 0,
		indexTitle = "This site!",
		buttons = [],
		imgSrc = "/assets/project.png",
		imgAlt = "Project Image",
		title = "",
		technologies = "",
        description,
	} = $props<{
		index?: number;
		indexTitle?: string;
		buttons?: { text: string; link: string }[];
		title?: string;
		technologies?: string;
		imgSrc?: string;
		imgAlt?: string;
		description?: Snippet;
	}>();
</script>

<div class="flex h-10 items-center">
    <p class="w-10 h-10 flex items-center justify-center text-muted-foreground font-bold">
        {index}
    </p>
    <p class="p-2 text-sm text-muted-foreground">
        {indexTitle}
    </p>
</div>

<Card.Root class="border-0 rounded-none py-0 bg-transparent">
    <Card.Content class="p-0 text-white flex flex-col">
        <div class="flex flex-col md:flex-row w-full">
            <div class="flex flex-col md:w-[50rem]">
                <div class="w-full">
                    <div class="hidden md:block">
                        <AspectRatio ratio={16/9}>
                            <img src={imgSrc} alt={imgAlt} class="h-full w-full object-cover"/>
                        </AspectRatio>
                    </div>

                    <div class="md:hidden w-full ">
                        <img src={imgSrc} alt={imgAlt} class="w-full h-auto object-contain"/>
                    </div>
                </div>


                <div class="flex flex-col items-stretch h-full">
                    {#each buttons as button, i}
                        <Button
                                class={cn(
                                    "rounded-none light:hover:bg-primary dark:hover:bg-primary hover:text-black w-full items-center justify-center min-h-[3rem] flex-1 md:border-b-0",
                                    i === buttons.length - 1 ? "" : "",
                                )}
                                variant="ghost"
                                href={button.link}
                        >
                            {button.text}
                        </Button>
                    {/each}
                </div>
            </div>

            <div class="w-full md:border-l p-4 md:p-2 border-b md:border-b-0">
                <div class="flex flex-col mb-2">
                    <h1 class="font-bold">
                        {title}
                    </h1>

                    {#if technologies}
                        <p class="text-sm text-muted-foreground font-normal">
                            {technologies}
                        </p>
                    {/if}
                </div>

                <div>
                    {@render description?.()}
                </div>
            </div>
        </div>
    </Card.Content>
</Card.Root>