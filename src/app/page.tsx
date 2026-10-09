import type { Metadata } from "next";
import Link from "next/link";

import Figure from "@/components/Figure";
import Hero from "@/components/hero/Hero";
import JsonLd from "@/components/JsonLd";
import { HOME_ACHIEVEMENTS } from "@/lib/achievements";
import { loadAllArticles } from "@/lib/articles";
import {
  NAME_KEYWORDS,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PERSON_ALTERNATE_NAME,
  PERSON_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { HOME_ARTICLE_COUNT } from "@/lib/site";
import { VENTURES } from "@/lib/ventures";

const HOME_DESCRIPTION =
  "Heran Patel, also known as HP Maharaja, is a founder and operator in Phoenix, Arizona building Rameelo, FinityOne and Maharaja Estates, and consulting for tech ventures on product management and engineering teams at scale in fintech and proptech.";

export const metadata: Metadata = {
  /* Absolute: the home page title already carries both names, so it opts out
     of the layout's "· Heran Patel (HP Maharaja)" suffix. */
  title: { absolute: "Heran Patel (HP Maharaja) – Founder, Operator, Consultant in Phoenix, Arizona" },
  description: HOME_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  keywords: NAME_KEYWORDS,
  openGraph: {
    type: "profile",
    title: "Heran Patel (HP Maharaja) – Founder, Operator, Consultant",
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heran Patel (HP Maharaja) – Founder, Operator, Consultant",
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * The hero's boot lines and live countdown name the next tour stop, so the
 * static render is refreshed daily rather than frozen at build time. The tour
 * table itself now lives on /tour, which revalidates on the same cycle.
 */
export const revalidate = 86400;

/**
 * The three people who actually land here, in the order they are most likely
 * to arrive, each sent straight to a page of its own:
 *
 *  1. a recruiter or hiring manager assessing Heran as talent;
 *  2. someone who saw HP Maharaja on a stage and wants to know what Rameelo is;
 *  3. someone with no context at all who needs the plain-language version.
 */
const AUDIENCE_LANES = [
  {
    label: "Recruiters & hiring managers",
    title: "The professional record",
    blurb:
      "Product and engineering leadership across four ventures, with fintech and proptech as the home turf. Strengths, domains, what I am open to, and how to send a role.",
    footnote: "Resume & contact",
    href: "/hiring",
  },
  {
    label: "Seen me on a stage?",
    title: "What Rameelo is",
    blurb:
      "If you caught me at a garba night somewhere between Los Angeles and Boston, this is the thing you were standing in — the non-profit, the artists, and the 2026 routing.",
    footnote: "Tour dates & tickets",
    href: "/ventures/rameelo",
  },
  {
    label: "No idea who I am?",
    title: "Start from zero",
    blurb:
      "Fair enough. The two-minute version: who I am, what I build, what I write about, and why there is a garba tour in the middle of a founder's website.",
    footnote: "The short version",
    href: "/about",
  },
] as const;

/**
 * Every area of the site, as a card with its own page behind it.
 *
 * This replaces the long single-page scroll the home page used to be: each of
 * these was an in-page anchor, and is now somewhere you can actually land,
 * read, and link to on its own.
 */
const SECTIONS = [
  {
    slot: "about",
    kicker: "About",
    title: "Who I am",
    blurb: "The two-minute version, plus the three threads that run through everything.",
    href: "/about",
  },
  {
    slot: "achievements",
    kicker: "Achievements",
    title: "The record",
    blurb: "Ventures built, nights booked, essays published — in three tracks.",
    href: "/achievements",
  },
  {
    slot: "ventures",
    kicker: "Ventures",
    title: "What I run",
    blurb: "Rameelo, FinityOne, Maharaja Estates and the consulting practice.",
    href: "/ventures",
  },
  {
    slot: "hiring",
    kicker: "Hiring",
    title: "For recruiters",
    blurb: "Operating strengths, domains, what I am open to, and the evidence behind it.",
    href: "/hiring",
  },
  {
    slot: "tour",
    kicker: "Tour",
    title: "Rameelo Garba Tour 2026",
    blurb: "Twelve nights, six cities, and who plays each one.",
    href: "/tour",
  },
  {
    slot: "music",
    kicker: "Media",
    title: "Music & vlogs",
    blurb: "The HP Maharaja catalogue, and the archive of what building looks like.",
    href: "/media",
  },
  {
    slot: "journal",
    kicker: "Journal",
    title: "Essays from the throne",
    blurb: "Long-form writing on hustle, faith, politics, culture and dharma.",
    href: "/articles",
  },
  {
    slot: "merch",
    kicker: "Merch",
    title: "Drop 001",
    blurb: "HP Maharaja Essentials. Small runs, no re-runs, list first.",
    href: "/merch",
  },
  {
    slot: "community",
    kicker: "Community",
    title: "The people around it",
    blurb: "Share your story, collab on content, or pull up in real life.",
    href: "/community",
  },
] as const;

export default function HomePage() {
  const articles = loadAllArticles().slice(0, HOME_ARTICLE_COUNT);

  return (
    <>
      {/* Structured data: the home page is this person's profile page, and the
          ventures are named as organizations he founded. Together with the
          Person node in the layout, that states the Heran Patel / HP Maharaja
          identity and what he builds as facts rather than leaving both to be
          inferred from the prose. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              "@id": `${SITE_URL}/#profilepage`,
              url: `${SITE_URL}/`,
              name: `${PERSON_NAME} (${PERSON_ALTERNATE_NAME})`,
              description: HOME_DESCRIPTION,
              inLanguage: "en",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              mainEntity: { "@id": `${SITE_URL}/#person` },
              about: { "@id": `${SITE_URL}/#person` },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${SITE_URL}${OG_IMAGE}`,
                caption: OG_IMAGE_ALT,
              },
            },
            ...VENTURES.map((venture) => ({
              "@type": venture.slug === "rameelo" ? "NGO" : "Organization",
              "@id": `${SITE_URL}/#${venture.slug}`,
              name: venture.name,
              description: venture.summary,
              url: venture.url || `${SITE_URL}/ventures/${venture.slug}`,
              founder: { "@id": `${SITE_URL}/#person` },
            })),
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              ],
            },
          ],
        }}
      />
      <Hero />

      {/* ========================= START HERE ========================= */}
      <section id="start-here" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">02 — Start here</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch] mb-5">
                One person, three reasons you are probably here.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Hiring, a fan of the stage show, or completely new to all of this —
                pick the lane that fits and go straight to its page.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            {AUDIENCE_LANES.map((lane, index) => (
              <Link
                key={lane.title}
                href={lane.href}
                className={`group reveal py-10 flex flex-col border-line border-b md:border-b-0 ${
                  index === 0
                    ? "md:pr-10 md:border-r"
                    : index === AUDIENCE_LANES.length - 1
                      ? "md:pl-10"
                      : "md:px-10 md:border-r"
                }`}
              >
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">{lane.label}</p>
                  <span
                    className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
                  {lane.title}
                </h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">{lane.blurb}</p>
                <p className="label mt-auto">{lane.footnote}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SECTIONS ============================ */}
      {/* The whole site as nine cards, each with its own page behind it. */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">03 — The whole site</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch] mb-5">
                Nine places to go, each worth a read on its own.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Nothing here is a jump further down this page — every card opens a
                page you can read, bookmark and send to someone.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {SECTIONS.map((section) => (
              <Link key={section.href} href={section.href} className="group reveal flex flex-col">
                <Figure slot={section.slot} ratio="wide" className="mb-6" />
                <div className="flex items-start justify-between gap-5 mb-3">
                  <p className="label">{section.kicker}</p>
                  <span
                    className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                  {section.title}
                </h3>
                <p className="text-sm text-ink_3 leading-relaxed">{section.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= ACHIEVEMENTS ========================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">04 — Achievements</p>
            </div>
            <div className="lg:col-span-8 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[24ch]">
                Built, booked, shipped and published.
              </h2>
              <Link
                href="/achievements"
                className="label hover:text-ink transition inline-flex items-center gap-2 group"
              >
                The full record{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <ol className="border-t border-line">
            {HOME_ACHIEVEMENTS.map((item, index) => (
              <li key={item.title}>
                <Link
                  href={item.href ?? "/achievements"}
                  className="group reveal grid lg:grid-cols-12 gap-y-3 lg:gap-x-10 items-baseline border-b border-line py-8"
                >
                  <p className="label lg:col-span-1">{String(index + 1).padStart(2, "0")}</p>
                  <div className="lg:col-span-8">
                    <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink_3 leading-relaxed max-w-xl">{item.detail}</p>
                  </div>
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-5">
                    {item.year ? <p className="label !text-ink">{item.year}</p> : null}
                    {item.tag ? <p className="label">{item.tag}</p> : null}
                    <span
                      className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ VENTURES ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">05 — Ventures</p>
            </div>
            <div className="lg:col-span-8 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch]">
                Culture, software, real estate, advisory.
              </h2>
              <Link
                href="/ventures"
                className="label hover:text-ink transition inline-flex items-center gap-2 group"
              >
                All four{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
            {VENTURES.map((venture) => (
              <Link
                key={venture.slug}
                href={`/ventures/${venture.slug}`}
                className="group reveal flex flex-col"
              >
                <Figure slot={venture.slug} ratio="wide" className="mb-6" />
                <div className="flex items-start justify-between gap-5 mb-3">
                  <p className="label">{venture.category}</p>
                  <span
                    className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 group-hover:opacity-60 transition">
                  {venture.name}
                </h3>
                <p className="text-sm text-ink_3 leading-relaxed max-w-md">{venture.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ JOURNAL ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">06 — Journal</p>
            </div>
            <div className="lg:col-span-8 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[22ch]">
                Essays from the throne.
              </h2>
              <Link
                href="/articles"
                className="label hover:text-ink transition inline-flex items-center gap-2 group"
              >
                All articles{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="border-t border-line">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group reveal block border-b border-line py-8 lg:py-9"
              >
                <div className="grid lg:grid-cols-12 gap-y-3 lg:gap-x-10 items-baseline">
                  <p className="label lg:col-span-2">{String(index + 1).padStart(2, "0")}</p>
                  <div className="lg:col-span-7">
                    <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                      {article.title}
                    </h3>
                    <p className="text-sm text-ink_3 leading-relaxed max-w-xl">
                      {article.summary ?? article.subtitle}
                    </p>
                  </div>
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-6">
                    <p className="label">
                      {article.category} · {article.readingTime}
                    </p>
                    <span
                      className="arrow text-ink_3 group-hover:text-ink transition"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-ink text-paper p-6 sm:p-10 lg:p-20">
            <p className="label !text-paper/55 mb-8">07 — Contact</p>
            <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
              <div className="lg:col-span-7">
                <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] max-w-[20ch] mb-6">
                  Let&rsquo;s build something majestic.
                </h2>
                <p className="text-base text-paper/65 max-w-xl leading-relaxed">
                  Roles, consulting engagements, venture partnerships, speaking, or a
                  real conversation about hustle and purpose — reach out directly.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pl-10 lg:border-l border-paper/15">
                <p className="label !text-paper/55 mb-3">Direct</p>
                <a
                  href="mailto:heran@finityone.com"
                  className="block text-lg lg:text-xl font-medium tracking-tight mb-8 hover:opacity-60 transition break-all"
                >
                  heran@finityone.com
                </a>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-invert group">
                    All the ways{" "}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <a href="tel:+19499039366" className="btn btn-invert">
                    Call Heran
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
