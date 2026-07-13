// ============================================================
//  LeftKandaNav — Desktop fixed left-rail kanda tracker
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';

interface LeftKandaNavProps {
  /** The 7 canonical kandas (excludes ayodhya-mandir). */
  kandas: KandaSection[];
  activeKanda: string;
  isLight: boolean;
}

const KANDA_ORDER = ['bala', 'ayodhya', 'aranya', 'kishkindha', 'sundara', 'yuddha', 'uttara'];

export default function LeftKandaNav({ kandas, activeKanda, isLight }: LeftKandaNavProps) {
  const activeIdx = KANDA_ORDER.indexOf(activeKanda);

  return (
    <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 items-start font-body text-[10px] tracking-[0.25em] uppercase font-semibold">
      {kandas.map((k, idx) => {
        const isCompletedOrActive = idx <= activeIdx;

        return (
          <button
            key={k.id}
            className={`flex items-center gap-3 transition-all duration-500 cursor-pointer bg-transparent border-0 text-left ${
              activeKanda === k.id ? 'translate-x-2' : 'hover:translate-x-1'
            }`}
            style={{ color: activeKanda === k.id ? k.accentHex : isLight ? 'rgba(43,37,31,0.35)' : 'rgba(244,232,211,0.25)' }}
            onClick={() => {
              const el = document.getElementById(`section-${k.id}`);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-500 shrink-0"
              style={isCompletedOrActive
                ? { background: k.accentHex, boxShadow: activeKanda === k.id ? `0 0 8px ${k.accentHex}` : 'none' }
                : { background: isLight ? 'rgba(43,37,31,0.2)' : 'rgba(244,232,211,0.15)' }
              }
            />
            <span className="whitespace-nowrap">{k.title.replace(' Kanda', '')}</span>
          </button>
        );
      })}
    </div>
  );
}
