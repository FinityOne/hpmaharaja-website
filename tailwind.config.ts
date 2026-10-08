import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Mirrors the token set the Django templates configured against the Tailwind
 * CDN build, so the ported markup keeps the same class names.
 */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Palantir-style neutral system */
        paper: "#F5F4F1",
        paper_2: "#EFEDE8",
        surface: "#FFFFFF",
        ink: "#0B0B0C",
        ink_2: "#3A3A3C",
        ink_3: "#6E6E73",
        line: "rgba(11,11,12,0.12)",
        line_strong: "rgba(11,11,12,0.26)",
        /* legacy brand tokens, still referenced by the article templates */
        maharaja_bg: "#050507",
        maharaja_gold: "#8A6A2F",
        maharaja_gold_soft: "#6F5425",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", '"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [typography],
} satisfies Config;
