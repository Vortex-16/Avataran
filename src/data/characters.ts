// ============================================================
//  AVATARAN — Character Constellation Dataset (Phase 1C)
//  Aggregated principal characters + their relationship edges,
//  powering the interactive Character Constellation view.
// ============================================================
import type { KandaId } from '@/data/types';

export type CharacterFaction = 'ayodhya' | 'sage' | 'vanara' | 'lanka' | 'divine';
export type RelationType = 'family' | 'ally' | 'enemy' | 'devotee' | 'guru';

export interface ConstellationNode {
  id: string;
  name: string;
  role: string;
  faction: CharacterFaction;
  portrait: string;
  description: string;
  /** Kandas in which the character prominently appears. */
  kandas: KandaId[];
}

export interface RelationshipEdge {
  from: string;
  to: string;
  type: RelationType;
  label?: string;
}

export const FACTION_META: Record<CharacterFaction, { label: string; hex: string }> = {
  ayodhya: { label: 'House of Ayodhya', hex: '#d9a441' },
  sage:    { label: 'Sages & Gurus',    hex: '#7fb2b0' },
  vanara:  { label: 'Vanara Allies',    hex: '#e07a3f' },
  lanka:   { label: 'House of Lanka',   hex: '#b0453f' },
  divine:  { label: 'Divine & Chroniclers', hex: '#b98bd0' },
};

export const RELATION_META: Record<RelationType, { label: string; hex: string; dash?: string }> = {
  family:  { label: 'Family',   hex: '#d9a441' },
  ally:    { label: 'Ally',     hex: '#5fa15f' },
  enemy:   { label: 'Enemy',    hex: '#c0453f', dash: '5 5' },
  devotee: { label: 'Devotee',  hex: '#e0894f' },
  guru:    { label: 'Guru',     hex: '#7fb2b0' },
};

