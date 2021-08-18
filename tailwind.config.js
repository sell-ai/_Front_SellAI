const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#0891b2',
          50: '#ecfeff',
          100: '#cffafe',
          light: '#06b6d4',
          lighter: '#22d3ee',
          dark: '#0e7490',
          darker: '#155e75',
        },
      },
      fontFamily: {
        sans: [
          'Cairo',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};