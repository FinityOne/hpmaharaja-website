/**
 * Site-level values ported from core/views.py.
 */

// Public links surfaced in the recruiter-facing section of the home page.
// Both are optional: the matching buttons are only rendered when set.
// TODO: point RESUME_URL at the hosted resume and fill in LINKEDIN_URL.
export const RESUME_URL = "";
export const LINKEDIN_URL = "";

export type FeaturedArticle = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  readingTime: string;
};

/**
 * The home page journal teaser. These are editorial placeholders carried over
 * from the Django view: they are not the markdown articles under
 * content/articles/, and each row links to the articles index.
 */
export const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    title: "Hustle Mindset: Building Calm in Chaos",
    slug: "hustle-mindset-calm-in-chaos",
    category: "Motivation",
    summary: "How to chase big visions without burning out your soul.",
    readingTime: "7 min read",
  },
  {
    title: "Faith, Politics, and Power: Why Values Matter",
    slug: "faith-politics-power-values",
    category: "Politics",
    summary: "A personal take on building influence without losing integrity.",
    readingTime: "6 min read",
  },
  {
    title: "Maharaja Code: Rules I Live By",
    slug: "maharaja-code-rules",
    category: "Personal",
    summary: "From Tempe to NYC, these are the principles that never changed.",
    readingTime: "5 min read",
  },
];
