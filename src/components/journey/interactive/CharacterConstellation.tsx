// ============================================================
//  CharacterConstellation — interactive relationship map
//  A radial faction layout (deterministic, SSR-safe) with
//  relationship edges, faction/relation filtering, and a
//  character detail sidebar. Full-screen overlay view.
// ============================================================
'use client';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  constellationNodes, relationshipEdges, nodeById,
  FACTION_META, RELATION_META,
  type CharacterFaction, type RelationType,
} from '@/data/characters';
import type { KandaId } from '@/data/types';
import BookmarkButton from './BookmarkButton';
import { useT } from '@/hooks/useT';
import { FACTION_LABELS, RELATION_LABELS } from '@/data/translations';

interface CharacterConstellationProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
  onOpenKanda: (kandaId: KandaId) => void;
}

const FACTIONS: CharacterFaction[] = ['ayodhya', 'sage', 'vanara', 'lanka', 'divine'];
const W = 1600;
const H = 1200;

const FACTION_PORTRAITS: Record<CharacterFaction | 'all', string | null> = {
  all: null,
  ayodhya: '/assets/character_ram.png',
  sage: '/assets/character_vishwamitra.png',
  vanara: '/assets/character_hanuman.png',
  lanka: '/assets/character_ravana.png',
  divine: '/assets/character_valmiki.png',
};

const RELATION_TYPES: (RelationType | 'all')[] = ['all', 'family', 'ally', 'enemy', 'devotee', 'guru'];

const RELATION_PORTRAITS: Record<RelationType | 'all', string | null> = {
  all: null,
  family: '/assets/character_sita.png',
  ally: '/assets/character_sugriva.png',
  enemy: '/assets/character_ravana.png',
  devotee: '/assets/character_hanuman.png',
  guru: '/assets/character_vishwamitra.png',
};

// Deterministic radial layout: factions get angular sectors,
// members are distributed staggered on 4 concentric rings to avoid overlapping.
const LAYOUT: Record<string, { x: number; y: number }> = (() => {
  const pos: Record<string, { x: number; y: number }> = {};
  const cx = W / 2, cy = H / 2;
  FACTIONS.forEach((f, fi) => {
    const members = constellationNodes.filter(n => n.faction === f);
    const sectorMid = (fi / FACTIONS.length) * Math.PI * 2 - Math.PI / 2;
    const spread = (Math.PI * 2 / FACTIONS.length) * 0.85;
    members.forEach((n, mi) => {
      const t = members.length === 1 ? 0.5 : mi / (members.length - 1);
      const angle = sectorMid + (t - 0.5) * spread;
      // Stagger members on 4 rings to prevent overlap (O(n) spacing)
      const ringIndex = mi % 4;
      const ring = 220 + ringIndex * 115 + (members.length > 8 ? 60 : 0);
      pos[n.id] = { x: cx + Math.cos(angle) * ring, y: cy + Math.sin(angle) * ring * 0.88 };
    });
  });
  return pos;
})();

