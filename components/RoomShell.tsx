import Link from "next/link";
import type { ReactNode } from "react";
import { Github, Mail } from "lucide-react";
import { AUTHOR_EMAIL, GITHUB_URL } from "@/lib/site";
import styles from "./RoomSystem.module.css";

const roomNav = [
  { number: "01", label: "Work", href: "/work" },
  { number: "02", label: "History", href: "/history" },
  { number: "03", label: "Art", href: "/art" },
  { number: "04", label: "Sound", href: "/listening" },
  { number: "05", label: "Ideas", href: "/ideas" },
];

export function RoomHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Nour Yahyaoui — all rooms">
        <span className={styles.brandMark}>N</span>
        <span className={styles.brandName}>Nour Yahyaoui<small>PERSONAL SHOWROOM</small></span>
      </Link>
      <nav className={styles.nav} aria-label="Rooms">
        {roomNav.map((room) => (
          <Link key={room.href} href={room.href}><span>{room.number}</span>{room.label}</Link>
        ))}
      </nav>
      <a className={styles.headerMail} href={`mailto:${AUTHOR_EMAIL}`}>Contact</a>
    </header>
  );
}

export function RoomFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <p className={styles.footerLine}>A personal archive,<br />still becoming.</p>
        <div className={styles.footerLinks}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={13} aria-hidden="true" /> GitHub ↗</a>
          <a href={`mailto:${AUTHOR_EMAIL}`}><Mail size={13} aria-hidden="true" /> Email ↗</a>
          <Link href="/">All rooms ↑</Link>
        </div>
      </div>
      <div className={styles.footerMeta}>
        <span>© {new Date().getFullYear()} NOUR YAHYAOUI</span>
        <span>SFAX, TUNISIA</span>
        <span>MADE OF WORK, QUESTIONS & CURIOSITY</span>
      </div>
    </footer>
  );
}

export function RoomFrame({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <RoomHeader />
        {children}
        <RoomFooter />
      </div>
    </main>
  );
}

export { styles as roomStyles };
