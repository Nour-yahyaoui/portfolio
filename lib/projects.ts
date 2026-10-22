import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "VexOS Linux Distribution",
    description:
      "A Debian trixie-based Linux distribution built for web and software development. Boot the live ISO into XFCE with Firefox ESR, Python, Node.js with npm, Rust with cargo, gcc, git, and VexOS DevStudio — a browser-based IDE with a Run button, live preview, and an AI assistant powered by your own Groq key. The live session runs in RAM and resets on reboot.",
    artwork: "vexos",
    accent: "orange",
    featured: true,
    status: "Release candidate",
    version: "v2.2.1",
    tags: [
      "Debian trixie",
      "Linux distribution",
      "live-build",
      "XFCE",
      "Rust",
      "Python",
      "Node.js",
      "DevStudio",
    ],
    highlights: [
      "Bootable developer Linux distribution",
      "Clean RAM-only live session",
      "DevStudio with live preview + AI",
    ],
    mainTag: "Linux distribution",
    liveDemo: "https://vexos-omega.vercel.app",
    code: "https://github.com/Nour-yahyaoui/vexos",
    links: [
      {
        label: "Website",
        href: "https://vexos-omega.vercel.app",
        variant: "primary",
      },
      {
        label: "Source code",
        href: "https://github.com/Nour-yahyaoui/vexos",
        variant: "secondary",
      },
      {
        label: "Documentation",
        href: "https://vexos-omega.vercel.app/docs/",
        variant: "quiet",
      },
      {
        label: "Releases",
        href: "https://github.com/Nour-yahyaoui/vexos/releases",
        variant: "quiet",
      },
    ],
  },
  {
    title: "nour-code",
    description:
      "A local-first AI coding agent that serves Qwen3 8B through Ollama and FastAPI. It gives the model controlled access to real files, a shell, and hot-reloadable Python skills while keeping sensitive work on your machine. Production-Ready Mode hardens touched files and returns a readiness checklist; SSE streaming, restart-safe sessions, rotating logs, optional Prometheus metrics, and 345 offline tests make it a service rather than a one-off script.",
    artwork: "nour-code",
    accent: "blue",
    featured: true,
    status: "Local-first AI agent",
    version: "v1.4.0",
    tags: [
      "Python 3.11+",
      "FastAPI",
      "Qwen3 8B",
      "Ollama",
      "SSE",
      "Docker",
      "pytest",
    ],
    highlights: [
      "Path + symlink checks, shell allow/deny, JSONL audit",
      "Hot-reloadable security + production skills",
      "345 offline tests · SSE · restart-safe sessions",
    ],
    mainTag: "AI coding agent",
    code: "https://github.com/Nour-yahyaoui/nour-code",
    links: [
      {
        label: "Source code",
        href: "https://github.com/Nour-yahyaoui/nour-code",
        variant: "primary",
      },
      {
        label: "Documentation",
        href: "https://github.com/Nour-yahyaoui/nour-code#readme",
        variant: "quiet",
      },
    ],
  },
  {
    title: "Campus — University Community Platform",
    description:
      "A free, open-source university community platform: clubs with real mini-sites, student projects with a review workflow, events with capacity-safe registration and check-in, and an operations console that reports what it can actually measure — including what it cannot.",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Open Source",
      "Community",
      "Events",
    ],
    mainTag: "Full Stack",
    code: "https://github.com/Nour-yahyaoui/Campus",
    note: "Pinned on GitHub — clubs, projects, and events for student communities",
  },
  {
    title: "bacplus - Plateforme d'entraide pour le Bac Tunisien",
    description:
      "Complete social learning platform for Tunisian Baccalaureate students. Features include Q&A, interactive courses, a code playground, project tracking, gamification, real-time notifications, and content moderation. Built with Next.js, Neon PostgreSQL, and Vercel KV for caching.",
    artwork: "learning",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Neon DB",
      "Vercel KV",
      "Education",
      "Gamification",
      "Real-time",
    ],
    mainTag: "Full Stack",
    liveDemo: "https://bac-plus.vercel.app/",
    code: "https://github.com/alphaa-pixel/bacplus-web",
    note: "A collaborative learning platform for Tunisian students",
  },
  {
    title: "Matjari - Multi-Tenant E-commerce Platform",
    description:
      "A comprehensive multi-tenant commerce platform designed for small shops. Manage inventory, orders, payments, customers, analytics, product variants, invoices, and loyalty from a web dashboard and React Native app.",
    artwork: "commerce",
    tags: [
      "Next.js",
      "React Native",
      "Vite",
      "TypeScript",
      "PostgreSQL",
      "Serverless",
      "Multi-Tenant",
      "E-commerce",
      "Analytics",
    ],
    mainTag: "Multi-Tenant",
    liveDemo: "https://matjari-dashboard.vercel.app/",
    note: "Commerce operations for small shops, across web and mobile",
  },
  {
    title: "Nextgen - Full Stack E-commerce Platform",
    description:
      "Complete e-commerce platform with admin dashboard, product management, offers, wishlist, cart, and secure checkout. Includes product variants, image uploads, order management, low stock alerts, and a storefront backed by PostgreSQL and Neon DB.",
    artwork: "storefront",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Neon DB",
      "E-commerce",
      "Serverless",
      "Zustand",
      "Admin Dashboard",
    ],
    mainTag: "Full Stack",
    liveDemo: "https://v4-nextgen.vercel.app/",
    note: "Storefront, inventory, and order operations in one platform",
  },
  {
    title: "Grafspee - Next.js Component Library",
    description:
      "A modern, open-source component library with ready-to-use buttons, cards, modals, forms, and navigation. The documentation site pairs live examples with copy-ready code snippets.",
    artwork: "components",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Component Library",
      "Open Source",
      "Documentation",
      "UI Components",
    ],
    mainTag: "Open Source",
    code: "https://github.com/nour-yahyaoui/grafspee",
    note: "Reusable UI building blocks for Next.js projects",
  },
  {
    title: "env-sentry - .env Drift & Secrets Scanner",
    description:
      "An open-source Python library that catches .env drift and hardcoded secrets before they ship. It finds environment variables referenced in code but missing from .env files, and flags secrets in local development and CI workflows.",
    artwork: "security",
    tags: [
      "Python",
      "Security",
      "CLI Tool",
      "Open Source",
      "DevSecOps",
      "CI/CD",
      "Secrets Detection",
    ],
    mainTag: "Open Source",
    code: "https://github.com/nour-yahyaoui/env-sentry",
    note: "Catch secret leaks and .env drift before they ship",
  },
  {
    title: "DevDash - Developer Dashboard",
    description:
      "A developer dashboard with courses, a playground, UI components, and AI prompts — a toolkit for finding resources, testing code, and organizing development work.",
    artwork: "dashboard",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    mainTag: "Next.js",
    liveDemo: "https://devdash-ten.vercel.app/",
    code: "https://github.com/nour-yahyaoui/devdash-online-tools",
  },
  {
    title: "ButtonCraft - UI Component Library",
    description:
      "A collection of ready-to-use button components with HTML, CSS, and Tailwind implementations. Each piece is easy to adapt and drop into a project.",
    artwork: "buttons",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    mainTag: "Next.js",
    liveDemo: "https://button-gen.vercel.app/",
    code: "https://github.com/nour-yahyaoui/button-gen",
  },
  {
    title: "Ghassen Studio - Designer Portfolio",
    description:
      "A polished portfolio for a designer, with a quiet visual system and smooth interactions that let the work take center stage.",
    artwork: "studio",
    tags: ["Vite", "React", "Portfolio", "Modern UI"],
    mainTag: "Vite",
    liveDemo: "https://ghassen-studio.vercel.app/",
    note: "A designer portfolio",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
