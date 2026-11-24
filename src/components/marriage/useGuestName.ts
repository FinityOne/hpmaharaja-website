"use client";

import { useEffect, useState } from "react";

import { GUEST_PARAMS, sanitizeGuestName } from "@/lib/marriage";

/**
 * Her name, read from the URL after mount.
 *
 * Deliberately not `useSearchParams`: reading the query during render would
 * force `/marriage` out of static generation (or demand a Suspense boundary
 * around half the page), and the greeting is a personal touch, not content
 * that needs to be in the server-rendered HTML. Reading it in an effect
 * keeps the page static and keeps crawlers looking at the real page rather
 * than at a greeting addressed to nobody.
 *
 * Returns "" until mount, and "" whenever the link carries no usable name.
 */
export default function useGuestName(): string {
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      for (const key of GUEST_PARAMS) {
        const found = sanitizeGuestName(params.get(key));
        if (found) {
          setName(found);
          return;
        }
      }
    } catch {
      /* A malformed query string is not worth breaking the page over. */
    }
  }, []);

  return name;
}
