export const museumFragment = {
  name: 'museumFragment',
  title: 'Museum Fragment',
  type: 'document',
  description: 'Random personal stuff for the Museum of My Mess. Photos, quotes, links, notes — low-friction.',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Quote', value: 'quote' },
          { title: 'Link', value: 'link' },
          { title: 'Note', value: 'note' },
        ],
        layout: 'radio',
      },
      initialValue: 'note',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'media',
      title: 'Media',
      type: 'image',
      description: 'For image fragments.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'For link fragments.',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Optional caption, quote text, or longer note.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'kind',
      media: 'media',
    },
  },
};
