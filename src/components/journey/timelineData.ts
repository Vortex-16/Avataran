// ============================================================
//  AVATARAN — Ramayana Timeline Data Model (Production v2)
//  Single source of truth for all Kanda content.
// ============================================================

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

export interface KandaSection {
  id: 'bala' | 'ayodhya' | 'aranya' | 'kishkindha' | 'sundara' | 'yuddha' | 'uttara' | 'ayodhya-mandir';
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
}

export const timelineData: KandaSection[] = [
  {
    id: 'bala',
    title: 'Bala Kanda',
    subtitle: 'The Genesis of Light',
    description: 'The first chapter of the Valmiki Ramayana narrates the divine birth of Lord Ram and his brothers in Ayodhya, their education under Sage Vashishtha, the protection of Vishwamitra\'s yagna, the redemption of Ahalya, and the grand Swayamvara at Mithila — culminating in the marriage of Ram and Sita.',
    themeColor: 'from-[#d05c43] to-[#f49e78]',
    accentHex: '#d05c43',
    sloka: 'इक्ष्वाकुवंशप्रभवो रामो नाम जनैः श्रुतः। नियतात्मा महावीर्यो द्युतिमान् धृतिमान् वशी॥',
    slokaTranslation: 'Born in the Ikshvaku line, Ram is known to the world — of restrained mind, supreme valor, radiant, and master of his senses.',
    heroImage: '/assets/seq_four_births.png',
    backgroundImage: '/assets/ayodhya_gate_bg.png',
    characters: [
      { name: 'Ram', role: 'Protagonist', weapon: 'Kodanda (Divine Bow)', status: 'active', portrait: '/assets/character_ram.png', description: 'Seventh avatar of Lord Vishnu, born to restore cosmic Dharma. Embodies perfect virtue, devotion, and fearlessness.' },
      { name: 'Sita', role: 'Divine Consort', status: 'active', portrait: '/assets/character_sita.png', description: 'Daughter of King Janaka, found in the earth during a sacred ploughing ritual. An incarnation of Goddess Lakshmi.' },
      { name: 'Lakshmana', role: 'Loyal Brother', weapon: 'Sharur', status: 'active', portrait: '/assets/character_lakshman.png', description: 'Ram\'s inseparable younger brother, an incarnation of Shesha Naga. His devotion to Ram is absolute and eternal.' },
      { name: 'Dasharatha', role: 'King of Ayodhya', status: 'departed', portrait: '/assets/character_dasharatha.png', description: 'Valiant king who performs the Putrakameshti Yagna to beget divine sons.' },
      { name: 'Vishwamitra', role: 'Sage', status: 'active', portrait: '/assets/character_vishwamitra.png', description: 'Royal sage who guides Ram and Lakshmana to protect his yagna and imparts divine astras.' },
      { name: 'Vashishtha', role: 'Sage & Guru', status: 'active', portrait: '/assets/character_vashishtha.png', description: 'Royal preceptor of the Ikshvaku dynasty — an embodiment of divine wisdom.' },
      { name: 'Janaka', role: 'King of Mithila', status: 'active', portrait: '/assets/character_janaka.png', description: 'Philosopher-king who raises Sita and organizes the Swayamvara around Shiva\'s bow.' },
      { name: 'Parashurama', role: 'Divine Sage-Warrior', weapon: 'Parashu (Axe)', status: 'active', portrait: '/assets/character_vishwamitra.png', description: 'Sixth avatar of Vishnu who challenges Ram after the Shiva Bow is broken.' },
      { name: 'Kaushalya', role: 'Queen', status: 'active', portrait: '/assets/character_kausalya.png', description: 'Ram\'s devoted mother whose piety directly invites his divine birth.' },
      { name: 'Kaikeyi', role: 'Queen', status: 'active', portrait: '/assets/character_kaikeyi.png', description: 'Bharata\'s mother, later an instrument of cosmic destiny through Manthara.' },
    ],
    locations: [
      { name: 'Ayodhya', description: 'The radiant capital of the Kosala kingdom on the banks of the Sarayu River.', realWorld: 'Ayodhya, Uttar Pradesh, India', image: '/assets/ayodhya_gate_bg.png' },
      { name: 'Siddhashrama', description: 'The ashram of Sage Vishwamitra where the Putrakameshti Yagna is conducted.', realWorld: 'Near Buxar, Bihar, India', image: '/assets/forest_threshold_bg.png' },
      { name: 'Ahalya\'s Ashram', description: 'The abandoned hermitage of Sage Gautama where Ahalya awaits her redemption.', realWorld: 'Near Darbhanga, Bihar', image: '/assets/forest_threshold_bg.png' },
      { name: 'Mithila', description: 'The prosperous capital of the Videha Kingdom and site of the grand Swayamvara.', realWorld: 'Janakpur, Madhesh Province, Nepal', image: '/assets/seq_swayamvara.png' },
    ],
    weapons: [
      { name: 'Shiva Dhanush (Pinaka)', wielder: 'Ram', description: 'The divine bow of Lord Shiva. Ram lifts, strings, and breaks it to win Sita\'s hand at the Swayamvara.' },
      { name: 'Vaishnava Dhanush', wielder: 'Ram', description: 'The bow of Lord Vishnu. Ram strings it effortlessly when Parashurama challenges him, revealing his supreme nature.' },
      { name: 'Brahmastra', wielder: 'Ram', description: 'One of many divine astras imparted to Ram by Vishwamitra during the yagna protection mission.' },
    ],
    dialogues: [
      { speaker: 'Valmiki', sanskrit: 'को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान्।', translation: 'Who in this present world is truly virtuous and truly valorous?', context: 'The opening verse of the Valmiki Ramayana — Valmiki asks Narada who exemplifies true virtue.' },
      { speaker: 'Ram', sanskrit: 'धर्मो रक्षति रक्षितः।', translation: 'Dharma protects those who protect it.', context: 'Ram declares the core principle of Dharmic protection before confronting Tataka.' },
    ],
    gallery: [
      { image: '/assets/seq_four_births.png', caption: 'The fourfold divine birth in Ayodhya' },
      { image: '/assets/seq_yagna.png', caption: 'Vishwamitra\'s sacred Yagna at Siddhashrama' },
      { image: '/assets/seq_ahalya_redemption.png', caption: 'Ram redeems Ahalya from petrification' },
      { image: '/assets/seq_swayamvara.png', caption: 'Ram strings the Shiva Dhanush at Mithila' },
      { image: '/assets/seq_fourfold_wedding.png', caption: 'The fourfold wedding ceremony in Mithila' },
      { image: '/assets/seq_tadaka.png', caption: 'Ram confronts the demoness Tataka' },
    ],
    facts: [
      'Putrakameshti Yagna was performed by the sage Rishyashringa at Dasharatha\'s request.',
      'Ram was born on Navami (9th day) of the Chaitra month — celebrated as Ram Navami.',
      'Ahalya was turned to stone by her husband Sage Gautama; Ram\'s touch freed her.',
      'The Shiva Dhanush had been in Janaka\'s family for generations; no previous suitor could even lift it.',
      'Vishwamitra taught Ram the Bala and Atibala mantras to conquer hunger, thirst, and fatigue.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Bala Kanda', detail: 'Sargas 1–77, covering Ram\'s birth to the Ayodhya return after marriage.' },
      { name: 'Ramcharitmanas — Bal Kand', detail: 'Tulsidas\'s retelling in Avadhi Hindi.' },
      { name: 'Adhyatma Ramayana', detail: 'Vedic philosophical interpretation emphasizing Ram\'s divine omniscient nature from birth.' },
    ],
    events: [
      {
        id: 'divine-birth',
        title: 'Putrakameshti Yagna & Divine Birth',
        subtitle: 'The Supreme Descends',
        location: 'Ayodhya — The Golden Palace',
        description: 'King Dasharatha performs the Putrakameshti Yagna. Lord Vishnu chooses to incarnate as Ram born to Kaushalya, Bharata to Kaikeyi, and twins Lakshmana-Shatrughna to Sumitra. Celestial flowers rain over Ayodhya.',
        characters: ['Ram', 'Dasharatha', 'Kaushalya', 'Kaikeyi', 'Sumitra', 'Lakshmana', 'Bharata', 'Shatrughna'],
        media: { hero: '/assets/seq_four_births.png', background: '/assets/ayodhya_gate_bg.png', thumbnail: '/assets/seq_four_births.png' },
        turning: true,
        quote: 'The universe rejoiced when Ram was born — for the protector of Dharma had arrived.',
      },
      {
        id: 'education-vashishtha',
        title: 'Gurukul Education under Vashishtha',
        subtitle: 'Forging the Perfect Prince',
        location: 'Royal Ashram of Vashishtha, Ayodhya',
        description: 'Ram and his brothers spend formative years in Sage Vashishtha\'s gurukul, mastering the four Vedas, Dhanurveda, statecraft, Nyaya philosophy, and all 64 classical arts.',
        characters: ['Ram', 'Lakshmana', 'Bharata', 'Shatrughna', 'Vasishtha'],
        media: { hero: '/assets/ayodhya_gate_fg.png', background: '/assets/ayodhya_gate_bg.png' },
      },
      {
        id: 'yagna-protection',
        title: 'Protection of Vishwamitra\'s Yagna & Tataka Vadh',
        subtitle: 'First Test of Dharma',
        location: 'Siddhashrama Forest',
        description: 'Vishwamitra arrives seeking Ram and Lakshmana to protect his yagna. Ram slays the demoness Tataka and destroys Subahu, repelling Maricha with the Manavastra. Vishwamitra rewards Ram with a full set of divine astras.',
        characters: ['Ram', 'Lakshmana', 'Vishwamitra', 'Tataka', 'Mareecha'],
        media: { hero: '/assets/seq_tadaka.png', background: '/assets/forest_threshold_bg.png', parallaxFg: '/assets/forest_threshold_fg.png' },
        weapon: 'Manavastra, Agneyastra',
        turning: true,
      },
      {
        id: 'ahalya-redemption',
        title: 'Ahalya\'s Redemption',
        subtitle: 'The Dust of Liberation',
        location: 'Gautama\'s Abandoned Ashram',
        description: 'Ram\'s feet touch the petrified stone that is Ahalya, cursed by Sage Gautama. The sacred dust of Ram\'s lotus feet breaks her curse — she is restored to divine grace and reunited with her ashram.',
        characters: ['Ram', 'Lakshmana', 'Vishwamitra'],
        media: { hero: '/assets/seq_ahalya_redemption.png', background: '/assets/forest_threshold_bg.png' },
        quote: 'Even a stone awakens when touched by the grace of the Lord.',
      },
      {
        id: 'swayamvara-bow',
        title: 'Mithila Swayamvara — Breaking the Shiva Dhanush',
        subtitle: 'The Bow That Chose Its Match',
        location: 'Janaka\'s Royal Court, Mithila',
        description: 'Ram enters the Swayamvara hall before thousands of princes. He casually lifts the ancient Shiva Dhanush, strings it, and snaps it in half. Sita places the victory garland around Ram\'s neck. The fourfold wedding of all four brothers follows.',
        characters: ['Ram', 'Sita', 'Janaka', 'Vishwamitra', 'Lakshmana', 'Bharata', 'Shatrughna'],
        media: { hero: '/assets/seq_swayamvara.png', background: '/assets/seq_swayamvara_bg.png', thumbnail: '/assets/seq_swayamvara.png' },
        weapon: 'Shiva Dhanush (Pinaka)',
        turning: true,
        quote: 'The bow of Shiva broke, and the world knew: the Supreme had come.',
      },
      {
        id: 'parashurama-challenge',
        title: 'Parashurama\'s Challenge',
        subtitle: 'Avatar Meets Avatar',
        location: 'Road to Ayodhya',
        description: 'Parashurama rushes to the wedding convoy in fury. He challenges Ram to string the Vaishnava Bow. Ram does so effortlessly, pointing the arrow at Parashurama himself. Parashurama realizes Ram is Vishnu and bows in surrender.',
        characters: ['Ram', 'Parashurama', 'Lakshmana', 'Dasharatha'],
        media: { hero: '/assets/ram_dynamic_pose.png', background: '/assets/departure_road_bg.png' },
        weapon: 'Vaishnava Dhanush',
        turning: true,
      },
    ],
  },
  {
    id: 'ayodhya',
    title: 'Ayodhya Kanda',
    subtitle: 'The Threshold of Duty',
    description: 'Ram is preparing for coronation when Kaikeyi demands Dasharatha fulfill two ancient boons: exile Ram for 14 years and crown Bharata. Ram accepts without protest — a profound meditation on filial duty, sacrifice, and the cost of keeping one\'s word.',
    themeColor: 'from-[#b89552] to-[#e4cf9c]',
    accentHex: '#b89552',
    sloka: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।',
    slokaTranslation: 'Ram is the personification of Dharma itself — righteous, of true valor.',
    heroImage: '/assets/seq_kaikeyi_demand.png',
    backgroundImage: '/assets/departure_road_bg.png',
    characters: [
      { name: 'Ram', role: 'Protagonist', weapon: 'Kodanda', status: 'active', portrait: '/assets/character_ram.png', description: 'Accepts exile without protest, choosing duty (Dharma) over personal comfort — the defining act of his character.' },
      { name: 'Kaikeyi', role: 'Queen (Antagonist)', status: 'active', portrait: '/assets/character_kaikeyi.png', description: 'Manipulated by Manthara into demanding Ram\'s exile — a key instrument of cosmic destiny.' },
      { name: 'Dasharatha', role: 'King', status: 'departed', portrait: '/assets/character_dasharatha.png', description: 'Bound by his ancient vows, he cannot refuse. He dies of grief after Ram leaves.' },
      { name: 'Sita', role: 'Divine Consort', status: 'active', portrait: '/assets/character_sita.png', description: 'Refuses to stay in the palace. Declares her place is at Ram\'s side in all circumstances.' },
      { name: 'Lakshmana', role: 'Devoted Brother', status: 'active', portrait: '/assets/character_lakshman.png', description: 'Follows Ram in outrage at the injustice. His loyalty refuses any separation.' },
      { name: 'Bharata', role: 'Loyal Prince', status: 'active', portrait: '/assets/character_bharat.png', description: 'Refuses the throne, rules holding Ram\'s sandals (Paduka) as the symbol of kingship.' },
      { name: 'Manthara', role: 'Antagonist (Maid)', status: 'active', portrait: '/assets/character_manthara.png', description: 'Kaikeyi\'s hunchbacked maid who poisons her mistress\'s mind, setting all events in motion.' },
      { name: 'Kaushalya', role: 'Queen', status: 'active', portrait: '/assets/character_kausalya.png', description: 'Ram\'s heartbroken mother — her grief is among the most poignant passages in the Ramayana.' },
      { name: 'Sumitra', role: 'Queen', status: 'active', portrait: '/assets/character_sumitra.png', description: 'Lakshmana\'s mother who blesses her son: "serve Ram as you would serve me."' },
    ],
    locations: [
      { name: 'Ayodhya — Royal Court', description: 'The grand sabha where Dasharatha is forced to announce Ram\'s exile.', realWorld: 'Ayodhya, Uttar Pradesh', image: '/assets/seq_kaikeyi_demand.png' },
      { name: 'Sringaverapura', description: 'The territory of Nishadraj Guha where the Ganga is crossed.', realWorld: 'Near Shringverpur, Allahabad, UP', image: '/assets/seq_ganges.png' },
      { name: 'Chitrakoot', description: 'The sacred mountain where Ram, Sita, and Lakshmana live years in exile, and where Bharata meets Ram.', realWorld: 'Chitrakoot, Madhya Pradesh', image: '/assets/seq_chitrakoot.png' },
    ],
    weapons: [
      { name: 'Paduka (Sandals)', wielder: 'Bharata (holding Ram\'s)', description: 'Ram\'s wooden sandals become the sacred symbol of legitimate kingship. Bharata places them on the throne.' },
    ],
    dialogues: [
      { speaker: 'Ram', sanskrit: 'पितुर्वचनमाज्ञाय वर्ते वो नात्र संशयः।', translation: 'I shall obey my father\'s word completely — of this there is no doubt.', context: 'Ram accepts the exile without any protest when told by Kaikeyi.' },
      { speaker: 'Sita', sanskrit: 'त्वया सह वने वस्तुं वरं मे भवेत् नृपस्य।', translation: 'Living with you in the forest is better to me than the palace of a king.', context: 'Sita insists on accompanying Ram into exile.' },
      { speaker: 'Bharata', sanskrit: 'न मे राज्यफले स्पृहा।', translation: 'I have no desire for the fruit of a kingdom.', context: 'Bharata refuses the crown and begs Ram to return.' },
    ],
    gallery: [
      { image: '/assets/seq_kaikeyi_demand.png', caption: 'Kaikeyi demands the two boons from Dasharatha' },
      { image: '/assets/departure_road_fg.png', caption: 'Ram, Sita, and Lakshmana depart Ayodhya' },
      { image: '/assets/seq_ganges.png', caption: 'Crossing the holy Ganga with Guha' },
      { image: '/assets/seq_chitrakoot.png', caption: 'The meeting at Chitrakoot — Ram and Bharata' },
      { image: '/assets/seq_paduka_throne.png', caption: 'Bharata places Ram\'s sandals on the throne' },
    ],
    facts: [
      'Dasharatha had once promised Kaikeyi two boons when she saved his life in a chariot battle.',
      'Ram accepted the exile as Dharma — a son must obey his father\'s word, even a painful one.',
      'Bharata lived austerely in Nandigram for 14 years, wearing tree-bark garments like Ram.',
      'The Ganga was crossed at Shringverapura with the help of Guha, the Nishad chief.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Ayodhya Kanda', detail: 'Sargas 1–119, from the coronation preparations to Ram\'s life at Chitrakoot.' },
      { name: 'Ramcharitmanas — Ayodhya Kand', detail: 'Tulsidas emphasizes Bharata\'s devotion (Bharat Milap) as a philosophical ideal.' },
    ],
    events: [
      {
        id: 'coronation-banished',
        title: 'Coronation Cancelled — Kaikeyi\'s Two Boons',
        subtitle: 'The Night That Changed Everything',
        location: 'Kaikeyi\'s Chamber, Ayodhya',
        description: 'Dasharatha prepares to crown Ram. Manthara poisons Kaikeyi\'s mind with jealousy. Kaikeyi enters Kop Bhavan and refuses to speak until Dasharatha grants two ancient boons: exile of Ram for 14 years and the crown for Bharata.',
        characters: ['Dasharatha', 'Kaikeyi', 'Manthara'],
        media: { hero: '/assets/seq_kaikeyi_demand.png', background: '/assets/ayodhya_gate_bg.png' },
        turning: true,
        quote: 'A great king is bound by his word, even when it destroys him.',
      },
      {
        id: 'exile-departure',
        title: 'The Great Departure from Ayodhya',
        subtitle: 'Saffron Garments on Royal Feet',
        location: 'Ayodhya Gates',
        description: 'Ram, Sita, and Lakshmana exchange royal garments for tree-bark ascetic robes. The entire city follows weeping. Dasharatha collapses. The three cross Ayodhya\'s boundaries and begin the long walk into the wilderness.',
        characters: ['Ram', 'Sita', 'Lakshmana', 'Dasharatha', 'Kaushalya'],
        media: { hero: '/assets/departure_road_fg.png', background: '/assets/departure_road_bg.png', parallaxFg: '/assets/departure_road_fg.png', parallaxMid: '/assets/departure_road_mid.png' },
        turning: true,
      },
      {
        id: 'ganga-crossing',
        title: 'Ganga Crossing with Nishadraj Guha',
        subtitle: 'The King of Tribals Weeps for Ram',
        location: 'Sringaverapura — Banks of the Ganga',
        description: 'Ram meets his childhood friend Guha, the tribal chieftain. Guha washes Ram\'s feet and ferries the trio across the holy Ganga. The three move onward to Sage Bharadwaja\'s ashram at Prayag.',
        characters: ['Ram', 'Sita', 'Lakshmana'],
        media: { hero: '/assets/seq_ganges.png', background: '/assets/departure_road_bg.png' },
      },
      {
        id: 'sandal-regent',
        title: 'Bharata\'s Grief & The Paduka Regent',
        subtitle: 'A Brother\'s Love Becomes a Kingdom\'s Law',
        location: 'Chitrakoot Mountain',
        description: 'Dasharatha dies of grief. Bharata rejects the crown, tracks Ram to Chitrakoot, and begs him to return. Ram refuses — his father\'s word must be honored. Bharata places Ram\'s wooden sandals on the throne and rules from Nandigram as a regent.',
        characters: ['Ram', 'Bharata', 'Sita', 'Lakshmana'],
        media: { hero: '/assets/seq_paduka_throne.png', background: '/assets/seq_chitrakoot.png' },
        turning: true,
        quote: 'I rule not as a king, but as the servant of Ram\'s sandals.',
      },
    ],
  },
  {
    id: 'aranya',
    title: 'Aranya Kanda',
    subtitle: 'The Depths of Exile',
    description: 'Ram, Sita, and Lakshmana traverse the dense Dandakaranya forest, visiting sages and protecting them from demons. The chapter reaches its climax with Shurpanakha\'s disfigurement, the golden deer trap, and Ravana\'s abduction of Sita — triggering the cosmic war.',
    themeColor: 'from-[#527450] to-[#8fb88c]',
    accentHex: '#527450',
    sloka: 'धर्मो रक्षति रक्षितः।',
    slokaTranslation: 'Dharma protects those who protect it.',
    heroImage: '/assets/seq_jatayu_fight.png',
    backgroundImage: '/assets/forest_threshold_bg.png',
    characters: [
      { name: 'Ram', role: 'Protagonist', weapon: 'Kodanda', status: 'active', portrait: '/assets/character_ram.png', description: 'Protector of the forest sages whose encounter with Shurpanakha sets off cosmic events.' },
      { name: 'Sita', role: 'Divine Consort', status: 'departed', portrait: '/assets/character_sita.png', description: 'Abducted by Ravana — the catalytic event that defines the entire Ramayana arc.' },
      { name: 'Lakshmana', role: 'Devoted Brother', status: 'active', portrait: '/assets/character_lakshman.png', description: 'Draws the protective Lakshmana Rekha to guard Sita, yet is lured away.' },
      { name: 'Surpanakha', role: 'Demoness', status: 'active', portrait: '/assets/character_surpanakha.png', description: 'Ravana\'s sister whose disfigurement by Lakshmana ignites the war.' },
      { name: 'Ravana', role: 'Antagonist', weapon: 'Chandrahas', status: 'active', portrait: '/assets/character_ravana.png', description: 'Disguises himself as an ascetic to abduct Sita when Ram is lured away.' },
      { name: 'Jatayu', role: 'Divine Eagle', status: 'departed', portrait: '/assets/character_jatayu.png', description: 'The aged king of vultures who fights Ravana in mid-air. Fatally wounded, he lives to tell Ram the truth.' },
      { name: 'Mareecha', role: 'Demon', status: 'departed', portrait: '/assets/character_dasharatha.png', description: 'Takes the form of a golden deer to lure Ram, then cries in Ram\'s voice to lure Lakshmana away.' },
    ],
    locations: [
      { name: 'Dandakaranya', description: 'The vast primordial forest covering central India, home to hundreds of sages\' ashrams.', realWorld: 'Chhattisgarh / Madhya Pradesh region', image: '/assets/forest_threshold_bg.png' },
      { name: 'Panchavati', description: 'A serene hermitage among five banyan trees on the banks of the Godavari River.', realWorld: 'Nashik, Maharashtra', image: '/assets/seq_panchavati.png' },
      { name: 'Shabari\'s Hermitage', description: 'The ashram of the elderly devotee Shabari at the edge of the Dandaka forest.', realWorld: 'Pampa Lake region, Karnataka', image: '/assets/forest_threshold_mid.png' },
    ],
    weapons: [
      { name: 'Chandrahas', wielder: 'Ravana', description: 'The moon-sword gifted by Lord Shiva to Ravana, used during Sita\'s abduction.' },
      { name: 'Kodanda', wielder: 'Ram', description: 'Ram single-handedly destroys the army of Khara and Dushana (14,000 demons).' },
    ],
    dialogues: [
      { speaker: 'Sita', sanskrit: 'गच्छ लक्ष्मण सत्वरं भ्रातरं रक्ष मे प्रियम्।', translation: 'Go, Lakshmana, quickly — save my beloved husband!', context: 'When the deer cries out in Ram\'s voice, Sita insists Lakshmana go, breaking the protection.' },
      { speaker: 'Jatayu', sanskrit: 'तेन नीता च वैदेही रावणेन दुरात्मना।', translation: 'Sita was taken by Ravana, that evil-souled one.', context: 'Jatayu\'s dying words to Ram, revealing who abducted Sita.' },
    ],
    gallery: [
      { image: '/assets/forest_threshold_bg.png', caption: 'The primordial Dandakaranya forest' },
      { image: '/assets/seq_panchavati.png', caption: 'Ram\'s hermitage at Panchavati on the Godavari' },
      { image: '/assets/seq_deer.png', caption: 'The golden deer — Mareecha in disguise' },
      { image: '/assets/seq_lakshmana_rekha.png', caption: 'Lakshmana draws the protective circle' },
      { image: '/assets/seq_jatayu_fight.png', caption: 'Jatayu battles Ravana in the sky' },
      { image: '/assets/seq_ram_grief.png', caption: 'Ram\'s grief upon finding Sita gone' },
    ],
    facts: [
      'Lakshmana drew the protective Rekha (line) around Sita\'s hut with his spear, infusing it with fire energy.',
      'Jatayu was a close friend of Ram\'s father Dasharatha.',
      'Ram performed Jatayu\'s last rites with Vedic honor, calling him a spiritual father.',
      'Ram destroyed Khara\'s army of 14,000 demons single-handedly in under a half-hour.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Aranya Kanda', detail: 'Sargas 1–75, from Ram\'s departure from Chitrakoot to Sita\'s abduction and Jatayu\'s death.' },
      { name: 'Ramcharitmanas — Aranya Kand', detail: 'Tulsidas adds philosophical content about Maya and devotion through these events.' },
    ],
    events: [
      {
        id: 'forest-sages',
        title: 'Dandakaranya — The Forest of Sages',
        subtitle: 'Protector of the Sacred',
        location: 'Dandaka Forest — Atri & Anasuya Ashram',
        description: 'Ram enters the dense Dandaka forest. He visits the ashrams of Sage Atri and Anasuya who adorns Sita with an eternal garment. Hundreds of sages appeal to Ram for protection from nighttime demon raids. Ram promises to rid the forests of evil.',
        characters: ['Ram', 'Sita', 'Lakshmana'],
        media: { hero: '/assets/forest_threshold_mid.png', background: '/assets/forest_threshold_bg.png', parallaxFg: '/assets/forest_threshold_fg.png' },
      },
      {
        id: 'panchavati',
        title: 'The Panchavati Hermitage',
        subtitle: 'Years of Forest Grace',
        location: 'Panchavati, Godavari River, Nashik',
        description: 'On the banks of the Godavari River among five ancient banyan trees, Ram, Sita, and Lakshmana build a beautiful thatched parnashala and spend years in serene meditation, nature walks, and communion with sages.',
        characters: ['Ram', 'Sita', 'Lakshmana'],
        media: { hero: '/assets/seq_panchavati.png', background: '/assets/forest_threshold_bg.png' },
      },
      {
        id: 'shurpanakha-disfigurement',
        title: 'Shurpanakha\'s Humiliation & Khara-Dushana War',
        subtitle: 'The Spark That Lit the Pyre',
        location: 'Panchavati Forest',
        description: 'Ravana\'s sister Shurpanakha arrives in disguise and attacks Sita in jealousy. Lakshmana cuts off her nose and ears. She unleashes Khara and Dushana with 14,000 demons. Ram single-handedly destroys the entire army in a lightning battle.',
        characters: ['Ram', 'Lakshmana', 'Sita', 'Surpanakha'],
        media: { hero: '/assets/seq_lakshmana_rekha.png', background: '/assets/forest_threshold_bg.png' },
        weapon: 'Kodanda',
        turning: true,
      },
      {
        id: 'golden-deer',
        title: 'The Golden Deer — Mareecha\'s Trap',
        subtitle: 'The Art of Perfect Deception',
        location: 'Panchavati Forest',
        description: 'Ravana sends Mareecha in the form of a dazzling golden deer. Sita asks Ram to catch it. Ram pursues deep into the forest. Shot by Ram\'s arrow, Mareecha cries in Ram\'s voice. Sita forces Lakshmana to leave, breaking the protection.',
        characters: ['Ram', 'Sita', 'Lakshmana', 'Mareecha'],
        media: { hero: '/assets/seq_deer.png', background: '/assets/golden_deer_bg.png', parallaxMid: '/assets/golden_deer_mid.png', parallaxFg: '/assets/golden_deer_fg.png' },
        turning: true,
        quote: 'The most dangerous illusions are those that look like gifts.',
      },
      {
        id: 'abduction-sita',
        title: 'Sita\'s Abduction & Jatayu\'s Last Stand',
        subtitle: 'The Darkest Hour',
        location: 'Panchavati to Lanka Airspace',
        description: 'Ravana approaches Sita disguised as an ascetic, reveals his true form, and seizes her. Jatayu attacks Ravana\'s flying chariot in mid-air. Ravana severs Jatayu\'s wings. Dying, Jatayu waits for Ram to tell him the truth.',
        characters: ['Sita', 'Ravana', 'Jatayu', 'Ram', 'Lakshmana'],
        media: { hero: '/assets/seq_jatayu_fight.png', background: '/assets/forest_threshold_bg.png' },
        turning: true,
        quote: 'Jatayu gave his wings so that Dharma might someday fly again.',
      },
    ],
  },
  {
    id: 'kishkindha',
    title: 'Kishkindha Kanda',
    subtitle: 'The Sacred Alliance',
    description: 'Ram and Lakshmana search for Sita in the southern forests. Ram\'s encounter with the devotee Shabari and his alliance with the exiled monkey-king Sugriva form the heart of this chapter. Ram slays the tyrannical Vali and the great search for Sita begins.',
    themeColor: 'from-[#a36c4b] to-[#d6a585]',
    accentHex: '#a36c4b',
    sloka: 'न हि प्रतिज्ञां कुर्वन्ति दीनाः सत्यपराक्रमाः।',
    slokaTranslation: 'Those who possess true valor never go back on their solemn pledge.',
    heroImage: '/assets/seq_search_parties.png',
    backgroundImage: '/assets/golden_deer_bg.png',
    characters: [
      { name: 'Hanuman', role: 'Divine Devotee', weapon: 'Gada', status: 'active', portrait: '/assets/character_hanuman.png', description: 'Son of Vayu. The moment he meets Ram, the universe\'s destiny changes.' },
      { name: 'Sugriva', role: 'Vanara King (Ally)', status: 'active', portrait: '/assets/character_sugriva.png', description: 'Exiled monkey king who makes a covenant with Ram: freedom from Vali in exchange for finding Sita.' },
      { name: 'Vali', role: 'Antagonist (Vanara King)', status: 'departed', portrait: '/assets/character_vali.png', description: 'Tyrant king who usurped Sugriva\'s throne and wife. Possesses a boon of taking half his opponent\'s strength.' },
      { name: 'Angada', role: 'Ally (Prince)', status: 'active', portrait: '/assets/character_angada.png', description: 'Vali\'s son who joins the search party and serves as Ram\'s ambassador to Ravana.' },
      { name: 'Jambavan', role: 'Elder Vanara Sage', status: 'active', portrait: '/assets/character_jambavan.png', description: 'Ancient bear-king who reminds Hanuman of his forgotten divine powers at the crucial moment.' },
      { name: 'Shabari', role: 'Devotee-Saint', status: 'departed', portrait: '/assets/character_shabari.png', description: 'An elderly tribal woman who has waited decades for Ram, tasting each berry to ensure they are sweet enough.' },
      { name: 'Sampati', role: 'Vulture Elder', status: 'active', portrait: '/assets/character_sampati.png', description: 'Jatayu\'s elder brother who reveals Sita\'s location using his divine long-range vision.' },
    ],
    locations: [
      { name: 'Shabari\'s Hermitage', description: 'The ashram of the devoted saint Shabari in the Matanga forest.', realWorld: 'Pampa Lake, Hampi, Karnataka', image: '/assets/forest_threshold_mid.png' },
      { name: 'Rishyamukha Hill', description: 'The sacred mountain where Sugriva hides from Vali\'s curse.', realWorld: 'Hampi, Bellary, Karnataka', image: '/assets/golden_deer_bg.png' },
      { name: 'Kishkindha', description: 'The great monkey kingdom ruled by Vali (and later Sugriva) in the rocky Deccan terrain.', realWorld: 'Hospet-Hampi area, Karnataka', image: '/assets/chapter_ayodhya.png' },
    ],
    weapons: [
      { name: 'Kodanda (Test Arrow)', wielder: 'Ram', description: 'Ram shoots a single arrow through seven Sal trees, proving his divine power to Sugriva before the fight with Vali.' },
    ],
    dialogues: [
      { speaker: 'Shabari', sanskrit: 'आगतोऽसि महाबाहो मया चिन्तित एव सः।', translation: 'O mighty-armed one, you have come — the very one I have been awaiting.', context: 'Shabari greets Ram with pure ecstatic love after decades of devoted waiting.' },
      { speaker: 'Jambavan', sanskrit: 'स्मर हनुमान् सेलानि शैलानि च महाबलः।', translation: 'Remember, O mighty Hanuman, the power of the mountains — your own divine strength!', context: 'Jambavan reminds the despairing Hanuman of his limitless divine power.' },
    ],
    gallery: [
      { image: '/assets/character_shabari.png', caption: 'Shabari offers wild berries to Lord Ram' },
      { image: '/assets/character_hanuman.png', caption: 'Hanuman\'s first meeting with Lord Ram' },
      { image: '/assets/character_vali.png', caption: 'The Battle of Vali and Sugriva' },
      { image: '/assets/seq_search_parties.png', caption: 'Search parties dispatched across the four directions' },
      { image: '/assets/character_sampati.png', caption: 'Sampati reveals Sita\'s location to the southern party' },
    ],
    facts: [
      'Shabari had been waiting decades for Ram at the instruction of her guru Sage Matanga.',
      'Vali had a boon that half of any opponent\'s strength would transfer to him — hence Ram shot from behind a tree.',
      'Jambavan claimed to have been present at the churning of the ocean (Samudra Manthan) in a previous age.',
      'Sampati had lost his wings saving Jatayu from the sun and lived as a blind elder on the coastal cliffs.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Kishkindha Kanda', detail: 'Sargas 1–67, from Shabari to the dispatching of Vanara search parties.' },
      { name: 'Ramcharitmanas — Kishkindha Kand', detail: 'Emphasizes devotional aspects — particularly Shabari and Hanuman\'s meeting with Ram.' },
    ],
    events: [
      {
        id: 'shabari-devotion',
        title: 'Shabari\'s Pure Devotion',
        subtitle: 'The Berry That Pleased God',
        location: 'Matanga Ashram, Pampa Lake',
        description: 'Ram and Lakshmana arrive at the hermitage of the elderly saint Shabari. Out of ecstatic devotion, she tastes each wild berry first to ensure they are sweet before feeding them to Ram. Ram accepts them as the finest offering, declaring her bhakti as the purest path to the Divine.',
        characters: ['Ram', 'Shabari', 'Lakshmana'],
        media: { hero: '/assets/character_shabari.png', background: '/assets/forest_threshold_bg.png' },
        quote: 'God does not see the gift — he sees the love behind it.',
      },
      {
        id: 'hanuman-meeting',
        title: 'The Divine Meeting: Ram and Hanuman',
        subtitle: 'Devotion Finds Its Lord',
        location: 'Rishyamukha Hill, Pampa Lake',
        description: 'Disguised as a brahmin, Hanuman approaches Ram and Lakshmana. Upon seeing Ram, he recognizes the Divine. Ram, moved by Hanuman\'s eloquence, embraces him. Hanuman leads them to Sugriva and the great alliance is formed.',
        characters: ['Ram', 'Hanuman', 'Sugriva', 'Lakshmana'],
        media: { hero: '/assets/character_hanuman.png', background: '/assets/golden_deer_bg.png' },
        turning: true,
        quote: 'When Ram met Hanuman, the universe\'s greatest friendship was born.',
      },
      {
        id: 'vali-vadh',
        title: 'Slaying of Vali',
        subtitle: 'Justice from the Hidden Archer',
        location: 'Kishkindha Kingdom',
        description: 'Sugriva challenges Vali to a duel. Hidden behind a tree, Ram shoots Vali with a single arrow. The dying Vali questions Ram\'s ethics. Ram explains: as a king, he is bound to stop a tyrant who usurped his brother\'s wife and throne.',
        characters: ['Ram', 'Sugriva', 'Vali', 'Angada'],
        media: { hero: '/assets/character_vali.png', background: '/assets/golden_deer_bg.png' },
        weapon: 'Kodanda',
        turning: true,
      },
      {
        id: 'sampati-clue',
        title: 'Search Parties & Sampati\'s Revelation',
        subtitle: 'The Old Eagle\'s Last Gift',
        location: 'Southern Coastal Cliffs',
        description: 'Sugriva dispatches armies in all four directions. The southern party (Hanuman, Angada, Jambavan) reaches the ocean, demoralized. The ancient blind vulture Sampati reveals using his supernatural vision that Sita is alive in Lanka, 100 yojanas away.',
        characters: ['Hanuman', 'Angada', 'Jambavan', 'Sampati'],
        media: { hero: '/assets/seq_search_parties.png', background: '/assets/golden_deer_bg.png' },
        turning: true,
        quote: 'The blind eagle saw what the searching eyes could not: hope.',
      },
    ],
  },
  {
    id: 'sundara',
    title: 'Sundara Kanda',
    subtitle: 'The Horizon of Faith',
    description: 'Named "Sundara" (beautiful) for its portrayal of Hanuman\'s extraordinary journey to Lanka — the most auspicious Kanda. Hanuman leaps the ocean, locates Sita in the Ashoka grove, delivers Ram\'s ring, receives Sita\'s Chudamani, and burns Lanka before returning with hope.',
    themeColor: 'from-[#4f798e] to-[#8bb3c7]',
    accentHex: '#4f798e',
    sloka: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।',
    slokaTranslation: 'Truth alone triumphs, not falsehood. Through truth, the divine path is spread.',
    heroImage: '/assets/seq_hanuman_leap.png',
    backgroundImage: '/assets/seq_lanka_burning.png',
    characters: [
      { name: 'Hanuman', role: 'Divine Hero', weapon: 'Gada / Divine Tail', status: 'active', portrait: '/assets/character_hanuman.png', description: 'The star of this Kanda. His courage, devotion, and wit in Lanka is the greatest act of heroism in the Ramayana.' },
      { name: 'Sita', role: 'Captive Divine Mother', status: 'active', portrait: '/assets/character_sita.png', description: 'Found weeping under an Ashoka tree in Lanka, refusing Ravana\'s daily advances.' },
      { name: 'Ravana', role: 'Demon King', status: 'active', portrait: '/assets/character_ravana.png', description: 'King of Lanka who continues his daily humiliation of Sita. A scholar and musician despite his evil.' },
      { name: 'Mandodari', role: 'Ravana\'s Queen', status: 'active', portrait: '/assets/character_mandodari.png', description: 'The virtuous queen of Lanka who repeatedly counsels Ravana to return Sita.' },
      { name: 'Indrajit (Meghnad)', role: 'Ravana\'s Son', weapon: 'Brahmastra Noose', status: 'active', portrait: '/assets/character_indrajit.png', description: 'Ravana\'s powerful son who captures Hanuman with a Brahmastra. The greatest warrior of Lanka.' },
      { name: 'Vibhishana', role: 'Righteous Prince', status: 'active', portrait: '/assets/character_vibhishana.png', description: 'Ravana\'s youngest brother who secretly sympathizes with Hanuman and ultimately defects to Ram.' },
    ],
    locations: [
      { name: 'Mahendragiri', description: 'The mountain from which Hanuman takes his great leap to Lanka.', realWorld: 'Cape Comorin region, Tamil Nadu', image: '/assets/seq_search_parties.png' },
      { name: 'Lanka (Golden City)', description: 'Ravana\'s magnificent golden city described as surpassing the heavens in wealth.', realWorld: 'Sri Lanka', image: '/assets/seq_lanka_burning.png' },
      { name: 'Ashoka Vatika', description: 'The royal garden where Ravana holds Sita captive under an ancient Ashoka tree.', realWorld: 'Seetha Eliya, Sri Lanka', image: '/assets/seq_sita_ashoka.png' },
    ],
    weapons: [
      { name: 'Brahmastra Rope', wielder: 'Indrajit', description: 'The Brahmastra manifested as a noose of divine light — the only thing that could bind Hanuman momentarily.' },
    ],
    dialogues: [
      { speaker: 'Sita', sanskrit: 'का त्वं कस्य कुतो वापि किं कार्यमिह तेऽनघ।', translation: 'Who are you? Whose emissary? From where? What brings you here, O sinless one?', context: 'Sita\'s careful, fearful first words to Hanuman, testing whether he is real or an illusion from Ravana.' },
      { speaker: 'Hanuman', sanskrit: 'दूतोऽस्मि रामस्य विदेहपुत्र्याः।', translation: 'I am the emissary of Ram, the husband of the daughter of Videha.', context: 'Hanuman boldly declares himself before Ravana\'s entire court with complete fearlessness.' },
    ],
    gallery: [
      { image: '/assets/seq_hanuman_leap.png', caption: 'Hanuman\'s great leap across the ocean' },
      { image: '/assets/seq_ram_ring.png', caption: 'Hanuman presents Ram\'s ring to Sita' },
      { image: '/assets/seq_sita_ashoka.png', caption: 'Sita in the Ashoka grove, guarded by demons' },
      { image: '/assets/seq_chudamani.png', caption: 'Sita gives Hanuman her Chudamani hair ornament' },
      { image: '/assets/seq_lanka_burning.png', caption: 'Hanuman sets Lanka ablaze' },
      { image: '/assets/lanka_burning_bg.png', caption: 'The golden city of Lanka burning' },
    ],
    facts: [
      'The Sundara Kanda is the most auspicious section and is read alone for blessings and healing.',
      'Hanuman shrank to a small size to enter Lanka at night and expanded massively after his tail was set afire.',
      'Hanuman killed Ravana\'s son Akshayakumara before Indrajit finally captured him.',
      'Sita gave Hanuman her precious hair ornament (Chudamani) as proof she had been found.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Sundara Kanda', detail: 'Sargas 1–68, from Hanuman\'s leap to his return with news of Sita.' },
      { name: 'Tulsidas Ramcharitmanas — Sundar Kand', detail: 'The most beloved and recited section in North India.' },
    ],
    events: [
      {
        id: 'ocean-leap',
        title: 'The Great Ocean Leap',
        subtitle: 'Faith Has No Distance',
        location: 'Mahendragiri to Lanka — 100 Yojanas',
        description: 'Jambavan reminds Hanuman of his divine heritage. Hanuman expands to cosmic size on the peak of Mahendragiri and takes a single leap across the 100-yojana ocean. He defeats Surasa and Simhika mid-ocean before landing in Lanka.',
        characters: ['Hanuman', 'Jambavan'],
        media: { hero: '/assets/seq_hanuman_leap.png', background: '/assets/ram_setu_bg.png' },
        turning: true,
        quote: 'When you know who you are, no ocean can stop you.',
      },
      {
        id: 'ashoka-ring',
        title: 'Sita in the Ashoka Grove & The Ring',
        subtitle: 'Recognition Across All Darkness',
        location: 'Ashoka Vatika, Lanka',
        description: 'Hanuman searches Lanka in darkness. He finds Sita weeping under an Ashoka tree, emaciated, in a soiled sari, surrounded by demon guards. He drops Ram\'s signet ring from the tree. Sita, overwhelmed, gives her precious Chudamani hair ornament as proof for Ram.',
        characters: ['Hanuman', 'Sita', 'Ravana'],
        media: { hero: '/assets/seq_ram_ring.png', background: '/assets/seq_sita_ashoka.png', thumbnail: '/assets/seq_chudamani.png' },
        turning: true,
        quote: 'Even in the darkest darkness, Ram\'s ring was the light that did not go out.',
      },
      {
        id: 'lanka-burning',
        title: 'Lanka Burns — Hanuman\'s Fury',
        subtitle: 'The Messenger Becomes the Storm',
        location: 'Golden Lanka',
        description: 'After destroying the Ashoka grove and killing Akshayakumara, Hanuman is captured by Indrajit\'s Brahmastra noose and brought to Ravana\'s court. His tail is set aflame. Hanuman expands his form, breaks free, and leaps from palace to palace setting the golden rooftops ablaze. Lanka burns.',
        characters: ['Hanuman', 'Ravana', 'Indrajit', 'Vibhishana'],
        media: { hero: '/assets/seq_lanka_burning.png', background: '/assets/lanka_burning_bg.png', parallaxMid: '/assets/lanka_burning_mid.png', parallaxFg: '/assets/lanka_burning_fg.png' },
        turning: true,
        quote: 'They tried to humiliate the devotee of Ram. Instead, they lit their own funeral pyre.',
      },
    ],
  },
  {
    id: 'yuddha',
    title: 'Yuddha Kanda',
    subtitle: 'The War of Dharma',
    description: 'The great war for Sita. Ram leads his Vanara army across the ocean on a floating stone bridge, lays siege to Lanka, and wages an epic battle against Ravana\'s legendary army. Every great warrior falls. Ravana is slain with the Brahmastra. Sita is reunited with Ram and the triumphant return to Ayodhya culminates in the coronation of Ram Rajya.',
    themeColor: 'from-[#903338] to-[#c66266]',
    accentHex: '#903338',
    sloka: 'सकृदेव प्रपन्नाय तवास्मीति च याचते। अभयं सर्वभूतेभ्यो ददाम्येतद्व्रतं मम॥',
    slokaTranslation: 'To whoever surrenders once and says "I am yours", I grant safety from all beings. This is my solemn pledge.',
    heroImage: '/assets/chapter_lanka.png',
    backgroundImage: '/assets/lanka_burning_bg.png',
    characters: [
      { name: 'Ram', role: 'Protagonist', weapon: 'Brahmastra', status: 'active', portrait: '/assets/character_ram.png', description: 'Commander of the Vanara army who personally duels and defeats Ravana.' },
      { name: 'Ravana', role: 'Demon King', weapon: 'Chandrahas, Brahmastra', status: 'departed', portrait: '/assets/character_ravana.png', description: 'Greatest warrior-demon ever born. Scholar of the Vedas, devotee of Shiva, consumed by ego.' },
      { name: 'Vibhishana', role: 'Defector / Ally', status: 'active', portrait: '/assets/character_vibhishana.png', description: 'Ravana\'s righteous brother who joins Ram\'s side and is promised Lanka\'s throne.' },
      { name: 'Indrajit (Meghnad)', role: 'Champion of Lanka', weapon: 'Brahmastra, Nagastra', status: 'departed', portrait: '/assets/character_indrajit.png', description: 'Ravana\'s greatest son who wounds both Ram and Lakshmana with celestial weapons. Slain by Lakshmana.' },
      { name: 'Kumbhakarna', role: 'Giant Warrior', status: 'departed', portrait: '/assets/character_kumbhakarna.png', description: 'Ravana\'s massive younger brother who sleeps six months at a stretch. Fights tremendously before Ram beheads him.' },
      { name: 'Mandodari', role: 'Ravana\'s Queen', status: 'active', portrait: '/assets/character_mandodari.png', description: 'Her lamentations over Ravana\'s death are among the most poetic passages in the entire Ramayana.' },
      { name: 'Hanuman', role: 'Divine Hero', weapon: 'Gada', status: 'active', portrait: '/assets/character_hanuman.png', description: 'Carries the entire Sanjeevani mountain to revive Lakshmana. Fights with extraordinary valor throughout.' },
      { name: 'Angada', role: 'Prince / Ambassador', status: 'active', portrait: '/assets/character_angada.png', description: 'Serves as Ram\'s ambassador to Ravana\'s court. His planted foot cannot be moved by all of Lanka\'s warriors.' },
    ],
    locations: [
      { name: 'Ram Setu (Adam\'s Bridge)', description: 'The floating stone bridge constructed by Vanara engineers Nala and Nila across the ocean to Lanka.', realWorld: 'Dhanushkodi, Tamil Nadu — Mannar, Sri Lanka', image: '/assets/ram_setu_bg.png' },
      { name: 'Lanka Battlefield', description: 'The plains outside Lanka\'s golden gates where the epic war was fought.', realWorld: 'Sri Lanka', image: '/assets/chapter_lanka.png' },
      { name: 'Dronagiri Mountain', description: 'The Himalayan mountain Hanuman uproots and carries to Lanka for the Sanjeevani herb.', realWorld: 'Chamoli, Uttarakhand', image: '/assets/chapter_setu.png' },
    ],
    weapons: [
      { name: 'Brahmastra', wielder: 'Ram', description: 'The supreme divine missile of Brahma — the final weapon used to pierce Ravana\'s navel and end his immortality.' },
      { name: 'Nagastra', wielder: 'Indrajit', description: 'A serpent-weapon that binds Ram and Lakshmana in coils of a thousand cobras.' },
      { name: 'Chandrahas', wielder: 'Ravana', description: 'Shiva\'s crescent moon sword — among the most powerful weapons in the three worlds.' },
      { name: 'Sanjeevani Herb', wielder: 'Hanuman', description: 'The miraculous life-restoring herb from the Himalayan mountain. Hanuman brings the entire mountain when he cannot identify it.' },
    ],
    dialogues: [
      { speaker: 'Ram', sanskrit: 'सकृदेव प्रपन्नाय तवास्मीति च याचते।', translation: 'Whoever surrenders once and says "I am yours" — I grant them safety from all beings. This is my eternal vow.', context: 'Ram accepts Vibhishana despite the army\'s objection, setting the principle of unconditional refuge.' },
      { speaker: 'Ravana', sanskrit: 'न मे त्रातास्ति देवेषु न गन्धर्वेषु नासुरे।', translation: 'There is no savior for me among the gods, gandharvas, or demons.', context: 'Ravana\'s final realization in battle — his ego has destroyed him.' },
    ],
    gallery: [
      { image: '/assets/ram_setu_bg.png', caption: 'Construction of Ram Setu — floating stones' },
      { image: '/assets/ram_setu_fg.png', caption: 'Vanara army crosses Ram Setu' },
      { image: '/assets/chapter_lanka.png', caption: 'The great Lanka war in full fury' },
      { image: '/assets/character_kumbhakarna.png', caption: 'Kumbhakarna awakens for battle' },
      { image: '/assets/character_indrajit.png', caption: 'Indrajit — champion of Lanka' },
      { image: '/assets/seq_coronation_announced.png', caption: 'Ram\'s coronation in Ayodhya after return' },
    ],
    facts: [
      'Ram Setu was built by Vanara engineers Nala and Nila, whose touch made stones float.',
      'Kumbhakarna had to be forcibly woken after months of sleep and then ate mountains of food before battle.',
      'Indrajit had earned his name after once binding Indra, the king of gods himself.',
      'The Sanjeevani mountain episode is celebrated as one of the greatest acts of devotion in world literature.',
      'Ram\'s Brahmastra was formed from the wind (feathers), fire, and sun (tip) — it could destroy all three worlds.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Yuddha Kanda', detail: 'The largest Kanda — Sargas 1–131 — covering the full war narrative.' },
      { name: 'Ramcharitmanas — Lanka Kand', detail: 'Tulsidas compresses the war while expanding philosophical dimensions.' },
      { name: 'Critical Edition (BORI, Pune)', detail: 'Scholarly critical edition that resolves textual variants in the battle sequences.' },
    ],
    events: [
      {
        id: 'vibhishana-defection',
        title: 'Vibhishana\'s Defection & Ram\'s Covenant',
        subtitle: 'The Righteous One Crosses Over',
        location: 'Rameswaram Coast',
        description: 'Vibhishana, unable to tolerate Ravana\'s adharma, is banished from Lanka for advising the return of Sita. He flies to Ram\'s camp. Despite objections, Ram grants him unconditional refuge and promises he will be king of Lanka after Ravana falls.',
        characters: ['Ram', 'Vibhishana', 'Hanuman', 'Sugriva'],
        media: { hero: '/assets/character_vibhishana.png', background: '/assets/ram_setu_bg.png' },
        turning: true,
        quote: 'I grant refuge to all who surrender to me — this is my eternal vow.',
      },
      {
        id: 'ram-setu',
        title: 'Construction of Ram Setu',
        subtitle: 'The Bridge Built by Faith',
        location: 'Dhanushkodi to Lanka Coast',
        description: 'Vanara engineers Nala and Nila lead the army in building a floating bridge. Stones with "RAM" inscribed float miraculously. The 100-yojana bridge is completed and the army marches to Lanka\'s shores.',
        characters: ['Ram', 'Lakshmana', 'Hanuman', 'Sugriva'],
        media: { hero: '/assets/ram_setu_fg.png', background: '/assets/ram_setu_bg.png', parallaxMid: '/assets/ram_setu_mid.png', parallaxFg: '/assets/ram_setu_fg.png' },
        turning: true,
      },
      {
        id: 'kumbhakarna-battle',
        title: 'The Great Battle: Kumbhakarna Falls',
        subtitle: 'The Mountain That Walked',
        location: 'Lanka Battlefield',
        description: 'Ravana wakes the sleeping giant Kumbhakarna who eats mountains of food and marches to battle. The Vanara army scatters in terror. Ram finally enters the battle and severs Kumbhakarna\'s head with the divine Indrastra arrow.',
        characters: ['Ram', 'Kumbhakarna', 'Hanuman', 'Sugriva', 'Lakshmana'],
        media: { hero: '/assets/character_kumbhakarna.png', background: '/assets/chapter_lanka.png' },
        weapon: 'Indrastra',
      },
      {
        id: 'sanjeevani',
        title: 'Lakshmana Falls & Sanjeevani Mountain',
        subtitle: 'Devotion That Moved a Mountain',
        location: 'Lanka — Himalayas — Lanka',
        description: 'Indrajit wounds Lakshmana with a Nagastra, leaving him near death. Hanuman flies to the Himalayas at night. Unable to identify the exact Sanjeevani herb, he lifts the entire Dronagiri mountain and carries it back to Lanka. Lakshmana is revived.',
        characters: ['Hanuman', 'Lakshmana', 'Ram', 'Indrajit'],
        media: { hero: '/assets/chapter_setu.png', background: '/assets/chapter_lanka.png' },
        turning: true,
        quote: 'When he could not find the herb, he brought the mountain itself.',
      },
      {
        id: 'ravana-slain',
        title: 'The Slaying of Ravana',
        subtitle: 'The Brahmastra of Dharma',
        location: 'Lanka Battlefield',
        description: 'Ram and Ravana fight for days. Ram destroys each of Ravana\'s ten heads but they regrow. Agastya reveals: fire the Brahmastra at Ravana\'s navel — the seat of his amrita. Ram fires the divine missile. Ravana falls. The three worlds rejoice.',
        characters: ['Ram', 'Ravana', 'Vibhishana', 'Mandodari'],
        media: { hero: '/assets/character_ravana.png', background: '/assets/chapter_lanka.png' },
        weapon: 'Brahmastra',
        turning: true,
        quote: 'When the head of adharma fell, even the earth sighed with relief.',
      },
      {
        id: 'return-coronation',
        title: 'Agni Pariksha, Pushpaka Return & Coronation',
        subtitle: 'Dharma Comes Home',
        location: 'Lanka → Ayodhya Palace',
        description: 'Sita undergoes the Agni Pariksha — Agni himself declares her purity. The party boards the Pushpaka Vimana and flies to Ayodhya. Ram is crowned King in the grand Pattabhisheka ceremony. Ram Rajya begins.',
        characters: ['Ram', 'Sita', 'Lakshmana', 'Bharata', 'Shatrughna', 'Hanuman', 'Vibhishana'],
        media: { hero: '/assets/seq_coronation_announced.png', background: '/assets/ayodhya_gate_bg.png' },
        turning: true,
        quote: 'Dharma had wandered 14 years. Now it came home, and the whole earth celebrated.',
      },
    ],
  },
  {
    id: 'uttara',
    title: 'Uttara Kanda',
    subtitle: 'The Final Testament',
    description: 'The epilogue of the Ramayana. Ram Rajya is established — an era of absolute peace and justice. Yet Ram faces his most painful sacrifice: the exile of Sita. She raises Luv and Kush in Valmiki\'s ashram. The final reunion ends in Sita\'s Bhoomi Pariksha and Ram\'s Jal Samadhi — the completion of the avatar.',
    themeColor: 'from-[#7a6b57] to-[#b19f86]',
    accentHex: '#7a6b57',
    sloka: 'लोकाः समस्ताः सुखिनो भवन्तु।',
    slokaTranslation: 'May all beings in all the worlds be happy, peaceful, and free.',
    heroImage: '/assets/seq_coronation_announced.png',
    backgroundImage: '/assets/ayodhya_gate_bg.png',
    characters: [
      { name: 'Ram', role: 'King & Avatar', status: 'transformed', portrait: '/assets/character_ram.png', description: 'Rules as the ideal king, then makes the most painful sacrifice — exiling Sita. Returns to Vishnu at the Sarayu.' },
      { name: 'Sita', role: 'Divine Mother', status: 'transformed', portrait: '/assets/character_sita.png', description: 'Born from Earth, returns to Earth. Her final Bhoomi Pariksha is an act of supreme self-determination.' },
      { name: 'Luv', role: 'Prince', status: 'active', portrait: '/assets/character_luv_kush.png', description: 'Ram\'s first-born son raised by Sita in Valmiki\'s ashram. A warrior-poet who learns the Ramayana from Valmiki.' },
      { name: 'Kush', role: 'Prince', status: 'active', portrait: '/assets/character_luv_kush.png', description: 'Ram\'s twin son who captures the Ashwamedha horse and defeats the entire royal army.' },
      { name: 'Valmiki', role: 'Sage & Poet', status: 'active', portrait: '/assets/character_valmiki.png', description: 'Author of the Ramayana. Shelters Sita, raises Luv and Kush, and presents them to Ram at court.' },
    ],
    locations: [
      { name: 'Valmiki\'s Ashram (Bithoor)', description: 'The forest hermitage where Sita lives in exile and gives birth to Luv and Kush.', realWorld: 'Bithoor, near Kanpur, Uttar Pradesh', image: '/assets/forest_threshold_bg.png' },
      { name: 'Sarayu River, Ayodhya', description: 'The sacred river where Ram performs his final Jal Samadhi, completing the avatar mission.', realWorld: 'Sarayu River, Ayodhya, Uttar Pradesh', image: '/assets/ayodhya_gate_bg.png' },
    ],
    weapons: [],
    dialogues: [
      { speaker: 'Sita', sanskrit: 'यथाहमावनस्य मनसाऽपि न चिन्तये। तथा मे माधवी देवी विवरं दातुमर्हति॥', translation: 'As I have never thought of any man other than Ram even in my heart, may the Earth goddess receive me.', context: 'Sita\'s final declaration before the earth opens and Bhoomi Devi takes her back.' },
    ],
    gallery: [
      { image: '/assets/seq_coronation_announced.png', caption: 'Ram Rajya — the age of perfect governance' },
      { image: '/assets/character_luv_kush.png', caption: 'Luv and Kush, the warrior-poet princes' },
      { image: '/assets/character_valmiki.png', caption: 'Valmiki teaches Luv and Kush the Ramayana' },
      { image: '/assets/ayodhya_gate_bg.png', caption: 'The Sarayu River — where Ram\'s journey ends' },
    ],
    facts: [
      'Ram Rajya is described as a rule where no subject dies young, disease is absent, and rain comes on time.',
      'Luv and Kush sang the full Ramayana at Ram\'s court over multiple days, not knowing it was their father\'s story.',
      'Sita\'s Bhoomi Pariksha differs from the Agni Pariksha — she chose to return to her origin, not prove herself again.',
      'Ram entered the Sarayu with his brothers and thousands of citizens — all returning to their divine forms.',
      'Valmiki composed the Ramayana while Ram\'s events were still unfolding.',
    ],
    references: [
      { name: 'Valmiki Ramayana — Uttara Kanda', detail: 'The last and most debated Kanda — some scholars consider it a later addition.' },
      { name: 'Ramcharitmanas (Tulsidas)', detail: 'Tulsidas ends with the coronation and does not include the Sita exile narrative.' },
      { name: 'Adhyatma Ramayana', detail: 'Frames Uttara Kanda events as divine cosmic play (Leela) rather than actual suffering.' },
    ],
    events: [
      {
        id: 'ram-rajya',
        title: 'Ram Rajya — The Golden Era',
        subtitle: 'When Justice Was the Only Law',
        location: 'Kingdom of Ayodhya',
        description: 'Ram is crowned King and establishes Ram Rajya — perfect justice, no child dies before its parents, no disease spreads, rains are plentiful, sorrow does not exist. Every subject feels personally heard by the king.',
        characters: ['Ram', 'Sita', 'Lakshmana', 'Bharata', 'Shatrughna'],
        media: { hero: '/assets/seq_coronation_announced.png', background: '/assets/ayodhya_gate_bg.png' },
        turning: true,
        quote: 'Ram Rajya was not the rule of a king — it was the rule of conscience.',
      },
      {
        id: 'sita-exile',
        title: 'Sita\'s Second Exile',
        subtitle: 'The Weight of the Crown',
        location: 'Valmiki\'s Ashram, Bithoor',
        description: 'A washerman questions Sita\'s purity. Ram, bound by his duty to the throne above personal love, sends Lakshmana to leave Sita near Valmiki\'s ashram. Sita, pregnant, is sheltered by Valmiki.',
        characters: ['Sita', 'Valmiki', 'Ram', 'Lakshmana'],
        media: { hero: '/assets/character_valmiki.png', background: '/assets/forest_threshold_bg.png' },
        turning: true,
        quote: 'The greatest sacrifice is not giving your life — it is giving what you love most.',
      },
      {
        id: 'luv-kush-story',
        title: 'Luv-Kush: The Warrior Poets',
        subtitle: 'The Sons Who Did Not Know Their Father',
        location: 'Valmiki\'s Ashram & Ayodhya Court',
        description: 'Sita gives birth to twins Luv and Kush who grow up as fierce warriors and devotional poets. They capture Ram\'s Ashwamedha sacrificial horse, defeat his entire army, and recite the Ramayana before Ram\'s court — not knowing they are singing their father\'s story.',
        characters: ['Luv', 'Kush', 'Sita', 'Valmiki', 'Ram'],
        media: { hero: '/assets/character_luv_kush.png', background: '/assets/forest_threshold_bg.png' },
        turning: true,
      },
      {
        id: 'bhoomi-jal-samadhi',
        title: 'Sita\'s Bhoomi Pariksha & Ram\'s Jal Samadhi',
        subtitle: 'Return to the Source',
        location: 'Ayodhya Court → Sarayu River',
        description: 'Summoned to court, Sita calls upon Mother Bhoomi Devi — and the earth opens. She descends, returning to her origin. Ram then completes his avatar mission by walking into the sacred Sarayu River with his brothers and countless citizens, returning to eternal Vishnu-form.',
        characters: ['Ram', 'Sita', 'Luv', 'Kush'],
        media: { hero: '/assets/ayodhya_gate_bg.png', background: '/assets/ayodhya_gate_bg.png' },
        turning: true,
        quote: 'Born of Earth. Raised by Earth. Returned to Earth. Eternal.',
      },
    ],
  },
  {
    id: 'ayodhya-mandir',
    title: 'New Ayodhya & Shri Ram Mandir',
    subtitle: 'The Divine Homecoming',
    description: 'Five centuries of faith. The newly built Shri Ram Janmabhoomi Mandir in Ayodhya is one of the largest temple complexes in the world — a masterpiece of Nagara temple architecture built to honor the birthplace of Lord Ram. Explore modern Ayodhya, the Saryu River Ghats, Deepotsav, and the sanctum of Ram Lalla.',
    themeColor: 'from-[#c29a4a] to-[#e67554]',
    accentHex: '#c29a4a',
    sloka: 'मङ्गलं कोसलेन्द्राय महनीयगुणाब्धये। चक्रवर्तितनूजाय सार्वभौमाय मङ्गलम्॥',
    slokaTranslation: 'Auspiciousness to the Lord of Kosala, the ocean of noble virtues, the sovereign Lord of all.',
    heroImage: '/assets/bg_temple.png',
    backgroundImage: '/assets/bg_temple.png',
    characters: [
      { name: 'Ram Lalla', role: 'Divine Idol', status: 'active', portrait: '/assets/ram_lalla_shringaar.png', description: 'The 51-inch black stone idol of Lord Ram as a child — serene, joyous, standing on a lotus pedestal in the Garbhagriha.' },
    ],
    locations: [
      { name: 'Shri Ram Janmabhoomi Teerth Kshetra', description: 'The sacred birthplace temple complex. 392 pillars, 5 mandapas, 70 acres.', realWorld: 'Ayodhya, Uttar Pradesh, India', image: '/assets/bg_temple.png' },
      { name: 'Saryu River Ghats', description: 'The ancient sacred river and its ghats — site of the annual Deepotsav.', realWorld: 'Ayodhya, Uttar Pradesh, India', image: '/assets/ayodhya_gate_bg.png' },
    ],
    weapons: [],
    dialogues: [
      { speaker: 'Tradition', sanskrit: 'श्रीरामचन्द्राय नमः।', translation: 'Salutations to Shri Ramachandra.', context: 'The universal greeting and mantra of all pilgrims who visit the Ram Mandir in Ayodhya.' },
    ],
    gallery: [
      { image: '/assets/ram_lalla_shringaar.png', caption: 'Ram Lalla in Vaidika Shringaar' },
      { image: '/assets/ram_lalla_saffron.png', caption: 'Ram Lalla in Peetambara Saffron' },
      { image: '/assets/ram_lalla_flowers.png', caption: 'Ram Lalla adorned in Pushpa Shringaar' },
      { image: '/assets/ram_lalla_lotus.png', caption: 'Ram Lalla on the divine Lotus Pedestal' },
      { image: '/assets/ram_lalla_yellow.png', caption: 'Ram Lalla in Swarna Yellow robes' },
      { image: '/assets/ram_lalla_abhisheka_milk.png', caption: 'Ksheera Abhishekam at dawn' },
    ],
    facts: [
      'The Ram Mandir was built in the Nagara style using pink sandstone from Rajasthan.',
      'The temple complex spans 70 acres; the main sanctum (garbhagriha) is 161 feet tall.',
      'The Ram Lalla idol was sculpted by Arun Yogiraj in black granite from the Mysore region.',
      'Ayodhya\'s Deepotsav festival holds the Guinness World Record for most oil lamps lit simultaneously.',
      'Ram Path in Ayodhya is an 80-meter-wide heritage corridor connecting the temple to the Saryu Ghats.',
    ],
    references: [
      { name: 'Shri Ram Janmabhoomi Teerth Kshetra Trust', detail: 'The official managing trust of the Ram Mandir complex.' },
      { name: 'Archaeological Survey of India', detail: 'Excavations from 2003 confirmed ancient temple structures dating to the 12th century.' },
      { name: 'Supreme Court of India (2019)', detail: 'Historic judgment awarding the disputed land for construction of the Ram Mandir.' },
    ],
    events: [
      {
        id: 'new-ayodhya',
        title: 'New Ayodhya & Saryu Deepotsav',
        subtitle: 'A Million Lamps Return the Light',
        location: 'Saryu River Ghats, Ayodhya',
        description: 'Experience the cultural renaissance of modern Ayodhya. The sacred Saryu River and its ancient Ghats come alive during the spectacular Deepotsav — millions of floating earthen lamps (diyas) illuminate the water, recreating the mythic night Ram returned from Lanka.',
        characters: ['Ram', 'Sita', 'Lakshmana', 'Hanuman'],
        media: { hero: '/assets/ayodhya_gate_bg.png', background: '/assets/ayodhya_gate_bg.png', parallaxFg: '/assets/ayodhya_gate_fg.png', parallaxMid: '/assets/ayodhya_gate_mid.png' },
        quote: 'Every diya lit is a prayer that Ram\'s light never goes out.',
      },
      {
        id: 'ram-mandir',
        title: 'The Shri Ram Mandir — Architectural Marvel',
        subtitle: 'Stone, Faith, and Centuries',
        location: 'Shri Ram Janmabhoomi Teerth Kshetra',
        description: '392 carved pillars, 5 mandapas (domed halls), pink Rajasthani sandstone, intricate Nagara shikhara. Five centuries of faith crystallized in stone — the largest temple complex in modern India.',
        characters: ['Ram'],
        media: { hero: '/assets/bg_temple.png', background: '/assets/bg_temple.png' },
      },
      {
        id: 'garbhagriha',
        title: 'Garbhagriha — The Sanctum of Ram Lalla',
        subtitle: 'The Child God Awaits',
        location: 'Garbhagriha, Shri Ram Mandir',
        description: 'Behold the divine Ram Lalla — a 51-inch black stone idol of Lord Ram as a five-year-old child, standing in a gracious tribhanga pose on a lotus pedestal. Adorned daily in seasonal shringaar, gems, and gold.',
        characters: ['Ram'],
        media: { hero: '/assets/ram_lalla_shringaar.png', background: '/assets/bg_temple.png', thumbnail: '/assets/ram_lalla_closeup.png' },
        quote: 'He waited five centuries to come home. Now he smiles forever.',
      },
    ],
  },
];
