/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'egyptian-blue': '#1034A6',
        'egyptian-blue-light': '#3b6fe9',
        'egyptian-blue-dark': '#0d2680',
        midnight: '#05070a',
        charcoal: '#0a0d12',
        'charcoal-light': '#0f141c',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};
