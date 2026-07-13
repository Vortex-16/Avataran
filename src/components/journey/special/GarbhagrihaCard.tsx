// ============================================================
//  GarbhagrihaCard — Ram Lalla alankaram (outfit) switcher
//  Special-case renderer for the 'garbhagriha' event.
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import PixelTransition from '../PixelTransition';

interface GarbhagrihaCardProps {
  isLight: boolean;
  lallaOutfit: string;
  setLallaOutfit: (outfit: string) => void;
}

const OUTFITS = [
  { id: 'shringaar', label: 'Shringaar' },
  { id: 'saffron', label: 'Saffron' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'flowers', label: 'Pushpa' },
  { id: 'lotus', label: 'Lotus' },
  { id: 'milk', label: 'Abhisheka' },
];

export default function GarbhagrihaCard({ isLight, lallaOutfit, setLallaOutfit }: GarbhagrihaCardProps) {
  return (
    <div className="mt-2 flex flex-col gap-4">
      <div className={`relative w-full aspect-[4/5] rounded-xl border ${isLight ? 'border-black/5 bg-black/10' : 'border-white/5 bg-black/40'} overflow-hidden shadow-inner`}>
        <PixelTransition
          src={`/assets/ram_lalla_${
            lallaOutfit === 'milk' ? 'abhisheka_milk' : lallaOutfit
          }.png`}
          alt={`Ram Lalla ${lallaOutfit}`}
          gridSize={12}
          pixelColor={isLight ? '#d9a441' : '#ff7900'}
          animationStepDuration={0.35}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />
        <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-[9px] tracking-widest text-[#d9a441] uppercase bg-black/45 px-3 py-1 rounded-full border ${isLight ? 'border-black/10' : 'border-white/5'} backdrop-blur-sm whitespace-nowrap`}>
          {lallaOutfit === 'milk' ? 'Ksheera Abhishekam' : `${lallaOutfit} Alankaram`}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {OUTFITS.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setLallaOutfit(btn.id)}
            className={`py-1.5 rounded font-body text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
              lallaOutfit === btn.id
                ? 'bg-[#d9a441]/25 border border-[#d9a441] text-[#ff7900] font-bold shadow-[0_0_8px_rgba(217,164,65,0.2)]'
                : isLight ? 'bg-black/[0.02] border border-black/5 text-black/40 hover:text-black/80' : 'bg-white/[0.02] border border-white/5 text-[#f4e8d3]/40 hover:text-[#f4e8d3]/80'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
