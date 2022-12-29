/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bikes": "url('public/assets/bikes.jpg')",
      }
    },
  },
  plugins: [],
}