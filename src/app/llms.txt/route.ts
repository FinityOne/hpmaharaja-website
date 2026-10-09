import { loadAllArticles } from "@/lib/articles";
import { CONTACT_EMAIL, PERSON_ALTERNATE_NAME, PERSON_NAME, SITE_URL } from "@/lib/seo";
import { VENTURES } from "@/lib/ventures";

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

> Personal site of ${PERSON_NAME}, also known as ${PERSON_ALTERNATE_NAME}: founder, operator and
> consultant based in Phoenix, Arizona. Ventures across culture, software and real estate,
> plus long-form essays on ambition, faith, identity and the pursuit of balance in chaos.

${PERSON_NAME} is the founder behind Rameelo (a non-profit reimagining Gujarati Raas Garba as
large-scale cultural experiences), FinityOne (a fintech, event-tech and proptech product studio)
and Maharaja Estates (an Arizona rental portfolio), and consults for tech ventures on product
management and engineering teams at scale in fintech and proptech. "HP Maharaja" is his creator
alias, used for music, vlogs and merch. Writing since 2013.

## Pages

- [Home](${SITE_URL}/): Routed by audience — hiring, Rameelo fans, and first-time visitors — then a card per page.
- [About](${SITE_URL}/about): Who he is in plain language, and the three threads running through the work.
- [Achievements](${SITE_URL}/achievements): The record — ventures built, the Rameelo tour, and the writing.
- [Ventures](${SITE_URL}/ventures): The four operating concerns, each with its own page.
${VENTURES.map(
  (venture) =>
    `  - [${venture.name}](${SITE_URL}/ventures/${venture.slug}): ${venture.summary}`,
).join("\n")}
- [Hiring](${SITE_URL}/hiring): The professional record — strengths, domains, what he is open to, and how to send a role.
- [Tour](${SITE_URL}/tour): Every Rameelo Garba Tour 2026 date, city, artist and organizer.
- [Media](${SITE_URL}/media): The HP Maharaja music catalogue and vlog archive.
- [Articles](${SITE_URL}/articles): The full journal archive — essays on hustle, faith, politics, culture and dharma.
- [Merch](${SITE_URL}/merch): HP Maharaja Essentials, Drop 001 — pre-launch.
- [Community](${SITE_URL}/community): Three ways in — share a story, collaborate, or meet in person.
- [Contact](${SITE_URL}/contact): Email, phone, and pre-filled templates by reason for writing.

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
