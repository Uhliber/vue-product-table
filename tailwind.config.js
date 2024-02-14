/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#375673',
        'theme-green': '#367364',
        'status-green': '#518104',
        'status-yellow': '#e4d33b',
        'status-red': '#c53434',
      },
      screens: {
        xs: '426px',
        xxs: '321px',
      },
    },
  },
  plugins: [],
}

