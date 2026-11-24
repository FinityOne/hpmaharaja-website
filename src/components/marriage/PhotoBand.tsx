import Image from "next/image";

import type { Band } from "@/lib/marriage";

/**
 * A full-bleed photograph with one line of text over it, dropped between two
 * text-heavy sections.
 *
 * The page is a long read on a phone, and a wall of prose is where people
 * stop scrolling. These are the breathing points: no interaction, nothing to
 * decide, just his face and a single sentence before the next block of
 * reading starts.
 *
 * A server component — there is nothing here that needs the client, and the
 * images sit far enough down the page that Next's default lazy loading is
 * exactly what we want.
 */
export default function PhotoBand({ band }: { band: Band }) {
  return (
    <figure className="mp-band">
      <Image
        src={band.src}
        alt={band.alt}
        fill
        sizes="100vw"
        className="mp-band-img"
        style={{ objectPosition: band.focus ?? "50% 35%" }}
      />
      <span className="mp-band-scrim" aria-hidden="true" />
      <figcaption className="mp-band-caption">
        {band.kicker && <span className="mp-band-kicker">{band.kicker}</span>}
        <span className="mp-band-line">{band.line}</span>
      </figcaption>
    </figure>
  );
}
