import type { APIRoute } from 'astro';
import { sanityClient } from '../utils/sanity';
import { SITE_URL, SITE_NAME, escapeXml, portableTextToPlain, excerpt } from '../utils/site';

export const prerender = false;

// RSS feed for the Logbook, built on request from Sanity.
export const GET: APIRoute = async () => {
  let entries: any[] = [];
  try {
    entries = await sanityClient.fetch(
      `*[_type == "logbookEntry" && defined(slug.current)] | order(publishedAt desc)[0...50]{ title, "slug": slug.current, publishedAt, body }`,
    );
  } catch (error) {
    console.error('RSS: failed to fetch from Sanity:', error);
  }

  const items = entries
    .map((e) => {
      const link = `${SITE_URL}/logbook/${e.slug}`;
      const description = excerpt(portableTextToPlain(e.body), 400);
      return `    <item>
      <title>${escapeXml(e.title ?? 'Untitled')}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>${
        e.publishedAt ? `\n      <pubDate>${new Date(e.publishedAt).toUTCString()}</pubDate>` : ''
      }
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} Logbook</title>
    <link>${SITE_URL}/logbook</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Experiments, daily builds and notes from the Inside a Head studio.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
