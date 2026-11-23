export type HistoryPortrait = {
  name: string;
  era: string;
  image: string;
  alt: string;
  caption: string;
  imagePosition?: string;
};

/** History remains a room of its own, deliberately separate from the project index. */
export const historyPortraits: HistoryPortrait[] = [
  {
    name: "Mahmud of Ghazni",
    era: "Ghaznavid Empire · 11th century",
    image: "/showroom/history/mahmud-of-ghazni.webp",
    alt: "Miniature of a mounted ruler and his soldiers",
    caption: "I ruled from Ghazni and led campaigns into the Indian subcontinent, extending the Ghaznavid realm.",
  },
  {
    name: "Toghril Beg",
    era: "Seljuk Empire · 11th century",
    image: "/showroom/history/toghril-beg.webp",
    alt: "Persian miniature of two rulers seated with attendants",
    caption: "I founded the Great Seljuk state, entered Baghdad in 1055, and became protector of the Abbasid caliph.",
  },
  {
    name: "Babur",
    era: "Mughal Empire · 16th century",
    image: "/showroom/history/babur.webp",
    alt: "Detail of a Mughal miniature showing Babur",
    caption: "I founded the Mughal dynasty in India after my victory at Panipat in 1526.",
  },
  {
    name: "Kublai Khan",
    era: "Yuan dynasty · 13th century",
    image: "/showroom/history/kublai-khan.webp",
    alt: "Imperial portrait of Kublai Khan",
    caption: "I founded China's Yuan dynasty and became its first emperor.",
  },
  {
    name: "Chagatai Khan",
    era: "Chagatai Khanate · 13th century",
    image: "/showroom/history/chagatai-khan.webp",
    alt: "Historical miniature showing a Mongol court and its attendants",
    caption: "I was a son of Genghis Khan; my name lived on in the Chagatai Khanate of Central Asia.",
  },
  {
    name: "Ögedei Khan",
    era: "Mongol Empire · 13th century",
    image: "/showroom/history/ogedei-khan.webp",
    alt: "Imperial portrait of Ögedei Khan",
    caption: "I succeeded my father Genghis Khan as Great Khan and continued the empire's expansion.",
  },
  {
    name: "Attila",
    era: "The Huns · 5th century",
    image: "/showroom/history/attila-delacroix.webp",
    alt: "Eugène Delacroix's dramatic painting of Attila on horseback",
    caption: "I led the Huns in Europe and challenged both halves of the Roman Empire.",
  },
  {
    name: "Bayezid I",
    era: "Ottoman Empire · 14th–15th century",
    image: "/showroom/history/bayezid-captive.webp",
    alt: "Historical painting of Bayezid I in captivity after Ankara",
    caption: "I ruled the Ottoman state until Timur defeated me at Ankara in 1402.",
  },
  {
    name: "Cyrus the Great",
    era: "Achaemenid Empire · 6th century BCE",
    image: "/showroom/history/cyrus-the-great.webp",
    alt: "Illustrated profile portrait of Cyrus the Great",
    caption: "I founded the Achaemenid Empire, which grew into one of the ancient world's largest empires.",
  },
  {
    name: "Attila",
    era: "The Huns · 5th century",
    image: "/showroom/history/attila-portrait.webp",
    alt: "Painted portrait of Attila wearing a fur-trimmed hat",
    caption: "I led the Huns across Europe and negotiated with, fought, and pressured the Roman empires.",
  },
  {
    name: "Bayezid I · Yıldırım",
    era: "Ottoman Empire · 14th–15th century",
    image: "/showroom/history/bayezid-thunderbolt.webp",
    alt: "Painted portrait labeled Bayezid the Thunderbolt",
    caption: "I was known as Yıldırım, the Thunderbolt, for the speed of my campaigns.",
  },
  {
    name: "Berke Khan",
    era: "Golden Horde · 13th century",
    image: "/showroom/history/berke-khan.webp",
    alt: "Illustration of Mongol cavalry on campaign",
    caption: "I ruled the Golden Horde, the Mongol power across the western steppe.",
  },
  {
    name: "Alp Arslan",
    era: "Great Seljuk Empire · 11th century",
    image: "/showroom/history/alp-arslan.webp",
    alt: "Portrait of Alp Arslan beneath a double-headed eagle emblem",
    caption: "I led the Seljuks to victory at Manzikert in 1071, changing the balance of power in Anatolia.",
  },
  {
    name: "Jebe Noyan",
    era: "Mongol Empire · 13th century",
    image: "/showroom/history/jebe.webp",
    alt: "Illustration of a Mongol mounted archer",
    caption: "I was one of Genghis Khan's leading generals and rode west on a far-reaching campaign with Subutai.",
  },
  {
    name: "Al-Walid I",
    era: "Umayyad Caliphate · 705–715",
    image: "/showroom/history/al-walid-i.webp",
    alt: "Historical painting of a ruler receiving a visitor",
    caption: "I ruled the Umayyad Caliphate as its campaigns reached Iberia and expanded east across Central Asia.",
  },
  {
    name: "Subutai",
    era: "Mongol Empire · 12th–13th century",
    image: "/showroom/history/subutai.webp",
    alt: "Panoramic battle painting associated with Subutai's campaigns",
    caption: "I was a Mongol general whose campaigns crossed Central Asia and reached deep into Europe.",
  },
  {
    name: "Harun al-Rashid",
    era: "Abbasid Caliphate · 8th–9th century",
    image: "/showroom/history/harun-al-rashid.webp",
    alt: "Painting of Harun al-Rashid with scholars and attendants",
    caption: "I ruled the Abbasid caliphate from Baghdad during a celebrated era of court and scholarship.",
  },
  {
    name: "Selim I",
    era: "Ottoman Empire · 16th century",
    image: "/showroom/history/selim-i.webp",
    alt: "Ottoman ruler Selim I riding a white horse",
    caption: "I expanded Ottoman rule through campaigns in the Levant and Egypt.",
  },
  {
    name: "Nader Shah",
    era: "Afsharid dynasty · 18th century",
    image: "/showroom/history/nader-shah.webp",
    alt: "Painted portrait of Nader Shah in jeweled red clothing",
    caption: "I founded the Afsharid dynasty and led campaigns across Persia and into India.",
  },
  {
    name: "Mete Han",
    era: "Xiongnu confederation · 3rd–2nd century BCE",
    image: "/showroom/history/mete-han.webp",
    alt: "Illustrated portrait of Mete Han in steppe armor",
    caption: "I led the Xiongnu confederation in ancient Central Asia; later Turkic tradition remembers me as Mete Han.",
  },
  {
    name: "Ismail I",
    era: "Safavid Empire · 16th century",
    image: "/showroom/history/ismail-i.webp",
    alt: "Portrait of Ismail I, founder of the Safavid dynasty",
    caption: "I founded the Safavid dynasty and established Twelver Shi'ism as the state religion of Persia.",
  },
  {
    name: "Mehmed II",
    era: "Ottoman Empire · 15th century",
    image: "/showroom/history/mehmed-ii.webp",
    alt: "Painted portrait of Mehmed II, the Ottoman sultan",
    caption: "I conquered Constantinople in 1453 and made it an Ottoman capital.",
  },
  {
    name: "Genghis Khan",
    era: "Mongol Empire · 13th century",
    image: "/showroom/history/genghis-khan.webp",
    alt: "Painted portrait of Genghis Khan",
    caption: "I united the Mongol tribes and founded an empire that would stretch across much of Eurasia.",
  },
  {
    name: "Timur",
    era: "Central Asia · 14th century",
    image: "/showroom/history/timur.webp",
    alt: "Equestrian statue of Timur",
    caption: "I founded the Timurid Empire and led campaigns across Central and West Asia.",
  },
];

