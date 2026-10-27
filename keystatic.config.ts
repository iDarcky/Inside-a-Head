import { config, collection, singleton, fields } from '@keystatic/core';

// Local storage while developing; GitHub storage on the deployed site so /keystatic
// commits straight to the repo. PUBLIC_KEYSTATIC_GITHUB=true uses GitHub locally too,
// which is how the GitHub App is created the first time. See docs/editing-guide.md.
const storage = import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_GITHUB === 'true'
  ? ({ kind: 'github', repo: 'iDarcky/Inside-a-Head' } as const)
  : ({ kind: 'local' } as const);

const hex = (label: string, description: string) =>
  fields.text({
    label,
    description,
    validation: { isRequired: true, pattern: { regex: /^#[0-9a-fA-F]{6}$/, message: 'Use a 6-digit hex like #A64200' } },
  });

const projectImage = (label: string) =>
  fields.image({ label, directory: 'src/assets/projects', publicPath: '../../assets/projects/' });

export default config({
  storage,
  ui: {
    brand: { name: 'inside a head' },
    navigation: { Content: ['projects', 'logbook', 'mess'], Site: ['settings'] },
  },
  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role line', description: 'Shown under the masthead, e.g. "Product manager"' }),
        intro: fields.text({ label: 'Intro', multiline: true, description: 'Two or three sentences for the homepage.' }),
        location: fields.text({ label: 'Location' }),
        timeZone: fields.text({ label: 'Time zone', description: 'IANA name, e.g. Europe/Bucharest' }),
        email: fields.text({ label: 'Email' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        github: fields.url({ label: 'GitHub URL' }),
        availability: fields.text({ label: 'Availability', description: 'e.g. "Open to product roles"' }),
        manifestoTitle: fields.text({ label: 'Manifesto heading' }),
        manifesto: fields.text({
          label: 'Manifesto',
          multiline: true,
          description: 'Shown above the Museum of my Mess. Separate paragraphs with a blank line; the last one is set in bold.',
        }),
      },
    }),
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'year'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        order: fields.integer({ label: 'Order', description: 'Lower comes first on the homepage.', defaultValue: 10 }),
        summary: fields.text({ label: 'One-line summary', description: 'What it is, in one sentence. Shown on the poster tile.' }),
        role: fields.text({ label: 'My role' }),
        year: fields.text({ label: 'Year' }),
        platform: fields.text({ label: 'Platform', description: 'e.g. Android, Web (PWA)' }),
        status: fields.text({ label: 'Status', description: 'e.g. Live, In daily use, v0.4' }),
        stack: fields.text({ label: 'Stack' }),
        kind: fields.select({
          label: 'Kind',
          options: [
            { label: 'Personal project', value: 'personal' },
            { label: 'Client / work', value: 'work' },
          ],
          defaultValue: 'personal',
        }),
        accent: hex('Accent colour', 'The one colour this project uses on its tile and page.'),
        ink: fields.select({
          label: 'Text on accent',
          description: 'Which text colour reads on the accent.',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          defaultValue: 'light',
        }),
        link: fields.url({ label: 'Live link' }),
        linkLabel: fields.text({ label: 'Live link label', description: 'e.g. setlistsmd.insideahead.com' }),
        repo: fields.url({ label: 'Repository' }),
        cover: projectImage('Cover image'),
        coverShape: fields.select({
          label: 'Cover shape',
          options: [
            { label: 'Phone (tall)', value: 'phone' },
            { label: 'Screen (wide)', value: 'screen' },
          ],
          defaultValue: 'screen',
        }),
        gallery: fields.array(
          fields.object({
            image: projectImage('Image'),
            alt: fields.text({ label: 'Alt text' }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Gallery', itemLabel: (props) => props.fields.caption.value || 'Image' },
        ),
        body: fields.markdoc({ label: 'Case study' }),
      },
    }),
    logbook: collection({
      label: 'Logbook',
      slugField: 'title',
      path: 'src/content/logbook/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        body: fields.markdoc({ label: 'Entry' }),
      },
    }),
    mess: collection({
      label: 'Museum of my Mess',
      slugField: 'title',
      path: 'src/content/mess/*',
      format: { data: 'yaml' },
      columns: ['title', 'state'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        state: fields.select({
          label: 'State',
          options: [
            { label: 'Idea', value: 'idea' },
            { label: 'Paused', value: 'paused' },
            { label: 'Abandoned', value: 'abandoned' },
            { label: 'Became something', value: 'became' },
          ],
          defaultValue: 'idea',
        }),
        year: fields.text({ label: 'Year' }),
        note: fields.text({ label: 'Note', multiline: true, description: 'What it was and where it stands, in two sentences.' }),
        link: fields.url({ label: 'Link' }),
      },
    }),
  },
});
