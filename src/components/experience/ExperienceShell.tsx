'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/app/store';
import LoaderRamRam from '@/components/experience/LoaderRamRam';
import HeroFilm from '@/components/experience/HeroFilm';
import AudioDirector from '@/components/experience/AudioDirector';
import JourneyPage from '@/components/journey/JourneyPage';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ExperienceShell() {
  const { isReady, heroComplete, setReducedMotion, setHeroComplete, setUser } = useStore();

  // Listen to Auth State Changes (static import prevents HMR chunk 404s in dev)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  // Skip intro film on return visits
  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem('avataran-visited');
      if (hasVisited === 'true') {
        setHeroComplete(true);
      }
    } catch (e) {
      // noop
    }
  }, [setHeroComplete]);

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

        {/* 5. Dev-Only Storage Clear Utility (Automatically stripped from production builds) */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }
            }}
            className="fixed bottom-4 left-4 z-[999] px-3 py-1.5 rounded-full bg-[#ff5e00] text-white font-body text-[10px] font-bold shadow-lg hover:bg-[#ff7900] transition-all border border-white/20 pointer-events-auto cursor-pointer flex items-center gap-1.5"
            title="Development Mode Only: Clear LocalStorage & SessionStorage"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear Storage (Dev Only)</span>
          </button>
        )}
      </div>
    </main>
  );
}
