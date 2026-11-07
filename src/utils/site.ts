// Central site identity used by SEO tags, the sitemap and the RSS feed.
export const SITE_URL = 'https://insideahead.com';
export const SITE_NAME = 'Inside a Head';
export const SITE_AUTHOR = 'Daniel N. Maghiș';
export const SITE_EMAIL = 'maghisdaniel@gmail.com';
export const DEFAULT_DESCRIPTION =
  'The digital studio of Daniel. Product Manager, Musician, and Builder.';
export const DEFAULT_OG_IMAGE = '/og-default.png';

export const SOCIAL_LINKS = [
  'https://github.com/iDarcky',
  'https://www.linkedin.com/in/danielnmaghis/',
  'https://www.goodreads.com/user/show/106429003-daniel-maghis',
  'https://www.instagram.com/danielmhimself/',
];

/** Flatten Portable Text blocks to plain text (for descriptions and feeds). */
export function portableTextToPlain(blocks: any[] | undefined | null): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b) => b?._type === 'block' && Array.isArray(b.children))
    .map((b) => b.children.map((c: any) => c.text ?? '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Trim text to a meta-description friendly length on a word boundary. */
export function excerpt(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\s]+$/, '') + '…';
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
