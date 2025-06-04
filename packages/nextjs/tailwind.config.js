import { withAccountKitUi } from "@account-kit/react/tailwind";
/** @type {import('tailwindcss').Config} */
export default withAccountKitUi({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#C4B5FD", // pastel purple 🔮
          "primary-content": "#2E2B3A",
          secondary: "#FBCFE8", // pastel pink 🌸
          "secondary-content": "#3C2A4D",
          accent: "#A5F3FC", // pastel aqua 🧘‍♀️
          "accent-content": "#1F2937",
          neutral: "#E0F2FE", // cloud blue ☁️
          "neutral-content": "#1F2937",
          "base-100": "#FFFFFF",
          "base-200": "#FAF5FF", // lavender haze
          "base-300": "#F3E8FF",
          "base-content": "#2E2B3A",
          info: "#93C5FD",
          success: "#6EE7B7",
          warning: "#FCD34D",
          error: "#FCA5A5",

          "--rounded-btn": "9999rem",
          "--tooltip-color": "oklch(var(--p))",
        },
      },
      {
        dark: {
          primary: "#7C3AED", // deep indigo 💜
          "primary-content": "#F9FAFB",
          secondary: "#F472B6", // electric pink 💗
          "secondary-content": "#1E1B26",
          accent: "#38BDF8", // sky blue ✨
          "accent-content": "#1E293B",
          neutral: "#1E293B",
          "neutral-content": "#E0F2FE",
          "base-100": "#1F2937",
          "base-200": "#111827",
          "base-300": "#0F172A",
          "base-content": "#F9FAFB",
          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",

          "--rounded-btn": "9999rem",
          "--tooltip-color": "oklch(var(--p))",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "Inter", "sans-serif"],
      },
      boxShadow: {
        center: "0 0 20px rgba(0, 0, 0, 0.05)",
        aura: "0 0 40px 10px rgba(164, 202, 254, 0.25)", // spiritual glow 💫
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
});
