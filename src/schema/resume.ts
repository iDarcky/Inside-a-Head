export const resume = {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  description: 'Singleton document that powers /resume.',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. Product Manager · Builder · Musician',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Lucide Icon Name', type: 'string', description: 'e.g. mail, github, linkedin' },
          ],
        },
      ],
    },
    {
      name: 'roles',
      title: 'Experience / Roles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'start', title: 'Start', type: 'string', description: 'e.g. 2022' },
            { name: 'end', title: 'End', type: 'string', description: 'e.g. Present' },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'bullets', title: 'Bullets', type: 'array', of: [{ type: 'string' }] },
            { name: 'stack', title: 'Stack', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: { select: { title: 'title', subtitle: 'company' } },
        },
      ],
    },
    {
      name: 'projects',
      title: 'Selected Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'school', title: 'School', type: 'string' },
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'start', title: 'Start', type: 'string' },
            { name: 'end', title: 'End', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'group', title: 'Group', type: 'string', description: 'e.g. Languages, Frameworks, Tools' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Language', type: 'string' },
            { name: 'level', title: 'Level', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'pdfUrl',
      title: 'Downloadable PDF URL',
      type: 'url',
      description: 'Optional. Link to a hosted PDF version.',
    },
  ],
};
