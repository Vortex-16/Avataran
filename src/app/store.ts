import { create } from 'zustand';
import type { BookmarkEntry } from '@/data/types';
import type { Lang } from '@/data/translations';

const LANG_KEY = 'avataran-lang';

export type QualityTier = 'high' | 'balanced' | 'lightweight';
export type KandaId = 'bala' | 'ayodhya' | 'aranya' | 'kishkindha' | 'sundara' | 'yuddha' | 'uttara' | 'ayodhya-mandir';

// ── Interactive features (Phase 1C) ─────────────────────────
export type OverlayName = 'none' | 'search' | 'quiz' | 'constellation' | 'bookmarks' | 'reading' | 'reels' | 'chat' | 'about';
export type QuizMode = 'kanda' | 'daily' | 'grand';

export interface QuizStats {
  dailyStreak: number;
  lastDailyISO: string | null;
  dailyBest: number;
  bestByKanda: Record<string, { score: number; total: number }>;
}

const BOOKMARKS_KEY = 'avataran-bookmarks';
const QUIZ_KEY = 'avataran-quiz-stats';

const emptyQuizStats: QuizStats = { dailyStreak: 0, lastDailyISO: null, dailyBest: 0, bestByKanda: {} };

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota / private mode */ }
}

/** Local calendar date as YYYY-MM-DD. */
function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isYesterday(iso: string | null): boolean {
  if (!iso) return false;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yISO = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
  return iso === yISO;
}

/** Stable id for a bookmark from its target. */
export function bookmarkId(type: BookmarkEntry['type'], refId: string): string {
  return `${type}:${refId}`;
}
export type LocationId = 'ayodhya-gate' | 'departure-road' | 'river-crossing' | 'forest-threshold' | 'saryu-river' | 'ram-mandir' | 'garbhagriha' | string; // extensible
export type EmotionalState = 'peace' | 'tension' | 'separation' | 'empty' | 'aftermath' | 'neutral';
export type TimeOfDay = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';
export type WeatherState = 'clear' | 'mist' | 'rain' | 'storm';

export interface WorldState {
  kanda: KandaId | null; // null during hero film
  location: LocationId | null;
  emotionalState: EmotionalState;
  timeOfDay: TimeOfDay;
  weather: WeatherState;
  damageLevel: number;
}

interface ExperienceState {
  isReady: boolean;
  soundConsentGiven: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  qualityTier: QualityTier;
  
  activeScene: string; // Legacy field, keeping temporarily for backwards compatibility
  
  storyProgress: number;
  heroComplete: boolean;
  
  activeMusicTrack: string;
  isDynamicIslandOpen: boolean;
  
  // New Living World State
  worldState: WorldState;
  
