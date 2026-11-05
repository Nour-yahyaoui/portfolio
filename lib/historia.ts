/**
 * HISTORIA — "Lessons from the people who shaped history."
 *
 * A personal intellectual archive of historical figures whose stories,
 * decisions, achievements, ambitions, and failures have influenced the
 * way the author thinks. Not an encyclopedia: every chapter is a personal
 * interpretation of what is remarkable and what can be learned.
 *
 * Accuracy rules:
 * - No invented statistics, quotations, conversations, or dates.
 * - Distinguish established evidence from disputed accounts and legend.
 * - Never romanticize brutality or failure to make a story sound better.
 * - A small bibliography per chapter, prioritizing credible sources.
 */

export type HistoriaChapterSlug =
  | "amir-timur"
  | "shah-ismail-i"
  | "nader-shah"
  | "alp-arslan"
  | "bayezid-i";

export interface HistoriaTimelineEvent {
  year: number;
  label: string;
  figure: HistoriaChapterSlug;
  description: string;
}

export interface HistoriaBibliographyEntry {
  author?: string;
  title: string;
  publisher?: string;
  year?: string;
  type: "book" | "article" | "museum" | "archive";
}

export interface HistoriaChapter {
  slug: HistoriaChapterSlug;
  title: string;
  period: string;
  theme: string;
  portrait: string; // /historia/portraits/XX-slug.jpg
  portraitCredit: string;
  introduction: string; // cinematic hook
  context: string; // historical context
  achievements: string[]; // important achievements
  admiredQuality: string; // the specific quality admired
  reflection: string; // central personal reflection
  timeline: HistoriaTimelineEvent[]; // chapter-specific events
  bibliography: HistoriaBibliographyEntry[];
  connectionNote?: string; // e.g. Ankara 1402 for Timur/Bayezid
}

