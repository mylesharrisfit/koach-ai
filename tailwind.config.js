/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Matte-black premium base, mirroring the KOACH AI app identity.
        ink: {
          900: '#08090C',
          800: '#0C0E13',
          700: '#12141B',
          600: '#181B24',
        },
        // Primary blue (matches app --primary: 37 99 235) → light steps for dark UI.
        brand: {
          DEFAULT: '#2563EB',
          400: '#3B82F6',
          300: '#60A5FA',
        },
        // AI accent violet (matches app --ai: 124 58 237).
        ai: {
          DEFAULT: '#7C3AED',
          300: '#A78BFA',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(37,99,235,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -30px rgba(0,0,0,0.9)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
