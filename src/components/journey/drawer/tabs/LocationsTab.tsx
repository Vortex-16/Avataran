// ============================================================
//  LocationsTab — Drawer tab: locations list
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';

interface LocationsTabProps {
  kanda: KandaSection;
  styles: DrawerStyles;
}

export default function LocationsTab({ kanda, styles }: LocationsTabProps) {
  const { isLight, textTitle, textBody, textMutedLess, bgCard } = styles;

  return (
    <div className="space-y-4">
      {kanda.locations.map(loc => (
        <div key={loc.name} className={`rounded-xl overflow-hidden border ${bgCard}`}>
          <div className="relative h-32 overflow-hidden">
            <img
              src={loc.image}
              alt={loc.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(1.2)' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} to-transparent`} />
            <div className="absolute bottom-3 left-4">
              <p className={`font-display text-base ${textTitle} uppercase tracking-wide`}>{loc.name}</p>
              {loc.realWorld && (
                <p className={`font-body text-[9px] ${textMutedLess} mt-0.5`}>{loc.realWorld}</p>
              )}
            </div>
          </div>
          <div className="p-4">
            <p className={`font-body text-xs ${textBody} leading-relaxed`}>{loc.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