export const historiaChapters: HistoriaChapter[] = [
  {
    slug: "amir-timur",
    title: "Amir Timur (Tamerlane)",
    period: "1336–1405 · 14th century",
    theme: "The Power of Determination",
    portrait: "/historia/portraits/01-timur.jpg",
    portraitCredit: "Contemporary-style portrait, Timurid-era court painting tradition",
    introduction:
      "Born in 1336 near Kesh (modern Shahrisabz, Uzbekistan), Timur suffered severe injuries in youth that left him lame and affected two fingers of his right hand — the wounds that earned him the European epithet \"Tamerlane,\" Timur the Lame. Physical limitation did not limit ambition.",
    context:
      "Timur rose from a minor tribal chieftain in the Chagatai Khanate's fracturing successor states to forge the Timurid Empire, at its height stretching from Central Asia and Persia into parts of India, Russia, and Anatolia. His reign reshaped the political geography of the Islamic world in the late 14th century.",
    achievements: [
      "United the fractious Chagatai successor territories under a single rule from Samarkand.",
      "Conducted campaigns across Persia, Khwarazm, northern India, and Anatolia.",
      "Defeated the Ottoman sultan Bayezid I at the Battle of Ankara in 1402.",
      "Established Samarkand as a capital of architecture, science, and trade.",
    ],
    admiredQuality:
      "Determination — the refusal to let physical injury or humble origins define the outer edge of what is possible.",
    reflection:
      "Your circumstances do not necessarily determine the limits of your potential.",
    timeline: [
      { year: 1336, label: "Birth", figure: "amir-timur", description: "Born near Kesh in Transoxiana (modern Uzbekistan)." },
      { year: 1370, label: "Rise to power", figure: "amir-timur", description: "Establishes control over Transoxiana and makes Samarkand his capital." },
      { year: 1398, label: "Delhi campaign", figure: "amir-timur", description: "Sacks Delhi, dealing a decisive blow to the Delhi Sultanate." },
      { year: 1402, label: "Battle of Ankara", figure: "amir-timur", description: "Defeats and captures Bayezid I, checking Ottoman expansion into Anatolia." },
      { year: 1405, label: "Death", figure: "amir-timur", description: "Dies while preparing a campaign against Ming China." },
    ],
    bibliography: [
      { title: "Timur: The Conqueror", author: "Beatrice Forbes Manz", type: "book", year: "1989" },
      { title: "The Timurid Dynasty", author: "Maria E. Subtelny", type: "book", year: "2007" },
    ],
    connectionNote:
      "Confronted Bayezid I at the Battle of Ankara (1402) — two extraordinary commanders meeting on one field.",
  },
  {
    slug: "shah-ismail-i",
    title: "Shah Ismail I",
    period: "1487–1524 · Late 15th–early 16th century",
    theme: "The Power of Vision and Leadership",
    portrait: "/historia/portraits/02-ismail.jpg",
    portraitCredit: "Safavid-era court portrait, style attributed to the Tabriz school",
    introduction:
      "Ismail was barely fourteen when he emerged from hiding in Gilan with a small band of Qizilbash followers — Turkmen tribesmen devoted to his family's spiritual lineage. Within a few years, that following became an army, and that army became a dynasty.",
    context:
      "In 1501 Ismail captured Tabriz and proclaimed himself Shah, founding the Safavid state. He transformed an existing religious-political movement — the Safavid order, already decades old under his ancestors — into a territorial empire, declaring Twelver Shi'ism the state faith and uniting much of Persia under a single crown for the first time in centuries.",
    achievements: [
      "Captured Tabriz in 1501 and proclaimed himself Shah of Persia.",
      "Founded the Safavid dynasty, which ruled Persia until 1736.",
      "Established Twelver Shi'ism as the state religion, reshaping Persian identity.",
      "Expanded Safavid control across the Iranian plateau and into the Caucasus and Iraq.",
    ],
    admiredQuality:
      "Vision and leadership — the ability to unite people behind an objective at an age when most are still learning to lead themselves.",
    reflection:
      "Leadership is not simply about age or position. It is about the ability to unite people behind a vision.",
    timeline: [
      { year: 1487, label: "Birth", figure: "shah-ismail-i", description: "Born in Ardabil into the Safavid family." },
      { year: 1500, label: "Campaign begins", figure: "shah-ismail-i", description: "Leaves Gilan with Qizilbash followers at roughly fourteen years old." },
      { year: 1501, label: "Capture of Tabriz", figure: "shah-ismail-i", description: "Takes Tabriz and proclaims himself Shah, founding the Safavid state." },
      { year: 1510, label: "Battle of Marv", figure: "shah-ismail-i", description: "Defeats the Uzbek Shaybanids, securing Khorasan." },
      { year: 1524, label: "Death", figure: "shah-ismail-i", description: "Dies; succeeded by his son Tahmasp I." },
    ],
    bibliography: [
      { title: "Shah Abbas: The Ruthless King Who Became an Iranian Legend", author: "David Blow", type: "book", year: "2009" },
      { title: "The Safavids", author: "Roger Savory", type: "book", year: "1980" },
    ],
  },
  {
    slug: "nader-shah",
    title: "Nader Shah Afshar",
    period: "1688–1747 · Early 18th century",
    theme: "The Power of Rebuilding and Strategy",
    portrait: "/historia/portraits/04-nader-shah.jpg",
    portraitCredit: "Contemporary portrait, artist unknown, ca. 1740, Iran",
    introduction:
      "The Safavid state collapsed after the Afghan Hotaks seized Isfahan in 1722, and Persia splintered under foreign occupation and civil war. From an obscure military background in the Afshar tribe, Nader raised a force, expelled the invaders, and restored Persian territorial integrity — before crowning himself Shah in 1736.",
    context:
      "Nader's campaigns drove the Hotaks from Persia, reclaimed lost provinces, and carried Persian arms as far as Delhi, where his victory at Karnal in 1739 shattered the Mughal army. His later years turned authoritarian: heavy taxation, suspicion, and violent purges eroded the legitimacy he had rebuilt, and he was assassinated in 1747.",
    achievements: [
      "Defeated the Afghan Hotak forces and liberated Isfahan (1729).",
      "Restored Persian territorial integrity after the Safavid collapse.",
      "Founded the Afsharid dynasty and crowned himself Shah in 1736.",
      "Won the Battle of Karnal against the Mughal Empire in 1739 and briefly occupied Delhi.",
    ],
    admiredQuality:
      "Rebuilding and strategy — the capacity to read a broken situation, understand what remains workable, and reconstruct from it.",
    reflection:
      "Sometimes greatness is not about inheriting power. It is about understanding a broken situation and rebuilding it.",
    timeline: [
      { year: 1688, label: "Birth", figure: "nader-shah", description: "Born into the Afshar tribe, a humble military background." },
      { year: 1722, label: "Fall of Isfahan", figure: "nader-shah", description: "The Afghan Hotaks capture Isfahan; the Safavid state collapses." },
      { year: 1729, label: "Victory over Ashraf Hotak", figure: "nader-shah", description: "Nader defeats Ashraf Hotak and begins restoring Persian control." },
      { year: 1736, label: "Coronation", figure: "nader-shah", description: "Crowned Shah of Persia, founding the Afsharid dynasty." },
      { year: 1739, label: "Battle of Karnal", figure: "nader-shah", description: "Decisive victory over the Mughal army; brief occupation of Delhi." },
      { year: 1747, label: "Assassination", figure: "nader-shah", description: "Killed by his own officers; the Afsharid state quickly fragments." },
    ],
    bibliography: [
      { title: "Nader Shah: The Sword of Persia", author: "Michael Axworthy", type: "book", year: "2006" },
      { title: "The Sword of Persia: Nader Shah, from Tribal Warrior to Conquering Tyrant", author: "Michael Axworthy", type: "book", year: "2006" },
    ],
  },
  {
    slug: "alp-arslan",
    title: "Alp Arslan",
    period: "1029–1072 · 11th century",
    theme: "The Power of Strategy Against Overwhelming Odds",
    portrait: "/historia/portraits/03-alp-arslan.jpg",
    portraitCredit: "Later Seljuk-era representation, symbolic portraiture tradition",
    introduction:
      "Alp Arslan, \"Heroic Lion,\" was the second sultan of the Great Seljuk Empire. In the summer of 1071 he met the Byzantine army under Emperor Romanos IV Diogenes at Manzikert, near Lake Van in eastern Anatolia — and turned a campaign the Byzantines expected to win into one of the most consequential reversals of medieval history.",
    context:
      "The Seljuk Empire, founded by Tughril Beg, had already brought much of the Islamic Near East under Turkic rule. Alp Arslan extended that power into Anatolia. Manzikert did not destroy Byzantium outright, but it broke Byzantine military confidence in the region and opened the door to Turkic settlement of Anatolia — a shift with consequences reaching into the Crusades and beyond.",
    achievements: [
      "Sultan of the Great Seljuk Empire, expanding Seljuk authority into Anatolia and the Caucasus.",
      "Defeated and captured the Byzantine emperor Romanos IV Diogenes at the Battle of Manzikert in 1071.",
      "Negotiated a surprisingly merciful peace with Romanos after the battle — then dismissed him when Byzantine politics intervened.",
    ],
    admiredQuality:
      "Strategy against odds — the recognition that intelligence, preparation, and terrain can outweigh raw numbers.",
    reflection:
      "Numerical superiority does not automatically guarantee victory. Intelligence, preparation, and strategy can change the outcome.",
    timeline: [
      { year: 1029, label: "Birth", figure: "alp-arslan", description: "Born into the Seljuk royal family." },
      { year: 1063, label: "Becomes sultan", figure: "alp-arslan", description: "Succeeds his uncle Tughril Beg as sultan of the Seljuk Empire." },
      { year: 1071, label: "Battle of Manzikert", figure: "alp-arslan", description: "Defeats and captures Byzantine emperor Romanos IV Diogenes." },
      { year: 1072, label: "Death", figure: "alp-arslan", description: "Dies from wounds after a campaign in the Caucasus." },
    ],
    bibliography: [
      { title: "The Battle of Manzikert", author: "Carole Hillenbrand", type: "article", year: "2007" },
      { title: "The Seljuqs: Politics, Society, and Culture", author: "A.C.S. Peacock", type: "book", year: "2010" },
    ],
  },
  {
    slug: "bayezid-i",
    title: "Bayezid I (Yıldırım)",
    period: "1360–1403 · Late 14th–early 15th century",
    theme: "The Power of Military Command",
    portrait: "/historia/portraits/05-bayezid-i.jpg",
    portraitCredit: "Ottoman court portrait tradition, \"Yıldırım\" (the Thunderbolt)",
    introduction:
      "Bayezid I, known as Yıldırım — \"the Thunderbolt\" — earned the name for the speed and force of his campaigns. In 1396 he faced a crusading coalition assembled by King Sigismund of Hungary at Nicopolis on the Danube, and broke it. The victory marked the Ottoman Empire's emergence as a major European military power.",
    context:
      "Bayezid expanded Ottoman control across Anatolia and the Balkans, besieged Constantinople, and brought the Ottomans to the borders of Central Europe. His momentum ended at Ankara in 1402, where Timur caught the Ottoman army in a pitched battle, captured Bayezid, and triggered a decade-long Ottoman interregnum.",
    achievements: [
      "Succeeded his father Murad I as Ottoman sultan in 1389.",
      "Defeated the crusading coalition at the Battle of Nicopolis in 1396.",
      "Extended Ottoman rule across Anatolia and the Balkans.",
      "Besieged Constantinople, demonstrating Ottoman reach.",
    ],
    admiredQuality:
      "Military command — the understanding that coordination, discipline, and leadership decide the fate of armies more than numbers alone.",
    reflection:
      "Military strength is not simply about numbers. Coordination, discipline, and command can determine the fate of entire armies.",
    timeline: [
      { year: 1360, label: "Birth", figure: "bayezid-i", description: "Born to Sultan Murad I." },
      { year: 1389, label: "Becomes sultan", figure: "bayezid-i", description: "Succeeds Murad I after the Battle of Kosovo." },
      { year: 1396, label: "Battle of Nicopolis", figure: "bayezid-i", description: "Defeats the crusading coalition led by Sigismund of Hungary." },
      { year: 1402, label: "Battle of Ankara", figure: "bayezid-i", description: "Defeated and captured by Timur; Ottoman interregnum begins." },
      { year: 1403, label: "Death", figure: "bayezid-i", description: "Dies in captivity in Akşehir." },
    ],
    bibliography: [
      { title: "The Ottoman Empire: The Classical Age 1300–1600", author: "Halil İnalcık", type: "book", year: "1973" },
      { title: "Osman's Dream: The History of the Ottoman Empire", author: "Caroline Finkel", type: "book", year: "2005" },
    ],
    connectionNote:
      "Confronted by Timur at the Battle of Ankara (1402) — two extraordinary commanders meeting on one field.",
  },
];

