/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        ink: '#0A0A0A',
        // The logo red is the only accent on the site. Change it here only.
        accent: { DEFAULT: '#FC081C', dark: '#D90618' },
      },
      maxWidth: { page: '72rem' },
    },
  },
  plugins: [],
}
