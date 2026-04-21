export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'stack',
      title: 'Stack',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short overview of the project for the homepage.',
    },
    {
      name: 'device',
      title: 'Device Frame',
      type: 'string',
      options: {
        list: [
          { title: 'Browser', value: 'browser' },
          { title: 'iPhone', value: 'iphone' },
        ],
      },
      initialValue: 'browser',
    },
    {
      name: 'projectUrl',
      title: 'External Project URL',
      type: 'url',
    },
    {
      name: 'themeHex',
      title: 'Background Color (Hex)',
      type: 'string',
      description: 'e.g. #1a0f30 for deep purple, #121f1a for deep green, #300a0a for deep red.',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
};
