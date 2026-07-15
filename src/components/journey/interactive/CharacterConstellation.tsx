// ============================================================
//  CharacterConstellation — interactive relationship map
//  A radial faction layout (deterministic, SSR-safe) with
//  relationship edges, faction/relation filtering, and a
//  character detail sidebar. Full-screen overlay view.
// ============================================================
'use client';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  constellationNodes, relationshipEdges, nodeById,
  FACTION_META, RELATION_META,
  type CharacterFaction, type RelationType,
} from '@/data/characters';
import type { KandaId } from '@/data/types';
import BookmarkButton from './BookmarkButton';

interface CharacterConstellationProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
  onOpenKanda: (kandaId: KandaId) => void;
}

const FACTIONS: CharacterFaction[] = ['ayodhya', 'sage', 'vanara', 'lanka', 'divine'];
const W = 1000;
const H = 720;

// Deterministic radial layout: factions get angular sectors,
// members are distributed on rings within their sector.
const LAYOUT: Record<string, { x: number; y: number }> = (() => {
  const pos: Record<string, { x: number; y: number }> = {};
  const cx = W / 2, cy = H / 2;
  FACTIONS.forEach((f, fi) => {
    const members = constellationNodes.filter(n => n.faction === f);
    const sectorMid = (fi / FACTIONS.length) * Math.PI * 2 - Math.PI / 2;
    const spread = (Math.PI * 2 / FACTIONS.length) * 0.8;
    members.forEach((n, mi) => {
      const t = members.length === 1 ? 0.5 : mi / (members.length - 1);
      const angle = sectorMid + (t - 0.5) * spread;
      const ring = 150 + (mi % 3) * 95 + (members.length > 6 ? 40 : 0);
      pos[n.id] = { x: cx + Math.cos(angle) * ring, y: cy + Math.sin(angle) * ring * 0.82 };
    });
  });
  return pos;
})();

