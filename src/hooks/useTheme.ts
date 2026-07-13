// ============================================================
//  useTheme — Theme state management hook
//  Persists dark/light mode in localStorage.
// ============================================================
'use client';
import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'dark' | 'light';

interface UseThemeReturn {
  theme: ThemeMode;
  isLight: boolean;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('avataran-theme') as ThemeMode | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('avataran-theme', next);
      return next;
    });
  }, []);

  return { theme, isLight: theme === 'light', toggleTheme };
}
