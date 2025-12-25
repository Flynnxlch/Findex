/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,css}'],
  theme: {
    extend: {
      colors: {
        primary: '#00FF8A',
        'primary-hover': '#00d06f',
        'background-dark': '#030407',
        'surface-dark': '#0E1113',
        'surface-muted': '#11151A',
        'border-dark': '#1F242B',
        danger: '#FF4D4F',
        cyan: '#00D1FF',
        'muted-text': '#AAB0B6',
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      boxShadow: {
        neon: '0 0 24px rgba(0, 255, 138, 0.45)',
        'neon-sm': '0 0 12px rgba(0, 255, 138, 0.35)',
        card: '0 18px 45px rgba(0,0,0,0.75)',
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ticker-scroll': 'ticker-scroll 40s linear infinite',
        'fade-in-up': 'fade-in-up 600ms ease-out both',
      },
    },
  },
  plugins: [],
};


