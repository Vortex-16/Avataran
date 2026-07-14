// ============================================================
//  AVATARAN — Aranya Kanda Verse Database (Kanda 3 of 7)
//  Curated, high-confidence famous shlokas.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition before production.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const aranyaVerses: KandaVerseDB = {
  kandaId: 'aranya',
  totalSargas: 75,
  totalShlokas: 2973,
  verses: [
    // ── Sarga 1–10 — Life among the forest sages ───────────
    {
      id: 'aranya-1-2', sarga: 1, shloka: 2,
      devanagari: 'धर्मो रक्षति रक्षितः।',
      transliteration: 'dharmo rakṣati rakṣitaḥ |',
      translation: 'Dharma protects those who protect it.',
      speaker: 'Valmiki', tags: ['dharma'], isFamous: true,
    },
    {
      id: 'aranya-6-21', sarga: 6, shloka: 21,
      devanagari: 'संत्रस्तवनदुर्गेषु मुनयः शरणार्थिनः।',
      translation: 'The terrified sages of the wild forest came to Ram seeking refuge from the rakshasas.',
      speaker: 'Valmiki', eventId: 'forest-sages', tags: ['dharma', 'devotion'], isFamous: false,
    },
    {
      id: 'aranya-10-19', sarga: 10, shloka: 19,
      devanagari: 'निहत्य राक्षसान् सर्वान् यज्ञघ्नान् रघुनन्दनः।',
      translation: 'The joy of the Raghus vowed to slay all the demons who defile the sacrifices of the sages.',
      speaker: 'Ram', eventId: 'forest-sages', tags: ['dharma', 'courage'], isFamous: false,
      commentary: 'Ram\'s solemn pledge to protect the rishis of Dandaka.',
    },
    // ── Sarga 15–18 — Panchavati and Shurpanakha ───────────
    {
      id: 'aranya-15-19', sarga: 15, shloka: 19,
      devanagari: 'देशे देशे कलत्राणि देशे देशे च बान्धवाः।',
      transliteration: 'deśe deśe kalatrāṇi deśe deśe ca bāndhavāḥ |',
      translation: 'In every land there are homes and kinsfolk; but the land where a man finds honour — that alone is truly his own.',
      speaker: 'Lakshmana', eventId: 'panchavati', tags: ['wisdom'], isFamous: true,
      commentary: 'Spoken as Lakshmana builds the leaf-hut at Panchavati.',
    },
    {
      id: 'aranya-17-26', sarga: 17, shloka: 26,
      devanagari: 'भार्या मे दुष्प्रधर्षा च रामस्येयं यशस्विनी।',
      translation: 'This glorious lady is the wife of Ram, unassailable — go your way, O rakshasi.',
      speaker: 'Ram', eventId: 'shurpanakha-disfigurement', tags: ['dharma'], isFamous: false,
      commentary: 'Ram gently rebuffs Shurpanakha, who lusts after him.',
    },
    {
      id: 'aranya-18-21', sarga: 18, shloka: 21,
      devanagari: 'तस्याः कर्णौ च नासां च चिच्छेद लक्ष्मणः।',
      translation: 'Lakshmana cut off the ears and nose of the demoness Shurpanakha.',
      speaker: 'Valmiki', eventId: 'shurpanakha-disfigurement', tags: ['war', 'courage'], isFamous: true,
      commentary: 'The act that ignites the war with Ravana.',
    },
    // ── Sarga 42–44 — The golden deer ──────────────────────
    {
      id: 'aranya-42-9', sarga: 42, shloka: 9,
      devanagari: 'आर्यपुत्र अभिरामोऽयं मृगो हरति मे मनः।',
      transliteration: 'āryaputra abhirāmo\'yaṃ mṛgo harati me manaḥ |',
      translation: 'My noble lord, this enchanting deer steals my heart — capture it for me!',
      speaker: 'Sita', eventId: 'golden-deer', tags: ['love'], isFamous: true,
      commentary: 'Sita\'s fateful longing for Maricha in the form of the golden deer.',
    },
    {
      id: 'aranya-43-40', sarga: 43, shloka: 40,
      devanagari: 'हा सीते लक्ष्मणेत्येवमाजुहाव स राक्षसः।',
      transliteration: 'hā sīte lakṣmaṇety-evam ājuhāva sa rākṣasaḥ |',
      translation: 'Mimicking Ram\'s voice, the demon Maricha cried out "O Sita! O Lakshmana!" as he fell.',
      speaker: 'Valmiki', eventId: 'golden-deer', tags: ['grief', 'war'], isFamous: true,
      commentary: 'Maricha\'s dying deception that lures Lakshmana from Sita\'s side.',
    },
    {
      id: 'aranya-44-22', sarga: 44, shloka: 22,
      devanagari: 'गच्छ लक्ष्मण सत्वरं भ्रातरं रक्ष मे प्रियम्।',
      transliteration: 'gaccha lakṣmaṇa satvaraṃ bhrātaraṃ rakṣa me priyam |',
      translation: 'Go, Lakshmana, quickly — save my beloved husband!',
      speaker: 'Sita', eventId: 'golden-deer', tags: ['love', 'devotion'], isFamous: true,
    },
    // ── Sarga 45–56 — The abduction and Jatayu ─────────────
    {
      id: 'aranya-45-29', sarga: 45, shloka: 29,
      devanagari: 'तेन नीता च वैदेही रावणेन दुरात्मना।',
      transliteration: 'tena nītā ca vaidehī rāvaṇena durātmanā |',
      translation: 'Sita was taken by Ravana, that evil-souled one.',
      speaker: 'Jatayu', eventId: 'abduction-sita', tags: ['grief', 'devotion'], isFamous: true,
      commentary: 'Jatayu\'s heroic last words — the most poignant moment of the Aranya Kanda.',
    },
    {
      id: 'aranya-49-13', sarga: 49, shloka: 13,
      devanagari: 'न त्वां जिघृक्षे बलवन्तमेकं प्रसह्य लङ्केश्वर।',
      translation: 'Ravana dared not seize her openly, but stole her by stealth like a coward.',
      speaker: 'Valmiki', eventId: 'abduction-sita', tags: ['grief', 'war'], isFamous: false,
    },
    {
      id: 'aranya-51-45', sarga: 51, shloka: 45,
      devanagari: 'जटायुरहम् इति ख्यातो गृध्रराजो महाबलः।',
      translation: 'I am Jatayu, the mighty king of vultures — friend of your father Dasharatha.',
      speaker: 'Jatayu', eventId: 'abduction-sita', tags: ['courage', 'devotion'], isFamous: true,
      commentary: 'Jatayu challenges Ravana to free Sita, giving his life in the attempt.',
    },
    {
      id: 'aranya-60-14', sarga: 60, shloka: 14,
      devanagari: 'हा राम हा राम हा लक्ष्मण।',
      transliteration: 'hā rāma hā rāma hā lakṣmaṇa |',
      translation: 'O Ram! O Ram! O Lakshmana!',
      speaker: 'Sita', eventId: 'abduction-sita', tags: ['grief', 'separation'], isFamous: true,
      commentary: 'Sita\'s cry as Ravana carries her away in the Pushpaka chariot — among the most heartrending lines of the Ramayana.',
    },
    {
      id: 'aranya-64-32', sarga: 64, shloka: 32,
      devanagari: 'क्व सीते वर्तसे भद्रे कान्ते क्वासि प्रिये मम।',
      translation: 'Where are you, gentle Sita? Where have you gone, my beloved?',
      speaker: 'Ram', eventId: 'abduction-sita', tags: ['grief', 'separation', 'love'], isFamous: true,
      commentary: 'Ram\'s anguished wandering through Panchavati searching for Sita.',
    },
    {
      id: 'aranya-68-33', sarga: 68, shloka: 33,
      devanagari: 'क्रियतां मम कार्यं तु प्रीतोऽस्मि तव राघव।',
      translation: 'Grant me liberation, O Ram — the demon Kabandha, redeemed by Ram, points the way to Sugriva.',
      speaker: 'Kabandha', eventId: 'abduction-sita', tags: ['miracle', 'devotion'], isFamous: false,
    },
  ],
};
