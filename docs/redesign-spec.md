# Inside a Head — Redesign Spec (v2)

Decisions captured from the redesign interview, 2026-10-26.

## Goal

A Swiss-style studio site that works for **hiring**: a recruiter should understand who Daniel is,
what he has shipped, and how to reach him within one screen. Personality (logbook, Museum of my
Mess) stays, but below the work.

## Stack

- **Fresh rebuild on Astro** (stay on Astro, not Next.js: the site is mostly static, two of the
  four projects are native Android apps, so there is no web code to share).
- **Keystatic** replaces Sanity. Content lives as Markdown/YAML in the repo, editable at
  `/keystatic`. Pages are prerendered — no runtime CMS fetches, no outage risk.
- Existing Sanity logbook entries, projects and site settings are exported and migrated.
- Deploy: Vercel, `insideahead.com`.
- Removed: Sanity Studio, styled-components, GSAP, Lucide-from-CDN, custom cursor, scroll-jacking.

## Visual language — Classic International Typographic Style

- Off-white paper / black ink, strict 12-column grid, flush-left ragged-right text, generous
  whitespace, numbered sections.
- **Type:** Geist (everything) + Geist Mono (dates, indices, metadata, labels). Self-hosted.
- **Color:** neutral base; **each project has one accent color** used on its tile and its page.
- **Theme:** light by default, follows system dark mode (ink-on-black).
- **Motion:** minimal & crisp — 150–250 ms transitions, hover states, Astro view transitions,
  `prefers-reduced-motion` respected.

## Homepage — poster grid

1. Masthead: INSIDE A HEAD, one-line bio, role line, primary CTAs: **Resume** · **LinkedIn**.
2. Work: poster-grid tiles on the 12-col grid, each in its project accent.
3. Logbook: latest entries.
4. Museum of my Mess: ideas, paused and abandoned things (Running lives here as an idea).
5. Footer / contact: LinkedIn, resume, GitHub.

## Projects

| # | Project | Platform | Assets | Notes |
|---|---------|----------|--------|-------|
| 01 | Setlists.md | Web (PWA) | `docs/mockups/*` | Live at setlistsmd.insideahead.com |
| 02 | Meridian | Android | needs real screenshots | Calendar app; repo screenshots are of Sunrise (reference), not usable |
| 03 | Ride Tracker | Android (KMP) | `docs/play/graphics/*` | Ride-sharing income tracker, EN/RO |
| 04 | The Retro Circuit | Web | `public/retro-circuit.png` | Handheld comparison engine |
| — | Redline Running | — | — | Moved to Museum of my Mess as an idea |

Each project page: full case study (problem → decisions → screens → what's next), written from the
PM angle. Claude drafts from repo READMEs/briefs/changelogs; Daniel edits in Keystatic.
Screenshots shown flat on the grid, no fake device frames.

## Other pages

- `/logbook`, `/logbook/[slug]` — kept.
- `/resume` — kept, restyled as a Swiss CV.
- `/404` — kept.

## Logo / icon

Explore three directions with the logo-design skill; Daniel picks one. Must work at 16 px favicon size.

## Design references (skills to apply)

logo-design-skill, anti-ui-slop, impeccable.style, tasteskill.dev, Emil Kowalski's skill,
Vercel Web Interface Guidelines, obra/superpowers (brainstorm → spec → plan → build).
