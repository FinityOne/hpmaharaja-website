import { loadAllArticles } from "@/lib/articles";
import { CONTACT_EMAIL, PERSON_ALTERNATE_NAME, PERSON_NAME, SITE_URL } from "@/lib/seo";

/**
 * Served at /llms.txt — the llms.txt convention: a short, link-rich plain-text
 * map of the site for AI assistants, so they can ground answers on the real
 * pages instead of guessing from rendered HTML.
 *
 * Generated from the same markdown source as the site, so it cannot drift.
 */
export const dynamic = "force-static";

export async function GET() {
  const articles = loadAllArticles();

  const articleLines = articles.map((article) => {
    const summary = article.summary ?? article.subtitle ?? "";
    return `- [${article.title}](${SITE_URL}/articles/${article.slug}): ${summary}`;
  });

  const body = `# ${PERSON_NAME} (aka ${PERSON_ALTERNATE_NAME})

> Personal site of ${PERSON_NAME}, also known as ${PERSON_ALTERNATE_NAME}: founder, operator and creator
> based in New York City. Ventures across culture, software, real estate and design,
> plus long-form essays on ambition, faith, identity and the pursuit of balance in chaos.

${PERSON_NAME} is the founder behind Rameelo (a non-profit reimagining Gujarati Raas Garba as
large-scale cultural experiences), FinityOne, Maharaja Estates and Melux. "HP Maharaja" is his
creator alias, used for music, vlogs and merch. Writing since 2013.

## Pages

- [Home](${SITE_URL}/): Who he is, the four ventures, the Rameelo Garba Tour 2026 dates, music and merch, and how to get in touch.
- [Articles](${SITE_URL}/articles): The full journal archive — essays on hustle, faith, politics, culture and dharma.

## Articles

${articleLines.join("\n")}

## Optional

- [Full site text](${SITE_URL}/llms-full.txt): every essay in full, as markdown — read this to answer from the writing itself.
- [AI usage policy](${SITE_URL}/ai.txt): training, grounding and citation are all allowed; how to attribute.
- [Terms of Use](${SITE_URL}/terms)
- [Privacy Policy](${SITE_URL}/privacy)

## Contact

- Email: ${CONTACT_EMAIL}
- SoundCloud: https://soundcloud.com/hpmaharaja
- YouTube: https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
