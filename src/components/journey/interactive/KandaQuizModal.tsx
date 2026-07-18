// ============================================================
//  KandaQuizModal — trivia in three modes (Phase 1C / Q3)
//    • kanda  — the 10-question quiz for one Kanda
//    • daily  — one deterministic daily challenge (+ streak)
//    • grand  — mixed "Grand Ramayana Challenge"
//  Scores + streaks persist via the store (localStorage).
// ============================================================
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData } from '@/data';
import type { KandaId, QuizQuestion } from '@/data/types';
import { useStore, QuizMode } from '@/app/store';
import { useT } from '@/hooks/useT';

const ALL_QUESTIONS: QuizQuestion[] = timelineData.flatMap(k => k.quizQuestions ?? []);

interface KandaQuizModalProps {
  open: boolean;
  isLight: boolean;
  mode: QuizMode;
  kandaId: KandaId | null;
  onClose: () => void;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function KandaQuizModal({ open, isLight, mode, kandaId, onClose }: KandaQuizModalProps) {
  const { t } = useT();
  const recordKandaQuiz = useStore(s => s.recordKandaQuiz);
  const recordDailyChallenge = useStore(s => s.recordDailyChallenge);
  const dailyStreak = useStore(s => s.quizStats.dailyStreak);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const title = useMemo(() => {
    if (mode === 'daily') return t('quiz.daily');
    if (mode === 'grand') return t('quiz.grand');
    const k = timelineData.find(k => k.id === kandaId);
    return k ? `${k.title} — ${t('quiz.kanda')}` : t('quiz.kanda');
  }, [mode, kandaId, t]);

  useEffect(() => {
    if (!open) return;
    const daySeed = Math.floor(Date.now() / 86_400_000);
    let list: QuizQuestion[] = [];
    if (mode === 'daily') {
      list = ALL_QUESTIONS.length ? [ALL_QUESTIONS[daySeed % ALL_QUESTIONS.length]] : [];
    } else if (mode === 'grand') {
      list = seededShuffle(ALL_QUESTIONS, daySeed).slice(0, 15);
    } else {
      const k = timelineData.find(k => k.id === kandaId);
      list = (k?.quizQuestions ?? []).slice(0, 10);
    }
    setQuestions(list);
    setI(0); setPicked(null); setScore(0); setDone(false);
  }, [open, mode, kandaId]);

  if (!open) return null;

  const q = questions[i];
  const total = questions.length;

  const choose = (idx: number) => {
    if (picked !== null || !q) return;
    setPicked(idx);
    const correct = idx === q.correctIndex;
    if (correct) setScore(s => s + 1);
    if (mode === 'daily') recordDailyChallenge(correct);
  };

  const next = () => {
    if (i + 1 >= total) {
      setDone(true);
      if (mode === 'kanda' && kandaId) recordKandaQuiz(kandaId, score, total);
    } else {
      setI(i + 1); setPicked(null);
    }
  };

  const panelBg = isLight ? 'bg-[#faf6f0] border-black/10 text-[#2b251f]' : 'bg-[#0d0c0a]/95 border-white/10 text-[#f4e8d3]';
  const pct = total ? Math.round((score / total) * 100) : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className={`fixed inset-0 z-[80] flex items-center justify-center p-4 backdrop-blur-md transition-all ${isLight ? 'bg-black/40' : 'bg-black/75'}`}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className={`w-full max-w-lg rounded-2xl border backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.4)] overflow-hidden ${panelBg}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2">
              <span className="text-[#ff7900]">✦</span>
              <span className="font-display text-sm uppercase tracking-wider">{title}</span>
            </div>
            <button onClick={onClose} aria-label="Close" className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isLight ? 'text-black/40 hover:text-black hover:bg-black/5' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-5">
            {total === 0 ? (
              <p className={`font-body text-xs text-center py-8 ${isLight ? 'text-black/40' : 'text-white/40'}`}>{t('quiz.none')}</p>
            ) : done ? (
              // ── Result screen ──
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ff7900" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${pct}, 100`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-display text-xl">{pct}%</span>
                </div>
                <p className={`font-display text-lg uppercase tracking-wide ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>
                  {t('quiz.correct', { score, total })}
                </p>
                <p className={`font-body text-xs max-w-[280px] ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/70'}`}>
                  {pct === 100 ? t('quiz.flawless') : pct >= 60 ? t('quiz.good') : t('quiz.tryAgain')}
                </p>
                <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold text-white cursor-pointer bg-gradient-to-r from-[#ff5e00] to-[#ff7900] hover:shadow-[0_0_18px_rgba(255,94,0,0.4)] transition-all border-none">
                  {t('action.close')}
                </button>
              </div>
            ) : q ? (
              // ── Question screen ──
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className={`font-body text-[9px] uppercase tracking-widest ${isLight ? 'text-black/45' : 'text-white/45'}`}>
                    {mode === 'daily' ? `${t('quiz.streak', { n: dailyStreak })} 🔥` : t('quiz.question', { n: i + 1, total })}
                  </span>
                  <span className="font-body text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border" style={{ borderColor: '#ff790055', color: '#ff7900' }}>
                    {q.difficulty}
                  </span>
                </div>

                <h3 className={`font-display text-base leading-snug ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>{q.question}</h3>

                <div className="flex flex-col gap-2">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.correctIndex;
                    const isPicked = idx === picked;
                    let cls = '';
                    if (picked === null) {
                      cls = isLight
                        ? 'bg-black/[0.015] border-black/10 hover:border-[#ff7900]/50 hover:bg-black/[0.03] text-[#2b251f]'
                        : 'bg-white/[0.015] border-white/10 hover:border-[#ff7900]/50 hover:bg-white/[0.03] text-[#f4e8d3]';
                    } else {
                      if (isCorrect) {
                        cls = 'border-green-500/70 bg-green-500/10 text-green-600 dark:text-green-400 font-bold';
                      } else if (isPicked) {
                        cls = 'border-red-500/70 bg-red-500/10 text-red-600 dark:text-red-400 font-bold';
                      } else {
                        cls = isLight
                          ? 'border-black/5 opacity-40 text-black/40'
                          : 'border-white/5 opacity-45 text-[#f4e8d3]/40';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => choose(idx)}
                        disabled={picked !== null}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left font-body text-xs transition-all ${picked === null ? 'cursor-pointer' : 'cursor-default'} ${cls}`}
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold" style={{ borderColor: 'currentColor' }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {picked !== null && isCorrect && <span className="text-green-500 font-bold">✓</span>}
                        {picked !== null && isPicked && !isCorrect && <span className="text-red-500 font-bold">✕</span>}
                      </button>
                    );
                  })}
                </div>

                {picked !== null && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl border p-3 ${isLight ? 'bg-[#ff7900]/[0.03] border-[#ff7900]/15 text-[#3a3229]' : 'bg-[#ff7900]/[0.05] border-[#ff7900]/15 text-[#f4e8d3]'}`}>
                    <p className="font-body text-[11px] leading-relaxed opacity-90">
                      <span className="text-[#ff9933] font-semibold">{t('quiz.why')} </span>{q.explanation}
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={next}
                    disabled={picked === null}
                    className={`px-6 py-2.5 rounded-xl font-body text-[10px] uppercase tracking-widest font-bold transition-all ${
                      picked === null
                        ? 'opacity-40 cursor-not-allowed border ' + (isLight ? 'border-black/10 text-black/40' : 'border-white/10 text-white/40')
                        : 'cursor-pointer text-white bg-gradient-to-r from-[#ff5e00] to-[#ff7900] hover:shadow-[0_0_18px_rgba(255,94,0,0.4)] border-none'
                    }`}
                  >
                    {i + 1 >= total ? t('quiz.finish') : t('quiz.next')}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
