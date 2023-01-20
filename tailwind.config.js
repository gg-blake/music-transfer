/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "sublima": ["Sublima", "sans-serif"],
      sans: ["Inter", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        'neon-pink': '#E766DA',
        'primary': '#5B5B5B',
        'dark': '#212121'
      },
    },
  },
  plugins: [],
}