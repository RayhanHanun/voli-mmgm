/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glow: {
          dark: '#4A154B',
          primary: '#702963',
          light: '#9B59B6',
          subtext: '#64748B',
          glass: 'rgba(255, 255, 255, 0.85)'
        }
      }
    },
  },
  plugins: [],
}