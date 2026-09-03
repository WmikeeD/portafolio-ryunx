/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          surface: '#111827',
          primary: '#38BDF8',
          secondary: '#10B981',
        },
      },
    },
  },
  plugins: [],
}
