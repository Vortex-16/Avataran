// ============================================================
//  AVATARAN — Ayodhya Mandir Data (Modern Chapter)
//  New Ayodhya & Shri Ram Janmabhoomi Mandir
// ============================================================
import type { KandaSection } from '@/data/types';

export const ayodhyaMandirKanda: KandaSection = {
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
    { image: '/assets/ram_lalla_abhisheka_paste.png', caption: 'Chandan Abhishekam of Ram Lalla' },
    { image: '/assets/ram_lalla_blue.png', caption: 'Ram Lalla in Neela Peetambara blue robes' },
    { image: '/assets/ram_lalla_closeup.png', caption: 'Close up of the divine child-god smile' },
    { image: '/assets/ram_lalla_cream.png', caption: 'Ram Lalla in Swarna Cream robes' },
    { image: '/assets/ram_lalla_magenta.png', caption: 'Ram Lalla in Magenta Shringaar' },
    { image: '/assets/ram_lalla_pink.png', caption: 'Ram Lalla in Taruna Pink robes' },
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
  quizQuestions: [
    { id: 'mandir-q1', kandaId: 'ayodhya-mandir', question: 'In which architectural style was the Ram Mandir built?', options: ['Dravidian style', 'Nagara style', 'Vesara style', 'Indo-Islamic style'], correctIndex: 1, explanation: 'The Ram Mandir is built in the Nagara (North Indian) style of temple architecture, using pink sandstone from Rajasthan.', difficulty: 'easy' },
    { id: 'mandir-q2', kandaId: 'ayodhya-mandir', question: 'Who sculpted the Ram Lalla idol in the Garbhagriha?', options: ['Sculptors of Varanasi', 'Arun Yogiraj', 'Ganesh Bhatt', 'Ram Vanji Sutar'], correctIndex: 1, explanation: 'The beautiful Ram Lalla idol was sculpted by renowned sculptor Arun Yogiraj from Mysore, in black granite from Karnataka.', difficulty: 'medium' },
    { id: 'mandir-q3', kandaId: 'ayodhya-mandir', question: 'How many pillars does the Ram Mandir complex have?', options: ['200', '392', '500', '108'], correctIndex: 1, explanation: 'The Ram Mandir complex has 392 carved pillars across its five mandapas (halls), each intricately decorated with religious motifs.', difficulty: 'medium' },
    { id: 'mandir-q4', kandaId: 'ayodhya-mandir', question: 'What record does Ayodhya\'s Deepotsav festival hold?', options: ['Most fireworks', 'Most oil lamps (diyas) lit simultaneously — a Guinness World Record', 'Longest Ram Katha', 'Largest procession'], correctIndex: 1, explanation: 'Ayodhya\'s Deepotsav festival has set multiple Guinness World Records for the most oil lamps (diyas) lit simultaneously on the Saryu River ghats.', difficulty: 'easy' },
    { id: 'mandir-q5', kandaId: 'ayodhya-mandir', question: 'What is the Ram Lalla idol\'s height?', options: ['21 inches', '36 inches', '51 inches', '108 inches'], correctIndex: 2, explanation: 'The Ram Lalla idol stands 51 inches tall — depicting Lord Ram as a five-year-old divine child in a gracious tribhanga (three-bend) pose on a lotus pedestal.', difficulty: 'medium' },
    { id: 'mandir-q6', kandaId: 'ayodhya-mandir', question: 'What is Ram Path in Ayodhya?', options: ['An ancient pilgrimage route', 'An 80-meter-wide modern heritage corridor from the temple to the Saryu Ghats', 'The road to Nandigram', 'Ram\'s route of exile'], correctIndex: 1, explanation: 'Ram Path is a magnificent 80-meter-wide heritage boulevard connecting the Ram Mandir to the Saryu River Ghats, lined with statues, temples, and cultural pavilions.', difficulty: 'medium' },
    { id: 'mandir-q7', kandaId: 'ayodhya-mandir', question: 'In what year did the Supreme Court of India give its judgment on the Ram Mandir site?', options: ['2015', '2017', '2019', '2020'], correctIndex: 2, explanation: 'On November 9, 2019, the Supreme Court of India unanimously awarded the disputed 2.77-acre site at Ayodhya to the Ram Lalla deity, paving the way for temple construction.', difficulty: 'easy' },
    { id: 'mandir-q8', kandaId: 'ayodhya-mandir', question: 'How large is the Ram Mandir complex?', options: ['10 acres', '30 acres', '70 acres', '200 acres'], correctIndex: 2, explanation: 'The Shri Ram Janmabhoomi Teerth Kshetra complex spans 70 acres, making it one of the largest temple complexes in the world.', difficulty: 'medium' },
    { id: 'mandir-q9', kandaId: 'ayodhya-mandir', question: 'What is the Garbhagriha?', options: ['The temple courtyard', 'The innermost sanctum of the temple where Ram Lalla resides', 'The outer entrance hall', 'The temple kitchen'], correctIndex: 1, explanation: 'The Garbhagriha (literally "womb chamber") is the innermost sanctum of a Hindu temple — the most sacred space where the main deity resides. In the Ram Mandir, it houses Ram Lalla.', difficulty: 'easy' },
    { id: 'mandir-q10', kandaId: 'ayodhya-mandir', question: 'What stone was used to build the Ram Mandir?', options: ['White marble from Makrana', 'Pink sandstone from Rajasthan', 'Black granite from Karnataka', 'Red sandstone from Agra'], correctIndex: 1, explanation: 'The Ram Mandir is primarily constructed using pink sandstone (Bansi Paharpur stone) from Rajasthan — a stone believed to not require plaster and to grow stronger with age.', difficulty: 'medium' },
  ],
  featuredVerses: [
    { id: 'mandir-tradition-1', sarga: 0, shloka: 1, devanagari: 'मङ्गलं कोसलेन्द्राय महनीयगुणाब्धये। चक्रवर्तितनूजाय सार्वभौमाय मङ्गलम्॥', translation: 'Auspiciousness to the Lord of Kosala, ocean of noble virtues, sovereign of all — may all auspiciousness attend him.', speaker: 'Tradition', tags: ['devotion', 'joy'], isFamous: true, commentary: 'The traditional mangalacharana (auspicious invocation) recited at the Ram Mandir.' },
    { id: 'mandir-tradition-2', sarga: 0, shloka: 2, devanagari: 'श्रीरामचन्द्राय नमः।', translation: 'Salutations to Shri Ramachandra.', speaker: 'Tradition', tags: ['devotion'], isFamous: true, commentary: 'The universal greeting chanted by millions of pilgrims at the Ram Mandir.' },
    { id: 'mandir-tradition-3', sarga: 0, shloka: 3, devanagari: 'श्रीराम जय राम जय जय राम।', translation: 'O Ram, victory to Ram, victory, victory to Ram!', speaker: 'Tradition', tags: ['devotion', 'joy'], isFamous: true, commentary: 'The sacred Taraka Mantra — the two syllables "Ra" and "Ma" from the Ashtakshari mantra, forming the universal Ram mantra.' },
    { id: 'mandir-tradition-4', sarga: 0, shloka: 4, devanagari: 'भजे विशेषं जगदीशरामं भजे विशेषं जगदीशरामम्।', translation: 'I especially worship Ram, the Lord of the Universe. I especially worship Ram, the Lord of the Universe.', speaker: 'Tradition', tags: ['devotion', 'wisdom'], isFamous: true },
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
};
