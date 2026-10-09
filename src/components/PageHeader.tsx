import type { ReactNode } from "react";

import Figure from "@/components/Figure";

/**
 * The masthead every standalone page opens with: kicker, title, lead, an
 * optional artwork panel and an optional hairline fact strip.
 *
 * Kept in one component so the pages that were previously anchors on the home
 * page all read as part of the same publication.
 */
export default function PageHeader({
  kicker,
  title,
  lead,
  aside,
  slot,
  facts,
  actions,
}: {
  kicker: string;
  title: string;
  lead?: string;
  /** Short column of copy beside the title, when the lead needs a companion. */
  aside?: string;
  /** Artwork slot key; omit for a text-only masthead. */
  slot?: string;
  facts?: { label: string; value: string }[];
  actions?: ReactNode;
}) {
  return (
    <section className="pt-28 lg:pt-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
          <div className={slot ? "lg:col-span-7" : "lg:col-span-8"}>
            <p className="label mb-7">{kicker}</p>
            <h1 className="display text-[clamp(2.2rem,5.6vw,4.4rem)] max-w-[22ch]">{title}</h1>
            {lead ? (
              <p className="mt-7 text-lg lg:text-xl text-ink_2 max-w-[52ch] leading-relaxed">
                {lead}
              </p>
            ) : null}
            {aside ? (
              <p className="mt-5 text-base text-ink_3 max-w-[52ch] leading-relaxed">{aside}</p>
            ) : null}
            {actions ? <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>

          {slot ? (
            <div className="lg:col-span-5">
              <Figure slot={slot} ratio="wide" />
            </div>
          ) : null}
        </div>

        {facts?.length ? (
          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`border-t border-line py-7 ${
                  index % 2 === 0 ? "pr-6" : "pl-6 lg:pl-7 lg:pr-6"
                } lg:border-r last:lg:border-r-0`}
              >
                <dt className="label mb-2">{fact.label}</dt>
                <dd className="text-lg sm:text-xl font-semibold tracking-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
