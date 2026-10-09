/**
 * Every image slot on the site, in one place.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * REPLACING A PLACEHOLDER WITH A REAL PHOTOGRAPH
 *
 * Each slot renders vector placeholder art (see src/components/SectionArt.tsx)
 * until you give it a `src`. Drop the file into public/images/… and set it:
 *
 *   tour: {
 *     art: "tour",
 *     src: "/images/tour/garba-crowd-boston.jpg",   // ← add this line
 *     alt: "A packed garba floor in Boston, mid-raas",
 *   },
 *
 * `Figure` then renders the photograph and the placeholder is never drawn.
 * Keep `art` in place as the fallback, and always write a real `alt` — it is
 * what a screen reader and an image search both read.
 *
 * A note on file size: the two photographs already in the repo are 5MB and
 * 8MB. Export replacements at roughly 2000px wide and under ~400KB, or they
 * will dominate page load.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import type { ArtVariant } from "@/components/SectionArt";

export type ArtworkSlot = {
  /** Placeholder art drawn when `src` is unset. */
  art: ArtVariant;
  /** Real photograph, once there is one. */
  src?: string;
  /** Describes the image. Required: it is read aloud and indexed. */
  alt: string;
};

export const ARTWORK: Record<string, ArtworkSlot> = {
  about: {
    art: "portrait",
    src: "/images/base/header-bg.jpg",
    alt: "Heran Patel, also known as HP Maharaja",
  },
  achievements: {
    art: "achievements",
    alt: "An ascending series of bars, representing a record built over time",
  },
  ventures: {
    art: "ventures",
    alt: "Four linked quadrants, one for each operating venture",
  },
  hiring: {
    art: "advisory",
    alt: "A branching organisation chart",
  },
  tour: {
    art: "tour",
    alt: "A dashed route connecting tour stops across a map",
  },
  music: {
    art: "music",
    alt: "An audio waveform",
  },
  vlogs: {
    art: "vlogs",
    alt: "A strip of film frames with a play symbol",
  },
  journal: {
    art: "journal",
    alt: "A typeset page with a drop capital",
  },
  merch: {
    art: "merch",
    alt: "A folded garment, photographed flat",
  },
  community: {
    art: "community",
    alt: "A mesh of connected people",
  },
  contact: {
    art: "contact",
    alt: "An opened envelope with a signal arc",
  },

  /* One per venture, keyed by slug so a venture page can look its own up. */
  rameelo: {
    art: "culture",
    alt: "Concentric rings of garba dancers seen from above",
  },
  finityone: {
    art: "studio",
    alt: "Stacked product panels beside a column of ledger rows",
  },
  "maharaja-estates": {
    art: "estate",
    alt: "A row of house elevations along a street line",
  },
  consulting: {
    art: "advisory",
    alt: "A branching organisation chart",
  },
};

/** Falls back to the ventures art rather than throwing on an unknown key. */
export function artworkFor(key: string): ArtworkSlot {
  return ARTWORK[key] ?? ARTWORK.ventures;
}
