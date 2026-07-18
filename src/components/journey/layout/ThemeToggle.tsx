// ============================================================
//  ThemeToggle — Fixed dark/light theme switch button
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isLight, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-8 right-[96px] z-40 p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none ${
        isLight
          ? 'bg-white/80 border-black/10 text-black hover:bg-white hover:border-black/25'
          : 'bg-[#14110b]/80 border-[#d05c43]/20 text-[#f4e8d3]/80 hover:text-[#f4e8d3] hover:border-[#d05c43]/50'
      }`}
      aria-label="Toggle theme"
    >
      {isLight ? (
        /* Sun Icon */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b89552]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        /* Moon Icon */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d05c43]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
