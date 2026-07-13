// ============================================================
//  MandirCard — Day/Night (Arati / Deepotsav) view toggle
//  Special-case renderer for the 'ram-mandir' event.
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';

interface MandirCardProps {
  isLight: boolean;
  isNightMode: boolean;
  setIsNightMode: (night: boolean) => void;
}

export default function MandirCard({ isLight, isNightMode, setIsNightMode }: MandirCardProps) {
  return (
    <div className={`mt-2 flex items-center justify-between p-3 rounded-xl ${isLight ? 'bg-black/[0.02] border border-black/5' : 'bg-white/[0.02] border border-white/5'}`}>
      <span className={`font-body text-[9px] uppercase tracking-wider ${isLight ? 'text-[#3a3229]/60' : 'text-[#f4e8d3]/50'}`}>
        Mandir View:{' '}
        <span style={{ color: isNightMode ? '#ff9e5e' : '#d9a441' }}>
          {isNightMode ? 'Night — Deepotsav' : 'Day — Arati'}
        </span>
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => setIsNightMode(false)}
          className={`px-2.5 py-1 rounded-full font-body text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            !isNightMode
              ? 'bg-[#d9a441]/25 border border-[#d9a441] text-[#ff7900] font-bold'
              : isLight ? 'bg-black/[0.02] border border-black/5 text-black/40 hover:text-black/70' : 'bg-white/[0.02] border border-white/5 text-[#f4e8d3]/40'
          }`}
        >☀ Day</button>
        <button
          onClick={() => setIsNightMode(true)}
          className={`px-2.5 py-1 rounded-full font-body text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            isNightMode
              ? 'bg-[#ff5e00]/25 border border-[#ff5e00] text-[#ff7900] font-bold'
              : isLight ? 'bg-black/[0.02] border border-black/5 text-black/40 hover:text-black/70' : 'bg-white/[0.02] border border-white/5 text-[#f4e8d3]/40'
          }`}
        >☾ Night</button>
      </div>
    </div>
  );
}
