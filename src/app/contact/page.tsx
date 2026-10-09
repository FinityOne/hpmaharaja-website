import type { Metadata } from "next";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PageNav from "@/components/PageNav";
import { CONTACT_EMAIL, LOCATION, PHONE_NUMBER, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Heran Patel (HP Maharaja)",
  description:
    "Reach Heran Patel directly about roles, consulting engagements, venture partnerships, Rameelo bookings, speaking or collaborations. Email, phone, and what to include so you get a straight answer.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

/** Pre-filled mailto templates, so a first message arrives already useful. */
const REASONS = [
  {
    number: "01",
    title: "A role",
    body:
      "Leadership, advisory or fractional work, and board seats. Send the role, the team, and the problem you need solved — you will get a straight answer on fit, including when the answer is no.",
    cta: "Send a role",
    href: `mailto:${CONTACT_EMAIL}?subject=Opportunity%20for%20Heran%20Patel&body=Role%3A%0ACompany%3A%0AWhat%20you%20need%20built%3A%0ACompensation%20range%3A`,
  },
  {
    number: "02",
    title: "A consulting engagement",
    body:
      "Product management and engineering teams at scale, in fintech and proptech. Tell me the sector, the team size, and what has stopped working.",
    cta: "Scope an engagement",
    href: `mailto:${CONTACT_EMAIL}?subject=Consulting%20Engagement&body=Company%3A%0ASector%20(fintech%2Fproptech)%3A%0ATeam%20size%3A%0AThe%20problem%3A%0ATimeline%3A`,
  },
  {
    number: "03",
    title: "A venture or partnership",
    body:
      "Founder intros, Rameelo city partnerships, Arizona real-estate deals, and sponsorships. Lead with where we actually overlap.",
    cta: "Founder intro",
    href: `mailto:${CONTACT_EMAIL}?subject=Founder%20Intro&body=Company%3A%0AWhat%20you%27re%20building%3A%0AWhere%20we%20overlap%3A`,
  },
  {
    number: "04",
    title: "Media, speaking or a collab",
    body:
      "Podcasts, panels, stages, and creative collaborations with producers, videographers and writers. Links to your work help more than a pitch.",
    cta: "Get in touch",
    href: `mailto:${CONTACT_EMAIL}?subject=Media%20%2F%20Speaking%20%2F%20Collab&body=What%20it%20is%3A%0ADate%20or%20timeline%3A%0ALinks%3A`,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact#page`,
          name: "Contact Heran Patel (HP Maharaja)",
          description: metadata.description as string,
          url: `${SITE_URL}/contact`,
          inLanguage: "en",
          mainEntity: { "@id": `${SITE_URL}/#person` },
        }}
      />

      <PageHeader
        kicker="Contact"
        title="Let's build something majestic."
        lead="Roles, consulting engagements, venture partnerships, speaking, or a real conversation about hustle and purpose — reach out directly. It comes to me, not to an assistant."
        slot="contact"
        facts={[
          { label: "Email", value: CONTACT_EMAIL },
          { label: "Phone", value: PHONE_NUMBER.replace(/^\+1-/, "") },
          { label: "Based", value: `${LOCATION.city}, Arizona` },
          { label: "Response", value: "Within a few days" },
        ]}
        actions={
          <>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-solid group">
              Email Heran{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href={`tel:${PHONE_NUMBER.replace(/-/g, "")}`} className="btn btn-ghost">
              Call Heran
            </a>
          </>
        }
      />

      {/* ============================ REASONS ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">01 — What are you writing about?</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch] mb-5">
                Pick the closest one and it will pre-fill itself.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Each of these opens an email with the right subject and the three or
                four things I will ask you anyway.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 border-t border-line">
            {REASONS.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isLastRow = index >= REASONS.length - 2;
              return (
                <div
                  key={item.title}
                  className={`reveal py-10 flex flex-col border-line ${
                    isLeft ? "md:pr-12 md:border-r" : "md:pl-12"
                  } border-b ${isLastRow ? "md:border-b-0" : ""}`}
                >
                  <p className="label mb-6">{item.number}</p>
                  <h3 className="text-2xl font-semibold tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm text-ink_3 leading-relaxed mb-8 max-w-md">{item.body}</p>
                  <a href={item.href} className="btn btn-ghost group mt-auto self-start">
                    {item.cta}{" "}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ DIRECT ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-5">
              <Figure slot="contact" ratio="square" />
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <p className="label mb-7">02 — Direct</p>
              <h2 className="display text-[clamp(1.7rem,3.4vw,2.8rem)] max-w-[20ch] mb-8">
                No form, no funnel.
              </h2>
              <dl className="space-y-4 text-base max-w-md">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <dt className="label">Email</dt>
                  <dd className="text-right">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-ink hover:opacity-60 transition break-all"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <dt className="label">Phone</dt>
                  <dd className="text-right">
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/-/g, "")}`}
                      className="text-ink hover:opacity-60 transition"
                    >
                      {PHONE_NUMBER.replace(/^\+1-/, "")}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label">Based</dt>
                  <dd className="text-ink text-right">
                    {LOCATION.city}, {LOCATION.region}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <PageNav
        heading="Before you write."
        items={[
          {
            label: "Hiring",
            title: "The professional record",
            blurb: "Strengths, domains and what I am open to — worth a read first.",
            href: "/hiring",
          },
          {
            label: "Ventures",
            title: "What I run",
            blurb: "Which venture your message actually belongs to.",
            href: "/ventures",
          },
          {
            label: "Achievements",
            title: "The record",
            blurb: "What has shipped, so you can check the claims.",
            href: "/achievements",
          },
        ]}
      />
    </div>
  );
}
