// ============================================================
//  AVATARAN — Sundara Kanda Data (Kanda 5 of 7)
//  Source: Valmiki Ramayana, Sundara Kanda (Sargas 1–68)
//  Note: Most auspicious Kanda — read independently for blessings.
// ============================================================
import type { KandaSection } from '@/data/types';

export const sundaraKanda: KandaSection = {
  id: 'sundara',
  title: 'Sundara Kanda',
  subtitle: 'The Horizon of Faith',
  description: 'Named "Sundara" (beautiful) for its portrayal of Hanuman\'s extraordinary journey to Lanka — the most auspicious Kanda. Hanuman leaps the ocean, locates Sita in the Ashoka grove, delivers Ram\'s ring, receives Sita\'s Chudamani, and burns Lanka before returning with hope.',
  themeColor: 'from-[#4f798e] to-[#8bb3c7]',
  accentHex: '#4f798e',
  sargas: 68,
  slokaCount: 2885,
  sloka: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।',
  slokaTranslation: 'Truth alone triumphs, not falsehood. Through truth, the divine path is spread.',
  heroImage: '/assets/seq_hanuman_leap.jpg',
  backgroundImage: '/assets/seq_lanka_burning.jpg',
  characters: [
    { name: 'Hanuman', role: 'Divine Hero', weapon: 'Gada / Divine Tail', status: 'active', portrait: '/assets/character_hanuman.jpg', description: 'The star of this Kanda. His courage, devotion, and wit in Lanka is the greatest act of heroism in the Ramayana.' },
    { name: 'Sita', role: 'Captive Divine Mother', status: 'active', portrait: '/assets/character_sita.jpg', description: 'Found weeping under an Ashoka tree in Lanka, refusing Ravana\'s daily advances.' },
    { name: 'Ravana', role: 'Demon King', status: 'active', portrait: '/assets/character_ravana.jpg', description: 'King of Lanka who continues his daily humiliation of Sita. A scholar and musician despite his evil.' },
    { name: 'Mandodari', role: 'Ravana\'s Queen', status: 'active', portrait: '/assets/character_mandodari.jpg', description: 'The virtuous queen of Lanka who repeatedly counsels Ravana to return Sita.' },
    { name: 'Indrajit (Meghnad)', role: 'Ravana\'s Son', weapon: 'Brahmastra Noose', status: 'active', portrait: '/assets/character_indrajit.jpg', description: 'Ravana\'s powerful son who captures Hanuman with a Brahmastra. The greatest warrior of Lanka.' },
    { name: 'Vibhishana', role: 'Righteous Prince', status: 'active', portrait: '/assets/character_vibhishana.jpg', description: 'Ravana\'s youngest brother who secretly sympathizes with Hanuman and ultimately defects to Ram.' },
  ],
  locations: [
    { name: 'Mahendragiri', description: 'The mountain from which Hanuman takes his great leap to Lanka.', realWorld: 'Cape Comorin region, Tamil Nadu', image: '/assets/seq_search_parties.jpg' },
    { name: 'Lanka (Golden City)', description: 'Ravana\'s magnificent golden city described as surpassing the heavens in wealth.', realWorld: 'Sri Lanka', image: '/assets/seq_lanka_burning.jpg' },
    { name: 'Ashoka Vatika', description: 'The royal garden where Ravana holds Sita captive under an ancient Ashoka tree.', realWorld: 'Seetha Eliya, Sri Lanka', image: '/assets/seq_sita_ashoka.jpg' },
  ],
  weapons: [
    { name: 'Brahmastra Rope', wielder: 'Indrajit', description: 'The Brahmastra manifested as a noose of divine light — the only thing that could bind Hanuman momentarily.' },
  ],
  dialogues: [
    { speaker: 'Sita', sanskrit: 'का त्वं कस्य कुतो वापि किं कार्यमिह तेऽनघ।', translation: 'Who are you? Whose emissary? From where? What brings you here, O sinless one?', context: 'Sita\'s careful, fearful first words to Hanuman, testing whether he is real or an illusion from Ravana.' },
    { speaker: 'Hanuman', sanskrit: 'दूतोऽस्मि रामस्य विदेहपुत्र्याः।', translation: 'I am the emissary of Ram, the husband of the daughter of Videha.', context: 'Hanuman boldly declares himself before Ravana\'s entire court with complete fearlessness.' },
  ],
  gallery: [
    { image: '/assets/seq_hanuman_leap.jpg', caption: 'Hanuman\'s great leap across the ocean' },
    { image: '/assets/seq_ram_ring.jpg', caption: 'Hanuman presents Ram\'s ring to Sita' },
    { image: '/assets/seq_sita_ashoka.jpg', caption: 'Sita in the Ashoka grove, guarded by demons' },
    { image: '/assets/seq_chudamani.jpg', caption: 'Sita gives Hanuman her Chudamani hair ornament' },
    { image: '/assets/seq_lanka_burning.jpg', caption: 'Hanuman sets Lanka ablaze' },
    { image: '/assets/lanka_burning_bg.jpg', caption: 'The golden city of Lanka burning' },
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
  quizQuestions: [
    { id: 'sundara-q1', kandaId: 'sundara', question: 'Why is this Kanda named "Sundara" (Beautiful)?', options: ['Because of Lanka\'s architecture', 'Because of Hanuman\'s beautiful devotion and heroism', 'Because Sita is described as most beautiful here', 'Because the ocean is beautiful'], correctIndex: 1, explanation: 'The Kanda is named Sundara primarily for Hanuman\'s beautiful (sundara) devotion and heroic acts — some traditions say it is named after Sundara mountain from where Hanuman leapt.', difficulty: 'medium' },
    { id: 'sundara-q2', kandaId: 'sundara', question: 'What did Jambavan remind Hanuman of, enabling the great leap?', options: ['The ocean\'s depth', 'Hanuman\'s forgotten divine power as son of Vayu', 'A secret tunnel to Lanka', 'A magical boat to cross the ocean'], correctIndex: 1, explanation: 'Jambavan reminded Hanuman of his divine heritage — that as son of the Wind God (Vayu), he had limitless power, which Hanuman had forgotten due to a childhood curse.', difficulty: 'medium' },
    { id: 'sundara-q3', kandaId: 'sundara', question: 'How did Hanuman prove his identity to Sita?', options: ['By showing his divine form', 'By producing Ram\'s signet ring and describing Ram\'s personal details', 'By reciting the Ramayana', 'By flying back to Ram'], correctIndex: 1, explanation: 'Hanuman produced Ram\'s signet ring and described intimate details of Ram that only someone who knew him closely could know, convincing Sita he was genuine.', difficulty: 'easy' },
    { id: 'sundara-q4', kandaId: 'sundara', question: 'What did Sita give Hanuman as proof for Ram?', options: ['Her golden bracelet', 'Her Chudamani (hair ornament/crest jewel)', 'A message written on a leaf', 'Her sari fragment'], correctIndex: 1, explanation: 'Sita gave Hanuman her Chudamani — a precious jeweled hair ornament gifted by her father Janaka. Ram would immediately recognize it as proof she was alive.', difficulty: 'easy' },
    { id: 'sundara-q5', kandaId: 'sundara', question: 'What weapon did Indrajit use to capture Hanuman?', options: ['Nagastra', 'Pashupatastra', 'The Brahmastra manifested as a divine rope/noose', 'Chandrahas'], correctIndex: 2, explanation: 'Indrajit used the Brahmastra in the form of a divine noose/rope. Hanuman allowed himself to be bound out of respect for Brahma (the Brahmastra\'s creator), so he could be taken to Ravana\'s court.', difficulty: 'medium' },
    { id: 'sundara-q6', kandaId: 'sundara', question: 'Who was Akshayakumara?', options: ['Ravana\'s general', 'Ravana\'s son killed by Hanuman before Indrajit captured him', 'A demon guardian of the Ashoka grove', 'Mandodari\'s brother'], correctIndex: 1, explanation: 'Akshayakumara was Ravana\'s young but powerful son, sent to subdue Hanuman. Hanuman killed him, which is why Ravana sent the more powerful Indrajit next.', difficulty: 'hard' },
    { id: 'sundara-q7', kandaId: 'sundara', question: 'What happened when Lanka\'s demons set Hanuman\'s tail on fire?', options: ['Hanuman was hurt and surrendered', 'Hanuman expanded his form and used the burning tail to set Lanka ablaze', 'Hanuman flew back to Ram immediately', 'Hanuman called upon Vayu to extinguish the fire'], correctIndex: 1, explanation: 'In an act of supreme irony, the fire on Hanuman\'s tail became his weapon. He expanded to enormous size and leapt from palace to palace, burning Lanka\'s golden rooftops.', difficulty: 'easy' },
    { id: 'sundara-q8', kandaId: 'sundara', question: 'Where exactly in Lanka was Sita being held captive?', options: ['In Ravana\'s personal palace', 'In the Ashoka Vatika (garden) under an Ashoka tree', 'In an underground dungeon', 'On a floating island'], correctIndex: 1, explanation: 'Sita was held in Ashoka Vatika — a beautiful royal garden — under an ancient Ashoka tree, surrounded by female demon guards.', difficulty: 'easy' },
    { id: 'sundara-q9', kandaId: 'sundara', question: 'Who was Vibhishana in the Sundara Kanda?', options: ['A demon spy for Ram', 'Ravana\'s righteous youngest brother who secretly aided Hanuman', 'Mandodari\'s brother', 'A sage living in Lanka'], correctIndex: 1, explanation: 'Vibhishana was Ravana\'s youngest brother, a devotee of Ram. He secretly helped Hanuman and warned him of dangers, foreshadowing his eventual defection to Ram\'s side.', difficulty: 'medium' },
    { id: 'sundara-q10', kandaId: 'sundara', question: 'How far was Lanka from the mainland (Mahendragiri)?', options: ['10 yojanas', '50 yojanas', '100 yojanas', '1000 yojanas'], correctIndex: 2, explanation: 'Lanka was described as being 100 yojanas (approximately 800-900 miles) across the ocean from Mahendragiri. Hanuman\'s leap covered this entire distance in a single bound.', difficulty: 'medium' },
  ],
  featuredVerses: [
    { id: 'sundara-1-5', sarga: 1, shloka: 5, devanagari: 'यत्र यत्र रघुनाथकीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम्। वाष्पवारि परिपूर्णलोचनं मारुतिं नमत राक्षसान्तकम्॥', translation: 'Wherever the glory of Raghunatha is sung, there with folded hands and tearful eyes stands Maruti — I bow to that destroyer of demons.', speaker: 'Valmiki', tags: ['devotion', 'miracle'], isFamous: true },
    { id: 'sundara-35-17', sarga: 35, shloka: 17, devanagari: 'दूतोऽस्मि रामस्य विदेहपुत्र्याः।', translation: 'I am the messenger of Ram, the husband of the daughter of Videha (Sita).', speaker: 'Hanuman', tags: ['devotion', 'courage'], isFamous: true, commentary: 'Hanuman\'s fearless declaration in Ravana\'s court.' },
    { id: 'sundara-36-41', sarga: 36, shloka: 41, devanagari: 'का त्वं कस्य कुतो वापि किं कार्यमिह तेऽनघ।', translation: 'Who are you? Whose emissary? From where? What is your purpose here, O sinless one?', speaker: 'Sita', tags: ['wisdom'], isFamous: true },
    { id: 'sundara-38-26', sarga: 38, shloka: 26, devanagari: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।', translation: 'Truth alone triumphs, not falsehood. Through truth, the divine path is spread.', speaker: 'Valmiki', tags: ['dharma', 'wisdom'], isFamous: true },
  ],
  events: [
    {
      id: 'ocean-leap',
      title: 'The Great Ocean Leap',
      subtitle: 'Faith Has No Distance',
      location: 'Mahendragiri to Lanka — 100 Yojanas',
      description: 'Jambavan reminds Hanuman of his divine heritage. Hanuman expands to cosmic size on the peak of Mahendragiri and takes a single leap across the 100-yojana ocean. He defeats Surasa and Simhika mid-ocean before landing in Lanka.',
      characters: ['Hanuman', 'Jambavan'],
      media: { hero: '/assets/seq_hanuman_leap.jpg', background: '/assets/ram_setu_bg.jpg' },
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
      media: { hero: '/assets/seq_ram_ring.jpg', background: '/assets/seq_sita_ashoka.jpg', thumbnail: '/assets/seq_chudamani.jpg' },
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
      media: { hero: '/assets/seq_lanka_burning.jpg', background: '/assets/lanka_burning_bg.jpg', parallaxMid: '/assets/lanka_burning_mid.jpg', parallaxFg: '/assets/lanka_burning_fg.jpg' },
      turning: true,
      quote: 'They tried to humiliate the devotee of Ram. Instead, they lit their own funeral pyre.',
    },
  ],
};
