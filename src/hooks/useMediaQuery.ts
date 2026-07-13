// ============================================================
//  useMediaQuery — Responsive media query hook
//  Returns boolean match for a given CSS media query.
// ============================================================
'use client';
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Pre-built mobile breakpoint (< 768px) */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}
