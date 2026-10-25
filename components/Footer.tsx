import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AUTHOR_EMAIL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/site";

const socials = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Email", href: `mailto:${AUTHOR_EMAIL}` },
];

/** Colophon — like the last page of a printed document. */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="font-display text-xl tracking-[-0.01em] text-ink">
              Nour Yahyaoui<span className="text-accent">.</span>
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-6 text-mute">
              Full-stack developer in Tunisia. Secure web products, local AI
              tools, and a Linux distribution — built end to end.
            </p>
          </div>
          <nav aria-label="Social links">
            <ul className="flex flex-wrap gap-x-1 gap-y-1">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="inline-flex min-h-11 items-center gap-1 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-accent"
                  >
                    {label}
                    {label !== "Email" && <ArrowUpRight size={12} aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-linesoft pt-4 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nour Yahyaoui. Set in a serif, a system sans, and one mono.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">Ideas → reliable software</p>
        </div>
      </div>
    </footer>
  );
}
