import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05070D",
        abyss: "#0A0F1F",
        slate: {
          850: "#141B2E",
        },
        circuit: {
          50: "#EAF4FF",
          100: "#CFE6FF",
          200: "#9CCBFF",
          300: "#63ACFF",
          400: "#3B82F6",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        cyan: {
          accent: "#22D3EE",
        },
        violet: {
          accent: "#7C6CF6",
        },
        ink: {
          100: "#F8FAFC",
          300: "#C7D0E0",
          500: "#94A3B8",
          700: "#5B6680",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.18), transparent 60%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px -8px rgba(59,130,246,0.35)",
        "glow-cyan": "0 0 40px -8px rgba(34,211,238,0.45)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        drift: "drift 18s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "100%": { transform: "translateX(-40px) translateY(-40px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
