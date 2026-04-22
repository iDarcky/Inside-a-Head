const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gwlcf911',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-20',
});

client.fetch('*[_type == "logbookEntry"]').then(res => {
  console.log('COUNT:', res.length);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
