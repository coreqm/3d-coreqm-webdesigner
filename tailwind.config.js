/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./*.html",
    "./admin/**/*.html",
    "./admin/**/*.js",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: '#00f0ff',
          dark: '#060709',
          card: '#0c0e13',
          border: '#1f2229'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}