// ============================================================
//  ReferencesTab — Drawer tab: source references
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';

interface ReferencesTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function ReferencesTab({ kanda, styles }: ReferencesTabProps) {
  const { textTitle, textMuted, bgCard } = styles;

  return (
    <div className="space-y-3">
      {kanda.references.map((ref, i) => (
        <div key={i} className={`p-4 rounded-xl border ${bgCard} space-y-2`}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: kanda.accentHex }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <p className={`font-display text-sm ${textTitle} uppercase tracking-wide`}>{ref.name}</p>
          </div>
          <p className={`font-body text-[10px] ${textMuted} leading-relaxed pl-6`}>{ref.detail}</p>
        </div>
      ))}
    </div>
  );
}
