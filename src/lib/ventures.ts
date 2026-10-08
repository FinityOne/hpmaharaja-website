/**
 * The venture portfolio — the single source of truth for the home page cards,
 * the /ventures index and each /ventures/[slug] page.
 *
 * Melux Events was removed deliberately: Heran is no longer involved with it.
 * Do not re-add it. The focus is Rameelo, FinityOne, Maharaja Estates, and the
 * consulting practice.
 */

export type Venture = {
  slug: string;
  name: string;
  /**
   * The venture's own live site, or "" when it does not have one yet. Used by
   * the structured data and llms-full.txt; an empty string renders as plain
   * text rather than a dead link.
   */
  url: string;
  /** Short line under the card title, e.g. "Culture · Non-profit". */
  category: string;
  role: string;
  status: string;
  based: string;
  /** One sentence, used on the home page and the ventures index. */
  summary: string;
  /** Headline for the dedicated page. */
  headline: string;
  /** Lead paragraph for the dedicated page. */
  lead: string;
  /** Body paragraphs for the dedicated page. */
  body: string[];
  /** Hard facts, rendered as a definition list. */
  facts: { label: string; value: string }[];
  /** What this venture actually does, as scannable bullets. */
  highlights: string[];
  /** Who should reach out about this venture, and why. */
  whoShouldReachOut: string;
  cta: { label: string; href: string };
  /** Links to the related section or page elsewhere on this site. */
  related?: { label: string; href: string }[];
};

