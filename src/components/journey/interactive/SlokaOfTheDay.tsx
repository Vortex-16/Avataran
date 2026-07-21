// ============================================================
//  SlokaOfTheDay — floating daily-rotating verse widget
//  Deterministic by calendar day; same verse all day, rotates
//  at midnight. Share + "Read in context" actions.
// ============================================================
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verseDatabases } from '@/data/verses';
import type { KandaId, VerseEntry } from '@/data/types';
import { useT } from '@/hooks/useT';

interface SlokaOfTheDayProps {
  isLight: boolean;
  onOpenKanda: (kandaId: KandaId) => void;
}

const flat: { verse: VerseEntry; kandaId: KandaId }[] = verseDatabases.flatMap(db =>
  db.verses.map(verse => ({ verse, kandaId: db.kandaId })),
);

export default function SlokaOfTheDay({ isLight, onOpenKanda }: SlokaOfTheDayProps) {
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Deterministic index — computed client-side to avoid hydration drift.
  const pick = useMemo(() => {
    if (!mounted || flat.length === 0) return null;
    const dayIndex = Math.floor(Date.now() / 86_400_000) % flat.length;
    return flat[dayIndex];
  }, [mounted]);

  if (!pick) return null;
  const { verse, kandaId } = pick;

  const share = async () => {
    const text = `${verse.devanagari}\n\n${verse.translation}\n— Valmiki Ramayana (${kandaId} ${verse.sarga}.${verse.shloka})\n\nvia AVATARAN`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: t('sloka.title'),
          text: text,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const panelBg = isLight ? 'bg-[#faf7f2]/95 border-black/10' : 'bg-[#0d0c0a]/90 border-white/10';

  return (
    <div className="fixed bottom-24 left-4 md:bottom-8 md:left-6 z-[46] pointer-events-auto w-[min(88vw,340px)]">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className={`rounded-2xl border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ${panelBg}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
              <span className="font-body text-xs uppercase tracking-[0.2em] font-bold text-[#ff7900]">
                ✦ {t('sloka.title')}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Collapse"
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isLight ? 'text-black/60 hover:text-black hover:bg-black/5' : 'text-[#f4e8d3]/60 hover:text-[#f4e8d3] hover:bg-white/5'}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <p className={`font-devanagari text-base md:text-lg leading-relaxed italic ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>
                {verse.devanagari}
              </p>
              <p className={`font-body text-xs md:text-sm leading-relaxed ${isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]/90'} font-medium`}>
                {verse.translation}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                <span className={`font-body text-[10px] md:text-xs uppercase tracking-wider font-semibold ${isLight ? 'text-black/60' : 'text-[#f4e8d3]/70'}`}>
                  {verse.speaker ?? 'Valmiki'} · {kandaId} {verse.sarga}.{verse.shloka}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={share}
                    className={`px-3 py-1.5 rounded-full font-body text-xs uppercase tracking-wider font-bold border transition-all cursor-pointer min-h-[36px] ${isLight ? 'border-black/20 text-black/80 hover:text-black hover:bg-black/5' : 'border-white/20 text-[#f4e8d3] hover:border-white/40'}`}
                  >
                    {copied ? t('action.copied') : t('action.share')}
                  </button>
                  <button
                    onClick={() => onOpenKanda(kandaId)}
                    className="px-3.5 py-1.5 rounded-full font-body text-xs uppercase tracking-wider font-bold text-white border-0 cursor-pointer bg-gradient-to-r from-[#ff5e00] to-[#ff7900] hover:shadow-[0_0_16px_rgba(255,94,0,0.5)] transition-all min-h-[36px]"
                  >
                    {t('action.read')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl shadow-lg cursor-pointer min-h-[44px] ${panelBg}`}
          >
            <span className="text-[#ff7900] text-base">✦</span>
            <span className={`font-body text-xs uppercase tracking-[0.15em] font-bold ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>{t('sloka.title')}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
