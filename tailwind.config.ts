import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          hover: 'var(--bg-hover)',
        },
        border: {
          default: 'var(--border)',
          gold: 'var(--border-gold)',
          glow: 'var(--border-gold)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          glow: 'var(--primary-glow)',
        },
        accent: {
          green: 'var(--accent-green)',
          amber: 'var(--accent-amber)',
          red: 'var(--accent-red)',
          mint: 'var(--accent-green)',
          coral: 'var(--accent-red)',
          gold: 'var(--primary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        gold: 'var(--shadow-gold)',
      },
      fontSize: {
        hero: 'clamp(36px, 6vw, 80px)',
        section: 'clamp(28px, 4vw, 56px)',
        card: 'clamp(18px, 2.5vw, 24px)',
        body: 'clamp(14px, 1.5vw, 16px)',
        caption: 'clamp(12px, 1.2vw, 14px)',
      },
    },
  },
  plugins: [],
};

export default config;
