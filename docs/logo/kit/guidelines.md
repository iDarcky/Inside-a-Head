# inside a head — logo guidelines

## 1. The logo

- **Idea:** a square head with the idea sitting inside it, off-centre, where a thought would be. Structure, with a little mess inside.
- **Name:** always lowercase: **inside a head**. In running text too.
- **Versions:**
  - `lockup-horizontal.svg`: the primary logo (header, documents, anywhere wide)
  - `lockup-stacked.svg`: square-ish spaces (posters, profile banners)
  - `mark.svg`: the symbol alone (avatars, small spaces, app icon)
  - `wordmark.svg`: the name alone, when the mark is already nearby
  - `mark-16.svg`: the pixel-snapped cut for 16–24 px (favicons). Use it whenever the mark is drawn under 24 px.
- Each has a `-white` version for dark backgrounds. PNGs at 1200 px wide are in `png/`.

## 2. Construction

The mark is drawn on a 224-unit square: a **28-unit frame** and a **56-unit idea** placed 20 units from the top and right inner edges. Nothing else.

In the horizontal lockup the type is set at **0.72 × the mark's height**, its x-height centred on the mark, with a gap of **0.42 × the mark's height**. The site header uses the same ratios (20 px mark, 14.4 px type, 8.4 px gap).

## 3. Clear space

Keep at least **one idea square** of empty space around the logo on every side (the idea is ¼ of the mark's width). The space scales with the logo.

## 4. Minimum size

| Version | Screen | Print |
|---|---|---|
| Horizontal lockup | 120 px wide | 30 mm wide |
| Stacked lockup | 64 px wide | 18 mm wide |
| Mark | 16 px (use `mark-16.svg`) | 5 mm |

## 5. Colour

The logo is black and white only. Colour belongs to the projects.

| Name | HEX | RGB | Use |
|---|---|---|---|
| Ink | `#0B0B0A` | 11 11 10 | Logo on light backgrounds, text |
| Paper | `#F4F3EF` | 244 243 239 | Background; logo on dark (`-white` files are pure white for print and photos) |

For print, use the black version as **100 K** (or a rich black your printer recommends), and the white version on dark stock.

**Approved:** ink on paper · ink on white · white on ink · white on a project's accent colour (it reads on all four).

## 6. Typography

- **Geist SemiBold** for the wordmark (already drawn as outlines in the files, so you never need to type it).
- Site: **Geist** for everything, **Geist Mono** for dates, numbers and labels. Both are free (SIL Open Font License).

## 7. Don’t

Don’t stretch, squash or rotate the logo · don’t recolour it outside ink, paper and white · don’t move the idea square or change its size · don’t rearrange or resize the parts of a lockup · don’t add shadows, outlines or gradients · don’t capitalise the name · don’t retype the wordmark, use the files.

## 8. Files on the website

| File | What it is |
|---|---|
| `public/favicon.svg` | Browser tab icon, from the 16 px cut, with its own paper fill so it reads on light and dark tabs |
| `public/favicon.ico` | Fallback icon (16/32/48 px) for older browsers |
| `public/apple-touch-icon.png` | iPhone/iPad home screen |
| `public/icon-192.png`, `icon-512.png`, `maskable-512.png` | Android home screen and installed app |
| `public/site.webmanifest` | Name and icons for “Add to Home Screen” |
| `public/og.png` | Link preview image (1200×630) for LinkedIn, Slack, iMessage… |
| `src/components/Mark.astro` | The mark as used in the site header |
