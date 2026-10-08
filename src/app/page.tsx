import type { Metadata } from "next";
import Link from "next/link";

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
import { buildTourDates, buildTourMeta } from "@/lib/tour";
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
 * Tour rows label themselves played/upcoming against the current date, so the
 * static render is refreshed daily instead of being frozen at build time.
 */
export const revalidate = 86400;

/**
 * The three people who actually land here, in the order they are most likely
 * to arrive. The home page is organised around answering these three in turn,
 * so nobody has to guess which half of the page is meant for them:
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
      "Fair enough. Here is the two-minute version: who I am, what I build, what I write about, and why there is a garba tour in the middle of a founder's website.",
    footnote: "The short version",
    href: "#who",
  },
] as const;

/** The three threads that run through everything, for the cold visitor. */
const THREADS = [
  {
    kicker: "01 / Mindset",
    title: "The Hustle",
    body:
      "Stories, scars, and systems for staying locked in on the bigger dream without burning out the person chasing it.",
  },
  {
    kicker: "02 / Spirit",
    title: "Faith & Values",
    body:
      "Politics, religion, and philosophy from a grounded, son-of-immigrants lens — written without flinching.",
  },
  {
    kicker: "03 / Empire",
    title: "Brands & Moves",
    body:
      "Rameelo, FinityOne, Maharaja Estates, and the consulting practice — plus whatever venture comes next.",
  },
] as const;

