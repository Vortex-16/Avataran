// ============================================================
//  AVATARAN — Bala Kanda Verse Database (Kanda 1 of 7)
//  Curated, high-confidence famous shlokas.
//
//  ⚠️  Sarga/shloka references are indicative and should be
//      validated against a canonical edition (e.g. IITK
//      Valmiki Ramayana) before scholarly/production use.
//  Architected for incremental expansion toward the full text.
// ============================================================
import type { KandaVerseDB } from '@/data/types';

export const balaVerses: KandaVerseDB = {
  kandaId: 'bala',
  totalSargas: 77,
  totalShlokas: 2065,
  verses: [
    // ── Sarga 1 — Valmiki's question & Narada's reply ──────
    {
      id: 'bala-1-1', sarga: 1, shloka: 1,
      devanagari: 'को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान्। धर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः॥',
      transliteration: 'ko nvasmin sāmprataṃ loke guṇavān kaśca vīryavān | dharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ ||',
      translation: 'Who in this present world is truly virtuous, truly valorous, truly righteous, grateful, truthful, and firm in vow?',
      speaker: 'Valmiki', tags: ['dharma', 'wisdom'], isFamous: true,
      commentary: 'The opening question of the entire Ramayana, asked by Valmiki to Narada.',
    },
    {
      id: 'bala-1-2', sarga: 1, shloka: 2,
      devanagari: 'चारित्रेण च को युक्तः सर्वभूतेषु को हितः। विद्वान् कः कः समर्थश्च कश्चैकप्रियदर्शनः॥',
      translation: 'Who is endowed with good conduct, devoted to the welfare of all beings, learned, capable, and uniquely pleasing to behold?',
      speaker: 'Valmiki', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    {
      id: 'bala-1-18', sarga: 1, shloka: 18,
      devanagari: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।',
      transliteration: 'rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ |',
      translation: 'Ram is Dharma itself embodied in a form — righteous, gentle, and of true valor.',
      speaker: 'Narada', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    // ── Sarga 15–18 — Divine birth ─────────────────────────
    {
      id: 'bala-15-22', sarga: 15, shloka: 22,
      devanagari: 'इक्ष्वाकुवंशप्रभवो रामो नाम जनैः श्रुतः। नियतात्मा महावीर्यो द्युतिमान् धृतिमान् वशी॥',
      transliteration: 'ikṣvākuvaṃśaprabhavo rāmo nāma janaiḥ śrutaḥ | niyatātmā mahāvīryo dyutimān dhṛtimān vaśī ||',
      translation: 'Born in the Ikshvaku dynasty, known among people as Ram — of restrained mind, supreme valor, radiant, steady, and in full control of his senses.',
      speaker: 'Valmiki', tags: ['dharma', 'wisdom'], isFamous: true,
    },
    {
      id: 'bala-18-8', sarga: 18, shloka: 8,
      devanagari: 'ततो यज्ञे समाप्ते तु ऋतूनां षट् समत्ययुः। ततश्च द्वादशे मासे चैत्रे नावमिके तिथौ॥',
      transliteration: 'tato yajñe samāpte tu ṛtūnāṃ ṣaṭ samatyayuḥ | tataśca dvādaśe māse caitre nāvamike tithau ||',
      translation: 'When the sacrifice was complete, six seasons passed; then in the twelfth month, on the ninth lunar day of Chaitra —',
      speaker: 'Valmiki', eventId: 'divine-birth', tags: ['joy', 'miracle'], isFamous: true,
      commentary: 'The verse establishing Ram Navami — the ninth day of Chaitra.',
    },
    {
      id: 'bala-18-10', sarga: 18, shloka: 10,
      devanagari: 'कौसल्याजनयद्रामं सर्वलक्षणसंयुतम्। विष्णोरर्धं महाभागं पुत्रमैक्ष्वाकुनन्दनम्॥',
      transliteration: 'kausalyājanayad rāmaṃ sarvalakṣaṇasaṃyutam | viṣṇor-ardhaṃ mahābhāgaṃ putram-aikṣvākunandanam ||',
      translation: 'Kaushalya gave birth to Ram, endowed with all auspicious marks — the glorious son, delight of the Ikshvakus, a portion of Vishnu himself.',
      speaker: 'Valmiki', eventId: 'divine-birth', tags: ['joy', 'miracle', 'devotion'], isFamous: true,
    },
    {
      id: 'bala-18-27', sarga: 18, shloka: 27,
      devanagari: 'सर्वे वेदविदः शूराः सर्वे लोकहिते रताः। सर्वे ज्ञानोपसम्पन्नाः सर्वे समुदिता गुणैः॥',
      translation: 'All four brothers were knowers of the Vedas, heroic, devoted to the welfare of the world, endowed with wisdom, and radiant with virtues.',
      speaker: 'Valmiki', eventId: 'education-vashishtha', tags: ['wisdom', 'dharma'], isFamous: true,
    },
    // ── Sarga 19–30 — Vishwamitra & the protection of the yagna
    {
      id: 'bala-19-2', sarga: 19, shloka: 2,
      devanagari: 'अयमेव मुहूर्तो हि तस्मै दास्यामि पुत्रकम्।',
      translation: 'This very moment is auspicious — I shall give my son for the sacred task.',
      speaker: 'Dasharatha', eventId: 'yagna-protection', tags: ['dharma'], isFamous: false,
    },
    {
      id: 'bala-22-13', sarga: 22, shloka: 13,
      devanagari: 'बलमतिबलं चैव सर्वपापप्रणाशनम्।',
      transliteration: 'balam-atibalaṃ caiva sarvapāpapraṇāśanam |',
      translation: 'The Bala and Atibala hymns — destroyers of all weakness and sin.',
      speaker: 'Vishwamitra', eventId: 'yagna-protection', tags: ['wisdom', 'courage'], isFamous: true,
      commentary: 'Vishwamitra imparts the Bala–Atibala vidya, freeing Ram and Lakshmana from hunger, thirst, and fatigue.',
    },
    {
      id: 'bala-26-3', sarga: 26, shloka: 3,
      devanagari: 'न हि मे संशयः कश्चिद्धन्तव्या दुष्टचारिणी।',
      translation: 'I have no hesitation — this evil-doing one (Tataka) must be slain to protect the sages.',
      speaker: 'Ram', eventId: 'yagna-protection', tags: ['dharma', 'courage'], isFamous: false,
    },
    {
      id: 'bala-30-4', sarga: 30, shloka: 4,
      devanagari: 'रक्षणार्थं तु यज्ञस्य तौ स्थितौ रघुनन्दनौ।',
      translation: 'To guard the sacrifice, the two joys of the Raghu line stood ready.',
      speaker: 'Valmiki', eventId: 'yagna-protection', tags: ['dharma', 'courage'], isFamous: false,
    },
    // ── Sarga 48–49 — Ahalya's redemption ──────────────────
    {
      id: 'bala-48-16', sarga: 48, shloka: 16,
      devanagari: 'स्पर्शात्तु रामस्य महात्मनः सा शापाद्विमुक्ता समभूत् तदाहल्या।',
      translation: 'By the mere touch of the great-souled Ram, Ahalya was released from her curse.',
      speaker: 'Valmiki', eventId: 'ahalya-redemption', tags: ['miracle', 'devotion'], isFamous: true,
      commentary: 'The liberation of Ahalya — grace embodied.',
    },
    {
      id: 'bala-49-9', sarga: 49, shloka: 9,
      devanagari: 'प्रतिपेदे स्वकं देहं तपसा दग्धकिल्बिषा।',
      translation: 'Purified of all sin by her austerity, Ahalya regained her own radiant form.',
      speaker: 'Valmiki', eventId: 'ahalya-redemption', tags: ['miracle', 'devotion'], isFamous: false,
    },
    // ── Sarga 66–67 — The Shiva Dhanush ─────────────────────
    {
      id: 'bala-66-17', sarga: 66, shloka: 17,
      devanagari: 'इदं धनुर्वरं ब्रह्मन् संस्पृशामीह पाणिना।',
      translation: 'O sage, with my hand I now touch this supreme bow.',
      speaker: 'Ram', eventId: 'swayamvara-bow', tags: ['courage'], isFamous: false,
    },
    {
      id: 'bala-66-19', sarga: 66, shloka: 19,
      devanagari: 'धर्मो रक्षति रक्षितः।',
      transliteration: 'dharmo rakṣati rakṣitaḥ |',
      translation: 'Dharma protects those who protect it.',
      speaker: 'Ram', tags: ['dharma'], isFamous: true,
      commentary: 'One of the most quoted maxims associated with Ram.',
    },
    {
      id: 'bala-67-17', sarga: 67, shloka: 17,
      devanagari: 'तस्य शब्दो महानासीन्निर्घातसमनिस्वनः।',
      transliteration: 'tasya śabdo mahān āsīn nirghātasama-nisvanaḥ |',
      translation: 'As the bow snapped, there arose a sound as tremendous as a thunderbolt.',
      speaker: 'Valmiki', eventId: 'swayamvara-bow', tags: ['miracle', 'courage'], isFamous: true,
      commentary: 'The breaking of the Shiva Dhanush that won Sita\'s hand.',
    },
    {
      id: 'bala-73-26', sarga: 73, shloka: 26,
      devanagari: 'इयं सीता मम सुता सहधर्मचरी तव।',
      transliteration: 'iyaṃ sītā mama sutā sahadharmacarī tava |',
      translation: 'This is Sita, my daughter — henceforth your companion in Dharma.',
      speaker: 'Janaka', eventId: 'swayamvara-bow', tags: ['love', 'dharma'], isFamous: true,
      commentary: 'Janaka gives Sita to Ram — the archetypal words of kanyadana.',
    },
    // ── Sarga 74–76 — Parashurama ───────────────────────────
    {
      id: 'bala-76-14', sarga: 76, shloka: 14,
      devanagari: 'अक्षय्यं मधुहन्तारं जानामि त्वां सुरेश्वरम्।',
      translation: 'I know you now to be the imperishable slayer of Madhu, the Lord of the gods (Vishnu).',
      speaker: 'Parashurama', eventId: 'parashurama-challenge', tags: ['devotion', 'miracle'], isFamous: true,
      commentary: 'Parashurama recognizes Ram as Vishnu and yields.',
    },
    {
      id: 'bala-76-19', sarga: 76, shloka: 19,
      devanagari: 'गमिष्ये तपसे राम महेन्द्रं पर्वतोत्तमम्।',
      translation: 'O Ram, I shall depart for penance upon Mahendra, the noblest of mountains.',
      speaker: 'Parashurama', eventId: 'parashurama-challenge', tags: ['wisdom'], isFamous: false,
    },
    {
      id: 'bala-77-6', sarga: 77, shloka: 6,
      devanagari: 'उवास सुखितस्तत्र प्रजाः पालयन् नृपः।',
      translation: 'The king dwelt there in happiness, protecting his people with love.',
      speaker: 'Valmiki', tags: ['dharma', 'joy'], isFamous: false,
      commentary: 'The peaceful close of the Bala Kanda in Ayodhya after the weddings.',
    },
  ],
};
