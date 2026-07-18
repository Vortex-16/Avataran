// ============================================================
//  DialoguesTab — Drawer tab: key Sanskrit dialogues + context
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';
import { useT } from '@/hooks/useT';

interface DialoguesTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function DialoguesTab({ kanda, styles }: DialoguesTabProps) {
  const { t } = useT();
  const { isLight, textMuted, bgCard, borderDivider } = styles;

  return (
    <div className="space-y-5">
      {kanda.dialogues.map((d, i) => (
        <div key={i} className={`p-5 rounded-xl border ${bgCard} space-y-3`}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full" style={{ background: kanda.accentHex }} />
            <span className="font-body text-[10px] uppercase tracking-widest font-bold" style={{ color: kanda.accentHex }}>
              {d.speaker}
            </span>
          </div>
          <p className={`font-devanagari text-base leading-relaxed ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]/85'} italic`}>
            {d.sanskrit}
          </p>
          <p className={`font-body text-xs ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/55'} leading-relaxed border-t ${borderDivider} pt-3`}>
            <span className="text-[#d9a441] font-semibold">{t('verse.translation')}:</span> {d.translation}
          </p>
          <p className={`font-body text-[10px] ${textMuted} italic leading-relaxed`}>
            {t('dialogue.context')}: {d.context}
          </p>
        </div>
      ))}
    </div>
  );
}
