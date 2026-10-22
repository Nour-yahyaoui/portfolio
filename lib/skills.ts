/**
 * Single source of truth for skills across the site:
 * - `skillGroups` powers the itemised spec tables (About + /skills inventory)
 * - `showcaseSkills` powers the horizontal skill marquee (/skills + home)
 *
 * Keep claims verifiable: every showcased skill links to the project that
 * proves it. Tiers describe how central a skill is to current work
 * (Core = daily driver, Strong = shipped in production, Toolkit = in rotation).
 */

export interface SkillGroup {
  name: string;
  description: string;
  technologies: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    description: "Responsive, interactive interfaces with modern frameworks",
    technologies: ["React 19", "Next.js", "Vite", "Tailwind CSS", "TypeScript", "Framer Motion", "React Native"],
  },
  {
    name: "Backend",
    description: "Scalable APIs and database architecture",
    technologies: ["Next.js Serverless", "Node.js", "Express", "Rust (Actix Web / Axum)", "Python", "PHP", "Neon DB", "PostgreSQL"],
  },
  {
    name: "AI & Agents",
    description: "Local inference, tool-using agents, and the guardrails around them",
    technologies: ["Ollama", "Qwen3 8B", "FastAPI", "SSE Streaming", "Prometheus", "pytest"],
  },
  {
    name: "Mobile",
    description: "Native and cross-platform mobile applications",
    technologies: ["React Native", "Expo", "Android (Java)", "iOS Swift", "Cross-Platform"],
  },
  {
    name: "Desktop & Systems",
    description: "Linux images and cross-platform desktop applications",
    technologies: ["Linux (Debian)", "live-build", "XFCE", "VexOS DevStudio", "Python (Tkinter/PyQt)", "Java (Swing/JavaFX)"],
  },
  {
    name: "State Management",
    description: "Efficient state for complex applications",
    technologies: ["Zustand", "Redux Toolkit", "React Context", "TanStack Query"],
  },
  {
    name: "Security & Architecture",
    description: "Secure, scalable, and maintainable system design",
    technologies: ["Rate Limiting", "XSS Prevention", "CSRF Protection", "SQL Injection Prevention", "JWT Auth", "RBAC", "Clean Architecture", "SOLID Principles"],
  },
  {
    name: "Design",
    description: "User-centered design, done with restraint",
    technologies: ["UI/UX Design", "Figma", "Responsive Design", "Accessibility", "Micro-interactions"],
  },
  {
    name: "DevOps & Tools",
    description: "Development and deployment workflows",
    technologies: ["Git/GitHub", "Docker", "Debian", "live-build", "Vercel", "CI/CD", "Postman", "VS Code"],
  },
];

export type SkillArea =
  | "Frontend"
  | "Backend & APIs"
  | "Rust & Systems"
  | "AI & Agents"
  | "Mobile & Desktop"
  | "Craft & DevOps";

export const skillAreas: { name: SkillArea; description: string }[] = [
  { name: "Frontend", description: "The visible layer — typed, responsive, accessible interfaces." },
  { name: "Backend & APIs", description: "Servers and databases that keep their promises under load." },
  { name: "Rust & Systems", description: "Down the stack: binaries, tills, APIs, and a whole Linux distribution." },
  { name: "AI & Agents", description: "Local models with real tools — and the guardrails around them." },
  { name: "Mobile & Desktop", description: "The same products, in pockets and on desktops." },
  { name: "Craft & DevOps", description: "The habits that ship: version control, containers, CI, design tools." },
];

export type SkillTier = "Core" | "Strong" | "Toolkit";

export interface ShowcaseSkill {
  id: string;
  name: string;
  area: SkillArea;
  tier: SkillTier;
  /** Icon key resolved in components/SkillMarquee.tsx ("mono:Ax" = text monogram). */
  icon: string;
  /** Brand-ish colour for the icon glyph (near-white brands fall back to ink for light surfaces). */
  color: string;
  /** One sentence: what Nour actually does with it. */
  blurb: string;
  /** The project that proves it. */
  proof: { label: string; href: string };
}

