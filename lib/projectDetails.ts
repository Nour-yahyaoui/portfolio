/**
 * Case-study prose for /projects/[slug], written from each project's own
 * repository (README, manifests, layout). Keep claims verifiable: if a repo
 * doesn't say it, this file shouldn't either. Entries marked "from the live
 * product" cover client/collaborative work whose source isn't public.
 */

export interface ProjectDetail {
  slug: string;
  /** One plain sentence: what it is, for whom. */
  tagline: string;
  /** What it is and the problem it answers. */
  overview: string[];
  /** The flow a user (or the system) actually goes through. */
  howItWorks: { title: string; body: string }[];
  /** The stack, grouped by job — not a logo wall. */
  stack: { group: string; items: string[] }[];
  /** Decisions worth explaining to another engineer. */
  engineering: string[];
  /** Stable facts for the spec table (avoid numbers that go stale weekly). */
  facts: { label: string; value: string }[];
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "vexos",
    tagline: "A bootable Linux distribution that arrives ready to code — and resets clean on every reboot.",
    overview: [
      "Setting up a development machine costs hours: install an OS, then a browser, an editor, three language toolchains, git. VexOS removes that setup from the equation. You download one ISO, boot it (it is built and tested for VirtualBox), and land on an XFCE desktop that already has Firefox ESR, Python 3, Node.js with npm, Rust with cargo, gcc, git, and apt ready to use.",
      "Inside it sits VexOS DevStudio, a browser-based IDE with a code editor, a Run button, live preview, and an AI assistant that runs on your own Groq key — the key never leaves the machine. Because the whole session runs in RAM, a reboot returns the system to its exact starting state: nothing you break stays broken, which makes it a safe place to learn, experiment, or hand to a student.",
      "The repository also carries VexOS Linux, a small terminal-only system built on the kernel source in the same repo, with BusyBox, bash, and its own vpk package manager — the from-scratch counterpart to the Debian-based desktop.",
    ],
    howItWorks: [
      {
        title: "The image is built, not assembled by hand",
        body: "The desktop ISO is produced with Debian live-build on a Debian/Ubuntu host: validate the configuration, run auto/config, then auto/build. Every package list is a plain-text file in the repo, so anyone can audit exactly what is inside the image and rebuild it. A failed build resumes where it stopped instead of starting over.",
      },
      {
        title: "Boot → desktop → code, in minutes",
        body: "Create a VirtualBox VM (Debian 64-bit, 4 GB RAM, 2 CPUs, VMSVGA with 128 MB video memory), attach the ISO, boot, and log in. The compilers, runtimes, browser, and DevStudio are already configured — the first thing you do is write code, not install it.",
      },
      {
        title: "DevStudio closes the loop",
        body: "DevStudio gives the live session a real workflow: edit files in the browser IDE, press Run, see the live preview, and ask the AI assistant about your code using your own API key. When you reboot, the RAM session is gone and you start from the same clean desktop again.",
      },
    ],
    stack: [
      { group: "Base system", items: ["Debian trixie", "Linux kernel (source in-repo)", "XFCE desktop", "live-build"] },
      { group: "Preinstalled toolchain", items: ["Firefox ESR", "Python 3", "Node.js + npm", "Rust + cargo", "gcc", "git", "apt"] },
      { group: "DevStudio & site", items: ["Browser IDE with live preview", "Groq-powered assistant (bring your own key)", "Next.js landing/docs site with static export"] },
      { group: "Terminal edition", items: ["BusyBox", "bash", "vpk package manager"] },
    ],
    engineering: [
      "Reproducibility over magic: the entire image definition is text files under version control, so the ISO is an output, not an artifact someone tweaked by hand.",
      "The RAM-only live session is a feature, not a limitation — it makes the system disposable and therefore safe for classrooms, demos, and risky experiments.",
      "Two editions share one repo: the pragmatic Debian desktop for daily use, and the kernel-up terminal system for learning how a distribution is actually put together.",
      "Honest status: v2.2.1 is a release candidate, and the roadmap (signed apt repo, Calamares installer, guest additions) is written down in the repo instead of promised vaguely.",
    ],
    facts: [
      { label: "Current release", value: "VexOS Desktop 2.2.1 (release candidate)" },
      { label: "Runs on", value: "VirtualBox (Debian 64-bit profile), 4 GB RAM" },
      { label: "Persistence", value: "None by design — RAM session, clean reboot" },
      { label: "Build time", value: "30–90 min, ~25 GB disk, resumable" },
    ],
  },
  {
    slug: "nour-code",
    tagline: "An AI coding agent that runs entirely on your machine — with real tools, real guardrails, and a paper trail.",
    overview: [
      "Cloud coding agents are powerful, but they ask you to send your codebase to someone else's computer. nour-code takes the opposite bet: a Qwen3 8B model served locally by Ollama, behind a FastAPI service, given controlled access to your filesystem, your shell, and an extensible set of Python skills. Nothing leaves your machine except traffic you explicitly allow.",
      "It is built like a service, not a script: token streaming over SSE, sessions that survive restarts, rotating JSON logs, optional Prometheus metrics, and a 345-test suite that runs fully offline. The latest release is v1.4.0.",
    ],
    howItWorks: [
      {
        title: "The agentic loop",
        body: "You send a message; the model reasons, calls a tool, reads the result, and continues — up to a configurable iteration cap (15 by default). Answers stream token by token over SSE, or return in one shot if you prefer. The system prompt is project-aware: working directory, a shallow file listing, loaded skills, the active permission scope, and stack hints for Node.js, Next.js, Actix Web, and PostgreSQL.",
      },
      {
        title: "Seven tools, all permission-checked",
        body: "read_file, write_file, list_directory, search_files, run_shell, apply_patch, delete_file — every one Pydantic-validated, output-capped, and checked against permissions.yaml. Paths are validated and symlink escapes rejected; shell commands run against an allow/deny list with timeouts; every single call is written to a JSONL audit trail you can review afterwards.",
      },
      {
        title: "Skills you can hot-reload",
        body: "Drop a Python file into the skills directory (or POST /skills/reload) and its tools join the model's tool list — no restart. A broken skill is logged and skipped; it can never take the server down. Two ship in the box: a security skill (secret scanning, dangerous patterns, dependency CVEs) and a production skill (logging, validation, Dockerfile, CI).",
      },
      {
        title: "Production-Ready Mode",
        body: "Say \"make it production ready\" and the agent changes behaviour: it hardens every file it touches, refuses to hand back TODO stubs, and appends a readiness checklist so you can see what was done and what remains.",
      },
    ],
    stack: [
      { group: "Model & serving", items: ["Qwen3 8B via Ollama (OpenAI-compatible API)", "FastAPI + Uvicorn", "SSE streaming"] },
      { group: "Safety layer", items: ["permissions.yaml (roots, shell allow/deny, per-tool switches)", "Pydantic validation", "JSONL audit trail", "Human-in-the-loop approvals"] },
      { group: "Operations", items: ["Python 3.11+", "Docker / docker-compose", "Prometheus metrics (optional)", "Rotating JSON logs", "--doctor self-check CLI"] },
      { group: "Quality", items: ["pytest — 345 tests, no network required", "Ruff"] },
    ],
    engineering: [
      "Local-first is the security model: the strongest guarantee is that the code never leaves the machine, so the permission system only has to govern what the agent does, not where data goes.",
      "Guardrails are enforced in code, not in the prompt — the model cannot talk its way past a path check or a shell denylist.",
      "Failure is designed for: a --doctor command explains in plain language whether Python, the port, or Ollama is the problem, instead of leaving you with a blank curl.",
      "v1.4.0's headline fix — \"a turn can no longer hang\" — is typical of the project's direction: every release removes a way the agent could leave you waiting without an answer.",
    ],
    facts: [
      { label: "Current release", value: "v1.4.0" },
      { label: "Model", value: "qwen3:8b on Ollama (local)" },
      { label: "Tests", value: "345, fully offline" },
      { label: "Runs on", value: "Linux, macOS, Windows (start.cmd one-step)" },
    ],
  },
  {
    slug: "oneclick",
    tagline: "A till for phone shops that records every dinar — one Rust binary, offline, in French, Arabic, and English.",
    overview: [
      "Most small phone and accessories shops have never entered their stock into any system — and most POS software punishes them for it: no product record, no sale. OneClick starts from the opposite assumption. It is a local-first point-of-sale and shop-management system shipped as a single Rust binary (store.exe on Windows): unzip, double-click OneClick.bat, and the till is running on a local web server. No Node, no database server, no internet required.",
      "The interface speaks French, Arabic with full RTL layout, and English, switchable in one tap, with light and dark themes per device. Underneath, it keeps the books the way a careful shopkeeper would: cash sessions with a Z report, a debts carnet, printable receipts, and an audit journal that answers \"who did what\" for the last 200 actions.",
    ],
    howItWorks: [
      {
        title: "Inventory that fills itself",
        body: "A customer puts an item on the counter; you scan its barcode. Unknown code? A sheet opens asking only what's needed — a name (optional) and the selling price. Two fields and the sale goes through; the product record now exists. Unnamed items display as « Code 123456 » and their stock is not counted, so the till never blocks you with a false \"out of stock\". Later, calmly, the product sheet shows what the item actually sold for, which is what you use to set its real price and cost.",
      },
      {
        title: "A full trading day, end to end",
        body: "Open a cash session with a float, sell by scan or search (price entered per line, cash / card / credit), print the receipt from the browser, and close by counting the cash — the Z report shows expected vs counted vs difference. The Ventes page is the day book, with one-tap ticket reprints.",
      },
      {
        title: "Credit, handled like shops actually handle it",
        body: "Credit sales and free debts live in the carnet with balances per customer. You collect payments against them, and when a debt is truly lost, you write it off to loss — explicitly, in the audit trail, instead of quietly deleting it.",
      },
      {
        title: "Know your real daily cost",
        body: "Fixed charges — rent, water, electricity, maintenance — each keep their own rhythm (monthly, quarterly, yearly). OneClick totals them monthly and shows what you must take in each day just to cover them: the number a shop owner actually steers by.",
      },
      {
        title: "An optional cloud half",
        body: "A separate control-plane crate (device pairing, licence leases, sync ingest, read-only dashboard) runs against PostgreSQL when you give it a DATABASE_URL — and reports db=down on /health instead of crashing when you don't. It is deliberately a separate workspace so the till always builds first.",
      },
    ],
    stack: [
      { group: "Till (offline)", items: ["Rust (workspace: domain · storage · ui · app)", "axum 0.8 on Tokio", "Server-rendered UI with maud — zero .html files", "SQLite (WAL) in ./data"] },
      { group: "Money & safety", items: ["Integer millimes (i64, 3 decimals) — never floats", "Argon2id owner password", "Session IDs stored hashed", "Append-only audit journal"] },
      { group: "Cloud control plane", items: ["Rust + axum", "PostgreSQL via tokio-postgres (Neon)", "Device pairing, lease, sync ingest APIs"] },
      { group: "Delivery", items: ["Single release binary (LTO, stripped)", "Windows .exe with embedded icon/version", "cargo test domain suite (money, cart, margin, VAT)"] },
    ],
    engineering: [
      "The product decision is the architecture: because shops won't pre-enter stock, the data model treats \"unknown product\" as the normal case and builds the catalogue from real sales (documented as ADR-016).",
      "Server-rendered maud templates inside .rs files (ADR-014) keep the whole app in one binary with no asset pipeline — the .exe is the deployment.",
      "Money is integer millimes end to end, with unit tests on formatting, parsing, cart maths, margins, and VAT — floating point never touches a price.",
      "Shortcuts are stated plainly in the README: SQLite isn't encrypted yet (SQLCipher is next, and --doctor says so out loud), roles aren't enforced, lease tokens aren't signed. A till you can trust starts with a README you can trust.",
    ],
    facts: [
      { label: "Current release", value: "v1.0.10" },
      { label: "Deployment", value: "One binary · local server on 127.0.0.1:8642" },
      { label: "Languages", value: "French · Arabic (RTL) · English" },
      { label: "Internet required", value: "No — fully offline till" },
    ],
  },
  {
    slug: "campus",
    tagline: "A university community platform — clubs, projects, events — that is honest about what it has actually verified.",
    overview: [
      "Student life runs on scattered group chats and spreadsheets: club announcements in one place, event sign-ups in another, project teams in a third. Campus (CampusSphere) brings them into one free, open-source platform: clubs get real mini-sites, student projects get a review workflow, and events get registration that can't oversell a room.",
      "Its defining trait is honesty as a feature. The operations console (\"System Observatory\") reports measured product, API, database, and job metrics — and keeps an explicit list of measurements that are unavailable. No fabricated usage numbers, no seeded testimonials, no claiming a load target that was never measured.",
    ],
    howItWorks: [
      {
        title: "Clubs, projects, events — each with a real workflow",
        body: "Clubs publish mini-sites with open, request, or invite membership, officer review queues, and single-president handover. Projects go from proposal to super-admin review to role-based recruitment, applications, and a team workspace with tasks and milestones. Events move through proposal and approval to publishing, capacity-safe registration with automatic waitlist promotion, single-use QR check-in, and post-event feedback.",
      },
      {
        title: "Identity and safety, done properly",
        body: "Sign-in is Google OIDC with PKCE, state, and nonce; sessions are opaque HttpOnly cookies stored hashed server-side. Moderation reports, suspension, an append-only audit log, data export, and account anonymisation are built in from the start — the unglamorous features a real community needs by week two.",
      },
      {
        title: "Images without the usual holes",
        body: "Avatars, logos, and covers upload straight to S3-compatible object storage, but only after content-type and magic-byte verification, and are served from a stable /media/<id> URL — no trusting file extensions, no expiring signed links in the database.",
      },
      {
        title: "Perceived performance is specified, not hoped for",
        body: "Every route has a skeleton, every submit a pending state, failures get retry panels with an automatic countdown, and there is an offline gate plus per-surface error boundaries — all documented in docs/UI_STATES.md and checked like features.",
      },
    ],
    stack: [
      { group: "Web app", items: ["Next.js 16 App Router (Server Components + Server Actions)", "TypeScript", "Zod contracts shared across surfaces"] },
      { group: "API", items: ["Primary: Rust 1.82 · Actix Web 4 · sqlx (layered crates: domain, security, infrastructure, application…)", "Fallback: read-only Next.js JSON API", "OpenAPI 3.1 contract"] },
      { group: "Data & platform", items: ["PostgreSQL (Neon) — seven checksummed migrations", "S3-compatible object storage", "Docker / Render blueprints", "k6 load tests"] },
      { group: "Cross-cutting", items: ["Google OIDC (PKCE)", "SEO: SSR, JSON-LD, sitemap, RSS, llms.txt", "Accessibility from 320px, reduced-motion support"] },
    ],
    engineering: [
      "A modular monolith with a parallel Rust API: the TypeScript service layer owns the product logic, while the Actix Web API proves the same contracts at systems-language performance — both against one PostgreSQL schema.",
      "Capacity safety is a database problem, solved there: registration and waitlist promotion are transactional, so two students can't take the last seat.",
      "The seed script generates a realistic catalogue (3,000 people, 240 clubs, 2,000 events) deterministically, so pagination, search, and review queues are tested at honest scale — and the load-test plan exists precisely because the numbers must be measured, not asserted.",
      "A five-minute deploy path (one service, three variables, self-initialising schema) sits next to the long-form production checklist — pilot honesty applied to operations too.",
    ],
    facts: [
      { label: "Licence", value: "MIT" },
      { label: "Status", value: "Complete working build · pilot gates listed openly" },
      { label: "Sign-in", value: "Google OIDC with PKCE" },
      { label: "Deploy", value: "~5 min, one service, three variables" },
    ],
  },
  {
    slug: "matjari",
    tagline: "One workspace for a shop's whole day — stock, sales, orders, debts, staff — on web and mobile.",
    overview: [
      "Matjari (متجري, \"my store\") is built for small and medium shops whose real system is a notebook and memory. It gives the owner and their team one place for the daily work: what is in stock, what was sold, which orders are waiting, who owes money, and what the numbers actually say at the end of the week.",
      "The product is documented the way its users need it: the repository's README is a full Arabic user guide for shop owners and employees — no technical knowledge assumed — covering the daily routine the software is shaped around.",
    ],
    howItWorks: [
      {
        title: "Two doors in: owner and employee",
        body: "Owners create the store (with a 14-day free trial) and sign in with phone + password. Employees sign in with their phone and a six-digit access code issued by the manager. What each person sees — debts, staff, financial reports, multiple stores — depends on their role and the store's plan.",
      },
      {
        title: "The daily loop",
        body: "Start on the dashboard: today's revenue, sales count, net profit, pending orders, outstanding debts. Register incoming goods in Inventory, sell from the POS tab by barcode scan or name search, move each order through pending → confirmed → preparing → ready → delivered, and record damage, loss, and debt payments as they happen so the records stay close to reality.",
      },
      {
        title: "Stock that explains itself",
        body: "Every quantity change is a recorded movement — supply in (with supplier and invoice number), damage or loss out (with a reason: damage, theft, loss, expiry). When a number looks wrong, the movement history shows exactly which entry to question.",
      },
      {
        title: "Delivery creates the sale",
        body: "An order can't be delivered until its products are priced; confirming delivery generates the sale automatically. The workflow makes the common accounting leak — delivered but never recorded — structurally impossible.",
      },
    ],
    stack: [
      { group: "Web dashboard", items: ["Vite + React (JavaScript)", "Deployed on Vercel", "Arabic-first, RTL-aware interface"] },
      { group: "Mobile", items: ["React Native with Expo", "Same account, same store data as the web version"] },
      { group: "Product mechanics", items: ["Role + plan-based feature gating", "Phone-and-PIN employee access", "Amounts in Tunisian dinar to the millime"] },
    ],
    engineering: [
      "Feature visibility is treated as a product surface: sections appear only when the role and plan allow them, and the guide tells users exactly who to ask when something is missing — support questions answered by design.",
      "Financial reports are explicit about their inputs: profit is only as true as the purchase prices and damage records behind it, so the UI pushes those habits (correct cost price, record losses when they happen) instead of hiding them.",
      "Multi-store support with an always-visible active store context prevents the classic error of recording a sale in the wrong shop.",
    ],
    facts: [
      { label: "Platforms", value: "Web dashboard + React Native app" },
      { label: "Trial", value: "14 days on store creation" },
      { label: "Currency", value: "Tunisian dinar, to three decimals (millimes)" },
      { label: "Documentation", value: "Full Arabic user guide in the repo" },
    ],
  },
  {
    slug: "nextgen",
    tagline: "A complete store — storefront, checkout, and the admin desk behind it — on a serverless stack.",
    overview: [
      "Nextgen is an end-to-end e-commerce platform for small and medium businesses: customers browse, filter, wishlist, and order with cash on delivery; the owner runs everything from an admin dashboard — products and size variants, time-limited offers, order statuses, customer messages, and restocking.",
      "It was built from scratch over several weeks as a production exercise: a normalized PostgreSQL schema, 25+ API endpoints, and full TypeScript coverage, deployed on Vercel with Neon serverless Postgres.",
    ],
    howItWorks: [
      {
        title: "Shopping, with real stock rules",
        body: "Products carry size variants, each with its own stock level. The cart validates quantities against that stock, wishlists persist between visits, and checkout is cash-on-delivery with order-confirmation flow — the payment method that actually dominates local e-commerce.",
      },
      {
        title: "Orders and stock move together, or not at all",
        body: "Creating an order and decrementing variant stock happen in one database transaction. There is no state where an order exists but the stock was never taken — or the reverse. Order status then flows pending → confirmed → delivered/cancelled, with delivery dates recorded automatically.",
      },
      {
        title: "Offers that expire themselves",
        body: "Admins create percentage or fixed-price promotions with start and end dates; the storefront shows live countdowns and offer badges, and expired offers simply stop applying — no manual cleanup, no stale discounts.",
      },
      {
        title: "Nothing is ever deleted",
        body: "Products are archived (soft delete), never removed, so order history stays intact and reportable forever. The dashboard surfaces revenue, order counts, unread messages, and low-stock alerts at a glance.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js (App Router) + TypeScript", "Tailwind CSS", "Zustand (cart, wishlist, persisted)", "Framer Motion", "Lucide icons"] },
      { group: "Backend", items: ["Next.js API routes (25+ endpoints)", "PostgreSQL on Neon (pooled, serverless)", "8-table normalized schema", "ImageBB for product imagery"] },
      { group: "Delivery", items: ["Vercel", "Turbopack dev", "ESLint + strict TypeScript"] },
    ],
    engineering: [
      "Atomic order/stock transactions and soft-delete archiving are the two decisions that keep a small shop's data trustworthy — both chosen before the first feature was built on top of them.",
      "Stock is tracked per variant, not per product, because \"we have the shirt but not in medium\" is the real-world case that breaks naive inventories.",
      "Skeleton loading states and lazy, placeholder-backed images keep the storefront feeling instant on mid-range phones — the device most customers actually use.",
    ],
    facts: [
      { label: "Scale", value: "8 tables · 25+ endpoints · 40+ components" },
      { label: "Payment", value: "Cash on delivery" },
      { label: "Hosting", value: "Vercel + Neon PostgreSQL" },
      { label: "Build time", value: "2–3 weeks, end to end" },
    ],
  },
  {
    slug: "aswem",
    tagline: "What does bread actually cost in Kasserine today? Aswem asks the people buying it.",
    overview: [
      "Official price statistics are averages of averages, months old. Aswem (أسوام, \"prices\") collects the ground truth instead: anyone can report what they just paid for an everyday product in their governorate, and everyone can see the median price, the lowest reported price, and the most recent reports — free and open source, in Tunisian Darija and French.",
    ],
    howItWorks: [
      {
        title: "Read: the median is the headline",
        body: "A product page leads with the median (robust against outliers), the low, and recent reports per governorate — so a single prank or mistake can't move the number everyone sees.",
      },
      {
        title: "Report: four fields, no account",
        body: "Product, price in dinars, governorate, and either a place name or your position — rounded to about 110 m, so the map is useful without exposing anyone's exact location.",
      },
      {
        title: "Trust, enforced at the API",
        body: "The web server validates and forwards reports to the Rust API with a shared secret the browser never sees. The API then rejects prices more than 4× from the recent median in either direction and rate-limits every client — crowd data stays usable because abuse is boring to attempt.",
      },
    ],
    stack: [
      { group: "Web", items: ["Next.js App Router (Server Components + Server Actions)", "Darija at /ar · French at /fr", "Vercel"] },
      { group: "API", items: ["Rust · Actix Web", "SQLx", "Render"] },
      { group: "Data", items: ["Neon serverless Postgres", "pg_trgm fuzzy search", "Prices as integer millimes — no floating point"] },
    ],
    engineering: [
      "Splitting a TypeScript edge from a Rust API puts the validation and rate-limiting where they're cheapest to run hard, and keeps the secret server-side by construction.",
      "Integer millimes again: when thousands of small reports aggregate into medians, float error is a correctness bug, not a rounding detail.",
      "Fuzzy product search via pg_trgm forgives how people actually type product names in two languages — the database does the tolerant matching, not client code.",
    ],
    facts: [
      { label: "Licence", value: "Open source" },
      { label: "Languages", value: "Tunisian Darija · French" },
      { label: "Account needed", value: "No" },
      { label: "Location privacy", value: "Rounded to ~110 m" },
    ],
  },
  {
    slug: "env-sentry",
    tagline: "The five-second check that stops you committing your secrets — zero dependencies, one command.",
    overview: [
      "Every project with a .env file eventually has the moment: .env wasn't in .gitignore and real keys hit GitHub; or .env.example drifted and a new teammate burns twenty minutes discovering which variables are missing; or a live Stripe key got hardcoded \"just for testing\" and stayed. env-sentry catches all three — it's my most-starred project because the pain is universal.",
      "It is intentionally tiny: a single ~250-line Python file, no dependencies, no config. Not a security platform — an honest daily answer to \"did I mess up my .env today?\"",
    ],
    howItWorks: [
      {
        title: "Four verbs",
        body: "init scaffolds .env.example and makes sure .env is git-ignored. check diffs .env against .env.example, flags real secret values accidentally left in the example file, and confirms the ignore rule. sync regenerates .env.example from your keys with placeholder values — your real secrets never touch it. scan walks the repo for AWS keys, GitHub and Slack tokens, Stripe live keys, private-key blocks, JWTs, and suspicious KEY=value pairs.",
      },
      {
        title: "Made to block a bad commit",
        body: "Every problem exits non-zero, so it's a one-liner in CI (pip install env-sentry && env-sentry check && env-sentry scan) or a pre-commit hook. The output names the file and line — config.py:14 AWS Access Key — so fixing takes seconds.",
      },
    ],
    stack: [
      { group: "Runtime", items: ["Python 3.8+", "Zero dependencies — standard library only"] },
      { group: "Distribution", items: ["PyPI: pip install env-sentry", "python -m env_sentry.cli fallback (PATH-proof)"] },
      { group: "Detection", items: ["Known key shapes (AWS, GitHub, Slack, Stripe, JWT, PEM blocks)", "Heuristics tuned against false positives (env lookups and token-count vars are not flagged)"] },
    ],
    engineering: [
      "Smallness is the feature: one file you can read in a sitting earns trust that a 2 MB dependency tree asking to scan your secrets never will. The CONTRIBUTING note says it plainly — keep it that way.",
      "Releases are mostly false-positive fixes (max_tokens, os.environ.get(...)): a scanner that cries wolf gets uninstalled, so precision is the roadmap.",
      "Coverage grows by file type (.vue, .svelte, .env.* variants) because secrets leak wherever code is written, not only in .py files.",
    ],
    facts: [
      { label: "Install", value: "pip install env-sentry" },
      { label: "Dependencies", value: "0" },
      { label: "Size", value: "One ~250-line file, on purpose" },
      { label: "Licence", value: "MIT" },
    ],
  },
  {
    slug: "grafspee",
    tagline: "60+ copy-paste React components, each with a live example — so you stop rebuilding the same dialog.",
    overview: [
      "Every Next.js project rebuilds the same buttons, dialogs, dropdowns, and form controls — slightly differently each time. Grafspee collects 60+ production-ready components with TypeScript into one documented library: browse the live example, copy the code, adapt it, ship.",
      "It is built the way modern component libraries are actually built: accessible Radix UI primitives underneath, Tailwind styling on top, and a documentation site that is itself a Next.js app.",
    ],
    howItWorks: [
      {
        title: "See it working, then take the code",
        body: "Each component page pairs a live, interactive example with the exact source that powers it. There's no abstraction gap between what you preview and what you paste into your project.",
      },
      {
        title: "Accessible by inheritance",
        body: "Interactive primitives — dialog, dropdown menu, popover, select, tabs, tooltip, accordion and friends — come from Radix UI, so keyboard navigation, focus management, and ARIA behaviour are correct before any styling begins.",
      },
      {
        title: "Variants without prop soup",
        body: "class-variance-authority drives component variants (sizes, intents, states) in a typed way, with clsx/tailwind-merge keeping class composition predictable — the same pattern used across the shadcn/ui ecosystem, so Grafspee drops into those projects naturally.",
      },
    ],
    stack: [
      { group: "Library", items: ["React + TypeScript", "Radix UI primitives (25+ packages)", "Tailwind CSS", "class-variance-authority · cmdk · date-fns"] },
      { group: "Docs site", items: ["Next.js", "Live examples + copy-ready snippets", "Vercel"] },
    ],
    engineering: [
      "Copy-paste distribution beats npm versioning for a library this size: the code becomes yours, with no upgrade treadmill and no theming API to learn.",
      "Standing on Radix means the hard problems (focus traps, dismissal, aria-expanded) are solved once, correctly — Grafspee's value is curation, styling, and examples, not reinventing a dialog.",
    ],
    facts: [
      { label: "Components", value: "60+" },
      { label: "Model", value: "Copy-paste, free, open source" },
      { label: "Primitives", value: "Radix UI" },
      { label: "Live docs", value: "grafspee.vercel.app" },
    ],
  },
  {
    slug: "claude-prompt",
    tagline: "An interview that turns \"build me an app\" into a brief an AI agent can actually execute.",
    overview: [
      "AI coding agents fail most often at the first step: the prompt. People describe the app in their head in two sentences, the agent guesses the other ninety percent, and everyone is disappointed. claude-prompt fixes the input: it interviews you with a few sharp, skippable questions about what you're building, then drafts a clean, complete prompt you can hand straight to Claude, Cursor, or any other agent — downloadable as a .md file.",
    ],
    howItWorks: [
      {
        title: "Short questions, all skippable",
        body: "The flow is mobile-first and respects what you don't know yet. The stack question has a deliberate skip: if you can't answer it, the generated prompt instructs the agent to choose a sensible stack explicitly — instead of leaving a hole for it to guess through.",
      },
      {
        title: "Drafted by Groq, kept in your browser",
        body: "Your answers go to Groq to compose the brief — structured, specific, and ready to paste. Nothing is stored server-side; answers live only in your browser until you copy or download the result.",
      },
    ],
    stack: [
      { group: "App", items: ["Next.js + TypeScript", "Tailwind CSS", "Mobile-first UI"] },
      { group: "AI", items: ["Groq inference", "Markdown export (.md download)"] },
      { group: "Privacy", items: ["No server-side storage of answers"] },
    ],
    engineering: [
      "The interesting design decision is the skip button: a good brief builder must handle \"I don't know\" as data, not as an empty field — the prompt encodes the uncertainty and delegates it explicitly.",
      "Stateless by principle: with nothing stored, there's nothing to leak, secure, or GDPR-delete. The simplest backend is no backend.",
    ],
    facts: [
      { label: "Output", value: "Copy-paste prompt or .md download" },
      { label: "Storage", value: "Browser only" },
      { label: "Works with", value: "Claude, Cursor, any AI coding agent" },
    ],
  },
  {
    slug: "bacplus",
    tagline: "A study community for Tunisia's Baccalaureate year — courses, Q&A, and a code playground in one place. (From the live product; built collaboratively.)",
    overview: [
      "The Tunisian Bac is the exam that decides a student's next decade, and preparation is often lonely and disorganised. bacplus brings the cohort together: ask and answer questions, work through interactive courses, practise in a code playground, track projects, and stay motivated with gamification — points, levels, and visible progress.",
      "It was built collaboratively; the description here reflects the shipped product.",
    ],
    howItWorks: [
      {
        title: "Learn in public, with structure",
        body: "Students post questions and get peer answers, follow interactive courses, and keep their study projects tracked in the same place — turning isolated revision into a shared, searchable knowledge base for the next cohort.",
      },
      {
        title: "Practice where you read",
        body: "An integrated code playground lets computer-science students run and test ideas without leaving the lesson — the shortest possible loop between reading a concept and trying it.",
      },
      {
        title: "Motivation, engineered",
        body: "Gamification (points and progression), real-time notifications when your question is answered, and content moderation to keep quality high — the mechanics that make students come back on day thirty, not just day one.",
      },
    ],
    stack: [
      { group: "App", items: ["Next.js + TypeScript", "Tailwind CSS"] },
      { group: "Data", items: ["Neon PostgreSQL", "Vercel KV for cache and real-time features"] },
      { group: "Product", items: ["Q&A + courses + playground", "Gamification", "Moderation tooling"] },
    ],
    engineering: [
      "A serverless data split — Postgres for durable content, KV for hot, ephemeral data — keeps a student-budget project fast without a server to babysit.",
      "Moderation is a first-class feature, not an afterthought: any platform where minors post publicly needs it designed in from the first schema.",
    ],
    facts: [
      { label: "Audience", value: "Tunisian Baccalaureate students" },
      { label: "Collaboration", value: "Built with a partner (alphaa-pixel)" },
      { label: "Live at", value: "bac-plus.vercel.app" },
    ],
  },
  {
    slug: "devdash",
    tagline: "Courses, a playground, components, and prompts — a developer's desk, in one dashboard.",
    overview: [
      "Learning to code means forty open tabs: a tutorial here, a component there, a prompt copied from a chat you can't find again. DevDash gathers the desk into one place — structured front-end courses (HTML, CSS, JavaScript, TypeScript, Tailwind), a playground to try things, ready-to-use UI components and icons, and a library of AI prompts worth reusing.",
    ],
    howItWorks: [
      {
        title: "Learn, then immediately do",
        body: "Course tracks sit one click from the playground, so the loop is read a concept → run it → save the component you made. The dashboard organises all three so resources are findable by topic instead of by which tab you left open.",
      },
      {
        title: "A component and prompt shelf",
        body: "Ready-to-use UI pieces and field-tested AI prompts live beside the courses — the difference between knowing how something works and having a working version in your project today.",
      },
    ],
    stack: [
      { group: "App", items: ["Next.js + TypeScript (App Router: dashboard + components sections)", "Tailwind CSS", "Framer Motion"] },
      { group: "Content", items: ["HTML / CSS / JS / TS / Tailwind course tracks", "Component & icon library", "AI prompt collection"] },
    ],
    engineering: [
      "Content architecture is the product: courses, components, and prompts share one navigation and search model, so adding a new track is data entry, not new code paths.",
      "Built with consistency and reuse as explicit goals — it's as much a exercise in maintainable front-end structure as it is a learning tool.",
    ],
    facts: [
      { label: "Audience", value: "Front-end learners" },
      { label: "Live at", value: "devdash-ten.vercel.app" },
    ],
  },
  {
    slug: "c-editor",
    tagline: "Download one file, run it, write C in your browser. That's the whole install guide.",
    overview: [
      "Teaching or learning C usually starts with an hour of toolchain archaeology. C-Road Editor removes it: a single Rust binary serves a browser-based C editor that compiles against your local gcc. No Python, no Node, no runtime, no config files — one file per platform (Linux, macOS, Windows .exe), then open 127.0.0.1:8080.",
    ],
    howItWorks: [
      {
        title: "One binary is the server and the app",
        body: "The Rust executable embeds the editor UI and serves it locally. Your code never leaves the machine; compilation calls the gcc you already have (apt/dnf/pacman, Xcode tools, or MinGW-w64/WSL on Windows). Delete the file and the uninstall is complete.",
      },
      {
        title: "Releases, not build instructions",
        body: "Prebuilt binaries are published on GitHub Releases for each platform — learners download and run, they don't meet Cargo before they meet C.",
      },
    ],
    stack: [
      { group: "Runtime", items: ["Rust (single binary)", "Local HTTP server on 127.0.0.1:8080"] },
      { group: "Toolchain", items: ["System gcc", "Zero other dependencies"] },
      { group: "Distribution", items: ["GitHub Releases: Linux · macOS · Windows"] },
    ],
    engineering: [
      "The constraint is the design: if it needs a runtime, it fails its audience. A single static binary is what \"works on a school computer\" actually requires.",
      "Pairing with the c-road learning repo makes the editor the practice half of a learn-C path — tooling in service of teaching, again.",
    ],
    facts: [
      { label: "Install", value: "Download one file, run it" },
      { label: "Requires", value: "gcc only" },
      { label: "Platforms", value: "Linux · macOS · Windows" },
    ],
  },
  {
    slug: "buttoncraft",
    tagline: "My first public project, rebuilt properly — a gallery of buttons you can steal with a clean conscience.",
    overview: [
      "ButtonCraft has the most honest origin story in this index: it began in 2024 as \"buttons\", a vanilla-JavaScript page — my first public project — where you clicked a button style to copy it. The current ButtonCraft is the same idea rebuilt as a Next.js component gallery: ready-to-use buttons with HTML, CSS, and Tailwind implementations side by side.",
      "It stays in the index deliberately. A portfolio should show the arc, not just the highlight reel.",
    ],
    howItWorks: [
      {
        title: "Find, click, paste",
        body: "Browse the gallery by style, preview each button live (hover, focus, active states included), and copy the implementation in whichever flavour your project uses — plain HTML/CSS or Tailwind classes.",
      },
      {
        title: "From script tags to components",
        body: "The 2024 original was two script files and an index.html. The rebuild is typed React components — the same product idea, two years of engineering judgement apart.",
      },
    ],
    stack: [
      { group: "Current", items: ["Next.js + TypeScript", "Tailwind CSS"] },
      { group: "Original (2024)", items: ["Vanilla JavaScript", "GitHub Pages"] },
    ],
    engineering: [
      "Rebuilding your first project is a calibration exercise: same scope, better structure, accessible states — a measurable before/after of how you now think.",
    ],
    facts: [
      { label: "First version", value: "2024 — first public project" },
      { label: "Live at", value: "button-gen.vercel.app" },
    ],
  },
  {
    slug: "ghassen-studio",
    tagline: "A designer's portfolio where the website knows to stay out of the work's way. (Client project — described from the live site.)",
    overview: [
      "When the client is a designer, the developer's job changes: the site itself must have impeccable judgement and then disappear. Ghassen Studio is a portfolio built for exactly that brief — a quiet visual system, generous space, and smooth but restrained interactions, so every page points at the work instead of at itself.",
    ],
    howItWorks: [
      {
        title: "A gallery, not a brochure",
        body: "Projects lead with imagery at full presence; typography and chrome stay minimal and consistent so different bodies of work — different colours, moods, media — all feel at home in the same frame.",
      },
      {
        title: "Motion with manners",
        body: "Transitions are smooth and short, there to orient rather than impress. On a portfolio, animation that delays the work is a cost, so it is spent carefully.",
      },
    ],
    stack: [
      { group: "Build", items: ["Vite + React", "Modern CSS (fluid type, responsive grids)"] },
      { group: "Engagement", items: ["Client project — design-led", "Source private by agreement"] },
    ],
    engineering: [
      "Performance is part of the aesthetic: image-led pages live or die on loading behaviour, so the build keeps the stack light (Vite + React, no heavy framework overhead) and lets the media be the heaviest thing on the page — intentionally.",
      "Client work is also a communication exercise: build, show, refine against a designer's eye. The restraint in the result is the deliverable.",
    ],
    facts: [
      { label: "Type", value: "Client work" },
      { label: "Live at", value: "ghassen-studio.vercel.app" },
      { label: "Source", value: "Private" },
    ],
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((detail) => detail.slug === slug);
}
