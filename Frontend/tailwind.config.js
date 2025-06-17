const {heroui} = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blueGreen: '#209792',
      white: '#FFFFFF',
      black: '#000000',
      orangeSalud: "#F87A01"
    },
    extend: {},
  },
  
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: "#209792"
        },
      },
    },
  }),],
};