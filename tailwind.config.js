/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#16181D',
        mut: '#4A505C',
        line: '#DCE0E5',
        mist: '#EEF0F2',
        graphite: { DEFAULT: '#1B1E24', 2: '#242830', 3: '#2E333C' },
        // Brand blue: CTAs, highlights and accents. text = on white, light = on graphite.
        brand: { DEFAULT: '#1F5EFF', dark: '#1749D1', text: '#1A56F0', light: '#5B8CFF', ink: '#0B1F5C' },
        ok: '#1F7A52',
        amber: '#F2C46B',
      },
      maxWidth: { page: '75rem' },
    },
  },
  plugins: [],
}
