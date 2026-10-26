import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Text colour that reads on a project's accent. */
export function inkFor(p: Project): string {
  return p.data.ink === 'dark' ? '#0b0b0a' : '#ffffff';
}

export function accentStyle(p: Project): string {
  return `--accent: ${p.data.accent}; --on-accent: ${inkFor(p)};`;
}
