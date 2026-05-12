/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D1B787',
          light:   '#EAD9B5',
          pale:    '#F7F0E2',
          mid:     '#B89865',
          dark:    '#9A7D4A',
          deep:    '#7A6038',
        },
        navy: {
          DEFAULT: '#464B69',
          light:   '#6B7194',
          pale:    '#ECEDF4',
          mid:     '#A4A9C4',
          dark:    '#2E3249',
          deep:    '#1A1E30',
        },
        ivory:  '#F4F2ED',
        sand:   '#DDD9D0',
        warm:   '#8B8A85',
        cream: {
          DEFAULT: '#EDE8DF',
          pale:    '#F7F3EE',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter:  ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 4px 24px rgba(70,75,105,0.10)',
        'card-lg': '0 12px 48px rgba(70,75,105,0.20)',
        'gold':    '0 8px 24px rgba(209,183,135,0.40)',
      },
      backgroundImage: {
        'hero-1': "linear-gradient(135deg,rgba(26,30,48,0.94) 45%,rgba(70,75,105,0.78) 100%), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80')",
        'hero-2': "linear-gradient(135deg,rgba(26,30,48,0.95) 40%,rgba(40,20,20,0.85) 100%), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80')",
      },
      keyframes: {
        progress: { from: { width: '0%' }, to: { width: '100%' } },
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:  { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
      animation: {
        progress: 'progress 5s linear infinite',
        fadeUp:   'fadeUp 0.6s ease forwards',
        slideIn:  'slideIn 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};
