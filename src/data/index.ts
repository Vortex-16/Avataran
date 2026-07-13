// ============================================================
//  AVATARAN — Data Index (Barrel Export)
//  Single import point for all kanda data.
//
//  BACKWARD COMPATIBLE:
//    import { timelineData } from '@/data'                 ✅
//    import { timelineData, KandaSection } from '@/data'   ✅
//    import { balaKanda } from '@/data/kanda/bala'          ✅ (new)
// ============================================================

// Re-export all types for convenience
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

// Re-export individual kanda exports (for lazy loading)
export { balaKanda } from '@/data/kanda/bala';
export { ayodhyaKanda } from '@/data/kanda/ayodhya';
export { aranyaKanda } from '@/data/kanda/aranya';
export { kishkindhaKanda } from '@/data/kanda/kishkindha';
export { sundaraKanda } from '@/data/kanda/sundara';
export { yuddhaKanda } from '@/data/kanda/yuddha';
export { uttaraKanda } from '@/data/kanda/uttara';
export { ayodhyaMandirKanda } from '@/data/kanda/ayodhya-mandir';

// ── Primary export: timelineData (BACKWARD COMPATIBLE) ──────
// This is the same array name used everywhere in the existing codebase.
// All existing imports like:
//   import { timelineData } from './timelineData'
// will continue to work via the timelineData.ts shim.

import { balaKanda } from '@/data/kanda/bala';
import { ayodhyaKanda } from '@/data/kanda/ayodhya';
import { aranyaKanda } from '@/data/kanda/aranya';
import { kishkindhaKanda } from '@/data/kanda/kishkindha';
import { sundaraKanda } from '@/data/kanda/sundara';
import { yuddhaKanda } from '@/data/kanda/yuddha';
import { uttaraKanda } from '@/data/kanda/uttara';
import { ayodhyaMandirKanda } from '@/data/kanda/ayodhya-mandir';
import type { KandaSection } from '@/data/types';

/** The complete ordered array of all 8 kanda sections.
 *  Identical shape to the original timelineData export.
 *  Index 0–6 = 7 canonical Kandas, Index 7 = Ayodhya Mandir modern chapter. */
export const timelineData: KandaSection[] = [
  balaKanda,
  ayodhyaKanda,
  aranyaKanda,
  kishkindhaKanda,
  sundaraKanda,
  yuddhaKanda,
  uttaraKanda,
  ayodhyaMandirKanda,
];
