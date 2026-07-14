// ============================================================
//  AVATARAN — Ayodhya Kanda Verse Database (Kanda 2 of 7)
//  Curated, high-confidence famous shlokas.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition before production.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const ayodhyaVerses: KandaVerseDB = {
  kandaId: 'ayodhya',
  totalSargas: 119,
  totalShlokas: 4012,
  verses: [
    // ── Sarga 1–3 — Ram, the beloved of Ayodhya ────────────
    {
      id: 'ayodhya-1-10', sarga: 1, shloka: 10,
      devanagari: 'सर्वे नरा नारीगणाश्च नित्यं रामेति रामेति समीक्ष्य वक्त्रम्।',
      translation: 'All the men and women, ever gazing upon his face, would speak only "Ram, Ram."',
      speaker: 'Valmiki', eventId: 'ayodhya', tags: ['devotion', 'joy'], isFamous: false,
    },
    {
      id: 'ayodhya-2-39', sarga: 2, shloka: 39,
      devanagari: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।',
      transliteration: 'rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ |',
      translation: 'Ram is the very embodiment of Dharma — gentle, righteous, and of true valor.',
      speaker: 'Valmiki', eventId: 'ayodhya', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    {
      id: 'ayodhya-3-7', sarga: 3, shloka: 7,
      devanagari: 'रामो द्विर्नाभिभाषते।',
      transliteration: 'rāmo dvir-nābhibhāṣate |',
      translation: 'Ram never speaks a thing twice — his word, once given, is inviolable.',
      speaker: 'Valmiki', eventId: 'ayodhya', tags: ['dharma', 'wisdom'], isFamous: true,
      commentary: 'A celebrated epithet of Ram\'s unwavering truthfulness.',
    },
    // ── Sarga 10–12 — Kaikeyi's two boons ──────────────────
    {
      id: 'ayodhya-11-26', sarga: 11, shloka: 26,
      devanagari: 'प्रव्राजनं च रामस्य त्वं च राज्यं भरतस्य च।',
      transliteration: 'pravrājanaṃ ca rāmasya tvaṃ ca rājyaṃ bharatasya ca |',
      translation: 'The exile of Ram, and the kingdom for Bharata — these are the two boons I claim.',
      speaker: 'Kaikeyi', eventId: 'coronation-banished', tags: ['grief', 'separation'], isFamous: true,
      commentary: 'Kaikeyi, poisoned by Manthara, demands her two fatal boons.',
    },
    {
      id: 'ayodhya-12-2', sarga: 12, shloka: 2,
      devanagari: 'किं नु मे यदि रामो हि राज्यं प्राप्नोति दुर्लभम्।',
      translation: 'How can I bear this? — grief seizes the king as the unspeakable demand is made.',
      speaker: 'Dasharatha', eventId: 'coronation-banished', tags: ['grief'], isFamous: false,
    },
    // ── Sarga 18–27 — Ram accepts exile ────────────────────
    {
      id: 'ayodhya-18-38', sarga: 18, shloka: 38,
      devanagari: 'नाहमर्थपरो देवि लोकमावस्तुमुत्सहे। विद्धि मामृषिभिस्तुल्यं केवलं धर्ममास्थितम्॥',
      translation: 'O mother, I do not crave wealth, nor cling to worldly power; know me to be like the sages, established solely in Dharma.',
      speaker: 'Ram', eventId: 'coronation-banished', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    {
      id: 'ayodhya-19-2', sarga: 19, shloka: 2,
      devanagari: 'न मे दुःखं महाराजो न ममार्थपरिक्षयः।',
      translation: 'I feel no sorrow, O king, nor any loss in this — the forest is as welcome to me as the throne.',
      speaker: 'Ram', eventId: 'coronation-banished', tags: ['dharma', 'wisdom'], isFamous: false,
    },
    {
      id: 'ayodhya-27-14', sarga: 27, shloka: 14,
      devanagari: 'पितुर्वचनमाज्ञाय वर्ते वो नात्र संशयः।',
      transliteration: 'pitur-vacanam-ājñāya varte vo nātra saṃśayaḥ |',
      translation: 'I shall follow my father\'s command completely — of this there is no doubt.',
      speaker: 'Ram', eventId: 'exile-departure', tags: ['dharma', 'devotion'], isFamous: true,
      commentary: 'Ram\'s instant acceptance of exile without complaint — the supreme example of filial Dharma.',
    },
    // ── Sarga 27–31 — Sita and Lakshmana insist on the forest
    {
      id: 'ayodhya-27-8', sarga: 27, shloka: 8,
      devanagari: 'अग्रतस्ते गमिष्यामि मृद्नती कुशकण्टकान्।',
      transliteration: 'agratas-te gamiṣyāmi mṛdnatī kuśakaṇṭakān |',
      translation: 'I shall walk ahead of you, crushing the sharp grass and thorns beneath my feet.',
      speaker: 'Sita', eventId: 'exile-departure', tags: ['love', 'devotion'], isFamous: true,
      commentary: 'Sita\'s vow of devotion — to soften every hardship of the forest path for Ram.',
    },
    {
      id: 'ayodhya-30-19', sarga: 30, shloka: 19,
      devanagari: 'त्वया सह वने वस्तुं वरं मे भवेत् नृपस्य।',
      transliteration: 'tvayā saha vane vastuṃ varaṃ me bhavet nṛpasya |',
      translation: 'Living with you in the forest is better to me than dwelling in the palace of a king.',
      speaker: 'Sita', eventId: 'exile-departure', tags: ['love', 'devotion'], isFamous: true,
      commentary: 'Sita\'s declaration that love surpasses all material comfort.',
    },
    {
      id: 'ayodhya-31-25', sarga: 31, shloka: 25,
      devanagari: 'अहं तावन्महाराज कर्तास्मि सुखमुत्तमम्। सर्वं ते समनुज्ञातं करिष्यामि हितं तव॥',
      translation: 'I shall render you every comfort and service; whatever you command, that alone I shall do — walking behind you always.',
      speaker: 'Lakshmana', eventId: 'exile-departure', tags: ['devotion', 'love'], isFamous: true,
      commentary: 'Lakshmana insists on following Ram and Sita into exile.',
    },
    // ── Sarga 40–52 — Departure, Guha, crossing the Ganga ──
    {
      id: 'ayodhya-40-6', sarga: 40, shloka: 6,
      devanagari: 'हा राम हा रामानुज हा च वैदेहि इति स्वनन्तः।',
      translation: 'Crying "O Ram! O Lakshmana! O Sita!", the people of Ayodhya wailed as the three departed.',
      speaker: 'Valmiki', eventId: 'exile-departure', tags: ['grief', 'separation'], isFamous: false,
    },
    {
      id: 'ayodhya-50-33', sarga: 50, shloka: 33,
      devanagari: 'गुहेन सहितो रामो लक्ष्मणेन च सीतया।',
      translation: 'Ram, together with Guha, Lakshmana, and Sita, halted upon the sacred Ganga\'s bank.',
      speaker: 'Valmiki', eventId: 'ganga-crossing', tags: ['devotion'], isFamous: false,
      commentary: 'Guha, the Nishada chief, welcomes Ram with pure-hearted love.',
    },
    {
      id: 'ayodhya-52-89', sarga: 52, shloka: 89,
      devanagari: 'सीते रम्यमिदं तीर्थं पश्य त्वं गिरिनिम्नगम्।',
      translation: 'O Sita, behold this beautiful ford where the river descends from the hills.',
      speaker: 'Ram', eventId: 'ganga-crossing', tags: ['nature', 'love'], isFamous: false,
    },
    // ── Sarga 63–64 — Dasharatha's death ───────────────────
    {
      id: 'ayodhya-63-3', sarga: 63, shloka: 3,
      devanagari: 'हा राम हा रामानुजेति हा वैदेहीति भूमिपः।',
      translation: 'Crying "O Ram! O Lakshmana! O Sita!", the king breathed his last in unbearable grief.',
      speaker: 'Valmiki', eventId: 'exile-departure', tags: ['grief', 'separation'], isFamous: true,
      commentary: 'Dasharatha dies of separation from Ram, fulfilling an old sage\'s curse.',
    },
    // ── Sarga 100–112 — Bharata's refusal & the sandals ────
    {
      id: 'ayodhya-100-6', sarga: 100, shloka: 6,
      devanagari: 'कच्चित् ते दारा मनसा प्रियाः स्वदन्ते।',
      translation: 'Ram lovingly enquires of Bharata about the welfare of the kingdom and its people (the "Kaccit Sarga").',
      speaker: 'Ram', eventId: 'sandal-regent', tags: ['dharma', 'wisdom'], isFamous: true,
      commentary: 'The famous Kaccit Sarga — Ram\'s discourse on the duties of a righteous king.',
    },
    {
      id: 'ayodhya-112-19', sarga: 112, shloka: 19,
      devanagari: 'न मे राज्यफले स्पृहा।',
      transliteration: 'na me rājyaphale spṛhā |',
      translation: 'I have no desire for the fruit of a kingdom.',
      speaker: 'Bharata', eventId: 'sandal-regent', tags: ['dharma', 'devotion'], isFamous: true,
      commentary: 'Bharata refuses the throne he never wanted.',
    },
    {
      id: 'ayodhya-112-24', sarga: 112, shloka: 24,
      devanagari: 'एते पादुके गृह्य राज्याय महते ततः।',
      translation: 'Taking these sandals as regents of the realm, Bharata will govern only in Ram\'s name.',
      speaker: 'Valmiki', eventId: 'sandal-regent', tags: ['dharma', 'devotion'], isFamous: true,
      commentary: 'Ram\'s sandals ascend the throne of Ayodhya; Bharata rules as their servant from Nandigrama.',
    },
    {
      id: 'ayodhya-115-16', sarga: 115, shloka: 16,
      devanagari: 'तस्य पादुके राज्ये अभिषिच्य महायशाः।',
      translation: 'The illustrious Bharata consecrated Ram\'s sandals to the kingdom and dwelt in penance at Nandigrama.',
      speaker: 'Valmiki', eventId: 'sandal-regent', tags: ['dharma', 'devotion'], isFamous: false,
    },
  ],
};
