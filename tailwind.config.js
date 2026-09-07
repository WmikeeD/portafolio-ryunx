/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          card: '#111827',
          primary: '#38BDF8',
          secondary: '#10B981',
          accent: '#F59E0B',
        },
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.12)' },
        },
      },
      animation: {
        breathe: 'breathe 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