export const constellationNodes: ConstellationNode[] = [
  // ── House of Ayodhya ──────────────────────────────────────
  { id: 'ram', name: 'Ram', role: 'The Seventh Avatar', faction: 'ayodhya', portrait: '/assets/character_ram.png', description: 'Prince of Ayodhya and avatar of Vishnu, the embodiment of Dharma.', kandas: ['bala', 'ayodhya', 'aranya', 'kishkindha', 'sundara', 'yuddha', 'uttara'] },
  { id: 'sita', name: 'Sita', role: 'Divine Consort', faction: 'ayodhya', portrait: '/assets/character_sita.png', description: 'Daughter of the Earth and Janaka, incarnation of Lakshmi.', kandas: ['bala', 'ayodhya', 'aranya', 'sundara', 'yuddha', 'uttara'] },
  { id: 'lakshmana', name: 'Lakshmana', role: 'Devoted Brother', faction: 'ayodhya', portrait: '/assets/character_lakshman.png', description: 'Ram\'s inseparable brother, incarnation of Shesha.', kandas: ['bala', 'ayodhya', 'aranya', 'kishkindha', 'sundara', 'yuddha', 'uttara'] },
  { id: 'bharata', name: 'Bharata', role: 'Regent of Ayodhya', faction: 'ayodhya', portrait: '/assets/character_bharat.png', description: 'Rules Ayodhya as servant to Ram\'s sandals from Nandigrama.', kandas: ['ayodhya', 'uttara'] },
  { id: 'shatrughna', name: 'Shatrughna', role: 'Youngest Brother', faction: 'ayodhya', portrait: '/assets/character_shatrughna.png', description: 'Twin of Lakshmana, devoted companion of Bharata.', kandas: ['bala', 'ayodhya', 'uttara'] },
  { id: 'dasharatha', name: 'Dasharatha', role: 'King of Ayodhya', faction: 'ayodhya', portrait: '/assets/character_dasharatha.png', description: 'Father of Ram, dies of grief at his son\'s exile.', kandas: ['bala', 'ayodhya'] },
  { id: 'kausalya', name: 'Kaushalya', role: 'Eldest Queen', faction: 'ayodhya', portrait: '/assets/character_kausalya.png', description: 'Ram\'s mother, foremost queen of Dasharatha.', kandas: ['bala', 'ayodhya'] },
  { id: 'kaikeyi', name: 'Kaikeyi', role: 'Queen', faction: 'ayodhya', portrait: '/assets/character_kaikeyi.png', description: 'Bharata\'s mother, whose two boons send Ram to exile.', kandas: ['ayodhya'] },
  { id: 'sumitra', name: 'Sumitra', role: 'Queen', faction: 'ayodhya', portrait: '/assets/character_sumitra.png', description: 'Mother of the twins Lakshmana and Shatrughna.', kandas: ['bala', 'ayodhya'] },
  { id: 'manthara', name: 'Manthara', role: 'The Instigator', faction: 'ayodhya', portrait: '/assets/character_manthara.png', description: 'Kaikeyi\'s hunchback maid who poisons her mind.', kandas: ['ayodhya'] },
  { id: 'janaka', name: 'Janaka', role: 'King of Mithila', faction: 'ayodhya', portrait: '/assets/character_janaka.png', description: 'Philosopher-king and Sita\'s foster father.', kandas: ['bala'] },

  // ── Sages & Gurus ─────────────────────────────────────────
  { id: 'vishwamitra', name: 'Vishwamitra', role: 'Royal Sage', faction: 'sage', portrait: '/assets/character_vishwamitra.png', description: 'Guides young Ram and grants him the divine astras.', kandas: ['bala'] },
  { id: 'vashishtha', name: 'Vashishtha', role: 'Preceptor', faction: 'sage', portrait: '/assets/character_vashishtha.png', description: 'Guru of the Ikshvaku dynasty.', kandas: ['bala', 'ayodhya'] },
  { id: 'valmiki', name: 'Valmiki', role: 'Adi Kavi', faction: 'divine', portrait: '/assets/character_valmiki.png', description: 'Author of the Ramayana; shelters Sita and raises Luv-Kush.', kandas: ['uttara'] },
  { id: 'shabari', name: 'Shabari', role: 'Devotee Ascetic', faction: 'sage', portrait: '/assets/character_shabari.png', description: 'Offers Ram berries tasted with pure love.', kandas: ['kishkindha'] },

  // ── Vanara Allies ─────────────────────────────────────────
  { id: 'hanuman', name: 'Hanuman', role: 'Supreme Devotee', faction: 'vanara', portrait: '/assets/character_hanuman.png', description: 'Son of the Wind; finds Sita and burns Lanka.', kandas: ['kishkindha', 'sundara', 'yuddha', 'uttara'] },
  { id: 'sugriva', name: 'Sugriva', role: 'Vanara King', faction: 'vanara', portrait: '/assets/character_sugriva.png', description: 'Allies with Ram, who restores his kingdom.', kandas: ['kishkindha', 'yuddha'] },
  { id: 'vali', name: 'Vali', role: 'Vanara King', faction: 'vanara', portrait: '/assets/character_vali.png', description: 'Sugriva\'s mighty brother, slain by Ram.', kandas: ['kishkindha'] },
  { id: 'angada', name: 'Angada', role: 'Vanara Prince', faction: 'vanara', portrait: '/assets/character_angada.png', description: 'Vali\'s son, envoy to Ravana\'s court.', kandas: ['kishkindha', 'yuddha'] },
  { id: 'jambavan', name: 'Jambavan', role: 'Bear King', faction: 'vanara', portrait: '/assets/character_jambavan.png', description: 'Ancient sage-bear who reawakens Hanuman\'s power.', kandas: ['kishkindha', 'yuddha'] },
  { id: 'jatayu', name: 'Jatayu', role: 'Vulture King', faction: 'vanara', portrait: '/assets/character_jatayu.png', description: 'Gives his life resisting Ravana\'s abduction of Sita.', kandas: ['aranya'] },
  { id: 'sampati', name: 'Sampati', role: 'Elder Vulture', faction: 'vanara', portrait: '/assets/character_sampati.png', description: 'Jatayu\'s brother; reveals Sita\'s location in Lanka.', kandas: ['kishkindha'] },

  // ── House of Lanka ────────────────────────────────────────
  { id: 'ravana', name: 'Ravana', role: 'Rakshasa Emperor', faction: 'lanka', portrait: '/assets/character_ravana.png', description: 'Ten-headed king of Lanka who abducts Sita.', kandas: ['aranya', 'sundara', 'yuddha'] },
  { id: 'kumbhakarna', name: 'Kumbhakarna', role: 'The Sleeping Giant', faction: 'lanka', portrait: '/assets/character_kumbhakarna.png', description: 'Ravana\'s colossal brother, roused for war.', kandas: ['yuddha'] },
  { id: 'indrajit', name: 'Indrajit', role: 'Conqueror of Indra', faction: 'lanka', portrait: '/assets/character_indrajit.png', description: 'Ravana\'s son and greatest warrior, slain by Lakshmana.', kandas: ['yuddha'] },
  { id: 'vibhishana', name: 'Vibhishana', role: 'The Righteous Brother', faction: 'lanka', portrait: '/assets/character_vibhishana.png', description: 'Ravana\'s brother who defects to Ram and is crowned king of Lanka.', kandas: ['yuddha'] },
  { id: 'mandodari', name: 'Mandodari', role: 'Queen of Lanka', faction: 'lanka', portrait: '/assets/character_mandodari.png', description: 'Ravana\'s virtuous chief queen.', kandas: ['yuddha'] },
  { id: 'shurpanakha', name: 'Shurpanakha', role: 'The Spark of War', faction: 'lanka', portrait: '/assets/character_surpanakha.png', description: 'Ravana\'s sister, disfigured at Panchavati.', kandas: ['aranya'] },
];

