// ============================================================
//  KandaBanner — Clickable kanda header card (opens drawer)
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import { useT } from '@/hooks/useT';

interface KandaBannerProps {
  kanda: KandaSection;
  isLight: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export default function KandaBanner({ kanda, isLight, isOpen, onClick }: KandaBannerProps) {
  const { t } = useT();
  return (
    <div className="w-full flex justify-center text-center relative md:px-12">
      <button
        className={`w-full max-w-[650px] p-6 md:p-8 rounded-2xl ${
          isLight
            ? 'bg-[#faf7f0]/75 border-black/[0.06] shadow-[0_15px_35px_rgba(43,37,31,0.06)]'
            : 'bg-[#14110b]/55 border-white/[0.04] shadow-[0_15px_35px_rgba(0,0,0,0.4)]'
        } backdrop-blur-md border flex flex-col gap-4 items-center group cursor-pointer hover:border-white/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left`}
        onClick={onClick}
        style={{ borderColor: isOpen ? `${kanda.accentHex}40` : undefined }}
      >
        <span
          className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold"
          style={{ color: kanda.accentHex }}
        >
          {kanda.title}
        </span>
        <h3 className={`font-display text-2xl md:text-4xl ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'} tracking-wider uppercase font-bold`}>
          {kanda.subtitle}
        </h3>

        {/* Sloka */}
        <div className={`border-l-2 border-r-2 ${isLight ? 'border-black/15 bg-black/[0.03]' : 'border-[#ff7900]/40 bg-[#ff5e00]/[0.05]'} px-6 py-3 my-1.5 flex flex-col gap-2 rounded-lg w-full text-center`}>
          <p className="font-devanagari text-lg md:text-xl italic text-[#ff9933] font-semibold leading-relaxed">
            {kanda.sloka.substring(0, 70)}…
          </p>
          <p className={`font-body text-xs md:text-sm ${isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]/90'} italic leading-snug font-medium`}>
            {kanda.slokaTranslation}
          </p>
        </div>

        {/* Explore prompt button */}
        <div
          className="flex items-center gap-2 font-body text-xs md:text-sm uppercase tracking-wider font-bold px-6 py-2.5 rounded-full border transition-all duration-300 group-hover:scale-105 min-h-[44px]"
          style={{
            borderColor: `${kanda.accentHex}60`,
            color: kanda.accentHex,
            background: isLight ? `${kanda.accentHex}1a` : `${kanda.accentHex}25`,
            boxShadow: `0 4px 14px ${kanda.accentHex}20`
          }}
        >
          <span>{t('timeline.explore')}</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Background image tint */}
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.04] bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('${kanda.backgroundImage}')` }}
        />
      </button>
    </div>
  );
}
