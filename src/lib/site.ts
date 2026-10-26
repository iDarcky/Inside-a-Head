import { parse } from 'yaml';
import raw from '../content/settings.yaml?raw';

export interface Settings {
  name: string;
  role: string;
  intro: string;
  location: string;
  timeZone: string;
  email: string;
  linkedin: string;
  github: string;
  availability: string;
}

export const settings = parse(raw) as Settings;

/** YYYY.MM.DD, matching the logbook's established date style. */
export function formatDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}