export const relationshipEdges: RelationshipEdge[] = [
  // Family — House of Ayodhya
  { from: 'dasharatha', to: 'ram', type: 'family', label: 'Father' },
  { from: 'dasharatha', to: 'bharata', type: 'family', label: 'Father' },
  { from: 'dasharatha', to: 'lakshmana', type: 'family', label: 'Father' },
  { from: 'dasharatha', to: 'shatrughna', type: 'family', label: 'Father' },
  { from: 'kausalya', to: 'ram', type: 'family', label: 'Mother' },
  { from: 'kaikeyi', to: 'bharata', type: 'family', label: 'Mother' },
  { from: 'sumitra', to: 'lakshmana', type: 'family', label: 'Mother' },
  { from: 'sumitra', to: 'shatrughna', type: 'family', label: 'Mother' },
  { from: 'ram', to: 'sita', type: 'family', label: 'Spouse' },
  { from: 'ram', to: 'lakshmana', type: 'family', label: 'Brother' },
  { from: 'ram', to: 'bharata', type: 'family', label: 'Brother' },
  { from: 'janaka', to: 'sita', type: 'family', label: 'Father' },
  { from: 'kaikeyi', to: 'manthara', type: 'ally', label: 'Maid' },

  // Gurus
  { from: 'vishwamitra', to: 'ram', type: 'guru', label: 'Guru' },
  { from: 'vashishtha', to: 'ram', type: 'guru', label: 'Guru' },
  { from: 'valmiki', to: 'sita', type: 'guru', label: 'Protector' },

  // Devotees & allies
  { from: 'hanuman', to: 'ram', type: 'devotee', label: 'Devotee' },
  { from: 'shabari', to: 'ram', type: 'devotee', label: 'Devotee' },
  { from: 'vibhishana', to: 'ram', type: 'devotee', label: 'Refuge' },
  { from: 'ram', to: 'sugriva', type: 'ally', label: 'Ally' },
  { from: 'ram', to: 'jatayu', type: 'ally', label: 'Friend' },
  { from: 'hanuman', to: 'sugriva', type: 'ally', label: 'Minister' },
  { from: 'sugriva', to: 'angada', type: 'family', label: 'Nephew' },
  { from: 'vali', to: 'angada', type: 'family', label: 'Father' },
  { from: 'sugriva', to: 'vali', type: 'family', label: 'Brother' },
  { from: 'jambavan', to: 'hanuman', type: 'ally', label: 'Mentor' },
  { from: 'jatayu', to: 'sampati', type: 'family', label: 'Brother' },

  // House of Lanka
  { from: 'ravana', to: 'kumbhakarna', type: 'family', label: 'Brother' },
  { from: 'ravana', to: 'vibhishana', type: 'family', label: 'Brother' },
  { from: 'ravana', to: 'shurpanakha', type: 'family', label: 'Sister' },
  { from: 'ravana', to: 'indrajit', type: 'family', label: 'Son' },
  { from: 'ravana', to: 'mandodari', type: 'family', label: 'Spouse' },

  // Enmities
  { from: 'ram', to: 'ravana', type: 'enemy', label: 'Nemesis' },
  { from: 'ram', to: 'kumbhakarna', type: 'enemy' },
  { from: 'lakshmana', to: 'indrajit', type: 'enemy' },
  { from: 'sita', to: 'ravana', type: 'enemy', label: 'Captor' },
  { from: 'hanuman', to: 'ravana', type: 'enemy' },
  { from: 'jatayu', to: 'ravana', type: 'enemy' },
];

/** Fast lookup of a node by id. */
export const nodeById: Record<string, ConstellationNode> =
  Object.fromEntries(constellationNodes.map(n => [n.id, n]));
