// ============================================================
//  TopToolbar — Unified Minimal Header Toolbar
//  Combines Sound, Search, Saved (Bookmarks), Daily Quiz,
//  Theme Toggle, and Language Toggle in a clean unified row.
// ============================================================
'use client';
import React from 'react';
import { useT } from '@/hooks/useT';
import { useStore } from '@/app/store';

interface TopToolbarProps {
  isLight: boolean;
  dailyStreak: number;
  savedCount: number;
  onOpenSearch: () => void;
  onOpenDaily: () => void;
  onOpenSaved: () => void;
  onOpenAbout: () => void;
  onToggleTheme: () => void;
}

export default function TopToolbar({
  isLight,
  dailyStreak,
  savedCount,
  onOpenSearch,
  onOpenDaily,
  onOpenSaved,
  onOpenAbout,
  onToggleTheme,
}: TopToolbarProps) {
  const { t } = useT();
  const lang = useStore(s => s.lang);
  const toggleLang = useStore(s => s.toggleLang);

  // Sound store state
  const soundConsentGiven = useStore(s => s.soundConsentGiven);
  const soundEnabled = useStore(s => s.soundEnabled);
  const setSoundEnabled = useStore(s => s.setSoundEnabled);
  const isDynamicIslandOpen = useStore(s => s.isDynamicIslandOpen);
  const setIsDynamicIslandOpen = useStore(s => s.setIsDynamicIslandOpen);
  const heroComplete = useStore(s => s.heroComplete);

  const activeOverlay = useStore(s => s.activeOverlay);
  const isSavedActive = activeOverlay === 'bookmarks';
  const isSearchActive = activeOverlay === 'search';

  const handleSoundToggle = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobile && heroComplete) {
      setIsDynamicIslandOpen(!isDynamicIslandOpen);
    } else {
      const next = !soundEnabled;
      setSoundEnabled(next);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('avataran_sound_enabled', next.toString());
      }
    }
  };

  const btnIcon = `h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-auto md:px-3.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-sm flex items-center justify-center gap-2 pointer-events-auto cursor-pointer focus:outline-none font-body text-xs font-bold shrink-0 ${
    isLight
      ? 'bg-white/90 border-black/15 text-[#1c1814] hover:bg-white hover:border-black/30'
      : 'bg-[#120f0a]/90 border-[#d05c43]/30 text-[#f4e8d3] hover:border-[#d05c43]/60'
  }`;

  return (
    <div className="fixed top-3 right-3 md:top-6 md:right-8 z-50 flex items-center justify-end gap-1.5 md:gap-2 pointer-events-auto max-w-[calc(100vw-24px)] overflow-x-auto scrollbar-none">
      {/* 1. Sound Button (Unified) */}
      {soundConsentGiven && (
        <button
          onClick={handleSoundToggle}
          className={`${btnIcon} ${soundEnabled ? 'border-[#ff7900]/50' : 'opacity-70'}`}
          aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
          title={soundEnabled ? 'Sound On' : 'Muted'}
        >
          {soundEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-[#ff7900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
          <span className="hidden md:inline whitespace-nowrap">
            {soundEnabled ? (lang === 'hi' ? 'ध्वनि ऑन' : 'Sound On') : (lang === 'hi' ? 'ध्वनि बंद' : 'Muted')}
          </span>
        </button>
      )}

      {/* 2. Search */}
      <button
        onClick={onOpenSearch}
        className={`${btnIcon} ${isSearchActive ? 'border-[#ff7900] text-[#ff7900]' : ''}`}
        aria-label={`${t('action.search')} (Ctrl+K)`}
        title={`${t('action.search')} (Ctrl+K)`}
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <span className="hidden md:inline whitespace-nowrap">
          {lang === 'hi' ? 'खोज' : (t('action.search') || 'Search')}
        </span>
      </button>

      {/* 3. Bookmarks / Saved (संग्रह) */}
      <button
        onClick={onOpenSaved}
        className={`${btnIcon} relative ${isSavedActive ? 'border-[#ff7900] text-[#ff7900]' : ''}`}
        aria-label={t('dock.saved') || 'Saved'}
        title={t('dock.saved') || 'Saved'}
      >
        <svg className="h-4 w-4 shrink-0 text-[#ff7900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="hidden md:inline whitespace-nowrap">
          {lang === 'hi' ? 'संग्रह' : (t('dock.saved') || 'Saved')}
        </span>
        {savedCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#ff5e00] text-white font-body text-[9px] font-bold flex items-center justify-center">
            {savedCount > 99 ? '99+' : savedCount}
          </span>
        )}
      </button>

      {/* 4. Daily Challenge */}
      <button
        onClick={onOpenDaily}
        className={`${btnIcon} relative`}
        aria-label={t('action.daily')}
        title={t('action.daily')}
      >
        <svg className="h-4 w-4 text-[#ff9933] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          <circle cx="12" cy="7" r="5" />
        </svg>
        {dailyStreak > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#ff5e00] text-white font-body text-[9px] font-bold flex items-center justify-center">
            {dailyStreak}
          </span>
        )}
      </button>

      {/* 5. Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className={`${btnIcon} !w-9 !h-9 sm:!w-10 sm:!h-10 md:!w-11 md:!h-11`}
        aria-label="Toggle theme"
        title={isLight ? 'Dark Mode' : 'Light Mode'}
      >
        {isLight ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#b89552]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#d05c43]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* 6. Language Toggle */}
      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        title={lang === 'en' ? 'हिन्दी में देखें' : 'View in English'}
        className={`${btnIcon} !w-auto !px-2.5 sm:!px-3`}
      >
        <span className={lang === 'en' ? 'text-[#ff7900]' : 'opacity-60'}>EN</span>
        <span className="opacity-40">|</span>
        <span className={`font-devanagari ${lang === 'hi' ? 'text-[#ff7900]' : 'opacity-60'}`}>हि</span>
      </button>

      {/* 7. About & Mission */}
      <button
        onClick={onOpenAbout}
        className={`${btnIcon} !w-9 !h-9 sm:!w-10 sm:!h-10 md:!w-11 md:!h-11`}
        aria-label="About & Sourcing"
        title={lang === 'hi' ? 'संदर्भ एवं उद्देश्य' : 'About & Mission'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ff7900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}


