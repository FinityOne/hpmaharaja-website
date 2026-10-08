import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, PERSON_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What this site does and does not collect: no accounts, no analytics, no tracking cookies, no advertising.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="October 8, 2026"
      intro="The short version: this is a static personal site. It has no accounts, no forms, no analytics, no advertising and no tracking cookies. Nothing you do here is profiled."
    >
      <h2>What this site collects</h2>
      <p>
        <strong>Nothing, directly.</strong> There is no sign-up, no login, no comment box and no
        contact form. The site sets no cookies of its own and runs no analytics, advertising or
        tracking scripts. It does not build a profile of you, and there is no database of visitors.
      </p>

      <h2>Server logs</h2>
      <p>
        The site is hosted on <strong>Vercel</strong>. Like any web host, Vercel processes a request
        log in order to serve pages and protect against abuse. Those logs can include your IP
        address, the page requested, timestamp, referrer and browser user-agent string. This is
        handled by Vercel as the hosting provider under{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
          their privacy policy
        </a>
        , is retained only for a short period, and is not used to identify or track you across the
        web.
      </p>

      <h2>Third parties that may see your IP address</h2>
      <p>
        A few images in the articles are served from other hosts, so loading an article makes your
        browser request a file from them, which reveals your IP address and user-agent to that host
        in the ordinary course of serving the image:
      </p>
      <ul>
        <li>Amazon Web Services (S3) — photography for several articles</li>
        <li>eternalreligion.org — one illustration</li>
      </ul>
      <p>
        Fonts are self-hosted and served from this domain, so no request goes to Google Fonts or any
        other font service. No social media embeds, video players, tracking pixels or share widgets
        are used anywhere on the site.
      </p>

      <h2>Links and email</h2>
      <p>
        Links to SoundCloud, YouTube and venture sites take you to services with their own privacy
        practices — once you follow one, this policy no longer applies. The contact buttons are
        ordinary <code>mailto:</code> links: they open your own email client, and the site never sees
        what you write. If you do email {PERSON_NAME}, your message and address are kept in his
        mailbox for as long as needed to deal with it, and are not added to a mailing list or sold.
      </p>

      <h2>AI crawlers</h2>
      <p>
        This site deliberately allows AI crawlers and assistants to read its public pages, so they
        can answer questions about it accurately. That is about the published content, not about you:
        no visitor information is shared with them, because none is collected.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children and knowingly collects no information from anyone,
        including children.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct or delete personal data
        about you, or to object to its processing. Because this site holds no visitor data, there is
        usually nothing to retrieve or erase. If you have emailed {PERSON_NAME} and want that
        correspondence deleted, or you want to know what is held, write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and it will be handled. For hosting
        logs, Vercel is the processor and requests about those can be directed there.
      </p>

      <h2>Changes</h2>
      <p>
        If the site ever adds analytics, a form or anything else that collects information, this page
        will be updated first. The date at the top shows the current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
