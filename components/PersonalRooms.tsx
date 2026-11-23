import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { historyPortraits, listeningTracks } from "@/lib/showroom-content";
import { RoomFrame, roomStyles as styles } from "@/components/RoomShell";

function RoomIntro({ number, name, title, description }: { number: string; name: string; title: ReactNode; description: string }) {
  return (
    <header className={styles.roomHero}>
      <p className={styles.roomIndex}>{number} / 05 · {name}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function HistoryRoom() {
  return (
    <RoomFrame>
      <div className={styles.roomMain}>
        <Link className={styles.roomBack} href="/"><ArrowLeft size={13} aria-hidden="true" /> All rooms</Link>
        <RoomIntro number="02" name="History" title={<>People, power,<br /><em>and the long memory.</em></>} description="A collection of historical figures I read about and respect. The notes are deliberately brief; the art gallery has its own room." />
        <div className={styles.roomSubheading}><h2>The people</h2><p>{historyPortraits.length} IMAGES · SHORT NOTES</p></div>
        <div className={styles.historyGrid}>
          {historyPortraits.map((person, index) => (
            <article className={styles.historyCard} key={`${person.name}-${person.image}`}>
              <div className={styles.historyImageFrame}>
                <Image src={person.image} alt={person.alt} fill sizes="(max-width: 640px) 46vw, (max-width: 920px) 30vw, 24vw" className={styles.historyImage} style={{ objectPosition: person.imagePosition ?? "center" }} />
                <span className={styles.imageNo}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.historyCaption}>
                <h3>{person.name}</h3>
                <small>{person.era}</small>
                <p>{person.caption}</p>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.sectionLabel} style={{ marginTop: 24 }}>Short first-person retellings, not authentic quotations.</p>
      </div>
    </RoomFrame>
  );
}

export function ArtRoom() {
  return (
    <RoomFrame>
      <div className={styles.paperRoom}>
        <div className={styles.roomMain}>
          <Link className={styles.roomBack} href="/"><ArrowLeft size={13} aria-hidden="true" /> All rooms</Link>
          <RoomIntro number="03" name="Art & Archive" title={<>Paper, pigment,<br /><em>and remembered faces.</em></>} description="An antique, textured gallery built around the historical images I collected in Drive. The portraits and miniatures stay separate from the project room." />
          <div className={styles.artMasthead}>
            <p>Scanned fragments, portraits, miniatures. A personal collection arranged like a small cabinet of images.</p>
            <span className={styles.sectionLabel}>{historyPortraits.length} WORKS IN THE ARCHIVE</span>
          </div>
          <div className={styles.historyGrid}>
            {historyPortraits.map((artwork, index) => (
              <figure className={styles.historyCard} key={`art-${artwork.image}`}>
                <div className={styles.historyImageFrame}>
                  <Image src={artwork.image} alt={artwork.alt} fill sizes="(max-width: 640px) 46vw, (max-width: 920px) 30vw, 24vw" className={styles.historyImage} style={{ objectPosition: artwork.imagePosition ?? "center" }} />
                  <span className={styles.imageNo}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <figcaption className={styles.historyCaption}>
                  <h3>{artwork.name}</h3>
                  <small>{artwork.era}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </RoomFrame>
  );
}

export function ListeningRoom() {
  return (
    <RoomFrame>
      <div className={styles.roomMain}>
        <Link className={styles.roomBack} href="/"><ArrowLeft size={13} aria-hidden="true" /> All rooms</Link>
        <RoomIntro number="04" name="Listening Room" title={<>Songs I love.<br /><em>No bigger thesis.</em></>} description="A short list transcribed from the screenshots I shared. These are favorites, without an explanation forced onto them. No MP3s or embedded playback." />
        <div className={styles.roomSubheading}><h2>The listening shelf</h2><p>{listeningTracks.length} TRACKS · SEARCH TO LISTEN</p></div>
        <div className={styles.musicPanel}>
          <div className={styles.musicCover} aria-hidden="true">
            <div className={styles.musicCoverDisc} />
            <span className={styles.musicCoverText}>A small<br />soundtrack.</span>
          </div>
          <ol className={styles.trackList}>
            {listeningTracks.map((track, index) => (
              <li className={styles.track} key={track.title}>
                <span className={styles.trackNo}>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{track.title}</h3><p>{track.artist}</p></div>
                <span className={`${styles.trackNo} ${styles.trackMeta}`}>FAVORITE</span>
                <a className={styles.trackLink} href={`https://music.youtube.com/search?q=${encodeURIComponent(`${track.title} ${track.artist}`)}`} target="_blank" rel="noreferrer" aria-label={`Search YouTube Music for ${track.title} by ${track.artist}`}>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
        <p className={styles.sectionLabel} style={{ marginTop: 18 }}>Search links open YouTube Music; this page does not host or play audio.</p>
      </div>
    </RoomFrame>
  );
}

export function IdeasRoom() {
  return (
    <RoomFrame>
      <div className={styles.roomMain}>
        <Link className={styles.roomBack} href="/"><ArrowLeft size={13} aria-hidden="true" /> All rooms</Link>
        <RoomIntro number="05" name="Ideas" title={<>Philosophy, science,<br /><em>and a wider world.</em></>} description="I’m interested in philosophy and science. For now, this is simply a shelf of the thinkers and minds I’m drawn to—not a list of beliefs I haven’t told you." />
        <div className={styles.roomSubheading}><h2>A few names I return to</h2><p>INTERESTS · STILL GROWING</p></div>
        <div className={styles.thoughtGrid}>
          <article className={styles.thoughtCard}>
            <p className={styles.sectionLabel}>01 / PHILOSOPHY</p>
            <h2>Ways of thinking<br /><em>about people and life.</em></h2>
            <ul className={styles.nameList}>
              <li>Karl Marx</li><li>Friedrich Nietzsche</li><li>Baruch Spinoza</li><li>Socrates</li>
            </ul>
          </article>
          <article className={styles.thoughtCard}>
            <p className={styles.sectionLabel}>02 / SCIENCE</p>
            <h2>Questions about<br /><em>the physical world.</em></h2>
            <ul className={styles.nameList}>
              <li>Albert Einstein</li><li>Nikola Tesla</li><li>Max Planck</li>
            </ul>
          </article>
        </div>
        <p className={styles.sectionLabel} style={{ marginTop: 20 }}>More names can join when you tell me what else matters to you.</p>
      </div>
    </RoomFrame>
  );
}
