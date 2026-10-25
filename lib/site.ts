// Central place for site-wide SEO constants.
// IMPORTANT: update SITE_URL to your real production domain before deploying,
// and set it as the NEXT_PUBLIC_SITE_URL env var on Vercel.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://nour-yahyaoui.vercel.app";

export const SITE_NAME = "Nour Yahyaoui | Full-Stack Developer";
export const AUTHOR_NAME = "Nour Yahyaoui";
export const AUTHOR_EMAIL = "nourryahyaoui@gmail.com";
export const TWITTER_HANDLE = ""; // add if/when a Twitter/X handle exists

// Public profile URLs — single source of truth for the header, footer,
// contact page and JSON-LD, so they can never drift apart again.
export const GITHUB_URL = "https://github.com/Nour-yahyaoui";
export const LINKEDIN_URL = "https://www.linkedin.com/in/nour-yahyaoui-86987b36b";
export const LINKEDIN_HANDLE = "nour-yahyaoui";
export const INSTAGRAM_URL = "https://instagram.com/nourr_yahyaouiii";
export const INSTAGRAM_HANDLE = "@nourr_yahyaouiii";
export const GITHUB_HANDLE = "github.com/Nour-yahyaoui";

export const DEFAULT_DESCRIPTION =
  "Nour Yahyaoui is a full-stack developer from Tunisia building secure web products, local AI tools, and VexOS, a Debian-based Linux distribution for developers.";

export const DEFAULT_KEYWORDS = [
  "Nour Yahyaoui",
  "Nour Yahyaoui developer",
  "full-stack developer Tunisia",
  "React developer Tunisia",
  "Next.js developer",
  "Node.js developer",
  "PostgreSQL developer",
  "freelance developer Tunisia",
  "React Native developer",
  "web developer Tunisia",
  "software engineer Tunisia",
  "Rust developer",
  "local AI coding agent",
  "Ollama developer",
  "FastAPI developer",
  "Linux distribution development",
  "Debian-based Linux distro",
  "VexOS Linux",
  "Debian live-build",
  "developer tooling",
];

// Person structured data (JSON-LD) reused across pages.
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    alternateName: "nour-yahyaoui",
    url: SITE_URL,
    image: `${SITE_URL}/nour-portrait.jpg`,
    email: `mailto:${AUTHOR_EMAIL}`,
    jobTitle: "Full-Stack Developer",
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
      addressLocality: "Tunisia",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "React Native",
      "Rust",
      "Full-Stack Development",
      "FastAPI",
      "Ollama",
      "Local AI Agents",
      "Linux Distribution Engineering",
      "Debian live-build",
      "Developer Tooling",
    ],
    sameAs: [GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
  };
}
