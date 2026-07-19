// ============================================================
//  CharactersTab — Drawer tab: character/cast grid
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import Image from 'next/image';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';

interface CharactersTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function CharactersTab({ kanda, styles }: CharactersTabProps) {
  const { isLight, textTitle, bgCard, borderDivider, textMutedLess } = styles;

  return (
    <div className="grid grid-cols-2 gap-3">
      {kanda.characters.map(char => (
        <div key={char.name} className={`rounded-xl overflow-hidden border ${bgCard} flex flex-col`}>
          <div className="relative h-36 overflow-hidden">
            <Image
              src={char.portrait}
              alt={char.name}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover object-top"
              style={{ filter: 'brightness(0.6) saturate(1.1)' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} via-transparent to-transparent`} />
            <div className="absolute bottom-2 left-2 right-2">
              <p className={`font-display text-sm ${textTitle} uppercase tracking-wide leading-tight`}>
                {char.name}
              </p>
              <p className="font-body text-[9px] uppercase tracking-wider" style={{ color: kanda.accentHex }}>
                {char.role}
              </p>
            </div>
            {/* Status dot */}
            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
              char.status === 'active' ? 'bg-green-400' :
              char.status === 'departed' ? 'bg-red-500' :
              'bg-purple-400'
            }`} title={char.status} />
          </div>
          <div className="p-3 flex flex-col gap-1.5 flex-1">
            <p className={`font-body text-[10px] ${isLight ? 'text-[#3a3229]/75' : 'text-[#f4e8d3]/60'} leading-relaxed`}>
              {char.description}
            </p>
            {char.weapon && (
              <div className={`flex items-center gap-1.5 mt-auto pt-2 border-t ${borderDivider}`}>
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: kanda.accentHex }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z" />
                </svg>
                <span className={`font-body text-[9px] ${textMutedLess}`}>{char.weapon}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
