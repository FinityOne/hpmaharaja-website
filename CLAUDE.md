# CLAUDE.md

Personal site for Heran Patel ("HP Maharaja"). Next.js 15 App Router + React 19
+ Tailwind 3, deployed on Vercel. Ported from a Django app; `old-site/` and
`.venv/` are dead weight kept for reference — never edit or deploy them.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build; this is the type-check + lint gate
npm start
```

There are no tests. `npm run build` is the only verification — run it before
claiming a change works.

## Where things live

- `src/app/*/page.tsx` — one directory per route. Routes: `/`, `/about`,
  `/achievements`, `/articles`, `/articles/[slug]`, `/community`, `/contact`,
  `/hiring`, `/media`, `/merch`, `/tour`, `/ventures`, `/ventures/[slug]`,
  `/terms`, `/privacy`.
- `src/app/layout.tsx` — head metadata, nav, footer, sitewide JSON-LD.
- `src/app/globals.css` — design tokens plus the ported component classes.
- `src/components/` — `Navbar`, `PageHeader`, `PageNav`, `Figure`,
  `SectionArt`, `RevealOnScroll`, `JsonLd`, `LegalPage`, `LostAndFound`,
  and `hero/` (the animated home hero).
- `src/lib/` — **all content lives here, not in the pages**: `ventures.ts`,
  `tour.ts`, `achievements.ts`, `hero.ts`, `artwork.ts`, `articles.ts`
  (markdown pipeline), `seo.ts`, `site.ts`.
- `content/articles/*.md` — markdown + YAML frontmatter; `src/lib/articles.ts`
  documents the frontmatter keys.
- `src/app/robots.ts`, `sitemap.ts`, `llms.txt/`, `llms-full.txt/`, `ai.txt/` —
  generated discoverability surfaces.

## Conventions that matter

**Content is data.** To add a venture, tour stop, achievement, hero facet or
image, edit the matching file in `src/lib/` — pages render the lists and need
no changes. Each of those files opens with an editing note; read it first.

**Images.** Every image slot is declared in `src/lib/artwork.ts` and rendered by
`Figure`, which falls back to vector art in `SectionArt.tsx` until a `src` is
set. Always write a real `alt`.

**New component CSS goes inside `@layer components`** in `globals.css`. Outside
the layer it beats Tailwind utilities of equal specificity, which previously
left `.btn` visible where `hidden` was applied. Non-negotiable.

**Server-first.** Only `Navbar`, `RevealOnScroll` and the hero pieces are
client components. Hero copy is rendered into the HTML server-side so the page
reads fully without JS — keep it that way; crawlers and AI agents are a primary
audience here.

**SEO is load-bearing.** `src/lib/seo.ts` holds the canonical origin
(`NEXT_PUBLIC_SITE_URL`, default `https://hpmaharaja.com`), identity strings and
the AI crawler allowlist. Adding a route means adding it to `sitemap.ts` and the
`llms*.txt` routes. JSON-LD asserting the Heran Patel / HP Maharaja identity is
deliberate.

**Dates are ISO strings compared as strings** (`src/lib/tour.ts`) to avoid
timezone drift. `/`, `/tour` and `/achievements` set `revalidate = 86400`
because they label events played/upcoming against the current date.

**Melux Events was removed on purpose.** Do not re-add it.

## Open TODOs (Heran's to fill, not to invent)

- `RESUME_URL` / `LINKEDIN_URL` in `src/lib/site.ts` are empty; the matching
  buttons stay hidden until set.
- `src/lib/achievements.ts` is missing awards, press, speaking slots and
  founding years — only Heran can confirm those. Never fabricate entries.
- `public/images/articles/hp-hustle-article-1.JPG` (7.6MB) and
  `public/images/base/header-bg.jpg` (4.7MB) are unoptimized and want
  compressing; see the note in `src/lib/artwork.ts`.
