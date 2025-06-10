<script lang="ts">
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
	import {Project} from "$local/project/index.js";
</script>

<CustomHead
    description="
    I like to build things. Not everything is worth sharing, but every project teaches me something. I enjoy building things that are useful, fun, interesting, or that just make life easier.
"/>

<div class='
    flex
    flex-col
    w-full
    max-w-screen-lg
    mx-auto
    border-x
'>
    <div class='w-full flex justify-between items-center  bg-muted/25 h-[5rem] border-b'>
        <h2 class='font-bold text-2xl p-2'>
            Projects
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
                    I like to build things
                </h2>
                <p class='text-muted-foreground m-0 p-2 text-sm hidden md:block'>
                    In fact, I build a lot of things. Not everything is worth sharing, but every project teaches me something. I enjoy building things that are useful, fun, interesting, or that just make life easier.
                </p>
            </div>
        </Grid>
    </div>

    <div class="flex items-center justify-start h-[9rem] md:h-[7rem] max-h-[9rem] md:max-h-[7rem] overflow-hidden border-b">
        <p class="p-2 border-r flex items-center justify-center bg-white font-black text-background text-[8rem]" style="height: inherit">
            !
        </p>

        <p class='text-white p-2 px-4 flex flex-col items-start gap-1 flex-grow leading-tight'>
            <span class="font-bold">
                Before we get started
            </span>
            This is not a complete list of my projects, just the ones I was bothered to write about.
            If you want to see more, check out my GitHub
        </p>

        <Button
                class="hidden md:flex rounded-none hover:bg-primary dark:hover:bg-primary border-l hover:text-black w-[10rem] min-w-[10rem] h-[7rem] items-center justify-center bg-background"
                variant="ghost" href="https://git.grzegorz.ie"
                target="_blank"
                rel="noopener noreferrer"
        >
            GitHub
        </Button>
    </div>

    <Button
            class="flex md:hidden rounded-none hover:bg-primary dark:hover:bg-primary border-b hover:text-black w-full h-[3rem] items-center justify-center bg-background"
            variant="ghost" href="https://git.grzegorz.ie"
            target="_blank"
            rel="noopener noreferrer"
    >
        GitHub
    </Button>

    <Project
        index={0}
        indexTitle="This site!"
        buttons={[
            {
                text: "Homepage",
                link: "https://grzegorz.ie"
            }
        ]}
        imgSrc="/assets/projects/this_site.png"
        imgAlt="Screenshot of the homepage"
        title="Grzegorz.ie - Personal Website, Portfolio, and Blog"
        technologies="SvelteKit, Tailwind CSS, GitHub Pages, Cloudflare, Shadcn"
    >
        {#snippet description()}
            This is my personal website, portfolio, and blog. It is built with SvelteKit and
            Tailwind CSS. It is then statically generated and hosted on GitHub Pages, It sits
            behind a Cloudflare proxy for security and performance.
            <br/>
            <br/>
            The blog section is a custom solution that allows me to statically generate the
            blog posts and host them on GitHub Pages, hence the super fast loading times.
        {/snippet}
    </Project>

    <Project
            index={1}
            indexTitle="Scratch but for AI Agents!"
            buttons={[
                {
                    text: "View Frontend on GitHub",
                    link: "https://github.com/GrzegorzManiak/EFBlocks"
                },
                {
                    text: "View Backend on GitHub",
                    link: "https://github.com/GrzegorzManiak/EFBlocksServer-main"
                },
                {
                    text: "Read the Blog Post",
                    link: "https://grzegorz.ie/post/_New_Chapter_The_Bridge"
                }
            ]}
            imgSrc="/assets/projects/blocks.png"
            imgAlt="Screenshot of the scratch like editor"
            title="AI Blocks - Scratch for AI Agents"
            technologies="SvelteKit, Tailwind CSS, Konva, Node.js, Express, OpenAI API, ElevenLabs API"
    >
        {#snippet description()}
            At the Entrepreneurs First EBL hackathon in Milan, I built a
            Scratch-style drag-and-drop frontend (using Konva + a custom
            renderer) for creating AI agents via visual programming.

            <br/><br/>

            The system transpiles block-based workflows into a tree structure,
            which is then converted into syntactically sugared JavaScript
            and evaluated in a sandboxed runtime with a custom standard
            library.

            <br/><br/>

            This made it easy to abstract over APIs like Gladia, ElevenLabs,
            OpenAI, Mailgun, Twilio, and more, letting users chain actions
            like voice input, text handling, TTS, and webhooks with zero code.

            <span class="text-muted-foreground">
                <br/><br/>
                Please keep in mind this was built on zero sleep in under 24 hours—so go easy on the code!
            </span>
        {/snippet}
    </Project>

    <Project
            index={2}
            indexTitle="Final year project for my BSc in Computing"
            buttons={[
            {
                text: "See the code on GitHub",
                link: "https://github.com/GrzegorzManiak/Sealed.Email"
            },
            {
                text: "Read the research document",
                link: "https://github.com/GrzegorzManiak/Sealed.Email/blob/main/docs/NoiseEmail.pdf"
            }
        ]}
            imgSrc="/assets/projects/sealed.png"
            imgAlt="Screenshot of the email client"
            title="Sealed.Email - Client-to-Client Encrypted Email Service"
            technologies="Go, MariaDB, AWS, React, Tailwind CSS, Docker, ECR, ECS, S3, Etcd, Nginx, Route53, Cloudflare"
    >
        {#snippet description()}
            Noise.email is a privacy-first, end-to-end encrypted email platform
            I built while picking up Go for the first time, because why not learn
            a new language *and* write a crypto system at the same time?

            <br/><br/>

            It uses
            Argon2 for password hashing, SHA-256 for message integrity, and
            asymmetric key pairs for encryption between users. Messages are
            stored encrypted-at-rest, and the backend strictly avoids handling
            plaintext.

            <br/><br/>
            I also built a minimal SMTP/IMAP-compatible API layer and a custom
            frontend for zero-knowledge key handling, aiming for full client-side
            trustlessness.

        {/snippet}
    </Project>

    <Project
            index={3}
            indexTitle="Go Library for Web App Security & Session Management"
            buttons={[
        {
            text: "See the code on GitHub",
            link: "https://github.com/grzegorzmaniak/gothic"
        }
    ]} imgSrc="/assets/projects/gothic.png"
        imgAlt="GoThic library conceptual image or logo"
        title="GoThic - Go Token Handler for Identity and Control"
        technologies="Go, Gin, RBAC, CSRF, JWT, Cookies"
    >
    {#snippet description()}
        GoThic is a Go library designed to provide robust session management,
        CSRF (Cross-Site Request Forgery) protection, and RBAC (Role-Based
        Access Control) for web applications, particularly those built with
        frameworks like Gin. It focuses on security, extensibility, and a
        clear request processing lifecycle.

        <br/><br/>

        <ul class="list-disc pl-4">
            <li><strong>Secure Session Management:</strong> Manages user sessions using encrypted cookies, handling creation, validation, refresh, and association of custom data (claims).</li>
            <li><strong>CSRF Protection:</strong> Implements the synchronized token pattern (double submit cookie), with tokens linkable to authenticated sessions.</li>
            <li><strong>Role-Based Access Control (RBAC):</strong> Provides a flexible system for resource access control based on user roles and permissions, with caching.</li>
            <li><strong>Structured Request Lifecycle:</strong> Defines a clear process for handling HTTP requests, encompassing session handling, CSRF validation, RBAC checks, input processing, logic execution, and response generation.</li>
        </ul>
    {/snippet}
    </Project>
</div>


<div class="min-h-[45vh]">

</div>