'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/app/store';
import LoaderRamRam from '@/components/experience/LoaderRamRam';
import HeroFilm from '@/components/experience/HeroFilm';
import AudioDirector from '@/components/experience/AudioDirector';
import JourneyPage from '@/components/journey/JourneyPage';

export default function ExperienceShell() {
  const { isReady, heroComplete, setReducedMotion } = useStore();

  useEffect(() => {
    // Reduced Motion System Check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, [setReducedMotion]);

  return (
    <main id="main-content" className="relative min-h-screen">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      {/* Global SVG Liquid Warp Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="liquid-hover">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="relative w-full min-h-screen text-[#f4e8d3] overflow-hidden select-none bg-[#0a0907]">
        {/* 1. Global Audio Director & Consent */}
        <AudioDirector />

        {/* 2. Global Preloader */}
        {!isReady && <LoaderRamRam />}

        {/* 3. Cinematic Video Handoff */}
        {isReady && !heroComplete && <HeroFilm />}

        {/* 4. Fresh Immersive Journey Section */}
        {heroComplete && <JourneyPage />}
      </div>
    </main>
  );
}
