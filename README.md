# Inside a Head

A personal studio for tech experiments and aesthetic design, by Daniel N. Maghiș. Case studies, a weekly logbook and a museum of unfinished ideas.

Built with [Astro](https://astro.build) and [Keystatic](https://keystatic.com), deployed on Vercel. Every public page is prerendered; content lives in this repo as Markdown and YAML.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
```

## Editing content

Open `/keystatic` while `npm run dev` is running. Changes are written straight to the files below.

| What | Where |
| --- | --- |
| Projects (case studies) | `src/content/projects/*.mdoc`, images in `src/assets/projects/` |
| Logbook | `src/content/logbook/*.mdoc` |
| Museum of my Mess | `src/content/mess/*.yaml` |
| Name, intro, links | `src/content/settings.yaml` |

You can also edit any of those files by hand, in GitHub or in Obsidian.

### Editing on the live site, analytics and the resume PDF

Step-by-step instructions are in [docs/editing-guide.md](docs/editing-guide.md).

## Design

Classic Swiss: a 12-column grid, Geist and Geist Mono, black on paper, with a light/dark toggle. Each project brings its own single accent colour. See `docs/redesign-spec.md`.
