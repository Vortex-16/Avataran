// ============================================================
//  AVATARAN — Yuddha Kanda Verse Database (Kanda 6 of 7)
//  Curated, high-confidence famous shlokas. The largest Kanda.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition before production.
//      Verses noted as "popularly attributed" are treasured in
//      tradition but absent from the critical edition.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const yuddhaVerses: KandaVerseDB = {
  kandaId: 'yuddha',
  totalSargas: 131,
  totalShlokas: 6005,
  verses: [
    // ── Vibhishana's surrender & Ram's vow of refuge ───────
    {
      id: 'yuddha-18-3', sarga: 18, shloka: 3,
      devanagari: 'सकृदेव प्रपन्नाय तवास्मीति च याचते। अभयं सर्वभूतेभ्यो ददाम्येतद्व्रतं मम॥',
      transliteration: 'sakṛd-eva prapannāya tavāsmīti ca yācate | abhayaṃ sarvabhūtebhyo dadāmy-etad-vrataṃ mama ||',
      translation: 'To whoever surrenders even once and says "I am yours" — I grant safety from all beings. This is my eternal vow.',
      speaker: 'Ram', eventId: 'vibhishana-defection', tags: ['dharma', 'devotion', 'wisdom'], isFamous: true,
      commentary: 'Ram\'s most famous declaration of unconditional refuge — the gold standard of divine compassion.',
    },
    {
      id: 'yuddha-17-14', sarga: 17, shloka: 14,
      devanagari: 'मित्रभावेन सम्प्राप्तं न त्यजेयं कथञ्चन।',
      transliteration: 'mitrabhāvena samprāptaṃ na tyajeyaṃ kathañcana |',
      translation: 'One who comes to me in friendship I shall never forsake — even if fault be found in him.',
      speaker: 'Ram', eventId: 'vibhishana-defection', tags: ['dharma', 'wisdom'], isFamous: true,
      commentary: 'Ram accepts Vibhishana over the counsel of his own commanders.',
    },
    // ── The bridge across the ocean ────────────────────────
    {
      id: 'yuddha-22-30', sarga: 22, shloka: 30,
      devanagari: 'बबन्धुः सागरे सेतुं नलः सेतुमकारयत्।',
      translation: 'The vanaras built a bridge across the ocean; under Nala\'s hand the great causeway arose.',
      speaker: 'Valmiki', eventId: 'ram-setu', tags: ['miracle', 'courage'], isFamous: true,
      commentary: 'The building of the Rama Setu across the sea to Lanka.',
    },
    {
      id: 'yuddha-22-9', sarga: 22, shloka: 9,
      devanagari: 'विनयेन नयेन च समुद्रं शरणं गतः।',
      translation: 'Ram approached the Ocean-lord humbly first, with courtesy and reason, before compelling him with the drawn bow.',
      speaker: 'Valmiki', eventId: 'ram-setu', tags: ['dharma', 'wisdom'], isFamous: false,
    },
    // ── Kumbhakarna ────────────────────────────────────────
    {
      id: 'yuddha-67-32', sarga: 67, shloka: 32,
      devanagari: 'भक्ष्यन् कपीन् समरे कुम्भकर्णो महाबलः।',
      translation: 'The mighty Kumbhakarna, roused from his slumber, strode into battle like a walking mountain.',
      speaker: 'Valmiki', eventId: 'kumbhakarna-battle', tags: ['war', 'courage'], isFamous: false,
    },
    {
      id: 'yuddha-67-170', sarga: 67, shloka: 170,
      devanagari: 'रामबाणहतो भूमौ पपात स महाद्रुमः।',
      translation: 'Struck by Ram\'s arrows, Kumbhakarna crashed to the earth like a felled colossal tree.',
      speaker: 'Valmiki', eventId: 'kumbhakarna-battle', tags: ['war'], isFamous: false,
    },
    // ── The Sanjeevani / Lakshmana's fall ──────────────────
    {
      id: 'yuddha-101-31', sarga: 101, shloka: 31,
      devanagari: 'न हि पश्यामि सङ्ग्रामे स्थातारं तव लक्ष्मण।',
      translation: 'Without you, Lakshmana, I see no reason to stand in this battle — nor in life itself.',
      speaker: 'Ram', eventId: 'sanjeevani', tags: ['grief', 'love', 'separation'], isFamous: true,
      commentary: 'Ram\'s lament over the fallen Lakshmana — before Hanuman brings the Sanjeevani mountain.',
    },
    {
      id: 'yuddha-101-45', sarga: 101, shloka: 45,
      devanagari: 'गृहीत्वा तु महाबाहुः पर्वतं मारुतात्मजः।',
      translation: 'The son of the Wind seized the entire mountain and bore it aloft to save Lakshmana\'s life.',
      speaker: 'Valmiki', eventId: 'sanjeevani', tags: ['miracle', 'devotion', 'courage'], isFamous: true,
      commentary: 'Hanuman carries the whole Dronagiri mountain, unable to identify the single herb.',
    },
    // ── The fall of Ravana ─────────────────────────────────
    {
      id: 'yuddha-105-14', sarga: 105, shloka: 14,
      devanagari: 'न मे त्रातास्ति देवेषु न गन्धर्वेषु नासुरे।',
      transliteration: 'na me trātāsti deveṣu na gandharveṣu nāsure |',
      translation: 'There is no savior for me among the gods, gandharvas, or demons.',
      speaker: 'Ravana', eventId: 'ravana-slain', tags: ['grief', 'wisdom'], isFamous: true,
      commentary: 'Ravana\'s tragic final realization — the greatest warrior undone by his own ego.',
    },
    {
      id: 'yuddha-107-3', sarga: 107, shloka: 3,
      devanagari: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।',
      transliteration: 'ādityahṛdayaṃ puṇyaṃ sarvaśatru-vināśanam |',
      translation: 'This is the sacred Aditya-Hridaya, destroyer of all foes — worship the Sun, O Ram, and you shall conquer.',
      speaker: 'Agastya', eventId: 'ravana-slain', tags: ['devotion', 'courage', 'miracle'], isFamous: true,
      commentary: 'Sage Agastya teaches Ram the Aditya-Hridaya hymn before the final duel with Ravana.',
    },
    {
      id: 'yuddha-108-17', sarga: 108, shloka: 17,
      devanagari: 'ततो रामो महातेजा रावणं निहतं रणे।',
      translation: 'Then the radiant Ram struck down Ravana in battle, and the burden of the earth was lifted.',
      speaker: 'Valmiki', eventId: 'ravana-slain', tags: ['war', 'dharma'], isFamous: true,
      commentary: 'The slaying of Ravana — the purpose of the avatar fulfilled.',
    },
    // ── Sita's fidelity & the reunion ──────────────────────
    {
      id: 'yuddha-119-22', sarga: 119, shloka: 22,
      devanagari: 'पतिहीनां स्त्रियं लोके सापत्यां निष्फलां विदुः।',
      transliteration: 'patihīnāṃ striyaṃ loke sāpatyāṃ niṣphalāṃ viduḥ |',
      translation: 'A woman without her husband is regarded in the world as barren, however blessed otherwise.',
      speaker: 'Sita', eventId: 'ravana-slain', tags: ['love', 'grief'], isFamous: true,
      commentary: 'Sita\'s declaration of her total devotion to Ram.',
    },
    {
      id: 'yuddha-120-19', sarga: 120, shloka: 19,
      devanagari: 'धर्मं हि परमं लोके धर्मे सत्यं प्रतिष्ठितम्।',
      transliteration: 'dharmaṃ hi paramaṃ loke dharme satyaṃ pratiṣṭhitam |',
      translation: 'Dharma is the highest in the world; truth is established in Dharma.',
      speaker: 'Ram', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    // ── The return to Ayodhya ──────────────────────────────
    {
      id: 'yuddha-125-3', sarga: 125, shloka: 3,
      devanagari: 'अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते। जननी जन्मभूमिश्च स्वर्गादपि गरीयसी॥',
      transliteration: 'api svarṇamayī laṅkā na me lakṣmaṇa rocate | jananī janmabhūmiśca svargād-api garīyasī ||',
      translation: 'Though Lanka be made of gold, it does not please me, Lakshmana — a mother and one\'s motherland are greater even than heaven.',
      speaker: 'Ram', eventId: 'return-coronation', tags: ['dharma', 'wisdom', 'love'], isFamous: true,
      commentary: 'Popularly attributed to Ram; beloved in tradition though absent from the critical edition. Included for its cultural resonance.',
    },
    {
      id: 'yuddha-128-100', sarga: 128, shloka: 100,
      devanagari: 'रामो राज्यमुपासित्वा ब्रह्मलोकं गमिष्यति।',
      translation: 'Having ruled his kingdom in perfect Dharma, Ram shall in time return to the highest abode. Thus was Ram Rajya established.',
      speaker: 'Valmiki', eventId: 'return-coronation', tags: ['dharma', 'joy'], isFamous: true,
      commentary: 'The coronation of Ram — the dawn of Ram Rajya.',
    },
    {
      id: 'yuddha-131-124', sarga: 131, shloka: 124,
      devanagari: 'इदं पवित्रं पापघ्नं पुण्यं वेदैश्च संमितम्।',
      translation: 'This sacred tale, sin-destroying and holy, is equal in merit to the Vedas themselves.',
      speaker: 'Valmiki', tags: ['dharma', 'wisdom'], isFamous: true,
      commentary: 'The phala-shruti — the fruit of hearing the Ramayana, closing the Yuddha Kanda.',
    },
  ],
};
