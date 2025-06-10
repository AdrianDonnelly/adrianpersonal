<script lang="ts">
	import * as Card from "$shadcn/card";
	import {Button} from "$shadcn/button";
	import {cn} from "$lib/utils";

	let {
		buttonText = "Find out more",
        buttonLink = "",
        imgSrc = "",
        imgAlt = "",
        note = "",
        title = "",
        description = "",
        className = ""
    } = $props<{
        buttonText?: string;
        buttonLink?: string;
        note?: string;
        title?: string;
        description?: string;
        imgSrc?: string;
        imgAlt?: string;
        className?: string;
    }>();
</script>

<Card.Root class={cn("border-0 rounded-none md:border-b py-0 bg-transparent", className)}>
    <Card.Content class="p-0 text-white flex flex-col md:flex-row md:items-center">
        <div class="flex items-stretch w-full md:max-h-[6rem]">

            {#if imgSrc}
                <div class="h-full">
                    <div class={cn(
                    "flex items-center justify-center h-full",
                    "w-[4rem] h-[4rem] min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem]",
                    "md:w-[6rem] md:h-[6rem] md:min-w-[6rem] md:max-w-[6rem] md:min-h-[6rem] md:max-h-[6rem]"
                )}>
                        <img src={imgSrc} alt={imgAlt} class="md:w-[6rem] md:h-[6rem] h-full w-full object-contain"/>
                    </div>
                </div>
            {/if}

            <div class={cn("w-full h-full p-2", {
                "border-l": imgSrc,
            })} style="height: inherit">
                <h1 class='font-bold leading-tight text-primary'>
                    {title}
                </h1>

                {#if note}
                    <p class="text-sm text-muted-foreground font-normal leading-tight">
                        {note}
                    </p>
                {/if}

                <p class="leading-tight text-muted-foreground">
                    {description}
                </p>
            </div>

            <Button class="hidden text-primary md:flex rounded-none dark:hover:bg-primary light:hover:bg-primary border-t border-b border-y-0 border-l dark:hover:text-black  w-[10rem] min-w-[10rem] h-[6rem] items-center justify-center"
                    variant="ghost" href={buttonLink}>
                {buttonText}
            </Button>
        </div>

        <Button class="block text-primary md:hidden rounded-none dark:hover:bg-primary light:hover:bg-primary border-t border-b dark:hover:text-black w-full"
                variant="ghost" href={buttonLink}>
            {buttonText}
        </Button>
    </Card.Content>
</Card.Root>