// ============================================================
//  EventCard — A single timeline event row (node + card)
//  Extracted from JourneyPage. Behaviour-preserving.
//  Hardcoded special cases delegated to special/* components.
// ============================================================
'use client';
import React from 'react';
import type { KandaSection, TimelineEvent } from '@/data/types';
import TimelineNode from './TimelineNode';
import DeepotsavCard from '../special/DeepotsavCard';
import MandirCard from '../special/MandirCard';
import GarbhagrihaCard from '../special/GarbhagrihaCard';
import BookmarkButton from '../interactive/BookmarkButton';
import { useT } from '@/hooks/useT';

interface EventCardProps {
  event: TimelineEvent;
  kanda: KandaSection;
  idx: number;
  isLight: boolean;
  isMobile: boolean;
  // Special-case state (ram-mandir / garbhagriha)
  isNightMode: boolean;
  setIsNightMode: (night: boolean) => void;
  lallaOutfit: string;
  setLallaOutfit: (outfit: string) => void;
}

export default function EventCard({
  event,
  kanda,
  idx,
  isLight,
  isMobile,
  isNightMode,
  setIsNightMode,
  lallaOutfit,
  setLallaOutfit,
}: EventCardProps) {
  const { t } = useT();
  const isEven = idx % 2 === 0;

  return (
    <div
      className={`flex flex-col md:flex-row w-full items-center relative ${
        isEven ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Timeline Node */}
      {!isMobile && <TimelineNode accentHex={kanda.accentHex} />}

      {/* Event Card */}
      <div className={`w-full ${isMobile ? 'md:w-full pl-0' : 'md:w-[45%] pl-10 md:pl-0'}`}>
        <div
          data-accent={kanda.accentHex}
          className="timeline-event-card premium-modern-card flex flex-col gap-0 pointer-events-auto select-text overflow-hidden"
        >
          {/* Hero image section */}
          <div className="relative h-40 md:h-48 overflow-hidden">
            <img
              src={event.id === 'ram-mandir' && isNightMode ? '/assets/bg_temple_night.png' : event.media.hero}
              alt={event.title}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.55) saturate(1.15)' }}
            />
            {/* Parallax foreground if exists */}
            {event.media.parallaxFg && (
              <img
                src={event.media.parallaxFg}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
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
                ◈ {t('timeline.turningPoint')}
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
            {event.id === 'new-ayodhya' && <DeepotsavCard />}

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
              <div className="shrink-0">
                <BookmarkButton
                  entry={{ type: 'event', kandaId: kanda.id, refId: event.id }}
                  isLight={isLight}
                  sizeClass="h-3.5 w-3.5"
                />
              </div>
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
                &quot;{event.quote}&quot;
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
              <MandirCard isLight={isLight} isNightMode={isNightMode} setIsNightMode={setIsNightMode} />
            )}

            {/* Garbhagriha Ram Lalla switcher */}
            {event.id === 'garbhagriha' && (
              <GarbhagrihaCard isLight={isLight} lallaOutfit={lallaOutfit} setLallaOutfit={setLallaOutfit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
