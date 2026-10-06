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
        brand: { DEFAULT: '#2563EB', dark: '#1D4ED8', text: '#1D4ED8', light: '#60A5FA', ink: '#0B1F5C' },
        // AI accent, as in the app (--ai)
        ai: { DEFAULT: '#7C3AED', light: '#A78BFA' },
        ok: '#1F7A52',
        amber: '#F2C46B',
      },
      maxWidth: { page: '75rem' },
    },
  },
  plugins: [],
}