  // Actions
  setReady: (ready: boolean) => void;
  setSoundConsentGiven: (given: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setQualityTier: (tier: QualityTier) => void;
  setActiveScene: (scene: string) => void;
  setStoryProgress: (progress: number) => void;
  setHeroComplete: (complete: boolean) => void;
  setActiveMusicTrack: (track: string) => void;
  setIsDynamicIslandOpen: (open: boolean) => void;
  
  setWorldState: (newState: Partial<WorldState>) => void;

  // ── Interactive features (Phase 1C) ──
  bookmarks: BookmarkEntry[];
  quizStats: QuizStats;
  activeOverlay: OverlayName;
  quizMode: QuizMode;
  quizKandaId: KandaId | null;
  readingKandaId: KandaId | null;

  hydrateInteractive: () => void;
  addBookmark: (entry: Omit<BookmarkEntry, 'id' | 'savedAt'>) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (entry: Omit<BookmarkEntry, 'id' | 'savedAt'>) => void;
  clearBookmarks: () => void;
  recordKandaQuiz: (kandaId: string, score: number, total: number) => void;
  recordDailyChallenge: (correct: boolean) => void;
  openOverlay: (name: Exclude<OverlayName, 'none'>) => void;
  closeOverlay: () => void;
  openQuiz: (mode: QuizMode, kandaId?: KandaId | null) => void;
  openReading: (kandaId: KandaId) => void;

  // ── Language (i18n) ──
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;

  // ── Firebase Auth ──
  user: FirebaseUser | null;
  authLoading: boolean;
  setUser: (user: FirebaseUser | null) => void;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

export interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export const useStore = create<ExperienceState>((set) => ({
  isReady: false,
  soundConsentGiven: false,
  soundEnabled: false,
  reducedMotion: false,
  qualityTier: 'high',
  activeScene: 'hero',
  storyProgress: 0,
  heroComplete: false,
  activeMusicTrack: '/audio/initial.mp3',
  isDynamicIslandOpen: false,
  
  worldState: {
    kanda: null,
    location: null,
    emotionalState: 'neutral',
    timeOfDay: 'dawn',
    weather: 'clear',
    damageLevel: 0
  },

  setReady: (ready) => set({ isReady: ready }),
  setSoundConsentGiven: (given) => set({ soundConsentGiven: given }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setActiveScene: (scene) => set({ activeScene: scene }),
  setStoryProgress: (progress) => set({ storyProgress: progress }),
  setHeroComplete: (complete) => set({ heroComplete: complete }),
  setActiveMusicTrack: (track) => set({ activeMusicTrack: track }),
  setIsDynamicIslandOpen: (open) => set({ isDynamicIslandOpen: open }),
  
  setWorldState: (newState) => set((state) => ({
    worldState: { ...state.worldState, ...newState }
  })),

  // ── Interactive features (Phase 1C) ──
  bookmarks: [],
  quizStats: emptyQuizStats,
  activeOverlay: 'none',
  quizMode: 'kanda',
  quizKandaId: null,
  readingKandaId: null,

  hydrateInteractive: () => set({
    bookmarks: loadJSON<BookmarkEntry[]>(BOOKMARKS_KEY, []),
    quizStats: loadJSON<QuizStats>(QUIZ_KEY, emptyQuizStats),
    lang: (typeof window !== 'undefined' && (localStorage.getItem(LANG_KEY) as Lang)) || 'en',
  }),

  addBookmark: (entry) => set((state) => {
    const id = bookmarkId(entry.type, entry.refId);
    if (state.bookmarks.some(b => b.id === id)) return state;
    const next = [{ ...entry, id, savedAt: Date.now() }, ...state.bookmarks];
    saveJSON(BOOKMARKS_KEY, next);
    return { bookmarks: next };
  }),

  removeBookmark: (id) => set((state) => {
    const next = state.bookmarks.filter(b => b.id !== id);
    saveJSON(BOOKMARKS_KEY, next);
    return { bookmarks: next };
  }),

  toggleBookmark: (entry) => set((state) => {
    const id = bookmarkId(entry.type, entry.refId);
    const exists = state.bookmarks.some(b => b.id === id);
    const next = exists
      ? state.bookmarks.filter(b => b.id !== id)
      : [{ ...entry, id, savedAt: Date.now() }, ...state.bookmarks];
    saveJSON(BOOKMARKS_KEY, next);
    return { bookmarks: next };
  }),

  clearBookmarks: () => { saveJSON(BOOKMARKS_KEY, []); set({ bookmarks: [] }); },

  recordKandaQuiz: (kandaId, score, total) => set((state) => {
    const prev = state.quizStats.bestByKanda[kandaId];
    if (prev && prev.score >= score) return state;
    const stats: QuizStats = {
      ...state.quizStats,
      bestByKanda: { ...state.quizStats.bestByKanda, [kandaId]: { score, total } },
    };
    saveJSON(QUIZ_KEY, stats);
    return { quizStats: stats };
  }),

  recordDailyChallenge: (correct) => set((state) => {
    const today = todayISO();
    if (state.quizStats.lastDailyISO === today) return state; // already played today
    const streak = correct ? (isYesterday(state.quizStats.lastDailyISO) ? state.quizStats.dailyStreak + 1 : 1) : 0;
    const stats: QuizStats = {
      ...state.quizStats,
      dailyStreak: streak,
      dailyBest: Math.max(state.quizStats.dailyBest, streak),
      lastDailyISO: today,
    };
    saveJSON(QUIZ_KEY, stats);
    return { quizStats: stats };
  }),

  openOverlay: (name) => set({ activeOverlay: name }),
  closeOverlay: () => set({ activeOverlay: 'none' }),
  openQuiz: (mode, kandaId = null) => set({ activeOverlay: 'quiz', quizMode: mode, quizKandaId: kandaId }),
  openReading: (kandaId) => set({ activeOverlay: 'reading', readingKandaId: kandaId }),

  // ── Language (i18n) ──
  lang: 'en',
  setLang: (lang) => {
    if (typeof window !== 'undefined') { try { localStorage.setItem(LANG_KEY, lang); } catch { /* noop */ } }
    set({ lang });
  },
  toggleLang: () => set((state) => {
    const next: Lang = state.lang === 'en' ? 'hi' : 'en';
    if (typeof window !== 'undefined') { try { localStorage.setItem(LANG_KEY, next); } catch { /* noop */ } }
    return { lang: next };
  }),

  // ── Firebase Auth ──
  user: null,
  authLoading: true,
  setUser: (user) => set({ user, authLoading: false }),
  signInWithGoogle: async () => {
    const { signInWithPopup } = await import('firebase/auth');
    const { auth, googleProvider } = await import('@/lib/firebase');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Firebase Google sign-in failed:', err);
    }
  },
  signOutUser: async () => {
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('@/lib/firebase');
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Firebase sign-out failed:', err);
    }
  },
}));
