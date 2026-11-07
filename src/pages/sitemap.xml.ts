import type { APIRoute } from 'astro';
import { sanityClient } from '../utils/sanity';
import { SITE_URL, escapeXml } from '../utils/site';

export const prerender = false;

// Built on request so new Sanity projects and logbook entries show up without a rebuild.
export const GET: APIRoute = async () => {
  let projects: any[] = [];
  let entries: any[] = [];
  try {
    [projects, entries] = await Promise.all([
      sanityClient.fetch(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
      sanityClient.fetch(`*[_type == "logbookEntry" && defined(slug.current)]{ "slug": slug.current, _updatedAt, publishedAt }`),
    ]);
  } catch (error) {
    console.error('Sitemap: failed to fetch from Sanity:', error);
  }

  const urls: { loc: string; lastmod?: string }[] = [
    { loc: '/' },
    { loc: '/logbook' },
    { loc: '/resume' },
    ...projects.map((p) => ({ loc: `/projects/${p.slug}`, lastmod: p._updatedAt })),
    ...entries.map((e) => ({ loc: `/logbook/${e.slug}`, lastmod: e._updatedAt || e.publishedAt })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${escapeXml(new URL(u.loc, SITE_URL).href)}</loc>${
        u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''
      }</url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
