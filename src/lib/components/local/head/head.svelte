<script lang="ts">
	const {
		image = "https://grzegorz.ie/assets/meta_about.png",
        title = "Grzegorz Maniak — Software Engineer",
        description = "Hey, I’m Greg, Computing with Software Development grad from TU Dublin. I’m into building secure, scalable systems with privacy baked in. Always happy to chat.",
        breadCrumbs = [
            { name: "Home", url: "https://Grzegorz.ie/" },
            { name: "About", url: "https://Grzegorz.ie/about" },
            { name: "Contact", url: "https://Grzegorz.ie/contact" },
            { name: "Blog", url: "https://Grzegorz.ie/blog" },
            { name: "Projects", url: "https://Grzegorz.ie/projects" },
            { name: "Resume", url: "https://Grzegorz.ie/cv" },
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
    <title>Grzegorz Maniak — Software Engineer</title>

    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="author" content="Grzegorz Maniak" />
    <meta name="keywords" content="Software Engineer, Java, TypeScript, Microservices, Grzegorz Maniak, Greg Maniak, Entrepreneurs First, Mastercard, Developer, Backend, Dublin" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://grzegorz.ie/" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://grzegorz.ie/" />
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