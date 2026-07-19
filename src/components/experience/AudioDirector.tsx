'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@/app/store';

const MUSIC_TRACKS = [
  '/audio/initial.mp3',
  '/audio/Hum Katha Sunate Ram Sakal Gun Dhaam Ki - SouthMelody.mp3',
  '/audio/narration-ayodhya.mp3',
];

export default function AudioDirector() {
  const { 
    isReady, 
    soundConsentGiven, 
    setSoundConsentGiven, 
    soundEnabled, 
    setSoundEnabled, 
    worldState,
    activeMusicTrack,
    setActiveMusicTrack,
    isDynamicIslandOpen,
    setIsDynamicIslandOpen
  } = useStore();

  const [showConsentModal, setShowConsentModal] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Audio nodes refs
  const masterGainRef = useRef<GainNode | null>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);

  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const narrationGainRef = useRef<GainNode | null>(null);

  // Procedural Synth nodes refs
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const synthFilterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // 1. Check session storage for prior consent
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedConsent = sessionStorage.getItem('avataran_sound_consent');
    const storedSound = sessionStorage.getItem('avataran_sound_enabled');

    if (storedConsent === 'true') {
      setSoundConsentGiven(true);
      setSoundEnabled(storedSound === 'true');
    } else {
      // Show modal after preloader finishes
      const timer = setTimeout(() => {
        setShowConsentModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [setSoundConsentGiven, setSoundEnabled]);

  // 2. Initialize Web Audio API nodes
  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Clean up any existing global audio elements to prevent overlapping sound
    if (typeof window !== 'undefined') {
      if ((window as any).avataran_music_audio) {
        try {
          (window as any).avataran_music_audio.pause();
          (window as any).avataran_music_audio.src = "";
        } catch (e) {}
      }
      if ((window as any).avataran_narration_audio) {
        try {
          (window as any).avataran_narration_audio.pause();
          (window as any).avataran_narration_audio.src = "";
        } catch (e) {}
      }
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(soundEnabled ? 1 : 0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Bus 1: Music (initial.mp3)
    const musicAudio = new Audio('/audio/initial.mp3');
    musicAudio.loop = false;
    musicAudio.crossOrigin = 'anonymous';

    // Ended listener to automatically shift to next track
    musicAudio.addEventListener('ended', () => {
      const currentTrack = useStore.getState().activeMusicTrack;
      const currentIndex = MUSIC_TRACKS.indexOf(currentTrack);
      const nextIndex = currentIndex !== -1 ? (currentIndex + 1) % MUSIC_TRACKS.length : 0;
      const nextTrack = MUSIC_TRACKS[nextIndex];
      useStore.getState().setActiveMusicTrack(nextTrack);
    });

    const musicSource = ctx.createMediaElementSource(musicAudio);
    const musicGain = ctx.createGain();
    musicGain.gain.setValueAtTime(0.3, ctx.currentTime); // Hero theme volume
    
    musicSource.connect(musicGain);
    musicGain.connect(masterGain);

    musicAudioRef.current = musicAudio;
    musicSourceRef.current = musicSource;
    musicGainRef.current = musicGain;
    if (typeof window !== 'undefined') {
      (window as any).avataran_music_audio = musicAudio;
    }

    // Bus 2: Narration (narration-ayodhya.mp3)
    const narrationAudio = new Audio('/audio/narration-ayodhya.mp3');
    narrationAudio.crossOrigin = 'anonymous';
    const narrationSource = ctx.createMediaElementSource(narrationAudio);
    const narrationGain = ctx.createGain();
    narrationGain.gain.setValueAtTime(0, ctx.currentTime); // Start muted

    narrationSource.connect(narrationGain);
    narrationGain.connect(masterGain);

    narrationAudioRef.current = narrationAudio;
    narrationSourceRef.current = narrationSource;
    narrationGainRef.current = narrationGain;
    if (typeof window !== 'undefined') {
      (window as any).avataran_narration_audio = narrationAudio;
    }

    // Bus 3: Procedural noise generator (Wind/Waves)
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const synthFilter = ctx.createBiquadFilter();
    synthFilter.type = 'bandpass';
    synthFilter.frequency.setValueAtTime(350, ctx.currentTime);
    synthFilter.Q.setValueAtTime(1.2, ctx.currentTime);

    const synthGain = ctx.createGain();
    synthGain.gain.setValueAtTime(0, ctx.currentTime); // Start muted

    // Connect procedural nodes
    noiseSource.connect(synthFilter);
    synthFilter.connect(synthGain);
    synthGain.connect(masterGain);

    // Create LFO to modulate filter frequency (creates swelling wind/waves)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // 0.15 Hz LFO (slow waves)
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(150, ctx.currentTime); // Sweep +/- 150 Hz

    lfo.connect(lfoGain);
    lfoGain.connect(synthFilter.frequency);

    noiseSource.start(0);
    lfo.start(0);

    noiseSourceRef.current = noiseSource;
    synthGainRef.current = synthGain;
    synthFilterRef.current = synthFilter;
    lfoRef.current = lfo;

    // Trigger initial play if unmuted
    if (soundEnabled) {
      ctx.resume().then(() => {
        musicAudio.play().catch(() => {});
      });
    }
    setIsAudioInitialized(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current.src = "";
        musicAudioRef.current = null;
      }
      if (narrationAudioRef.current) {
        narrationAudioRef.current.pause();
        narrationAudioRef.current.src = "";
        narrationAudioRef.current = null;
      }
      if (typeof window !== 'undefined') {
        (window as any).avataran_music_audio = null;
        (window as any).avataran_narration_audio = null;
      }
    };
  }, []);

  // Initialize audio context on first user interaction if consent was already stored
  useEffect(() => {
    if (soundConsentGiven && soundEnabled && !audioCtxRef.current) {
      const handleFirstInteraction = () => {
        try {
          initAudio();
        } catch (err) {
          console.warn('Web Audio initialization failed on interaction:', err);
        }
        // Clean up event listeners after first trigger
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('pointerdown', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);

      return () => {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };
    }
  }, [soundConsentGiven, soundEnabled]);

  // 3. React to master sound toggle (Mute/Unmute)
  useEffect(() => {
    if (!audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    if (soundEnabled) {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      masterGainRef.current?.gain.setTargetAtTime(1, ctx.currentTime, 0.1);
      
      // Play elements if they were paused
      musicAudioRef.current?.play().catch(() => {});
      if (worldState.location === 'ayodhya-gate' && !activeMusicTrack.includes('narration-ayodhya.mp3')) {
        narrationAudioRef.current?.play().catch(() => {});
      }
    } else {
      masterGainRef.current?.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
      musicAudioRef.current?.pause();
      narrationAudioRef.current?.pause();
    }
  }, [soundEnabled, worldState.location, activeMusicTrack, isAudioInitialized]);

  // 3.5. React to dynamic track switcher (Dynamic Island)
  useEffect(() => {
    const musicAudio = musicAudioRef.current;
    if (!musicAudio || !activeMusicTrack || !audioCtxRef.current) return;
    
    // Convert relative urls to absolute paths to prevent comparison mismatches
    const currentSrc = new URL(musicAudio.src, window.location.origin).pathname;
    const targetSrc = new URL(activeMusicTrack, window.location.origin).pathname;
    
    // Decode URLs to ensure we match spaces (e.g. %20 vs space character)
    if (decodeURIComponent(currentSrc) === decodeURIComponent(targetSrc)) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const mGain = musicGainRef.current;

    // Fade out current music
    if (mGain) {
      mGain.gain.cancelScheduledValues(now);
      mGain.gain.setValueAtTime(mGain.gain.value, now);
      mGain.gain.linearRampToValueAtTime(0, now + 1.0); // 1.0s fade out
    }

    const timer = setTimeout(() => {
      musicAudio.pause();
      musicAudio.src = activeMusicTrack;
      musicAudio.load();
      if (soundEnabled) {
        musicAudio.play().then(() => {
          if (mGain) {
            const currentNow = ctx.currentTime;
            mGain.gain.cancelScheduledValues(currentNow);
            mGain.gain.setValueAtTime(0, currentNow);
            // Gradually transition to target volume based on active location
            const targetVolume = worldState.location === 'ayodhya-gate' ? 0.08 : 0.25;
            mGain.gain.linearRampToValueAtTime(targetVolume, currentNow + 1.5); // 1.5s fade in
          }
        }).catch(err => {
          console.warn("Failed to play switched music track:", err);
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeMusicTrack, soundEnabled, worldState.location, isAudioInitialized]);

  // 4. Handle scene crossfading
  useEffect(() => {
    if (!audioCtxRef.current || !soundEnabled) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const fadeTime = 2.0; // 2 seconds crossfade

    const mGain = musicGainRef.current;
    const nGain = narrationGainRef.current;
    const sGain = synthGainRef.current;
    const sFilter = synthFilterRef.current;

    if (!mGain || !nGain || !sGain || !sFilter) return;

    // Reset parameters on state changes
    mGain.gain.cancelScheduledValues(now);
    nGain.gain.cancelScheduledValues(now);
    sGain.gain.cancelScheduledValues(now);

    switch (worldState.location) {
      case null:
        // Quiet opening / Hero: music at baseline, other muted
        mGain.gain.linearRampToValueAtTime(0.3, now + fadeTime);
        nGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        sGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        break;

      case 'ayodhya-gate':
        // Ayodhya: narration plays, music dips to background
        mGain.gain.linearRampToValueAtTime(0.08, now + fadeTime);
        if (activeMusicTrack.includes('narration-ayodhya.mp3')) {
          nGain.gain.linearRampToValueAtTime(0, now + fadeTime);
          narrationAudioRef.current?.pause();
        } else {
          nGain.gain.linearRampToValueAtTime(0.7, now + fadeTime);
          narrationAudioRef.current?.play().catch(() => {});
        }
        sGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        break;

      case 'departure-road':
        // Departure Road: Footsteps (using music bus for now as placeholder), no narration
        mGain.gain.linearRampToValueAtTime(0.1, now + fadeTime);
        nGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        sGain.gain.linearRampToValueAtTime(0.1, now + fadeTime);
        sFilter.frequency.setValueAtTime(300, now);
        break;

      case 'forest-threshold':
        // Forest: music fades out, synthetic forest wind fades in
        mGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        nGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        sGain.gain.linearRampToValueAtTime(0.25, now + fadeTime);
        // Tweak filter to make it sound like light wind rustling leaves
        sFilter.frequency.setValueAtTime(450, now);
        sFilter.Q.setValueAtTime(1.5, now);
        break;

      default:
        // Generic fallback for any unmapped scenes
        mGain.gain.linearRampToValueAtTime(0.2, now + fadeTime);
        nGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        sGain.gain.linearRampToValueAtTime(0, now + fadeTime);
        break;
    }
  }, [worldState.location, soundEnabled, activeMusicTrack, isAudioInitialized]);

  // Handle consent modal buttons
  const handleConsent = (enable: boolean) => {
    setSoundConsentGiven(true);
    setSoundEnabled(enable);
    setShowConsentModal(false);
    
    // Store preferences
    sessionStorage.setItem('avataran_sound_consent', 'true');
    sessionStorage.setItem('avataran_sound_enabled', enable.toString());

    // Initialize audio context and trigger first playback
    try {
      initAudio();
    } catch (err) {
      console.warn('Web Audio initialization failed:', err);
    }
  };

  return (
    <>
      {/* Minimal Glass Sound Consent Modal */}
      {showConsentModal && isReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-6">
          <div className="relative w-full max-w-[400px] rounded-2xl bg-[#0a0907]/80 backdrop-blur-2xl border border-[#ff5e00]/15 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(255,94,0,0.08)] overflow-hidden">
            {/* Top specular highlight representing glass catching light */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff5e00]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff5e00]/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center gap-6">
              <span className="font-devanagari text-[#ff7900] text-[0.8rem] tracking-[0.25em] uppercase font-bold opacity-80">
                ध्वनि संकेत • AUDIO CONSENT
              </span>
              
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-2xl text-[#f4e8d3] tracking-wide uppercase leading-tight">
                  Experience with Sound?
                </h2>
                <p className="font-body text-xs text-[#f4e8d3]/60 leading-relaxed max-w-[290px] mx-auto">
                  AVATARAN uses spatial audio, chanting, and narration to create an immersive digital monument.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 w-full mt-2">
                <button 
                  onClick={() => handleConsent(true)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff5e00]/20 via-[#d9a441]/10 to-[#ff5e00]/20 hover:from-[#ff5e00]/30 hover:to-[#ff5e00]/30 border border-[#ff5e00]/40 hover:border-[#ff5e00]/80 shadow-[0_0_20px_rgba(255,94,0,0.15)] text-[#f4e8d3] font-body text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] pointer-events-auto cursor-pointer"
                >
                  Enter with Sound
                </button>
                <button 
                  onClick={() => handleConsent(false)}
                  className="w-full py-3 hover:bg-white/[0.03] border border-transparent hover:border-white/5 rounded-full text-[#f4e8d3]/50 hover:text-[#f4e8d3]/80 font-body text-xs font-semibold uppercase tracking-widest transition-all duration-300 pointer-events-auto cursor-pointer"
                >
                  Explore in Silence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Audio Controller Button (placed top-left, visible after loading is complete) */}
      {soundConsentGiven && isReady && (
        <button
          onClick={() => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            
            if (isMobile && useStore.getState().heroComplete) {
              setIsDynamicIslandOpen(!isDynamicIslandOpen);
            } else {
              const nextSoundState = !soundEnabled;
              setSoundEnabled(nextSoundState);
              sessionStorage.setItem('avataran_sound_enabled', nextSoundState.toString());
              
              if (!audioCtxRef.current) {
                try {
                  initAudio();
                } catch (err) {
                  console.warn('Web Audio initialization failed on toggle:', err);
                }
              } else if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
              }
            }
          }}
          className="fixed top-8 left-[24px] z-40 bg-[#14110b]/50 backdrop-blur-md border border-[#d9a441]/20 hover:border-[#d9a441]/50 text-[#f4e8d3]/80 hover:text-[#f4e8d3] p-3 rounded-full transition-all duration-300 shadow-md group focus:outline-none focus:ring-1 focus:ring-[#d9a441]"
          aria-label={soundEnabled ? 'Mute experience' : 'Unmute experience'}
        >
          {soundEnabled ? (
            /* Unmuted (Speaker Icon) */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            /* Muted (Mute Speaker Icon) */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
