// ============================================================
//  VersesTab — Drawer tab: per-Kanda featured shlokas
//  NEW in the refactor. Renders kanda.featuredVerses; the tab
//  is only surfaced when the Kanda has verses (Phase 1B data).
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';
import BookmarkButton from '../../interactive/BookmarkButton';

interface VersesTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
  onOpenReading?: () => void;
}

export default function VersesTab({ kanda, styles, onOpenReading }: VersesTabProps) {
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
      {onOpenReading && (
        <button
          onClick={onOpenReading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold text-white cursor-pointer bg-gradient-to-r from-[#ff5e00] to-[#ff7900] hover:shadow-[0_0_18px_rgba(255,94,0,0.4)] transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Enter Reading Mode
        </button>
      )}
      {verses.map(v => (
        <div key={v.id} className={`p-5 rounded-xl border ${bgCard} space-y-3`}>
          <div className="flex items-center justify-between gap-2">
            <span className="font-body text-[9px] uppercase tracking-widest font-bold" style={{ color: kanda.accentHex }}>
              {v.speaker ?? 'Valmiki'}
            </span>
            <div className="flex items-center gap-2">
              <span className={`font-body text-[9px] ${textMutedLess} uppercase tracking-wider`}>
                Sarga {v.sarga}.{v.shloka}
              </span>
              <BookmarkButton entry={{ type: 'verse', kandaId: kanda.id, refId: v.id }} isLight={isLight} sizeClass="h-3 w-3" />
            </div>
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
