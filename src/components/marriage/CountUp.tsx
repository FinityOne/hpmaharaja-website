"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up once it scrolls into view.
 *
 * The final value is the initial state, so the real number — not a zero — is
 * what lands in the server-rendered HTML and what anyone without JavaScript,
 * or with reduced motion on, reads.
 */
export default function CountUp({
  value,
  unit = "",
  duration = 1400,
}: {
  value: number;
  unit?: string;
  duration?: number;
}) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || played.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    setShown(0);

    const run = () => {
      played.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        /* ease-out cubic: fast first, settles on the number */
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="mp-count">
      {shown.toLocaleString("en-US")}
      {unit}
    </span>
  );
}
