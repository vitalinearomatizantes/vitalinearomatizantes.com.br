/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['"PT Serif"'],
        'logo-secondary': ['"Pompiere"'],
      },
      colors: {
        logo: {
          primary: '#a35725',
          secondary: '#a35725',
          bg: '#f5c7b3',
        },
      },
    },
  },
  plugins: [],
}
