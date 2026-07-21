// ============================================================
//  AboutModal — Trust, Credibility, Mission & Sourcing Modal
// ============================================================
'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/app/store';

interface AboutModalProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, isLight, onClose }: AboutModalProps) {
  const lang = useStore(s => s.lang);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const bgModal = isLight
    ? 'bg-[#faf7f2]/95 border-black/15 text-[#1c1814]'
    : 'bg-[#0e0c09]/95 border-[#d05c43]/30 text-[#f4e8d3]';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          data-lenis-prevent
          className={`relative w-full max-w-2xl max-h-[85vh] rounded-3xl border shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ${bgModal}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-current/10">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#ff7900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide">
                  {lang === 'hi' ? 'संदर्भ एवं उद्देश्य' : 'About & Mission'}
                </h3>
                <p className="font-body text-xs opacity-70">
                  {lang === 'hi' ? 'डिजिटल स्मारक एवं प्रामाणिक स्रोत' : 'Digital Monument & Authentic Sources'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                isLight
                  ? 'border-black/15 bg-black/5 text-black hover:bg-black/10'
                  : 'border-white/15 bg-white/5 text-[#f4e8d3] hover:bg-white/10'
              }`}
              aria-label="Close modal"
              title="Close / बंद करें"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 select-text font-body" data-lenis-prevent>
            {/* Mission Statement */}
            <div className="space-y-2">
              <span className="font-devanagari text-xs uppercase tracking-widest font-bold text-[#ff7900]">
                १. दृष्टि एवं उद्देश्य • OUR MISSION
              </span>
              <h4 className="font-display text-xl font-bold uppercase">
                {lang === 'hi' ? 'श्रीराम के जीवन का पावन डिजिटल स्मारक' : 'A Digital Monument to the Life of Shri Ram'}
              </h4>
              <p className="text-sm md:text-base leading-relaxed opacity-90">
                {lang === 'hi'
                  ? 'अवतारण (AVATARAN) श्रीमद् रामायण के सातों काण्डों की एक दिव्य, कलात्मक एवं तकनीक-समृद्ध डिजिटल प्रस्तुति है। इसका उद्देश्य आधुनिक युग में भगवान श्रीराम के आदर्शों, धर्म और सांस्कृतिक धरोहर को अगली पीढ़ी तक पहुँचाना है।'
                  : 'AVATARAN is a non-commercial, cinematic digital monument dedicated to preserving and narrating the complete story of Shri Ram across all Seven Kandas of the Ramayana with artistic restraint, cultural reverence, and technological excellence.'}
              </p>
            </div>

            {/* Primary Sources & Citations */}
            <div className="space-y-3 pt-4 border-t border-current/10">
              <span className="font-devanagari text-xs uppercase tracking-widest font-bold text-[#ff7900]">
                २. प्रामाणिक स्रोत • RESEARCH & CITATIONS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'}`}>
                  <h5 className="font-display text-sm font-bold text-[#ff9933] uppercase">Valmiki Ramayana</h5>
                  <p className="text-xs opacity-80 mt-1 leading-relaxed">
                    Sanskrit verse structures, sargas, and chronologically validated event sequences directly derived from Maharishi Valmiki’s original text.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'}`}>
                  <h5 className="font-display text-sm font-bold text-[#ff9933] uppercase">Ramcharitmanas</h5>
                  <p className="text-xs opacity-80 mt-1 leading-relaxed">
                    Awadhi devotional traditions and chopais by Goswami Tulsidas, providing emotional depth and regional cultural continuity.
                  </p>
                </div>
              </div>
            </div>

            {/* Engineering & Technology */}
            <div className="space-y-2 pt-4 border-t border-current/10">
              <span className="font-devanagari text-xs uppercase tracking-widest font-bold text-[#ff7900]">
                ३. तकनीक एवं निर्माण • CRAFT & ARCHITECTURE
              </span>
              <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                Designed & Engineered by <strong>Vortex Team</strong> using modern web standards: Next.js 14, Web Audio API, Lenis Smooth Scroll, Framer Motion, and WebGL asset acceleration.
              </p>
            </div>

            {/* Trust Badges */}
            <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} text-xs font-semibold`}>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ff7900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Non-Commercial Cultural Initiative</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ff7900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>SSL Encrypted & WCAG AA Accessible</span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 px-6 border-t border-current/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff5e00] to-[#ff7900] text-white border-0 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
