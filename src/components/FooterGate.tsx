"use client";

import { usePathname } from "next/navigation";

/**
 * Drops the sitewide footer on the biodata, the way `Navbar` drops the nav.
 *
 * /marriage ends on one question — call or text — and a footer under it
 * offers twenty other things to do instead, which is the opposite of what
 * that page is for. Every route in it is still reachable from every other
 * page on the site, and the biodata's own closing card already links out to
 * the ventures and the essays for anyone curious about the rest of him.
 *
 * The footer stays a server component: it is passed through as `children`,
 * already rendered, so only this four-line decision ships to the browser
 * rather than the whole footer's markup and links.
 */
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/marriage")) return null;

  return <>{children}</>;
}
