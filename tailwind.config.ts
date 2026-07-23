import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // The palette is sampled from the landing bloom: midnight blue,
        // moonlit petals, and a quiet warm-pink core.
        soft: {
          black: "#060b13",
          charcoal: "#0c1625",
        },
        ivory: "#f3eff4",
        bone: "#08111f",
        porcelain: "#101c2d",
        ink: {
          DEFAULT: "#f3eff4",
          soft: "#b7c0cf",
          faint: "#748297",
        },
        line: "#26354b",
        rose: {
          muted: "#d7bdcc",
          deep: "#e5afc8",
          tint: "#2a1e30",
        },
        bloom: {
          blue: "#8faecb",
          lavender: "#aaa8ca",
          glow: "#f0cad7",
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
