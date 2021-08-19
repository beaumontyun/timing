const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      // padding: "1.5rem",
    },
    fontFamily: {
      'sans': ['Open Sans', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
