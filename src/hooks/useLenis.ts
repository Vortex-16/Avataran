// ============================================================
//  useLenis — Smooth scroll initialization + state
//  Exposes the lenis instance and scroll progress.
// ============================================================
'use client';
import { useEffect, useRef, MutableRefObject } from 'react';

interface LenisInstance {
  destroy: () => void;
  on: (event: string, cb: (e: { progress: number }) => void) => void;
  scrollTo: (target: number | string | HTMLElement, opts?: object) => void;
}

interface UseLenisReturn {
  lenisRef: MutableRefObject<LenisInstance | null>;
}

export function useLenis(
  onProgress?: (progress: number) => void
): UseLenisReturn {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let lenis: LenisInstance | null = null;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        lerp: 0.07,
        smoothWheel: true,
        touchMultiplier: 1.5,
        prevent: (node: HTMLElement) => {
          return (
            node.hasAttribute('data-lenis-prevent') ||
            Boolean(node.closest?.('[data-lenis-prevent]'))
          );
        },
      }) as unknown as LenisInstance;

      lenisRef.current = lenis;

      if (onProgress) {
        lenis.on('scroll', (e: { progress: number }) => onProgress(e.progress));
      }

      const animate = (time: number) => {
        // Lenis RAF loop
        (lenis as any)?.raf?.(time);
        rafId = requestAnimationFrame(animate);
      };
      let rafId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        lenisRef.current = null;
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then(fn => fn?.());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { lenisRef };
}
