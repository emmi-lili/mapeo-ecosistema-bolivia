import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        base: "#0A0A0A", // near-pure black - page background
        surface: "#111111", // alternating sections
        // Accent (teal from #56bfc8)
        emerald: {
          DEFAULT: "#56BFC8",
          highlight: "#8EE8EF",
          deep: "#3A9AA3",
        },
        // Text
        heading: "#FAFAFA", // titles
        body: "#A1A1AA", // paragraph text
      },
      borderColor: {
        subtle: "rgba(255,255,255,0.08)",
      },
      backgroundColor: {
        subtle: "rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        accent:
          "linear-gradient(135deg, #3A9AA3 0%, #56BFC8 48%, #8EE8EF 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "1120px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        ripple: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)" },
        },
      },
      animation: {
        // Per-circle delay is applied inline via `animationDelay` in the component.
        ripple: "ripple var(--duration, 2s) ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
