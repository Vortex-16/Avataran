// ============================================================
//  ResumePrompt — "Welcome back / resume journey" dialog
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData } from '@/data';
import type { JourneyProgress } from '@/hooks/useProgress';
import { useT } from '@/hooks/useT';

interface ResumePromptProps {
  show: boolean;
  savedProgress: JourneyProgress | null;
  isLight: boolean;
  onStartFresh: () => void;
  onResume: () => void;
}

export default function ResumePrompt({ show, savedProgress, isLight, onStartFresh, onResume }: ResumePromptProps) {
  const { t } = useT();
  return (
    <AnimatePresence>
      {show && savedProgress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`w-full max-w-md p-6 rounded-2xl border flex flex-col gap-6 items-center text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] ${
              isLight
                ? 'bg-[#faf7f2]/95 border-black/10 text-black'
                : 'bg-[#0d0c0a]/90 border-white/10 text-[#f4e8d3]'
            }`}
          >
            <div className="flex flex-col gap-2">
              <span className="font-devanagari text-[#ff7900] text-sm uppercase tracking-widest font-bold">
                {t('resume.welcome')}
              </span>
              <h3 className="font-display text-xl md:text-2xl uppercase tracking-wider">
                {t('resume.title')}
              </h3>
              <p className={`font-body text-xs ${isLight ? 'text-black/60' : 'text-[#f4e8d3]/60'} max-w-[320px] mt-2`}>
                {t('resume.body')}
              </p>
            </div>

            {/* Saved details card */}
            <div className={`w-full p-4 rounded-xl border ${
              isLight ? 'bg-black/[0.02] border-black/5' : 'bg-white/[0.02] border-white/5'
            } flex flex-col gap-1 items-center`}>
              <span className={`font-body text-[9px] uppercase tracking-widest ${isLight ? 'text-black/40' : 'text-[#f4e8d3]/40'}`}>
                {t('resume.savedLocation')}
              </span>
              <span className="font-display text-sm uppercase text-[#ff9933] font-bold">
                {savedProgress.view === 'lifeline'
                  ? timelineData.find(k => k.id === savedProgress.kandaId)?.title || 'Bala Kanda'
                  : 'Shri Ram Mandir'}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex w-full gap-3">
              <button
                onClick={onStartFresh}
                className={`flex-1 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 cursor-pointer ${
                  isLight
                    ? 'bg-black/[0.015] border-black/10 text-black hover:bg-black/[0.04]'
                    : 'bg-white/[0.015] border-white/10 text-[#f4e8d3] hover:bg-white/[0.04]'
                }`}
              >
                {t('resume.startFresh')}
              </button>

              <button
                onClick={onResume}
                className="flex-1 py-3 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#ff5e00] to-[#ff7900] border-0 hover:shadow-[0_0_20px_rgba(255,94,0,0.4)]"
                style={{ boxShadow: '0 4px 15px rgba(255,94,0,0.25)' }}
              >
                {t('resume.continue')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
