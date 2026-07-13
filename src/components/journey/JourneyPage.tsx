// ============================================================
//  JourneyPage — Slim orchestrator.
//  All UI is composed from extracted components; all side-effect
//  logic lives in focused hooks. See:
//    layout/  timeline/  drawer/  special/  and  src/hooks/*
// ============================================================
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { timelineData } from '@/data';
import type { KandaSection, KandaId } from '@/data/types';

import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useProgress } from '@/hooks/useProgress';
import { useLenis } from '@/hooks/useLenis';
import { useKandaTracker } from '@/hooks/useKandaTracker';

import ThemeToggle from './layout/ThemeToggle';
import ScrollRing from './layout/ScrollRing';
import LeftKandaNav from './layout/LeftKandaNav';
import BottomDock, { JourneyView } from './layout/BottomDock';
import ResumePrompt from './layout/ResumePrompt';
import TimelineTrack from './timeline/TimelineTrack';
import KandaDrawer from './drawer/KandaDrawer';
import DynamicIslandPlayer from './DynamicIslandPlayer';

export default function JourneyPage() {
  const { theme, isLight, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const scrollProgress = useScrollProgress();
  const { savedProgress, showResumePrompt, saveProgress, clearProgress, dismissPrompt } = useProgress();

  const [activeKanda, setActiveKanda] = useState<KandaId>('bala');
  const [currentView, setCurrentView] = useState<JourneyView>('lifeline');
  const [activeMobileChapterIndex, setActiveMobileChapterIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState<KandaSection | null>(null);

  // Special-case (Ram Mandir) local UI state.
  const [isNightMode, setIsNightMode] = useState(true);
  const [lallaOutfit, setLallaOutfit] = useState('shringaar');

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const timelinePathRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback(() => setOpenDrawer(null), []);
  const handleKandaChange = useCallback((id: KandaId) => setActiveKanda(id), []);

  // ── Visible kandas for the current view / device ──────────
  const visibleKandas: KandaSection[] =
    currentView === 'lifeline'
      ? (isMobile ? [timelineData[activeMobileChapterIndex]] : timelineData.slice(0, 7))
      : [timelineData[7]];

  // ── Smooth scroll (desktop) + active-kanda / card tracking ─
  useLenis();
  useKandaTracker({
    kandas: visibleKandas,
    containerRef: mainContainerRef,
    onKandaChange: handleKandaChange,
    isMobile,
    glowLineRef,
    timelinePathRef,
  });

  // ── Autosave progress (skip while the resume prompt is up) ─
  useEffect(() => {
    if (showResumePrompt) return;
    saveProgress({ view: currentView, kandaId: activeKanda, mobileIndex: activeMobileChapterIndex });
  }, [currentView, activeKanda, activeMobileChapterIndex, showResumePrompt, saveProgress]);

  // ── Navigation ────────────────────────────────────────────
  const handleViewChange = useCallback((view: JourneyView) => {
    setCurrentView(view);
    setActiveKanda(view === 'mandir' ? 'ayodhya-mandir' : timelineData[activeMobileChapterIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeMobileChapterIndex]);

  const goToChapter = useCallback((index: number) => {
    setActiveMobileChapterIndex(index);
    setActiveKanda(timelineData[index].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResume = useCallback(() => {
    if (!savedProgress) return;
    setCurrentView(savedProgress.view === 'mandir' ? 'mandir' : 'lifeline');
    setActiveMobileChapterIndex(savedProgress.mobileIndex);
    setActiveKanda(savedProgress.kandaId);
    setTimeout(() => {
      const el = document.getElementById(`section-${savedProgress.kandaId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    dismissPrompt();
  }, [savedProgress, dismissPrompt]);

  return (
    <div
      ref={mainContainerRef}
      className={`relative min-h-screen py-20 px-4 md:px-8 select-text overflow-hidden transition-all duration-1000 ${
        isLight ? 'light-theme text-[#2b251f]' : 'text-[#f4e8d3]'
      }`}
      style={{
        backgroundAttachment: 'fixed',
        backgroundImage: isLight
          ? 'linear-gradient(to bottom, rgba(255, 250, 245, 0.35) 0%, rgba(242, 232, 220, 0.6) 100%), radial-gradient(circle at 50% 50%, rgba(194, 154, 74, 0.15) 0%, rgba(242, 232, 220, 0.6) 100%), url(/assets/background.png)'
          : 'linear-gradient(to bottom, rgba(16, 12, 8, 0.35) 0%, rgba(10, 8, 6, 0.75) 100%), radial-gradient(circle at 50% 50%, rgba(217, 164, 65, 0.28) 0%, rgba(10, 8, 6, 0.85) 100%), url(/assets/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: isLight ? '#faf7f2' : '#0a0907',
      }}
    >
      {/* Background grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(${isLight ? '43,37,31,0.015' : '244,232,211,0.02'})_1px,transparent_1px),linear-gradient(to_bottom,rgba(${isLight ? '43,37,31,0.015' : '244,232,211,0.02'})_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none`} />

      {/* Left Nav — Kanda tracker (desktop, lifeline only) */}
      {currentView === 'lifeline' && (
        <LeftKandaNav kandas={timelineData.slice(0, 7)} activeKanda={activeKanda} isLight={isLight} />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto lg:pl-64 xl:pl-72 flex flex-col items-center">
        {/* Editorial Heading */}
        <div className="text-center mb-20 flex flex-col items-center gap-4 relative z-10">
          <span className="font-devanagari text-[#ff7900] text-sm tracking-[0.3em] uppercase font-bold drop-shadow-[0_2px_8px_rgba(255,121,0,0.35)]">
            {currentView === 'lifeline' ? 'श्रीमद् रामायणम्' : 'श्रीराम जन्मभूमि'}
          </span>
          <h1 className={`font-display text-[2.2rem] md:text-[4rem] ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'} tracking-[0.05em] uppercase leading-none drop-shadow-[0_2px_20px_rgba(217,164,65,0.45)]`}>
            {currentView === 'lifeline' ? 'The Eternal Path' : 'Divine Homecoming'}
          </h1>
          <p className={`font-body text-xs md:text-sm ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/50'} max-w-[450px] uppercase tracking-[0.2em] leading-relaxed px-4`}>
            {currentView === 'lifeline'
              ? (isMobile ? "Follow Lord Ram's journey of absolute Dharma — stage by stage" : "Scroll to follow Lord Ram's journey of absolute Dharma — all Seven Kandas")
              : "Explore the architectural marvel, sacred ghats, and child-deity of modern Ayodhya"
            }
          </p>
          <div className="w-[100px] h-[1px] bg-gradient-to-r from-transparent via-[#ff5e00]/50 to-transparent mt-4" />
        </div>

        {/* Timeline Track */}
        <TimelineTrack
          visibleKandas={visibleKandas}
          isLight={isLight}
          isMobile={isMobile}
          currentView={currentView}
          activeMobileChapterIndex={activeMobileChapterIndex}
          openDrawerId={openDrawer?.id ?? null}
          onOpenDrawer={setOpenDrawer}
          onGoToChapter={goToChapter}
          onEnterMandir={() => handleViewChange('mandir')}
          timelinePathRef={timelinePathRef}
          glowLineRef={glowLineRef}
          isNightMode={isNightMode}
          setIsNightMode={setIsNightMode}
          lallaOutfit={lallaOutfit}
          setLallaOutfit={setLallaOutfit}
        />
      </div>

      {/* Fixed UI */}
      <ThemeToggle isLight={isLight} onToggle={toggleTheme} />
      <BottomDock currentView={currentView} onViewChange={handleViewChange} isLight={isLight} />
      <KandaDrawer kanda={openDrawer} onClose={closeDrawer} theme={theme} />
      <DynamicIslandPlayer />
      <ResumePrompt
        show={showResumePrompt}
        savedProgress={savedProgress}
        isLight={isLight}
        onStartFresh={clearProgress}
        onResume={handleResume}
      />
      {isMobile && <ScrollRing isLight={isLight} progress={scrollProgress} />}
    </div>
  );
}
