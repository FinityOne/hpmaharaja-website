"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Shot } from "@/lib/marriage";

/**
 * A thumb-driven photo reel: CSS scroll-snap does the swiping, so it is
 * native-smooth on a phone and needs no gesture handling here.
 *
 * JavaScript only adds the position dots and keeps them in step with the
 * scroll. Without it you still get a scrollable row of captioned photos.
 */
export default function PhotoReel({ shots }: { shots: Shot[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  /* Which card is nearest the center of the track decides the active dot. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestGap = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const gap = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
          if (gap < bestGap) {
            bestGap = gap;
            best = i;
          }
        });
        setActive(best);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="mp-reel">
      <ul className="mp-reel-track" ref={trackRef}>
        {shots.map((shot) => (
          <li key={shot.src} className="mp-reel-card">
            <figure>
              <div className="mp-reel-frame">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={760}
                  height={950}
                  sizes="(max-width: 640px) 78vw, 340px"
                  className="mp-reel-img"
                />
                <span className="mp-reel-tag">{shot.tag}</span>
              </div>
              <figcaption className="mp-reel-caption">{shot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mp-reel-dots">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            className={`mp-reel-dot${i === active ? " is-active" : ""}`}
            aria-label={`Photo ${i + 1} of ${shots.length}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
