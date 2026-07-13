// ============================================================
//  AVATARAN — timelineData.ts  [BACKWARD COMPAT SHIM]
//
//  ⚠️  This file is now a re-export shim.
//  Data has been moved to:  src/data/types.ts + src/data/kanda/*.ts
//
//  All existing imports from './timelineData' continue to work:
//    import { timelineData } from './timelineData'          ✅
//    import { KandaSection, TimelineEvent } from './timelineData'  ✅
//    import type { MediaSet } from './timelineData'         ✅
//
//  To import the split kanda data directly, use:
//    import { balaKanda } from '@/data/kanda/bala'
//    import { timelineData } from '@/data'
// ============================================================

export type {
  MediaSet,
  CharacterRef,
  LocationCard,
  WeaponEntry,
  DialogueEntry,
  GalleryItem,
  SourceRef,
  TimelineEvent,
  KandaSection,
  KandaId,
  VerseEntry,
  VerseTag,
  KandaVerseDB,
  BookmarkEntry,
  QuizQuestion,
} from '@/data/types';

export { timelineData } from '@/data';
