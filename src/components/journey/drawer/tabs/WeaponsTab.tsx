// ============================================================
//  WeaponsTab — Drawer tab: divine weapons (astras) list
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';
import { useT } from '@/hooks/useT';

interface WeaponsTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function WeaponsTab({ kanda, styles }: WeaponsTabProps) {
  const { t } = useT();
  const { textTitle, textBody, bgCard } = styles;

  return (
    <div className="space-y-3">
      {kanda.weapons.map(w => (
        <div key={w.name} className={`p-4 rounded-xl border ${bgCard} flex gap-4 items-start`}>
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border"
            style={{ borderColor: `${kanda.accentHex}40`, background: `${kanda.accentHex}10` }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: kanda.accentHex }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="flex-1">
            <p className={`font-display text-sm ${textTitle} uppercase tracking-wide`}>{w.name}</p>
            <p className="font-body text-[9px] uppercase tracking-wider mb-2" style={{ color: kanda.accentHex }}>
              {t('weapon.wielder')}: {w.wielder}
            </p>
            <p className={`font-body text-xs ${textBody} leading-relaxed`}>{w.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
