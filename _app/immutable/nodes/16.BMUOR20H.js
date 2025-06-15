import{f as g,a as l,t as f}from"../chunks/zAaPBgh0.js";import"../chunks/BkshVGqh.js";import{p as u,a as x,s as y,c as m,n as v,r as n}from"../chunks/C_ondSCB.js";import{i as b}from"../chunks/CuN2vTxo.js";import{A as $}from"../chunks/CexLV9-j.js";import{B as k}from"../chunks/BqT9JL9u.js";var S=g(`<div class="
    flex
    flex-col
    gap-4
    p-4
    md:p-6
    w-full
    max-w-screen-lg
    mx-auto
    min-h-[95vh]
"><div class="flex flex-col gap-4"><h1 class="font-bold text-2xl mb-2">Sitemap</h1> <p class="text-muted-foreground m-0">Why are you here? This is a sitemap, it's not very interesting. If you'd like to know more about me, please check out the <a href="/about" class="text-primary">About</a> page.
            This is just for me to generate a sitemap.xml file for search engines.</p> <!></div></div>`);function B(i,r){u(r,!1);const c=$.map(t=>({loc:`https://adriandonnelly.me//post/${t.id}`,lastmod:t.date.toISOString().split("T")[0]})),p=[{loc:"https://adriandonnelly.me/",lastmod:"2024-10-11"},{loc:"https://adriandonnelly.me//cv",lastmod:"2024-10-11"},{loc:"https://adriandonnelly.me//blog",lastmod:"2024-10-11"},{loc:"https://adriandonnelly.me//about",lastmod:"2024-10-11"},{loc:"https://adriandonnelly.me//contact",lastmod:"2024-10-11"},{loc:"https://adriandonnelly.me//projects",lastmod:"2024-10-11"},{loc:"https://adriandonnelly.me//sitemap.xml",lastmod:"2024-10-11"}],d=`<?xml version="1.0" encoding="UTF-8" ?>
<urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    <url>
        <loc>https://adriandonnelly.me/</loc>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>

    ${[...c,...p].map(t=>`    <url>
        <loc>${t.loc}</loc>
        <lastmod>${t.lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>`).join(`
`)}
</urlset>`;function h(){const t=new Blob([d],{type:"text/xml"}),s=window.URL.createObjectURL(t),e=document.createElement("a");e.href=s,e.download="sitemap.xml",e.click(),window.URL.revokeObjectURL(s)}b();var o=S(),a=m(o),w=y(m(a),4);k(w,{class:"mt-4 w-full",$$events:{click:h},children:(t,s)=>{v();var e=f("Download Sitemap");l(t,e)},$$slots:{default:!0}}),n(a),n(o),l(i,o),x()}export{B as component};
