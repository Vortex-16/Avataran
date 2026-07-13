'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/store';
import gsap from 'gsap';

interface Asset {
  url: string;
  type: 'image' | 'video' | 'audio' | 'font';
  weight: number; // Estimated weight in bytes for progress calculation
}

const CRITICAL_ASSETS: Asset[] = [
  { url: '/assets/logo.png', type: 'image', weight: 2014989 },
  { url: '/assets/background.png', type: 'image', weight: 1968028 },
  { url: '/video/intro-space.mp4', type: 'video', weight: 2681875 },
  { url: '/video/intro-cinematic.mp4', type: 'video', weight: 2840286 },
  { url: '/audio/initial.mp3', type: 'audio', weight: 232313 },
];

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "सुस्वागतम्", lang: "sa" },
  { text: "Welcome", lang: "en" },
  { text: "नमस्कार", lang: "mr" },
  { text: "வணக்கம்", lang: "ta" },
  { text: "నమస్కారం", lang: "te" },
  { text: "Swagatam", lang: "sa" },
  { text: "जय श्री राम", lang: "hi" }
];

export default function LoaderRamRam() {
  const { setReady } = useStore();
  const [progress, setProgress] = useState(0);
  const [preloadComplete, setPreloadComplete] = useState(false);
  const [textSequenceComplete, setTextSequenceComplete] = useState(false);

  // 1. Text Sequence Timeline
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTextSequenceComplete(true);
      }
    });

    GREETINGS.forEach((_, index) => {
      // Fade & slide in, hold, then slide & fade out
      tl.fromTo(`.greeting-word-${index}`,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
      )
      .to(`.greeting-word-${index}`,
        { yPercent: -120, opacity: 0, duration: 0.25, ease: 'power3.in' },
        '+=0.35' // hold duration
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  // 2. Asset Preloading
  useEffect(() => {
    let totalExpectedBytes = CRITICAL_ASSETS.reduce((sum, asset) => sum + asset.weight, 0);
    let loadedBytesMap = new Map<string, number>();

    const updateOverallProgress = () => {
      let currentLoaded = 0;
      loadedBytesMap.forEach((bytes) => {
        currentLoaded += bytes;
      });
      const pct = Math.min(Math.round((currentLoaded / totalExpectedBytes) * 100), 100);
      setProgress(pct);
    };

    const preloadAsset = async (asset: Asset) => {
      try {
        const response = await fetch(asset.url);
        if (!response.body) {
          loadedBytesMap.set(asset.url, asset.weight);
          updateOverallProgress();
          return;
        }

        const reader = response.body.getReader();
        let bytesRead = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            bytesRead += value.length;
            loadedBytesMap.set(asset.url, bytesRead);
            updateOverallProgress();
          }
        }
      } catch (err) {
        console.warn(`Failed to preload asset: ${asset.url}`, err);
        loadedBytesMap.set(asset.url, asset.weight);
        updateOverallProgress();
      }
    };

    const preloadPromise = Promise.all(CRITICAL_ASSETS.map((asset) => preloadAsset(asset)));
    // Minimal display time of 3 seconds to guarantee a premium intro experience
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 3000));

    Promise.all([preloadPromise, minTimePromise]).then(() => {
      setPreloadComplete(true);
    });
  }, []);

  // 3. Exit transition when both are complete
  useEffect(() => {
    if (textSequenceComplete && preloadComplete) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setReady(true);
        }
      });

      // Animate loader sliding up
      exitTl.to('.loader-container', {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut'
      });

      // Morph the SVG path bottom edge to flatten out
      exitTl.to('.loader-curve-path', {
        attr: { d: 'M 0 0 L 100 0 Q 50 0 0 0 Z' },
        duration: 1.2,
        ease: 'power4.inOut'
      }, '<');
    }
  }, [textSequenceComplete, preloadComplete, setReady]);

  return (
    <div className="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#ff5e00] select-none overflow-hidden">
      {/* Premium background grid lines */}
      <div className="absolute inset-0 modern-grid opacity-10 pointer-events-none" />
      
      {/* Structural visual border */}
      <div className="absolute inset-6 border border-white/[0.08] pointer-events-none z-10" />

      {/* Main Greetings Animation Viewport */}
      <div className="relative h-[80px] md:h-[120px] w-full overflow-hidden flex items-center justify-center z-20">
        {GREETINGS.map((g, i) => (
          <div
            key={i}
            className={`greeting-word-${i} absolute flex items-center justify-center gap-3 md:gap-5 text-[2.5rem] md:text-[5.5rem] font-bold text-[#f4e8d3]`}
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <span className="w-3 h-3 md:w-4 md:h-4 bg-[#f4e8d3] rounded-full flex-shrink-0" />
            <span className={g.lang === 'hi' || g.lang === 'sa' ? 'font-devanagari font-normal' : 'font-display font-bold'}>
              {g.text}
            </span>
          </div>
        ))}
      </div>

      {/* Minimal Progress Indicator at Bottom */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none z-20 opacity-50">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#f4e8d3]">
          Loading {progress}%
        </span>
      </div>

      {/* Curved SVG bottom for high-end slide-up reveal */}
      <svg 
        className="absolute top-[99.5%] left-0 w-full h-[25vh] fill-[#ff5e00] pointer-events-none z-50" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path 
          className="loader-curve-path" 
          d="M 0 0 L 100 0 Q 50 100 0 0 Z" 
        />
      </svg>

      {/* Local Styles */}
      <style jsx>{`
        .modern-grid {
          background-image: 
            linear-gradient(rgba(244, 232, 211, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 232, 211, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
      `}</style>
    </div>
  );
}
