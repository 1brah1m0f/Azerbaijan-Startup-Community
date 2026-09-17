import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./locales/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#00c9a7",
          cyan: "#00d2ff",
          blue: "#2563eb",
          violet: "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-heading)", "Space Grotesk", "sans-serif"],
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -60px) scale(1.15)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "60%, 100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        blob: "blob 12s infinite",
        "blob-slow": "blob 18s infinite",
        "gradient-x": "gradientX 6s ease infinite",
        marquee: "marquee 45s linear infinite",
        "bounce-soft": "bounceSoft 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 3s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
