"use client";

import { useEffect, useState } from "react";

/**
 * Cycles the line under his name.
 *
 * State starts at the first line, so that line is in the server-rendered HTML
 * and the hero reads correctly with JavaScript off — the rotation is the
 * enhancement, not the content.
 */
export default function HeroRotator({ lines }: { lines: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (lines.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [lines.length]);

  return (
    <p className="mp-hero-rotator" aria-live="polite">
      {/* Re-keying remounts the span, which replays the fade. */}
      <span key={index} className="mp-fade-in">
        {lines[index]}
      </span>
    </p>
  );
}
