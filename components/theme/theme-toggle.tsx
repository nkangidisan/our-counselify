'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem('theme', theme);
}

export function ThemeToggle({ iconOnly = false }: { iconOnly?: boolean }) {
  const [theme, setTheme] = useState<Theme>('light');
  const isDark = theme === 'dark';

  useEffect(() => {
    const initialTheme = resolveInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-surface text-[18px] text-text-primary shadow-sm"
      >
        <span aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="interactive-target relative inline-flex h-11 w-[92px] items-center rounded-full border border-border-default bg-bg-elevated p-1 shadow-sm"
    >
      <span
        className={`absolute top-1 h-9 w-9 rounded-full bg-primary shadow-sm transition-transform duration-200 ease-out ${
          isDark ? 'translate-x-[44px]' : 'translate-x-0'
        }`}
      />
      <span className="relative z-[1] grid w-full grid-cols-2 text-[16px]">
        <span className={`flex items-center justify-center ${!isDark ? 'text-text-primary' : 'text-text-muted'}`}>☀️</span>
        <span className={`flex items-center justify-center ${isDark ? 'text-text-primary' : 'text-text-muted'}`}>🌙</span>
      </span>
    </button>
  );
}
