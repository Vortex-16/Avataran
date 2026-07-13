// ============================================================
//  BottomDock — iOS frosted-glass footer navigation dock
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export type JourneyView = 'lifeline' | 'mandir';

interface BottomDockProps {
  currentView: JourneyView;
  onViewChange: (view: JourneyView) => void;
  isLight: boolean;
}

export default function BottomDock({ currentView, onViewChange, isLight }: BottomDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] pointer-events-auto w-[90%] max-w-sm">
      <div className={`relative px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex items-center justify-between gap-1 ${
        isLight
          ? 'bg-white/75 border-black/10 text-[#2b251f]'
          : 'bg-[#0d0c0a]/65 border-white/10 text-[#f4e8d3]'
      }`}>
        {/* Tab 1: Lifeline */}
        <button
          onClick={() => onViewChange('lifeline')}
          className={`relative flex-1 py-2 px-3 rounded-full font-body text-[9px] md:text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
            currentView === 'lifeline'
              ? 'text-[#ff7900] z-10'
              : isLight ? 'text-black/55 hover:text-black' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3]'
          }`}
        >
          {currentView === 'lifeline' && (
            <motion.div
              layoutId="activeDockTab"
              className={`absolute inset-0 rounded-full z-[-1] border ${
                isLight
                  ? 'bg-black/[0.04] border-black/10'
                  : 'bg-white/[0.06] border-white/10'
              }`}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="whitespace-nowrap">Lifeline</span>
        </button>

        {/* Tab 2: Ram Mandir */}
        <button
          onClick={() => onViewChange('mandir')}
          className={`relative flex-1 py-2 px-3 rounded-full font-body text-[9px] md:text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
            currentView === 'mandir'
              ? 'text-[#ff7900] z-10'
              : isLight ? 'text-black/55 hover:text-black' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3]'
          }`}
        >
          {currentView === 'mandir' && (
            <motion.div
              layoutId="activeDockTab"
              className={`absolute inset-0 rounded-full z-[-1] border ${
                isLight
                  ? 'bg-black/[0.04] border-black/10'
                  : 'bg-white/[0.06] border-white/10'
              }`}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="whitespace-nowrap">Ram Mandir</span>
        </button>
      </div>
    </div>
  );
}
