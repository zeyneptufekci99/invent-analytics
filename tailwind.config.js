/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "768px",
      },
      colors: {
        deep: "#3B1E54",
        lavendar: "#9B7EBD",
        "light-lavendar": "#D4BEE4",
        gray: "#EEEEEE",
        border: "#D4D4D4",
        "secondary-grey": "#d5d5d5",
      },
    },
  },
  plugins: [],
};