export default function CharacterConstellation({ open, isLight, onClose, onOpenKanda }: CharacterConstellationProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [factionFilter, setFactionFilter] = useState<CharacterFaction | 'all'>('all');
  const [relationFilter, setRelationFilter] = useState<RelationType | 'all'>('all');

  const visibleNodeIds = useMemo(() => {
    const set = new Set<string>();
    constellationNodes.forEach(n => {
      if (factionFilter === 'all' || n.faction === factionFilter) set.add(n.id);
    });
    return set;
  }, [factionFilter]);

  const visibleEdges = useMemo(() =>
    relationshipEdges.filter(e =>
      visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to) &&
      (relationFilter === 'all' || e.type === relationFilter),
    ), [visibleNodeIds, relationFilter]);

  // Neighbours of selected node for highlight.
  const connectedIds = useMemo(() => {
    if (!selected) return null;
    const s = new Set<string>([selected]);
    relationshipEdges.forEach(e => {
      if (e.from === selected) s.add(e.to);
      if (e.to === selected) s.add(e.from);
    });
    return s;
  }, [selected]);

  const detail = selected ? nodeById[selected] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          data-lenis-prevent
          className="fixed inset-0 z-[80] flex flex-col"
          style={{
            backgroundColor: isLight ? '#f7f2ea' : '#0a0806',
            backgroundImage: isLight
              ? 'radial-gradient(circle at 50% 40%, rgba(217,164,65,0.10), rgba(247,242,234,0.96))'
              : 'radial-gradient(circle at 50% 40%, rgba(217,164,65,0.10), rgba(10,8,6,0.97))',
          }}
        >
          {/* Header + filters */}
          <div className="shrink-0 flex flex-wrap items-center gap-3 px-5 py-3 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mr-auto">
              <span className="text-[#ff7900]">✦</span>
              <span className={`font-display text-sm uppercase tracking-wider ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>Character Constellation</span>
            </div>

            <select
              value={factionFilter}
              onChange={e => { setFactionFilter(e.target.value as CharacterFaction | 'all'); setSelected(null); }}
              className={`font-body text-[10px] uppercase tracking-wider rounded-full border px-3 py-1.5 outline-none cursor-pointer ${isLight ? 'bg-white/70 border-black/10 text-black/70' : 'bg-white/[0.04] border-white/10 text-[#f4e8d3]/70'}`}
            >
              <option value="all">All Factions</option>
              {FACTIONS.map(f => <option key={f} value={f}>{FACTION_META[f].label}</option>)}
            </select>

            <select
              value={relationFilter}
              onChange={e => setRelationFilter(e.target.value as RelationType | 'all')}
              className={`font-body text-[10px] uppercase tracking-wider rounded-full border px-3 py-1.5 outline-none cursor-pointer ${isLight ? 'bg-white/70 border-black/10 text-black/70' : 'bg-white/[0.04] border-white/10 text-[#f4e8d3]/70'}`}
            >
              <option value="all">All Bonds</option>
              {(Object.keys(RELATION_META) as RelationType[]).map(r => <option key={r} value={r}>{RELATION_META[r].label}</option>)}
            </select>

            <button onClick={onClose} aria-label="Close" className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border ${isLight ? 'border-black/10 text-black/50 hover:text-black' : 'border-white/10 text-white/50 hover:text-white'}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 flex min-h-0">
            {/* Graph */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Edges */}
                {visibleEdges.map((e, idx) => {
                  const a = LAYOUT[e.from], b = LAYOUT[e.to];
                  if (!a || !b) return null;
                  const dim = connectedIds && !(connectedIds.has(e.from) && connectedIds.has(e.to));
                  const meta = RELATION_META[e.type];
                  return (
                    <line
                      key={idx} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={meta.hex} strokeWidth={1.2} strokeDasharray={meta.dash}
                      opacity={dim ? 0.06 : 0.4}
                    />
                  );
                })}
                {/* Nodes */}
                {constellationNodes.filter(n => visibleNodeIds.has(n.id)).map(n => {
                  const p = LAYOUT[n.id];
                  if (!p) return null;
                  const isSel = selected === n.id;
                  const dim = connectedIds ? !connectedIds.has(n.id) : false;
                  const hex = FACTION_META[n.faction].hex;
                  const r = isSel ? 30 : 22;
                  return (
                    <g key={n.id} transform={`translate(${p.x},${p.y})`} opacity={dim ? 0.28 : 1}
                       className="cursor-pointer" onClick={() => setSelected(isSel ? null : n.id)}>
                      <circle r={r + 4} fill={hex} opacity={isSel ? 0.28 : 0.12} />
                      <clipPath id={`clip-${n.id}`}><circle r={r} /></clipPath>
                      <image href={n.portrait} x={-r} y={-r} width={r * 2} height={r * 2}
                             clipPath={`url(#clip-${n.id})`} preserveAspectRatio="xMidYMid slice" />
                      <circle r={r} fill="none" stroke={hex} strokeWidth={isSel ? 3 : 1.8} />
                      <text y={r + 14} textAnchor="middle"
                            className="font-body" fontSize={12} fontWeight={isSel ? 700 : 500}
                            fill={isLight ? '#2b251f' : '#f4e8d3'}>
                        {n.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Detail sidebar */}
            <AnimatePresence>
              {detail && (
                <motion.aside
                  initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}
                  transition={{ type: 'spring', damping: 30, stiffness: 320 }}
                  className={`shrink-0 w-[290px] border-l overflow-y-auto ${isLight ? 'bg-[#faf7f2]/80 border-black/10' : 'bg-[#0d0c0a]/80 border-white/10'} backdrop-blur-md`}
                >
                  <div className="relative h-44">
                    <img src={detail.portrait} alt={detail.name} className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: 'brightness(0.7)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-[#faf7f2]' : 'from-[#0d0c0a]'} to-transparent`} />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                      <div>
                        <h3 className={`font-display text-lg uppercase tracking-wide ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>{detail.name}</h3>
                        <p className="font-body text-[10px] uppercase tracking-wider" style={{ color: FACTION_META[detail.faction].hex }}>{detail.role}</p>
                      </div>
                      <BookmarkButton entry={{ type: 'character', kandaId: detail.kandas[0], refId: detail.id }} isLight={isLight} />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-4">
                    <p className={`font-body text-xs leading-relaxed ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/65'}`}>{detail.description}</p>

                    {/* Relationships */}
                    <div>
                      <p className={`font-body text-[9px] uppercase tracking-widest mb-2 ${isLight ? 'text-black/40' : 'text-[#f4e8d3]/40'}`}>Bonds</p>
                      <div className="flex flex-col gap-1.5">
                        {relationshipEdges.filter(e => e.from === detail.id || e.to === detail.id).map((e, idx) => {
                          const otherId = e.from === detail.id ? e.to : e.from;
                          const other = nodeById[otherId];
                          if (!other) return null;
                          return (
                            <button key={idx} onClick={() => setSelected(otherId)}
                              className={`flex items-center justify-between gap-2 text-left rounded-lg px-2 py-1.5 cursor-pointer transition-colors ${isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.04]'}`}>
                              <span className={`font-body text-[11px] ${isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]/85'}`}>{other.name}</span>
                              <span className="font-body text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: RELATION_META[e.type].hex, background: `${RELATION_META[e.type].hex}18` }}>
                                {e.label ?? RELATION_META[e.type].label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Appears in */}
                    <div>
                      <p className={`font-body text-[9px] uppercase tracking-widest mb-2 ${isLight ? 'text-black/40' : 'text-[#f4e8d3]/40'}`}>Appears In</p>
                      <div className="flex flex-wrap gap-1.5">
                        {detail.kandas.map(k => (
                          <button key={k} onClick={() => { onOpenKanda(k); onClose(); }}
                            className={`font-body text-[8px] uppercase tracking-wider px-2 py-1 rounded-full border cursor-pointer transition-colors ${isLight ? 'border-black/10 text-black/60 hover:border-[#ff7900]/50' : 'border-white/10 text-[#f4e8d3]/60 hover:border-[#ff7900]/50'}`}>
                            {k}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="shrink-0 flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-2 border-t" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }}>
            {FACTIONS.map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: FACTION_META[f].hex }} />
                <span className={`font-body text-[9px] uppercase tracking-wider ${isLight ? 'text-black/50' : 'text-[#f4e8d3]/50'}`}>{FACTION_META[f].label}</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
