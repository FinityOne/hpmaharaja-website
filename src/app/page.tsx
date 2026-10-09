import type { Metadata } from "next";
import Link from "next/link";

import Figure from "@/components/Figure";
import Hero from "@/components/hero/Hero";
import JsonLd from "@/components/JsonLd";
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
import { buildTourDates, buildTourMeta, nextTourStop } from "@/lib/tour";
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
 * The hero and the "right now" row both name the next tour stop, so the static
 * render is refreshed daily rather than frozen at build time.
 */
export const revalidate = 86400;

/**
 * The page reads as one conversation, top to bottom:
 *
 *   hero          → who I am
 *   who are you   → three doors, in the visitor's own voice
 *   the numbers   → one glance at the scale
 *   right now     → what is actually happening this month
 *   what I run    → the four ventures
 *   in my words   → the writing
 *   say hello     → one warm way to start
 *
 * Each block has exactly one thing to do next. The previous version repeated
 * itself — a nine-card index of the whole site, then separate achievements,
 * ventures and journal lists covering the same ground — which is what made
 * the scroll feel busy. Site-wide navigation belongs to the nav and footer;
 * this page only has to get a person moving in the right direction.
 */
const DOORS = [
  {
    /* First person, from the reader's side — it is faster to recognise
       yourself in a sentence you would actually say. */
    said: "I'm hiring.",
    answer: "Here's the professional record.",
    blurb:
      "Product and engineering leadership across four ventures, fintech and proptech. Strengths, what I'm open to, and how to send a role.",
    cta: "See the record",
    href: "/hiring",
    slot: "hiring",
  },
  {
    said: "I saw you on stage.",
    answer: "That was Rameelo.",
    blurb:
      "A non-profit putting Gujarati Raas Garba on a real stage across America. Here's what it is, who plays, and where we're headed next.",
    cta: "Meet Rameelo",
    href: "/ventures/rameelo",
    slot: "rameelo",
  },
  {
    said: "No idea who you are.",
    answer: "Totally fair.",
    blurb:
      "The two-minute version: what I build, what I write about, and why there's a garba tour in the middle of a founder's website.",
    cta: "Start from zero",
    href: "/about",
    slot: "about",
  },
] as const;

