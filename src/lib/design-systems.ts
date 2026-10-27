// The design system behind the studio and each project, as defined in each app's own repo
// (docs/DESIGN.md, docs/BRAND.md, ui/theme/*.kt). Shown side by side on /about.

export interface Swatch { name: string; hex: string }
export interface DesignSystem {
  project: string;
  /** Case study slug; omitted for the studio itself. */
  slug?: string;
  system: string;
  idea: string;
  colours: Swatch[];
  type: string[];
  details: string[];
}

export const designSystems: DesignSystem[] = [
  {
    project: 'inside a head',
    system: 'Swiss',
    idea: 'One grid, one family, black on paper. The colour belongs to the projects.',
    colours: [
      { name: 'Ink', hex: '#0B0B0A' },
      { name: 'Paper', hex: '#F4F3EF' },
      { name: 'Hairline', hex: '#D5D3CC' },
    ],
    type: ['Geist', 'Geist Mono'],
    details: ['12-column grid', 'Light and dark', 'Built with Astro and Keystatic'],
  },
  {
    project: 'The Retro Circuit',
    slug: 'the-retro-circuit',
    system: 'Swiss Industrial',
    idea: 'Grid is god and type is the interface. Colour appears only as a signal.',
    colours: [
      { name: 'Void', hex: '#09090B' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Violet', hex: '#8B5CF6' },
      { name: 'International Orange', hex: '#FF4F00' },
    ],
    type: ['Press Start 2P', 'JetBrains Mono', 'Inter'],
    details: ['Pixel type for headings, mono for data, sans for reading', 'Hairline borders, no glow or blur'],
  },
  {
    project: 'Setlists.md',
    slug: 'setlists-md',
    system: 'Lydian',
    idea: 'Bright and structurally sound, like the musical mode it’s named after.',
    colours: [
      { name: 'Vetiver', hex: '#53796F' },
      { name: 'Mist', hex: '#7AA89C' },
      { name: 'Bone', hex: '#F6F4EF' },
      { name: 'Stage', hex: '#0A0807' },
    ],
    type: ['Geist', 'Geist Mono'],
    details: ['Mono for chords and metadata', '10-step colour scales per hue', 'Cards 12 px, panels 6 px'],
  },
  {
    project: 'Meridian',
    slug: 'meridian',
    system: 'Material 3, after Sunrise',
    idea: 'Orange for actions, coral red only for today and now, neutral greys at night so calendar colours read true.',
    colours: [
      { name: 'Meridian orange', hex: '#A64200' },
      { name: 'Coral', hex: '#C62F35' },
      { name: 'Peach', hex: '#FCEFE8' },
      { name: 'Night', hex: '#121212' },
    ],
    type: ['Roboto'],
    details: ['Material 3 components', 'Day and night themes'],
  },
  {
    project: 'Ridely',
    slug: 'ridely',
    system: 'Rideshare cockpit',
    idea: 'Material 3 Expressive components only, and one custom colour: green for the money you kept.',
    colours: [
      { name: 'Cockpit teal', hex: '#136682' },
      { name: 'Container', hex: '#BEE9FF' },
      { name: 'Kept green', hex: '#146C3E' },
      { name: 'Surface', hex: '#F6FAFE' },
    ],
    type: ['Roboto, tabular numerals'],
    details: ['Corners 8, 12, 16 and 28', 'Seed colour #0A6C8B, light and dark'],
  },
];
