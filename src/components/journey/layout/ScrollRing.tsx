// ============================================================
//  ScrollRing — Mobile circular scroll-progress + scroll-to-top
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';

interface ScrollRingProps {
  isLight: boolean;
  /** Scroll progress 0–100 */
  progress: number;
}

export default function ScrollRing({ isLight, progress }: ScrollRingProps) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-6 z-[45] p-1 rounded-full border backdrop-blur-md transition-all duration-300 shadow-md flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none ${
        isLight
          ? 'bg-white/80 border-black/10 text-[#ff7900] hover:bg-white'
          : 'bg-[#14110b]/80 border-[#d05c43]/20 text-[#ff7900] hover:border-[#d05c43]/50'
      }`}
      aria-label="Scroll to top and progress"
      style={{ width: '36px', height: '36px' }}
    >
      {/* SVG Circular Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5" viewBox="0 0 36 36">
        {/* Background circle */}
        <path
          className={isLight ? 'text-black/[0.05]' : 'text-white/[0.05]'}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* Foreground circle (progress indicator) */}
        <path
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={`${progress}, 100`}
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{
            color: '#ff7900',
            transition: 'stroke-dasharray 300ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </svg>

      {/* Up arrow icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
