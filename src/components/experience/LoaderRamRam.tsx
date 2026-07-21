'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '@/app/store';
import gsap from 'gsap';

interface Asset {
  url: string;
  type: 'image' | 'video' | 'audio';
  weight: number;
}

const CRITICAL_ASSETS: Asset[] = [
  { url: '/assets/logo.jpg', type: 'image', weight: 20 },
  { url: '/assets/background.jpg', type: 'image', weight: 20 },
  { url: '/audio/initial.mp3', type: 'audio', weight: 20 },
  { url: '/video/intro-space.mp4', type: 'video', weight: 20 },
  { url: '/video/intro-cinematic.mp4', type: 'video', weight: 20 },
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
  const [displayProgress, setDisplayProgress] = useState(0);
  const [preloadComplete, setPreloadComplete] = useState(false);
  const [textSequenceComplete, setTextSequenceComplete] = useState(false);

  const targetProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // 1. Text Sequence Timeline
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTextSequenceComplete(true);
      }
    });

    GREETINGS.forEach((_, index) => {
      tl.fromTo(`.greeting-word-${index}`,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.25, ease: 'power3.out' }
      )
      .to(`.greeting-word-${index}`,
        { yPercent: -100, opacity: 0, duration: 0.2, ease: 'power3.in' },
        '+=0.18' // brisk, elegant greeting hold
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  // 2. Smooth Progress Interpolation RAF
  useEffect(() => {
    let currentPct = 0;

    const animateProgress = () => {
      const target = targetProgressRef.current;
      if (currentPct < target) {
        currentPct = Math.min(currentPct + Math.max(1, (target - currentPct) * 0.15), target);
        setDisplayProgress(Math.round(currentPct));
      }
      if (currentPct < 100) {
        animFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setDisplayProgress(100);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateProgress);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 3. Reliable Asset Preloading (No Video Streaming Stalls)
  useEffect(() => {
    let completedWeight = 0;
    const totalWeight = CRITICAL_ASSETS.reduce((sum, a) => sum + a.weight, 0);

    const markAssetDone = (weight: number) => {
      completedWeight += weight;
      const pct = Math.min(Math.round((completedWeight / totalWeight) * 100), 100);
      if (pct > targetProgressRef.current) {
        targetProgressRef.current = pct;
      }
    };

    const loadSingleAsset = (asset: Asset): Promise<void> => {
      return new Promise((resolve) => {
        if (asset.type === 'image') {
          const img = new Image();
          img.onload = () => { markAssetDone(asset.weight); resolve(); };
          img.onerror = () => { markAssetDone(asset.weight); resolve(); };
          img.src = asset.url;
        } else if (asset.type === 'audio') {
          const audio = new Audio();
          audio.oncanplaythrough = () => { markAssetDone(asset.weight); resolve(); };
          audio.onerror = () => { markAssetDone(asset.weight); resolve(); };
          audio.src = asset.url;
          // Fallback timeout for audio
          setTimeout(() => { markAssetDone(asset.weight); resolve(); }, 1200);
        } else {
          // Video asset: use lightweight HEAD/fetch or video metadata check
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.onloadedmetadata = () => { markAssetDone(asset.weight); resolve(); };
          video.onerror = () => { markAssetDone(asset.weight); resolve(); };
          video.src = asset.url;
          // Fallback timeout for video preload so it NEVER hangs
          setTimeout(() => { markAssetDone(asset.weight); resolve(); }, 1500);
        }
      });
    };

    const preloadAll = Promise.all(CRITICAL_ASSETS.map(loadSingleAsset));
    const minTimer = new Promise(resolve => setTimeout(resolve, 2000));

    Promise.all([preloadAll, minTimer]).then(() => {
      targetProgressRef.current = 100;
      setTimeout(() => {
        setPreloadComplete(true);
      }, 400);
    });
  }, []);

  // 4. Smooth Exit Reveal Transition
  useEffect(() => {
    if (textSequenceComplete && preloadComplete) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setReady(true);
        }
      });

      // Slide loader up with cubic power curve
      exitTl.to('.loader-container', {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut'
      });

      // Flatten bottom SVG curve
      exitTl.to('.loader-curve-path', {
        attr: { d: 'M 0 0 L 100 0 Q 50 0 0 0 Z' },
        duration: 0.9,
        ease: 'power3.inOut'
      }, '<');
    }
  }, [textSequenceComplete, preloadComplete, setReady]);

  return (
    <div className="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#ff5e00] select-none overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 modern-grid opacity-10 pointer-events-none" />
      
      {/* Structural visual border */}
      <div className="absolute inset-6 border border-white/10 pointer-events-none z-10" />

      {/* Main Greetings Animation Viewport */}
      <div className="relative h-[80px] md:h-[120px] w-full overflow-hidden flex items-center justify-center z-20">
        {GREETINGS.map((g, i) => (
          <div
            key={i}
            className={`greeting-word-${i} absolute flex items-center justify-center gap-3 md:gap-5 text-[2.2rem] md:text-[5rem] font-bold text-[#f4e8d3]`}
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <span className="w-3 h-3 md:w-4 md:h-4 bg-[#f4e8d3] rounded-full flex-shrink-0" />
            <span className={g.lang === 'hi' || g.lang === 'sa' ? 'font-devanagari font-normal' : 'font-display font-bold'}>
              {g.text}
            </span>
          </div>
        ))}
      </div>

      {/* Minimal Progress Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none z-20 opacity-80">
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f4e8d3] transition-all duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <span className="font-body text-xs tracking-[0.25em] uppercase text-[#f4e8d3] font-semibold">
          Loading {displayProgress}%
        </span>
      </div>

      {/* Curved SVG bottom for slide-up reveal */}
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

