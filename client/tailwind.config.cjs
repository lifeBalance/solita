/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bikes": "url('./src/assets/bikes.jpg')",
      }
    },
  },
  plugins: [],
}