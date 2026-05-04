// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

const SITE_URL = process.env.SITE_URL || 'https://inside-a-head.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    sanity({
      projectId: "gwlcf911",
      dataset: "production",
      useCdn: false,
      studioBasePath: '/studio',
      apiVersion: '2024-04-20'
    }),
    react(),
    sitemap({
      filter: (page) => !page.includes('/studio'),
    })
  ],

  adapter: vercel()
});