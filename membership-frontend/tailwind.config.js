/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "primaryFont": ['IBM Plex Sans', 'sans-serif']
      },
      colors: {
        primary: '#8ec53e',
        secondary: '#0f62fe'
      }
    },
  },
  plugins: [],
}

