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
