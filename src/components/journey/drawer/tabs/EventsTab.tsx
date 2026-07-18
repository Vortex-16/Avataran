// ============================================================
//  EventsTab — Drawer tab listing all events in a Kanda
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';
import { useT } from '@/hooks/useT';

interface EventsTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function EventsTab({ kanda, styles }: EventsTabProps) {
  const { t } = useT();
  const { isLight, textTitle, textBody, textMutedLess, bgCard, borderDivider } = styles;

  return (
    <div className="space-y-4">
      {kanda.events.map((ev, i) => (
        <div key={ev.id} className={`relative rounded-xl overflow-hidden border ${bgCard}`}>
          {/* Hero image strip */}
          <div className="relative h-28 overflow-hidden">
            <img
              src={ev.media.hero}
              alt={ev.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(1.15)' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} via-${isLight ? '[#faf6f0]' : '[#0d0c0a]'}/30 to-transparent`} />
            {ev.turning && (
              <span
                className="absolute top-2 right-2 font-body text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-bold"
                style={{ borderColor: kanda.accentHex, color: kanda.accentHex, background: `${kanda.accentHex}18` }}
              >
                {t('timeline.turningPoint')}
              </span>
            )}
            <div className="absolute bottom-2 left-3">
              <span className={`font-body text-[9px] ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/50'} uppercase tracking-wider`}>
                {ev.location}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-display text-base ${textTitle} uppercase tracking-wide leading-tight`}>
                {ev.title}
              </h3>
              <span className={`shrink-0 font-body text-[9px] ${textMutedLess} uppercase mt-1`}>#{i + 1}</span>
            </div>
            {ev.subtitle && (
              <p className="font-body text-[10px]" style={{ color: kanda.accentHex }}>{ev.subtitle}</p>
            )}
            <p className={`font-body text-xs ${textBody} leading-relaxed`}>
              {ev.description}
            </p>
            {ev.quote && (
              <blockquote
                className={`border-l-2 pl-3 py-1 my-2 italic font-body text-[11px] ${isLight ? 'text-[#3a3229]/75' : 'text-[#f4e8d3]/55'} leading-relaxed`}
                style={{ borderColor: kanda.accentHex }}
              >
                &quot;{ev.quote}&quot;
              </blockquote>
            )}
            {ev.weapon && (
              <div className="flex items-center gap-2 mt-2">
                <span className={`font-body text-[9px] uppercase tracking-wider ${textMutedLess}`}>{t('event.weapon')}</span>
                <span
                  className="font-body text-[9px] uppercase tracking-wider font-bold"
                  style={{ color: kanda.accentHex }}
                >
                  {ev.weapon}
                </span>
              </div>
            )}
            <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${borderDivider}`}>
              {ev.characters.map(c => (
                <span
                  key={c}
                  className={`font-body text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${isLight ? 'border-black/10 text-[#3a3229]/60' : 'border-white/10 text-[#f4e8d3]/50'}`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
