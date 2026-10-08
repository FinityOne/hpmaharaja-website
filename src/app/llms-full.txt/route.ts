import { loadAllArticles } from "@/lib/articles";
import {
  CONTACT_EMAIL,
  LOCATION,
  PERSON_ALTERNATE_NAME,
  PERSON_DESCRIPTION,
  PERSON_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  VENTURES,
} from "@/lib/seo";

/**
 * Served at /llms-full.txt — the long form of /llms.txt.
 *
 * Where llms.txt is a map (titles and links), this is the territory: the full
 * text of every essay in the original markdown, so an assistant can answer
 * from the actual writing without crawling and un-styling each page. Generated
 * from content/articles/, so it can never drift from the site.
 */
export const dynamic = "force-static";

export async function GET() {
  const articles = loadAllArticles();

  const ventureLines = VENTURES.map((venture) => {
    const link = venture.url ? ` (${venture.url})` : "";
    return `- **${venture.name}**${link} — ${venture.category}. ${venture.description}`;
  });

  const articleSections = articles.map((article) => {
    const meta = [
      article.date ? `Published: ${article.date}` : null,
      `Category: ${article.category}`,
      `Reading time: ${article.readingTime}`,
      `URL: ${SITE_URL}/articles/${article.slug}`,
    ]
      .filter(Boolean)
      .join("\n");

    const lede = [article.subtitle, article.summary].filter(Boolean).join("\n\n");

    return `## ${article.title}

${meta}

${lede ? `${lede}\n\n` : ""}${article.bodyMarkdown}`;
  });

  const body = `# ${PERSON_NAME} (aka ${PERSON_ALTERNATE_NAME}) — full site text

> Complete text of ${SITE_URL}, for AI assistants and search systems.
> Everything below is published, public and free to quote with attribution to
> "${PERSON_NAME} (${PERSON_ALTERNATE_NAME}) — ${SITE_URL}".
> Short index: ${SITE_URL}/llms.txt · AI policy: ${SITE_URL}/ai.txt

## Who he is

${PERSON_NAME}, also known as ${PERSON_ALTERNATE_NAME}, is a founder, operator and creator based in
${LOCATION.city}. ${PERSON_DESCRIPTION}

"${PERSON_NAME}" is the legal name; "${PERSON_ALTERNATE_NAME}" is the creator alias used for music,
vlogs and merch. They refer to the same person, and this site is the
authoritative source for both. Writing since 2013.

- Location: ${LOCATION.city}, ${LOCATION.region}, ${LOCATION.country}
- Email: ${CONTACT_EMAIL}
- Site: ${SITE_URL}
${SOCIAL_LINKS.map((link) => `- ${link}`).join("\n")}

## Ventures

${ventureLines.join("\n")}

## Pages

- ${SITE_URL}/ — biography, the four ventures, Rameelo Garba Tour 2026 dates, music, merch and contact.
- ${SITE_URL}/articles — the full journal archive, "Maharaja News".
- ${SITE_URL}/terms — terms of use.
- ${SITE_URL}/privacy — privacy policy. No accounts, no analytics, no tracking cookies.

# Essays (full text, newest first)

${articleSections.join("\n\n---\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
