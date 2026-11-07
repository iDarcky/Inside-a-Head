// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://insideahead.com',
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      // Keep the Keystatic admin and the 404 page out of search results.
      filter: (page) => !page.includes('/keystatic') && !page.includes('/404'),
      // Canonical URLs carry no trailing slash; the sitemap matches them.
      serialize: (item) => ({ ...item, url: item.url.length > 'https://insideahead.com/'.length ? item.url.replace(/\/$/, '') : item.url }),
    }),
  ],
  // Fetch a page in the background when a link is hovered or tapped, so navigation feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  adapter: vercel(),
});