export const historiaTimeline: HistoriaTimelineEvent[] = [
  { year: 1071, label: "Battle of Manzikert", figure: "alp-arslan", description: "Alp Arslan defeats and captures Byzantine emperor Romanos IV Diogenes." },
  { year: 1389, label: "Bayezid I becomes sultan", figure: "bayezid-i", description: "Bayezid I (Yıldırım) succeeds Murad I as Ottoman sultan." },
  { year: 1396, label: "Battle of Nicopolis", figure: "bayezid-i", description: "Bayezid I defeats the crusading coalition led by Sigismund of Hungary." },
  { year: 1402, label: "Battle of Ankara", figure: "bayezid-i", description: "Timur defeats and captures Bayezid I — the Timur–Bayezid confrontation." },
  { year: 1501, label: "Foundation of the Safavid state", figure: "shah-ismail-i", description: "Ismail I captures Tabriz and proclaims himself Shah." },
  { year: 1722, label: "Fall of Isfahan", figure: "nader-shah", description: "The Afghan Hotaks capture Isfahan; the Safavid state collapses." },
  { year: 1729, label: "Nader's victory over Ashraf Hotak", figure: "nader-shah", description: "Nader defeats Ashraf Hotak and begins restoring Persian control." },
  { year: 1736, label: "Nader Shah becomes ruler", figure: "nader-shah", description: "Nader crowned Shah of Persia, founding the Afsharid dynasty." },
  { year: 1739, label: "Battle of Karnal", figure: "nader-shah", description: "Nader Shah defeats the Mughal army at Karnal." },
];

