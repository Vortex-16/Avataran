// ============================================================
//  useKandaTracker — GSAP ScrollTrigger active kanda detection
//  Watches which kanda section is in the viewport and
//  reports the active kanda ID + mobile chapter index.
// ============================================================
'use client';
import { useEffect, RefObject } from 'react';
import type { KandaSection } from '@/data/types';
import type { KandaId } from '@/data/types';

interface UseKandaTrackerOptions {
  kandas: KandaSection[];
  containerRef: RefObject<HTMLElement | null>;
  onKandaChange: (kandaId: KandaId) => void;
  onMobileIndexChange?: (index: number) => void;
  isMobile: boolean;
}

export function useKandaTracker({
  kandas,
  containerRef,
  onKandaChange,
  onMobileIndexChange,
  isMobile,
}: UseKandaTrackerOptions): void {
  useEffect(() => {
    if (!containerRef.current) return;

    let gsap: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    let triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    const init = async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      kandas.forEach((kanda, i) => {
        const el = document.getElementById(`section-${kanda.id}`);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            onKandaChange(kanda.id);
            if (isMobile) onMobileIndexChange?.(i);
          },
          onEnterBack: () => {
            onKandaChange(kanda.id);
            if (isMobile) onMobileIndexChange?.(i);
          },
        });
        triggers.push(trigger);
      });

      // Use ScrollTrigger.batch for card animations (O(1) vs O(n) triggers)
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
      triggers.forEach(t => t.kill());
      triggers = [];
    };
  }, [kandas, isMobile, containerRef, onKandaChange, onMobileIndexChange]);
}
