import Link from "next/link";
import { RoomFooter, RoomHeader, roomStyles as styles } from "@/components/RoomShell";
import { historyPortraits, listeningTracks } from "@/lib/showroom-content";
import { projects } from "@/lib/projects";

const rooms = [
  {
    number: "01",
    title: "The Workshop",
    href: "/work",
    count: `${projects.length} PROJECTS`,
    description: "Things I have built, and the choices behind them.",
  },
  {
    number: "02",
    title: "History",
    href: "/history",
    count: `${historyPortraits.length} FIGURES`,
    description: "People and eras I read about and respect.",
  },
  {
    number: "03",
    title: "Art & Archive",
    href: "/art",
    count: `${historyPortraits.length} IMAGES`,
    description: "A paper-and-ink gallery of the historical images I collected.",
  },
  {
    number: "04",
    title: "Listening Room",
    href: "/listening",
    count: `${listeningTracks.length} TRACKS`,
    description: "Songs I love. Names and artists, no audio files.",
  },
  {
    number: "05",
    title: "Ideas",
    href: "/ideas",
    count: "PHILOSOPHY · SCIENCE",
    description: "A short shelf of thinkers and scientific minds I’m interested in.",
  },
];

export default function Showroom() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <RoomHeader />
        <section className={styles.lobbyHero}>
          <div>
            <p className={styles.eyebrow}>A personal archive · Sfax, Tunisia</p>
            <h1>Many rooms.<br /><em>One curious mind.</em></h1>
            <p className={styles.heroIntro}>
              Choose a room. The overview stays light; the deeper pages wait behind each door.
            </p>
          </div>
          <div className={styles.lobbyArt} aria-hidden="true">
            <div className={styles.heroDisc} />
            <span className={styles.heroSeal}>NY<br />FIELD NOTES<br />2026</span>
            <p className={styles.heroCaption}>A collection of work,<br />histories, sounds, and ideas.</p>
          </div>
        </section>

        <section className={styles.roomMap} aria-labelledby="room-map-title">
          <div className={styles.mapHeading}>
            <p id="room-map-title">Choose where to begin</p>
            <span>Five rooms · one personal collection</span>
          </div>
          <div className={styles.doorGrid}>
            {rooms.map((room) => (
              <Link className={styles.door} href={room.href} key={room.href}>
                <div className={styles.doorMeta}>
                  <strong>{room.number} / ROOM</strong>
                  <span>OPEN ↗</span>
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
        <RoomFooter />
      </div>
    </main>
  );
}
