"use client";

import { useState } from "react";

import type { QuickFact } from "@/lib/marriage";

/**
 * The six-up fact grid. Every card is a button: tapping it reveals one extra
 * sentence underneath.
 *
 * The details are always in the HTML and only collapsed once `html.js` is set
 * (see `.mp-collapse` in globals.css), so a reader without JavaScript gets the
 * full text rather than six dead cards.
 */
export default function FactGrid({ facts }: { facts: QuickFact[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="mp-fact-grid">
      {facts.map((fact, i) => {
        const isOpen = open === i;
        return (
          <li key={fact.label}>
            <button
              type="button"
              className={`mp-fact${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="mp-fact-label">{fact.label}</span>
              <span className="mp-fact-value">{fact.value}</span>
              <span className={`mp-collapse${isOpen ? " is-open" : ""}`}>
                <span className="mp-collapse-inner">
                  <span className="mp-fact-detail">{fact.detail}</span>
                </span>
              </span>
              <span className="mp-fact-plus" aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
