/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "sublima": ["Sublima", "sans-serif"],
      sans: ["Inter", ...defaultTheme.fontFamily.sans]
    },
    extend: {},
  },
  plugins: [],
}