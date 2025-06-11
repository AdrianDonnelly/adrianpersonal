<script>
    import {random_title} from "$lib/title";
    import * as Card from "$shadcn/card";
    import {Button} from "$shadcn/button";
    import Twitter from "lucide-svelte/icons/twitter";
    import LinkedIn from "lucide-svelte/icons/linkedin";
    import Email from "lucide-svelte/icons/mail";
    import Instagram from "lucide-svelte/icons/instagram";
    import GitHub from "lucide-svelte/icons/github";
    import {CustomHead} from "$local/head";
    import {Grid} from "$local/grid";
    import {cn} from "$lib/utils";
    import {InfoCard} from "$local/infoCard/index.js";
</script>

<CustomHead image="https://grzegorz.ie/assets/meta_about.png"/>

<div class='
    flex
    flex-col
    w-full
    mx-auto
    border-x
'>
    <div class='w-full flex justify-between items-center bg-muted/25 h-[5rem] border-b'>
        <h2 class='font-bold text-2xl p-2'>
            Contact
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
                   Feel free to reach out!
               </h2>
               <p class='text-muted-foreground m-0 p-2 text-sm hidden md:block'>
                   Feel free to reach out if you have any questions or just want to chat, you can
                   reach out to me on social media or via email (I dont mind). I'm always open to new
                   opportunities and collaborations.
               </p>
           </div>
        </Grid>
    </div>

    <div class="h-6 min-h-6"></div>

    <div class='w-full flex justify-between items-center border-y bg-muted/25'>
        <h2 class='font-bold text-2xl p-2'>
            Want to chat?
        </h2>
    </div>

    <div class="h-6 min-h-6"></div>

    <Card.Root class="border-x-0 border-b-0 rounded-none bg-transparent p-0">
        <Card.Content class="p-0 gap-3 text-white flex justify-between items-center h-[4.5rem] flex-wrap">
            <div class="flex items-center justify-center">
                <div class="fixed-square border-r flex items-center justify-center">
                    <Email size={24} class="stroke-[1.5px] ml-1"/>
                </div>

                <div class="w-full ml-3">
                    <h1 class='font-bold'>
                        Email
                    </h1>

                    <p>
                        <a href="mailto:contact@grzegorz.ie" class="text-primary">
                            contact@grzegorz.ie
                        </a>
                    </p>
                </div>
            </div>

            <Button class="rounded-none hover:bg-primary dark:hover:bg-primary h-full border-l hover:text-black w-[20rem]" variant="ghost" href="mailto:contact@grzegorz.ie">
                Send me an email
            </Button>
        </Card.Content>
    </Card.Root>

    <div class="h-6 border-t min-h-6"></div>

    <Card.Root class="border-x-0 border-b-0 rounded-none bg-transparent p-0">
        <Card.Content class="p-0 gap-3 text-white flex justify-between items-center h-[4.5rem] flex-wrap">
            <div class="flex items-center justify-center">
                <div class="fixed-square border-r flex items-center justify-center">
                    <LinkedIn size={24} class="stroke-[1.5px] ml-1"/>
                </div>

                <div class="w-full ml-3">
                    <h1 class='font-bold'>
                        LinkedIn
                    </h1>

                    <p>
                        <a href="https://www.linkedin.com/in/grzegorz-maniak/" class="text-primary">
                            Grzegorz Maniak
                        </a>
                    </p>
                </div>
            </div>
            <Button class="rounded-none hover:bg-primary dark:hover:bg-primary h-full border-l hover:text-black w-[20rem]" variant="ghost" href="https://www.linkedin.com/in/grzegorz-maniak/">
                Connect on LinkedIn
            </Button>
        </Card.Content>
    </Card.Root>

    <div class="h-6 border-t min-h-6"></div>

    <Card.Root class="border-x-0 border-b-0 rounded-none bg-transparent p-0">
        <Card.Content class="p-0 gap-3 text-white flex justify-between items-center h-[4.5rem] flex-wrap">
            <div class="flex items-center justify-center">
                <div class="fixed-square border-r flex items-center justify-center">
                    <GitHub size={24} class="stroke-[1.5px] ml-1"/>
                </div>

                <div class="w-full ml-3">
                    <h1 class='font-bold'>
                        GitHub
                    </h1>

                    <p>
                        <a href="https://github.com/grzegorzmaniak" class="text-primary">
                            GrzegorzManiak
                        </a>
                    </p>
                </div>
            </div>
            <Button class="rounded-none hover:bg-primary dark:hover:bg-primary h-full border-l hover:text-black w-[20rem]" variant="ghost" href="https://github.com/grzegorzmaniak">
                Follow me on GitHub
            </Button>
        </Card.Content>
    </Card.Root>

    <div class="h-6 border-t min-h-6"></div>

    <Card.Root class="border-x-0 border-b-0 rounded-none bg-transparent p-0">
        <Card.Content class="p-0 gap-3 text-white flex justify-between items-stretch h-[4.5rem] flex-wrap">
            <div class="flex items-center justify-center">
                <div class="fixed-square border-r flex items-center justify-center h-full w-[4.5rem]">
                    <Twitter size={24} class="stroke-[1.5px]"/>
                </div>

                <div class="w-full ml-3">
                    <h1 class='font-bold'>
                        Twitter / X
                    </h1>

                    <p>
                        <a href="https://twitter.com/grzegorzmaniak" class="text-primary">
                            @GrzegorzManiak
                        </a>
                    </p>
                </div>
            </div>
            <Button class="rounded-none hover:bg-primary dark:hover:bg-primary h-full border-l hover:text-black w-[20rem]" variant="ghost" href="https://twitter.com/grzegorzmaniak">
                Follow me on Twitter / X
            </Button>
        </Card.Content>
    </Card.Root>

    <div class="h-6 border-t min-h-6"></div>

    <Card.Root class="border-x-0 rounded-none py-0 bg-transparent">
        <Card.Content class="p-0 gap-3 text-white flex justify-between items-center h-[4.5rem] flex-wrap">
            <div class="flex items-center justify-center">
                <div class="fixed-square border-r flex items-center justify-center">
                    <Instagram size={24} class="stroke-[1.5px] ml-1"/>
                </div>

                <div class="w-full ml-3">
                    <h1 class='font-bold'>
                        Instagram
                    </h1>

                    <p>
                        <a href="https://www.instagram.com/grzegorzmaniak/" class="text-primary">
                            @GrzegorzManiak
                        </a>
                    </p>
                </div>
            </div>
            <Button class="rounded-none hover:bg-primary dark:hover:bg-primary h-full border-l hover:text-black w-[20rem]" variant="ghost" href="https://www.instagram.com/grzegorzmaniak/">
                Follow me on Instagram
            </Button>
        </Card.Content>
    </Card.Root>
</div>

<div class="min-h-[45vh]">

</div>