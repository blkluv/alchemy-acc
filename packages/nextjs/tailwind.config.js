import { withAccountKitUi } from "@account-kit/react/tailwind";

/** @type {import('tailwindcss').Config} */
export default withAccountKitUi({
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkMode: ["selector", "[data-theme='dark']"],
  
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FF9FF3", // Doodles pink
          "primary-content": "#2C3A47", 
          secondary: "#FECA57", // Doodles yellow
          "secondary-content": "#2C3A47",
          accent: "#48DBFB", // Doodles blue
          "accent-content": "#2C3A47",
          neutral: "#9B59B6", // Doodles purple
          "neutral-content": "#FFFFFF",
          "base-100": "#F7FFF7", // Creamy white
          "base-200": "#FFE6F4", // Light pink
          "base-300": "#DAF5FF", // Light blue
          "base-content": "#2C3A47",
          info: "#48DBFB",
          success: "#1DD1A1", // Mint green
          warning: "#FFBE0B", // Golden yellow
          error: "#FF6B6B", // Coral

          "--rounded-btn": "1rem", // Playful rounded corners
          "--animation-btn": "bounce 0.5s", // Bouncy buttons

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--a))", // Uses accent color
          },
          ".link": {
            textUnderlineOffset: "3px",
            textDecorationColor: "#FECA57", // Yellow underline
          },
        },
      },
      {
        dark: {
          primary: "#9B59B6", // Purple
          "primary-content": "#FFFFFF",
          secondary: "#48DBFB", // Blue
          "secondary-content": "#2C3A47",
          accent: "#FF9FF3", // Pink
          "accent-content": "#2C3A47",
          neutral: "#FECA57", // Yellow
          "neutral-content": "#2C3A47",
          "base-100": "#2C3A47", // Dark slate
          "base-200": "#34495E", // Lighter slate
          "base-300": "#7F8C8D", // Gray
          "base-content": "#F7FFF7",
          info: "#48DBFB",
          success: "#1DD1A1",
          warning: "#FFBE0B",
          error: "#FF6B6B",

          "--rounded-btn": "1rem",
          "--animation-btn": "bounce 0.5s",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--n))", // Uses neutral color
          },
          ".link": {
            textUnderlineOffset: "3px",
            textDecorationColor: "#FECA57",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgba(255, 158, 243, 0.3)", // Pink glow
        "doodle": "4px 4px 0px 0px #2C3A47", // Cartoonish offset shadow
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce": "bounce 0.8s infinite alternate", // Added bounce
        "float": "float 3s ease-in-out infinite", // For floating elements
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        doodle: ["'Comic Neue'", "cursive"], // Playful font
      },
    },
  },
});