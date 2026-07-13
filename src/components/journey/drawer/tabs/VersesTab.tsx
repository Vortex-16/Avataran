// ============================================================
//  VersesTab — Drawer tab: per-Kanda featured shlokas
//  NEW in the refactor. Renders kanda.featuredVerses; the tab
//  is only surfaced when the Kanda has verses (Phase 1B data).
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';

interface VersesTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function VersesTab({ kanda, styles }: VersesTabProps) {
  const { isLight, textTitle, textBody, textMuted, textMutedLess, bgCard, borderDivider } = styles;
  const verses = kanda.featuredVerses ?? [];

  if (verses.length === 0) {
    return (
      <div className={`p-6 rounded-xl border ${bgCard} text-center`}>
        <p className={`font-body text-xs ${textMuted} leading-relaxed`}>
          Curated shlokas for this Kanda are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {verses.map(v => (
        <div key={v.id} className={`p-5 rounded-xl border ${bgCard} space-y-3`}>
          <div className="flex items-center justify-between gap-2">
            <span className="font-body text-[9px] uppercase tracking-widest font-bold" style={{ color: kanda.accentHex }}>
              {v.speaker ?? 'Valmiki'}
            </span>
            <span className={`font-body text-[9px] ${textMutedLess} uppercase tracking-wider`}>
              Sarga {v.sarga}.{v.shloka}
            </span>
          </div>

          <p className={`font-devanagari text-base leading-relaxed ${textTitle} italic`}>
            {v.devanagari}
          </p>

          {v.transliteration && (
            <p className={`font-body text-[11px] ${textMuted} italic leading-relaxed`}>
              {v.transliteration}
            </p>
          )}

          <p className={`font-body text-xs ${textBody} leading-relaxed border-t ${borderDivider} pt-3`}>
            <span className="text-[#d9a441] font-semibold">Translation:</span> {v.translation}
          </p>

          {v.commentary && (
            <p className={`font-body text-[10px] ${textMuted} italic leading-relaxed`}>
              {v.commentary}
            </p>
          )}

          {v.tags && v.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {v.tags.map(tag => (
                <span
                  key={tag}
                  className={`font-body text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${isLight ? 'border-black/10 text-[#3a3229]/60' : 'border-white/10 text-[#f4e8d3]/50'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
