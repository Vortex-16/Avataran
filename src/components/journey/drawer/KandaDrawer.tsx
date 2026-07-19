// ============================================================
//  KandaDrawer — Slide-in drawer shell + tab routing
//  Extracted from JourneyPage. Behaviour-preserving.
//  Individual tab bodies live in ./tabs/*.
// ============================================================
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { KandaSection, GalleryItem } from '@/data/types';
import { getDrawerStyles } from './drawerStyles';
import GalleryLightbox from './GalleryLightbox';
import EventsTab from './tabs/EventsTab';
import CharactersTab from './tabs/CharactersTab';
import LocationsTab from './tabs/LocationsTab';
import WeaponsTab from './tabs/WeaponsTab';
import DialoguesTab from './tabs/DialoguesTab';
import VersesTab from './tabs/VersesTab';
import GalleryTab from './tabs/GalleryTab';
import FactsTab from './tabs/FactsTab';
import ReferencesTab from './tabs/ReferencesTab';
import { useT } from '@/hooks/useT';
import type { TKey } from '@/data/translations';

type TabId =
  | 'events' | 'characters' | 'locations' | 'weapons'
  | 'dialogues' | 'verses' | 'gallery' | 'facts' | 'references';

interface KandaDrawerProps {
  kanda: KandaSection | null;
  onClose: () => void;
  theme: 'dark' | 'light';
  onOpenReading?: (kandaId: KandaSection['id']) => void;
  onOpenQuiz?: (kandaId: KandaSection['id']) => void;
}

