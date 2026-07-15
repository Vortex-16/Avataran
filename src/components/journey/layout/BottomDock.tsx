// ============================================================
//  BottomDock — iOS frosted-glass footer navigation dock
//  Tabs: Lifeline · Characters · Ram Mandir · Saved
//  Extracted from JourneyPage; expanded in Phase 1C.
// ============================================================
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export type JourneyView = 'lifeline' | 'mandir';

interface BottomDockProps {
  currentView: JourneyView;
  onViewChange: (view: JourneyView) => void;
  onOpenCharacters: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  isLight: boolean;
}

const iconCls = 'h-3.5 w-3.5 shrink-0';

export default function BottomDock({
  currentView, onViewChange, onOpenCharacters, onOpenSaved, savedCount, isLight,
}: BottomDockProps) {
  const inactive = isLight ? 'text-black/55 hover:text-black' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3]';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] pointer-events-auto w-[94%] max-w-md">
      <div className={`relative px-3 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex items-center justify-between gap-0.5 ${
        isLight ? 'bg-white/75 border-black/10 text-[#2b251f]' : 'bg-[#0d0c0a]/65 border-white/10 text-[#f4e8d3]'
      }`}>
        {/* Lifeline */}
        <button
          onClick={() => onViewChange('lifeline')}
          className={`relative flex-1 py-2 px-2 rounded-full font-body text-[9px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
            currentView === 'lifeline' ? 'text-[#ff7900] z-10' : inactive
          }`}
        >
          {currentView === 'lifeline' && (
            <motion.div layoutId="activeDockTab" className={`absolute inset-0 rounded-full z-[-1] border ${isLight ? 'bg-black/[0.04] border-black/10' : 'bg-white/[0.06] border-white/10'}`} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="whitespace-nowrap hidden sm:inline">Lifeline</span>
        </button>

        {/* Characters */}
        <button
          onClick={onOpenCharacters}
          className={`relative flex-1 py-2 px-2 rounded-full font-body text-[9px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${inactive}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-4-4h-1m-6 5H2v-1a4 4 0 014-4h4a4 4 0 014 4v1zm-3-11a3 3 0 11-6 0 3 3 0 016 0zm7 0a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="whitespace-nowrap hidden sm:inline">Cast</span>
        </button>

        {/* Ram Mandir */}
        <button
          onClick={() => onViewChange('mandir')}
          className={`relative flex-1 py-2 px-2 rounded-full font-body text-[9px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
            currentView === 'mandir' ? 'text-[#ff7900] z-10' : inactive
          }`}
        >
          {currentView === 'mandir' && (
            <motion.div layoutId="activeDockTab" className={`absolute inset-0 rounded-full z-[-1] border ${isLight ? 'bg-black/[0.04] border-black/10' : 'bg-white/[0.06] border-white/10'}`} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="whitespace-nowrap hidden sm:inline">Mandir</span>
        </button>

        {/* Saved */}
        <button
          onClick={onOpenSaved}
          className={`relative flex-1 py-2 px-2 rounded-full font-body text-[9px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${inactive}`}
        >
          <span className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#ff5e00] text-white font-body text-[8px] font-bold flex items-center justify-center">
                {savedCount > 99 ? '99+' : savedCount}
              </span>
            )}
          </span>
          <span className="whitespace-nowrap hidden sm:inline">Saved</span>
        </button>
      </div>
    </div>
  );
}
