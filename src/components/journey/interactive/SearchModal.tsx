// ============================================================
//  SearchModal — global knowledge-hub search (Cmd/Ctrl+K, "/")
//  Searches Kandas, events, characters, and verses.
//  Keyboard navigable (↑ ↓ Enter, Esc to close).
// ============================================================
'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData, allVerses } from '@/data';
import type { KandaId } from '@/data/types';
import { useT } from '@/hooks/useT';
import type { TKey } from '@/data/translations';

type ResultType = 'kanda' | 'event' | 'character' | 'verse';

interface SearchItem {
  type: ResultType;
  label: string;
  sub: string;
  kandaId: KandaId;
  haystack: string;
}

// ── Build the search index once at module scope ────────────
const INDEX: SearchItem[] = (() => {
  const items: SearchItem[] = [];
  const seenChars = new Set<string>();

  for (const k of timelineData) {
    items.push({
      type: 'kanda', label: k.title, sub: k.subtitle, kandaId: k.id,
      haystack: `${k.title} ${k.subtitle} ${k.description}`.toLowerCase(),
    });
    for (const ev of k.events) {
      items.push({
        type: 'event', label: ev.title, sub: `${k.title} · ${ev.location}`, kandaId: k.id,
        haystack: `${ev.title} ${ev.subtitle ?? ''} ${ev.description} ${ev.location}`.toLowerCase(),
      });
    }
    for (const c of k.characters) {
      if (seenChars.has(c.name)) continue;
      seenChars.add(c.name);
      items.push({
        type: 'character', label: c.name, sub: c.role, kandaId: k.id,
        haystack: `${c.name} ${c.role} ${c.description}`.toLowerCase(),
      });
    }
  }
  for (const v of allVerses) {
    const kandaId = v.id.split('-')[0] as KandaId;
    items.push({
      type: 'verse', label: v.translation, sub: `${v.speaker ?? 'Valmiki'} · ${kandaId} ${v.sarga}.${v.shloka}`, kandaId,
      haystack: `${v.translation} ${v.transliteration ?? ''} ${v.devanagari} ${v.speaker ?? ''}`.toLowerCase(),
    });
  }
  return items;
})();

interface SearchModalProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
  onNavigate: (kandaId: KandaId) => void;
}

export default function SearchModal({ open, isLight, onClose, onNavigate }: SearchModalProps) {
  const { t } = useT();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = INDEX
      .map(it => {
        const idx = it.haystack.indexOf(q);
        if (idx === -1) return null;
        const labelStarts = it.label.toLowerCase().startsWith(q);
        return { it, score: (labelStarts ? 0 : 100) + idx };
      })
      .filter(Boolean) as { it: SearchItem; score: number }[];
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, 24).map(s => s.it);
  }, [query]);

  useEffect(() => { setSel(0); }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSel(0);
      // focus after mount/animation
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  const activate = (i: number) => {
    const r = results[i];
    if (r) { onNavigate(r.kandaId); onClose(); }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); activate(sel); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  const panelBg = isLight ? 'bg-[#faf7f2]/97 border-black/10' : 'bg-[#0d0c0a]/95 border-white/10';
  const accent = (t: ResultType) => (t === 'verse' ? '#b98bd0' : t === 'character' ? '#7fb2b0' : t === 'event' ? '#e07a3f' : '#d9a441');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh] bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
            className={`w-full max-w-xl rounded-2xl border backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden ${panelBg}`}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }}>
              <svg className="w-5 h-5 shrink-0 text-[#ff7900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t('search.placeholder')}
                className={`flex-1 bg-transparent outline-none font-body text-sm ${isLight ? 'text-[#1c1814] placeholder-black/35' : 'text-[#f4e8d3] placeholder-white/30'}`}
              />
              <kbd className={`hidden md:inline font-body text-[9px] uppercase tracking-wider px-2 py-1 rounded border ${isLight ? 'border-black/10 text-black/40' : 'border-white/10 text-white/40'}`}>Esc</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[52vh] overflow-y-auto overscroll-contain">
              {query.trim() === '' ? (
                <p className={`px-5 py-8 text-center font-body text-xs ${isLight ? 'text-black/40' : 'text-[#f4e8d3]/40'}`}>
                  {t('search.empty')}
                </p>
              ) : results.length === 0 ? (
                <p className={`px-5 py-8 text-center font-body text-xs ${isLight ? 'text-black/40' : 'text-[#f4e8d3]/40'}`}>
                  {t('search.noResults', { q: query })}
                </p>
              ) : (
                <ul className="py-2">
                  {results.map((r, i) => (
                    <li key={`${r.type}-${r.label}-${i}`}>
                      <button
                        onMouseEnter={() => setSel(i)}
                        onClick={() => activate(i)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-left cursor-pointer transition-colors ${
                          i === sel ? (isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]') : ''
                        }`}
                      >
                        <span
                          className="shrink-0 font-body text-[8px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border"
                          style={{ color: accent(r.type), borderColor: `${accent(r.type)}55`, background: `${accent(r.type)}12` }}
                        >
                          {t(`search.type.${r.type}` as TKey)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-body text-xs font-semibold truncate ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>
                            {r.label}
                          </span>
                          <span className={`block font-body text-[10px] truncate ${isLight ? 'text-black/45' : 'text-[#f4e8d3]/45'}`}>
                            {r.sub}
                          </span>
                        </span>
                        {i === sel && (
                          <svg className="w-3.5 h-3.5 shrink-0 text-[#ff7900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
