import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        expo: {
          cyan: "hsl(var(--expo-cyan))",
          "cyan-glow": "hsl(var(--expo-cyan-glow))",
          emerald: "hsl(var(--expo-emerald))",
          amber: "hsl(var(--expo-amber))",
          red: "hsl(var(--expo-red))",
          purple: "hsl(var(--expo-purple))",
          dark: "hsl(var(--expo-dark))",
          panel: "hsl(var(--expo-panel))",
          border: "hsl(var(--expo-border))",
          text: "hsl(var(--expo-text))",
          "text-muted": "hsl(var(--expo-text-muted))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.1)" },
        },
        "data-flow": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "fan-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "wire-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "data-flow": "data-flow 1.5s ease-in-out infinite",
        "fan-spin": "fan-spin 1s linear infinite",
        "wire-pulse": "wire-pulse 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "scan-line": "scan-line 2s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
      backgroundImage: {
        "gradient-expo": "linear-gradient(135deg, hsl(220 20% 8%) 0%, hsl(220 18% 12%) 100%)",
        "gradient-panel": "linear-gradient(180deg, hsl(220 18% 14%) 0%, hsl(220 18% 10%) 100%)",
        "gradient-glow": "linear-gradient(135deg, hsl(190 100% 50% / 0.2) 0%, hsl(160 84% 45% / 0.1) 100%)",
        "gradient-header": "linear-gradient(90deg, hsl(190 100% 50%) 0%, hsl(160 84% 45%) 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px hsl(190 100% 50% / 0.3)",
        "glow-emerald": "0 0 20px hsl(160 84% 45% / 0.4)",
        "glow-amber": "0 0 20px hsl(38 92% 50% / 0.4)",
        "glow-red": "0 0 20px hsl(0 72% 51% / 0.4)",
        panel: "0 4px 30px hsl(220 20% 4% / 0.5)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
