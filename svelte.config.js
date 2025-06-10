import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			"@/*": "./src/lib/components/*",
			"&/*": "./src/static/*",
			"$shadcn": "./src/lib/components/ui",
			"$shadcn/*": "./src/lib/components/ui/*",
			"$local": "./src/lib/components/local",
			"$local/*": "./src/lib/components/local/*",
			"$lib": "./src/lib",
			"$lib/*": "./src/lib/*",
		},
		paths: {
			base: ''
		},
		adapter: adapter({
			fallback: null,
			strict: false,
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		}
	}
};

export default config;
