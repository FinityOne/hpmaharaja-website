import type { Metadata } from "next";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PageNav from "@/components/PageNav";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Merch – HP Maharaja Essentials, Drop 001",
  description:
    "HP Maharaja merch: limited-drop hoodies, tees and pieces inspired by royal Indian aesthetics, New York grit and West Coast hustle. Drop 001 is coming — join the list for first dibs.",
  alternates: { canonical: `${SITE_URL}/merch` },
};

const JOIN_LIST =
  "mailto:heran@finityone.com?subject=Merch%20Drop%20List&body=Add%20me%20to%20the%20Maharaja%20merch%20list.";

const PRINCIPLES = [
  {
    kicker: "01 / Restraint",
    title: "Few pieces, done properly",
    body:
      "Small runs in heavyweight fabric, cut to actually fit. No twelve-colourway catalogue of things nobody asked for.",
  },
  {
    kicker: "02 / Reference",
    title: "Royal, not costume",
    body:
      "Motifs pulled from Indian royal dress and devotional pattern, abstracted far enough to wear on a Tuesday.",
  },
  {
    kicker: "03 / Receipts",
    title: "Earned, not merchandised",
    body:
      "Pieces tied to real moments — a tour, a release, a milestone — so owning one places you somewhere specific.",
  },
] as const;

export default function MerchPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/merch#collection`,
          name: "HP Maharaja Merch",
          description: metadata.description as string,
          url: `${SITE_URL}/merch`,
          inLanguage: "en",
          about: { "@id": `${SITE_URL}/#person` },
        }}
      />

      <PageHeader
        kicker="Merch · Coming soon"
        title="Wear the crown before the world knows the name."
        lead="Limited-drop hoodies, tees, and pieces inspired by royal Indian aesthetics, New York grit, and West Coast hustle. Early supporters get first dibs."
        slot="merch"
        facts={[
          { label: "Status", value: "Pre-launch" },
          { label: "First drop", value: "Drop 001" },
          { label: "Line", value: "HP Maharaja Essentials" },
          { label: "Access", value: "List first" },
        ]}
        actions={
          <a href={JOIN_LIST} className="btn btn-solid group">
            Join the list{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        }
      />

      {/* ============================ DROP 001 ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-5">
              <Figure slot="merch" ratio="portrait" caption="Drop 001 — HP Maharaja Essentials" />
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <p className="label mb-7">01 — Drop 001</p>
              <h2 className="display text-[clamp(1.7rem,3.4vw,2.8rem)] max-w-[20ch] mb-6">
                Essentials, first.
              </h2>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-5">
                The opening drop is deliberately plain: heavyweight hoodies and tees
                carrying the Maharaja mark, in the same ink-on-paper palette as this
                site. Things you would wear without explaining them.
              </p>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-9">
                Quantities will be small and they will not be re-run. The list gets
                sizing and first access before anything goes public.
              </p>
              <a href={JOIN_LIST} className="btn btn-solid group">
                Join the list{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PRINCIPLES ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">02 — How it is made</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch]">
                Three rules for the line.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            {PRINCIPLES.map((item, index) => (
              <div
                key={item.title}
                className={`reveal py-10 border-line ${
                  index === 0
                    ? "md:pr-10 md:border-r"
                    : index === PRINCIPLES.length - 1
                      ? "md:pl-10 border-t md:border-t-0"
                      : "md:px-10 md:border-r border-t md:border-t-0"
                }`}
              >
                <p className="label mb-6">{item.kicker}</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-ink_3 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageNav
        heading="Keep going."
        items={[
          {
            label: "Media",
            title: "Music & vlogs",
            blurb: "The catalogue and the archive the merch comes out of.",
            href: "/media",
          },
          {
            label: "Community",
            title: "The people around it",
            blurb: "Linkups, collaborations, and sending your own story in.",
            href: "/community",
          },
          {
            label: "Tour",
            title: "Rameelo Garba Tour 2026",
            blurb: "Where the pieces tend to show up first.",
            href: "/tour",
          },
        ]}
      />
    </div>
  );
}