export default function KandaDrawer({ kanda, onClose, theme, onOpenReading, onOpenQuiz }: KandaDrawerProps) {
  const { t } = useT();
  const [tab, setTab] = useState<TabId>('events');
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const [displayGallery, setDisplayGallery] = useState<GalleryItem[]>([]);
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab('events');
    if (kanda) {
      if (kanda.id === 'ayodhya-mandir') {
        const shuffled = [...kanda.gallery].sort(() => Math.random() - 0.5);
        setDisplayGallery(shuffled);
      } else {
        setDisplayGallery(kanda.gallery);
      }
    }
  }, [kanda?.id, kanda]);

  useEffect(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollTop = 0;
    }
  }, [tab, kanda?.id]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isLight = theme === 'light';
  const styles = getDrawerStyles(isLight);
  const { textTitle } = styles;
  const bgDrawer = isLight ? 'bg-[#faf6f0]' : 'bg-[#0d0c0a]';
  const borderDrawer = isLight ? 'border-l border-black/10' : 'border-l border-white/[0.06]';
  const borderDivider = isLight ? 'border-black/[0.08]' : 'border-white/[0.04]';

  const tabs: { id: TabId; labelKey: TKey }[] = [
    { id: 'events', labelKey: 'tab.events' },
    { id: 'characters', labelKey: 'tab.characters' },
    { id: 'locations', labelKey: 'tab.locations' },
    { id: 'weapons', labelKey: 'tab.weapons' },
    { id: 'dialogues', labelKey: 'tab.dialogues' },
    { id: 'verses', labelKey: 'tab.verses' },
    { id: 'gallery', labelKey: 'tab.gallery' },
    { id: 'facts', labelKey: 'tab.facts' },
    { id: 'references', labelKey: 'tab.references' },
  ];

  return (
    <AnimatePresence>
      {kanda && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            data-lenis-prevent
            className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl flex flex-col ${bgDrawer} ${borderDrawer} shadow-[-20px_0_60px_rgba(0,0,0,0.7)] overflow-hidden`}
          >
            {/* Hero Banner */}
            <div className="relative h-52 shrink-0 overflow-hidden">
              <Image
                src={kanda.heroImage}
                alt={kanda.title}
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-cover object-center"
                style={{ filter: 'brightness(0.45) saturate(1.1)' }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} via-${isLight ? '[#faf6f0]' : '[#0d0c0a]'}/40 to-transparent`} />
              <div className={`absolute inset-0 bg-gradient-to-r from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'}/60 to-transparent`} />

              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full ${isLight ? 'bg-white/85 border-black/15 text-black/70 hover:text-black hover:border-black/35' : 'bg-black/50 border-white/10 text-[#f4e8d3]/70 hover:text-[#f4e8d3] hover:border-white/30'} flex items-center justify-center transition-all duration-200 cursor-pointer`}
                aria-label="Close drawer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Kanda metadata */}
              <div className="absolute bottom-5 left-6 right-6">
                <span
                  className="font-body text-[9px] uppercase tracking-[0.3em] font-bold"
                  style={{ color: kanda.accentHex }}
                >
                  {kanda.title}
                </span>
                <h2 className={`font-display text-2xl ${textTitle} tracking-wide uppercase mt-1 drop-shadow-lg`}>
                  {kanda.subtitle}
                </h2>
                <p className={`font-body text-[11px] ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/55'} mt-2 leading-relaxed line-clamp-2`}>
                  {kanda.description}
                </p>
              </div>
            </div>

            {/* Sloka Banner */}
            <div
              className={`shrink-0 px-6 py-3 border-y ${borderDivider} flex items-center gap-4`}
              style={{ background: `linear-gradient(90deg, ${kanda.accentHex}08, transparent)` }}
            >
              <div className="min-w-0 flex-1">
                <p className="font-devanagari text-sm italic truncate" style={{ color: kanda.accentHex }}>
                  {kanda.sloka}
                </p>
                <p className={`font-body text-[10px] ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/45'} italic mt-0.5 line-clamp-1`}>
                  {kanda.slokaTranslation}
                </p>
              </div>
              {onOpenQuiz && (kanda.quizQuestions?.length ?? 0) > 0 && (
                <button
                  onClick={() => onOpenQuiz(kanda.id)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-[9px] uppercase tracking-wider font-bold border transition-all cursor-pointer"
                  style={{ borderColor: `${kanda.accentHex}55`, color: kanda.accentHex, background: `${kanda.accentHex}12` }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('drawer.quiz')}
                </button>
              )}
            </div>

            {/* Tab Bar */}
            <div className={`shrink-0 flex items-center gap-0 overflow-x-auto border-b ${isLight ? 'border-black/[0.08]' : 'border-white/[0.05]'} px-4 scrollbar-none`}>
              {tabs.map(tb => {
                // Hide weapons tab if empty
                if (tb.id === 'weapons' && kanda.weapons.length === 0) return null;
                // Hide verses tab until this Kanda has curated verses
                if (tb.id === 'verses' && !(kanda.featuredVerses && kanda.featuredVerses.length > 0)) return null;
                return (
                  <button
                    key={tb.id}
                    onClick={() => setTab(tb.id)}
                    className={`shrink-0 px-4 py-3 font-body text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 border-b-2 cursor-pointer ${
                      tab === tb.id
                        ? 'border-current text-[#d9a441]'
                        : isLight ? 'border-transparent text-black/35 hover:text-black/70' : 'border-transparent text-[#f4e8d3]/35 hover:text-[#f4e8d3]/70'
                    }`}
                    style={tab === tb.id ? { borderColor: kanda.accentHex, color: kanda.accentHex } : {}}
                  >
                    {t(tb.labelKey)}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div ref={tabContentRef} className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-5">
              {tab === 'events' && <EventsTab kanda={kanda} styles={styles} />}
              {tab === 'characters' && <CharactersTab kanda={kanda} styles={styles} />}
              {tab === 'locations' && <LocationsTab kanda={kanda} styles={styles} />}
              {tab === 'weapons' && <WeaponsTab kanda={kanda} styles={styles} />}
              {tab === 'dialogues' && <DialoguesTab kanda={kanda} styles={styles} />}
              {tab === 'verses' && <VersesTab kanda={kanda} styles={styles} onOpenReading={onOpenReading ? () => onOpenReading(kanda.id) : undefined} />}
              {tab === 'gallery' && <GalleryTab items={displayGallery} styles={styles} onSelect={setGallery} />}
              {tab === 'facts' && <FactsTab kanda={kanda} styles={styles} />}
              {tab === 'references' && <ReferencesTab kanda={kanda} styles={styles} />}
            </div>
          </motion.div>

          {/* Gallery Lightbox */}
          <GalleryLightbox item={gallery} isLight={isLight} onClose={() => setGallery(null)} />
        </>
      )}
    </AnimatePresence>
  );
}
