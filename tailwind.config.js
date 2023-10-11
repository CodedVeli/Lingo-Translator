/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        kau: ["Kaushan Script", "cursive"],
      },
    },
  },
  plugins: [],
}