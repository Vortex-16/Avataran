'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/app/store';
import { useT } from '@/hooks/useT';

interface ReelItem {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
  shloka?: string;
  translation?: string;
  accentHex: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: 'intro-cosmic',
    videoUrl: '/video/intro-space.mp4',
    title: 'The Cosmic Genesis',
    description: 'Lord Vishnu manifests on Earth to restore cosmic order and establish eternal Dharma.',
    shloka: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    translation: 'Whenever righteousness declines and unrighteousness prevails, I manifest Myself to protect the good and establish Dharma.',
    accentHex: '#d05c43',
  },
  {
    id: 'intro-cinematic',
    videoUrl: '/video/intro-cinematic.mp4',
    title: 'The Eternal Tale',
    description: 'Experience the premium digital monument of the Valmiki Ramayana, recounting the heroic journeys of Lord Ram.',
    shloka: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।',
    translation: 'Ram is the embodiment of righteousness (Dharma), a saintly figure of truth and unwavering valor.',
    accentHex: '#ff7900',
  },
];

interface ReelsFeedModalProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
}

export default function ReelsFeedModal({ open, isLight, onClose }: ReelsFeedModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const height = containerRef.current.clientHeight;
    const index = Math.round(scrollTop / height);
    if (index !== activeIndex && index >= 0 && index < REELS_DATA.length) {
      setActiveIndex(index);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center select-none"
      >
        {/* Desktop Container Framing (aspect-ratio 9:16 layout for desktop, full-screen on mobile) */}
        <div className="relative w-full h-[100dvh] max-w-md md:h-[90vh] md:aspect-[9/16] md:rounded-3xl md:overflow-hidden md:border border-white/10 md:shadow-2xl bg-black">
          
          {/* Scroll snap container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="reels-scroll-container w-full h-full overflow-y-scroll scroll-smooth scroll-snap-y mandatory no-scrollbar"
            style={{
              scrollSnapType: 'y mandatory',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {REELS_DATA.map((item, idx) => (
              <div
                key={item.id}
                className="w-full h-full relative scroll-snap-align-start flex items-center justify-center"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ReelCard
                  item={item}
                  isActive={idx === activeIndex}
                  isLight={isLight}
                  onClose={onClose}
                />
              </div>
            ))}
          </div>

          {/* Close button in top-left */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 z-[90] w-9 h-9 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
            aria-label="Close reels"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface ReelCardProps {
  item: ReelItem;
  isActive: boolean;
  isLight: boolean;
  onClose: () => void;
}

function ReelCard({ item, isActive, isLight, onClose }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useT();
  const soundEnabled = useStore((s) => s.soundEnabled);
  const setSoundEnabled = useStore((s) => s.setSoundEnabled);
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const bookmarks = useStore((s) => s.bookmarks);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const isBookmarked = bookmarks.some((b) => b.refId === item.id);

  // Playback control
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isActive) {
      v.currentTime = 0;
      v.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Reel play failed or was blocked:', err);
          setIsPlaying(false);
        });
    } else {
      v.pause();
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isActive]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const v = videoRef.current;
      setProgress((v.currentTime / v.duration) * 100);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleShare = async () => {
    const text = `${item.title}\n\n${item.shloka || ''}\n${item.translation || ''}\n\nvia AVATARAN`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: text,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch {
        // Share cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Clipboard failed
      }
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black select-none">
      
      {/* Video element */}
      <video
        ref={videoRef}
        src={item.videoUrl}
        loop
        playsInline
        webkit-playsinline="true"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer z-10"
        style={{ filter: 'brightness(0.7) saturate(1.05)' }}
      />

      {/* Play/Pause overlay feedback */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 backdrop-blur-md scale-95 hover:scale-100 transition-all duration-300">
            <svg className="w-8 h-8 translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-20" />

      {/* Left Details Panel */}
      <div className="absolute bottom-6 left-6 right-16 z-30 flex flex-col gap-3.5 pointer-events-none text-left">
        <div className="flex flex-col gap-1">
          <span className="font-devanagari text-[9px] uppercase tracking-[0.25em] font-bold" style={{ color: item.accentHex }}>
            मङ्गलाचरणम् • CINEMATIC REEL
          </span>
          <h3 className="font-display text-lg uppercase tracking-wide text-white font-bold leading-tight">
            {item.title}
          </h3>
          <p className="font-body text-[10px] text-white/60 leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.shloka && (
          <div className="flex flex-col gap-1.5 border-l-2 pl-3 border-white/25 mt-1">
            <p className="font-devanagari text-[11px] text-[#ff7900] leading-snug drop-shadow-md">
              {item.shloka}
            </p>
            {item.translation && (
              <p className="font-body text-[9px] text-[#f4e8d3]/85 italic leading-relaxed">
                {item.translation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right HUD Controls (Sidebar Actions) */}
      <div className="absolute bottom-12 right-4 z-30 flex flex-col gap-5 items-center">
        
        {/* Like/Bookmark Button */}
        <button
          onClick={() => toggleBookmark({ type: 'verse', kandaId: 'bala', refId: item.id })}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 ${
            isBookmarked 
              ? 'bg-[#ff5e00]/20 border-[#ff5e00] text-[#ff5e00] shadow-[0_0_15px_rgba(255,94,0,0.25)]' 
              : 'bg-black/40 border-white/10 text-white/70 hover:text-white hover:border-white/30'
          }`}
          aria-label="Bookmark reel"
        >
          <svg className="w-4.5 h-4.5" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:border-white/30 flex items-center justify-center backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Share reel"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l4.755-2.853a2.25 2.25 0 110.377 0.63l-4.756 2.853a2.25 2.25 0 11-.377.362l4.757 2.854a2.25 2.25 0 11-.377.63l-4.757-2.853a2.25 2.25 0 110-2.186z" />
          </svg>
        </button>

        {/* Sound/Mute Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`w-10 h-10 rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:border-white/30 flex items-center justify-center backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer`}
          aria-label={soundEnabled ? "Mute" : "Unmute"}
        >
          {soundEnabled ? (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress Track at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-1 z-30 bg-white/10 pointer-events-none">
        <div 
          className="h-full bg-[#ff7900] transition-all duration-100 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
