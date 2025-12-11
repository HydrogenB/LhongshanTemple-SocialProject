/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          gold: '#D4AF37',
          red: '#8B0000',
          crimson: '#DC143C',
          dark: '#1a1a1a',
          cream: '#FDF5E6',
        }
      },
      fontFamily: {
        serif: ['Noto Serif TC', 'serif'],
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px #D4AF37' },
          'to': { boxShadow: '0 0 40px #D4AF37, 0 0 60px #D4AF37' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
