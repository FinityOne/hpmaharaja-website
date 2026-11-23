"use client";

import { useEffect, useState } from "react";

/**
 * The call/text bar that slides up on phones once she is properly into the
 * page, and gets out of the way again at the bottom where the real contact
 * card already is.
 *
 * It is rendered empty until JavaScript has measured the scroll, so it can
 * never sit over the footer for a reader without JS.
 */
export default function StickyCta({
  phoneHref,
  smsHref,
}: {
  phoneHref: string;
  smsHref: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const t = window.scrollY / scrollable;
      /* In from a third of the way down, out once the contact card is up. */
      setShown(t > 0.3 && t < 0.92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`mp-sticky${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
      <p className="mp-sticky-line">Still reading? That&rsquo;s a good sign.</p>
      <div className="mp-sticky-actions">
        <a className="mp-btn mp-btn-solid" href={phoneHref} tabIndex={shown ? 0 : -1}>
          Call
        </a>
        <a className="mp-btn mp-btn-ghost" href={smsHref} tabIndex={shown ? 0 : -1}>
          Text
        </a>
      </div>
    </div>
  );
}
