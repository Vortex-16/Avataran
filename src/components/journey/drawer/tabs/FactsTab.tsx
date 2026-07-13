// ============================================================
//  FactsTab — Drawer tab: numbered "did you know" facts
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';

interface FactsTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function FactsTab({ kanda, styles }: FactsTabProps) {
  const { textBody, bgCard } = styles;

  return (
    <div className="space-y-3">
      {kanda.facts.map((fact, i) => (
        <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${bgCard}`}>
          <span
            className="shrink-0 font-display text-lg font-bold leading-none mt-0.5"
            style={{ color: kanda.accentHex }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className={`font-body text-xs ${textBody} leading-relaxed`}>{fact}</p>
        </div>
      ))}
    </div>
  );
}
