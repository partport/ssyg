/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
      },
      width: {
        // '208': '13rem',
        // '280': '17.5rem',
        // '424': '26.5rem',
        '13': '13rem',
        '17.5': '17.5rem',
        '26.5': '26.5rem',
        '128': '32rem',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
