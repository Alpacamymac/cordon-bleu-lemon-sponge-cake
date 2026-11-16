/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cordon: {
          navy: '#0f172a',
          dark: '#1e293b',
          blue: '#1e3a8a',
          light: '#3b82f6',
        },
        lemon: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
        },
        caramel: {
          DEFAULT: '#c2410c',
          dark: '#9a3412',
          light: '#ea580c',
        },
      },
      keyframes: {
        whisk: {
          '0%, 100%': { transform: 'rotate(-8deg) scale(1)' },
          '50%': { transform: 'rotate(8deg) scale(1.03)' },
        },
        shiver: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        ovenGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(234, 88, 12, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(234, 88, 12, 0.8))' },
        },
      },
      animation: {
        whisk: 'whisk 0.25s infinite ease-in-out',
        shiver: 'shiver 0.15s infinite ease-in-out',
        ovenGlow: 'ovenGlow 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
