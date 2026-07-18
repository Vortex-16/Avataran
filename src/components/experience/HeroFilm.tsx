'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@/app/store';
import gsap from 'gsap';

export default function HeroFilm() {
  const { isReady, heroComplete, setHeroComplete, reducedMotion, soundConsentGiven, soundEnabled } = useStore();
  const [currentVideo, setCurrentVideo] = useState<1 | 2>(1);
  const [video1Playable, setVideo1Playable] = useState(false);
  const [video2Playable, setVideo2Playable] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Handle play/pause based on visibility and tab active status
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isHidden = document.hidden;
      if (isHidden) {
        video1Ref.current?.pause();
        video2Ref.current?.pause();
      } else if (!heroComplete && isReady) {
        if (currentVideo === 1) {
          video1Ref.current?.play().catch(() => {});
        } else {
          video2Ref.current?.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentVideo, heroComplete, isReady]);

  // 2. Playback lifecycle of Video 1 and Video 2
  useEffect(() => {
    if (!isReady || heroComplete) return;

    if (reducedMotion) {
      // If prefers-reduced-motion, show poster & reveal CTA immediately
      setShowOverlay(true);
      return;
    }

    if (currentVideo === 1) {
      const v1 = video1Ref.current;
      if (v1) {
        v1.play()
          .then(() => {
            // Fade in overlay after a short delay during first video
            setTimeout(() => setShowOverlay(true), 2500);
          })
          .catch((err) => {
            console.warn('Autoplay blocked or failed for Video 1:', err);
            setShowOverlay(true);
          });
      }
    } else {
      const v2 = video2Ref.current;
      if (v2) {
        // Crossfade animation
        gsap.to(video1Ref.current, { opacity: 0, duration: 0.8, ease: 'power1.inOut' });
        gsap.to(v2, { opacity: 1, duration: 0.8, ease: 'power1.inOut' });
        v2.play().catch((err) => {
          console.warn('Playback failed for Video 2:', err);
        });
      }
    }
  }, [isReady, currentVideo, heroComplete, reducedMotion]);

  // Safety fallback: ensure overlay is displayed after 3 seconds in all circumstances
  useEffect(() => {
    if (!isReady || heroComplete) return;
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isReady, heroComplete]);

  // 3. Handle when the user triggers "Begin the Journey" or Skip
  const handleBeginJourney = () => {
    console.log('Begin the Journey clicked! heroComplete state:', heroComplete);
    if (heroComplete) return;
    
    try {
      localStorage.setItem('avataran-visited', 'true');
    } catch (e) {
      // noop
    }
    
    // Crossfade container out to reveal WebGL
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          console.log('Hero transition animation completed. Setting heroComplete to true.');
          setHeroComplete(true);
          video1Ref.current?.pause();
          video2Ref.current?.pause();
        },
      });
    } else {
      console.log('Container ref missing. Setting heroComplete to true immediately.');
      setHeroComplete(true);
    }
  };

  const handleVideo1Ended = () => {
    setCurrentVideo(2);
  };

  const handleVideo2Ended = () => {
    // Hold/loop on the last video or just let it loop
    if (video2Ref.current) {
      video2Ref.current.loop = true;
      video2Ref.current.play().catch(() => {});
    }
  };

  if (heroComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-30 bg-[#0a0907] flex flex-col justify-center items-center select-none"
    >
      {/* Background Poster: displayed instantly */}
      <img
        src="/assets/background.png"
        alt="Hero Background Poster"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          video1Playable && !reducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Fullscreen Video Stems */}
      {!reducedMotion && (
        <>
          <video
            ref={video1Ref}
            src="/video/intro-space.mp4"
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideo1Playable(true)}
            onEnded={handleVideo1Ended}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500"
            style={{ opacity: currentVideo === 1 ? 1 : 0 }}
          />
          <video
            ref={video2Ref}
            src="/video/intro-cinematic.mp4"
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideo2Playable(true)}
            onEnded={handleVideo2Ended}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500"
            style={{ opacity: currentVideo === 2 ? 1 : 0 }}
          />
        </>
      )}

      {/* Cinematic Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-transparent to-[#0a0907] opacity-60 z-20 pointer-events-none" />

      {/* Typographic narrative overlay */}
      <div 
        className={`relative z-30 pointer-events-auto flex flex-col items-center justify-center gap-6 px-6 text-center transition-all duration-1000 ${
          showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-2">
          <span className="font-devanagari text-[2rem] tracking-widest text-[#d9a441] opacity-90">
            रामायण
          </span>
          <h1 className="font-display text-[4rem] md:text-[5.5rem] leading-none text-[#f4e8d3] tracking-[0.05em] uppercase">
            RAMAYANA
          </h1>
          <p className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-[#f4e8d3]/70">
            The Eternal Journey of Dharma
          </p>
        </div>

        <button 
          onClick={handleBeginJourney}
          className="avataran-button avataran-button--primary mt-6 text-sm font-semibold uppercase tracking-wider pointer-events-auto cursor-pointer"
        >
          Begin the Journey
        </button>
      </div>

      {/* Skip Intro button */}
      {showOverlay && (
        <button
          onClick={handleBeginJourney}
          className="absolute bottom-8 right-8 z-30 font-body text-xs uppercase tracking-widest text-[#f4e8d3] opacity-40 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-1 focus:ring-[#d9a441] px-3 py-1 rounded pointer-events-auto cursor-pointer"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
