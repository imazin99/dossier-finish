import type { Config } from "tailwindcss";

// DOSSIER design tokens — Luxury Detective UI
// Every color/spacing decision for the app should be pulled from here,
// never hardcoded in components, so the theme stays a single source of truth.
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        primary: {
          DEFAULT: "#8B0000",
          light: "#A61B1B",
          dark: "#5C0000",
        },
        card: "#141414",
        border: {
          DEFAULT: "#2A2A2A",
          light: "#3A3A3A",
        },
        text: {
          DEFAULT: "#F5F5F5",
          secondary: "#A5A5A5",
        },
      },
      fontFamily: {
        // Display face: used sparingly for headlines, case titles, dramatic moments.
        display: ["Cairo", "Playfair Display", "serif"],
        // Body face: bilingual-friendly, sets the everyday reading rhythm.
        body: ["Tajawal", "Inter", "sans-serif"],
        // Utility face: case numbers, timestamps, evidence tags — a "typewriter" feel.
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      boxShadow: {
        premium: "0 8px 32px 0 rgba(0, 0, 0, 0.55)",
        "glass-glow": "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.6)",
        "accent-glow": "0 0 24px 0 rgba(139, 0, 0, 0.35)",
        "glass-highlight": "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 12px 40px 0 rgba(0,0,0,0.6)",
        "card-hover": "0 20px 48px 0 rgba(0,0,0,0.65), 0 0 32px 0 rgba(139,0,0,0.14)",
        "button-glow": "0 4px 16px 0 rgba(139,0,0,0.35)",
      },
      backdropBlur: {
        glass: "24px",
      },
      backgroundImage: {
        "vignette":
          "radial-gradient(120% 120% at 50% 0%, rgba(139,0,0,0.08) 0%, rgba(9,9,9,0) 55%)",
        "grain-noise": "url('/noise.png')",
        "card-sheen": "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 45%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "glow-pulse": "glowPulse 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 16px 0 rgba(139,0,0,0.30), 0 4px 16px 0 rgba(139,0,0,0.25)" },
          "50%": { boxShadow: "0 0 30px 4px rgba(139,0,0,0.48), 0 4px 20px 0 rgba(139,0,0,0.35)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
