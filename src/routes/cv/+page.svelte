<script lang="ts">
    import { Button } from '$shadcn/button';
    import {random_title} from "$lib/title";
    import {AspectRatio} from "$shadcn/aspect_ratio";
	import {CustomHead} from "$local/head";
	import {Grid} from "$local/grid";
</script>

<CustomHead
        description="
Yep, This is my CV, it is definitely a CV, no doubt about it.
"/>

<div class='
    flex
    flex-col
    w-full
    max-w-screen-lg
    mx-auto
    border-x
'>
    <div class='w-full flex justify-between items-center bg-muted/25 h-[5rem] border-b'>
        <h2 class='font-bold text-2xl p-2'>
            Curriculum Vitae
        </h2>
    </div>


    <div class='flex flex-col'>
        <Grid
                rows={4}
                smallRows={4}
                columns={12}
                smallColumns={8}
                class="w-full h-full border-b"
                cellClass="hover:bg-primary dark:hover:bg-primary transition-color duration-500"
        >
            <div class="border-r border-b h-full p-2 flex flex-col items-center justify-center bg-[#09090b]">
                <h2 class='font-bold text-2xl '>
                    Yep, this is my CV
                </h2>
                <p class='text-muted-foreground m-0 p-2 text-sm hidden md:block'>
                    This is my CV, it is definitely a CV, no doubt about it. If you'd like to know more about me, please check out the <a href="/about" class="text-primary">About</a> page, or if you want
                    my contact details, check out the <a href="/contact" class="text-primary">Contact</a> page.
                </p>
            </div>
        </Grid>
    </div>

    <div class="h-6 min-h-6"></div>

    <div class='w-full'>
        <AspectRatio ratio={1/1.414}>
            <iframe
                    title="Grzegorz Maniak CV"
                    class='w-full h-full'
                    src="/content/cv.pdf"></iframe>
        </AspectRatio>
    </div>
</div>