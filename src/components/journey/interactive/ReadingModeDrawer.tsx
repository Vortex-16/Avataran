// ============================================================
//  ReadingModeDrawer — full-screen distraction-free verse reader
//  Parchment/serif presentation of a Kanda's curated shlokas.
// ============================================================
'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVersesByKanda } from '@/data/verses';
import { timelineData } from '@/data';
import type { KandaId } from '@/data/types';
import BookmarkButton from './BookmarkButton';

interface ReadingModeDrawerProps {
  open: boolean;
  kandaId: KandaId | null;
  onClose: () => void;
}

export default function ReadingModeDrawer({ open, kandaId, onClose }: ReadingModeDrawerProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const kanda = kandaId ? timelineData.find(k => k.id === kandaId) : null;
  const verses = kandaId ? getVersesByKanda(kandaId) : [];

  return (
    <AnimatePresence>
      {open && kanda && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          data-lenis-prevent
          className="fixed inset-0 z-[85] overflow-y-auto"
          style={{
            backgroundColor: '#1a1410',
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(217,164,65,0.10) 0%, rgba(20,16,10,0.9) 55%), url(/assets/background.png)',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Exit reading mode"
            className="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/50 border border-[#d9a441]/30 text-[#f4e8d3]/80 hover:text-[#f4e8d3] hover:border-[#d9a441]/60 flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="max-w-2xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16 flex flex-col items-center gap-3">
              <span className="font-body text-[10px] uppercase tracking-[0.35em] font-bold text-[#d9a441]">Reading Mode</span>
              <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-[#f4e8d3]">{kanda.title}</h1>
              <p className="font-devanagari text-lg italic text-[#ff9933]/90">{kanda.subtitle}</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d9a441]/60 to-transparent mt-2" />
              <span className="font-body text-[10px] uppercase tracking-widest text-[#f4e8d3]/40">{verses.length} curated shlokas</span>
            </div>

            {verses.length === 0 ? (
              <p className="text-center font-body text-sm text-[#f4e8d3]/40">Curated verses for this Kanda are coming soon.</p>
            ) : (
              <div className="flex flex-col gap-14">
                {verses.map(v => (
                  <article key={v.id} className="flex flex-col gap-4 items-center text-center">
                    <div className="flex items-center gap-3">
                      <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[#d9a441]">
                        {v.speaker ?? 'Valmiki'} · Sarga {v.sarga}.{v.shloka}
                      </span>
                      <BookmarkButton entry={{ type: 'verse', kandaId: kanda.id, refId: v.id }} sizeClass="h-3.5 w-3.5" />
                    </div>
                    <p className="font-devanagari text-2xl md:text-[1.7rem] leading-[2.4rem] text-[#f7ecd6]">
                      {v.devanagari}
                    </p>
                    {v.transliteration && (
                      <p className="font-body text-xs italic text-[#f4e8d3]/45 max-w-lg leading-relaxed">{v.transliteration}</p>
                    )}
                    <p className="font-body text-sm text-[#f4e8d3]/75 max-w-lg leading-relaxed">{v.translation}</p>
                    {v.commentary && (
                      <p className="font-body text-[11px] text-[#f4e8d3]/40 italic max-w-md leading-relaxed">{v.commentary}</p>
                    )}
                    <div className="w-10 h-px bg-[#d9a441]/25 mt-2" />
                  </article>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
