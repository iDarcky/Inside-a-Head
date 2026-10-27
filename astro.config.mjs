// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://insideahead.com',
  integrations: [react(), markdoc(), keystatic()],
  // Fetch a page in the background when a link is hovered or tapped, so navigation feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  adapter: vercel(),
});
