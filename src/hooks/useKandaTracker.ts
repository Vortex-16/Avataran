// ============================================================
//  useKandaTracker — GSAP ScrollTrigger active-kanda detection
//  Desktop-only (matches original behaviour): watches which
//  kanda section is in view, animates the glow line, and reveals
//  event cards via ScrollTrigger.batch (O(1) vs O(n) triggers).
//  On mobile it is a no-op so cards render at native speed.
// ============================================================
'use client';
import { useEffect, RefObject } from 'react';
import type { KandaSection, KandaId } from '@/data/types';

interface UseKandaTrackerOptions {
  kandas: KandaSection[];
  containerRef: RefObject<HTMLElement | null>;
  onKandaChange: (kandaId: KandaId) => void;
  isMobile: boolean;
  /** Optional refs for the desktop glow-line scrub animation. */
  glowLineRef?: RefObject<HTMLElement | null>;
  timelinePathRef?: RefObject<HTMLElement | null>;
}

export function useKandaTracker({
  kandas,
  containerRef,
  onKandaChange,
  isMobile,
  glowLineRef,
  timelinePathRef,
}: UseKandaTrackerOptions): void {
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    let gsap: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    let triggers: ReturnType<typeof ScrollTrigger.create>[] = [];
    let cancelled = false;

    const init = async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ── Glow line scroll-linked fill ──────────────────────
      if (glowLineRef?.current && timelinePathRef?.current) {
        gsap.fromTo(
          glowLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelinePathRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }

      // ── Active-kanda section watchers ─────────────────────
      kandas.forEach((kanda) => {
        const el = document.getElementById(`section-${kanda.id}`);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => onKandaChange(kanda.id),
          onEnterBack: () => onKandaChange(kanda.id),
        });
        triggers.push(trigger);
      });

      // ── Event-card reveal (batched) ───────────────────────
      ScrollTrigger.batch('.timeline-event-card', {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            scale: 1.03,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
          }),
        onLeave: (batch) =>
          gsap.to(batch, { opacity: 0.25, scale: 0.93, duration: 0.3 }),
        onEnterBack: (batch) =>
          gsap.to(batch, { opacity: 1, scale: 1.03, y: 0, duration: 0.4 }),
        start: 'top 90%',
        batchMax: 10,
      });
    };

    init();

    return () => {
      cancelled = true;
      triggers.forEach(t => t.kill());
      triggers = [];
    };
  }, [kandas, isMobile, containerRef, onKandaChange, glowLineRef, timelinePathRef]);
}
