'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useStore } from '@/app/store';
import { timelineData, KandaSection, TimelineEvent } from './timelineData';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import DynamicIslandPlayer from './DynamicIslandPlayer';

// ─── Helper ────────────────────────────────────────────────
function clamp(n: number, lo: number, hi: number) { return Math.min(Math.max(n, lo), hi); }

// ─── KandaDrawer ───────────────────────────────────────────
interface DrawerProps {
  kanda: KandaSection | null;
  onClose: () => void;
  theme: 'dark' | 'light';
}

function KandaDrawer({ kanda, onClose, theme }: DrawerProps) {
  const [tab, setTab] = useState<'events' | 'characters' | 'locations' | 'weapons' | 'dialogues' | 'gallery' | 'facts' | 'references'>('events');
  const [gallery, setGallery] = useState<{ image: string; caption: string } | null>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTab('events'); }, [kanda?.id]);

  useEffect(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollTop = 0;
    }
  }, [tab, kanda?.id]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const tabs: { id: typeof tab; label: string }[] = [
    { id: 'events', label: 'Events' },
    { id: 'characters', label: 'Cast' },
    { id: 'locations', label: 'Locations' },
    { id: 'weapons', label: 'Weapons' },
    { id: 'dialogues', label: 'Dialogues' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'facts', label: 'Facts' },
    { id: 'references', label: 'Sources' },
  ];

  const isLight = theme === 'light';
  const textTitle = isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]';
  const textBody = isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/70';
  const textMuted = isLight ? 'text-[#3a3229]/55' : 'text-[#f4e8d3]/50';
  const textMutedLess = isLight ? 'text-[#3a3229]/45' : 'text-[#f4e8d3]/40';
  const bgCard = isLight ? 'bg-black/[0.015] border-black/[0.06]' : 'bg-white/[0.02] border-white/[0.05]';
  const bgDrawer = isLight ? 'bg-[#faf6f0]' : 'bg-[#0d0c0a]';
  const borderDrawer = isLight ? 'border-l border-black/10' : 'border-l border-white/[0.06]';
  const borderDivider = isLight ? 'border-black/[0.08]' : 'border-white/[0.04]';

  return (
    <AnimatePresence>
      {kanda && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            data-lenis-prevent
            className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl flex flex-col ${bgDrawer} ${borderDrawer} shadow-[-20px_0_60px_rgba(0,0,0,0.7)] overflow-hidden`}
          >
            {/* Hero Banner */}
            <div className="relative h-52 shrink-0 overflow-hidden">
              <img
                src={kanda.heroImage}
                alt={kanda.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.45) saturate(1.1)' }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} via-${isLight ? '[#faf6f0]' : '[#0d0c0a]'}/40 to-transparent`} />
              <div className={`absolute inset-0 bg-gradient-to-r from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'}/60 to-transparent`} />

              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full ${isLight ? 'bg-white/85 border-black/15 text-black/70 hover:text-black hover:border-black/35' : 'bg-black/50 border-white/10 text-[#f4e8d3]/70 hover:text-[#f4e8d3] hover:border-white/30'} flex items-center justify-center transition-all duration-200 cursor-pointer`}
                aria-label="Close drawer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Kanda metadata */}
              <div className="absolute bottom-5 left-6 right-6">
                <span
                  className="font-body text-[9px] uppercase tracking-[0.3em] font-bold"
                  style={{ color: kanda.accentHex }}
                >
                  {kanda.title}
                </span>
                <h2 className={`font-display text-2xl ${textTitle} tracking-wide uppercase mt-1 drop-shadow-lg`}>
                  {kanda.subtitle}
                </h2>
                <p className={`font-body text-[11px] ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/55'} mt-2 leading-relaxed line-clamp-2`}>
                  {kanda.description}
                </p>
              </div>
            </div>

            {/* Sloka Banner */}
            <div
              className={`shrink-0 px-6 py-3 border-y ${borderDivider}`}
              style={{ background: `linear-gradient(90deg, ${kanda.accentHex}08, transparent)` }}
            >
              <p className="font-devanagari text-sm italic" style={{ color: kanda.accentHex }}>
                {kanda.sloka}
              </p>
              <p className={`font-body text-[10px] ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/45'} italic mt-0.5`}>
                {kanda.slokaTranslation}
              </p>
            </div>

            {/* Tab Bar */}
            <div className={`shrink-0 flex items-center gap-0 overflow-x-auto border-b ${isLight ? 'border-black/[0.08]' : 'border-white/[0.05]'} px-4 scrollbar-none`}>
              {tabs.map(t => {
                // Hide weapons tab if empty
                if (t.id === 'weapons' && kanda.weapons.length === 0) return null;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`shrink-0 px-4 py-3 font-body text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 border-b-2 cursor-pointer ${
                      tab === t.id
                        ? 'border-current text-[#d9a441]'
                        : isLight ? 'border-transparent text-black/35 hover:text-black/70' : 'border-transparent text-[#f4e8d3]/35 hover:text-[#f4e8d3]/70'
                    }`}
                    style={tab === t.id ? { borderColor: kanda.accentHex, color: kanda.accentHex } : {}}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div ref={tabContentRef} className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-5">

              {/* ── Events Tab ── */}
              {tab === 'events' && (
                <div className="space-y-4">
                  {kanda.events.map((ev, i) => (
                    <div
                      key={ev.id}
                      className={`relative rounded-xl overflow-hidden border ${bgCard}`}
                    >
                      {/* Hero image strip */}
                      <div className="relative h-28 overflow-hidden">
                        <img
                          src={ev.media.hero}
                          alt={ev.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ filter: 'brightness(0.5) saturate(1.15)' }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} via-${isLight ? '[#faf6f0]' : '[#0d0c0a]'}/30 to-transparent`} />
                        {ev.turning && (
                          <span
                            className="absolute top-2 right-2 font-body text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-bold"
                            style={{ borderColor: kanda.accentHex, color: kanda.accentHex, background: `${kanda.accentHex}18` }}
                          >
                            Turning Point
                          </span>
                        )}
                        <div className="absolute bottom-2 left-3">
                          <span className={`font-body text-[9px] ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/50'} uppercase tracking-wider`}>
                            {ev.location}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-display text-base ${textTitle} uppercase tracking-wide leading-tight`}>
                            {ev.title}
                          </h3>
                          <span className={`shrink-0 font-body text-[9px] ${textMutedLess} uppercase mt-1`}>#{i + 1}</span>
                        </div>
                        {ev.subtitle && (
                          <p className="font-body text-[10px]" style={{ color: kanda.accentHex }}>{ev.subtitle}</p>
                        )}
                        <p className={`font-body text-xs ${textBody} leading-relaxed`}>
                          {ev.description}
                        </p>
                        {ev.quote && (
                          <blockquote
                            className={`border-l-2 pl-3 py-1 my-2 italic font-body text-[11px] ${isLight ? 'text-[#3a3229]/75' : 'text-[#f4e8d3]/55'} leading-relaxed`}
                            style={{ borderColor: kanda.accentHex }}
                          >
                            "{ev.quote}"
                          </blockquote>
                        )}
                        {ev.weapon && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`font-body text-[9px] uppercase tracking-wider ${textMutedLess}`}>Weapon</span>
                            <span
                              className="font-body text-[9px] uppercase tracking-wider font-bold"
                              style={{ color: kanda.accentHex }}
                            >
                              {ev.weapon}
                            </span>
                          </div>
                        )}
                        <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${borderDivider}`}>
                          {ev.characters.map(c => (
                            <span
                              key={c}
                              className={`font-body text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${isLight ? 'border-black/10 text-[#3a3229]/60' : 'border-white/10 text-[#f4e8d3]/50'}`}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Characters Tab ── */}
              {tab === 'characters' && (
                <div className="grid grid-cols-2 gap-3">
                  {kanda.characters.map(char => (
                    <div
                      key={char.name}
                      className={`rounded-xl overflow-hidden border ${bgCard} flex flex-col`}
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={char.portrait}
                          alt={char.name}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                          style={{ filter: 'brightness(0.6) saturate(1.1)' }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} via-transparent to-transparent`} />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className={`font-display text-sm ${textTitle} uppercase tracking-wide leading-tight`}>
                            {char.name}
                          </p>
                          <p
                            className="font-body text-[9px] uppercase tracking-wider"
                            style={{ color: kanda.accentHex }}
                          >
                            {char.role}
                          </p>
                        </div>
                        {/* Status dot */}
                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                          char.status === 'active' ? 'bg-green-400' :
                          char.status === 'departed' ? 'bg-red-500' :
                          'bg-purple-400'
                        }`} title={char.status} />
                      </div>
                      <div className="p-3 flex flex-col gap-1.5 flex-1">
                        <p className={`font-body text-[10px] ${isLight ? 'text-[#3a3229]/75' : 'text-[#f4e8d3]/60'} leading-relaxed`}>
                          {char.description}
                        </p>
                        {char.weapon && (
                          <div className={`flex items-center gap-1.5 mt-auto pt-2 border-t ${borderDivider}`}>
                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: kanda.accentHex }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className={`font-body text-[9px] ${textMutedLess}`}>{char.weapon}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Locations Tab ── */}
              {tab === 'locations' && (
                <div className="space-y-4">
                  {kanda.locations.map(loc => (
                    <div
                      key={loc.name}
                      className={`rounded-xl overflow-hidden border ${bgCard}`}
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ filter: 'brightness(0.5) saturate(1.2)' }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-${isLight ? '[#faf6f0]' : '[#0d0c0a]'} to-transparent`} />
                        <div className="absolute bottom-3 left-4">
                          <p className={`font-display text-base ${textTitle} uppercase tracking-wide`}>{loc.name}</p>
                          {loc.realWorld && (
                            <p className={`font-body text-[9px] ${textMutedLess} mt-0.5`}>{loc.realWorld}</p>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className={`font-body text-xs ${textBody} leading-relaxed`}>{loc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Weapons Tab ── */}
              {tab === 'weapons' && (
                <div className="space-y-3">
                  {kanda.weapons.map(w => (
                    <div
                      key={w.name}
                      className={`p-4 rounded-xl border ${bgCard} flex gap-4 items-start`}
                    >
                      <div
                        className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border"
                        style={{ borderColor: `${kanda.accentHex}40`, background: `${kanda.accentHex}10` }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: kanda.accentHex }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className={`font-display text-sm ${textTitle} uppercase tracking-wide`}>{w.name}</p>
                        <p
                          className="font-body text-[9px] uppercase tracking-wider mb-2"
                          style={{ color: kanda.accentHex }}
                        >
                          Wielder: {w.wielder}
                        </p>
                        <p className={`font-body text-xs ${textBody} leading-relaxed`}>{w.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Dialogues Tab ── */}
              {tab === 'dialogues' && (
                <div className="space-y-5">
                  {kanda.dialogues.map((d, i) => (
                    <div
                      key={i}
                      className={`p-5 rounded-xl border ${bgCard} space-y-3`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-6 rounded-full"
                          style={{ background: kanda.accentHex }}
                        />
                        <span
                          className="font-body text-[10px] uppercase tracking-widest font-bold"
                          style={{ color: kanda.accentHex }}
                        >
                          {d.speaker}
                        </span>
                      </div>
                      <p className={`font-devanagari text-base leading-relaxed ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]/85'} italic`}>
                        {d.sanskrit}
                      </p>
                      <p className={`font-body text-xs ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/55'} leading-relaxed border-t ${borderDivider} pt-3`}>
                        <span className="text-[#d9a441] font-semibold">Translation:</span> {d.translation}
                      </p>
                      <p className={`font-body text-[10px] ${textMuted} italic leading-relaxed`}>
                        Context: {d.context}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Gallery Tab ── */}
              {tab === 'gallery' && (
                <div className="grid grid-cols-2 gap-3">
                  {kanda.gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setGallery(g)}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer border ${isLight ? 'border-black/10 hover:border-black/35' : 'border-white/[0.05] hover:border-white/20'} transition-all duration-300`}
                    >
                      <img
                        src={g.image}
                        alt={g.caption}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ filter: 'brightness(0.65) saturate(1.1)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <p className={`absolute bottom-2 left-2 right-2 font-body text-[9px] ${isLight ? 'text-white/85' : 'text-[#f4e8d3]/75'} leading-tight text-left`}>
                        {g.caption}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* ── Facts Tab ── */}
              {tab === 'facts' && (
                <div className="space-y-3">
                  {kanda.facts.map((fact, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${bgCard}`}
                    >
                      <span
                        className="shrink-0 font-display text-lg font-bold leading-none mt-0.5"
                        style={{ color: kanda.accentHex }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className={`font-body text-xs ${textBody} leading-relaxed`}>{fact}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── References Tab ── */}
              {tab === 'references' && (
                <div className="space-y-3">
                  {kanda.references.map((ref, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border ${bgCard} space-y-2`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: kanda.accentHex }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <p className={`font-display text-sm ${textTitle} uppercase tracking-wide`}>{ref.name}</p>
                      </div>
                      <p className={`font-body text-[10px] ${textMuted} leading-relaxed pl-6`}>{ref.detail}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>

          {/* Gallery Lightbox */}
          <AnimatePresence>
            {gallery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
                onClick={() => setGallery(null)}
              >
                <img
                  src={gallery.image}
                  alt={gallery.caption}
                  className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
                <p className={`font-body text-sm ${isLight ? 'text-black/85' : 'text-[#f4e8d3]/70'} mt-4 text-center max-w-md`}>
                  {gallery.caption}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main JourneyPage ──────────────────────────────────────
export default function JourneyPage() {
  const { soundEnabled, setSoundEnabled } = useStore();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeKanda, setActiveKanda] = useState<string>('bala');
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [lallaOutfit, setLallaOutfit] = useState<string>('shringaar');
  const [openDrawer, setOpenDrawer] = useState<KandaSection | null>(null);

  // Split view state
  const [currentView, setCurrentView] = useState<'lifeline' | 'mandir'>('lifeline');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMobileChapterIndex, setActiveMobileChapterIndex] = useState<number>(0);

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const timelinePathRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback(() => setOpenDrawer(null), []);

  // Screen size listener to toggle mobile mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleKandas = (() => {
    if (currentView === 'lifeline') {
      if (isMobile) {
        return [timelineData[activeMobileChapterIndex]];
      } else {
        return timelineData.slice(0, 7);
      }
    } else {
      return [timelineData[7]];
    }
  })();

  const handleViewChange = (view: 'lifeline' | 'mandir') => {
    setCurrentView(view);
    if (view === 'mandir') {
      setActiveKanda('ayodhya-mandir');
    } else {
      setActiveKanda(timelineData[activeMobileChapterIndex].id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lenis + GSAP ScrollTriggers
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobileViewport = window.innerWidth < 768;
    let lenis: Lenis | null = null;
    let rafId: number;

    // Optimize: Only initialize Lenis on desktop
    if (!isMobileViewport) {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
      } as any);

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Glow line scroll animation (only desktop/scroll mode)
    if (!isMobileViewport && glowLineRef.current && timelinePathRef.current) {
      gsap.fromTo(
        glowLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelinePathRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    }

    // Card reveal and focus spotlight animation (desktop only to prevent mobile lag)
    const cards = document.querySelectorAll('.timeline-event-card');
    const isLightTheme = theme === 'light';
    const minOpacity = isLightTheme ? 0.65 : 0.25;
    const baseBorderColor = isLightTheme ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.04)';
    const focusedTitleColor = isLightTheme ? '#1c1814' : '#ffffff';
    const unfocusedTitleColor = isLightTheme ? '#2b251f' : '#f4e8d3';
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      cards.forEach((card) => {
        const accent = card.getAttribute('data-accent') || '#d05c43';
        const title = card.querySelector('h4');
        
        // Initialize starting state: hidden, smaller, offset down
        gsap.set(card, { opacity: minOpacity, scale: 0.93, y: 40 });

        // Create scroll-linked spotlight timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'bottom 8%',
            scrub: 1.2,
          }
        });

        tl.to(card, {
          opacity: 1,
          scale: 1.03,
          y: 0,
          boxShadow: isLightTheme
            ? `0 20px 45px -10px rgba(0, 0, 0, 0.08), 0 0 25px ${accent}15`
            : `0 20px 50px -10px ${accent}35, 0 0 30px ${accent}25`,
          borderColor: `${accent}45`,
          duration: 0.5,
          ease: 'power2.out'
        })
        .to(title, {
          color: focusedTitleColor,
          textShadow: isLightTheme ? 'none' : `0 0 12px ${accent}70, 0 0 24px ${accent}30`,
          duration: 0.5,
          ease: 'power2.out'
        }, 0)
        .to(card, {
          opacity: minOpacity,
          scale: 0.93,
          boxShadow: 'none',
          borderColor: baseBorderColor,
          duration: 0.5,
          ease: 'power2.in'
        })
        .to(title, {
          color: unfocusedTitleColor,
          textShadow: 'none',
          duration: 0.5,
          ease: 'power2.in'
        }, 0.5);
      });
    } else {
      // Clean up inline styles on mobile to run transitions at native speed
      cards.forEach((card) => {
        gsap.set(card, { clearProps: 'all' });
        const title = card.querySelector('h4');
        if (title) gsap.set(title, { clearProps: 'all' });
      });
    }

    // Active Kanda tracker (only on desktop/scroll mode)
    if (!isMobileViewport) {
      const sections = document.querySelectorAll('.kanda-section');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveKanda(section.getAttribute('data-kanda-id') || 'bala'),
          onEnterBack: () => setActiveKanda(section.getAttribute('data-kanda-id') || 'bala'),
        });
      });
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [theme, currentView, activeMobileChapterIndex]);

  const isLight = theme === 'light';

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

      {/* Left Nav — Kanda tracker */}
      {currentView === 'lifeline' && (
        <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 items-start font-body text-[10px] tracking-[0.25em] uppercase font-semibold">
          {timelineData.slice(0, 7).map((k) => (
            <button
              key={k.id}
              className={`flex items-center gap-3 transition-all duration-500 cursor-pointer bg-transparent border-0 text-left ${
                activeKanda === k.id ? 'translate-x-2' : 'hover:translate-x-1'
              }`}
              style={{ color: activeKanda === k.id ? k.accentHex : isLight ? 'rgba(43,37,31,0.35)' : 'rgba(244,232,211,0.25)' }}
              onClick={() => {
                const el = document.getElementById(`section-${k.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-all duration-500 shrink-0"
                style={activeKanda === k.id
                  ? { background: k.accentHex, boxShadow: `0 0 8px ${k.accentHex}` }
                  : { background: isLight ? 'rgba(43,37,31,0.2)' : 'rgba(244,232,211,0.15)' }
                }
              />
              <span className="whitespace-nowrap">{k.title.replace(' Kanda', '')}</span>
            </button>
          ))}
        </div>
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
        <div ref={timelinePathRef} className="relative w-full flex flex-col gap-32">
          {/* Vertical path line */}
          <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] ${isLight ? 'bg-black/[0.08]' : 'bg-white/[0.08]'} pointer-events-none z-0 ${isMobile && currentView === 'lifeline' ? 'hidden' : 'block'}`}>
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
              <div className="w-full flex justify-center text-center relative md:px-12">
                <button
                  className={`w-full max-w-[650px] p-6 md:p-8 rounded-2xl ${
                    isLight 
                      ? 'bg-[#faf7f0]/75 border-black/[0.06] shadow-[0_15px_35px_rgba(43,37,31,0.06)]' 
                      : 'bg-[#14110b]/55 border-white/[0.04] shadow-[0_15px_35px_rgba(0,0,0,0.4)]'
                  } backdrop-blur-md border flex flex-col gap-4 items-center group cursor-pointer hover:border-white/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left`}
                  onClick={() => setOpenDrawer(kanda)}
                  style={{ borderColor: openDrawer?.id === kanda.id ? `${kanda.accentHex}40` : undefined }}
                >
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.3em] font-bold"
                    style={{ color: kanda.accentHex }}
                  >
                    {kanda.title}
                  </span>
                  <h3 className={`font-display text-2xl md:text-3xl ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'} tracking-wider uppercase`}>
                    {kanda.subtitle}
                  </h3>

                  {/* Sloka */}
                  <div className={`border-l border-r ${isLight ? 'border-black/10' : 'border-[#ff7900]/20'} px-6 py-2 my-1 flex flex-col gap-2 ${isLight ? 'bg-black/[0.01]' : 'bg-[#ff5e00]/[0.02]'} rounded w-full text-center`}>
                    <p className="font-devanagari text-base italic text-[#ff9933]/90 font-medium leading-relaxed">
                      {kanda.sloka.substring(0, 60)}…
                    </p>
                    <p className={`font-body text-[10px] ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/50'} italic leading-snug`}>
                      {kanda.slokaTranslation}
                    </p>
                  </div>

                  {/* Explore prompt */}
                  <div
                    className="flex items-center gap-2 font-body text-[9px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border transition-all duration-300 group-hover:scale-105"
                    style={{
                      borderColor: `${kanda.accentHex}40`,
                      color: kanda.accentHex,
                      background: isLight ? `${kanda.accentHex}0f` : `${kanda.accentHex}1a`,
                      boxShadow: `0 4px 12px ${kanda.accentHex}08`
                    }}
                  >
                    <span>Explore full chapter</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Background image tint */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-[0.04] bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url('${kanda.backgroundImage}')` }}
                  />
                </button>
              </div>

              {/* Event Cards */}
              <div className="flex flex-col gap-20">
                {kanda.events.map((event: TimelineEvent, idx: number) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <div
                      key={event.id}
                      className={`flex flex-col md:flex-row w-full items-center relative ${
                        isEven ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      {/* Timeline Node */}
                      {!(isMobile && currentView === 'lifeline') && (
                        <div
                          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0907] border-2 z-20 pointer-events-none shadow-[0_0_10px_rgba(217,164,65,0.5)]"
                          style={{ borderColor: kanda.accentHex }}
                        />
                      )}

                      {/* Event Card */}
                      <div className={`w-full ${isMobile && currentView === 'lifeline' ? 'md:w-full pl-0' : 'md:w-[45%] pl-10 md:pl-0'}`}>
                        <div
                          data-accent={kanda.accentHex}
                          className="timeline-event-card premium-modern-card flex flex-col gap-0 pointer-events-auto select-text overflow-hidden"
                        >
                          {/* Hero image section */}
                          <div className="relative h-40 md:h-48 overflow-hidden">
                            <img
                              src={event.media.hero}
                              alt={event.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ filter: 'brightness(0.55) saturate(1.15)' }}
                            />
                            {/* Parallax foreground if exists */}
                            {event.media.parallaxFg && (
                              <img
                                src={event.media.parallaxFg}
                                alt=""
                                aria-hidden
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                style={{ filter: 'brightness(0.65)', mixBlendMode: 'luminosity', opacity: 0.4 }}
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/30 to-transparent" />

                            {/* Turning point badge */}
                            {event.turning && (
                              <div
                                className="absolute top-3 left-3 font-body text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border font-bold"
                                style={{
                                  borderColor: kanda.accentHex,
                                  color: kanda.accentHex,
                                  background: `${kanda.accentHex}18`,
                                  boxShadow: `0 0 12px ${kanda.accentHex}30`,
                                }}
                              >
                                ◈ Turning Point
                              </div>
                            )}

                            <div className="absolute bottom-3 left-4 right-4">
                              <span className={`font-body text-[9px] uppercase tracking-widest ${isLight ? 'text-white/80' : 'text-[#f4e8d3]/50'}`}>
                                {event.location}
                              </span>
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="p-5 md:p-6 flex flex-col gap-3">
                            {/* Deepotsav animated diyas */}
                            {event.id === 'new-ayodhya' && (
                              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0 opacity-30">
                                {[...Array(8)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute bottom-[-20px] w-2 h-1.5 rounded-full animate-diya-drift"
                                    style={{
                                      left: `${15 + i * 11}%`,
                                      animationDelay: `${i * 1.6}s`,
                                      animationDuration: `${5 + i * 1.5}s`,
                                      background: '#ff5e00',
                                      filter: 'blur(1px)',
                                      boxShadow: '0 0 8px #ff5e00, 0 0 16px #ff7900',
                                    }}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Header row */}
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h4 className={`font-display text-lg md:text-xl ${isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]'} tracking-wide uppercase leading-tight`}>
                                  {event.title}
                                </h4>
                                {event.subtitle && (
                                  <p
                                    className="font-body text-[10px] uppercase tracking-[0.2em] mt-1 font-semibold"
                                    style={{ color: kanda.accentHex }}
                                  >
                                    {event.subtitle}
                                  </p>
                                )}
                              </div>
                              <span className={`shrink-0 font-display ${isLight ? 'text-[#2b251f]/15' : 'text-[#f4e8d3]/15'} text-2xl leading-none`}>
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>

                            {/* Description */}
                            <p className={`font-body text-xs ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/70'} leading-relaxed`}>
                              {event.description}
                            </p>

                            {/* Weapon tag */}
                            {event.weapon && (
                              <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 shrink-0" style={{ color: kanda.accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span className={`font-body text-[9px] ${isLight ? 'text-[#3a3229]/50' : 'text-[#f4e8d3]/40'} uppercase tracking-wider`}>{event.weapon}</span>
                              </div>
                            )}

                            {/* Quote */}
                            {event.quote && (
                              <blockquote
                                className={`border-l-2 pl-4 py-1 my-1 italic font-body text-[11px] ${isLight ? 'text-[#3a3229]/75' : 'text-[#f4e8d3]/55'} leading-relaxed`}
                                style={{ borderColor: kanda.accentHex }}
                              >
                                "{event.quote}"
                              </blockquote>
                            )}

                            {/* Character tags */}
                            <div className={`flex flex-wrap gap-1.5 pt-3 border-t ${isLight ? 'border-black/10' : 'border-white/[0.05]'}`}>
                              {event.characters.slice(0, 6).map((char) => (
                                <span
                                  key={char}
                                  className={`font-body text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${isLight ? 'text-[#3a3229]/65' : 'text-[#f4e8d3]/50'}`}
                                  style={{ borderColor: isLight ? 'rgba(0,0,0,0.1)' : `${kanda.accentHex}30`, background: isLight ? 'rgba(0,0,0,0.02)' : `${kanda.accentHex}08` }}
                                >
                                  {char}
                                </span>
                              ))}
                              {event.characters.length > 6 && (
                                <span className={`font-body text-[8px] ${isLight ? 'text-[#3a3229]/45' : 'text-[#f4e8d3]/30'} px-2 py-0.5`}>
                                  +{event.characters.length - 6}
                                </span>
                              )}
                            </div>

                            {/* Day/Night toggle for Ram Mandir */}
                            {event.id === 'ram-mandir' && (
                              <div className={`mt-2 flex items-center justify-between p-3 rounded-xl ${isLight ? 'bg-black/[0.02] border border-black/5' : 'bg-white/[0.02] border border-white/5'}`}>
                                <span className={`font-body text-[9px] uppercase tracking-wider ${isLight ? 'text-[#3a3229]/60' : 'text-[#f4e8d3]/50'}`}>
                                  Mandir View:{' '}
                                  <span style={{ color: isNightMode ? '#ff9e5e' : '#d9a441' }}>
                                    {isNightMode ? 'Night — Deepotsav' : 'Day — Arati'}
                                  </span>
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setIsNightMode(false)}
                                    className={`px-2.5 py-1 rounded-full font-body text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                      !isNightMode
                                        ? 'bg-[#d9a441]/25 border border-[#d9a441] text-[#ff7900] font-bold'
                                        : isLight ? 'bg-black/[0.02] border border-black/5 text-black/40 hover:text-black/70' : 'bg-white/[0.02] border border-white/5 text-[#f4e8d3]/40'
                                    }`}
                                  >☀ Day</button>
                                  <button
                                    onClick={() => setIsNightMode(true)}
                                    className={`px-2.5 py-1 rounded-full font-body text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                      isNightMode
                                        ? 'bg-[#ff5e00]/25 border border-[#ff5e00] text-[#ff7900] font-bold'
                                        : isLight ? 'bg-black/[0.02] border border-black/5 text-black/40 hover:text-black/70' : 'bg-white/[0.02] border border-white/5 text-[#f4e8d3]/40'
                                    }`}
                                  >☾ Night</button>
                                </div>
                              </div>
                            )}

                            {/* Garbhagriha Ram Lalla switcher */}
                            {event.id === 'garbhagriha' && (
                              <div className="mt-2 flex flex-col gap-4">
                                <div className={`relative w-full aspect-[4/5] rounded-xl border ${isLight ? 'border-black/5 bg-black/10' : 'border-white/5 bg-black/40'} overflow-hidden shadow-inner`}>
                                  <img
                                    src={`/assets/ram_lalla_${
                                      lallaOutfit === 'milk' ? 'abhisheka_milk' : lallaOutfit
                                    }.png`}
                                    alt={`Ram Lalla ${lallaOutfit}`}
                                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                                    key={lallaOutfit}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />
                                  <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-[9px] tracking-widest text-[#d9a441] uppercase bg-black/45 px-3 py-1 rounded-full border ${isLight ? 'border-black/10' : 'border-white/5'} backdrop-blur-sm whitespace-nowrap`}>
                                    {lallaOutfit === 'milk' ? 'Ksheera Abhishekam' : `${lallaOutfit} Alankaram`}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5">
                                  {[
                                    { id: 'shringaar', label: 'Shringaar' },
                                    { id: 'saffron', label: 'Saffron' },
                                    { id: 'yellow', label: 'Yellow' },
                                    { id: 'flowers', label: 'Pushpa' },
                                    { id: 'lotus', label: 'Lotus' },
                                    { id: 'milk', label: 'Abhisheka' },
                                  ].map((btn) => (
                                    <button
                                      key={btn.id}
                                      onClick={() => setLallaOutfit(btn.id)}
                                      className={`py-1.5 rounded font-body text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
                                        lallaOutfit === btn.id
                                          ? 'bg-[#d9a441]/25 border border-[#d9a441] text-[#ff7900] font-bold shadow-[0_0_8px_rgba(217,164,65,0.2)]'
                                          : isLight ? 'bg-black/[0.02] border border-black/5 text-black/40 hover:text-black/80' : 'bg-white/[0.02] border border-white/5 text-[#f4e8d3]/40 hover:text-[#f4e8d3]/80'
                                      }`}
                                    >
                                      {btn.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Interactive Navigation Controls */}
              {isMobile && currentView === 'lifeline' && (
                <div className="w-full flex flex-col items-center gap-4 mt-12 pb-8">
                  {/* Progress Indicator */}
                  <div className={`text-[10px] font-body uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                    isLight ? 'bg-black/[0.03] text-black/60' : 'bg-white/[0.03] text-[#f4e8d3]/60'
                  }`}>
                    Chapter {activeMobileChapterIndex + 1} of 7: <span className="font-bold text-[#ff7900]">{kanda.title}</span>
                  </div>

                  <div className="flex w-full gap-3 justify-center max-w-[420px]">
                    {/* Back Button */}
                    {activeMobileChapterIndex > 0 && (
                      <button
                        onClick={() => {
                          const newIdx = activeMobileChapterIndex - 1;
                          setActiveMobileChapterIndex(newIdx);
                          setActiveKanda(timelineData[newIdx].id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex-1 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          isLight
                            ? 'bg-black/[0.015] border-black/10 text-black hover:bg-black/[0.04]'
                            : 'bg-white/[0.015] border-white/10 text-[#f4e8d3] hover:bg-white/[0.04]'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Go Back</span>
                      </button>
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => {
                        if (activeMobileChapterIndex < 6) {
                          const newIdx = activeMobileChapterIndex + 1;
                          setActiveMobileChapterIndex(newIdx);
                          setActiveKanda(timelineData[newIdx].id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          handleViewChange('mandir');
                        }
                      }}
                      className="flex-1 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#ff5e00] to-[#ff7900] border-0 hover:shadow-[0_0_20px_rgba(255,94,0,0.4)]"
                      style={{
                        boxShadow: '0 4px 15px rgba(255,94,0,0.25)'
                      }}
                    >
                      <span>{activeMobileChapterIndex < 6 ? 'Complete & Next' : 'Enter Ram Mandir'}</span>
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
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed top-8 right-[80px] z-40 p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none ${
          isLight
            ? 'bg-white/80 border-black/10 text-black hover:bg-white hover:border-black/25'
            : 'bg-[#14110b]/80 border-[#d05c43]/20 text-[#f4e8d3]/80 hover:text-[#f4e8d3] hover:border-[#d05c43]/50'
        }`}
        aria-label="Toggle theme"
      >
        {isLight ? (
          /* Sun Icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b89552]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        ) : (
          /* Moon Icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d05c43]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* iOS Frosted Glass Footer Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] pointer-events-auto w-[90%] max-w-sm">
        <div className={`relative px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex items-center justify-between gap-1 ${
          isLight 
            ? 'bg-white/75 border-black/10 text-[#2b251f]' 
            : 'bg-[#0d0c0a]/65 border-white/10 text-[#f4e8d3]'
        }`}>
          {/* Tab 1: Lifeline */}
          <button
            onClick={() => handleViewChange('lifeline')}
            className={`relative flex-1 py-2 px-3 rounded-full font-body text-[9px] md:text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
              currentView === 'lifeline'
                ? 'text-[#ff7900] z-10'
                : isLight ? 'text-black/55 hover:text-black' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3]'
            }`}
          >
            {currentView === 'lifeline' && (
              <motion.div
                layoutId="activeDockTab"
                className={`absolute inset-0 rounded-full z-[-1] border ${
                  isLight 
                    ? 'bg-black/[0.04] border-black/10' 
                    : 'bg-white/[0.06] border-white/10'
                }`}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="whitespace-nowrap">Lifeline</span>
          </button>

          {/* Tab 2: Ram Mandir */}
          <button
            onClick={() => handleViewChange('mandir')}
            className={`relative flex-1 py-2 px-3 rounded-full font-body text-[9px] md:text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
              currentView === 'mandir'
                ? 'text-[#ff7900] z-10'
                : isLight ? 'text-black/55 hover:text-black' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3]'
            }`}
          >
            {currentView === 'mandir' && (
              <motion.div
                layoutId="activeDockTab"
                className={`absolute inset-0 rounded-full z-[-1] border ${
                  isLight 
                    ? 'bg-black/[0.04] border-black/10' 
                    : 'bg-white/[0.06] border-white/10'
                }`}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="whitespace-nowrap">Ram Mandir</span>
          </button>
        </div>
      </div>

      {/* Kanda Drawer */}
      <KandaDrawer kanda={openDrawer} onClose={closeDrawer} theme={theme} />

      {/* Mobile Dynamic Island Player */}
      <DynamicIslandPlayer />
    </div>
  );
}
