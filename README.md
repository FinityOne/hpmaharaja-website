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
| Node | >=22, pinned via `engines.node` in `package.json` |

> `engines.node` is set because the Vercel project was pinned to Node 20, which
> Vercel has discontinued — builds failed with
> `Node.js Version "20.x" is discontinued`. The `engines` field overrides the
> project setting, so the build picks a supported runtime.

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
    layout.tsx               # <head> metadata, nav, footer, global CSS, JSON-LD
    page.tsx                 # home
    globals.css              # design tokens + ported component CSS
    articles/page.tsx        # articles index
    articles/[slug]/page.tsx # article detail (statically generated)
    terms/page.tsx           # Terms of Use
    privacy/page.tsx         # Privacy Policy
    robots.ts                # -> /robots.txt
    sitemap.ts               # -> /sitemap.xml
    llms.txt/route.ts        # -> /llms.txt
  components/
    Navbar.tsx               # client: scroll state + mobile overlay
    RevealOnScroll.tsx       # client: IntersectionObserver reveals
    JsonLd.tsx               # schema.org structured data
    LegalPage.tsx            # shell shared by Terms and Privacy
  lib/
    articles.ts              # markdown pipeline
    tour.ts                  # Rameelo Garba Tour 2026 data
    site.ts                  # resume/LinkedIn links, journal teasers
    seo.ts                   # canonical origin, identity, AI crawler list
content/articles/*.md        # the articles themselves
public/images/               # images (was Django's static/)
old-site/                    # legacy Next.js site, reference only, not deployed
```

## Discoverability (search and AI)

The site is meant to be found and quoted, so everything is open:

- `/robots.txt` allows every crawler and names the AI crawlers explicitly
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and
  others) rather than relying on each one's default.
- `/sitemap.xml` lists every page, with article dates as `lastModified`.
- `/llms.txt` is a plain-text map of the site for AI assistants, generated from
  the same markdown as the pages so it cannot drift.
- JSON-LD on every page: `Person` + `WebSite` sitewide, `Blog` on the index, and
  `BlogPosting` + `BreadcrumbList` on each article. This is what lets a search
  engine or assistant state the Heran Patel / HP Maharaja relationship as fact
  instead of inferring it.
- Canonical URLs and `max-image-preview:large` / full-snippet directives.

Set `NEXT_PUBLIC_SITE_URL` to change the canonical origin (it defaults to
`https://hpmaharaja.com`).

## Styling note worth knowing

The component classes in `globals.css` (`.btn`, `.label`, `.nav-link`, …) are
inside `@layer components` **on purpose**. They are single-class selectors, so
against a Tailwind utility of equal specificity the later rule wins — and plain
CSS after `@tailwind utilities` is later. When these lived outside the layer,
`.btn { display: inline-flex }` beat `hidden`, which left the "Get in touch"
button visible on phones and pushed the nav toggle off screen. Keep new
component CSS in that layer.

## Mobile

Checked with headless Chrome at 320, 390, 412 and 768px across the home page,
articles index, two articles and both legal pages: no page scrolls sideways, and
every row of the mobile menu is inside the viewport and at least 44px tall.

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
