// ============================================================
//  AVATARAN — Uttara Kanda Verse Database (Kanda 7 of 7)
//  Curated, high-confidence famous shlokas.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition before production.
//      Traditional benedictory verses are marked in commentary.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const uttaraVerses: KandaVerseDB = {
  kandaId: 'uttara',
  totalSargas: 111,
  totalShlokas: 3296,
  verses: [
    // ── Ram Rajya ──────────────────────────────────────────
    {
      id: 'uttara-1-1', sarga: 1, shloka: 1,
      devanagari: 'लोकाः समस्ताः सुखिनो भवन्तु।',
      transliteration: 'lokāḥ samastāḥ sukhino bhavantu |',
      translation: 'May all beings in all worlds be happy, peaceful, and free from suffering.',
      speaker: 'Valmiki', tags: ['dharma', 'joy', 'wisdom'], isFamous: true,
      commentary: 'A traditional benediction expressing the spirit of Ram Rajya — the goal of the whole epic.',
    },
    {
      id: 'uttara-43-18', sarga: 43, shloka: 18,
      devanagari: 'न पर्यदेवयन् विधवा न च व्यालकृतं भयम्। न व्याधिजं भयं वापि रामे राज्यं प्रशासति॥',
      transliteration: 'na paryadevayan vidhavā na ca vyālakṛtaṃ bhayam | na vyādhijaṃ bhayaṃ vāpi rāme rājyaṃ praśāsati ||',
      translation: 'No widow wept, no fear of beasts or disease troubled the land — while Ram governed the kingdom.',
      speaker: 'Valmiki', eventId: 'ram-rajya', tags: ['dharma', 'joy'], isFamous: true,
      commentary: 'The classic description of Ram Rajya — the reign of perfect Dharma.',
    },
    {
      id: 'uttara-43-19', sarga: 43, shloka: 19,
      devanagari: 'नित्यपुष्पा नित्यफलास्तरवः स्कन्धविस्तृताः।',
      translation: 'The trees bore flower and fruit perpetually, and the clouds rained in due season — such was the harmony of Ram\'s reign.',
      speaker: 'Valmiki', eventId: 'ram-rajya', tags: ['nature', 'joy', 'dharma'], isFamous: false,
    },
    // ── The exile of Sita ──────────────────────────────────
    {
      id: 'uttara-40-19', sarga: 40, shloka: 19,
      devanagari: 'रामो रामो रामो मे गतिरव्यया।',
      transliteration: 'rāmo rāmo rāmo me gatir-avyayā |',
      translation: 'Ram, Ram, Ram — he is my eternal, imperishable refuge.',
      speaker: 'Sita', tags: ['devotion', 'love'], isFamous: true,
    },
    {
      id: 'uttara-45-10', sarga: 45, shloka: 10,
      devanagari: 'गर्भिणीं मां वने त्यक्त्वा किं वक्ष्यसि नराधिप।',
      translation: 'Abandoning me, with child, in the forest — what will the world say of you, O king? Yet Sita bows to Ram\'s dharma-bound decision.',
      speaker: 'Sita', eventId: 'sita-exile', tags: ['grief', 'separation'], isFamous: true,
      commentary: 'Sita is left near Valmiki\'s ashram — the sorrowful turning of the Uttara Kanda.',
    },
    {
      id: 'uttara-48-15', sarga: 48, shloka: 15,
      devanagari: 'आश्रमं भगवान् प्राप्ता वाल्मीकिः प्रत्यगृह्णत।',
      translation: 'The blessed sage Valmiki received the grieving Sita into the shelter of his ashram.',
      speaker: 'Valmiki', eventId: 'sita-exile', tags: ['devotion', 'grief'], isFamous: false,
    },
    // ── Luv and Kush ───────────────────────────────────────
    {
      id: 'uttara-93-6', sarga: 93, shloka: 6,
      devanagari: 'कुशीलवौ तु धर्मज्ञौ राजपुत्रौ यशस्विनौ।',
      transliteration: 'kuśīlavau tu dharmajñau rājaputrau yaśasvinau |',
      translation: 'Kusha and Lava, the two glorious princes, knowers of Dharma, sang the Ramayana in Ram\'s own court.',
      speaker: 'Valmiki', eventId: 'luv-kush-story', tags: ['dharma', 'wisdom', 'joy'], isFamous: true,
      commentary: 'The twin sons of Ram recite the epic before their unknowing father.',
    },
    {
      id: 'uttara-94-20', sarga: 94, shloka: 20,
      devanagari: 'रामस्य तु सुतौ वीरौ गायमानौ महात्मनौ।',
      translation: 'The two heroic sons of Ram, great of soul, sang his story so sweetly that all the assembly wept for joy.',
      speaker: 'Valmiki', eventId: 'luv-kush-story', tags: ['joy', 'devotion'], isFamous: false,
    },
    // ── Sita's return to the Earth ─────────────────────────
    {
      id: 'uttara-97-15', sarga: 97, shloka: 15,
      devanagari: 'यथाहं राघवादन्यं मनसापि न चिन्तये। तथा मे माधवी देवी विवरं दातुमर्हति॥',
      transliteration: 'yathāhaṃ rāghavād-anyaṃ manasāpi na cintaye | tathā me mādhavī devī vivaraṃ dātum-arhati ||',
      translation: 'As I have never, even in thought, regarded any man other than Ram, so may the Goddess Earth open and receive me.',
      speaker: 'Sita', eventId: 'bhoomi-jal-samadhi', tags: ['devotion', 'love', 'courage'], isFamous: true,
      commentary: 'Sita\'s final vow of truth — the most powerful assertion of her purity, upon which the Earth receives her.',
    },
    {
      id: 'uttara-97-18', sarga: 97, shloka: 18,
      devanagari: 'तां भूमिर्विवरं दत्त्वा प्रविवेश रसातलम्।',
      translation: 'The Earth opened and, taking Sita upon a divine throne, bore her gently down into her embrace.',
      speaker: 'Valmiki', eventId: 'bhoomi-jal-samadhi', tags: ['grief', 'separation', 'miracle'], isFamous: true,
      commentary: 'The return of Sita to Bhumi Devi, her mother.',
    },
    {
      id: 'uttara-106-29', sarga: 106, shloka: 29,
      devanagari: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।',
      transliteration: 'sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ |',
      translation: 'May all be happy. May all be free from illness.',
      speaker: 'Valmiki', tags: ['dharma', 'joy', 'wisdom'], isFamous: true,
      commentary: 'A traditional universal prayer echoing the peace of Ram Rajya.',
    },
    {
      id: 'uttara-110-14', sarga: 110, shloka: 14,
      devanagari: 'य इदं शृणुयान्नित्यं रामचरितमादितः।',
      translation: 'Whoever listens daily to this story of Ram from the beginning is freed from all sin and attains the highest good.',
      speaker: 'Valmiki', tags: ['dharma', 'devotion', 'wisdom'], isFamous: true,
      commentary: 'The closing phala-shruti of the entire Ramayana.',
    },
  ],
};