export type ListeningTrack = {
  title: string;
  artist: string;
};

/** Titles and artists transcribed from Nour's screenshots; no audio files are included. */
export const listeningTracks: ListeningTrack[] = [
  { title: "Human", artist: 'John "The Ragin Cajun" Jones' },
  { title: "Another Love", artist: "Tom Odell" },
  { title: "House of Memories", artist: "Panic! At The Disco" },
  { title: "VILLAIN", artist: "K/DA · Madison Beer · Kim Petras" },
  { title: "In And Out Of Love", artist: "Armin van Buuren · Sharon den Adel" },
  { title: "Rockstar 2", artist: "Soolking" },
  { title: "Bebeto", artist: "Kendji Girac · Soolking" },
  { title: "Rise Up", artist: "TheFatRat · Syrex" },
];

export type ShowroomProject = {
  name: string;
  kind: string;
  description: string;
  tags: string[];
  repo: string;
  extra?: { label: string; href: string };
  number: string;
};

export const showroomProjects: ShowroomProject[] = [
  {
    number: "01",
    name: "Anar-IDE",
    kind: "Open-source Rust editor",
    description: "A Rust-language editor built in the Golden Army, using RustTurbo for smart-cached compilation.",
    tags: ["Rust", "Editor", "Golden Army"],
    repo: "https://github.com/the-golden-army/Anar-IDE",
  },
  {
    number: "02",
    name: "RustTurbo",
    kind: "Node.js package · native Rust tool",
    description: "An npm-distributed shim for a native Rust compilation accelerator, with platform binaries delivered from GitHub Releases.",
    tags: ["npm 0.1.1", "Rust", "Build tools"],
    repo: "https://github.com/the-golden-army/Rusturbo",
    extra: { label: "npm package", href: "https://www.npmjs.com/package/rusturbo" },
  },
  {
    number: "03",
    name: "bidi-kit",
    kind: "Node.js / TypeScript package",
    description: "A small toolkit for Arabic and mixed-direction text: isolates RTL runs, keeps punctuation in place, and helps detect invisible bidi controls.",
    tags: ["npm 0.1.1", "Arabic · RTL", "Zero dependencies"],
    repo: "https://github.com/Nour-yahyaoui/ui-storm",
    extra: { label: "npm package", href: "https://www.npmjs.com/package/bidi-kit" },
  },
  {
    number: "04",
    name: "nour-code",
    kind: "Local AI coding agent",
    description: "A local-first coding agent around Qwen3 8B and Ollama, with permission-checked tools, hot-reloadable skills, and an offline test suite.",
    tags: ["Python", "FastAPI", "Ollama"],
    repo: "https://github.com/Nour-yahyaoui/nour-code",
    extra: { label: "Live site", href: "https://nour-code-agent.vercel.app" },
  },
  {
    number: "05",
    name: "RustPad",
    kind: "Offline-first document studio",
    description: "A native desktop studio for Word and PDF workflows, written in pure Rust and designed to work offline.",
    tags: ["Rust", "Desktop", "PDF · DOCX"],
    repo: "https://github.com/Nour-yahyaoui/rustpad",
    extra: { label: "Live site", href: "https://rustpad-studio.vercel.app" },
  },
];
