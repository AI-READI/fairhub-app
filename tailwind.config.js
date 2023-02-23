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
          500: "#00819E",
        },
        secondary: {
          500: "#f97316",
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
