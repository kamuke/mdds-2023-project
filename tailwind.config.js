/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './public/**/*.{html,js}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend'],
        display: ['Dela Gothic One'],
      },
      colors: {
        primary: {
          DEFAULT: '#f1e25c',
          100: '#faf5c4',
          200: '#f6ed9d',
          300: '#f3e777',
          400: '#f1e25c',
          500: '#eedd43',
          600: '#eccc3d',
          700: '#e9b536',
          800: '#e69e2e',
          900: '#e0771d',
        },
        secondary: {
          DEFAULT: '#8e5aff',
          100: '#dac8fe',
          200: '#c0a3ff',
          300: '#a57bff',
          400: '#8e5aff',
          500: '#7538fd',
          600: '#6933f6',
          700: '#562aed',
          800: '#4223e8',
          900: '#1b16d9',
        },
        tetriary: {
          DEFAULT: '#9fd75a',
          100: '#def1c6',
          200: '#c8e8a1',
          300: '#b1df7a',
          400: '#9fd75a',
          500: '#8dcf39',
          600: '#7dbf31',
          700: '#67ab26',
          800: '#52971c',
          900: '#2c740a',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
