export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of the website (e.g. Inside a Head | Digital Studio).',
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description: 'The SEO meta description for search engines.',
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'The image shown when sharing the site on social media.',
    },
    {
      name: 'bio',
      title: 'Bio / Hero Copy',
      type: 'text',
      description: 'The introductory text shown in the hero section.',
    },
    {
      name: 'currentlyReading',
      title: 'Currently Reading',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Book Title',
          type: 'string',
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'url',
          title: 'Book URL (Goodreads/Store)',
          type: 'url',
        },
      ],
    },
    {
      name: 'currentlyListening',
      title: 'Currently Listening',
      type: 'object',
      description: 'Track / album / playlist for the Museum.',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'artist', title: 'Artist', type: 'string' },
        {
          name: 'spotifyEmbedUrl',
          title: 'Spotify Embed URL',
          type: 'url',
          description: 'Use the URL that begins with https://open.spotify.com/embed/ from the Spotify share menu.',
        },
      ],
    },
    {
      name: 'currentStatus',
      title: 'Current Status',
      type: 'string',
      description: 'A one-liner about what you’re focused on right now (shown on Museum + About).',
    },
    {
      name: 'recentlyFinishedBooks',
      title: 'Recently Finished Books',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'author', title: 'Author', type: 'string' },
            { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: { select: { title: 'title', subtitle: 'author', media: 'coverImage' } },
        },
      ],
    },
    {
      name: 'aboutBody',
      title: 'About Page Body',
      type: 'blockContent',
      description: 'Longform content rendered on the /about page.',
    },
    {
      name: 'nowFocus',
      title: 'Now (focus list)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of what you are focused on this month (shown on /about).',
    },
    {
      name: 'githubUsername',
      title: 'GitHub Username',
      type: 'string',
      description: 'Used to fetch contribution data for the Museum (e.g. iDarcky).',
    },
  ],
};