export default function HomePage() {
  const tourDates = buildTourDates();
  const tourMeta = buildTourMeta(tourDates);
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
            /* The ventures as entities of their own, each pointing back at the
               Person node the layout declares. The person is referenced by
               @id rather than restated, so there is one definition of him. */
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
      {/* Three lanes, one per audience. This is the first thing below the
          hero on purpose: whoever you are, your path out of here is here. */}
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
                pick the lane that fits and skip the rest of the page.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            {AUDIENCE_LANES.map((lane, index) => {
              const position =
                index === 0
                  ? "md:pr-10 md:border-r"
                  : index === AUDIENCE_LANES.length - 1
                    ? "md:pl-10"
                    : "md:px-10 md:border-r";

              const inner = (
                <>
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
                  <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                    {lane.blurb}
                  </p>
                  <p className="label mt-auto">{lane.footnote}</p>
                </>
              );

              const shell = `group reveal py-10 flex flex-col border-line border-b md:border-b-0 ${position}`;

              /* The third lane is an in-page jump, not a route. */
              return lane.href.startsWith("#") ? (
                <a key={lane.title} href={lane.href} className={shell}>
                  {inner}
                </a>
              ) : (
                <Link key={lane.title} href={lane.href} className={shell}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ WHO I AM ============================ */}
      {/* Lane 3's destination: the plain-language introduction for a visitor
          who arrived with no context whatsoever. */}
      <section id="who" className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">03 — Who I am</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch] mb-7">
                The two-minute version.
              </h2>
              <div className="max-w-xl space-y-5">
                <p className="text-lg text-ink leading-relaxed">
                  I am Heran Patel. Online, and on a stage, most people know me as
                  HP Maharaja.
                </p>
                <p className="text-base text-ink_2 leading-relaxed">
                  The day job is software. I run{" "}
                  <Link href="/ventures/finityone" className="underline hover:opacity-60 transition">
                    FinityOne
                  </Link>
                  , a product studio building at the edges of fintech, event-tech and
                  proptech, and I consult for other tech ventures on{" "}
                  <Link href="/ventures/consulting" className="underline hover:opacity-60 transition">
                    product management and engineering teams at scale
                  </Link>{" "}
                  — the part where a company that shipped fast at ten people stops
                  shipping at forty.
                </p>
                <p className="text-base text-ink_2 leading-relaxed">
                  Alongside that:{" "}
                  <Link href="/ventures/maharaja-estates" className="underline hover:opacity-60 transition">
                    Maharaja Estates
                  </Link>
                  , an Arizona rental portfolio I buy, renovate and hold, and{" "}
                  <Link href="/ventures/rameelo" className="underline hover:opacity-60 transition">
                    Rameelo
                  </Link>
                  , a non-profit that puts Gujarati Raas Garba on a real stage across
                  America. That last one is why you may have seen me in front of a few
                  thousand people.
                </p>
                <p className="text-base text-ink_2 leading-relaxed">
                  And since 2013 I have been writing — essays on ambition, faith,
                  identity and the cost of chasing all of it at once. That is the
                  whole of it: build things, run things, write about what it costs.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/achievements" className="btn btn-solid group">
                  See what I&rsquo;ve built{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link href="/ventures" className="btn btn-ghost">
                  The ventures
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            {THREADS.map((thread, index) => (
              <div
                key={thread.title}
                className={`reveal py-10 border-line ${
                  index === 0
                    ? "md:pr-10 md:border-r"
                    : index === THREADS.length - 1
                      ? "md:pl-10 border-t md:border-t-0"
                      : "md:px-10 md:border-r border-t md:border-t-0"
                }`}
              >
                <p className="label mb-6">{thread.kicker}</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{thread.title}</h3>
                <p className="text-sm text-ink_3 leading-relaxed">{thread.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= ACHIEVEMENTS ========================= */}
      {/* A teaser, not the record. The full list lives at /achievements. */}
      <section id="achievements" className="py-20 lg:py-28">
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
      <section id="ventures" className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">05 — Ventures</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[30ch] mb-5">
                An ecosystem building culture, community, and real-world equity.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Four operating concerns across culture, software, real estate, and
                advisory work. Each one has its own page.
              </p>
            </div>
          </div>

          {/* Every card is an internal link to that venture's own page, which
              is where the outbound link to its live site lives. */}
          <div className="grid md:grid-cols-2 border-t border-line">
            {VENTURES.map((venture, index) => {
              const isLeftColumn = index % 2 === 0;
              const isLastRow = index >= VENTURES.length - 2;

              return (
                <Link
                  key={venture.slug}
                  href={`/ventures/${venture.slug}`}
                  className={`group reveal py-10 flex flex-col border-line ${
                    isLeftColumn ? "md:pr-12 md:border-r" : "md:pl-12"
                  } border-b ${isLastRow ? "md:border-b-0" : ""}`}
                >
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <p className="label">{String(index + 1).padStart(2, "0")}</p>
                    <span
                      className="arrow text-ink_3 group-hover:text-ink transition"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
                    {venture.name}
                  </h3>
                  <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                    {venture.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1">
                    <p className="label">{venture.category}</p>
                    <p className="label">{venture.role}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="mailto:heran@finityone.com?subject=Founder%20Intro&body=Company%3A%0AWhat%20you%27re%20building%3A%0AWhere%20we%20overlap%3A"
              className="btn btn-solid group"
            >
              Founder intro{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <Link href="/ventures" className="btn btn-ghost">
              All four, in detail
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== PROFESSIONAL RECORD ===================== */}
      {/* Condensed on the home page; the full version is /hiring. The
          `for-recruiters` id is kept because the nav and footer point at it. */}
      <section id="for-recruiters" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">06 — For recruiters</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch] mb-5">
                A founder who builds it end to end.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Four ventures across software, real estate, live events and the
                non-profit world — which has meant owning product, finance, hiring,
                vendors and delivery against real deadlines with real money on the
                line. Fintech and proptech are the home turf.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 border-t border-line">
            <div className="reveal lg:col-span-4 py-10 lg:pr-10 lg:border-r border-line">
              <p className="label mb-6">Operating strengths</p>
              <ul className="space-y-3 text-sm text-ink_3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Zero-to-one product and launch</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Full-stack build and ship</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Product management at scale</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Engineering org design</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>P&amp;L, budgeting, vendor negotiation</span>
                </li>
              </ul>
            </div>

            <div className="reveal lg:col-span-4 py-10 border-t lg:border-t-0 lg:px-10 lg:border-r border-line">
              <p className="label mb-6">Domains</p>
              <ul className="space-y-3 text-sm text-ink_3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Fintech — payments and reconciliation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Proptech and real estate operations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Event-tech, ticketing and live ops</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink_3" aria-hidden="true">·</span>
                  <span>Non-profit and community programs</span>
                </li>
              </ul>
            </div>

            <div className="reveal lg:col-span-4 py-10 border-t lg:border-t-0 lg:pl-10 border-line flex flex-col">
              <p className="label mb-6">Open to</p>
              <p className="text-sm text-ink_3 leading-relaxed mb-8">
                Leadership roles, advisory and fractional work, and board seats. Send
                the role, the team, and the problem you need solved — you will get a
                straight answer on whether I am the right fit.
              </p>
              <dl className="space-y-4 text-sm mb-9">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <dt className="label">Based</dt>
                  <dd className="text-ink text-right">Phoenix, Arizona</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label">Email</dt>
                  <dd className="text-right">
                    <a
                      href="mailto:heran@finityone.com"
                      className="text-ink hover:opacity-60 transition break-all"
                    >
                      heran@finityone.com
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-3 mt-auto">
                <Link href="/hiring" className="btn btn-solid group">
                  The full record{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <a
                  href="mailto:heran@finityone.com?subject=Opportunity%20for%20Heran%20Patel&body=Role%3A%0ACompany%3A%0AWhat%20you%20need%20built%3A"
                  className="btn btn-ghost"
                >
                  Send a role
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TOUR ============================ */}
      {/* Lane 2's destination on this page: framed for someone who saw the
          stage show and is working backwards to what Rameelo is. */}
      <section id="tour" className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-12">
            <div className="lg:col-span-4">
              <p className="label">07 — Rameelo on tour</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[24ch] mb-5">
                Saw me on a stage? This was it.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed mb-7">
                Rameelo Garba Tour 2026 — across America, one garba community. Joined
                on tour by Suchit &amp; Bhrugesh, supporting Rameelo organizers at
                their events.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://rameelo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid group"
                >
                  Tickets at rameelo.com{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <Link href="/ventures/rameelo" className="btn btn-ghost">
                  What Rameelo is
                </Link>
              </div>
            </div>
          </div>

          {/* Tour fact strip */}
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-line mb-2">
            <div className="py-6 pr-6 lg:border-r border-line">
              <dt className="label mb-2">Events</dt>
              <dd className="text-xl font-semibold tracking-tight">{tourMeta.events}</dd>
            </div>
            <div className="py-6 pl-6 lg:pl-7 lg:pr-6 lg:border-r border-line">
              <dt className="label mb-2">Cities</dt>
              <dd className="text-xl font-semibold tracking-tight">{tourMeta.cities}</dd>
            </div>
            <div className="py-6 pr-6 lg:pl-7 lg:border-r border-line">
              <dt className="label mb-2">Run</dt>
              <dd className="text-xl font-semibold tracking-tight">{tourMeta.window}</dd>
            </div>
            <div className="py-6 pl-6 lg:pl-7">
              <dt className="label mb-2">Still to come</dt>
              <dd className="text-xl font-semibold tracking-tight">
                {tourMeta.remaining > 0
                  ? `${tourMeta.remaining} date${tourMeta.remaining === 1 ? "" : "s"}`
                  : "Tour wrapped"}
              </dd>
            </div>
          </dl>

          {/* Tour dates */}
          <div className="border-t border-line">
            {tourDates.map((stop) => (
              <div
                key={`${stop.starts}-${stop.city}`}
                className="reveal grid lg:grid-cols-12 gap-y-2 lg:gap-x-10 items-baseline border-b border-line py-6"
              >
                <p className="label lg:col-span-1">{String(stop.position).padStart(2, "0")}</p>
                <p className={`label lg:col-span-2 ${stop.isPast ? "!text-ink_3" : "!text-ink"}`}>
                  {stop.dateLabel}
                </p>
                <div className="lg:col-span-6">
                  <p
                    className={`text-base lg:text-lg font-medium tracking-tight ${
                      stop.isPast ? "text-ink_2" : "text-ink"
                    }`}
                  >
                    {stop.artist}
                  </p>
                  <p className="text-sm text-ink_3 mt-0.5">{stop.city}</p>
                </div>
                <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
                  <p className="label">{stop.organizer}</p>
                  {stop.isPast ? (
                    <span className="label shrink-0">Played</span>
                  ) : (
                    <span className="label !text-ink shrink-0 inline-flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-ink inline-block"
                        aria-hidden="true"
                      ></span>
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ MEDIA ============================ */}
      <section id="media" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-px bg-line">
            {/* Music */}
            <div
              id="music"
              className="bg-ink text-paper p-6 sm:p-10 lg:p-14 flex flex-col min-h-[22rem]"
            >
              <p className="label !text-paper/55 mb-8">08 — Music</p>
              <h3 className="display text-[clamp(1.6rem,2.8vw,2.4rem)] mb-4 max-w-[18ch]">
                HP Maharaja on the mic.
              </h3>
              <p className="text-sm text-paper/65 leading-relaxed mb-10 max-w-sm">
                Rap tracks about hustle, heartbreak, faith, and building something
                bigger than yourself.
              </p>
              <div className="mt-auto">
                <a
                  href="https://soundcloud.com/hpmaharaja"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-invert group"
                >
                  Open SoundCloud{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Vlogs */}
            <div id="vlogs" className="bg-surface p-6 sm:p-10 lg:p-14 flex flex-col min-h-[22rem]">
              <p className="label mb-8">09 — Vlogs</p>
              <h3 className="display text-[clamp(1.6rem,2.8vw,2.4rem)] mb-4 max-w-[18ch]">
                Life in motion.
              </h3>
              <p className="text-sm text-ink_3 leading-relaxed mb-10 max-w-sm">
                Trips, events, late-night sessions, and behind-the-scenes of building
                the empire.
              </p>
              <div className="mt-auto">
                <a
                  href="https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost group"
                >
                  Watch on YouTube{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ JOURNAL ============================ */}
      <section id="articles" className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">10 — Journal</p>
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

      {/* ============================ MERCH ============================ */}
      <section id="merch" className="py-20 lg:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
            <div className="lg:col-span-7">
              <p className="label mb-7">11 — Merch · Coming soon</p>
              <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] max-w-[20ch] mb-6">
                Wear the crown before the world knows the name.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Limited-drop hoodies, tees, and pieces inspired by royal Indian
                aesthetics, NYC grit, and West Coast hustle. Early supporters get
                first dibs.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-10 lg:border-l border-line">
              <p className="label mb-3">Drop 001</p>
              <p className="text-lg font-medium tracking-tight mb-7">HP Maharaja Essentials</p>
              <a
                href="mailto:heran@finityone.com?subject=Merch%20Drop%20List&body=Add%20me%20to%20the%20Maharaja%20merch%20list."
                className="btn btn-solid group w-full sm:w-auto"
              >
                Join the list{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ COMMUNITY ============================ */}
      <section id="community" className="py-20 lg:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">12 — Community</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch] mb-5">
                For the grinders trying to hold faith, family, and ambition at once.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Built for the kids of immigrants — the ones who refuse to lose
                themselves on the way up.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 border-t border-line">
            <div className="reveal py-10 md:pr-10 md:border-r border-line">
              <p className="label mb-6">01</p>
              <h3 className="text-lg font-semibold tracking-tight mb-3">Share your story</h3>
              <p className="text-sm text-ink_3 leading-relaxed">
                Send your journey. Some stories get featured in future articles and vlogs.
              </p>
            </div>
            <div className="reveal py-10 border-t md:border-t-0 border-line md:px-10 md:border-r">
              <p className="label mb-6">02</p>
              <h3 className="text-lg font-semibold tracking-tight mb-3">Collab on content</h3>
              <p className="text-sm text-ink_3 leading-relaxed">
                Producers, videographers, writers — if the mission resonates, reach out.
              </p>
            </div>
            <div className="reveal py-10 border-t md:border-t-0 border-line md:pl-10">
              <p className="label mb-6">03</p>
              <h3 className="text-lg font-semibold tracking-tight mb-3">Pull up in real life</h3>
              <p className="text-sm text-ink_3 leading-relaxed">
                Rameelo, Phoenix linkups, and future Maharaja pop-ups tied to trips and shows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-ink text-paper p-6 sm:p-10 lg:p-20">
            <p className="label !text-paper/55 mb-8">13 — Contact</p>
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
                  <a href="tel:+19499039366" className="btn btn-invert">
                    Call Heran
                  </a>
                  <a href="mailto:heran@finityone.com" className="btn btn-invert group">
                    Email Heran{" "}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
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
