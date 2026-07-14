// ============================================================
//  BookmarkButton — heart toggle for verses / events / chars
//  Persists via the zustand store (localStorage-backed).
// ============================================================
'use client';
import React from 'react';
import { useStore, bookmarkId } from '@/app/store';
import type { BookmarkEntry } from '@/data/types';

interface BookmarkButtonProps {
  entry: Omit<BookmarkEntry, 'id' | 'savedAt'>;
  isLight?: boolean;
  /** Tailwind size class for the icon, default h-4 w-4 */
  sizeClass?: string;
  className?: string;
  stopPropagation?: boolean;
}

export default function BookmarkButton({
  entry,
  isLight = false,
  sizeClass = 'h-4 w-4',
  className = '',
  stopPropagation = true,
}: BookmarkButtonProps) {
  const bookmarks = useStore(s => s.bookmarks);
  const toggleBookmark = useStore(s => s.toggleBookmark);
  const active = bookmarks.some(b => b.id === bookmarkId(entry.type, entry.refId));

  return (
    <button
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        toggleBookmark(entry);
      }}
      aria-label={active ? 'Remove bookmark' : 'Save bookmark'}
      aria-pressed={active}
      className={`shrink-0 inline-flex items-center justify-center rounded-full p-1.5 transition-all duration-200 cursor-pointer border ${
        active
          ? 'border-[#ff7900]/50 text-[#ff7900] bg-[#ff7900]/10'
          : isLight
            ? 'border-black/10 text-black/40 hover:text-[#ff7900] hover:border-[#ff7900]/40'
            : 'border-white/10 text-[#f4e8d3]/40 hover:text-[#ff7900] hover:border-[#ff7900]/40'
      } ${className}`}
    >
      <svg className={sizeClass} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
