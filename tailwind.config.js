/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coke: {
          black: '#0B0B0B',
          charcoal: '#141414',
          card: '#18181B',
          red: '#F40009',
          white: '#FFFFFF',
          muted: '#8E8E93',
          border: '#27272A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Space Mono"', '"SF Mono"', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'coke-glow': '0 0 25px rgba(244, 0, 9, 0.35)',
        'coke-glow-sm': '0 0 12px rgba(244, 0, 9, 0.25)',
      },
    },
  },
  plugins: [],
}
