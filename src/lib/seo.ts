/**
 * Canonical origin for metadata, sitemap and structured data.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project to point previews or an
 * alternate domain (heranpatel.com) at themselves.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hpmaharaja.com"
).replace(/\/$/, "");

export const SITE_NAME = "Heran Patel (HP Maharaja)";

export const PERSON_NAME = "Heran Patel";
export const PERSON_ALTERNATE_NAME = "HP Maharaja";

export const PERSON_DESCRIPTION =
  "Founder and creator building ventures across software, real estate, live events, and the non-profit world, writing on ambition, identity, faith, and the pursuit of balance in chaos.";

export const SOCIAL_LINKS = [
  "https://soundcloud.com/hpmaharaja",
  "https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg",
];

export const CONTACT_EMAIL = "heran@finityone.com";

export const PHONE_NUMBER = "+1-949-903-9366";

export const LOCATION = {
  city: "New York City",
  region: "NY",
  country: "US",
} as const;

/**
 * Default social-share image, used by every page that does not supply its own
 * so a link to any route unfurls with a picture rather than a bare title.
 */
export const OG_IMAGE = "/images/base/header-bg.jpg";

export const OG_IMAGE_ALT =
  "Heran Patel, also known as HP Maharaja, founder and creator based in New York City";

/**
 * The name queries this site should answer for. Both spellings of the identity
 * are kept adjacent so the Heran Patel / HP Maharaja link is unambiguous to
 * search engines and to AI assistants summarising the page.
 */
export const NAME_KEYWORDS = [
  "Heran Patel",
  "HP Maharaja",
  "Heran Patel HP Maharaja",
  "hpmaharaja",
  "Heran Patel founder",
  "Heran Patel New York",
  "Heran Patel Rameelo",
  "Heran Patel FinityOne",
];

/**
 * The four operating companies.
 *
 * One list used three ways: the venture cards on the home page, the
 * Organization nodes in its structured data, and the venture section of
 * llms.txt. `url` stays empty until a company has a live site — a card without
 * one renders as a plain block rather than a dead link.
 */
export type Venture = {
  name: string;
  url: string;
  category: string;
  description: string;
};

export const VENTURES: Venture[] = [
  {
    name: "Rameelo",
    url: "https://rameelo.com",
    category: "Cultural Empire",
    description:
      "Non-profit reimagining Gujarati Raas Garba as large-scale cultural experiences.",
  },
  {
    name: "FinityOne",
    url: "",
    category: "Product Lab",
    description:
      "Tech studio building digital products at the edges of fintech, event-tech, and proptech.",
  },
  {
    name: "Maharaja Estates",
    url: "",
    category: "Real Estate",
    description:
      "Arizona-based portfolio of rentals and long-term holds powered by hands-on renovations.",
  },
  {
    name: "Melux Events",
    url: "",
    category: "Aesthetic Ops",
    description:
      "Design-first event decor and experience studio born from Rameelo's production DNA.",
  },
];

/**
 * Crawlers that read the site for AI answers, assistants and training.
 *
 * Listed explicitly and allowed, so the site is discoverable by AI systems
 * rather than relying on each crawler's default. Google-Extended and
 * Applebot-Extended are opt-in/out tokens for AI use specifically — they
 * control AI training and grounding, not normal search ranking.
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "meta-externalfetcher",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];