export default function HomePage() {
  const articles = loadAllArticles();
  const latest = articles[0];
  const recent = articles.slice(0, 3);

  const tourDates = buildTourDates();
  const tourMeta = buildTourMeta(tourDates);
  const next = nextTourStop(tourDates);

  /* One scannable line of scale, each number already true elsewhere on the
     site rather than asserted here. */
  const numbers = [
    { value: String(VENTURES.length), label: "Ventures built" },
    { value: String(tourMeta.events), label: "Nights on the 2026 tour" },
    { value: String(tourMeta.cities), label: "Cities on the run" },
    { value: "2013", label: "Writing since" },
  ];

  /* Present tense on purpose: this is the part of the page that should feel
     alive, and every row is generated from real data. */
  const rightNow = [
    next
      ? {
          kicker: "On the road",
          headline: `${next.artist} — ${next.city}`,
          detail: `${next.dateLabel}. ${tourMeta.remaining} of ${tourMeta.events} nights still ahead on the Rameelo Garba Tour.`,
          cta: "See the dates",
          href: "/tour",
        }
      : {
          kicker: "On the road",
          headline: "The 2026 run has wrapped",
          detail: `${tourMeta.events} nights across ${tourMeta.cities} cities, ${tourMeta.window}.`,
          cta: "See how it went",
          href: "/tour",
        },
    {
      kicker: "At the desk",
      headline: "Building at FinityOne",
      detail:
        "Shipping software where fintech, event-tech and proptech overlap — money movement on one side, seats and doors on the other.",
      cta: "See the studio",
      href: "/ventures/finityone",
    },
    {
      kicker: "Open right now",
      headline: "Taking select consulting engagements",
      detail:
        "Product management and engineering teams at scale, for fintech and proptech ventures that were fast at ten people and aren't at forty.",
      cta: "Scope an engagement",
      href: "/ventures/consulting",
    },
  ];

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

      {/* ========================= WHO ARE YOU? ========================= */}
      <section id="start-here" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16">
            <p className="label mb-6">Pick a door</p>
            <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] max-w-[22ch] mb-6">
              So — which one are you?
            </h2>
            <p className="text-lg text-ink_2 leading-relaxed max-w-[48ch]">
              Three kinds of people end up here. Find the sentence you&rsquo;d actually
              say and I&rsquo;ll take you straight there.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {DOORS.map((door) => (
              <Link key={door.href} href={door.href} className="group reveal flex flex-col">
                <Figure slot={door.slot} ratio="wide" className="mb-7" />
                {/* The visitor's line, set large — it is the thing being
                    scanned for. The answer sits under it, quieter. */}
                <p className="text-2xl lg:text-[1.75rem] font-semibold tracking-tight leading-snug mb-2">
                  &ldquo;{door.said}&rdquo;
                </p>
                <p className="text-base text-ink_2 mb-4">{door.answer}</p>
                <p className="text-sm text-ink_3 leading-relaxed mb-7">{door.blurb}</p>
                <span className="label mt-auto inline-flex items-center gap-2 group-hover:text-ink transition">
                  {door.cta}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= THE NUMBERS ========================= */}
      {/* One glance at the scale, and the only route to /achievements that
          this page needs. */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {numbers.map((item) => (
              <div key={item.label}>
                <dd className="display text-[clamp(2.4rem,5vw,4rem)] leading-none mb-3">
                  {item.value}
                </dd>
                <dt className="label !text-paper/55">{item.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-14 pt-10 border-t border-paper/15 flex flex-wrap items-center justify-between gap-6">
            <p className="text-lg text-paper/70 max-w-[44ch] leading-relaxed">
              Every one of those is something that shipped. The full record, with
              nothing padded out, is one click away.
            </p>
            <Link href="/achievements" className="btn btn-invert group shrink-0">
              See the achievements
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= RIGHT NOW ========================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16">
            <p className="label mb-6">Right now</p>
            <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] max-w-[24ch] mb-6">
              What I&rsquo;m actually doing this month.
            </h2>
            <p className="text-lg text-ink_2 leading-relaxed max-w-[48ch]">
              Not a highlight reel from five years ago. These three are live.
            </p>
          </div>

          <div className="border-t border-line">
            {rightNow.map((item) => (
              <Link
                key={item.kicker}
                href={item.href}
                className="group reveal block border-b border-line py-9 lg:py-10"
              >
                <div className="grid lg:grid-cols-12 gap-y-4 lg:gap-x-10 items-baseline">
                  <p className="label lg:col-span-3 !text-ink">{item.kicker}</p>
                  <div className="lg:col-span-6">
                    <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                      {item.headline}
                    </h3>
                    <p className="text-sm text-ink_3 leading-relaxed max-w-xl">{item.detail}</p>
                  </div>
                  <p className="lg:col-span-3 label inline-flex items-center gap-2 lg:justify-end group-hover:text-ink transition">
                    {item.cta}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= WHAT I RUN ========================= */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16">
            <p className="label mb-6">What I run</p>
            <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] max-w-[24ch] mb-6">
              Four things, four very different problems.
            </h2>
            <p className="text-lg text-ink_2 leading-relaxed max-w-[48ch]">
              Culture, software, real estate, and the advisory work that ties them
              together. Each one has a page of its own.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10 lg:gap-12">
            {VENTURES.map((venture) => (
              <Link
                key={venture.slug}
                href={`/ventures/${venture.slug}`}
                className="group reveal flex flex-col"
              >
                <Figure slot={venture.slug} ratio="wide" className="mb-7" />
                <p className="label mb-3">{venture.category}</p>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 group-hover:opacity-60 transition">
                  {venture.name}
                </h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  {venture.summary}
                </p>
                <span className="label mt-auto inline-flex items-center gap-2 group-hover:text-ink transition">
                  Read more
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= IN MY WORDS ========================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-16">
            <div className="lg:col-span-5">
              <p className="label mb-6">In my own words</p>
              <blockquote className="display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.15] mb-8">
                &ldquo;Nobody hands you the playbook for holding two worlds at
                once. So you write it down as you go.&rdquo;
              </blockquote>
              <p className="text-base text-ink_2 leading-relaxed max-w-[44ch] mb-9">
                I&rsquo;ve been publishing since 2013 — on ambition, faith, identity,
                and what chasing all of it actually costs. Written for the kids of
                immigrants who refuse to lose themselves on the way up.
              </p>
              <Link href="/articles" className="btn btn-solid group">
                Read the journal
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="lg:col-span-7">
              {latest ? (
                <Link href={`/articles/${latest.slug}`} className="group reveal block mb-10">
                  <Figure slot="journal" ratio="band" className="mb-6" />
                  <p className="label mb-3">
                    Latest · {latest.category} · {latest.readingTime}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 group-hover:opacity-60 transition">
                    {latest.title}
                  </h3>
                  <p className="text-base text-ink_3 leading-relaxed max-w-xl">
                    {latest.summary ?? latest.subtitle}
                  </p>
                </Link>
              ) : null}

              <div className="border-t border-line">
                {recent.slice(1).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group reveal flex items-baseline justify-between gap-6 border-b border-line py-6"
                  >
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight mb-1 group-hover:opacity-60 transition">
                        {article.title}
                      </h4>
                      <p className="label">
                        {article.category} · {article.readingTime}
                      </p>
                    </div>
                    <span
                      className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= SAY HELLO ========================= */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-ink text-paper px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
            <div className="max-w-3xl">
              <p className="label !text-paper/55 mb-6">Say hello</p>
              <h2 className="display text-[clamp(2.2rem,5vw,3.8rem)] max-w-[20ch] mb-7">
                Still reading? Then just email me.
              </h2>
              <p className="text-lg text-paper/70 leading-relaxed max-w-[46ch] mb-10">
                It comes to me, not to an assistant. Tell me what you&rsquo;re working
                on and what you need — you&rsquo;ll get a straight answer, including
                when the answer is no.
              </p>
              <a
                href="mailto:heran@finityone.com"
                className="block display text-[clamp(1.2rem,3vw,2.2rem)] mb-10 hover:opacity-60 transition break-all"
              >
                heran@finityone.com
              </a>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-invert group">
                  All the ways to reach me
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <a href="tel:+19499039366" className="btn btn-invert">
                  Or call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