export default function CharacterConstellation({ open, isLight, onClose, onOpenKanda }: CharacterConstellationProps) {
  const { t, lang } = useT();
  const [selected, setSelected] = useState<string | null>(null);
  const [factionFilter, setFactionFilter] = useState<CharacterFaction | 'all'>('all');
  const [relationFilter, setRelationFilter] = useState<RelationType | 'all'>('all');

  // Modern Layout / Mobile Toggles
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [searchQuery, setSearchQuery] = useState('');

  // Pan & Zoom SVG State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.85);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Touch zoom helpers
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartZoom, setTouchStartZoom] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const small = window.innerWidth < 768;
    setIsMobile(touch || small);
    // The pan/zoom graph is awkward on phones — default small screens to the
    // clean directory grid, which is inherently mobile-friendly.
    if (small || touch) setViewMode('list');
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-center Graph on opening
  useEffect(() => {
    if (open && containerRef.current) {
      const el = containerRef.current;
      const cx = el.clientWidth / 2;
      const cy = el.clientHeight / 2;
      // Center the graph layout's W/2, H/2 at container center
      setPan({ x: cx - (W / 2) * 0.85, y: cy - (H / 2) * 0.85 });
      setZoom(0.85);
    }
  }, [open]);

  // Filters logic
  const visibleNodeIds = useMemo(() => {
    const set = new Set<string>();
    constellationNodes.forEach(n => {
      if (factionFilter === 'all' || n.faction === factionFilter) {
        set.add(n.id);
      }
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

  // Filtered lists for Directory / List Mode
  const listCharacters = useMemo(() => {
    return constellationNodes.filter(n => {
      const matchesSearch =
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFaction = factionFilter === 'all' || n.faction === factionFilter;
      const matchesRelation =
        relationFilter === 'all' ||
        relationshipEdges.some(
          e => (e.from === n.id || e.to === n.id) && e.type === relationFilter
        );
      return matchesSearch && matchesFaction && matchesRelation;
    });
  }, [searchQuery, factionFilter, relationFilter]);

  // Focus and Zoom on a specific node in Graph View
  const focusOnCharacter = (charId: string) => {
    const p = LAYOUT[charId];
    if (!p || !containerRef.current) return;
    const el = containerRef.current;
    const cx = el.clientWidth / 2;
    const cy = el.clientHeight / 2;
    // Set zoom to 1.15 and pan so character p is at center cx, cy
    const nextZoom = 1.15;
    setZoom(nextZoom);
    setPan({ x: cx - p.x * nextZoom, y: cy - p.y * nextZoom });
    setSelected(charId);
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== 'graph') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (viewMode !== 'graph' || !isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode !== 'graph') return;
    e.preventDefault();
    const zoomFactor = 1.1;
    const nextZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
    // Cap zoom scale
    setZoom(Math.max(0.25, Math.min(nextZoom, 4)));
  };

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode !== 'graph') return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
      setTouchStartDist(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setTouchStartZoom(zoom);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (viewMode !== 'graph') return;
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchStartDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const nextZoom = touchStartZoom * (dist / touchStartDist);
      setZoom(Math.max(0.25, Math.min(nextZoom, 4)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStartDist(null);
  };

  // Reset view helper
  const handleReset = () => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const cx = el.clientWidth / 2;
    const cy = el.clientHeight / 2;
    setZoom(0.85);
    setPan({ x: cx - (W / 2) * 0.85, y: cy - (H / 2) * 0.85 });
    setSelected(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          data-lenis-prevent
          className="fixed inset-0 z-[80] flex flex-col overflow-hidden"
          style={{
            backgroundColor: isLight ? '#f7f2ea' : '#0a0806',
            backgroundImage: isLight
              ? 'radial-gradient(circle at 50% 40%, rgba(217,164,65,0.08), rgba(247,242,234,0.96))'
              : 'radial-gradient(circle at 50% 40%, rgba(217,164,65,0.08), rgba(10,8,6,0.97))',
          }}
        >
          {/* Micro-animations and edge energy flow styles */}
          <style>{`
            @keyframes float-node {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(0.5deg); }
            }
            .floating-node {
              animation: float-node 6s ease-in-out infinite;
            }
            @keyframes pulse-dash {
              to { stroke-dashoffset: -20; }
            }
            .pulsing-edge {
              stroke-dasharray: 6 4;
              animation: pulse-dash 3s linear infinite;
            }
          `}</style>

          {/* Header */}
          <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2">
              <span className="text-[#ff7900]">✦</span>
              <span className={`font-display text-sm uppercase tracking-wider ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>{t('constellation.title')}</span>
            </div>

            {/* Controls: Search + Toggle + Reset + Close */}
            <div className="flex items-center flex-wrap gap-2.5">
              {/* Search Bar */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder={t('constellation.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-36 sm:w-48 pl-7 pr-7 py-1 rounded-full border text-[10px] font-body outline-none transition-all ${
                    isLight
                      ? 'bg-black/[0.02] border-black/10 focus:border-[#ff7900]/50 text-black/80'
                      : 'bg-white/[0.03] border-white/10 focus:border-[#ff7900]/50 text-[#f4e8d3]/80'
                  }`}
                />
                <svg className="absolute left-2.5 w-3 h-3 text-[#ff7900] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 text-[#ff7900] text-xs font-semibold hover:text-[#ff5e00]">×</button>
                )}
              </div>

              {/* View Mode Toggle */}
              {!isMobile && (
                <div className={`flex rounded-full border p-0.5 ${isLight ? 'bg-black/[0.02] border-black/10' : 'bg-white/[0.03] border-white/10'}`}>
                  <button
                    onClick={() => setViewMode('graph')}
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold font-body tracking-wider uppercase transition-all cursor-pointer ${
                      viewMode === 'graph'
                        ? 'bg-[#ff7900] text-white shadow-sm'
                        : isLight ? 'text-black/50 hover:text-black' : 'text-[#f4e8d3]/50 hover:text-[#f4e8d3]'
                    }`}
                  >
                    {t('constellation.graph')}
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold font-body tracking-wider uppercase transition-all cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#ff7900] text-white shadow-sm'
                        : isLight ? 'text-black/50 hover:text-black' : 'text-[#f4e8d3]/50 hover:text-[#f4e8d3]'
                    }`}
                  >
                    {t('constellation.list')}
                  </button>
                </div>
              )}

              {/* Reset view (only in graph mode) */}
              {viewMode === 'graph' && (
                <button
                  onClick={handleReset}
                  className={`px-2.5 py-1 rounded-full border text-[9px] font-semibold font-body tracking-wider uppercase cursor-pointer transition-all ${
                    isLight ? 'border-black/10 hover:bg-black/5 text-black/60' : 'border-white/10 hover:bg-white/5 text-[#f4e8d3]/60'
                  }`}
                  title="Reset view"
                >
                  Reset
                </button>
              )}

              {/* Close Button */}
              <button onClick={onClose} aria-label="Close" className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border ${isLight ? 'border-black/10 text-black/50 hover:text-black' : 'border-white/10 text-white/50 hover:text-white'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* Modern Tickers / Filters Bar */}
          <div className={`shrink-0 px-5 py-2.5 border-b flex flex-col gap-2.5 ${isLight ? 'bg-black/[0.01]' : 'bg-white/[0.01]'}`} style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
            {/* Factions */}
            <div className="flex items-center gap-3 overflow-hidden">
              <span className={`font-body text-[8px] uppercase tracking-widest font-bold shrink-0 w-14 ${isLight ? 'text-[#3a3229]/50' : 'text-[#f4e8d3]/45'}`}>{lang === 'hi' ? 'कुल' : 'Factions'}</span>
              <div className="flex-1 flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
                {['all', ...FACTIONS].map((f) => {
                  const isActive = factionFilter === f;
                  const hex = f === 'all' ? '#ff7900' : FACTION_META[f as CharacterFaction].hex;
                  const borderStyle = isActive
                    ? { borderColor: hex, color: hex, backgroundColor: `${hex}15` }
                    : undefined;
                  const borderClass = isActive
                    ? ''
                    : isLight
                      ? 'border-black/10 hover:border-black/25 text-black/60'
                      : 'border-white/10 hover:border-white/20 text-[#f4e8d3]/60';
                  return (
                    <button
                      key={f}
                      onClick={() => { setFactionFilter(f as CharacterFaction | 'all'); setSelected(null); }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] uppercase tracking-wider font-body font-semibold transition-all relative cursor-pointer select-none shrink-0 ${borderClass}`}
                      style={borderStyle}
                    >
                      {FACTION_PORTRAITS[f as CharacterFaction | 'all'] && (
                        <img
                          src={FACTION_PORTRAITS[f as CharacterFaction | 'all']!}
                          alt=""
                          className="w-3.5 h-3.5 rounded-full object-cover shrink-0 border"
                          style={{ borderColor: isActive ? hex : 'transparent' }}
                        />
                      )}
                      <span className="relative z-10">{f === 'all' ? t('constellation.allFactions') : FACTION_LABELS[lang][f]}</span>
                      {isActive && (
                        <motion.span
                          layoutId="active-faction"
                          className="absolute inset-0 rounded-full z-0 pointer-events-none"
                          style={{ backgroundColor: `${hex}08` }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bonds */}
            <div className="flex items-center gap-3 overflow-hidden">
              <span className={`font-body text-[8px] uppercase tracking-widest font-bold shrink-0 w-14 ${isLight ? 'text-[#3a3229]/50' : 'text-[#f4e8d3]/45'}`}>{t('constellation.bonds')}</span>
              <div className="flex-1 flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
                {RELATION_TYPES.map((r) => {
                  const isActive = relationFilter === r;
                  const hex = r === 'all' ? '#ff7900' : RELATION_META[r as RelationType].hex;
                  const borderStyle = isActive
                    ? { borderColor: hex, color: hex, backgroundColor: `${hex}15` }
                    : undefined;
                  const borderClass = isActive
                    ? ''
                    : isLight
                      ? 'border-black/10 hover:border-black/25 text-black/60'
                      : 'border-white/10 hover:border-white/20 text-[#f4e8d3]/60';
                  return (
                    <button
                      key={r}
                      onClick={() => setRelationFilter(r as RelationType | 'all')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] uppercase tracking-wider font-body font-semibold transition-all relative cursor-pointer select-none shrink-0 ${borderClass}`}
                      style={borderStyle}
                    >
                      {RELATION_PORTRAITS[r as RelationType | 'all'] && (
                        <img
                          src={RELATION_PORTRAITS[r as RelationType | 'all']!}
                          alt=""
                          className="w-3.5 h-3.5 rounded-full object-cover shrink-0 border"
                          style={{ borderColor: isActive ? hex : 'transparent' }}
                        />
                      )}
                      <span className="relative z-10">{r === 'all' ? t('constellation.allBonds') : RELATION_LABELS[lang][r]}</span>
                      {isActive && (
                        <motion.span
                          layoutId="active-bond"
                          className="absolute inset-0 rounded-full z-0 pointer-events-none"
                          style={{ backgroundColor: `${hex}08` }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1 flex min-h-0 relative">
            {/* View Mode Rendering */}
            {viewMode === 'graph' ? (
              /* Graph Mode (Draggable SVG canvas with touch gestures) */
              <div
                ref={containerRef}
                className="flex-1 min-w-0 h-full overflow-hidden relative cursor-grab active:cursor-grabbing select-none touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-full pointer-events-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Outer transformed container */}
                  <g
                    transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                    style={{ transformOrigin: '0px 0px', transition: isDragging ? 'none' : 'transform 0.15s ease-out' }}
                    className="pointer-events-auto"
                  >
                    {/* Edges */}
                    {visibleEdges.map((e, idx) => {
                      const a = LAYOUT[e.from], b = LAYOUT[e.to];
                      if (!a || !b) return null;
                      const isEdgeSelected = selected === e.from || selected === e.to;
                      const dim = connectedIds && !(connectedIds.has(e.from) && connectedIds.has(e.to));
                      const meta = RELATION_META[e.type];
                      
                      // Highlight relationships with glowing energy lines when selected
                      const isPulsing = isEdgeSelected && !dim;
                      return (
                        <line
                          key={idx} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                          stroke={meta.hex} 
                          strokeWidth={isEdgeSelected ? 2.2 : 1.2}
                          opacity={dim ? 0.05 : isEdgeSelected ? 0.9 : 0.45}
                          className={isPulsing ? 'pulsing-edge' : undefined}
                          style={{
                            transition: 'stroke-width 0.3s ease, opacity 0.3s ease',
                            filter: isEdgeSelected ? `drop-shadow(0 0 6px ${meta.hex})` : undefined
                          }}
                        />
                      );
                    })}

                    {/* Nodes */}
                    {constellationNodes
                      .filter(n => visibleNodeIds.has(n.id))
                      .map((n, mi) => {
                        const p = LAYOUT[n.id];
                        if (!p) return null;
                        const isSel = selected === n.id;
                        const dim = connectedIds ? !connectedIds.has(n.id) : false;
                        const hex = FACTION_META[n.faction].hex;
                        const r = isSel ? 36 : 26;
                        
                        // Search highlighting
                        const matchesSearch = searchQuery && n.name.toLowerCase().includes(searchQuery.toLowerCase());
                        
                        return (
                          <g
                            key={n.id}
                            transform={`translate(${p.x},${p.y})`}
                            opacity={dim ? 0.22 : 1}
                            className="cursor-pointer select-none"
                            style={{
                              transition: 'opacity 0.3s ease, transform 0.3s ease-out'
                            }}
                            onClick={() => focusOnCharacter(n.id)}
                          >
                            <g
                              className="floating-node"
                              style={{
                                animationDelay: `${(mi % 5) * 0.9}s`,
                              }}
                            >
                              <circle r={r + 6} fill={hex} opacity={isSel || matchesSearch ? 0.32 : 0.12} style={{ transition: 'r 0.3s ease' }} />
                              <clipPath id={`clip-${n.id}`}><circle r={r} style={{ transition: 'r 0.3s ease' }} /></clipPath>
                              <image
                                href={n.portrait} x={-r} y={-r} width={r * 2} height={r * 2}
                                clipPath={`url(#clip-${n.id})`}
                                preserveAspectRatio="xMidYMid slice"
                                style={{ transition: 'all 0.3s ease' }}
                              />
                              <circle r={r} fill="none" stroke={hex} strokeWidth={isSel || matchesSearch ? 3.5 : 2} style={{ transition: 'r 0.3s ease' }} />
                              <text
                                y={r + 15} textAnchor="middle"
                                className="font-body tracking-wide pointer-events-none" 
                                fontSize={isSel ? 13 : 11} 
                                fontWeight={isSel ? 700 : 500}
                                fill={isLight ? '#2b251f' : '#f4e8d3'}
                                style={{ transition: 'font-size 0.3s ease, font-weight 0.3s ease' }}
                              >
                                {n.name}
                              </text>
                            </g>
                          </g>
                        );
                      })}
                  </g>
                </svg>

                {/* Micro-Overlay Controls inside Graph */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className={`text-[9px] font-body uppercase tracking-wider px-3 py-1.5 rounded-full border ${isLight ? 'bg-white/80 border-black/10 text-black/60 shadow-sm' : 'bg-black/80 border-white/10 text-[#f4e8d3]/60 shadow-md'}`}>
                    {isMobile
                      ? (lang === 'hi' ? 'स्पर्श: खींचें · चुटकी से ज़ूम' : 'Touch: Drag to Pan · Pinch to Zoom')
                      : (lang === 'hi' ? 'माउस: खींचकर घुमाएँ · स्क्रॉल से ज़ूम' : 'Mouse: Drag to Pan · Scroll to Zoom')}
                  </div>
                </div>
              </div>
            ) : (
              /* Directory / List Mode (Mobile-Optimized Grid Directory) */
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6" data-lenis-prevent>
                {listCharacters.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
                    <span className="text-3xl opacity-20">🔍</span>
                    <p className={`font-body text-xs ${isLight ? 'text-black/50' : 'text-white/50'}`}>No characters match your current filters or search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-28">
                    {listCharacters.map((n) => {
                      const isSel = selected === n.id;
                      const hex = FACTION_META[n.faction].hex;
                      return (
                        <div
                          key={n.id}
                          onClick={() => setSelected(isSel ? null : n.id)}
                          className={`premium-modern-card p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                            isLight
                              ? 'bg-white/80 border-black/[0.06] hover:bg-white'
                              : 'bg-[#14110b]/60 border-white/[0.04] hover:bg-[#14110b]'
                          }`}
                          style={{
                            borderColor: isSel ? hex : undefined,
                            boxShadow: isSel ? `0 0 16px ${hex}20` : undefined,
                          }}
                        >
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 mb-2" style={{ borderColor: hex }}>
                            <Image src={n.portrait} alt={n.name} fill sizes="56px" className="object-cover object-top" />
                          </div>
                          <h4 className={`font-display text-[10px] uppercase font-bold tracking-wider leading-snug ${isLight ? 'text-black' : 'text-[#f4e8d3]'}`}>{n.name}</h4>
                          <p className="font-body text-[8px] uppercase tracking-widest mt-0.5 font-medium" style={{ color: hex }}>{n.role}</p>
                          <p className={`font-body text-[9px] leading-relaxed line-clamp-2 mt-2 ${isLight ? 'text-black/50' : 'text-white/45'}`}>
                            {n.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Detail sidebar (Responsive: absolute drawer on mobile, static on desktop) */}
            <AnimatePresence>
              {detail && (
                <motion.aside
                  initial={{ x: 280, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: 280, opacity: 0 }}
                  transition={{ type: 'spring', damping: 30, stiffness: 320 }}
                  className={`fixed md:relative right-0 top-0 bottom-0 z-30 w-full max-w-[280px] border-l overflow-y-auto ${
                    isLight 
                      ? 'bg-[#faf6f0]/95 border-black/10 text-[#2b251f]' 
                      : 'bg-[#0a0907]/95 border-white/10 text-[#f4e8d3]'
                  } backdrop-blur-md shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col`}
                >
                  {/* Close button in details sidebar */}
                  <button 
                    onClick={() => setSelected(null)} 
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer bg-black/40 border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative h-44 shrink-0">
                    <Image src={detail.portrait} alt={detail.name} fill sizes="280px" className="object-cover object-top" style={{ filter: 'brightness(0.7)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-[#faf6f0]' : 'from-[#0a0907]'} to-transparent`} />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                      <div>
                        <h3 className={`font-display text-base uppercase tracking-wide ${isLight ? 'text-[#1c1814]' : 'text-[#f4e8d3]'}`}>{detail.name}</h3>
                        <p className="font-body text-[9px] uppercase tracking-wider font-semibold" style={{ color: FACTION_META[detail.faction].hex }}>{detail.role}</p>
                      </div>
                      <BookmarkButton entry={{ type: 'character', kandaId: detail.kandas[0], refId: detail.id }} isLight={isLight} />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1 overscroll-contain" data-lenis-prevent>
                    <p className={`font-body text-xs leading-relaxed ${isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/65'}`}>{detail.description}</p>

                    {/* Faction Badge */}
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[8px] uppercase tracking-widest opacity-45">{lang === 'hi' ? 'कुल:' : 'Faction:'}</span>
                      <span className="font-body text-[8px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full border" style={{ color: FACTION_META[detail.faction].hex, borderColor: `${FACTION_META[detail.faction].hex}40`, background: `${FACTION_META[detail.faction].hex}10` }}>
                        {FACTION_LABELS[lang][detail.faction]}
                      </span>
                    </div>

                    {/* Book Appearances */}
                    <div className="flex flex-col gap-1.5">
                      <p className={`font-body text-[8px] uppercase tracking-widest opacity-45`}>{t('constellation.appearsIn')}</p>
                      <div className="flex flex-wrap gap-1">
                        {detail.kandas.map((k) => (
                          <button
                            key={k}
                            onClick={() => { onOpenKanda(k); onClose(); }}
                            className={`font-body text-[8px] uppercase tracking-wider px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                              isLight
                                ? 'border-black/10 hover:border-[#ff7900]/50 hover:bg-[#ff7900]/5 text-black/75'
                                : 'border-white/10 hover:border-[#ff7900]/50 hover:bg-[#ff7900]/5 text-[#f4e8d3]/85'
                            }`}
                          >
                            {k}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Relationships / Bonds */}
                    <div>
                      <p className={`font-body text-[8px] uppercase tracking-widest mb-2 opacity-45`}>{t('constellation.bonds')}</p>
                      <div className="flex flex-col gap-1.5">
                        {relationshipEdges.filter(e => e.from === detail.id || e.to === detail.id).map((e, idx) => {
                          const otherId = e.from === detail.id ? e.to : e.from;
                          const other = nodeById[otherId];
                          if (!other) return null;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (viewMode === 'graph') {
                                  focusOnCharacter(otherId);
                                } else {
                                  setSelected(otherId);
                                }
                              }}
                              className={`flex items-center justify-between gap-2 text-left rounded-lg px-2 py-1.5 cursor-pointer transition-colors ${
                                isLight ? 'hover:bg-black/[0.03] text-black' : 'hover:bg-white/[0.04] text-white'
                              }`}
                            >
                              <span className={`font-body text-[10px] ${isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]/85'}`}>{other.name}</span>
                              <span className="font-body text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: RELATION_META[e.type].hex, background: `${RELATION_META[e.type].hex}12` }}>
                                {e.label ?? RELATION_LABELS[lang][e.type]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
