/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mint-green': '#00e29d',
        'mint-green-dark': '#01c287',
        'logo-green': '#00a16d',
      },
    },
  },
  plugins: [],
}
