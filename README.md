# heranpatel.com / hpmaharaja.com

Personal site for **Heran Patel**, aka HP Maharaja. Next.js (App Router) +
Tailwind, deployed on Vercel with zero configuration.

This replaced a Django implementation, which Vercel could not deploy reliably.
The markup, copy and styling were ported across unchanged; see
`git log` for the port commit.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` |
| Content | Markdown + YAML frontmatter in `content/articles/` |
| Markdown | `gray-matter` (frontmatter) + `marked` (HTML) |
| Fonts | `next/font` — Inter and IBM Plex Mono, self-hosted |
| Hosting | Vercel (no `vercel.json` needed) |

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run dev -- -p 8010
```

```bash
npm run build        # production build; also type-checks and lints
npm start            # serve the production build
```

## Layout

```
src/
  app/
    layout.tsx               # <head> metadata, nav, footer, global CSS
    page.tsx                 # home
    globals.css              # design tokens + ported component CSS
    articles/page.tsx        # articles index
    articles/[slug]/page.tsx # article detail (statically generated)
  components/
    Navbar.tsx               # client: scroll state + mobile overlay
    RevealOnScroll.tsx       # client: IntersectionObserver reveals
  lib/
    articles.ts              # markdown pipeline
    tour.ts                  # Rameelo Garba Tour 2026 data
    site.ts                  # resume/LinkedIn links, journal teasers
content/articles/*.md        # the articles themselves
public/images/               # images (was Django's static/)
old-site/                    # legacy Next.js site, reference only, not deployed
```

## Adding an article

Drop a markdown file into `content/articles/`. The frontmatter keys are read by
`src/lib/articles.ts`:

```yaml
---
slug: "my-article"
title: "My Article"
subtitle: "One line under the headline."
summary: "Shown on the articles index."
date: "2026-01-31"        # newest first; also the displayed date
category: "Culture"
reading_time: "6 min read"
image: "images/articles/pic.jpg"   # or a full https:// URL
is_featured: false        # featured -> hero + side column on the index
is_breaking: false        # one breaking article -> banner on the index
---
```

Routes are generated at build time via `generateStaticParams`, so a new file
only needs a redeploy.

## Known gaps

- `RESUME_URL` and `LINKEDIN_URL` in `src/lib/site.ts` are empty. The Resume and
  LinkedIn buttons in the recruiter section stay hidden until they are set.
- The home page journal teasers in `src/lib/site.ts` are editorial placeholders
  with slugs that do not exist yet; each row links to `/articles`.
- The home page re-renders daily (`revalidate = 86400`) because tour rows label
  themselves played/upcoming against the current date.
