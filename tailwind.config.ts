import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Landing sequence + video overlay (dark, over the flower).
        soft: {
          black: "#14100f",
          charcoal: "#231d1c",
        },
        ivory: "#f5ece3",
        // Interior pages — a single warm, luminous palette drawn from the
        // flower itself: bone paper, ink, and one restrained blush accent.
        bone: "#f5f2ec",
        porcelain: "#fbf9f4",
        ink: {
          DEFAULT: "#2a2421",
          soft: "#6b635b",
          faint: "#9c948b",
        },
        line: "#e7e1d6",
        rose: {
          muted: "#c88aa0",
          deep: "#a4677c",
          tint: "#efe2e7",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
