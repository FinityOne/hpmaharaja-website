import type { Metadata } from "next";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PageNav from "@/components/PageNav";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Community – For the Grinders Holding Faith, Family & Ambition",
  description:
    "The HP Maharaja community: share your story, collaborate on content, or pull up in real life at Rameelo nights and Phoenix linkups. Built for the kids of immigrants who refuse to lose themselves on the way up.",
  alternates: { canonical: `${SITE_URL}/community` },
};

const WAYS_IN = [
  {
    number: "01",
    title: "Share your story",
    body:
      "Send your journey — what you are building, what it is costing, what keeps you in it. Some stories get featured in future essays and vlogs, always with your say-so first.",
    cta: "Send your story",
    href: "mailto:heran@finityone.com?subject=My%20Story&body=Where%20you%27re%20from%3A%0AWhat%20you%27re%20building%3A%0AWhat%27s%20hard%20about%20it%3A",
  },
  {
    number: "02",
    title: "Collab on content",
    body:
      "Producers, videographers, writers and designers — if the mission resonates and you make things, reach out. The best work here started with someone showing up with an idea.",
    cta: "Pitch a collab",
    href: "mailto:heran@finityone.com?subject=Collab&body=What%20you%20make%3A%0ALinks%3A%0AWhat%20you%20have%20in%20mind%3A",
  },
  {
    number: "03",
    title: "Pull up in real life",
    body:
      "Rameelo nights, Phoenix linkups, and future Maharaja pop-ups tied to trips and shows. The internet is useful; a room full of people is better.",
    cta: "Ask where I'll be",
    href: "mailto:heran@finityone.com?subject=Where%20are%20you%20next%3F&body=City%3A%0AWhat%20you%27d%20come%20out%20for%3A",
  },
] as const;

export default function CommunityPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/community#page`,
          name: "Community — HP Maharaja",
          description: metadata.description as string,
          url: `${SITE_URL}/community`,
          inLanguage: "en",
          about: { "@id": `${SITE_URL}/#person` },
        }}
      />

      <PageHeader
        kicker="Community"
        title="For the grinders holding faith, family, and ambition at once."
        lead="Built for the kids of immigrants — the ones who refuse to lose themselves on the way up."
        slot="community"
      />

      {/* ============================ WHY ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-7">
              <p className="label mb-7">01 — Why this exists</p>
              <h2 className="display text-[clamp(1.7rem,3.4vw,2.8rem)] max-w-[22ch] mb-6">
                Nobody hands you the playbook for two worlds.
              </h2>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-5">
                If you grew up translating for your parents and then negotiating in
                rooms they never got invited into, you already know the specific
                loneliness of it. The ambition is legible to one side of your life and
                the faith is legible to the other, and almost nobody holds both.
              </p>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl">
                That is who this is for. Not a mastermind, not a paid circle — just a
                standing invitation to be in contact with people carrying the same
                weight.
              </p>
            </div>
            <div className="lg:col-span-5">
              <Figure slot="community" ratio="square" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ WAYS IN ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">02 — Three ways in</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch]">
                Pick whichever one fits.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            {WAYS_IN.map((item, index) => (
              <div
                key={item.title}
                className={`reveal py-10 flex flex-col border-line ${
                  index === 0
                    ? "md:pr-10 md:border-r"
                    : index === WAYS_IN.length - 1
                      ? "md:pl-10 border-t md:border-t-0"
                      : "md:px-10 md:border-r border-t md:border-t-0"
                }`}
              >
                <p className="label mb-6">{item.number}</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-8">{item.body}</p>
                <a href={item.href} className="btn btn-ghost group mt-auto self-start">
                  {item.cta}{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageNav
        heading="Keep going."
        items={[
          {
            label: "Journal",
            title: "The writing",
            blurb: "The essays this community tends to argue with me about.",
            href: "/articles",
          },
          {
            label: "Tour",
            title: "Rameelo Garba Tour 2026",
            blurb: "The easiest place to actually meet in person.",
            href: "/tour",
          },
          {
            label: "Contact",
            title: "Reach out directly",
            blurb: "Email and phone, and what to put in the message.",
            href: "/contact",
          },
        ]}
      />
    </div>
  );
}
