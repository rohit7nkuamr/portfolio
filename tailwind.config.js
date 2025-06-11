/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a', // dark navy for game feel
        accent: '#38bdf8',   // cyan accent
        'accent-light': '#7dd3fc', // lighter cyan for gradients
        secondary: '#f472b6'  // pink for additional accents
      }
    }
  },
  plugins: []
};
