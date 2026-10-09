import type { Metadata } from "next";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PageNav from "@/components/PageNav";
import { SITE_URL } from "@/lib/seo";
import { buildTourDates, buildTourMeta } from "@/lib/tour";

export const metadata: Metadata = {
  title: "Rameelo Garba Tour 2026 – Dates, Cities & Artists",
  description:
    "Every date on the Rameelo Garba Tour 2026: twelve ticketed events across six American cities from Aug 29 to Oct 17, with Atul Purohit, Kirtidan Gadhvi, Geeta Rabari, Aishwarya Majmudar and more.",
  alternates: { canonical: `${SITE_URL}/tour` },
};

/** Rows label themselves played/upcoming against today, so re-render daily. */
export const revalidate = 86400;

export default function TourPage() {
  const tourDates = buildTourDates();
  const tourMeta = buildTourMeta(tourDates);
  const upcoming = tourDates.filter((stop) => !stop.isPast);
  const played = tourDates.filter((stop) => stop.isPast);

  return (
    <div className="bg-paper text-ink">
      {/* Each stop as an Event, so the dates can surface in search and in an
          assistant's answer without re-reading the table. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${SITE_URL}/tour#list`,
          name: "Rameelo Garba Tour 2026",
          description: metadata.description as string,
          url: `${SITE_URL}/tour`,
          numberOfItems: tourDates.length,
          itemListElement: tourDates.map((stop, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "MusicEvent",
              name: `${stop.artist} — Rameelo Garba Tour 2026`,
              startDate: stop.starts,
              endDate: stop.ends,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: { "@type": "Place", name: stop.city, address: stop.city },
              performer: { "@type": "MusicGroup", name: stop.artist },
              organizer: { "@type": "Organization", name: stop.organizer },
              url: "https://rameelo.com",
            },
          })),
        }}
      />

      <PageHeader
        kicker="Rameelo on tour"
        title="Saw me on a stage? This was it."
        lead="Rameelo Garba Tour 2026 — across America, one garba community. Joined on tour by Suchit & Bhrugesh, supporting Rameelo organizers at their events."
        slot="tour"
        facts={[
          { label: "Events", value: String(tourMeta.events) },
          { label: "Cities", value: String(tourMeta.cities) },
          { label: "Run", value: tourMeta.window },
          {
            label: "Still to come",
            value:
              tourMeta.remaining > 0
                ? `${tourMeta.remaining} date${tourMeta.remaining === 1 ? "" : "s"}`
                : "Tour wrapped",
          },
        ]}
        actions={
          <>
            <a
              href="https://rameelo.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid group"
            >
              Tickets at rameelo.com{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="/ventures/rameelo" className="btn btn-ghost">
              What Rameelo is
            </a>
          </>
        }
      />

      {/* ============================ UPCOMING ============================ */}
      {upcoming.length > 0 ? (
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-12">
              <div className="lg:col-span-4">
                <p className="label">01 — Still to come</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[24ch]">
                  {upcoming.length} date{upcoming.length === 1 ? "" : "s"} left on the run.
                </h2>
              </div>
            </div>
            <TourTable stops={upcoming} />
          </div>
        </section>
      ) : null}

      {/* ============================ PLAYED ============================ */}
      {played.length > 0 ? (
        <section
          className={`py-20 lg:py-28 ${
            upcoming.length > 0 ? "bg-paper_2 border-y border-line" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-12">
              <div className="lg:col-span-4">
                <p className="label">{upcoming.length > 0 ? "02" : "01"} — Already played</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[24ch]">
                  The nights behind us.
                </h2>
              </div>
            </div>
            <TourTable stops={played} />
          </div>
        </section>
      ) : null}

      {/* ============================ THE ARTISTS ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
            <div className="lg:col-span-7">
              <p className="label mb-7">03 — Who plays</p>
              <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] max-w-[24ch] mb-6">
                The artists people travel for.
              </h2>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl mb-5">
                Atul Purohit, Kirtidan Gadhvi, Geeta Rabari, Aishwarya Majmudar,
                Jigardan Gadhavi and Jignesh Barot across the 2026 run, plus a
                Bollywood dandiya night with DJ G2 to close it out in Austin.
              </p>
              <p className="text-base text-ink_2 leading-relaxed max-w-xl">
                Every city is co-hosted with organizers who already hold the trust
                there — ICAP USA, VOI, VUF, Nexstar, Barn Entertainment, 1 Culture
                Entertainment, Mahadev Entertainment and G2 Entertainment.
              </p>
            </div>
            <div className="lg:col-span-5">
              <Figure slot="rameelo" ratio="square" />
            </div>
          </div>
        </div>
      </section>

      <PageNav
        heading="More where that came from."
        items={[
          {
            label: "Rameelo",
            title: "The non-profit",
            blurb: "Why it exists, how a night gets produced, and how to co-host a city.",
            href: "/ventures/rameelo",
          },
          {
            label: "Media",
            title: "Music & vlogs",
            blurb: "The HP Maharaja catalogue and the behind-the-scenes archive.",
            href: "/media",
          },
          {
            label: "Community",
            title: "Pull up in real life",
            blurb: "Linkups, collaborations, and sending your own story in.",
            href: "/community",
          },
        ]}
      />
    </div>
  );
}

/** Shared table body for the upcoming and played groupings. */
function TourTable({ stops }: { stops: ReturnType<typeof buildTourDates> }) {
  return (
    <div className="border-t border-line">
      {stops.map((stop) => (
        <div
          key={`${stop.starts}-${stop.city}`}
          className="reveal grid lg:grid-cols-12 gap-y-2 lg:gap-x-10 items-baseline border-b border-line py-6"
        >
          <p className="label lg:col-span-1">{String(stop.position).padStart(2, "0")}</p>
          <p className={`label lg:col-span-2 ${stop.isPast ? "!text-ink_3" : "!text-ink"}`}>
            {stop.dateLabel}
          </p>
          <div className="lg:col-span-6">
            <p
              className={`text-base lg:text-lg font-medium tracking-tight ${
                stop.isPast ? "text-ink_2" : "text-ink"
              }`}
            >
              {stop.artist}
            </p>
            <p className="text-sm text-ink_3 mt-0.5">{stop.city}</p>
          </div>
          <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
            <p className="label">{stop.organizer}</p>
            {stop.isPast ? (
              <span className="label shrink-0">Played</span>
            ) : (
              <span className="label !text-ink shrink-0 inline-flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-ink inline-block"
                  aria-hidden="true"
                ></span>
                Upcoming
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
