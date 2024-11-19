/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'mint-green': '#00e29d',
        'mint-green-dark': '#01c287',
      },
    },
  },
  plugins: [],
}
