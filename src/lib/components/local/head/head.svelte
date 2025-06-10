<script lang="ts">
	const {
		image = "https://adriandonnelly.me/assets/meta_about.png",
        title = "Adrian Donnelly — Software Engineer",
        description = "Hey, I’m Greg, Computing with Software Development grad from TU Dublin. I’m into building secure, scalable systems with privacy baked in. Always happy to chat.",
        breadCrumbs = [
            { name: "Home", url: "https://adriandonnelly.me/" },
            { name: "About", url: "https://adriandonnelly.me/about" },
            { name: "Contact", url: "https://adriandonnelly.me/contact" },
            { name: "Blog", url: "https://adriandonnelly.me/blog" },
            { name: "Projects", url: "https://adriandonnelly.me/projects" },
            { name: "Resume", url: "https://adriandonnelly.me/cv" },
        ],
    } = $props<{
		image?: string,
        title?: string,
        description?: string,
        breadCrumbs?: Array<{ name: string, url: string }>,
    }>();

	const tagOpen = `<script type="application/ld+json">`;
	const tagClose = `<\/script>`;
</script>

<svelte:head>
    <title>Adrian Donnelly — Software Engineer</title>

    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="author" content="Adrian Donnelly" />
    <meta name="keywords" content="Software Engineer, Java, TypeScript, Microservices, Adrian Donnelly, Greg Maniak, Entrepreneurs First, Mastercard, Developer, Backend, Dublin" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://adriandonnelly.me/" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://adriandonnelly.me/" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />

    {@html tagOpen + JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadCrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@id": item.url,
                "name": item.name,
            }
        }))
    }) + tagClose}
</svelte:head>