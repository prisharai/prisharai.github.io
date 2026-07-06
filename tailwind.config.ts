import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        soft: {
          black: "#14100f",
          charcoal: "#231d1c",
        },
        ivory: "#f5ece3",
        rose: {
          muted: "#c88aa0",
          deep: "#a8697f",
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
