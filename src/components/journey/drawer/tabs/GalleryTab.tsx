// ============================================================
//  GalleryTab — Drawer tab: image gallery grid (opens lightbox)
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/data/types';
import type { DrawerStyles } from '../drawerStyles';

interface GalleryTabProps {
  items: GalleryItem[];
  styles: DrawerStyles;
  onSelect: (item: GalleryItem) => void;
}

export default function GalleryTab({ items, styles, onSelect }: GalleryTabProps) {
  const { isLight } = styles;

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((g, i) => (
        <button
          key={i}
          onClick={() => onSelect(g)}
          className={`relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer border ${isLight ? 'border-black/10 hover:border-black/35' : 'border-white/[0.05] hover:border-white/20'} transition-all duration-300`}
        >
          <Image
            src={g.image}
            alt={g.caption}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ filter: 'brightness(0.65) saturate(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <p className={`absolute bottom-2 left-2 right-2 font-body text-[9px] ${isLight ? 'text-white/85' : 'text-[#f4e8d3]/75'} leading-tight text-left`}>
            {g.caption}
          </p>
        </button>
      ))}
    </div>
  );
}
