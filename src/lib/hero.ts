/**
 * Hero content, kept out of the components so the copy can be edited without
 * touching animation code.
 *
 * Everything here is rendered server-side into the HTML. The client components
 * only animate between states that already exist in the markup, which keeps the
 * hero fully readable for crawlers, for AI agents reading the raw page, and for
 * anyone whose JS never arrives.
 *
 * Counts are derived from the lists the rest of the site already uses —
 * `VENTURES` and the tour schedule — so the hero cannot drift out of date when
 * a company or a tour stop is added.
 */

import { VENTURES } from "./seo";
import { buildTourDates, buildTourMeta, type TourDate, type TourMeta } from "./tour";

/** The rotating identity panel: one claim, one piece of evidence. */
export type HeroFacet = {
  /** Short role word, the headline of the facet. */
  word: string;
  /** What that role actually means in practice. */
  line: string;
  /** Hard number or name backing it up. */
  proofLabel: string;
  proofValue: string;
  /** Where the "see it" link points. */
  href: string;
  hrefLabel: string;
};

/** Small counts read better spelled out in running prose than as digits. */
const NUMBER_WORDS = ["zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

function spell(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

export function buildHeroFacets(meta: TourMeta = buildTourMeta(buildTourDates())): HeroFacet[] {
  const ventureNames = VENTURES.map((venture) => venture.name).join(" · ");

  return [
    {
      word: "Founder",
      line: `${spell(VENTURES.length)} operating companies across culture, software, real estate, and design.`,
      proofLabel: "Ventures",
      proofValue: ventureNames,
      href: "#ventures",
      hrefLabel: "See the portfolio",
    },
    {
      word: "Operator",
      line: "A national garba tour run end to end — routing, artists, production, ticketing.",
      proofLabel: "Rameelo Tour 2026",
      proofValue: `${meta.events} events · ${meta.cities} cities · ${meta.window}`,
      href: "#tour",
      hrefLabel: "See the routing",
    },
    {
      word: "Creator",
      line: "Rap and vlogs as HP Maharaja, made for everyone who grew up between two worlds.",
      proofLabel: "Channels",
      proofValue: "YouTube · SoundCloud · Instagram",
      href: "#media",
      hrefLabel: "Watch & listen",
    },
    {
      word: "Writer",
      line: "Long-form essays on ambition, faith, dharma, and the cost of chasing both.",
      proofLabel: "Writing since",
      proofValue: "2013 · essays from the throne",
      href: "/articles",
      hrefLabel: "Read the journal",
    },
  ];
}

/** The hairline fact strip under the hero. Static, scannable, SEO-visible. */
export const HERO_FACTS = [
  { label: "Ventures", value: "Four" },
  { label: "Based", value: "New York City" },
  { label: "Writing since", value: "2013" },
  { label: "Operating thesis", value: "Discipline" },
] as const;

/** Marquee strip. Pure CSS motion, so it costs nothing on the main thread. */
export const HERO_TICKER = [
  "Pursuing balance in chaos",
  "#HustleMindset",
  "Raas Garba at national scale",
  "Built in the open",
  "Gujarati American",
  "Discipline over motivation",
  "Faith · Family · Ambition",
  "Tempe → New York City",
] as const;

/**
 * The boot sequence printed while the counter climbs to 100%.
 *
 * Each line is real information about the site rather than filler, so the
 * loader doubles as the first thing a visitor reads. `at` is the percentage at
 * which the line commits, which keeps the copy and the number in step.
 */
export type HeroBootLine = { at: number; label: string; value: string };

export function buildHeroBootLines(
  tour: TourDate[] = buildTourDates(),
  meta: TourMeta = buildTourMeta(tour),
): HeroBootLine[] {
  const next = tour.find((stop) => !stop.isPast);

  return [
    { at: 16, label: "Identity", value: "Heran Patel · aka HP Maharaja" },
    {
      at: 40,
      label: "Ventures online",
      value: `${spell(VENTURES.length)} companies — culture, software, real estate, design`,
    },
    {
      at: 64,
      label: "Tour status",
      value: next
        ? `${meta.remaining} of ${meta.events} events ahead · next ${next.dateLabel}, ${next.city}`
        : `Rameelo Tour 2026 complete · ${meta.events} events, ${meta.cities} cities`,
    },
    { at: 86, label: "Journal", value: "Essays on ambition, faith, and identity" },
    { at: 100, label: "Ready", value: "Pursuing balance in chaos" },
  ];
}

/** Next unplayed stop, for the live countdown. Null once the tour has wrapped. */
export function nextTourStop(tour: TourDate[] = buildTourDates()): TourDate | null {
  return tour.find((stop) => !stop.isPast) ?? null;
}
