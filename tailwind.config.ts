import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // A single three-tone palette used everywhere:
        //   #e9e4ea  soft lilac paper
        //   #151f31  deep navy ink
        //   #cab1bb  muted mauve accent
        // Soft/faint variants below are derived shades of these three.
        // Landing sequence + video overlay (dark, over the flower).
        soft: {
          black: "#151f31",
          charcoal: "#1e2a42",
        },
        ivory: "#e9e4ea",
        // Interior pages.
        bone: "#e9e4ea",
        porcelain: "#f2eef3",
        ink: {
          DEFAULT: "#151f31",
          soft: "#454e63",
          faint: "#8489a0",
        },
        line: "#d7cfd9",
        rose: {
          muted: "#cab1bb",
          deep: "#9c7f8d",
          tint: "#ece3e9",
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
