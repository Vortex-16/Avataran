// ============================================================
//  BookmarkPanel — saved verses / events / characters
//  Slide-in panel; grouped by type, with export-as-text.
// ============================================================
'use client';
import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/app/store';
import { timelineData, allVerses } from '@/data';
import { nodeById } from '@/data/characters';
import type { BookmarkEntry, KandaId } from '@/data/types';

interface BookmarkPanelProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
  onOpenKanda: (kandaId: KandaId) => void;
}

interface Resolved {
  entry: BookmarkEntry;
  title: string;
  sub: string;
}

function resolve(entry: BookmarkEntry): Resolved {
  if (entry.type === 'verse') {
    const v = allVerses.find(x => x.id === entry.refId);
    return { entry, title: v?.translation ?? entry.refId, sub: v ? `${v.speaker ?? 'Valmiki'} · ${v.sarga}.${v.shloka}` : 'Verse' };
  }
  if (entry.type === 'character') {
    const c = nodeById[entry.refId];
    return { entry, title: c?.name ?? entry.refId, sub: c?.role ?? 'Character' };
  }
  // event
  for (const k of timelineData) {
    const ev = k.events.find(e => e.id === entry.refId);
    if (ev) return { entry, title: ev.title, sub: `${k.title} · ${ev.location}` };
  }
  return { entry, title: entry.refId, sub: 'Event' };
}

export default function BookmarkPanel({ open, isLight, onClose, onOpenKanda }: BookmarkPanelProps) {
  const bookmarks = useStore(s => s.bookmarks);
  const removeBookmark = useStore(s => s.removeBookmark);
  const clearBookmarks = useStore(s => s.clearBookmarks);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const resolved = useMemo(() => bookmarks.map(resolve), [bookmarks]);

  const exportText = () => {
    const lines = resolved.map(r => `• [${r.entry.type}] ${r.title} — ${r.sub}`);
    const text = `AVATARAN — My Saved Bookmarks\n\n${lines.join('\n')}`;
    navigator.clipboard?.writeText(text).catch(() => { /* noop */ });
  };

  const panelBg = isLight ? 'bg-[#faf6f0] border-black/10' : 'bg-[#0d0c0a] border-white/10';
  const badge = (t: BookmarkEntry['type']) => (t === 'verse' ? '#b98bd0' : t === 'character' ? '#7fb2b0' : '#e07a3f');

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            data-lenis-prevent
            className={`fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md flex flex-col border-l ${panelBg} shadow-[-20px_0_60px_rgba(0,0,0,0.6)]`}
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2">
                <span className="text-[#ff7900]">♥</span>
                <span className={`font-display text-sm uppercase tracking-wider ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>Saved ({bookmarks.length})</span>
              </div>
              <div className="flex items-center gap-2">
                {bookmarks.length > 0 && (
                  <>
                    <button onClick={exportText} className={`font-body text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer ${isLight ? 'border-black/10 text-black/60 hover:text-black' : 'border-white/10 text-[#f4e8d3]/60 hover:text-[#f4e8d3]'}`}>Export</button>
                    <button onClick={clearBookmarks} className="font-body text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-500/30 text-red-400/80 hover:text-red-400 cursor-pointer">Clear</button>
                  </>
                )}
                <button onClick={onClose} aria-label="Close" className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${isLight ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4">
              {bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 px-6">
                  <span className="text-4xl opacity-20">♡</span>
                  <p className={`font-body text-xs ${isLight ? 'text-black/50' : 'text-[#f4e8d3]/50'}`}>
                    No bookmarks yet. Tap the heart on any verse, event, or character to save it here.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {resolved.map(r => (
                    <li key={r.entry.id}
                      className={`group flex items-start gap-3 rounded-xl border p-3 ${isLight ? 'bg-black/[0.015] border-black/[0.06]' : 'bg-white/[0.02] border-white/[0.05]'}`}>
                      <span className="shrink-0 font-body text-[8px] uppercase tracking-wider font-bold px-2 py-1 rounded-full mt-0.5" style={{ color: badge(r.entry.type), background: `${badge(r.entry.type)}18` }}>
                        {r.entry.type}
                      </span>
                      <button onClick={() => { onOpenKanda(r.entry.kandaId as KandaId); onClose(); }} className="min-w-0 flex-1 text-left cursor-pointer">
                        <span className={`block font-body text-xs font-semibold leading-snug ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'} line-clamp-2`}>{r.title}</span>
                        <span className={`block font-body text-[10px] mt-0.5 ${isLight ? 'text-black/45' : 'text-[#f4e8d3]/45'}`}>{r.sub}</span>
                      </button>
                      <button onClick={() => removeBookmark(r.entry.id)} aria-label="Remove"
                        className={`shrink-0 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${isLight ? 'text-black/40 hover:text-red-500' : 'text-white/40 hover:text-red-400'}`}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
