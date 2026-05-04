import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { sanityClient } from '../../utils/sanity';
import { plainTextFromPortableText } from '../../utils/text';

export const prerender = false;

export async function GET(context: APIContext) {
  let entries: any[] = [];
  try {
    entries = await sanityClient.fetch(
      `*[_type == "logbookEntry" && (status == "published" || !defined(status)) && defined(slug.current)]
        | order(publishedAt desc)[0..49]{
          title, slug, publishedAt, excerpt, body
        }`,
    );
  } catch (error) {
    console.error('RSS: failed to fetch entries:', error);
  }

  return rss({
    title: 'Inside a Head — Logbook',
    description: 'Notes, experiments, and field reports from the studio.',
    site: context.site?.toString() ?? 'https://inside-a-head.vercel.app',
    items: entries.map((entry) => ({
      title: entry.title ?? 'Untitled',
      link: `/logbook/${entry.slug?.current ?? ''}`,
      pubDate: entry.publishedAt ? new Date(entry.publishedAt) : new Date(),
      description: entry.excerpt || plainTextFromPortableText(entry.body),
    })),
    customData: '<language>en-us</language>',
  });
}
