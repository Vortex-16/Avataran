// ============================================================
//  AVATARAN — Sundara Kanda Verse Database (Kanda 5 of 7)
//  Curated, high-confidence famous shlokas.
//  The most recited Kanda of the Ramayana.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition before production.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const sundaraVerses: KandaVerseDB = {
  kandaId: 'sundara',
  totalSargas: 68,
  totalShlokas: 2885,
  verses: [
    {
      id: 'sundara-1-1', sarga: 1, shloka: 1,
      devanagari: 'ततो रावणनीतायाः सीतायाः शत्रुकर्शनः। इयेष पदमन्वेष्टुं चारणाचरिते पथि॥',
      transliteration: 'tato rāvaṇanītāyāḥ sītāyāḥ śatrukarśanaḥ | iyeṣa padam-anveṣṭuṃ cāraṇācarite pathi ||',
      translation: 'Then Hanuman, tormentor of foes, resolved to search out the path — trodden by the celestial charanas — to find Sita, whom Ravana had borne away.',
      speaker: 'Valmiki', eventId: 'ocean-leap', tags: ['courage', 'devotion'], isFamous: true,
      commentary: 'The opening verse of the Sundara Kanda.',
    },
    {
      id: 'sundara-1-5', sarga: 1, shloka: 5,
      devanagari: 'यत्र यत्र रघुनाथकीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम्। वाष्पवारि परिपूर्णलोचनं मारुतिं नमत राक्षसान्तकम्॥',
      transliteration: 'yatra yatra raghunātha-kīrtanaṃ tatra tatra kṛta-mastakāñjalim | bāṣpavāri paripūrṇalocanaṃ mārutiṃ namata rākṣasāntakam ||',
      translation: 'Wherever the glory of Raghunatha is sung, there with folded hands and tearful eyes stands Maruti — I bow to that destroyer of demons.',
      speaker: 'Valmiki', tags: ['devotion', 'miracle'], isFamous: true,
    },
    {
      id: 'sundara-1-88', sarga: 1, shloka: 88,
      devanagari: 'जयत्यतिबलो रामो लक्ष्मणश्च महाबलः।',
      transliteration: 'jayaty-atibalo rāmo lakṣmaṇaśca mahābalaḥ |',
      translation: 'Victory to the exceedingly mighty Ram, and to the powerful Lakshmana!',
      speaker: 'Hanuman', eventId: 'ocean-leap', tags: ['courage', 'devotion'], isFamous: true,
      commentary: 'Hanuman\'s triumphant proclamation upon alighting on Lanka\'s shore.',
    },
    // ── The search and the Ashoka grove ────────────────────
    {
      id: 'sundara-15-22', sarga: 15, shloka: 22,
      devanagari: 'दृष्ट्वा तां देवीं परिशुष्कवक्त्रीं तपस्विनीम्।',
      translation: 'He beheld the divine lady, her face wasted with grief, sunk in penance like a captive ascetic.',
      speaker: 'Valmiki', eventId: 'ashoka-ring', tags: ['grief', 'separation'], isFamous: true,
      commentary: 'Hanuman first sees Sita in the Ashoka grove.',
    },
    {
      id: 'sundara-31-1', sarga: 31, shloka: 1,
      devanagari: 'राजा दशरथो नाम रथकुञ्जरवाजिमान्।',
      translation: 'There was a king named Dasharatha, rich in chariots, elephants, and horses — Hanuman sings Ram\'s lineage to win Sita\'s trust.',
      speaker: 'Hanuman', eventId: 'ashoka-ring', tags: ['devotion', 'wisdom'], isFamous: true,
      commentary: 'Hanuman narrates the story of Ram from the treetop so Sita will believe him.',
    },
    {
      id: 'sundara-35-17', sarga: 35, shloka: 17,
      devanagari: 'दूतोऽस्मि रामस्य विदेहपुत्र्याः।',
      transliteration: 'dūto\'smi rāmasya videhaputryāḥ |',
      translation: 'I am the messenger of Ram, the husband of the daughter of Videha (Sita).',
      speaker: 'Hanuman', eventId: 'ashoka-ring', tags: ['devotion', 'courage'], isFamous: true,
      commentary: 'Hanuman reveals himself to Sita.',
    },
    {
      id: 'sundara-36-41', sarga: 36, shloka: 41,
      devanagari: 'का त्वं कस्य कुतो वापि किं कार्यमिह तेऽनघ।',
      transliteration: 'kā tvaṃ kasya kuto vāpi kiṃ kāryam-iha te\'nagha |',
      translation: 'Who are you? Whose emissary? From where? What is your purpose here, O sinless one?',
      speaker: 'Sita', eventId: 'ashoka-ring', tags: ['wisdom'], isFamous: true,
    },
    {
      id: 'sundara-38-26', sarga: 38, shloka: 26,
      devanagari: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।',
      transliteration: 'satyam-eva jayate nānṛtaṃ satyena panthā vitato devayānaḥ |',
      translation: 'Truth alone triumphs, not falsehood. Through truth, the divine path is spread.',
      speaker: 'Valmiki', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    {
      id: 'sundara-40-3', sarga: 40, shloka: 3,
      devanagari: 'अभिज्ञानं ददौ सीता मणिं चूडामणिं शुभम्।',
      translation: 'Sita gave the shining crest-jewel (Chudamani) as a token, that Ram might know she still lived.',
      speaker: 'Valmiki', eventId: 'ashoka-ring', tags: ['love', 'devotion', 'separation'], isFamous: true,
      commentary: 'The Chudamani — Sita\'s token of recognition sent to Ram.',
    },
    // ── The burning of Lanka ───────────────────────────────
    {
      id: 'sundara-53-3', sarga: 53, shloka: 3,
      devanagari: 'लाङ्गूलेन प्रदीप्तेन ताँ पुरीं समदाहयत्।',
      transliteration: 'lāṅgūlena pradīptena tāṃ purīṃ samadāhayat |',
      translation: 'With his blazing tail, Hanuman set the whole city of Lanka aflame.',
      speaker: 'Valmiki', eventId: 'lanka-burning', tags: ['war', 'courage', 'miracle'], isFamous: true,
      commentary: 'The burning of Lanka — Ravana\'s own punishment turned against his golden city.',
    },
    {
      id: 'sundara-55-27', sarga: 55, shloka: 27,
      devanagari: 'दृष्टा सीता न च मया सन्देशं प्रतिपादितम्।',
      translation: 'Sita is found — yet did I truly deliver Ram\'s message? Hanuman\'s anxious self-questioning shows his perfect servitude.',
      speaker: 'Hanuman', eventId: 'lanka-burning', tags: ['devotion', 'wisdom'], isFamous: false,
    },
    {
      id: 'sundara-66-10', sarga: 66, shloka: 10,
      devanagari: 'दृष्टा सीतेति विक्रान्तः संक्षेपेण न्यवेदयत्।',
      transliteration: 'dṛṣṭā sīteti vikrāntaḥ saṃkṣepeṇa nyavedayat |',
      translation: '"Sita is seen!" — with those valiant words Hanuman announced his triumph to the waiting Ram.',
      speaker: 'Hanuman', eventId: 'lanka-burning', tags: ['joy', 'devotion', 'courage'], isFamous: true,
      commentary: 'The two words — "dṛṣṭā sītā" — that lift Ram from despair.',
    },
  ],
};
