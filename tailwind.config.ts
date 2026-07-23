import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#090909",
          2: "#111111",
        },
        surface: "rgba(255,255,255,0.04)",
        "surface-hover": "rgba(255,255,255,0.07)",
        text: {
          DEFAULT: "#ffffff",
          2: "#a1a1aa",
          3: "#6c6c72",
        },
        accent: {
          DEFAULT: "#d4af37",
          bright: "#e9cc76",
          glow: "rgba(212,175,55,.15)",
        },
        border: {
          DEFAULT: "rgba(255,255,255,.08)",
          strong: "rgba(255,255,255,.16)",
        },
      },
      borderRadius: {
        s: "14px",
        m: "22px",
        l: "28px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        auroraDrift1: {
          "0%, 100%": { transform: "translate(-50%,0) scale(1)" },
          "50%": { transform: "translate(-54%,-2%) scale(1.06)" },
        },
        auroraDrift2: {
          "0%, 100%": { transform: "translate(-50%,0) scale(1)" },
          "50%": { transform: "translate(-46%,3%) scale(1.09)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".35" },
        },
      },
      animation: {
        aurora1: "auroraDrift1 26s ease-in-out infinite",
        aurora2: "auroraDrift2 21s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
