import { getCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { getProjects } from './projects';

export type AppId = 'the-retro-circuit' | 'setlists-md' | 'meridian' | 'ridely' | 'redline-running';

/** One piece in the Museum of my Mess: a project, or an idea still waiting its turn. */
export interface Piece {
  id: string;
  kind: 'project' | 'idea';
  number: number;
  title: string;
  year?: string | null;
  color: string;
  platform?: string;
  status?: string;
  stack?: string;
  text: string;
  href?: string;
  linkLabel?: string;
  logo?: AppId;
  image?: ImageMetadata | null;
  imageAlt?: string;
  imageShape?: 'phone' | 'screen';
}

const apps: string[] = ['the-retro-circuit', 'setlists-md', 'meridian', 'ridely', 'redline-running'];
const stateLabel = { idea: 'Idea', paused: 'Paused', abandoned: 'Abandoned', became: 'Became something' } as const;

export async function getMuseum(): Promise<Piece[]> {
  const projects = await getProjects();
  const ideas = await getCollection('mess');
  const pieces: Omit<Piece, 'number'>[] = [
    ...projects.map((p) => ({
      id: p.id,
      kind: 'project' as const,
      title: p.data.title,
      year: p.data.year,
      color: p.data.accent,
      platform: p.data.platform,
      status: p.data.status,
      stack: p.data.stack,
      text: p.data.summary,
      href: `/work/${p.id}`,
      linkLabel: 'Explore project',
      logo: apps.includes(p.id) ? (p.id as AppId) : undefined,
      image: p.data.cover,
      imageAlt: p.data.gallery.find((g) => g.image.src === p.data.cover.src)?.alt ?? '',
      imageShape: p.data.coverShape,
    })),
    ...ideas.map((m) => ({
      id: m.id,
      kind: 'idea' as const,
      title: m.data.title,
      year: m.data.year,
      color: m.data.color ?? '#55544f',
      status: stateLabel[m.data.state],
      text: m.data.note,
      href: m.data.link ?? undefined,
      linkLabel: m.data.link ? 'Visit' : undefined,
      logo: apps.includes(m.id) ? (m.id as AppId) : undefined,
      image: m.data.image,
      imageAlt: `${m.data.title}, an early screen`,
      imageShape: 'phone' as const,
    })),
  ];
  return pieces.map((p, i) => ({ ...p, number: i + 1 }));
}
