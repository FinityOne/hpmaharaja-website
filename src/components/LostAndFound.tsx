"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

/**
 * The interactive half of the 404 page.
 *
 * Two things: a mono line that cycles through consolations, and a button that
 * drops the visitor into a random essay. The slugs are passed in from the
 * server so the button can only ever land on a page that exists.
 */

const LINES = [
  "This page is pursuing balance in some other chaos.",
  "Searched the empire. This one isn't in it.",
  "Even a Maharaja loses a scroll now and then.",
  "The URL hustled too hard and burned out.",
  "Four. Zero. Four. No such throne.",
  "Wrong turn — but the right people end up here anyway.",
];

const ROTATE_MS = 3600;

export default function LostAndFound({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  /* Honour reduced-motion by holding on the first line instead of cycling. */
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || LINES.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % LINES.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const shuffle = () => {
    if (slugs.length === 0) {
      router.push("/articles");
      return;
    }
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/articles/${slug}`);
  };

  return (
    <>
      {/* aria-live so the rotation is announced rather than silently swapped */}
      <p
        key={index}
        aria-live="polite"
        className="fade-up font-mono text-[0.78rem] sm:text-sm tracking-[0.1em] uppercase text-ink_2 min-h-[3rem]"
      >
        {LINES[index]}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button type="button" onClick={shuffle} className="btn btn-solid group">
          Take me somewhere good <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </>
  );
}
