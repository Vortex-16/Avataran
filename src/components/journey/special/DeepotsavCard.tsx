// ============================================================
//  DeepotsavCard — Animated drifting diyas overlay
//  Special-case renderer for the 'new-ayodhya' event.
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';

export default function DeepotsavCard() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0 opacity-30">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-[-20px] w-2 h-1.5 rounded-full animate-diya-drift"
          style={{
            left: `${15 + i * 11}%`,
            animationDelay: `${i * 1.6}s`,
            animationDuration: `${5 + i * 1.5}s`,
            background: '#ff5e00',
            filter: 'blur(1px)',
            boxShadow: '0 0 8px #ff5e00, 0 0 16px #ff7900',
          }}
        />
      ))}
    </div>
  );
}
