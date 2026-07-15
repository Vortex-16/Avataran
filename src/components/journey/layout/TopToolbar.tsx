// ============================================================
//  TopToolbar — fixed top-right actions: Search + Daily Quiz
//  Sits to the left of the ThemeToggle button.
// ============================================================
'use client';
import React from 'react';

interface TopToolbarProps {
  isLight: boolean;
  dailyStreak: number;
  onOpenSearch: () => void;
  onOpenDaily: () => void;
}

export default function TopToolbar({ isLight, dailyStreak, onOpenSearch, onOpenDaily }: TopToolbarProps) {
  const btn = `p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none ${
    isLight
      ? 'bg-white/80 border-black/10 text-black/70 hover:text-black hover:border-black/25'
      : 'bg-[#14110b]/80 border-[#d05c43]/20 text-[#f4e8d3]/80 hover:text-[#f4e8d3] hover:border-[#d05c43]/50'
  }`;

  return (
    <div className="fixed top-8 right-[136px] z-40 flex items-center gap-2">
      {/* Search */}
      <button onClick={onOpenSearch} className={btn} aria-label="Search (Ctrl+K)" title="Search (Ctrl+K)">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </button>

      {/* Daily challenge */}
      <button onClick={onOpenDaily} className={`relative ${btn}`} aria-label="Daily challenge" title="Daily Challenge">
        <svg className="h-5 w-5 text-[#ff9933]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          <circle cx="12" cy="7" r="5" />
        </svg>
        {dailyStreak > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#ff5e00] text-white font-body text-[8px] font-bold flex items-center justify-center">
            {dailyStreak}
          </span>
        )}
      </button>
    </div>
  );
}
