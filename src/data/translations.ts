// ============================================================
//  AVATARAN — i18n (UI chrome only: en / hi)
//  Story content (event descriptions, bios) stays English by
//  design. This dictionary covers navigation, buttons, headings,
//  tabs, prompts, quiz, search, bookmarks, and the constellation.
// ============================================================

export type Lang = 'en' | 'hi';

export const LANGUAGES: { id: Lang; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'hi', label: 'हिन्दी', short: 'हि' },
];

// Every user-facing chrome string keyed by a stable dot-path.
const en = {
  // Headings
  'heading.eyebrow.lifeline': 'श्रीमद् रामायणम्',
  'heading.eyebrow.mandir': 'श्रीराम जन्मभूमि',
  'heading.title.lifeline': 'The Eternal Path',
  'heading.title.mandir': 'Divine Homecoming',
  'heading.sub.lifeline.mobile': "Follow Lord Ram's journey of absolute Dharma — stage by stage",
  'heading.sub.lifeline.desktop': "Scroll to follow Lord Ram's journey of absolute Dharma — all Seven Kandas",
  'heading.sub.mandir': 'Explore the architectural marvel, sacred ghats, and child-deity of modern Ayodhya',

  // Bottom dock
  'dock.lifeline': 'Lifeline',
  'dock.cast': 'Cast',
  'dock.mandir': 'Mandir',
  'dock.saved': 'Saved',

  // Toolbar / actions
  'action.search': 'Search',
  'action.daily': 'Daily Challenge',
  'action.theme': 'Toggle theme',
  'action.language': 'Language',
  'action.share': 'Share',
  'action.copied': 'Copied!',
  'action.read': 'Read',
  'action.close': 'Close',
  'action.export': 'Export',
  'action.clear': 'Clear',

  // Timeline / chapter nav
  'timeline.turningPoint': 'Turning Point',
  'timeline.explore': 'Explore full chapter',
  'chapter.of': 'Chapter {n} of 7',
  'chapter.back': 'Go Back',
  'chapter.next': 'Complete & Next',
  'chapter.enterMandir': 'Enter Ram Mandir',

  // Drawer tabs
  'tab.events': 'Events',
  'tab.characters': 'Cast',
  'tab.locations': 'Locations',
  'tab.weapons': 'Weapons',
  'tab.dialogues': 'Dialogues',
  'tab.verses': 'Verses',
  'tab.gallery': 'Gallery',
  'tab.facts': 'Facts',
  'tab.references': 'Sources',
  'drawer.quiz': 'Quiz',
  'drawer.enterReading': 'Enter Reading Mode',
  'drawer.versesSoon': 'Curated shlokas for this Kanda are coming soon.',

  // Resume prompt
  'resume.welcome': 'शुभ आगमनम् (Welcome Back)',
  'resume.title': 'Resume Journey?',
  'resume.body': 'Would you like to continue from where you left off or start a fresh exploration?',
  'resume.savedLocation': 'Saved Location',
  'resume.startFresh': 'Start Fresh',
  'resume.continue': 'Continue',

  // Search
  'search.placeholder': 'Search Ram, Hanuman, Ayodhya, verses…',
  'search.empty': 'Type to search across all seven Kandas — events, characters, and verses.',
  'search.noResults': 'No results for “{q}”.',
  'search.type.kanda': 'Kanda',
  'search.type.event': 'Event',
  'search.type.character': 'Character',
  'search.type.verse': 'Verse',

  // Quiz
  'quiz.daily': 'Daily Challenge',
  'quiz.grand': 'Grand Ramayana Challenge',
  'quiz.kanda': 'Kanda Quiz',
  'quiz.none': 'No questions available yet.',
  'quiz.streak': 'Streak: {n}',
  'quiz.question': 'Question {n} of {total}',
  'quiz.correct': '{score} / {total} correct',
  'quiz.flawless': 'Flawless! A true scholar of the Ramayana.',
  'quiz.good': 'Well done — your knowledge shines.',
  'quiz.tryAgain': 'Keep exploring the Kandas and try again.',
  'quiz.why': 'Why:',
  'quiz.next': 'Next',
  'quiz.finish': 'Finish',

  // Bookmarks
  'saved.title': 'Saved',
  'saved.empty': 'No bookmarks yet. Tap the heart on any verse, event, or character to save it here.',

  // Sloka of the day
  'sloka.title': 'Shloka of the Day',

  // Reading mode
  'reading.mode': 'Reading Mode',
  'reading.count': '{n} curated shlokas',

  // Constellation
  'constellation.title': 'Character Constellation',
  'constellation.allFactions': 'All Factions',
  'constellation.allBonds': 'All Bonds',
  'constellation.graph': 'Graph',
  'constellation.list': 'List',
  'constellation.searchPlaceholder': 'Search characters…',
  'constellation.bonds': 'Bonds',
  'constellation.appearsIn': 'Appears In',
  'constellation.tapHint': 'Tap a character to explore their bonds',

  // Verses / dialogues / weapons
  'verse.translation': 'Translation',
  'dialogue.context': 'Context',
  'event.weapon': 'Weapon',
  'weapon.wielder': 'Wielder',

  // Mandir & Garbhagriha
  'mandir.view': 'Mandir View',
  'mandir.day': 'Day',
  'mandir.night': 'Night',
  'mandir.dayArati': 'Day — Arati',
  'mandir.nightDeepotsav': 'Night — Deepotsav',
  'lalla.shringaar': 'Shringaar',
  'lalla.saffron': 'Saffron',
  'lalla.yellow': 'Yellow',
  'lalla.flowers': 'Pushpa',
  'lalla.lotus': 'Lotus',
  'lalla.milk': 'Abhisheka',
  'lalla.abhishekam': 'Ksheera Abhishekam',
  'lalla.alankaram': '{outfit} Alankaram',
} as const;

