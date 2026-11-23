"use client";

import { useState } from "react";

import type { Hobby } from "@/lib/marriage";

/** Line icons, keyed by `Hobby.icon`. Stroked so they sit at text weight. */
const ICONS: Record<string, React.ReactNode> = {
  dumbbell: (
    <>
      <path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8" />
    </>
  ),
  plane: <path d="M3 13l18-7-7 18-2.5-7.5L3 13z" />,
  sparkle: (
    <>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 11h18a9 9 0 01-18 0z" />
      <path d="M8 8c0-1.5 1-2 1-3M12 7.5c0-1.5 1-2 1-3M16 8c0-1.5 1-2 1-3" />
    </>
  ),
  mountain: (
    <>
      <path d="M3 19l6-10 4 6 2-3 6 7H3z" />
      <circle cx="17" cy="6" r="2" />
    </>
  ),
  tools: (
    <>
      <path d="M14.5 5.5a3.5 3.5 0 004.8 4.5L21 11.7 11.7 21 10 19.3l1.7-1.7a3.5 3.5 0 00-4.5-4.8L5 10.6 10.6 5l1.9 1.9z" />
    </>
  ),
};

/**
 * Hobby tiles. Tapping one expands his own sentence about it — the point of
 * the section is the sentence, not the word "fitness".
 */
export default function HobbyGrid({ hobbies }: { hobbies: Hobby[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="mp-hobby-grid">
      {hobbies.map((hobby, i) => {
        const isOpen = open === i;
        return (
          <li key={hobby.name} className={isOpen ? "is-open" : undefined}>
            <button
              type="button"
              className={`mp-hobby${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="mp-hobby-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[hobby.icon]}
                </svg>
              </span>
              <span className="mp-hobby-name">{hobby.name}</span>
              <span className={`mp-collapse${isOpen ? " is-open" : ""}`}>
                <span className="mp-collapse-inner">
                  <span className="mp-hobby-line">{hobby.line}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
