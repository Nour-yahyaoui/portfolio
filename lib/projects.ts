import type { Project } from "./types";

/**
 * The project index — single source of truth for the /work room and its
 * case files at /work/[slug]. Order matters: it is the numbering visitors
 * see. Case-study prose lives in lib/projectDetails.ts.
 */
export const projects: Project[] = [
  {
    slug: "anar-ide",
    title: "Anar-IDE",
    description: "An open-source desktop editor built for Rust, powered by Tauri 2, React, CodeMirror 6, rust-analyzer, and RustTurbo.",
    status: "v0.1.0 · Phase 3",
    tags: ["Rust", "Tauri 2", "React", "CodeMirror 6", "rust-analyzer", "RustTurbo"],
    mainTag: "Desktop developer tool",
    code: "https://github.com/the-golden-army/Anar-IDE",
  },
  {
    slug: "rusturbo",
    title: "RustTurbo",
    description: "An npm-installable Rust build accelerator that analyses dependency graphs, reuses build artifacts, schedules work against hardware, and measures the result.",
    status: "v0.1.0 · Working MVP",
    tags: ["Rust", "Cargo", "Node.js package", "Build cache", "Benchmarking"],
    mainTag: "Build systems",
    code: "https://github.com/the-golden-army/Rusturbo",
    links: [
      { label: "Source code", href: "https://github.com/the-golden-army/Rusturbo", variant: "primary" },
      { label: "npm package", href: "https://www.npmjs.com/package/rusturbo", variant: "secondary" },
    ],
  },
  {
    slug: "bidi-kit",
    title: "bidi-kit",
    description: "A zero-dependency JavaScript and TypeScript toolkit that keeps Arabic, English, French, punctuation, numbers, and bidirectional text behaving in mixed-direction interfaces.",
    status: "npm v0.1.1",
    tags: ["TypeScript", "Node.js package", "Arabic · RTL", "Accessibility", "Zero dependencies"],
    mainTag: "Text & internationalisation",
    code: "https://github.com/Nour-yahyaoui/ui-storm",
    links: [
      { label: "npm package", href: "https://www.npmjs.com/package/bidi-kit", variant: "primary" },
      { label: "Source repository", href: "https://github.com/Nour-yahyaoui/ui-storm", variant: "secondary" },
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
    slug: "rustpad",
    title: "RustPad — Native Word & PDF Desktop Studio",
    description:
      "An offline-first desktop studio for Microsoft Word (.docx) and PDF (.pdf) documents, written in 100% pure Rust. It reviews Track Changes clause by clause, forensically sanitizes redactions, seals PDFs with SHA-256, and runs in a single ~3.9 MB binary — no WebView, no HTML/CSS/JavaScript, no runtime to install.",
    featured: true,
    status: "Single-binary desktop app",
    version: "v2.1.0",
    tags: ["Rust", "Desktop app", "OpenXML", "PDF/A-2b", "Pure Rust", "Offline-first"],
    highlights: [
      "Word and PDF in one ~3.9 MB binary",
      "Legal redlines and forensic PDF redaction",
      "Zero crates.io runtime deps, CycloneDX SBOM",
    ],
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
    slug: "oneclick",
    title: "OneClick — Point of Sale for Phone Shops",
    description:
      "A local-first till and shop-management system for phone and accessories shops, written in Rust. One binary, works fully offline, in French, Arabic (RTL), and English. Its defining idea: inventory that fills itself — scan an unknown barcode at the counter, answer two questions, and the sale goes through while the product sheet creates itself.",
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
    slug: "agencyos",
    title: "AgencyOS — Operations Platform for Digital Agencies",
    description:
      "A multi-tenant platform for the business and the delivery of agency work: clients and milestones, Kanban tasks with real dependency rules, a client portal scoped to each client's own work, support tickets, documents, invoicing through Stripe, deadline notifications, analytics computed from database rows, and an assistant that returns 503 instead of inventing an answer when no provider is configured. Next.js 15 and NestJS 11 over PostgreSQL 17 with Prisma, verified by 11 unit, 15 integration and 4 end-to-end tests.",
    status: "23 routes · 66 API paths",
    version: "Apache-2.0",
    tags: [
      "Next.js 15",
      "React 19",
      "NestJS 11",
      "PostgreSQL 17",
      "Prisma 6",
      "Stripe",
      "Playwright",
      "OpenAPI",
    ],
    highlights: [
      "Every query scoped server-side by organizationId and role — 5 roles, composite tenant foreign keys",
      "Refresh-token families with reuse revocation, CSRF double-submit, bcrypt, audit log",
      "11 unit + 15 integration + 4 Playwright tests; 66 paths / 85 operations exported to OpenAPI",
    ],
    mainTag: "Full Stack",
    liveDemo: "https://agencyos-web-beryl.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/agencyos",
    note: "Modular monolith: Next.js as a thin back-end-for-frontend, NestJS modules behind one /api/v1 rewrite, optional providers that report when they're unavailable",
    loginInstructions:
      "Seeded demo accounts share the password DemoPass123!: owner@agencyos.dev, manager@agencyos.dev, dev@agencyos.dev and client@agencyos.dev all belong to Northstar Studio (the client sees Acme Robotics only), admin@agencyos.dev is the platform super admin, and other@agencyos.dev belongs to a second organization — useful for checking tenant isolation.",
    links: [
      { label: "Live app", href: "https://agencyos-web-beryl.vercel.app/", variant: "primary" },
      { label: "API docs (Swagger)", href: "https://agencyos-api-kappa.vercel.app/api/docs", variant: "secondary" },
      { label: "Source code", href: "https://github.com/Nour-yahyaoui/agencyos", variant: "secondary" },
      {
        label: "Architecture notes",
        href: "https://github.com/Nour-yahyaoui/agencyos/blob/master/agencyos/docs/ARCHITECTURE.md",
        variant: "quiet",
      },
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
    slug: "buttoncraft",
    title: "ButtonCraft — Button Component Gallery",
    description:
      "Where it started, grown up: my first public project (a vanilla-JS button gallery, 2024) rebuilt as a component library of ready-to-use buttons with HTML, CSS, and Tailwind implementations you can copy into any project.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "UI Components"],
    mainTag: "Next.js",
    liveDemo: "https://button-gen.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/buttons",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
