import { create } from 'zustand';

export type QualityTier = 'high' | 'balanced' | 'lightweight';
export type KandaId = 'bala' | 'ayodhya' | 'aranya' | 'kishkindha' | 'sundara' | 'yuddha' | 'uttara' | 'ayodhya-mandir';
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
}));
