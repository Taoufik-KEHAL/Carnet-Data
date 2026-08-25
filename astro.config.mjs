// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://carnet-data.vercel.app', // TODO: replace with your custom domain once attached
  integrations: [mdx(), sitemap()],
});
