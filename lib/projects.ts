import type { Project } from "./types";

/**
 * The project index — single source of truth for the home page, the
 * /projects index, and the case-study pages at /projects/[slug].
 * Order matters: it is the numbering visitors see. Case-study prose
 * (stack tables, how-it-works) lives in lib/projectDetails.ts.
 */
export const projects: Project[] = [
  {
    slug: "actix-icons",
    title: "Actix Icons — Multi-Platform SVG Library",
    description:
      "A curated library of 2,144 distinct icons across 25 categories, generated from canonical SVGs into a dependency-free Rust crate, JavaScript packages, plain-HTML assets, and a searchable static gallery. Typed Rust access, selective JavaScript imports, accessibility-aware DOM rendering, and reproducible package checks keep one collection consistent across platforms.",
    featured: true,
    status: "Release candidate · not yet published",
    version: "1.0.0 RC",
    tags: ["Rust", "JavaScript", "TypeScript declarations", "SVG", "no_std", "Accessibility", "Code generation"],
    highlights: [
      "2,144 distinct icons · 25 categories · canonical SVG source",
      "Dependency-free Rust and JavaScript distributions",
      "Searchable gallery, selective imports, and package-consumer checks",
    ],
    mainTag: "Cross-platform UI tooling",
    code: "https://github.com/Nour-yahyaoui/actix-icons",
    note: "Library code: MIT · Curated Lucide/Feather artwork with retained ISC/MIT notices · Not affiliated with the Actix web framework",
    links: [
      { label: "Source code", href: "https://github.com/Nour-yahyaoui/actix-icons", variant: "primary" },
      { label: "Documentation", href: "https://github.com/Nour-yahyaoui/actix-icons#readme", variant: "secondary" },
      { label: "Architecture", href: "https://github.com/Nour-yahyaoui/actix-icons/blob/main/docs/ARCHITECTURE.md", variant: "quiet" },
    ],
  },
  {
    slug: "bidi-kit",
    title: "Bidi Kit — Arabic & Mixed-Direction Text Toolkit",
    description:
      "A zero-dependency TypeScript toolkit for Arabic inside English, French inside Arabic, and the punctuation and numbers between them. It finds directional runs, isolates mixed text with native HTML and Unicode mechanisms, provides Arabic-friendly font and CSS helpers, and audits invisible bidi controls — without replacing the browser's text engine.",
    featured: true,
    status: "Open-source library",
    version: "v0.1.0",
    tags: ["TypeScript", "Arabic", "RTL", "Unicode", "Zero dependencies", "CLI", "Open Source"],
    highlights: [
      "Mixed-direction paragraphs with isolated runs and escaped text",
      "ESM, CommonJS, and a single-file browser script",
      "Bidi-control auditing and stripping, plus a four-command CLI",
    ],
    mainTag: "Internationalization tooling",
    code: "https://github.com/the-golden-army/ui-storm/tree/main/packages/bidi-kit",
    note: "Built by me under the-golden-army · MIT licensed",
    links: [
      { label: "Source code", href: "https://github.com/the-golden-army/ui-storm/tree/main/packages/bidi-kit", variant: "primary" },
      { label: "Documentation", href: "https://github.com/the-golden-army/ui-storm/blob/main/packages/bidi-kit/README.md", variant: "secondary" },
    ],
  },
  {
    slug: "rusturbo",
    title: "Rusturbo — Rust Compilation Accelerator",
    description:
      "A Rust CLI that reduces repeated dependency compilation across projects using fingerprinted artifact caches, shared Cargo target directories, and fast-linker selection. It analyzes dependency graphs, applies an Actix Web preset without editing Cargo.toml, and benchmarks real cold, warm, and shared-cache builds instead of promising a universal speedup.",
    featured: true,
    status: "Open-source CLI",
    version: "v0.1.2",
    tags: ["Rust", "Cargo", "Build tooling", "SHA-256", "Artifact caching", "Actix Web", "CLI"],
    highlights: [
      "Cross-project dependency reuse keyed by toolchain, graph, and build inputs",
      "Shared target directories or portable hard-link/copy cache entries",
      "Five benchmark scenarios with JSON and Markdown reports",
    ],
    mainTag: "Rust developer tools",
    code: "https://github.com/the-golden-army/Rusturbo",
    note: "Built by me under the-golden-army · MIT licensed",
    links: [
      { label: "Source code", href: "https://github.com/the-golden-army/Rusturbo", variant: "primary" },
      { label: "Documentation", href: "https://github.com/the-golden-army/Rusturbo#readme", variant: "secondary" },
      { label: "Design notes", href: "https://github.com/the-golden-army/Rusturbo/blob/main/docs/DESIGN.md", variant: "quiet" },
    ],
  },
  {
    slug: "anar-ide",
    screenshot: { src: "/projects/anar-ide.png", alt: "Anar desktop editor showing Rust code, build controls, and an integrated PowerShell terminal.", width: 1902, height: 960, caption: "Anar · Rust editing workspace and integrated terminal" },
    title: "Anar IDE — Desktop Editor for Rust",
    description:
      "An open-source desktop editor built specifically for Rust, with a Tauri 2 shell, React interface, and CodeMirror 6 editing surface. Scoped workspace access, atomic saves, multi-file tabs, and external-change conflict handling form the v0.1.0 foundation. The repository also documents unreleased rust-analyzer intelligence, streaming Cargo tasks, and Rusturbo build integration.",
    featured: true,
    status: "Early-stage desktop editor",
    version: "v0.1.0",
    tags: ["Rust", "Tauri 2", "React", "TypeScript", "CodeMirror 6", "rust-analyzer", "Rusturbo"],
    highlights: [
      "Workspace-scoped file operations and atomic saves",
      "Multi-file editor with external-change conflict handling",
      "Rust-first core split across five standalone domain crates",
    ],
    mainTag: "Rust developer tools",
    code: "https://github.com/the-golden-army/Anar-IDE",
    note: "Built by me under the-golden-army · MIT licensed",
    links: [
      { label: "Source code", href: "https://github.com/the-golden-army/Anar-IDE", variant: "primary" },
      { label: "Documentation", href: "https://github.com/the-golden-army/Anar-IDE#readme", variant: "secondary" },
      { label: "Changelog", href: "https://github.com/the-golden-army/Anar-IDE/blob/main/CHANGELOG.md", variant: "quiet" },
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
    slug: "agencyos",
    screenshot: { src: "/projects/agencyos.png", alt: "AgencyOS operations dashboard with project metrics, revenue chart, and task status.", width: 1884, height: 871, caption: "AgencyOS · Operations dashboard" },
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
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
