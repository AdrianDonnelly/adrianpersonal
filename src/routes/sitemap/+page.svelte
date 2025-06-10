<script lang="ts">
    import { Posts } from "$lib/posts";
    import type {PostData} from "$local/post";
    import {Button} from "$shadcn/button";
    import {AspectRatio} from "$shadcn/aspect_ratio";
    type SitemapEntry = { loc: string, lastmod: string };

    const posts = Posts.map((post: PostData) => {
        return {
            loc: `https://grzegorz.ie/post/${post.id}`,
            lastmod: post.date.toISOString().split('T')[0]
        };
    });

    const otherPages: SitemapEntry[] = [
        { loc: "https://grzegorz.ie", lastmod: "2024-10-11" },
        { loc: "https://grzegorz.ie/cv", lastmod: "2024-10-11" },
        { loc: "https://grzegorz.ie/blog", lastmod: "2024-10-11" },
        { loc: "https://grzegorz.ie/about", lastmod: "2024-10-11" },
        { loc: "https://grzegorz.ie/contact", lastmod: "2024-10-11" },
        { loc: "https://grzegorz.ie/projects", lastmod: "2024-10-11" },
        { loc: "https://grzegorz.ie/sitemap.xml", lastmod: "2024-10-11" }
    ];

    const sitemap = [...posts, ...otherPages];
    const sitemapString = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    <url>
        <loc>https://grzegorz.ie</loc>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>

    ${sitemap.map((site) => `    <url>
        <loc>${site.loc}</loc>
        <lastmod>${site.lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>`).join('\n')}
</urlset>`;

    function DownloadSitemap() {
        const blob = new Blob([sitemapString], { type: 'text/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
        window.URL.revokeObjectURL(url);
    }
</script>



<div class='
    flex
    flex-col
    gap-4
    p-4
    md:p-6
    w-full
    max-w-screen-lg
    mx-auto
    min-h-[95vh]
'>
    <div class='flex flex-col gap-4'>
        <h1 class='font-bold text-2xl mb-2'>
            Sitemap
        </h1>

        <p class='text-muted-foreground m-0'>
            Why are you here? This is a sitemap, it's not very interesting. If you'd like to know more about me, please check out the <a href="/about" class="text-primary">About</a> page.
            This is just for me to generate a sitemap.xml file for search engines.
        </p>

        <Button on:click={DownloadSitemap} class='mt-4 w-full'>
            Download Sitemap
        </Button>
    </div>
</div>