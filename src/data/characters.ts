// ============================================================
//  AVATARAN — Character Constellation Dataset (Phase 1C / Expanded)
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
  { id: 'urmila', name: 'Urmila', role: 'Princess of Mithila', faction: 'ayodhya', portrait: '/assets/character_urmila.png', description: 'Lakshmana\'s wife and Sita\'s sister, who slept for 14 years so Lakshmana could stay awake to guard Lord Ram during exile.', kandas: ['bala', 'ayodhya', 'uttara'] },
  { id: 'mandavi', name: 'Mandavi', role: 'Princess of Mithila', faction: 'ayodhya', portrait: '/assets/character_mandavi.png', description: 'Bharata\'s wife and Sita\'s cousin, who supported Bharata in his ascetic life in Nandigrama.', kandas: ['bala', 'ayodhya', 'uttara'] },
  { id: 'shrutakirti', name: 'Shrutakirti', role: 'Princess of Mithila', faction: 'ayodhya', portrait: '/assets/character_shrutakirti.png', description: 'Shatrughna\'s wife and Sita\'s cousin, who stayed in Ayodhya performing her duties during the exile period.', kandas: ['bala', 'ayodhya', 'uttara'] },
  { id: 'sunaina', name: 'Sunaina', role: 'Queen of Mithila', faction: 'ayodhya', portrait: '/assets/character_sunaina.png', description: 'Wife of King Janaka and mother of Sita, known for her wisdom and virtue.', kandas: ['bala'] },
  { id: 'sumantra', name: 'Sumantra', role: 'Royal Charioteer', faction: 'ayodhya', portrait: '/assets/character_sumantra.png', description: 'The loyal minister and chief charioteer of King Dasharatha, who drove Ram, Sita, and Lakshmana to the forest edge.', kandas: ['bala', 'ayodhya'] },
  { id: 'guha', name: 'Guha', role: 'Nishada Chieftain', faction: 'ayodhya', portrait: '/assets/character_guha.png', description: 'The tribal chieftain of Shringaverapura, a close friend and devoted ally of Lord Ram during his exile.', kandas: ['ayodhya'] },
  { id: 'kevat', name: 'Kevat', role: 'Ferryman Devotee', faction: 'ayodhya', portrait: '/assets/character_kevat.png', description: 'A humble ferryman who washes Lord Ram\'s feet before carrying him across the Ganges, showing absolute devotion.', kandas: ['ayodhya'] },

  // ── Sages & Gurus ─────────────────────────────────────────
  { id: 'vishwamitra', name: 'Vishwamitra', role: 'Royal Sage', faction: 'sage', portrait: '/assets/character_vishwamitra.png', description: 'Guides young Ram and grants him the divine astras.', kandas: ['bala'] },
  { id: 'vashishtha', name: 'Vashishtha', role: 'Preceptor', faction: 'sage', portrait: '/assets/character_vashishtha.png', description: 'Guru of the Ikshvaku dynasty.', kandas: ['bala', 'ayodhya'] },
  { id: 'shabari', name: 'Shabari', role: 'Devotee Ascetic', faction: 'sage', portrait: '/assets/character_shabari.png', description: 'Offers Ram berries tasted with pure love.', kandas: ['kishkindha'] },
  { id: 'ahalya', name: 'Ahalya', role: 'Redeemed Ascetic', faction: 'sage', portrait: '/assets/character_ahalya.png', description: 'Wife of Sage Gautama, turned to stone by a curse and redeemed by the touch of Lord Ram\'s feet.', kandas: ['bala'] },
  { id: 'gautama', name: 'Gautama', role: 'Great Sage', faction: 'sage', portrait: '/assets/character_gautama.png', description: 'One of the Saptarishis, husband of Ahalya, who performed rigorous penance.', kandas: ['bala'] },
  { id: 'bharadwaja', name: 'Bharadwaja', role: 'Great Sage', faction: 'sage', portrait: '/assets/character_bharadwaja.png', description: 'One of the Saptarishis, who hosts Ram, Sita, and Lakshmana at his hermitage near Prayag.', kandas: ['bala', 'ayodhya'] },
  { id: 'rishyashringa', name: 'Rishyashringa', role: 'Hermit Sage', faction: 'sage', portrait: '/assets/character_rishyashringa.png', description: 'The horned sage who conducts the Putrakameshti yagna for King Dasharatha to obtain sons.', kandas: ['bala'] },
  { id: 'atri', name: 'Atri', role: 'Great Rishi', faction: 'sage', portrait: '/assets/character_atri.png', description: 'One of the Saptarishis, who hosts Ram during his exile in the forest.', kandas: ['bala', 'aranya'] },
  { id: 'anasuya', name: 'Anasuya', role: 'Virtuous Ascetic', faction: 'sage', portrait: '/assets/character_anasuya.png', description: 'Wife of Sage Atri, who gifts Sita divine garments and cosmetics that never fade.', kandas: ['aranya'] },
  { id: 'matanga', name: 'Matanga', role: 'Ascetic Guru', faction: 'sage', portrait: '/assets/character_matanga.png', description: 'The sage whose ashram Shabari lived in, and who cursed Vali that he would die if he set foot on Rishyamukha mountain.', kandas: ['kishkindha'] },
  { id: 'agastya', name: 'Agastya', role: 'Revered Maharishi', faction: 'sage', portrait: '/assets/character_agastya.png', description: 'The powerful sage who gives Ram the divine bow of Vishnu, and later teaches him the Aditya Hridaya Stotra during the war.', kandas: ['aranya', 'yuddha'] },
  { id: 'sutikshna', name: 'Sutikshna', role: 'Ascetic of Dandaka', faction: 'sage', portrait: '/assets/character_sutikshna.png', description: 'A devoted disciple of Sage Agastya, residing in the Dandaka forest, known for his deep ascetic penance.', kandas: ['aranya'] },
  { id: 'sharabhanga', name: 'Sharabhanga', role: 'Hermit of the Forest', faction: 'sage', portrait: '/assets/character_sharabhanga.png', description: 'A great sage who postponed his ascension to heaven to meet Lord Ram during his exile, then entered the sacred fire in Ram\'s presence.', kandas: ['aranya'] },
  { id: 'lopamudra', name: 'Lopamudra', role: 'Philosopher Sage', faction: 'sage', portrait: '/assets/character_lopamudra.png', description: 'A renowned female philosopher of ancient India, wife of Sage Agastya, who co-authored hymns in the Rigveda.', kandas: ['aranya'] },

  // ── Vanara Allies ─────────────────────────────────────────
  { id: 'hanuman', name: 'Hanuman', role: 'Supreme Devotee', faction: 'vanara', portrait: '/assets/character_hanuman.png', description: 'Son of the Wind; finds Sita and burns Lanka.', kandas: ['kishkindha', 'sundara', 'yuddha', 'uttara'] },
  { id: 'sugriva', name: 'Sugriva', role: 'Vanara King', faction: 'vanara', portrait: '/assets/character_sugriva.png', description: 'Allies with Ram, who restores his kingdom.', kandas: ['kishkindha', 'yuddha'] },
  { id: 'vali', name: 'Vali', role: 'Vanara King', faction: 'vanara', portrait: '/assets/character_vali.png', description: 'Sugriva\'s mighty brother, slain by Ram.', kandas: ['kishkindha'] },
  { id: 'angada', name: 'Angada', role: 'Vanara Prince', faction: 'vanara', portrait: '/assets/character_angada.png', description: 'Vali\'s son, envoy to Ravana\'s court.', kandas: ['kishkindha', 'yuddha'] },
  { id: 'jambavan', name: 'Jambavan', role: 'Bear King', faction: 'vanara', portrait: '/assets/character_jambavan.png', description: 'Ancient sage-bear who reawakens Hanuman\'s power.', kandas: ['kishkindha', 'yuddha'] },
  { id: 'jatayu', name: 'Jatayu', role: 'Vulture King', faction: 'vanara', portrait: '/assets/character_jatayu.png', description: 'Gives his life resisting Ravana\'s abduction of Sita.', kandas: ['aranya'] },
  { id: 'sampati', name: 'Sampati', role: 'Elder Vulture', faction: 'vanara', portrait: '/assets/character_sampati.png', description: 'Jatayu\'s brother; reveals Sita\'s location in Lanka.', kandas: ['kishkindha'] },
  { id: 'tara', name: 'Tara', role: 'Queen of Kishkindha', faction: 'vanara', portrait: '/assets/character_tara.png', description: 'Wife of Vali and later Sugriva, known for her political wisdom and diplomatic counsel.', kandas: ['kishkindha'] },
  { id: 'nala', name: 'Nala', role: 'Bridge Architect', faction: 'vanara', portrait: '/assets/character_nala.png', description: 'The vanara engineer, son of Vishwakarma, who supervises the construction of the Ram Setu.', kandas: ['yuddha'] },
  { id: 'nila', name: 'Nila', role: 'Vanara Commander', faction: 'vanara', portrait: '/assets/character_nila.png', description: 'The chief commander of the vanara army, who leads the attack against Lanka\'s commanders.', kandas: ['yuddha'] },

  // ── House of Lanka ────────────────────────────────────────
  { id: 'ravana', name: 'Ravana', role: 'Rakshasa Emperor', faction: 'lanka', portrait: '/assets/character_ravana.png', description: 'Ten-headed king of Lanka who abducts Sita.', kandas: ['aranya', 'sundara', 'yuddha'] },
  { id: 'kumbhakarna', name: 'Kumbhakarna', role: 'The Sleeping Giant', faction: 'lanka', portrait: '/assets/character_kumbhakarna.png', description: 'Ravana\'s colossal brother, roused for war.', kandas: ['yuddha'] },
  { id: 'indrajit', name: 'Indrajit', role: 'Conqueror of Indra', faction: 'lanka', portrait: '/assets/character_indrajit.png', description: 'Ravana\'s son and greatest warrior, slain by Lakshmana.', kandas: ['yuddha'] },
  { id: 'vibhishana', name: 'Vibhishana', role: 'The Righteous Brother', faction: 'lanka', portrait: '/assets/character_vibhishana.png', description: 'Ravana\'s brother who defects to Ram and is crowned king of Lanka.', kandas: ['yuddha'] },
  { id: 'mandodari', name: 'Mandodari', role: 'Queen of Lanka', faction: 'lanka', portrait: '/assets/character_mandodari.png', description: 'Ravana\'s virtuous chief queen.', kandas: ['yuddha'] },
  { id: 'shurpanakha', name: 'Shurpanakha', role: 'The Spark of War', faction: 'lanka', portrait: '/assets/character_surpanakha.png', description: 'Ravana\'s sister, disfigured at Panchavati.', kandas: ['aranya'] },
  { id: 'trijata', name: 'Trijata', role: 'Rakshasi Protector', faction: 'lanka', portrait: '/assets/character_trijata.png', description: 'A compassionate demoness in Lanka who protects and comforts Sita in the Ashoka Vatika.', kandas: ['sundara', 'yuddha'] },
  { id: 'maricha', name: 'Maricha', role: 'Golden Deer Demon', faction: 'lanka', portrait: '/assets/character_maricha.png', description: 'Slain by young Ram, later forced by Ravana to disguise himself as a golden deer to lure Ram away.', kandas: ['bala', 'aranya'] },
  { id: 'tataka', name: 'Tataka', role: 'Yakshini Demoness', faction: 'lanka', portrait: '/assets/character_tataka.png', description: 'The powerful demoness who terrorized the forest of Dandaka, slain by young Ram on Vishwamitra\'s command.', kandas: ['bala'] },
  { id: 'kharadushana', name: 'Khara-Dushana', role: 'Rakshasa Generals', faction: 'lanka', portrait: '/assets/character_kharadushana.png', description: 'Ravana\'s cousins who govern the Janasthana region and attack Ram with an army of 14,000 rakshasas.', kandas: ['aranya'] },
  { id: 'lankini', name: 'Lankini', role: 'Guardian of Lanka', faction: 'lanka', portrait: '/assets/character_lankini.png', description: 'The powerful guardian demoness of the gates of Lanka, who challenges Hanuman when he attempts to enter the city at night.', kandas: ['sundara'] },
  { id: 'akshayakumara', name: 'Akshayakumara', role: 'Warrior Prince', faction: 'lanka', portrait: '/assets/character_akshayakumara.png', description: 'The valiant youngest son of Emperor Ravana who fights Hanuman bravely in the Ashoka Vatika before being slain.', kandas: ['sundara'] },
  { id: 'atikaya', name: 'Atikaya', role: 'Colossal Archer', faction: 'lanka', portrait: '/assets/character_atikaya.png', description: 'Son of Ravana, a warrior of giant stature who possessed divine armor and weapons, slain by Lakshmana with the Brahmastra.', kandas: ['yuddha'] },
  { id: 'prahasta', name: 'Prahasta', role: 'Commander-in-Chief', faction: 'lanka', portrait: '/assets/character_prahasta.png', description: 'The chief commander of the army of Lanka and loyal minister to Ravana, slain by Nila in the battle of Lanka.', kandas: ['yuddha'] },
  { id: 'kumbha', name: 'Kumbha', role: 'Rakshasa General', faction: 'lanka', portrait: '/assets/character_kumbha.png', description: 'Son of Kumbhakarna who leads the rakshasa forces and fights valiantly before being defeated by Sugriva.', kandas: ['yuddha'] },
  { id: 'nikumbha', name: 'Nikumbha', role: 'Rakshasa General', faction: 'lanka', portrait: '/assets/character_nikumbha.png', description: 'Son of Kumbhakarna, brother of Kumbha, a ferocious warrior slain by Hanuman in the Battle of Lanka.', kandas: ['yuddha'] },

  // ── Divine & Chroniclers ───────────────────────────────────
  { id: 'valmiki', name: 'Valmiki', role: 'Adi Kavi', faction: 'divine', portrait: '/assets/character_valmiki.png', description: 'Author of the Ramayana; shelters Sita and raises Luv-Kush.', kandas: ['uttara'] },
  { id: 'parashurama', name: 'Parashurama', role: 'The Sixth Avatar', faction: 'divine', portrait: '/assets/character_parashurama.png', description: 'The fierce warrior-sage avatar of Vishnu who confronts Ram after he breaks Shiva\'s bow.', kandas: ['bala'] },
  { id: 'narada', name: 'Narada', role: 'Divine Sage', faction: 'divine', portrait: '/assets/character_narada.png', description: 'The celestial traveling sage who narrates the virtues of Ram to Valmiki, inspiring the writing of the Ramayana.', kandas: ['bala', 'uttara'] },
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

  // Added Ayodhya details
  { from: 'lakshmana', to: 'urmila', type: 'family', label: 'Spouse' },
  { from: 'bharata', to: 'mandavi', type: 'family', label: 'Spouse' },
  { from: 'shatrughna', to: 'shrutakirti', type: 'family', label: 'Spouse' },
  { from: 'janaka', to: 'urmila', type: 'family', label: 'Father' },
  { from: 'sunaina', to: 'sita', type: 'family', label: 'Mother' },
  { from: 'sunaina', to: 'urmila', type: 'family', label: 'Mother' },
  { from: 'sumantra', to: 'dasharatha', type: 'ally', label: 'Charioteer' },
  { from: 'sumantra', to: 'ram', type: 'ally', label: 'Loyal Guide' },
  { from: 'guha', to: 'ram', type: 'ally', label: 'Friend' },
  { from: 'kevat', to: 'ram', type: 'devotee', label: 'Ferryman' },

  // Gurus & Sages
  { from: 'vishwamitra', to: 'ram', type: 'guru', label: 'Guru' },
  { from: 'vashishtha', to: 'ram', type: 'guru', label: 'Guru' },
  { from: 'valmiki', to: 'sita', type: 'guru', label: 'Protector' },
  { from: 'gautama', to: 'ahalya', type: 'family', label: 'Spouse' },
  { from: 'ahalya', to: 'ram', type: 'devotee', label: 'Redeemed' },
  { from: 'bharadwaja', to: 'ram', type: 'guru', label: 'Host' },
  { from: 'rishyashringa', to: 'dasharatha', type: 'guru', label: 'Priest' },
  { from: 'atri', to: 'ram', type: 'guru', label: 'Host' },
  { from: 'anasuya', to: 'atri', type: 'family', label: 'Spouse' },
  { from: 'anasuya', to: 'sita', type: 'guru', label: 'Mentor' },
  { from: 'matanga', to: 'shabari', type: 'guru', label: 'Teacher' },
  { from: 'agastya', to: 'ram', type: 'guru', label: 'Weapons Gift' },
  { from: 'agastya', to: 'sutikshna', type: 'guru', label: 'Disciple' },
  { from: 'agastya', to: 'sharabhanga', type: 'ally', label: 'Companion' },
  { from: 'agastya', to: 'lopamudra', type: 'family', label: 'Spouse' },
  { from: 'sutikshna', to: 'ram', type: 'devotee', label: 'Host' },
  { from: 'sharabhanga', to: 'ram', type: 'devotee', label: 'Witness' },

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
  { from: 'tara', to: 'vali', type: 'family', label: 'Spouse' },
  { from: 'tara', to: 'sugriva', type: 'family', label: 'Spouse' },
  { from: 'nala', to: 'ram', type: 'ally', label: 'Setu Architect' },
  { from: 'nila', to: 'ram', type: 'ally', label: 'General' },
  { from: 'nala', to: 'sugriva', type: 'ally' },
  { from: 'nila', to: 'sugriva', type: 'ally' },

  // House of Lanka
  { from: 'ravana', to: 'kumbhakarna', type: 'family', label: 'Brother' },
  { from: 'ravana', to: 'vibhishana', type: 'family', label: 'Brother' },
  { from: 'ravana', to: 'shurpanakha', type: 'family', label: 'Sister' },
  { from: 'ravana', to: 'indrajit', type: 'family', label: 'Son' },
  { from: 'ravana', to: 'mandodari', type: 'family', label: 'Spouse' },
  { from: 'trijata', to: 'sita', type: 'ally', label: 'Protector' },
  { from: 'maricha', to: 'ravana', type: 'family', label: 'Uncle' },
  { from: 'tataka', to: 'maricha', type: 'family', label: 'Mother' },
  { from: 'kharadushana', to: 'ravana', type: 'family', label: 'Cousin' },
  { from: 'lankini', to: 'ravana', type: 'ally', label: 'Guardian' },
  { from: 'akshayakumara', to: 'ravana', type: 'family', label: 'Son' },
  { from: 'atikaya', to: 'ravana', type: 'family', label: 'Son' },
  { from: 'prahasta', to: 'ravana', type: 'ally', label: 'Commander' },
  { from: 'kumbha', to: 'kumbhakarna', type: 'family', label: 'Son' },
  { from: 'nikumbha', to: 'kumbhakarna', type: 'family', label: 'Son' },

  // Divine Sages
  { from: 'narada', to: 'valmiki', type: 'guru', label: 'Narrator' },
  { from: 'parashurama', to: 'ram', type: 'ally', label: 'Reconciliation' },

  // Enmities
  { from: 'ram', to: 'ravana', type: 'enemy', label: 'Nemesis' },
  { from: 'ram', to: 'kumbhakarna', type: 'enemy' },
  { from: 'lakshmana', to: 'indrajit', type: 'enemy' },
  { from: 'sita', to: 'ravana', type: 'enemy', label: 'Captor' },
  { from: 'hanuman', to: 'ravana', type: 'enemy' },
  { from: 'jatayu', to: 'ravana', type: 'enemy' },
  { from: 'tataka', to: 'ram', type: 'enemy' },
  { from: 'maricha', to: 'ram', type: 'enemy' },
  { from: 'kharadushana', to: 'ram', type: 'enemy' },
  { from: 'lankini', to: 'hanuman', type: 'enemy' },
  { from: 'akshayakumara', to: 'hanuman', type: 'enemy' },
  { from: 'atikaya', to: 'lakshmana', type: 'enemy' },
  { from: 'prahasta', to: 'nila', type: 'enemy' },
  { from: 'kumbha', to: 'sugriva', type: 'enemy' },
  { from: 'nikumbha', to: 'hanuman', type: 'enemy' },
];

/** Fast lookup of a node by id. */
export const nodeById: Record<string, ConstellationNode> =
  Object.fromEntries(constellationNodes.map(n => [n.id, n]));
