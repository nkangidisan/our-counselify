import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0A',
          surface: '#111111',
          elevated: '#1A1A1A',
          glass: 'rgba(255,255,255,0.04)',
        },
        border: {
          default: 'rgba(255,255,255,0.08)',
          glow: 'rgba(212,168,85,0.5)',
        },
        primary: {
          DEFAULT: '#D4A855',
          hover: '#E8C06A',
          glow: 'rgba(212,168,85,0.12)',
        },
        accent: {
          mint: '#16A34A',
          amber: '#CA8A04',
          coral: '#DC2626',
          gold: '#D4A855',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A3A3A3',
          muted: '#525252',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        slideInUp: 'slideInUp 0.8s ease-out forwards',
        fadeInScale: 'fadeInScale 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-6px)' },
          '50%': { transform: 'translateY(6px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.28)',
        glow: '0 12px 40px rgba(212,168,85,0.15)',
      },
    }
  },
  plugins: []
};

export default config;
