/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        protein: {
          DEFAULT: '#00B3D1',
        },
        veg: {
          DEFAULT: '#9EC859',
        },
        carbs: {
          DEFAULT: '#E7792B',
        },
        fat: {
          DEFAULT: '#F9C623',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
