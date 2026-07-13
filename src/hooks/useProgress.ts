// ============================================================
//  useProgress — Journey progress persistence (localStorage)
//  Saves and restores user's position in the timeline.
// ============================================================
'use client';
import { useState, useEffect, useCallback } from 'react';
import type { KandaId } from '@/data/types';

export interface JourneyProgress {
  view: 'lifeline' | 'mandir' | 'characters';
  kandaId: KandaId;
  mobileIndex: number;
  savedAt: number;
}

const STORAGE_KEY = 'avataran-journey-progress';

interface UseProgressReturn {
  savedProgress: JourneyProgress | null;
  showResumePrompt: boolean;
  saveProgress: (progress: Omit<JourneyProgress, 'savedAt'>) => void;
  clearProgress: () => void;
  dismissPrompt: () => void;
}

export function useProgress(): UseProgressReturn {
  const [savedProgress, setSavedProgress] = useState<JourneyProgress | null>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: JourneyProgress = JSON.parse(raw);
      const ageMs = Date.now() - parsed.savedAt;
      // Only show resume prompt if saved within 7 days
      if (ageMs < 7 * 24 * 60 * 60 * 1000) {
        setSavedProgress(parsed);
        setShowResumePrompt(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveProgress = useCallback((progress: Omit<JourneyProgress, 'savedAt'>) => {
    const full: JourneyProgress = { ...progress, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  }, []);

  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedProgress(null);
    setShowResumePrompt(false);
  }, []);

  const dismissPrompt = useCallback(() => {
    setShowResumePrompt(false);
  }, []);

  return { savedProgress, showResumePrompt, saveProgress, clearProgress, dismissPrompt };
}
