/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bikes": "url('./assets/bikes.jpg')",
      }
    },
  },
  plugins: [],
}