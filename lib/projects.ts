import type { Project } from "./types";

/**
 * The project index — single source of truth for the home page, the
 * /projects index, and the case-study pages at /projects/[slug].
 * Order matters: it is the numbering visitors see. Case-study prose
 * (stack tables, how-it-works) lives in lib/projectDetails.ts.
 */
export const projects: Project[] = [
  {
    slug: "vexos",
    title: "VexOS Linux Distribution",
    description:
      "A Debian trixie-based Linux distribution built for web and software development. Boot the live ISO into XFCE with Firefox ESR, Python, Node.js with npm, Rust with cargo, gcc, git, and VexOS DevStudio — a browser-based IDE with a Run button, live preview, and an AI assistant powered by your own Groq key. The live session runs in RAM and resets on reboot.",
    featured: true,
    status: "Release candidate",
    version: "v2.2.1",
    tags: ["Debian trixie", "Linux distribution", "live-build", "XFCE", "Rust", "Python", "Node.js", "DevStudio"],
    highlights: [
      "Bootable developer Linux distribution",
      "Clean RAM-only live session",
      "DevStudio with live preview + AI",
    ],
    mainTag: "Linux distribution",
    liveDemo: "https://vexos-omega.vercel.app",
    code: "https://github.com/Nour-yahyaoui/vexos",
    links: [
      { label: "Website", href: "https://vexos-omega.vercel.app", variant: "primary" },
      { label: "Source code", href: "https://github.com/Nour-yahyaoui/vexos", variant: "secondary" },
      { label: "Documentation", href: "https://vexos-omega.vercel.app/docs/", variant: "quiet" },
      { label: "Releases", href: "https://github.com/Nour-yahyaoui/vexos/releases", variant: "quiet" },
    ],
  },
  {
    slug: "nour-code",
    title: "nour-code",
    description:
      "A local-first AI coding agent that serves Qwen3 8B through Ollama and FastAPI. It gives the model controlled access to real files, a shell, and hot-reloadable Python skills while keeping sensitive work on your machine. Production-Ready Mode hardens touched files and returns a readiness checklist; SSE streaming, restart-safe sessions, rotating logs, optional Prometheus metrics, and 345 offline tests make it a service rather than a one-off script.",
    featured: true,
    status: "Local-first AI agent",
    version: "v1.4.0",
    tags: ["Python 3.11+", "FastAPI", "Qwen3 8B", "Ollama", "SSE", "Docker", "pytest"],
    highlights: [
      "Path + symlink checks, shell allow/deny, JSONL audit",
      "Hot-reloadable security + production skills",
      "345 offline tests · SSE · restart-safe sessions",
    ],
    mainTag: "AI coding agent",
    liveDemo: "https://nour-code-agent.vercel.app",
    code: "https://github.com/Nour-yahyaoui/nour-code",
    links: [
      { label: "Website", href: "https://nour-code-agent.vercel.app", variant: "primary" },
      { label: "Source code", href: "https://github.com/Nour-yahyaoui/nour-code", variant: "secondary" },
      { label: "Documentation", href: "https://github.com/Nour-yahyaoui/nour-code#readme", variant: "quiet" },
    ],
  },
  {
    slug: "oneclick",
    title: "OneClick — Point of Sale for Phone Shops",
    description:
      "A local-first till and shop-management system for phone and accessories shops, written in Rust. One binary, works fully offline, in French, Arabic (RTL), and English. Its defining idea: inventory that fills itself — scan an unknown barcode at the counter, answer two questions, and the sale goes through while the product sheet creates itself.",
    featured: true,
    status: "Usable for a full trading day",
    version: "v1.0.10",
    tags: ["Rust", "axum", "SQLite", "maud", "Tokio", "Offline-first", "POS", "FR / AR / EN"],
    highlights: [
      "Sell what was never entered — unknown barcode → two fields → sold",
      "Money as integer millimes, never floats; Argon2id owner auth",
      "Cash sessions, Z report, debts carnet, full audit journal",
    ],
    mainTag: "Rust desktop systems",
    code: "https://github.com/Nour-yahyaoui/onclick",
    links: [
      { label: "Source code", href: "https://github.com/Nour-yahyaoui/onclick", variant: "primary" },
      { label: "Releases", href: "https://github.com/Nour-yahyaoui/onclick/releases", variant: "quiet" },
    ],
  },
  {
    slug: "rustpad",
    title: "RustPad — Native Word & PDF Desktop Studio",
    description:
      "A standalone, offline-first desktop studio for Microsoft Word (.docx) and vector PDF (.pdf) documents, written in 100% pure Rust. It creates, edits, signs, redacts, and converts documents in a single 3.3 MB binary — no WebView, no HTML/CSS/JavaScript, no runtime to install.",
    status: "Release v1.2.0",
    version: "v1.2.0",
    tags: ["Rust", "Desktop app", "OpenXML", "PDF 1.7", "Pure Rust", "Offline-first"],
    mainTag: "Rust desktop systems",
    liveDemo: "https://rustpad-studio.vercel.app",
    code: "https://github.com/Nour-yahyaoui/rustpad",
    links: [
      { label: "Live landing page", href: "https://rustpad-studio.vercel.app", variant: "primary" },
      { label: "Source code", href: "https://github.com/Nour-yahyaoui/rustpad", variant: "secondary" },
      { label: "Releases", href: "https://github.com/Nour-yahyaoui/rustpad/releases", variant: "quiet" },
    ],
  },
  {
    slug: "campus",
    title: "Campus — University Community Platform",
    description:
      "A free, open-source university community platform: clubs with real mini-sites, student projects with a review workflow, events with capacity-safe registration and check-in, and an operations console that reports what it can actually measure — including what it cannot.",
    tags: ["Next.js 16", "TypeScript", "Rust · Actix Web", "PostgreSQL", "OpenAPI", "Open Source"],
    mainTag: "Full Stack",
    liveDemo: "https://campus-spheree.vercel.app",
    code: "https://github.com/Nour-yahyaoui/Campus",
    note: "Pinned on GitHub — clubs, projects, and events for student communities",
  },
  {
    slug: "matjari",
    title: "Matjari — Store Management & POS",
    description:
      "One workspace for a shop's daily work: products and stock, point of sale, orders, customer debts, employees, and financial reports — on the web and in a React Native app, with role- and plan-based access for owners and employees.",
    tags: ["Vite", "React", "React Native", "Expo", "POS", "Inventory", "Multi-store", "Arabic RTL"],
    mainTag: "Commerce platform",
    liveDemo: "https://matjari-dashboard.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/matjari-web",
    note: "Commerce operations for small shops, across web and mobile",
  },
  {
    slug: "nextgen",
    title: "Nextgen — Full-Stack E-commerce Platform",
    description:
      "A complete e-commerce platform: storefront with variants, wishlist, cart, and cash-on-delivery checkout, plus an admin dashboard covering products, offers, orders, messages, and low-stock alerts. Orders and stock updates commit atomically; products are archived, never deleted.",
    tags: ["Next.js", "TypeScript", "PostgreSQL · Neon", "Zustand", "E-commerce", "Admin dashboard"],
    mainTag: "Full Stack",
    liveDemo: "https://v4-nextgen.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/nextgen",
    note: "Storefront, inventory, and order operations in one platform",
  },
  {
    slug: "aswem",
    title: "Aswem — Community Prices for Tunisia",
    description:
      "Free, open-source community prices for Tunisia. People report what they actually pay for everyday products in each governorate, and Aswem shows the median, the low, and recent reports — in Tunisian Darija and French.",
    tags: ["Next.js", "Rust · Actix Web", "SQLx", "Neon Postgres", "Open Source", "Tunisia"],
    mainTag: "Full Stack",
    liveDemo: "https://aswem.vercel.app",
    code: "https://github.com/Nour-yahyaoui/aswem",
    note: "Crowd-reported prices, guarded against outliers and abuse",
  },
  {
    slug: "env-sentry",
    title: "env-sentry — .env Drift & Secrets Scanner",
    description:
      "A zero-dependency Python CLI that catches .env drift, leaked secrets, and missing .gitignore entries before you commit them. Four commands — init, check, sync, scan — with non-zero exit codes for CI and pre-commit hooks.",
    tags: ["Python", "CLI", "Security", "DevSecOps", "PyPI", "Open Source"],
    mainTag: "Open Source",
    liveDemo: "https://env-sentry.vercel.app",
    code: "https://github.com/Nour-yahyaoui/env-sentry",
    note: "The five-second daily check: did I mess up my .env today?",
  },
  {
    slug: "grafspee",
    title: "Grafspee — React/Next.js Component Library",
    description:
      "60+ production-ready React/Next.js components with TypeScript — buttons, cards, dialogs, forms, navigation, and more. The documentation site pairs every component with a live example and copy-ready code.",
    tags: ["Next.js", "TypeScript", "Radix UI", "Tailwind CSS", "Component Library", "Open Source"],
    mainTag: "Open Source",
    liveDemo: "https://grafspee.vercel.app",
    code: "https://github.com/Nour-yahyaoui/grafspee",
    note: "Reusable UI building blocks for Next.js projects",
  },
  {
    slug: "claude-prompt",
    title: "claude-prompt — Brief Builder for AI Coding Agents",
    description:
      "Answer a few sharp, skippable questions about what you're building and get back a clean, complete prompt ready to hand to an AI coding agent — downloadable as Markdown. Nothing is stored server-side.",
    tags: ["Next.js", "TypeScript", "Groq", "Mobile-first", "AI Tooling"],
    mainTag: "AI Tooling",
    liveDemo: "https://claude-prompt-md.vercel.app",
    code: "https://github.com/Nour-yahyaoui/Claude-prompt",
    note: "No more guessing what context an AI agent actually needs",
  },
  {
    slug: "bacplus",
    title: "bacplus — Learning Platform for the Tunisian Bac",
    description:
      "A social learning platform for Tunisian Baccalaureate students: Q&A, interactive courses, a code playground, project tracking, gamification, real-time notifications, and content moderation.",
    tags: ["Next.js", "TypeScript", "Neon PostgreSQL", "Vercel KV", "Education", "Gamification"],
    mainTag: "Full Stack",
    liveDemo: "https://bac-plus.vercel.app/",
    code: "https://github.com/alphaa-pixel/bacplus-web",
    note: "A collaborative learning platform, built with a partner",
  },
  {
    slug: "devdash",
    title: "DevDash — Developer Dashboard & Courses",
    description:
      "A developer's home base: structured courses (HTML, CSS, JavaScript, TypeScript, Tailwind), a code playground, ready-to-use UI components and icons, and a library of AI prompts — in one searchable dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Courses"],
    mainTag: "Next.js",
    liveDemo: "https://devdash-ten.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/devdash-online-tools",
  },
  {
    slug: "c-editor",
    title: "C-Road Editor — Single-Binary C Editor",
    description:
      "A C editor that runs in your browser from a single Rust binary. No Python, no Node, no runtime to install — download one file, run it, and write C against your local gcc.",
    tags: ["Rust", "Single binary", "gcc", "Developer Tools", "Cross-platform"],
    mainTag: "Rust Tooling",
    liveDemo: "https://c-editor-landing.vercel.app",
    code: "https://github.com/Nour-yahyaoui/c-editor",
  },
  {
    slug: "buttoncraft",
    title: "ButtonCraft — Button Component Gallery",
    description:
      "Where it started, grown up: my first public project (a vanilla-JS button gallery, 2024) rebuilt as a component library of ready-to-use buttons with HTML, CSS, and Tailwind implementations you can copy into any project.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "UI Components"],
    mainTag: "Next.js",
    liveDemo: "https://button-gen.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/buttons",
  },
  {
    slug: "ghassen-studio",
    title: "Ghassen Studio — Designer Portfolio",
    description:
      "A portfolio built for a designer client: a quiet visual system and smooth, restrained interactions that keep the spotlight on the work itself. Client project — source is private.",
    tags: ["Vite", "React", "Portfolio", "Client Work"],
    mainTag: "Client Work",
    liveDemo: "https://ghassen-studio.vercel.app/",
    note: "A designer portfolio — built for a client",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
