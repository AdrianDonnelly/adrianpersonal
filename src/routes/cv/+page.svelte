<script lang="ts">
    import { Button } from '$shadcn/button';
    import {random_title} from "$lib/title";
    import {AspectRatio} from "$shadcn/aspect_ratio";
	import {CustomHead} from "$local/head";
	import {Grid} from "$local/grid";
</script>
<div class='
    flex
    flex-col
    w-full
    max-w-screen-lg
    mx-auto
'>
    <div class='w-full flex justify-between items-center bg-muted/25 h-[5rem]'>
        <h2 class='font-bold text-2xl p-2'>
            Curriculum Vitae
        </h2>
    </div>
    <div class="h-6 min-h-6"></div>

    <div class='w-full'>
        <AspectRatio ratio={1/1.414}>
            <iframe
                    title="Adrian Donnelly CV"
                    class='w-full h-full'
                    src="/content/cv.pdf"></iframe>
        </AspectRatio>
    </div>
</div>