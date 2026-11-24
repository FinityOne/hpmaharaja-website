"use client";

import useGuestName from "./useGuestName";

/**
 * The closing headline, with her name folded in when the link carried one.
 *
 * The un-named version is what renders on the server and on the first client
 * pass, so there is no hydration mismatch and no flash of someone else's
 * name — the personal version simply arrives a beat later.
 */
export default function CtaTitle() {
  const name = useGuestName();

  return (
    <h2 className="mp-cta-title">
      {name ? (
        <>
          You read the whole thing, {name}. You already know whether to call.
        </>
      ) : (
        <>If you read this far, you already know whether to call.</>
      )}
    </h2>
  );
}