export const historiaPhilosophy = {
  intro:
    "I study history not to glorify conquest, but to understand ambition, decisions, strategy, human potential, and the consequences of power.",
  ideas: [
    {
      id: "determination",
      title: "Determination",
      statement:
        "Physical or external limitations do not always define what is possible.",
      chapter: "amir-timur",
    },
    {
      id: "vision",
      title: "Vision",
      statement:
        "Great ambitions require the ability to unite people around an objective.",
      chapter: "shah-ismail-i",
    },
    {
      id: "rebuilding",
      title: "Rebuilding",
      statement:
        "A difficult starting point does not prevent someone from creating something significant.",
      chapter: "nader-shah",
    },
    {
      id: "strategy",
      title: "Strategy",
      statement:
        "Intelligence and preparation can be more important than raw resources.",
      chapter: "alp-arslan",
    },
    {
      id: "leadership",
      title: "Leadership",
      statement:
        "Power requires responsibility, discipline, and the ability to make difficult decisions.",
      chapter: "bayezid-i",
    },
  ],
};

export function getHistoriaChapter(slug: HistoriaChapterSlug) {
  return historiaChapters.find((c) => c.slug === slug);
}

export function getConnectedChapter(slug: HistoriaChapterSlug) {
  // Timur <-> Bayezid connection at Ankara 1402
  if (slug === "amir-timur") return getHistoriaChapter("bayezid-i");
  if (slug === "bayezid-i") return getHistoriaChapter("amir-timur");
  return null;
}
