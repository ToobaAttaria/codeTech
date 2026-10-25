/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#132944',
        ink: '#26384d',
        muted: '#66778b',
        brand: '#2463eb',
        'brand-dark': '#174ec4',
        'brand-light': '#eef5ff',
        line: '#e5ebf2',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 40px rgba(19, 41, 68, 0.07)',
      },
    },
  },
  plugins: [],
}
