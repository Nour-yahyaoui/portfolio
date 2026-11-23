import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ArtGallery } from "@/components/ArtGallery";
import { historyPortraits, listeningTracks } from "@/lib/showroom-content";
import { RoomFrame, roomStyles as styles } from "@/components/RoomShell";

const thinkerGroups = [
  {
    label: "01 / PHILOSOPHY",
    title: <>How we live<br /><em>with one another.</em></>,
    thinkers: [
      { name: "Karl Marx", lens: "Labor, class, and the material conditions that shape society." },
      { name: "Friedrich Nietzsche", lens: "The origins of values—and what it means to question them." },
      { name: "Baruch Spinoza", lens: "Nature, necessity, and the causes behind human emotions." },
      { name: "Socrates", lens: "A life examined through persistent, careful questions." },
    ],
  },
  {
    label: "02 / SCIENCE",
    title: <>How the universe<br /><em>holds together.</em></>,
    thinkers: [
      { name: "Albert Einstein", lens: "Space, time, gravity, and the power of a thought experiment." },
      { name: "Nikola Tesla", lens: "Electrical systems and the practical imagination of invention." },
      { name: "Max Planck", lens: "The quantum idea that energy comes in discrete amounts." },
    ],
  },
];

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
        <RoomIntro number="02" name="History" title={<>People, power,<br /><em>and the long memory.</em></>} description="A collection of historical figures I read about and respect. Across the portraits are steppe empires, Persian and Ottoman courts, and the people who moved between them—a personal index, not a complete timeline." />
        <aside className={styles.historyReadingNote}>
          <span>HOW TO READ THIS WALL</span>
          <p>The captions use a first-person retelling to bring each figure into view. They are explanatory writing—not historical quotations.</p>
          <Link href="/art">See the images in the archive <ArrowUpRight size={13} aria-hidden="true" /></Link>
        </aside>
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
            <div>
              <p>Portraits, miniatures, and painted fragments collected for their atmosphere as much as their subjects. A small cabinet of images—open one to see it closer.</p>
              <span className={styles.artColophon}>A PERSONAL ARCHIVE · HISTORICAL IMAGES</span>
            </div>
            <span className={styles.sectionLabel}>{historyPortraits.length} WORKS IN THE ARCHIVE</span>
          </div>
          <ArtGallery items={historyPortraits} />
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
        <div className={styles.roomSubheading}><h2>Seven minds, many entry points</h2><p>INTERESTS · STILL GROWING</p></div>
        <p className={styles.ideasLead}>This isn’t a list of doctrines I claim as my own. It’s a set of doorways: different ways to look at society, meaning, nature, and the physical universe.</p>
        <div className={styles.thinkerGrid}>
          {thinkerGroups.map((group) => (
            <section className={styles.thinkerPanel} key={group.label}>
              <p className={styles.sectionLabel}>{group.label}</p>
              <h2>{group.title}</h2>
              <div className={styles.thinkerList}>
                {group.thinkers.map((thinker, index) => (
                  <article className={styles.thinkerCard} key={thinker.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{thinker.name}</h3><p>{thinker.lens}</p></div>
                    <b aria-hidden="true">↗</b>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className={styles.ideaFootnote}>Small introductions, written as signposts—not quotations or a complete account of anyone’s work.</p>
      </div>
    </RoomFrame>
  );
}
