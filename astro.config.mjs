// @ts-check
import tailwindIntegration from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://engeo.com.co',
    integrations: [tailwindIntegration(), preact(), sitemap()]
});
