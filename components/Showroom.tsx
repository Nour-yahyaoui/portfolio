import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RoomFooter, RoomHeader, roomStyles as styles } from "@/components/RoomShell";
import { historyPortraits, listeningTracks } from "@/lib/showroom-content";
import { projects } from "@/lib/projects";

const rooms = [
  {
    number: "01",
    title: "The Workshop",
    href: "/work",
    count: `${projects.length} PROJECTS`,
    description: "Small tools, ambitious systems, and the decisions that shaped them.",
    accent: "work",
  },
  {
    number: "02",
    title: "History",
    href: "/history",
    count: `${historyPortraits.length} FIGURES`,
    description: "Portraits and short notes from eras I keep returning to.",
    accent: "history",
  },
  {
    number: "03",
    title: "Art & Archive",
    href: "/art",
    count: `${historyPortraits.length} IMAGES`,
    description: "An antique-paper gallery of the historical images I collected.",
    accent: "art",
  },
  {
    number: "04",
    title: "Listening Room",
    href: "/listening",
    count: `${listeningTracks.length} FAVORITES`,
    description: "A text-only shelf of songs I love. No embeds, just the names.",
    accent: "sound",
  },
  {
    number: "05",
    title: "Ideas",
    href: "/ideas",
    count: "7 THINKERS",
    description: "Philosophers and scientists whose questions stay interesting.",
    accent: "ideas",
  },
];

const spotlights = [
  {
    slug: "nour-code",
    label: "LOCAL AI · PYTHON",
    title: "nour-code",
    description: "A coding agent built to run on your own machine, with real tools and permission checks.",
    stamp: "01",
  },
  {
    slug: "rustpad",
    label: "DOCUMENTS · RUST",
    title: "RustPad",
    description: "An offline-first Word and PDF studio, written in Rust and shipped as a single binary.",
    stamp: "02",
  },
  {
    slug: "oneclick",
    label: "RETAIL · LOCAL-FIRST",
    title: "OneClick",
    description: "A point-of-sale system for phone shops that keeps working when the internet does not.",
    stamp: "03",
  },
];

const signals = ["SOFTWARE WITH A PURPOSE", "HISTORY IN THE MARGINS", "SONGS ON REPEAT", "QUESTIONS THAT STAY"];

export default function Showroom() {
  return (
    <main className={styles.page}>
      <div className={`${styles.frame} ${styles.homeFrame}`}>
        <RoomHeader />

        <section className={styles.lobbyHero}>
          <div className={styles.lobbyCopy}>
            <p className={styles.eyebrow}>Sfax, Tunisia <span>·</span> A personal collection</p>
            <h1>A curious mind,<br /><em>with room to roam.</em></h1>
            <p className={styles.heroIntro}>
              I’m Nour—a developer who builds software and keeps wandering into history, music, philosophy, and science. This is where those threads live together: some things I made, some things I love, and a few questions I haven’t finished asking.
            </p>
            <div className={styles.heroActions}>
              <Link href="/work" className={styles.primaryAction}>Step into the Workshop <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <a href="#rooms" className={styles.secondaryAction}>Wander the rooms <ArrowDown size={14} aria-hidden="true" /></a>
            </div>
            <div className={styles.heroFootnote}><span className={styles.liveDot} /> IN PROGRESS, LIKE MOST GOOD THINGS</div>
          </div>

          <div className={styles.lobbyArt} role="img" aria-label="Abstract orbital sculpture representing the different rooms of the showroom">
            <div className={styles.artGlow} />
            <div className={styles.orbit}><span /></div>
            <div className={`${styles.orbit} ${styles.orbitTwo}`}><span /></div>
            <div className={`${styles.orbit} ${styles.orbitThree}`}><span /></div>
            <div className={styles.heroDisc}><span>NY</span></div>
            <div className={styles.heroSeal}><strong>FIELD<br />NOTES</strong><small>SFAX · MMXXVI</small></div>
            <span className={`${styles.floatLabel} ${styles.floatCode}`}>01 / MAKE</span>
            <span className={`${styles.floatLabel} ${styles.floatRemember}`}>02 / REMEMBER</span>
            <span className={`${styles.floatLabel} ${styles.floatWonder}`}>03 / WONDER</span>
            <p className={styles.heroCaption}>One collection.<br />Many ways in.</p>
            <span className={styles.artIndex}>FIG. 001 — PERSONAL ORBIT</span>
          </div>
        </section>

        <div className={styles.signalStrip} aria-label="Showroom themes">
          <div className={styles.signalTrack}>
            {[...signals, ...signals].map((signal, index) => (
              <span key={`${signal}-${index}`}>{signal}<b aria-hidden="true">✳</b></span>
            ))}
          </div>
        </div>

        <section className={styles.atGlance} aria-label="The collection at a glance">
          <p className={styles.glanceIntro}>A quick look<br /><em>around the shelves.</em></p>
          <div className={styles.glanceStat}><strong>{projects.length}</strong><span>software projects</span></div>
          <div className={styles.glanceStat}><strong>{historyPortraits.length}</strong><span>historical portraits</span></div>
          <div className={styles.glanceStat}><strong>{listeningTracks.length}</strong><span>favorite tracks</span></div>
          <div className={styles.glanceStat}><strong>07</strong><span>thinkers & scientists</span></div>
        </section>

        <section className={styles.spotlightSection} aria-labelledby="spotlight-title">
          <div className={styles.sectionLead}>
            <div><p className={styles.sectionKicker}>A FEW THINGS FROM THE BENCH</p><h2 id="spotlight-title">Made to be <em>useful.</em></h2></div>
            <p>Software is one way I think out loud. These three projects hint at the kinds of problems I like getting my hands into.</p>
          </div>
          <div className={styles.spotlightGrid}>
            {spotlights.map((project) => (
              <Link className={styles.spotlightCard} href={`/work/${project.slug}`} key={project.slug}>
                <div className={styles.spotlightTop}><span>{project.label}</span><span>{project.stamp}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className={styles.spotlightLink}>READ THE CASE FILE <ArrowUpRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <Link className={styles.allWorkLink} href="/work">There’s more on the workbench <span>Browse all {projects.length} projects ↗</span></Link>
        </section>

        <section className={styles.roomMap} id="rooms" aria-labelledby="room-map-title">
          <div className={styles.mapHeading}>
            <div><p id="room-map-title">Five doors. No prescribed order.</p><span>Pick a thread and follow it.</span></div>
            <span className={styles.mapAside}>A PERSONAL SHOWROOM · EST. 2026</span>
          </div>
          <div className={styles.doorGrid}>
            {rooms.map((room) => (
              <Link className={styles.door} data-theme={room.accent} href={room.href} key={room.href}>
                <div className={styles.doorMeta}>
                  <strong>{room.number} / ROOM</strong>
                  <span>ENTER ↗</span>
                </div>
                <h2>{room.title}</h2>
                <p>{room.description}</p>
                <div className={styles.doorBottom}>
                  <span className={styles.doorCount}>{room.count}</span>
                  <span className={styles.doorArrow} aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.closingNote}>
          <span className={styles.closingMark}>“</span>
          <p>Not a finished portrait.<br /><em>More like a room with the lights on.</em></p>
          <Link href="/ideas">Take a look around <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </section>
        <RoomFooter />
      </div>
    </main>
  );
}
