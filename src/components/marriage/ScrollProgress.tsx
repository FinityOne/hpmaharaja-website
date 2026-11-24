"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A hairline progress rail pinned under the navbar, plus the name of the
 * section currently on screen.
 *
 * The page is long and read almost entirely on a phone, where there is no
 * scrollbar to tell you how much is left. The rail answers "how far in am I",
 * and the chapter label answers "what am I looking at" without her having to
 * scroll back up to a heading.
 */
export default function ScrollProgress({
  chapters,
}: {
  chapters: { id: string; label: string }[];
}) {
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState(chapters[0]?.label ?? "");
  const ticking = useRef(false);

  useEffect(() => {
    const read = () => {
      ticking.current = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Whichever chapter heading sits nearest the top of the viewport wins.
     `rootMargin` pulls the trigger line down to just under the navbar so a
     section is announced as it arrives, not when it is already half gone. */
  useEffect(() => {
    const nodes = chapters
      .map((c) => document.getElementById(c.id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!hit) return;
        const match = chapters.find((c) => c.id === hit.target.id);
        if (match) setChapter(match.label);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <div className="mp-progress" aria-hidden="true">
      <div className="mp-progress-track">
        <span className="mp-progress-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="mp-progress-meta">
        <span>{chapter}</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}
