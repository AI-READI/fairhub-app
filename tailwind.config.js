/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,mdx,stories.js,stories.mdx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          60: "#eef2ff",
          100: "#dbeafe",
          110: "#e0f2fe",
          200: "#bfdbfe",
          210: "#bae6fd",
          300: "#93c5fd",
          310: "#7dd3fc",
          400: "#60a5fa",
          410: "#38bdf8",
          500: "#3b82f6",
          510: "#06b6d4",
          600: "#2563eb",
          610: "#0284c7",
          700: "#1d4ed8",
          710: "#0369a1",
          800: "#1e40af",
          810: "#075985",
          900: "#1e3a8a",
          910: "#0c4a6e",
          920: "#312e81",
        },
        secondary: {
          50: "#fff7ed",
          60: "#fffbeb",
          100: "#ffedd5",
          110: "#fef3c7",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          410: "#fbbf24",
          510: "#f59e0b",
          500: "#f97316",
          600: "#ea580c",
          610: "#d97706",
          700: "#c2410c",
          710: "#b45309",
          800: "#9a3412",
          810: "#92400e",
          900: "#7c2d12",
          910: "#78350f",
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
  ],
};
