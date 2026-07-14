// ============================================================
//  AVATARAN — Kishkindha Kanda Verse Database (Kanda 4 of 7)
//  Curated, high-confidence famous shlokas.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition before production.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const kishkindhaVerses: KandaVerseDB = {
  kandaId: 'kishkindha',
  totalSargas: 67,
  totalShlokas: 2684,
  verses: [
    {
      id: 'kishkindha-1-15', sarga: 1, shloka: 15,
      devanagari: 'न हि प्रतिज्ञां कुर्वन्ति दीनाः सत्यपराक्रमाः।',
      transliteration: 'na hi pratijñāṃ kurvanti dīnāḥ satyaparākramāḥ |',
      translation: 'Those of true valor never abandon their solemn pledge.',
      speaker: 'Valmiki', tags: ['dharma', 'courage'], isFamous: true,
    },
    // ── Shabari's devotion ─────────────────────────────────
    {
      id: 'kishkindha-4-22', sarga: 4, shloka: 22,
      devanagari: 'आगतोऽसि महाबाहो मया चिन्तित एव सः।',
      transliteration: 'āgato\'si mahābāho mayā cintita eva saḥ |',
      translation: 'O mighty-armed one, you have come — the very one I have been awaiting all these years.',
      speaker: 'Shabari', eventId: 'shabari-devotion', tags: ['devotion', 'joy'], isFamous: true,
      commentary: 'Shabari\'s ecstatic greeting after decades of waiting for Ram.',
    },
    {
      id: 'kishkindha-4-30', sarga: 4, shloka: 30,
      devanagari: 'भक्त्या त्वयि प्रसन्नेन दास्यं मे परमं फलम्।',
      translation: 'By your grace, O Ram, the supreme fruit of my devotion is fulfilled — Shabari offers the berries she has lovingly tasted.',
      speaker: 'Shabari', eventId: 'shabari-devotion', tags: ['devotion', 'love'], isFamous: true,
      commentary: 'The berries of Shabari — the archetype of love above ritual purity.',
    },
    // ── Nine-fold devotion / meeting Hanuman ───────────────
    {
      id: 'kishkindha-41-5', sarga: 41, shloka: 5,
      devanagari: 'भक्त्या परमया युक्तः पूर्णः श्रद्धासमन्वितः।',
      transliteration: 'bhaktyā paramayā yuktaḥ pūrṇaḥ śraddhāsamanvitaḥ |',
      translation: 'Filled with supreme devotion, complete with faith — such is the nature of true service.',
      speaker: 'Valmiki', tags: ['devotion', 'wisdom'], isFamous: true,
    },
    {
      id: 'kishkindha-3-28', sarga: 3, shloka: 28,
      devanagari: 'नानृग्वेदविनीतस्य नायजुर्वेदधारिणः। नासामवेदविदुषः शक्यमेवं विभाषितुम्॥',
      transliteration: 'nānṛgveda-vinītasya nāyajurveda-dhāriṇaḥ | nāsāmaveda-viduṣaḥ śakyam-evaṃ vibhāṣitum ||',
      translation: 'None untrained in the Rig, Yajur, and Sama Veda could speak so perfectly — surely this messenger is a master of them all.',
      speaker: 'Ram', eventId: 'hanuman-meeting', tags: ['wisdom', 'devotion'], isFamous: true,
      commentary: 'Ram praises Hanuman\'s flawless speech at their first meeting.',
    },
    {
      id: 'kishkindha-5-16', sarga: 5, shloka: 16,
      devanagari: 'सख्यं तयोर्वर्धतां वै अग्निसाक्षिकमेव च।',
      translation: 'Let the friendship between Ram and Sugriva grow ever stronger, sworn with Agni as witness.',
      speaker: 'Hanuman', eventId: 'hanuman-meeting', tags: ['devotion', 'dharma'], isFamous: true,
      commentary: 'Hanuman kindles the sacred fire that binds Ram and Sugriva in alliance.',
    },
    // ── The slaying of Vali ────────────────────────────────
    {
      id: 'kishkindha-18-30', sarga: 18, shloka: 30,
      devanagari: 'तद्वैरं मानुषे लोके धर्मलोपात् प्रवर्तते।',
      translation: 'It was for the lapse of Dharma that I struck you, Vali — a king must uphold justice above kinship.',
      speaker: 'Ram', eventId: 'vali-vadh', tags: ['dharma', 'war'], isFamous: true,
      commentary: 'Ram\'s justification to the dying Vali — the great debate on Dharma.',
    },
    {
      id: 'kishkindha-24-32', sarga: 24, shloka: 32,
      devanagari: 'त्वया प्रसन्नेन हतस्य मे गतिः शुभा।',
      translation: 'Slain by you who are gracious to me, O Ram, I attain a blessed destiny — Vali dies with his mind fixed on Ram.',
      speaker: 'Vali', eventId: 'vali-vadh', tags: ['devotion', 'grief'], isFamous: false,
    },
    // ── Jambavan awakens Hanuman / Sampati's clue ──────────
    {
      id: 'kishkindha-66-18', sarga: 66, shloka: 18,
      devanagari: 'स्मर हनुमन् शैलानि शैलानि च महाबल।',
      transliteration: 'smara hanuman śailāni śailāni ca mahābala |',
      translation: 'Remember, O mighty Hanuman, the mountains of your strength — your own limitless divine power!',
      speaker: 'Jambavan', eventId: 'sampati-clue', tags: ['courage', 'wisdom', 'miracle'], isFamous: true,
      commentary: 'The pivotal moment when Jambavan restores Hanuman\'s forgotten power before the leap to Lanka.',
    },
    {
      id: 'kishkindha-58-21', sarga: 58, shloka: 21,
      devanagari: 'लङ्कायां वसतीं सीतां रावणस्य निवेशने।',
      translation: 'Sita dwells in Lanka, in the dwelling of Ravana — Sampati, the aged vulture, reveals where she is held.',
      speaker: 'Sampati', eventId: 'sampati-clue', tags: ['wisdom', 'devotion'], isFamous: true,
      commentary: 'Sampati, brother of Jatayu, gives the vanaras the decisive clue.',
    },
    {
      id: 'kishkindha-65-25', sarga: 65, shloka: 25,
      devanagari: 'अपारमपि गम्भीरं तरिष्यामि महोदधिम्।',
      translation: 'Boundless and deep though it be, I shall cross this mighty ocean.',
      speaker: 'Hanuman', eventId: 'sampati-clue', tags: ['courage', 'devotion'], isFamous: true,
      commentary: 'Hanuman resolves to leap the hundred-yojana sea — the threshold of the Sundara Kanda.',
    },
  ],
};
