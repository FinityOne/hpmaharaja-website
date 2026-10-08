import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, PERSON_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use – Heran Patel (HP Maharaja)",
  description:
    "The terms that apply when you use heranpatel.com / hpmaharaja.com, including how the writing, music and brand names on the site may be used.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      updated="October 8, 2026"
      intro={`These terms apply to this website. By browsing it you accept them. The site is a personal publication by ${PERSON_NAME} — it is not a product, and it does not have accounts, subscriptions or checkout.`}
    >
      <h2>What this site is</h2>
      <p>
        This is a personal website: essays, music, video and information about the ventures{" "}
        {PERSON_NAME} is involved in. Everything here is published for general information and as
        personal commentary.
      </p>

      <h2>No professional advice</h2>
      <p>
        Nothing on this site is professional advice. The writing covers business, money, faith,
        politics and culture, and it is opinion and personal experience — not legal, financial,
        investment, tax, medical, religious or career advice. Do not treat it as a recommendation for
        your situation, and speak to a qualified professional before acting on anything you read
        here.
      </p>

      <h2>Views are personal</h2>
      <p>
        Opinions on this site belong to {PERSON_NAME} personally. They are not statements by, and do
        not represent the positions of, Rameelo, FinityOne, Maharaja Estates, Melux, Vaihom or any
        other organisation he is connected to, and they are not statements by any employer, client or
        partner.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        The writing, photography, music, video, design and the <strong>HP Maharaja</strong> and{" "}
        <strong>Maharaja</strong> names and marks on this site belong to {PERSON_NAME} or their
        respective owners. You may:
      </p>
      <ul>
        <li>read, link to and share the pages;</li>
        <li>quote short extracts with clear attribution and a link back to the original page.</li>
      </ul>
      <p>Without written permission, please do not:</p>
      <ul>
        <li>republish a full article, anywhere, including as a translation;</li>
        <li>use the writing, images, music or brand names commercially, or in merchandise;</li>
        <li>present the content as your own, or imply {PERSON_NAME} endorses you or your product.</li>
      </ul>
      <p>
        Some images are hosted by third parties and may carry their own rights. Where an article
        credits a source, that source&rsquo;s terms apply to that material.
      </p>

      <h2>Automated access, AI and training</h2>
      <p>
        Crawling and indexing this site is allowed, including by AI crawlers and assistants — see{" "}
        <a href="/robots.txt">robots.txt</a> and <a href="/llms.txt">llms.txt</a>. If you quote or
        summarise this site in an AI answer, attribute it to {PERSON_NAME} and link to the page you
        used. Permission to crawl is not permission to republish full articles, and it does not
        transfer ownership of anything described above. Please do not hammer the site with automated
        requests.
      </p>

      <h2>Links out</h2>
      <p>
        This site links to other places — SoundCloud, YouTube, venture sites and sources cited in
        articles. Those are not under this site&rsquo;s control, and linking to something is not an
        endorsement of everything on it. Their terms and privacy practices are their own.
      </p>

      <h2>Availability and accuracy</h2>
      <p>
        The site is provided as-is, with no guarantee that it will be available, complete or free of
        errors. Articles reflect what was true and what was believed when they were written, and are
        not kept updated as things change. Dates, tour listings and venture details can go out of
        date; confirm anything you intend to rely on. Content may be edited or removed at any time.
      </p>

      <h2>Liability</h2>
      <p>
        To the fullest extent the law allows, {PERSON_NAME} is not liable for any loss or damage
        arising from your use of this site or from anything you do based on its content. Nothing here
        limits liability where the law does not permit it.
      </p>

      <h2>Getting in touch</h2>
      <p>
        For permissions, corrections or anything else, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. If you think something here
        infringes your rights, say so with enough detail to identify it and it will be reviewed
        promptly.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        These terms may change. The date at the top shows the current version, and continuing to use
        the site means accepting the version then posted.
      </p>
    </LegalPage>
  );
}
