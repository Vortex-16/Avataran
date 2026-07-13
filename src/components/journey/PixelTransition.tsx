'use client';

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface PixelTransitionProps {
  src: string;
  alt: string;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
}

export default function PixelTransition({
  src,
  alt,
  gridSize = 12,
  pixelColor = "#ff7900",
  animationStepDuration = 0.3,
  className = "",
}: PixelTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const prevSrcRef = useRef<string>(src);

  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [nextSrc, setNextSrc] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Generate pixel grid on mount or when gridSize/pixelColor changes
  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel-transition__pixel");
        pixel.classList.add("absolute", "hidden");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  // Trigger transition when src changes
  useEffect(() => {
    if (src === prevSrcRef.current) return;

    prevSrcRef.current = src;
    setNextSrc(src);
    setIsTransitioning(true);

    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) {
      setCurrentSrc(src);
      setIsTransitioning(false);
      return;
    }

    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(
      ".pixel-transition__pixel"
    );
    if (!pixels.length) {
      setCurrentSrc(src);
      setIsTransitioning(false);
      return;
    }

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    // Reset pixels
    gsap.set(pixels, { display: "none" });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    // Phase 1: Reveal pixel blocks randomly to cover the image
    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });

    // Phase 2: Swap the image and hide the pixel blocks randomly
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      setCurrentSrc(src);
      
      gsap.to(pixels, {
        display: "none",
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
        onComplete: () => {
          setIsTransitioning(false);
        }
      });
    });

    return () => {
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
      }
      gsap.killTweensOf(pixels);
    };
  }, [src, animationStepDuration]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <img
        src={currentSrc}
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[1000ms] ease-out"
      />

      {/* Preload next image in background */}
      {isTransitioning && nextSrc && (
        <img
          src={nextSrc}
          alt=""
          className="hidden"
          aria-hidden="true"
        />
      )}

      {/* Pixel Grid Overlay */}
      <div
        ref={pixelGridRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
      />
    </div>
  );
}
