# Inside a Head

The studio of Daniel N. Maghiș, product manager. Case studies, a weekly logbook and a museum of unfinished ideas.

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

### Editing on the live site

In production, Keystatic saves through GitHub instead of the local disk. To turn that on once:

1. Run `npm run dev`, open `/keystatic`, and follow **Connect to GitHub**. It creates a GitHub App and writes `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to `.env`.
2. Add the same four variables to the Vercel project's environment variables and redeploy.

After that, `insideahead.com/keystatic` lets you sign in with GitHub and publish from any device, phone included.

## Design

Classic Swiss: a 12-column grid, Geist and Geist Mono, black on paper (and paper on black in dark mode). Each project brings its own single accent colour. See `docs/redesign-spec.md`.
