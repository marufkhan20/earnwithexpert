/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d6efd",
        dark: "#23262f",
        secondary: "#777e90",
        gray: "#F7F7F7",
        br: "#e5e5e5",
      },
    },
  },
  plugins: [],
};
