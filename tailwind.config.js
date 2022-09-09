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
        '13rem': '13rem',
        '17rem': '17rem',
        '27rem': '27rem',
        '208px': '208px', //3
        '280px': '280px', //4
        '424px': '424px', //6
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
