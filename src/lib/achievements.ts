/**
 * The achievements record, rendered at /achievements and teased on the home page.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * EDITING NOTE
 * Every entry below is sourced from something already published on this site —
 * the venture portfolio (src/lib/ventures.ts), the Rameelo tour (src/lib/tour.ts)
 * and the journal archive (content/articles/). Nothing here is invented, and
 * `year` is intentionally omitted wherever the real date is not on record yet.
 *
 * TODO (Heran): the things only you can confirm are not here yet. Add them by
 * dropping entries into the tracks below — awards, press and features, speaking
 * slots, attendance or revenue milestones, certifications, roles held, and
 * founding years for each venture. Template:
 *
 *   { year: "2024", title: "Featured in <publication>", detail: "One sentence.",
 *     tag: "Press", href: "https://…" },
 *
 * The page renders whatever is in this file, so adding an entry is the only
 * step — no layout changes needed.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type Achievement = {
  /** Omitted when the exact year is not on record. */
  year?: string;
  title: string;
  detail: string;
  /** Short badge, e.g. "Founder", "Tour", "Press". */
  tag?: string;
  /** Internal path or external URL for "read more". */
  href?: string;
};

export type AchievementTrack = {
  id: string;
  label: string;
  headline: string;
  blurb: string;
  items: Achievement[];
};

export const ACHIEVEMENT_TRACKS: AchievementTrack[] = [
  {
    id: "building",
    label: "Building & operating",
    headline: "Four things that had to be built from nothing.",
    blurb:
      "Each of these started as an idea with no team, no budget and no template. Owning them has meant owning product, finance, hiring, vendors and delivery — against real deadlines, with real money on the line.",
    items: [
      {
        title: "Founded Rameelo",
        detail:
          "A non-profit reimagining Gujarati Raas Garba as large-scale cultural experiences, now touring nationally.",
        tag: "Founder",
        href: "/ventures/rameelo",
      },
      {
        title: "Founded FinityOne",
        detail:
          "A product studio shipping software at the intersection of fintech, event-tech and proptech — full-stack, built in-house.",
        tag: "Founder",
        href: "/ventures/finityone",
      },
      {
        title: "Built the Maharaja Estates portfolio",
        detail:
          "An Arizona residential portfolio acquired, renovated hands-on, and held long-term rather than flipped.",
        tag: "Principal",
        href: "/ventures/maharaja-estates",
      },
      {
        year: "2026",
        title: "Opened a consulting practice for tech ventures",
        detail:
          "Advising fintech and proptech companies on product management and engineering team design as they scale past the point where one conversation holds the whole org.",
        tag: "Consultant",
        href: "/ventures/consulting",
      },
      {
        title: "Ran a P&L end to end, four times over",
        detail:
          "Budgeting, vendor negotiation, hiring and volunteer leadership across a non-profit, a software studio, a real-estate portfolio and an advisory practice.",
        tag: "Operating",
      },
    ],
  },
  {
    id: "stage",
    label: "Stage & culture",
    headline: "Twelve nights, six cities, one garba community.",
    blurb:
      "If you have seen me on a stage somewhere in America, it was almost certainly a Rameelo night. The 2026 run is the clearest picture of the scale.",
    items: [
      {
        year: "2026",
        title: "Rameelo Garba Tour 2026",
        detail:
          "Twelve ticketed events across six cities, Aug 29 – Oct 17 — Los Angeles, Boston, Bensalem, Greenville, Orlando and Austin.",
        tag: "Tour",
        href: "/#tour",
      },
      {
        year: "2026",
        title: "Booked national touring artists",
        detail:
          "Atul Purohit, Kirtidan Gadhvi, Geeta Rabari, Aishwarya Majmudar, Jigardan Gadhavi and Jignesh Barot across the 2026 run.",
        tag: "Booking",
      },
      {
        year: "2026",
        title: "Partnered with organizers in every city",
        detail:
          "ICAP USA, VOI, VUF, Nexstar, Barn Entertainment, 1 Culture Entertainment, Mahadev Entertainment and G2 Entertainment — co-hosting rather than parachuting in.",
        tag: "Partnerships",
      },
      {
        title: "Production at venue scale",
        detail:
          "Stage, sound, vendors, ticketing and crowd flow for multi-thousand-capacity rooms, run by a volunteer-powered non-profit.",
        tag: "Operations",
      },
    ],
  },
  {
    id: "platform",
    label: "Writing, music & platform",
    headline: "A body of work, kept up for over a decade.",
    blurb:
      "The HP Maharaja side of the house: essays, music and vlogs on ambition, faith, identity and the pursuit of balance in chaos.",
    items: [
      {
        year: "2013",
        title: "Started publishing",
        detail:
          "Writing and releasing under the HP Maharaja name since 2013 — before any of the ventures existed.",
        tag: "Since 2013",
      },
      {
        title: "Maharaja News, the journal",
        detail:
          "Long-form essays on hustle, faith, politics, culture and dharma, written without flinching and published independently.",
        tag: "Writing",
        href: "/articles",
      },
      {
        title: "Music and vlogs as HP Maharaja",
        detail:
          "A rap catalogue on SoundCloud and a vlog archive on YouTube documenting the build in real time.",
        tag: "Media",
        href: "/#media",
      },
    ],
  },
];

/** Flat list, for structured data and counts. */
export const ALL_ACHIEVEMENTS: Achievement[] = ACHIEVEMENT_TRACKS.flatMap(
  (track) => track.items,
);

/**
 * The handful of lines worth putting on the home page. Keyed by title so the
 * detail copy never drifts from the full record below it.
 */
export const HOME_ACHIEVEMENT_TITLES = [
  "Rameelo Garba Tour 2026",
  "Founded FinityOne",
  "Opened a consulting practice for tech ventures",
  "Started publishing",
];

export const HOME_ACHIEVEMENTS: Achievement[] = HOME_ACHIEVEMENT_TITLES.flatMap(
  (title) => ALL_ACHIEVEMENTS.filter((item) => item.title === title),
);