export const showcaseSkills: ShowcaseSkill[] = [
  // ————— Frontend —————
  { id: "react", name: "React", area: "Frontend", tier: "Core", icon: "react", color: "#61DAFB", blurb: "The UI layer of almost everything I ship — components with real states, not just happy paths.", proof: { label: "Grafspee component library", href: "/projects/grafspee" } },
  { id: "nextjs", name: "Next.js", area: "Frontend", tier: "Core", icon: "nextjs", color: "#FFFFFF", blurb: "App Router, Server Components and serverless APIs — my default for production web apps, including this site.", proof: { label: "Campus platform", href: "/projects/campus" } },
  { id: "typescript", name: "TypeScript", area: "Frontend", tier: "Core", icon: "typescript", color: "#5899E4", blurb: "Strict typing end to end — schemas shared between frontend, API and database contracts.", proof: { label: "Nextgen e-commerce (60+ typed files)", href: "/projects/nextgen" } },
  { id: "javascript", name: "JavaScript", area: "Frontend", tier: "Core", icon: "javascript", color: "#F7DF1E", blurb: "Where it started in 2024, still the language under the dashboards and most of what runs in the browser.", proof: { label: "Matjari dashboard", href: "/projects/matjari" } },
  { id: "tailwind", name: "Tailwind CSS", area: "Frontend", tier: "Core", icon: "tailwind", color: "#38BDF8", blurb: "Utility styling on top of design tokens — one visual language across every screen.", proof: { label: "This portfolio (Paper & Ink tokens)", href: "/projects" } },
  { id: "vite", name: "Vite", area: "Frontend", tier: "Strong", icon: "vite", color: "#A78BFA", blurb: "Fast SPAs and client sites where a full framework would be overhead.", proof: { label: "Matjari web & Ghassen Studio", href: "/projects/matjari" } },
  { id: "html5", name: "HTML5", area: "Frontend", tier: "Core", icon: "html5", color: "#FF6B3D", blurb: "Semantic first — real buttons, labels and landmarks are free accessibility.", proof: { label: "Every project in the index", href: "/projects" } },
  { id: "framer", name: "Framer Motion", area: "Frontend", tier: "Toolkit", icon: "framer", color: "#FF5CAA", blurb: "Motion that orients instead of decorating — short, purposeful, reduced-motion aware.", proof: { label: "DevDash", href: "/projects/devdash" } },
  { id: "radix", name: "Radix UI", area: "Frontend", tier: "Strong", icon: "radix", color: "#FFFFFF", blurb: "Accessible primitives (dialogs, menus, popovers) so keyboard and ARIA behaviour is right by inheritance.", proof: { label: "Grafspee (60+ components)", href: "/projects/grafspee" } },

  // ————— Backend & APIs —————
  { id: "nodejs", name: "Node.js", area: "Backend & APIs", tier: "Core", icon: "nodejs", color: "#7FC728", blurb: "API routes and services behind the storefronts and dashboards — usually serverless on Vercel.", proof: { label: "Nextgen (25+ endpoints)", href: "/projects/nextgen" } },
  { id: "express", name: "Express", area: "Backend & APIs", tier: "Toolkit", icon: "express", color: "#FFFFFF", blurb: "Straightforward REST services when a framework-meta isn't needed.", proof: { label: "Client APIs & prototypes", href: "/projects" } },
  { id: "python", name: "Python", area: "Backend & APIs", tier: "Core", icon: "python", color: "#6FB3E0", blurb: "My first language — now home to a production AI agent and a zero-dependency CLI on PyPI.", proof: { label: "nour-code & env-sentry", href: "/projects/nour-code" } },
  { id: "fastapi", name: "FastAPI", area: "Backend & APIs", tier: "Strong", icon: "fastapi", color: "#2FD4B7", blurb: "Async APIs with Pydantic validation and SSE streaming for token-by-token agent output.", proof: { label: "nour-code server", href: "/projects/nour-code" } },
  { id: "php", name: "PHP", area: "Backend & APIs", tier: "Toolkit", icon: "php", color: "#A3A8D8", blurb: "Server-side work and maintenance where the existing stack calls for it.", proof: { label: "Client work", href: "/projects" } },
  { id: "postgresql", name: "PostgreSQL", area: "Backend & APIs", tier: "Core", icon: "postgresql", color: "#7AA7E8", blurb: "Normalized schemas, transactions where money or seats are involved, migrations under version control.", proof: { label: "Campus (7 checksummed migrations)", href: "/projects/campus" } },
  { id: "neon", name: "Neon DB", area: "Backend & APIs", tier: "Strong", icon: "neon", color: "#00E599", blurb: "Serverless Postgres with pooling and object storage — production data without a server to babysit.", proof: { label: "Nextgen & Aswem", href: "/projects/aswem" } },

  // ————— Rust & Systems —————
  { id: "rust", name: "Rust", area: "Rust & Systems", tier: "Core", icon: "rust", color: "#FF8A5C", blurb: "Single binaries, offline systems and APIs where correctness is money — integer millimes, never floats.", proof: { label: "OneClick till (v1.0.10)", href: "/projects/oneclick" } },
  { id: "actix", name: "Actix Web", area: "Rust & Systems", tier: "Strong", icon: "actix", color: "#FFFFFF", blurb: "Production JSON APIs with sqlx — the systems-language half of two live platforms.", proof: { label: "Campus Rust API & Aswem API", href: "/projects/campus" } },
  { id: "axum", name: "Axum", area: "Rust & Systems", tier: "Strong", icon: "mono:Ax", color: "#FFFFFF", blurb: "The HTTP layer of OneClick: handlers, forms and multipart on Tokio, server-rendered with maud.", proof: { label: "OneClick (till + control plane)", href: "/projects/oneclick" } },
  { id: "tokio", name: "Tokio", area: "Rust & Systems", tier: "Strong", icon: "tokio", color: "#FF6B6B", blurb: "The async runtime under every Rust service I ship.", proof: { label: "OneClick workspace", href: "/projects/oneclick" } },
  { id: "sqlite", name: "SQLite", area: "Rust & Systems", tier: "Strong", icon: "sqlite", color: "#7CC4EA", blurb: "Embedded storage for local-first software — WAL mode, living next to the binary, no server needed.", proof: { label: "OneClick ./data/store.db", href: "/projects/oneclick" } },
  { id: "debian", name: "Debian", area: "Rust & Systems", tier: "Strong", icon: "debian", color: "#FF7A93", blurb: "I don't just use it — I build a distribution on it with live-build, package lists as plain text.", proof: { label: "VexOS Desktop 2.2.1", href: "/projects/vexos" } },
  { id: "linux", name: "Linux", area: "Rust & Systems", tier: "Strong", icon: "linux", color: "#FCC624", blurb: "From daily driver to kernel-source distro building: live images, BusyBox systems, a home-grown package manager.", proof: { label: "VexOS (desktop + terminal editions)", href: "/projects/vexos" } },
  { id: "bash", name: "Bash / Shell", area: "Rust & Systems", tier: "Toolkit", icon: "bash", color: "#7BD88A", blurb: "Build scripts, release automation and the glue around distro and server work.", proof: { label: "VexOS build pipeline", href: "/projects/vexos" } },

  // ————— AI & Agents —————
  { id: "ollama", name: "Ollama", area: "AI & Agents", tier: "Core", icon: "ollama", color: "#FFFFFF", blurb: "Local model serving — the reason my AI tools never send your code to anyone's cloud.", proof: { label: "nour-code (local-first agent)", href: "/projects/nour-code" } },
  { id: "qwen", name: "Qwen3 8B", area: "AI & Agents", tier: "Strong", icon: "qwen", color: "#9D97FF", blurb: "The model inside nour-code: tool-calling, project-aware prompts, 15-iteration agentic loops.", proof: { label: "nour-code v1.4.0", href: "/projects/nour-code" } },
  { id: "groq", name: "Groq", area: "AI & Agents", tier: "Toolkit", icon: "mono:Gq", color: "#FF8A66", blurb: "Fast hosted inference where latency is the feature — always with your own key, kept on your machine.", proof: { label: "claude-prompt & VexOS DevStudio", href: "/projects/claude-prompt" } },
  { id: "pydantic", name: "Pydantic", area: "AI & Agents", tier: "Strong", icon: "pydantic", color: "#FF5C8A", blurb: "Every agent tool call validated before it touches a file — guardrails in code, not in prompts.", proof: { label: "nour-code tool layer", href: "/projects/nour-code" } },
  { id: "prometheus", name: "Prometheus", area: "AI & Agents", tier: "Toolkit", icon: "prometheus", color: "#FF7A4D", blurb: "Optional metrics and honest observability — including reporting what can't be measured.", proof: { label: "nour-code & Campus Observatory", href: "/projects/campus" } },
  { id: "pytest", name: "pytest", area: "AI & Agents", tier: "Strong", icon: "pytest", color: "#4FC3F7", blurb: "345 offline tests guard the agent; the suite runs with no network, like the product promises.", proof: { label: "nour-code test suite", href: "/projects/nour-code" } },

  // ————— Mobile & Desktop —————
  { id: "reactnative", name: "React Native", area: "Mobile & Desktop", tier: "Strong", icon: "react", color: "#61DAFB", blurb: "The mobile half of Matjari — same store, same accounts, in the owner's pocket.", proof: { label: "Matjari mobile app", href: "/projects/matjari" } },
  { id: "expo", name: "Expo", area: "Mobile & Desktop", tier: "Strong", icon: "expo", color: "#FFFFFF", blurb: "Build and ship React Native without fighting native toolchains on day one.", proof: { label: "Matjari (EAS builds)", href: "/projects/matjari" } },
  { id: "android", name: "Android (Java)", area: "Mobile & Desktop", tier: "Toolkit", icon: "android", color: "#3DDC84", blurb: "Native Android where cross-platform isn't the right trade.", proof: { label: "Mobile client work", href: "/projects" } },
  { id: "swift", name: "Swift (iOS)", area: "Mobile & Desktop", tier: "Toolkit", icon: "swift", color: "#FF7A59", blurb: "iOS-side development alongside the cross-platform work.", proof: { label: "Mobile client work", href: "/projects" } },
  { id: "xfce", name: "XFCE", area: "Mobile & Desktop", tier: "Toolkit", icon: "xfce", color: "#6FB3F7", blurb: "The desktop VexOS boots into — light, configurable, ready in a 4 GB VM.", proof: { label: "VexOS Desktop", href: "/projects/vexos" } },

  // ————— Craft & DevOps —————
  { id: "git", name: "Git", area: "Craft & DevOps", tier: "Core", icon: "git", color: "#FF7A52", blurb: "Grouped commits, honest messages, branches as checkpoints — history you can actually read.", proof: { label: "28 public repositories", href: "/projects" } },
  { id: "github", name: "GitHub", area: "Craft & DevOps", tier: "Core", icon: "github", color: "#FFFFFF", blurb: "Releases, PRs and pinned work — Nour-yahyaoui is where the receipts live.", proof: { label: "github.com/Nour-yahyaoui", href: "https://github.com/Nour-yahyaoui" } },
  { id: "docker", name: "Docker", area: "Craft & DevOps", tier: "Strong", icon: "docker", color: "#5BB8F5", blurb: "Services that run the same on my machine and yours — compose for the agent, blueprints for platforms.", proof: { label: "nour-code & Campus deploys", href: "/projects/nour-code" } },
  { id: "vercel", name: "Vercel", area: "Craft & DevOps", tier: "Core", icon: "vercel", color: "#FFFFFF", blurb: "Where most of the index is live — previews per branch, production per merge.", proof: { label: "This site & 10+ live demos", href: "/projects" } },
  { id: "actions", name: "GitHub Actions", area: "Craft & DevOps", tier: "Toolkit", icon: "actions", color: "#5B9DFF", blurb: "CI that runs the tests and builds the .exe on tag — releases without ceremony.", proof: { label: "OneClick release pipeline", href: "/projects/oneclick" } },
  { id: "figma", name: "Figma", area: "Craft & DevOps", tier: "Toolkit", icon: "figma", color: "#FF8A70", blurb: "Designing interfaces before building them — and translating designers' files faithfully.", proof: { label: "Ghassen Studio (designer client)", href: "/projects/ghassen-studio" } },
  { id: "zustand", name: "Zustand", area: "Craft & DevOps", tier: "Strong", icon: "mono:Zu", color: "#FFD166", blurb: "Cart and wishlist state with persistence — small stores, no boilerplate ceremony.", proof: { label: "Nextgen storefront", href: "/projects/nextgen" } },
  { id: "redux", name: "Redux Toolkit", area: "Craft & DevOps", tier: "Toolkit", icon: "redux", color: "#B79CFF", blurb: "Structured global state for larger React surfaces that outgrow context.", proof: { label: "Dashboard work", href: "/projects" } },
  { id: "tanstack", name: "TanStack Query", area: "Craft & DevOps", tier: "Toolkit", icon: "tanstack", color: "#FF6B7A", blurb: "Server state with caching and retries — data fetching that behaves under real networks.", proof: { label: "Client dashboards", href: "/projects" } },
];
