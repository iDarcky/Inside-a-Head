import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = (await getCollection('logbook')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Inside a Head — Logbook',
    description: 'What I built, what broke, and what I’d do differently. Roughly once a week.',
    site: context.site!,
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.summary ?? undefined,
      link: `/logbook/${e.id}/`,
    })),
  });
}
