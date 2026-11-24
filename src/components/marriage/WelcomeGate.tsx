"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  GATE_ENTER,
  GATE_EYEBROW,
  GATE_FALLBACK_GREETING,
  GATE_GREETING,
  GATE_LINES,
  GATE_SKIP,
} from "@/lib/marriage";
import useGuestName from "./useGuestName";

/**
 * The door in front of the biodata.
 *
 * Heran shares a personalized link — /marriage?for=Priya — and this is the
 * first thing she sees: her name, one rotating line about what this could
 * be, and a single button. One decision, no scrolling, then the page opens.
 *
 * Three things make it safe to put a full-screen overlay in front of a page
 * that SEO is load-bearing for:
 *
 * - It only exists after mount, so the server-rendered HTML is the whole
 *   biodata. Crawlers and anyone without JS never meet the gate.
 * - It only appears when the link actually carries a name. A bare
 *   /marriage behaves exactly as it did before.
 * - It is dismissible by button and by Escape, and the page behind it is
 *   the whole biodata — nothing is gated away, only delayed by one tap.
 */
export default function WelcomeGate() {
  const name = useGuestName();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [line, setLine] = useState(0);
  const enterRef = useRef<HTMLButtonElement>(null);

  /* Open whenever the link carries a name — every time, including on a
     reload. It used to remember that she had already come through it in
     this tab, which meant Heran could not reliably show anyone the
     greeting, and a refresh mid-read silently dropped the one part of the
     page addressed to her personally. The link is the switch; nothing
     else. */
  useEffect(() => {
    if (name) setOpen(true);
  }, [name]);

  /* Hold the page still behind the overlay. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Rotate the line. */
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setLine((i) => (i + 1) % GATE_LINES.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [open]);

  /* Send focus to the one control, so a keyboard or screen reader lands on
     the way out rather than at the top of a page it cannot reach. */
  useEffect(() => {
    if (open) enterRef.current?.focus();
  }, [open]);

  const dismiss = useCallback((target?: string) => {
    setLeaving(true);
    /* Let the curtain finish before it leaves the tree. */
    window.setTimeout(() => {
      setOpen(false);
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }, 620);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className={`mp-gate${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={name ? `A welcome for ${name}` : "Welcome"}
    >
      <div className="mp-gate-petals" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`mp-petal mp-petal-${(i % 9) + 1}`} />
        ))}
      </div>

      <div className="mp-gate-body">
        <p className="mp-gate-eyebrow">{GATE_EYEBROW}</p>

        {/* Two lines, two sizes. "Jai Shree Krishna," is four times the
            length of the "Hello," it replaced, so it takes a modest size of
            its own and her name keeps the display one — she should still be
            the biggest thing on the screen. */}
        <h2 className="mp-gate-greeting">
          {name ? (
            <>
              <span className="mp-gate-hello">{GATE_GREETING}</span>
              <span className="mp-gate-name">{name}</span>
            </>
          ) : (
            <span className="mp-gate-hello is-solo">{GATE_FALLBACK_GREETING}</span>
          )}
        </h2>

        <p className="mp-gate-sub">
          You&rsquo;ve been sent something a little more honest than a biodata.
        </p>

        {/* Re-keying replays the fade, so each line arrives rather than
            swapping in place. */}
        <p className="mp-gate-line" aria-live="polite">
          <span key={line} className="mp-fade-in">
            {GATE_LINES[line]}
          </span>
        </p>

        <div className="mp-gate-dots" aria-hidden="true">
          {GATE_LINES.map((text, i) => (
            <span key={text} className={`mp-gate-dot${i === line ? " is-active" : ""}`} />
          ))}
        </div>

        <button
          ref={enterRef}
          type="button"
          className="mp-btn mp-btn-solid mp-gate-enter"
          onClick={() => dismiss()}
        >
          {GATE_ENTER}
        </button>

        <button type="button" className="mp-gate-skip" onClick={() => dismiss("match")}>
          {GATE_SKIP}
        </button>
      </div>
    </div>
  );
}
