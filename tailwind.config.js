/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./main/screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {

      'white': '#ffffff',
      'themeColor':'#e1fdf9',
      'secondary':'#04cfaf'
    },
    extend: {},
  },
  plugins: [],
}


