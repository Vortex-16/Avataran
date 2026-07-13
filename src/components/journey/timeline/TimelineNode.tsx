// ============================================================
//  TimelineNode — The dot marker on the vertical timeline line
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';

interface TimelineNodeProps {
  accentHex: string;
}

export default function TimelineNode({ accentHex }: TimelineNodeProps) {
  return (
    <div
      className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0907] border-2 z-20 pointer-events-none shadow-[0_0_10px_rgba(217,164,65,0.5)]"
      style={{ borderColor: accentHex }}
    />
  );
}
