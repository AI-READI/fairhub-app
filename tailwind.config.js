/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,mdx,stories.js,stories.mdx}"],
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#57E0FF",
          100: "#42DCFF",
          200: "#19D5FF",
          300: "#00C4F0",
          400: "#00A2C7",
          500: "#00819E",
          600: "#005366",
          700: "#00252E",
          800: "#000000",
          900: "#000000",
        },
        secondary: {
          50: "#FEDFC9",
          100: "#FDD3B5",
          200: "#FCBB8D",
          300: "#FBA366",
          400: "#FA8B3E",
          500: "#f97316",
          600: "#D25905",
          700: "#9B4204",
          800: "#642B03",
          900: "#2D1301",
        },
      },
      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
      },
    },
  },
};
