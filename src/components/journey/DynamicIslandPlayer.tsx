'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/app/store';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

const TRACKS: Track[] = [
  {
    id: 'hero',
    title: 'Shri Ram Theme',
    subtitle: 'Flute & Ambient Sitar',
    url: '/audio/initial.mp3',
  },
  {
    id: 'katha',
    title: 'Ramayana Recital',
    subtitle: 'Hum Katha Sunate',
    url: '/audio/Hum Katha Sunate Ram Sakal Gun Dhaam Ki - SouthMelody.mp3',
  },
  {
    id: 'chronicle',
    title: 'Ayodhya Chronicle',
    subtitle: 'Sanskrit Narration & Bells',
    url: '/audio/narration-ayodhya.mp3',
  },
];

export default function DynamicIslandPlayer() {
  const { 
    activeMusicTrack, 
    setActiveMusicTrack, 
    soundEnabled, 
    setSoundEnabled,
    isDynamicIslandOpen,
    setIsDynamicIslandOpen
  } = useStore();

  const [showTracklist, setShowTracklist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dynamic island when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDynamicIslandOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsDynamicIslandOpen]);

  // Sync with actual Audio Element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cleanupListeners: (() => void) | undefined;

    const findAndBindAudio = () => {
      const audio = (window as any).avataran_music_audio as HTMLAudioElement | undefined;
      if (audio) {
        const handleTimeUpdate = () => {
          setCurrentTime(audio.currentTime);
        };
        const handleDurationChange = () => {
          setDuration(audio.duration || 0);
        };

        // Initialize values
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('loadedmetadata', handleDurationChange);

        cleanupListeners = () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('durationchange', handleDurationChange);
          audio.removeEventListener('loadedmetadata', handleDurationChange);
        };
        return true;
      }
      return false;
    };

    // Try finding the audio immediately
    const found = findAndBindAudio();
    
    // If not loaded yet, poll periodically
    let interval: NodeJS.Timeout | undefined;
    if (!found) {
      interval = setInterval(() => {
        if (findAndBindAudio()) {
          if (interval) clearInterval(interval);
        }
      }, 250);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (cleanupListeners) cleanupListeners();
    };
  }, [isDynamicIslandOpen]);

  if (!isDynamicIslandOpen) return null;

  const activeTrack = TRACKS.find(t => t.url === activeMusicTrack) || TRACKS[0];

  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleNextTrack = () => {
    const currentIndex = TRACKS.findIndex(t => t.url === activeMusicTrack);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    setActiveMusicTrack(TRACKS[nextIndex].url);
  };

  const handlePrevTrack = () => {
    const currentIndex = TRACKS.findIndex(t => t.url === activeMusicTrack);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    setActiveMusicTrack(TRACKS[prevIndex].url);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    const audio = (window as any).avataran_music_audio as HTMLAudioElement | undefined;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const pct = Math.min(Math.max(clickX / width, 0), 1);
    const newTime = pct * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div
      ref={containerRef}
      className="lg:hidden fixed top-5 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 26,
        }}
        className="relative overflow-hidden w-[310px] bg-white/[0.12] dark:bg-white/[0.08] backdrop-blur-3xl border border-white/25 rounded-[28px] shadow-[0_25px_50px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col p-4 select-none"
        style={{
          height: showTracklist ? 330 : 210,
          transition: 'height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      >
        {/* Specular Liquid Glass Top Rim Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* 1. Track Info Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Album Cover Art */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#ff5e00]/50 to-[#d9a441]/50 border border-[#d9a441]/30 flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_100%)]" />
              <svg className="w-6 h-6 text-[#f4e8d3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            
            {/* Text Details */}
            <div className="text-left max-w-[150px]">
              <h4 className="font-display text-[11px] uppercase tracking-wider text-[#f4e8d3] font-bold truncate">
                {activeTrack.title}
              </h4>
              <p className="font-body text-[8px] text-[#f4e8d3]/60 truncate">
                {activeTrack.subtitle}
              </p>
            </div>
          </div>

          {/* Equalizer Visualizer */}
          <div className="flex items-end gap-0.5 h-4.5 shrink-0 px-2">
            {soundEnabled ? (
              [14, 8, 16, 11, 15, 9].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-[#d9a441] rounded-full animate-pulse"
                  style={{
                    height: `${h}px`,
                    animationDuration: `${0.6 + i * 0.1}s`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))
            ) : (
              [4, 4, 4, 4, 4, 4].map((h, i) => (
                <span key={i} className="w-[2px] h-[3px] bg-white/30 rounded-full" />
              ))
            )}
          </div>
        </div>

        {/* 2. Progress Slider Track (Clickable & Scrubbable) */}
        <div className="mt-4.5 flex flex-col gap-1 px-1">
          <div 
            onClick={handleProgressClick}
            className="relative w-full h-2 flex items-center bg-white/20 rounded-full cursor-pointer group"
          >
            <div className="w-full h-[3px] bg-transparent rounded-full overflow-hidden relative">
              <div 
                className="absolute left-0 top-0 h-full bg-[#f4e8d3]/90 rounded-full"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            {/* Hover scrub knob */}
            <div 
              className="absolute w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
              style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 4px)` }}
            />
          </div>
          <div className="flex justify-between text-[7.5px] font-body text-white/50 px-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>

        {/* 3. Media Controls Row */}
        <div className="mt-2.5 flex items-center justify-between px-6 border-b border-white/5 pb-3">
          {/* Prev Button */}
          <button
            onClick={handlePrevTrack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#f4e8d3]/70 active:text-white transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="Previous Track"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6L18 6v12z"/>
            </svg>
          </button>

          {/* Play/Pause Button (toggles soundEnabled) */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            aria-label={soundEnabled ? "Pause" : "Play"}
          >
            {soundEnabled ? (
              /* Pause Icon */
              <svg className="w-5 h-5 text-[#f4e8d3]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              /* Play Icon */
              <svg className="w-5 h-5 text-[#f4e8d3] translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextTrack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#f4e8d3]/70 active:text-white transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="Next Track"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6zm9-12h2v12h-2z"/>
            </svg>
          </button>

          {/* Source / Playlist button: toggles Tracklist display (Microphone icon removed!) */}
          <button
            onClick={() => setShowTracklist(!showTracklist)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all bg-transparent border-0 cursor-pointer ${
              showTracklist ? 'text-[#d9a441]' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3]'
            }`}
            aria-label="Toggle playlist selector"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* 4. Tracklist Drawer (Toggled Display) */}
        <AnimatePresence>
          {showTracklist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex-1 overflow-y-auto py-2 space-y-1.5 scrollbar-none"
            >
              {TRACKS.map((t) => {
                const isCurrent = t.url === activeMusicTrack;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveMusicTrack(t.url);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#d9a441]/10 border-[#d9a441]/35 text-[#d9a441]'
                        : 'bg-white/[0.02] border-transparent text-[#f4e8d3]/50 hover:bg-white/[0.05] hover:text-[#f4e8d3]/80'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-display text-[9px] uppercase tracking-wider font-semibold">
                        {t.title}
                      </span>
                      <span className="font-body text-[7px] opacity-60">
                        {t.subtitle}
                      </span>
                    </div>
                    {isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d9a441] shadow-[0_0_8px_#d9a441]" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Close/Collapse Button at the Bottom */}
        <div className="pt-2 border-t border-white/5 flex justify-center items-center">
          <button
            onClick={() => setIsDynamicIslandOpen(false)}
            className="font-body text-[7.5px] uppercase tracking-[0.25em] text-[#f4e8d3]/30 hover:text-[#f4e8d3]/60 transition-colors bg-transparent border-0 cursor-pointer"
          >
            Close Media Player
          </button>
        </div>
      </motion.div>
    </div>
  );
}