export type TKey = keyof typeof en;

const hi: Record<TKey, string> = {
  'heading.eyebrow.lifeline': 'श्रीमद् रामायणम्',
  'heading.eyebrow.mandir': 'श्रीराम जन्मभूमि',
  'heading.title.lifeline': 'शाश्वत पथ',
  'heading.title.mandir': 'दिव्य गृह-आगमन',
  'heading.sub.lifeline.mobile': 'भगवान श्रीराम की परम धर्म-यात्रा का अनुसरण करें — चरण-दर-चरण',
  'heading.sub.lifeline.desktop': 'सभी सातों कांडों में भगवान श्रीराम की परम धर्म-यात्रा हेतु स्क्रॉल करें',
  'heading.sub.mandir': 'आधुनिक अयोध्या के स्थापत्य वैभव, पवित्र घाटों और बाल-विग्रह का दर्शन करें',

  'dock.lifeline': 'जीवनरेखा',
  'dock.cast': 'पात्र',
  'dock.mandir': 'मंदिर',
  'dock.saved': 'सहेजे गए',

  'action.search': 'खोजें',
  'action.daily': 'दैनिक चुनौती',
  'action.theme': 'थीम बदलें',
  'action.language': 'भाषा',
  'action.share': 'साझा करें',
  'action.copied': 'कॉपी हो गया!',
  'action.read': 'पढ़ें',
  'action.close': 'बंद करें',
  'action.export': 'निर्यात',
  'action.clear': 'साफ़ करें',

  'timeline.turningPoint': 'निर्णायक क्षण',
  'timeline.explore': 'पूरा अध्याय देखें',
  'chapter.of': 'अध्याय {n} / 7',
  'chapter.back': 'पीछे जाएँ',
  'chapter.next': 'पूर्ण करें और आगे',
  'chapter.enterMandir': 'राम मंदिर में प्रवेश',

  'tab.events': 'घटनाएँ',
  'tab.characters': 'पात्र',
  'tab.locations': 'स्थान',
  'tab.weapons': 'शस्त्र',
  'tab.dialogues': 'संवाद',
  'tab.verses': 'श्लोक',
  'tab.gallery': 'चित्रवीथी',
  'tab.facts': 'तथ्य',
  'tab.references': 'स्रोत',
  'drawer.quiz': 'प्रश्नोत्तरी',
  'drawer.enterReading': 'पठन मोड में प्रवेश',
  'drawer.versesSoon': 'इस कांड के चयनित श्लोक शीघ्र आ रहे हैं।',

  'resume.welcome': 'शुभ आगमनम् (पुनः स्वागत है)',
  'resume.title': 'यात्रा जारी रखें?',
  'resume.body': 'क्या आप वहीं से जारी रखना चाहेंगे जहाँ छोड़ा था, या नई खोज आरंभ करेंगे?',
  'resume.savedLocation': 'सहेजा गया स्थान',
  'resume.startFresh': 'नई शुरुआत',
  'resume.continue': 'जारी रखें',

  'search.placeholder': 'राम, हनुमान, अयोध्या, श्लोक खोजें…',
  'search.empty': 'सभी सातों कांडों में खोजने हेतु टाइप करें — घटनाएँ, पात्र और श्लोक।',
  'search.noResults': '“{q}” हेतु कोई परिणाम नहीं।',
  'search.type.kanda': 'कांड',
  'search.type.event': 'घटना',
  'search.type.character': 'पात्र',
  'search.type.verse': 'श्लोक',

  'quiz.daily': 'दैनिक चुनौती',
  'quiz.grand': 'महान रामायण चुनौती',
  'quiz.kanda': 'कांड प्रश्नोत्तरी',
  'quiz.none': 'अभी कोई प्रश्न उपलब्ध नहीं।',
  'quiz.streak': 'श्रृंखला: {n}',
  'quiz.question': 'प्रश्न {n} / {total}',
  'quiz.correct': '{score} / {total} सही',
  'quiz.flawless': 'निर्दोष! रामायण के सच्चे विद्वान।',
  'quiz.good': 'शाबाश — आपका ज्ञान प्रकाशमान है।',
  'quiz.tryAgain': 'कांडों का अन्वेषण जारी रखें और पुनः प्रयास करें।',
  'quiz.why': 'कारण:',
  'quiz.next': 'अगला',
  'quiz.finish': 'समाप्त',

  'saved.title': 'सहेजे गए',
  'saved.empty': 'अभी कोई बुकमार्क नहीं। किसी भी श्लोक, घटना या पात्र पर हृदय-चिह्न दबाकर यहाँ सहेजें।',

  'sloka.title': 'आज का श्लोक',

  'reading.mode': 'पठन मोड',
  'reading.count': '{n} चयनित श्लोक',

  'constellation.title': 'पात्र मंडल',
  'constellation.allFactions': 'सभी कुल',
  'constellation.allBonds': 'सभी संबंध',
  'constellation.graph': 'ग्राफ़',
  'constellation.list': 'सूची',
  'constellation.searchPlaceholder': 'पात्र खोजें…',
  'constellation.bonds': 'संबंध',
  'constellation.appearsIn': 'उपस्थिति',
  'constellation.tapHint': 'संबंध देखने हेतु किसी पात्र पर टैप करें',

  // Verses / dialogues / weapons
  'verse.translation': 'अनुवाद',
  'dialogue.context': 'प्रसंग',
  'event.weapon': 'शस्त्र',
  'weapon.wielder': 'धारक',

  // Mandir & Garbhagriha
  'mandir.view': 'मंदिर दर्शन',
  'mandir.day': 'दिन',
  'mandir.night': 'रात्रि',
  'mandir.dayArati': 'दिन — आरती',
  'mandir.nightDeepotsav': 'रात्रि — दीपोत्सव',
  'lalla.shringaar': 'शृंगार',
  'lalla.saffron': 'भगवा',
  'lalla.yellow': 'पीला',
  'lalla.flowers': 'पुष्प',
  'lalla.lotus': 'कमल',
  'lalla.milk': 'अभिषेक',
  'lalla.abhishekam': 'क्षीर अभिषेकम्',
  'lalla.alankaram': '{outfit} अलंकरण',
};

const DICTS: Record<Lang, Record<TKey, string>> = { en, hi };

/** Translate a key, with optional {placeholder} interpolation. */
export function translate(lang: Lang, key: TKey, vars?: Record<string, string | number>): string {
  let str: string = DICTS[lang]?.[key] ?? DICTS.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return str;
}

// Faction & relation labels get their own localized maps (constellation).
export const FACTION_LABELS: Record<Lang, Record<string, string>> = {
  en: { ayodhya: 'House of Ayodhya', sage: 'Sages & Gurus', vanara: 'Vanara Allies', lanka: 'House of Lanka', divine: 'Divine & Chroniclers' },
  hi: { ayodhya: 'अयोध्या कुल', sage: 'ऋषि व गुरु', vanara: 'वानर सहयोगी', lanka: 'लंका कुल', divine: 'दिव्य व वर्णनकार' },
};

export const RELATION_LABELS: Record<Lang, Record<string, string>> = {
  en: { family: 'Family', ally: 'Ally', enemy: 'Enemy', devotee: 'Devotee', guru: 'Guru' },
  hi: { family: 'परिवार', ally: 'मित्र', enemy: 'शत्रु', devotee: 'भक्त', guru: 'गुरु' },
};
