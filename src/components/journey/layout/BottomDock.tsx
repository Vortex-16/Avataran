// ============================================================
//  BottomDock — iOS frosted-glass footer navigation dock
//  Clean & Senior-Citizen Friendly (3 Main Tabs):
//  1. Lifeline (कथा)  2. Cast (पात्र)  3. Ram Mandir (दर्शन)
// ============================================================
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';
import { useStore } from '@/app/store';

export type JourneyView = 'lifeline' | 'mandir';

interface BottomDockProps {
  currentView: JourneyView;
  onViewChange: (view: JourneyView) => void;
  onOpenCharacters: () => void;
  isLight: boolean;
}

const iconCls = 'h-5 w-5 shrink-0';

export default function BottomDock({
  currentView,
  onViewChange,
  onOpenCharacters,
  isLight,
}: BottomDockProps) {
  const { t } = useT();
  const activeOverlay = useStore(s => s.activeOverlay);
  const lang = useStore(s => s.lang);

  const inactive = isLight
    ? 'text-[#2b251f]/70 hover:text-[#2b251f] hover:bg-black/5'
    : 'text-[#f4e8d3]/70 hover:text-[#f4e8d3] hover:bg-white/5';

  const isLifelineActive = activeOverlay === 'none' && currentView === 'lifeline';
  const isMandirActive = activeOverlay === 'none' && currentView === 'mandir';
  const isCharactersActive = activeOverlay === 'constellation';

  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[90] pointer-events-auto w-[92%] max-w-md">
      <div
        className={`relative px-2 py-1.5 md:px-3 md:py-2 rounded-full border backdrop-blur-2xl transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.45)] flex items-center justify-between gap-1 ${
          isLight
            ? 'bg-white/90 border-black/15 text-[#1c1814]'
            : 'bg-[#120f0a]/90 border-[#d05c43]/30 text-[#f4e8d3]'
        }`}
      >
        {/* 1. Lifeline (कथा) */}
        <button
          onClick={() => onViewChange('lifeline')}
          className={`relative flex-1 py-2.5 px-3 rounded-full font-body text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[46px] ${
            isLifelineActive ? 'text-[#ff7900] z-10' : inactive
          }`}
          aria-label={t('dock.lifeline') || 'Lifeline'}
        >
          {isLifelineActive && (
            <motion.div
              layoutId="activeDockTab"
              className={`absolute inset-0 rounded-full z-[-1] border ${
                isLight ? 'bg-black/[0.06] border-black/15 shadow-sm' : 'bg-white/[0.1] border-white/15 shadow-sm'
              }`}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="whitespace-nowrap font-medium tracking-wide">
            {lang === 'hi' ? 'कथा' : (t('dock.lifeline') || 'Lifeline')}
          </span>
        </button>

        {/* 2. Cast (पात्र) */}
        <button
          onClick={onOpenCharacters}
          className={`relative flex-1 py-2.5 px-3 rounded-full font-body text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[46px] ${
            isCharactersActive ? 'text-[#ff7900] z-10' : inactive
          }`}
          aria-label={t('dock.cast') || 'Cast'}
        >
          {isCharactersActive && (
            <motion.div
              layoutId="activeDockTab"
              className={`absolute inset-0 rounded-full z-[-1] border ${
                isLight ? 'bg-black/[0.06] border-black/15 shadow-sm' : 'bg-white/[0.1] border-white/15 shadow-sm'
              }`}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-4-4h-1m-6 5H2v-1a4 4 0 014-4h4a4 4 0 014 4v1zm-3-11a3 3 0 11-6 0 3 3 0 016 0zm7 0a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="whitespace-nowrap font-medium tracking-wide">
            {lang === 'hi' ? 'पात्र' : (t('dock.cast') || 'Cast')}
          </span>
        </button>

        {/* 3. Ram Mandir (दर्शन) */}
        <button
          onClick={() => onViewChange('mandir')}
          className={`relative flex-1 py-2.5 px-3 rounded-full font-body text-xs md:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[46px] ${
            isMandirActive ? 'text-[#ff7900] z-10' : inactive
          }`}
          aria-label={t('dock.mandir') || 'Mandir'}
        >
          {isMandirActive && (
            <motion.div
              layoutId="activeDockTab"
              className={`absolute inset-0 rounded-full z-[-1] border ${
                isLight ? 'bg-black/[0.06] border-black/15 shadow-sm' : 'bg-white/[0.1] border-white/15 shadow-sm'
              }`}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="whitespace-nowrap font-medium tracking-wide">
            {lang === 'hi' ? 'दर्शन' : (t('dock.mandir') || 'Mandir')}
          </span>
        </button>
      </div>
    </div>
  );
}

