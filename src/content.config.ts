import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const projects = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().default(10),
      summary: z.string(),
      role: z.string(),
      year: z.string(),
      platform: z.string(),
      status: z.string(),
      stack: z.string(),
      kind: z.enum(['personal', 'work']).default('personal'),
      accent: hex,
      ink: z.enum(['light', 'dark']).default('light'),
      link: z.string().url().optional().nullable(),
      linkLabel: z.string().optional().nullable(),
      repo: z.string().url().optional().nullable(),
      cover: image(),
      coverShape: z.enum(['phone', 'screen']).default('screen'),
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional().nullable() }))
        .default([]),
    }),
});

const logbook = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/logbook' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional().nullable(),
  }),
});

const mess = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/mess' }),
  schema: z.object({
    title: z.string(),
    state: z.enum(['idea', 'paused', 'abandoned', 'became']),
    year: z.string().optional().nullable(),
    note: z.string(),
    link: z.string().url().optional().nullable(),
  }),
});

export const collections = { projects, logbook, mess };
