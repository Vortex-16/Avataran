// ============================================================
//  TimelineTrack — Vertical timeline container
//  Renders the glow line + each visible kanda section
//  (banner, event cards, mobile chapter navigation).
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React, { RefObject } from 'react';
import type { KandaSection, TimelineEvent } from '@/data/types';
import KandaBanner from './KandaBanner';
import EventCard from './EventCard';
import { useT } from '@/hooks/useT';

interface TimelineTrackProps {
  visibleKandas: KandaSection[];
  isLight: boolean;
  isMobile: boolean;
  currentView: 'lifeline' | 'mandir';
  activeMobileChapterIndex: number;
  openDrawerId: string | null;
  onOpenDrawer: (kanda: KandaSection) => void;
  /** Jump to a given lifeline chapter index (mobile prev/next). */
  onGoToChapter: (index: number) => void;
  /** Advance from the final chapter into the Ram Mandir view. */
  onEnterMandir: () => void;
  timelinePathRef: RefObject<HTMLDivElement>;
  glowLineRef: RefObject<HTMLDivElement>;
  // Special-case state threaded to EventCard
  isNightMode: boolean;
  setIsNightMode: (night: boolean) => void;
  lallaOutfit: string;
  setLallaOutfit: (outfit: string) => void;
}

export default function TimelineTrack({
  visibleKandas,
  isLight,
  isMobile,
  currentView,
  activeMobileChapterIndex,
  openDrawerId,
  onOpenDrawer,
  onGoToChapter,
  onEnterMandir,
  timelinePathRef,
  glowLineRef,
  isNightMode,
  setIsNightMode,
  lallaOutfit,
  setLallaOutfit,
}: TimelineTrackProps) {
  const { t } = useT();
  return (
    <div ref={timelinePathRef} className="relative w-full flex flex-col gap-32">
      {/* Vertical path line */}
      <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] ${isLight ? 'bg-black/[0.08]' : 'bg-white/[0.08]'} pointer-events-none z-0 ${isMobile ? 'hidden' : 'block'}`}>
        <div
          ref={glowLineRef}
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#d05c43] via-[#e9c46a] to-[#d05c43] origin-top will-change-transform"
          style={{ boxShadow: '0 0 20px rgba(233,196,106,0.6), 0 0 35px rgba(208,92,67,0.3)' }}
        />
      </div>

      {/* Sections */}
      {visibleKandas.map((kanda: KandaSection) => (
        <section
          key={kanda.id}
          id={`section-${kanda.id}`}
          className="kanda-section relative w-full flex flex-col gap-16 z-10"
          data-kanda-id={kanda.id}
        >
          {/* Kanda Banner (click to open drawer) */}
          <KandaBanner
            kanda={kanda}
            isLight={isLight}
            isOpen={openDrawerId === kanda.id}
            onClick={() => onOpenDrawer(kanda)}
          />

          {/* Event Cards */}
          <div className="flex flex-col gap-20">
            {kanda.events.map((event: TimelineEvent, idx: number) => (
              <EventCard
                key={event.id}
                event={event}
                kanda={kanda}
                idx={idx}
                isLight={isLight}
                isMobile={isMobile}
                onOpenDrawer={onOpenDrawer}
                isNightMode={isNightMode}
                setIsNightMode={setIsNightMode}
                lallaOutfit={lallaOutfit}
                setLallaOutfit={setLallaOutfit}
              />
            ))}
          </div>

          {/* Mobile Interactive Navigation Controls */}
          {isMobile && currentView === 'lifeline' && (
            <div className="w-full flex flex-col items-center gap-4 mt-12 pb-8">
              {/* Progress Indicator */}
              <div className={`text-[10px] font-body uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                isLight ? 'bg-black/[0.03] text-black/60' : 'bg-white/[0.03] text-[#f4e8d3]/60'
              }`}>
                {t('chapter.of', { n: activeMobileChapterIndex + 1 })}: <span className="font-bold text-[#ff7900]">{kanda.title}</span>
              </div>

              <div className="flex w-full gap-3 justify-center max-w-[420px]">
                {/* Back Button */}
                {activeMobileChapterIndex > 0 && (
                  <button
                    onClick={() => onGoToChapter(activeMobileChapterIndex - 1)}
                    className={`flex-1 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isLight
                        ? 'bg-black/[0.015] border-black/10 text-black hover:bg-black/[0.04]'
                        : 'bg-white/[0.015] border-white/10 text-[#f4e8d3] hover:bg-white/[0.04]'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>{t('chapter.back')}</span>
                  </button>
                )}

                {/* Next Button */}
                <button
                  onClick={() => {
                    if (activeMobileChapterIndex < 6) {
                      onGoToChapter(activeMobileChapterIndex + 1);
                    } else {
                      onEnterMandir();
                    }
                  }}
                  className="flex-1 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#ff5e00] to-[#ff7900] border-0 hover:shadow-[0_0_20px_rgba(255,94,0,0.4)]"
                  style={{ boxShadow: '0 4px 15px rgba(255,94,0,0.25)' }}
                >
                  <span>{activeMobileChapterIndex < 6 ? t('chapter.next') : t('chapter.enterMandir')}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
