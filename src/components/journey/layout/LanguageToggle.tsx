// ============================================================
//  LanguageToggle — EN ⇄ हि switch (fixed top-right cluster)
// ============================================================
'use client';
import React from 'react';
import { useStore } from '@/app/store';

interface LanguageToggleProps {
  isLight: boolean;
}

export default function LanguageToggle({ isLight }: LanguageToggleProps) {
  const lang = useStore(s => s.lang);
  const toggleLang = useStore(s => s.toggleLang);

  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      title={lang === 'en' ? 'हिन्दी में देखें' : 'View in English'}
      className={`fixed top-8 right-[24px] z-40 h-[46px] px-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex items-center gap-1.5 pointer-events-auto cursor-pointer focus:outline-none font-body text-[11px] font-bold ${
        isLight
          ? 'bg-white/80 border-black/10 text-black/70 hover:text-black hover:border-black/25'
          : 'bg-[#14110b]/80 border-[#d05c43]/20 text-[#f4e8d3]/80 hover:text-[#f4e8d3] hover:border-[#d05c43]/50'
      }`}
    >
      <span className={lang === 'en' ? 'text-[#ff7900]' : 'opacity-50'}>EN</span>
      <span className="opacity-30">|</span>
      <span className={`font-devanagari ${lang === 'hi' ? 'text-[#ff7900]' : 'opacity-50'}`}>हि</span>
    </button>
  );
}
