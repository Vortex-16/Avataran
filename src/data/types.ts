// ============================================================
//  AVATARAN — Unified Type System (LLD-Expert Architecture)
//  Single source of truth for ALL interfaces.
//  ⚠️  BACKWARD COMPATIBLE: all original fields preserved.
//      New fields added as OPTIONAL (?) to prevent breakage.
// ============================================================

// ── Core Media & Content ────────────────────────────────────

export interface MediaSet {
  hero: string;
  background: string;
  thumbnail?: string;
  parallaxFg?: string;
  parallaxMid?: string;
}

export interface CharacterRef {
  name: string;
  role: string;
  weapon?: string;
  status: 'active' | 'departed' | 'transformed';
  portrait: string;
  description: string;
}

export interface LocationCard {
  name: string;
  description: string;
  realWorld?: string;
  image: string;
}

export interface WeaponEntry {
  name: string;
  wielder: string;
  description: string;
}

export interface DialogueEntry {
  speaker: string;
  sanskrit: string;
  translation: string;
  context: string;
}

export interface GalleryItem {
  image: string;
  caption: string;
}

export interface SourceRef {
  name: string;
  detail: string;
}

// ── Timeline Event ──────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  description: string;
  characters: string[];
  media: MediaSet;
  quote?: string;
  weapon?: string;
  turning?: boolean;
}

// ── New: Verse/Shloka Layer ─────────────────────────────────
// Architected for ~600 curated shlokas now,
// expandable to all ~24,000 without schema changes.

export type VerseTag =
  | 'dharma'
  | 'devotion'
  | 'war'
  | 'love'
  | 'separation'
  | 'nature'
  | 'wisdom'
  | 'courage'
  | 'grief'
  | 'joy'
  | 'miracle';

export interface VerseEntry {
  /** Unique ID: "{kandaId}-{sarga}-{shloka}" e.g. "bala-1-1" */
  id: string;
  /** Sarga (chapter) number within the Kanda */
  sarga: number;
  /** Shloka number within the Sarga */
  shloka: number;
  /** Original Sanskrit in Devanagari script */
  devanagari: string;
  /** IAST transliteration (optional) */
  iast?: string;
  /** Roman transliteration (optional, for non-Devanagari readers) */
  transliteration?: string;
  /** English translation */
  translation: string;
  /** Scholarly commentary or contextual note */
  commentary?: string;
  /** Who speaks this verse (e.g. "Valmiki", "Ram", "Hanuman") */
  speaker?: string;
  /** Links verse to a specific TimelineEvent.id */
  eventId?: string;
  /** Thematic tags for filtering and SlokaOfTheDay selection */
  tags?: VerseTag[];
  /** Marks high-importance verses for featured widgets */
  isFamous?: boolean;
}

export interface KandaVerseDB {
  kandaId: KandaSection['id'];
  totalSargas: number;
  totalShlokas: number;
  verses: VerseEntry[];
}

// ── New: Interactive Feature Types ──────────────────────────

export interface BookmarkEntry {
  id: string;
  type: 'verse' | 'event' | 'character';
  kandaId: string;
  refId: string;
  savedAt: number;
  note?: string;
}

/** Single trivia question for quiz features */
export interface QuizQuestion {
  id: string;
  kandaId: string;
  question: string;
  options: [string, string, string, string]; // always 4 choices
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// ── Kanda Section ───────────────────────────────────────────
// Union of all 8 kanda IDs for type-safe routing.

export type KandaId =
  | 'bala'
  | 'ayodhya'
  | 'aranya'
  | 'kishkindha'
  | 'sundara'
  | 'yuddha'
  | 'uttara'
  | 'ayodhya-mandir';

export interface KandaSection {
  // ── Core (original, unchanged) ──────────────────────────
  id: KandaId;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  accentHex: string;
  sloka: string;
  slokaTranslation: string;
  heroImage: string;
  backgroundImage: string;
  music?: string;
  characters: CharacterRef[];
  locations: LocationCard[];
  weapons: WeaponEntry[];
  dialogues: DialogueEntry[];
  gallery: GalleryItem[];
  facts: string[];
  references: SourceRef[];
  events: TimelineEvent[];

  // ── New Optional Fields (backward compatible) ────────────
  /** Total number of sargas (chapters) in this Kanda per Valmiki */
  sargas?: number;
  /** Total shloka count in this Kanda per Valmiki */
  slokaCount?: number;
  /**
   * Content warning for sensitive scenes.
   * e.g. "This section depicts the Agni Pariksha…"
   */
  contentWarning?: string;
  /**
   * 3–5 most famous verses for this Kanda,
   * shown in the drawer header and SlokaOfTheDay pool.
   */
  featuredVerses?: VerseEntry[];
  /**
   * Trivia question pool: 10 per kanda (70 total across all kandas).
   * Used for Kanda Quiz + Global Daily Challenge.
   */
  quizQuestions?: QuizQuestion[];
}
