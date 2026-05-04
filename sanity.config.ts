import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schema';

export default defineConfig({
  name: 'default',
  title: 'Inside-a-Head Studio',

  projectId: 'gwlcf911',
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Resume')
              .child(
                S.document()
                  .schemaType('resume')
                  .documentId('resume')
              ),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem: any) => !['siteSettings', 'resume'].includes(listItem.getId())
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
