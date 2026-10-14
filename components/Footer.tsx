import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/Nour-yahyaoui", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nourr-yahyaoui-86987b36b", icon: Linkedin },
  { label: "Email", href: "mailto:nourryahyaoui@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#080a0f]">
      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold tracking-tight text-white">Nour Yahyaoui<span className="text-sky-300">.</span></Link>
            <p className="mt-1.5 text-xs text-white/35">Full-stack developer · Tunisia</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-white/[0.08] px-3 text-xs text-white/50 transition hover:border-white/20 hover:text-white/85"
              >
                <Icon size={14} />
                {label}
                {label !== "Email" && <ArrowUpRight size={11} className="text-white/25" />}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nour Yahyaoui. Built with care.</p>
          <p className="font-mono uppercase tracking-[0.13em]">Ideas → reliable software</p>
        </div>
      </div>
    </footer>
  );
}
