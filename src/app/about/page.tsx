import type { Metadata } from "next";
import Link from "next/link";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PageNav from "@/components/PageNav";
import { LOCATION, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Heran Patel (HP Maharaja)",
  description:
    "Who Heran Patel is, in plain language: founder of Rameelo, FinityOne and Maharaja Estates, consultant on product management and engineering teams at scale, and the writer behind HP Maharaja.",
  alternates: { canonical: `${SITE_URL}/about` },
};

/** The three threads that run through everything. */
const THREADS = [
  {
    kicker: "01 / Mindset",
    title: "The Hustle",
    body:
      "Stories, scars, and systems for staying locked in on the bigger dream without burning out the person chasing it.",
  },
  {
    kicker: "02 / Spirit",
    title: "Faith & Values",
    body:
      "Politics, religion, and philosophy from a grounded, son-of-immigrants lens — written without flinching.",
  },
  {
    kicker: "03 / Empire",
    title: "Brands & Moves",
    body:
      "Rameelo, FinityOne, Maharaja Estates, and the consulting practice — plus whatever venture comes next.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${SITE_URL}/about#about`,
          name: "About Heran Patel (HP Maharaja)",
          description: metadata.description as string,
          url: `${SITE_URL}/about`,
          inLanguage: "en",
          mainEntity: { "@id": `${SITE_URL}/#person` },
        }}
      />

      <PageHeader
        kicker="Who I am"
        title="The two-minute version."
        lead="I am Heran Patel. Online, and on a stage, most people know me as HP Maharaja."
        slot="about"
        facts={[
          { label: "Based", value: `${LOCATION.city}, Arizona` },
          { label: "Role", value: "Founder · Consultant" },
          { label: "Sectors", value: "Fintech · Proptech" },
          { label: "Building since", value: "2013" },
        ]}
      />

      {/* ============================ THE STORY ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <p className="label">01 — The short version</p>
            </div>
            <div className="lg:col-span-8 max-w-2xl space-y-5">
              <p className="text-lg lg:text-xl text-ink leading-relaxed">
                The day job is software. The rest of it is everything software paid for.
              </p>
              <p className="text-base text-ink_2 leading-relaxed">
                I run{" "}
                <Link href="/ventures/finityone" className="underline hover:opacity-60 transition">
                  FinityOne
                </Link>
                , a product studio building at the edges of fintech, event-tech and
                proptech, and I consult for other tech ventures on{" "}
                <Link href="/ventures/consulting" className="underline hover:opacity-60 transition">
                  product management and engineering teams at scale
                </Link>{" "}
                — the part where a company that shipped fast at ten people stops
                shipping at forty. That is rarely a talent problem. It is ownership,
                a roadmap nobody believes, and planning rituals that produce documents
                instead of decisions.
              </p>
              <p className="text-base text-ink_2 leading-relaxed">
                Alongside that:{" "}
                <Link
                  href="/ventures/maharaja-estates"
                  className="underline hover:opacity-60 transition"
                >
                  Maharaja Estates
                </Link>
                , an Arizona rental portfolio I buy, renovate and hold rather than flip.
                Unglamorous on purpose — and the origin of nearly every opinion I hold
                about proptech, because I did all of those jobs badly in a spreadsheet
                first.
              </p>
              <p className="text-base text-ink_2 leading-relaxed">
                And{" "}
                <Link href="/ventures/rameelo" className="underline hover:opacity-60 transition">
                  Rameelo
                </Link>
                , a non-profit that puts Gujarati Raas Garba on a real stage across
                America. Our parents carried these traditions over; they deserve
                production value, not a rented hall and an apology. That one is why you
                may have seen me in front of a few thousand people.
              </p>
              <p className="text-base text-ink_2 leading-relaxed">
                Since 2013 I have also been writing — essays on ambition, faith,
                identity and the cost of chasing all of it at once. That is the whole of
                it: build things, run things, write about what it costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ THREADS ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">02 — What this is</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch]">
                Three threads, one body of work.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            {THREADS.map((thread, index) => (
              <div
                key={thread.title}
                className={`reveal py-10 border-line ${
                  index === 0
                    ? "md:pr-10 md:border-r"
                    : index === THREADS.length - 1
                      ? "md:pl-10 border-t md:border-t-0"
                      : "md:px-10 md:border-r border-t md:border-t-0"
                }`}
              >
                <p className="label mb-6">{thread.kicker}</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{thread.title}</h3>
                <p className="text-sm text-ink_3 leading-relaxed">{thread.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TEMPE → PHOENIX ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-5">
              <Figure slot="community" ratio="square" />
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <p className="label mb-7">03 — Where this comes from</p>
              <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] max-w-[24ch] mb-6">
                Tempe to New York and back to Phoenix.
              </h2>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-5">
                I grew up in Tempe, built a career that ran through New York, and now
                operate out of Phoenix — close to the portfolio, in the time zone where
                most of the work actually happens.
              </p>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl">
                Everything on this site is made for people holding more than one thing
                at once: a career and a calling, ambition and faith, the family that
                immigrated and the life they made possible. If that is you, you are the
                person I am writing for.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageNav
        heading="Where to go next."
        items={[
          {
            label: "Achievements",
            title: "The record",
            blurb: "What the ventures, the stage and the writing have actually produced.",
            href: "/achievements",
          },
          {
            label: "Ventures",
            title: "What I run",
            blurb: "Rameelo, FinityOne, Maharaja Estates and the consulting practice.",
            href: "/ventures",
          },
          {
            label: "Journal",
            title: "The writing",
            blurb: "Essays on hustle, faith, politics, culture and dharma.",
            href: "/articles",
          },
        ]}
      />
    </div>
  );
}
