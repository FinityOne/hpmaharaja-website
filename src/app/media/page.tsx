import type { Metadata } from "next";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PageNav from "@/components/PageNav";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Music & Vlogs – HP Maharaja",
  description:
    "The HP Maharaja catalogue: rap tracks on SoundCloud about hustle, heartbreak and faith, and a YouTube vlog archive documenting the build in real time.",
  alternates: { canonical: `${SITE_URL}/media` },
};

const SOUNDCLOUD = "https://soundcloud.com/hpmaharaja";
const YOUTUBE = "https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg";

export default function MediaPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/media#collection`,
          name: "Music & Vlogs — HP Maharaja",
          description: metadata.description as string,
          url: `${SITE_URL}/media`,
          inLanguage: "en",
          about: { "@id": `${SITE_URL}/#person` },
          significantLink: SOCIAL_LINKS,
        }}
      />

      <PageHeader
        kicker="Media"
        title="HP Maharaja on the mic, and on camera."
        lead="The creator side of the house. Rap about hustle, heartbreak, faith and building something bigger than yourself — and a vlog archive of what that actually looks like day to day."
        slot="music"
        facts={[
          { label: "Music", value: "SoundCloud" },
          { label: "Vlogs", value: "YouTube" },
          { label: "Alias", value: "HP Maharaja" },
          { label: "Releasing since", value: "2013" },
        ]}
      />

      {/* ============================ MUSIC ============================ */}
      <section id="music" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-7">
              <p className="label mb-7">01 — Music</p>
              <h2 className="display text-[clamp(1.7rem,3.4vw,2.8rem)] max-w-[20ch] mb-6">
                Bars first, polish second.
              </h2>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-5">
                The catalogue is independent and unsigned, recorded between late-night
                sessions and early flights. The subjects have not changed much since
                2013: wanting more, the people it costs, and keeping faith while you
                chase it.
              </p>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-9">
                It is the most direct version of the thesis on the rest of this site —
                pursuing balance in chaos, said in four bars instead of four paragraphs.
              </p>
              <a
                href={SOUNDCLOUD}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid group"
              >
                Open SoundCloud{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
            <div className="lg:col-span-5">
              <Figure slot="music" ratio="square" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ VLOGS ============================ */}
      <section id="vlogs" className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-5 order-last lg:order-first">
              <Figure slot="vlogs" ratio="square" />
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <p className="label mb-7">02 — Vlogs</p>
              <h2 className="display text-[clamp(1.7rem,3.4vw,2.8rem)] max-w-[20ch] mb-6">
                Life in motion.
              </h2>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-5">
                Trips, events, late-night sessions, and the behind-the-scenes of
                building the empire — including the parts that did not work. Garba
                nights from the production side, renovations mid-demolition, and the
                unglamorous middle of a launch.
              </p>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-9">
                If the written essays are the conclusion, the vlogs are the working.
              </p>
              <a href={YOUTUBE} target="_blank" rel="noreferrer" className="btn btn-solid group">
                Watch on YouTube{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ COLLAB ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-ink text-paper px-6 py-16 lg:px-14 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
              <div className="lg:col-span-7">
                <p className="label !text-paper/55 mb-8">03 — Collaborate</p>
                <h2 className="display text-[clamp(1.8rem,4vw,3rem)] max-w-[22ch] mb-6">
                  Producers, videographers, writers.
                </h2>
                <p className="text-base text-paper/70 max-w-xl leading-relaxed">
                  If the mission resonates and you make things, reach out. The best
                  work here has come from people who showed up with an idea rather
                  than a rate card.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pl-10 lg:border-l border-paper/15">
                <a
                  href="mailto:heran@finityone.com?subject=Collab%20%E2%80%94%20Music%20%2F%20Video&body=What%20you%20make%3A%0ALinks%20to%20your%20work%3A%0AWhat%20you%20have%20in%20mind%3A"
                  className="btn btn-invert w-full group"
                >
                  Pitch a collab{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageNav
        heading="Keep going."
        items={[
          {
            label: "Journal",
            title: "The writing",
            blurb: "Long-form essays on hustle, faith, politics, culture and dharma.",
            href: "/articles",
          },
          {
            label: "Tour",
            title: "Rameelo Garba Tour 2026",
            blurb: "Twelve nights, six cities, and the artists on each one.",
            href: "/tour",
          },
          {
            label: "Merch",
            title: "Drop 001",
            blurb: "HP Maharaja Essentials — early supporters get first dibs.",
            href: "/merch",
          },
        ]}
      />
    </div>
  );
}
