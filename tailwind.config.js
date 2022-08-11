const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
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
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      },
      fontFamily: {
        sans: [
          'Cairo',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};