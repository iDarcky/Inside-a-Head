import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schema';

export default defineConfig({
  name: 'default',
  title: 'Inside-a-Head Studio',

  projectId: 'gwlcf911',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
