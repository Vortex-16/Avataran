// ============================================================
//  AVATARAN — Verses Barrel (per-Kanda verse databases)
//  Single import point for all curated shloka databases.
//
//  Usage:
//    import { verseDatabases, getVersesByKanda } from '@/data/verses'
//    import { balaVerses } from '@/data/verses'
// ============================================================
import type { KandaVerseDB, VerseEntry, KandaId } from '@/data/types';

import { balaVerses } from './bala-verses';
import { ayodhyaVerses } from './ayodhya-verses';
import { aranyaVerses } from './aranya-verses';
import { kishkindhaVerses } from './kishkindha-verses';
import { sundaraVerses } from './sundara-verses';
import { yuddhaVerses } from './yuddha-verses';
import { uttaraVerses } from './uttara-verses';

export {
  balaVerses,
  ayodhyaVerses,
  aranyaVerses,
  kishkindhaVerses,
  sundaraVerses,
  yuddhaVerses,
  uttaraVerses,
};

/** All seven canonical verse databases, in Kanda order. */
export const verseDatabases: KandaVerseDB[] = [
  balaVerses,
  ayodhyaVerses,
  aranyaVerses,
  kishkindhaVerses,
  sundaraVerses,
  yuddhaVerses,
  uttaraVerses,
];

/** Fast lookup by kanda id. */
export const verseDatabaseByKanda: Partial<Record<KandaId, KandaVerseDB>> =
  Object.fromEntries(verseDatabases.map(db => [db.kandaId, db])) as Partial<Record<KandaId, KandaVerseDB>>;

/** Return the verse database for a given Kanda (or undefined). */
export function getVerseDB(kandaId: KandaId): KandaVerseDB | undefined {
  return verseDatabaseByKanda[kandaId];
}

/** Return all verses for a given Kanda (empty array if none). */
export function getVersesByKanda(kandaId: KandaId): VerseEntry[] {
  return verseDatabaseByKanda[kandaId]?.verses ?? [];
}

/** Flattened list of every curated verse across all Kandas. */
export const allVerses: VerseEntry[] = verseDatabases.flatMap(db => db.verses);

/** Verses linked to a specific timeline event id. */
export function getVersesByEvent(eventId: string): VerseEntry[] {
  return allVerses.filter(v => v.eventId === eventId);
}

/** Total count of curated verses currently in the corpus. */
export const totalCuratedVerses = allVerses.length;