export const VENTURES: Venture[] = [
  {
    slug: "rameelo",
    name: "Rameelo",
    url: "https://rameelo.com",
    category: "Culture · Non-profit",
    role: "Founder",
    status: "Active · Touring",
    based: "National (US)",
    summary:
      "Non-profit reimagining Gujarati Raas Garba as large-scale cultural experiences across America.",
    headline: "Garba, staged like it deserves to be.",
    lead:
      "Rameelo is a non-profit built on a simple belief: the traditions our parents carried over deserve production value, not a rented hall and an apology. It books the artists people actually travel for, partners with the community organizations that already hold the trust, and puts the whole thing on a real stage.",
    body: [
      "Most garba nights in America run on volunteer goodwill and a thin margin. Rameelo keeps the goodwill and adds the operating discipline — ticketing, artist contracts, venue and vendor negotiation, production, crowd flow, and the financial plumbing that keeps a non-profit honest about where the money went.",
      "The 2026 run is twelve ticketed events across six cities, in partnership with organizers including ICAP USA, VOI, VUF, Nexstar, Barn Entertainment, 1 Culture Entertainment, Mahadev Entertainment and G2 Entertainment — with artists from Atul Purohit and Kirtidan Gadhvi to Geeta Rabari, Aishwarya Majmudar, Jigardan Gadhavi and Jignesh Barot.",
      "If you have seen me on a stage somewhere between Los Angeles and Boston, this is what you were standing in.",
    ],
    facts: [
      { label: "Structure", value: "Non-profit" },
      { label: "Role", value: "Founder" },
      { label: "2026 run", value: "12 events · 6 cities" },
      { label: "Window", value: "Aug 29 – Oct 17, 2026" },
    ],
    highlights: [
      "Artist booking and contracting with national touring acts",
      "Partnerships with established community organizers in each city",
      "End-to-end event production: venue, sound, stage, vendors, crowd flow",
      "Ticketing, budgeting and non-profit financial reporting",
      "Volunteer recruiting and on-site team leadership",
    ],
    whoShouldReachOut:
      "Organizers who want to co-host a city, artists and agents routing a US tour, venues with the right room, and sponsors who want to reach a Gujarati-American audience that actually shows up.",
    cta: {
      label: "Bring Rameelo to your city",
      href: "mailto:heran@finityone.com?subject=Rameelo%20%E2%80%94%20City%20Partnership&body=City%3A%0AOrganization%3A%0AVenue%20you%20have%20in%20mind%3A%0ATarget%20dates%3A",
    },
    related: [
      { label: "See the 2026 tour dates", href: "/#tour" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  {
    slug: "finityone",
    name: "FinityOne",
    url: "",
    category: "Software · Product studio",
    role: "Founder",
    status: "Active",
    based: "Phoenix, Arizona",
    summary:
      "Tech studio building digital products at the edges of fintech, event-tech and proptech.",
    headline: "The studio where the products get built.",
    lead:
      "FinityOne is the engineering and product arm of everything else here. It exists because the other ventures kept needing software nobody else was going to build for them — ticketing that fit a community event, underwriting that fit a small real-estate portfolio, back-office that fit a non-profit.",
    body: [
      "The studio works where fintech, event-tech and proptech overlap: money movement, payments and reconciliation on one side, physical inventory — seats, units, doors — on the other. Those are the problems where a clean data model is worth more than a clever frontend.",
      "The practice is deliberately full-stack and small. I write code, own the roadmap, and sit in the same room as the people using the thing. That is also the model I bring to client and advisory work: a small team with real ownership will out-ship a large one with none.",
    ],
    facts: [
      { label: "Type", value: "Product studio" },
      { label: "Role", value: "Founder" },
      { label: "Domains", value: "Fintech · Event-tech · Proptech" },
      { label: "Based", value: "Phoenix, Arizona" },
    ],
    highlights: [
      "Zero-to-one product definition, design and launch",
      "Full-stack build and ship — not just specs and decks",
      "Payments, ledgering and reconciliation flows",
      "Ticketing and event operations software",
      "Internal tooling that replaces spreadsheets with systems",
    ],
    whoShouldReachOut:
      "Founders who need a product built rather than described, and teams that need a technical partner who will own delivery against a real date.",
    cta: {
      label: "Start a project",
      href: "mailto:heran@finityone.com?subject=FinityOne%20%E2%80%94%20Project%20Inquiry&body=What%20you%27re%20building%3A%0ATimeline%3A%0AWhere%20we%20overlap%3A",
    },
    related: [{ label: "Consulting practice", href: "/ventures/consulting" }],
  },
  {
    slug: "maharaja-estates",
    name: "Maharaja Estates",
    url: "",
    category: "Real estate",
    role: "Principal",
    status: "Active",
    based: "Arizona",
    summary:
      "Arizona-based portfolio of rentals and long-term holds powered by hands-on renovations.",
    headline: "Buy it, fix it, hold it.",
    lead:
      "Maharaja Estates is a long-hold residential portfolio in Arizona. No flips, no fund, no pitch deck — acquisitions underwritten conservatively, renovated hands-on, and kept.",
    body: [
      "The work is unglamorous and that is the point: finding the deal, running the numbers until they survive a bad year, managing contractors who do not always show up, and keeping tenants long enough that turnover stops eating the return.",
      "It is also where the proptech instincts come from. Nearly every software opinion I hold about underwriting, maintenance tracking and owner reporting was formed by doing those jobs badly in a spreadsheet first.",
    ],
    facts: [
      { label: "Strategy", value: "Buy, renovate, long-term hold" },
      { label: "Role", value: "Principal" },
      { label: "Asset type", value: "Residential rentals" },
      { label: "Market", value: "Arizona" },
    ],
    highlights: [
      "Acquisition sourcing and conservative underwriting",
      "Hands-on renovation and contractor management",
      "Leasing, tenant relations and long-term retention",
      "Portfolio-level budgeting, financing and reporting",
    ],
    whoShouldReachOut:
      "Agents and wholesalers with Arizona residential deals, contractors who finish what they start, and operators comparing notes on small-portfolio underwriting.",
    cta: {
      label: "Send a deal",
      href: "mailto:heran@finityone.com?subject=Maharaja%20Estates%20%E2%80%94%20Deal&body=Address%3A%0APrice%3A%0ACondition%3A%0ANumbers%3A",
    },
  },
  {
    slug: "consulting",
    name: "Tech Venture Consulting",
    url: "",
    category: "Advisory · Product & Engineering",
    role: "Consultant",
    status: "Taking select engagements",
    based: "Phoenix, Arizona · Remote",
    summary:
      "Consultant to tech ventures on product management and engineering teams at scale, in fintech and proptech.",
    headline: "Product and engineering teams, at scale.",
    lead:
      "I consult for tech ventures on the two things that decide whether they ship: how product management actually works, and how engineering teams are structured as they grow past the point where everyone can be in one conversation.",
    body: [
      "The engagements that go well usually start the same way — a team that was fast at ten people has stopped being fast at forty, and nobody can say exactly why. Usually it is not talent. It is unclear ownership, a roadmap nobody believes, a review process that has quietly become the bottleneck, and planning rituals that generate documents instead of decisions.",
      "I work in fintech and proptech specifically, because the constraints there are not generic. Money movement has to reconcile. Physical inventory has to be real. Compliance is not a feature flag. Advice that ignores those constraints is just vocabulary.",
      "Engagements are scoped tight and honest: diagnose, recommend, and stay long enough to see the change hold. If I am not the right person for the problem, I will say so in the first conversation.",
    ],
    facts: [
      { label: "Focus", value: "Product management · Engineering org" },
      { label: "Sectors", value: "Fintech · Proptech" },
      { label: "Stage", value: "Seed through growth" },
      { label: "Format", value: "Advisory, fractional, project" },
    ],
    highlights: [
      "Product management operating model: ownership, roadmap, discovery, prioritization",
      "Engineering org design — team topology, interfaces and on-call as headcount grows",
      "Delivery diagnostics: why the team stopped shipping, and what to change first",
      "Technical due diligence and architecture review for fintech and proptech products",
      "Coaching PMs and engineering leads through their first scale-up",
      "Board and investor-ready reporting on product and engineering health",
    ],
    whoShouldReachOut:
      "Founders and CTOs scaling a fintech or proptech product team, investors who need diligence on one, and boards that want a straight read on why delivery has slowed.",
    cta: {
      label: "Scope an engagement",
      href: "mailto:heran@finityone.com?subject=Consulting%20Engagement&body=Company%3A%0ASector%20(fintech%2Fproptech)%3A%0ATeam%20size%3A%0AThe%20problem%3A%0ATimeline%3A",
    },
    related: [{ label: "The professional record", href: "/hiring" }],
  },
];

export function findVenture(slug: string): Venture | undefined {
  return VENTURES.find((venture) => venture.slug === slug);
}
