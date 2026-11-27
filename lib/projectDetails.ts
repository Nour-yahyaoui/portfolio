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
    slug: "bidi-kit",
    tagline: "Arabic inside English, French inside Arabic — with punctuation, numbers, and fonts that behave.",
    overview: [
      "Mixed-language text breaks in ways a page-wide RTL switch cannot fix: a full stop jumps to the wrong side of an Arabic name, a phone number is reordered inside an Arabic paragraph, or quotation marks inherit the wrong direction. I built Bidi Kit as a zero-dependency TypeScript toolkit in the-golden-army's ui-storm repository to make those boundaries explicit.",
      "The library detects direction, splits text into directional runs, and emits native isolation through HTML bdi elements or Unicode isolates. It also supplies font stacks, CSS helpers, an audit API, and a CLI. It does not reimplement the Unicode bidi algorithm, shape Arabic, bundle fonts, or take over line breaking: those jobs stay with the browser and renderer.",
    ],
    howItWorks: [
      {
        title: "Find the boundaries, not a new rendering engine",
        body: "detectDirection uses the first strong character; segments returns directional runs with UTF-16 offsets into the original string. Latin numbers keep their punctuation together, Arabic punctuation stays with Arabic runs, and neutral punctuation resolves from its neighbors or the paragraph's base direction. The browser still performs the final visual ordering.",
      },
      {
        title: "Isolate each mixed-language unit",
        body: "paragraph builds a paragraph with a resolved direction and optional language, wrapping named parts in bdi elements with their own direction and language. bdi and inline escape input; paragraph escapes strings unless trusted, already-sanitized markup is explicitly requested. apply sets textContent and direction on an element. Plain-text helpers use Unicode isolates for contexts such as labels, terminals, and CSV output.",
      },
      {
        title: "Give Arabic room to render",
        body: "CSS and ROOT_CSS provide directional isolation, direction-aware alignment, Arabic-friendly line height, and root plaintext bidi handling. FONT_STACKS offers Arabic, Hebrew, and Latin system-font stacks; fontFace can generate a unicode-range-aware font-face rule. No font files are shipped, leaving font licensing, downloads, and subsetting to the application.",
      },
      {
        title: "Inspect invisible characters and integration mistakes",
        body: "audit reports bidi control characters as errors and warns about inline direction without isolation, physical alignment and CSS properties, and missing document language. stripBidiControls removes the documented control characters without changing other text. The CLI exposes check, runs, isolate, and dir, accepting a file or standard input; check exits with status 1 when it finds a bidi control character. The audit is a lint, not a security proof.",
      },
    ],
    stack: [
      { group: "Library", items: ["TypeScript", "ES2022", "Zero runtime dependencies", "No node: imports in library builds"] },
      { group: "Distribution", items: ["ES modules", "CommonJS", "TypeScript declarations", "Single-file classic browser script"] },
      { group: "Text and typography", items: ["HTML bdi / dir / lang", "Unicode directional isolates", "System font stacks", "CSS and font-face generation"] },
      { group: "Tooling and checks", items: ["Node.js CLI (18+)", "node --test", "Package-content validation", "Static-bundle drift checks", "Windows CI"] },
    ],
    engineering: [
      "Isolation uses the standard's existing mechanisms instead of shipping a competing Unicode bidi implementation. The toolkit determines unit boundaries; the renderer determines visual order.",
      "The same API is available as ESM, CommonJS, and a classic browser script, so a static HTML page does not need React, a bundler, or a build step. Tests compare the global bundle with module output.",
      "Text is escaped by default in HTML builders. Opting into raw HTML requires already-sanitized markup; removing bidi controls is a separate operation, not an HTML sanitizer.",
      "The README documents 48 tests covering punctuation, numbers, combining marks, isolation, HTML generation, fonts, audits, module parity, and browser packaging. Package checks verify the distributable contents, while static checks detect a committed bundle drifting from the build.",
      "Security helpers make invisible directional controls inspectable and removable, but legitimate text isolation and hostile display spoofing still require context-sensitive handling by the caller.",
    ],
    facts: [
      { label: "License", value: "MIT" },
      { label: "Organization", value: "the-golden-army" },
      { label: "Package location", value: "ui-storm / packages / bidi-kit" },
      { label: "Runtime dependencies", value: "None" },
      { label: "Distribution", value: "ESM, CommonJS, classic browser script" },
      { label: "CLI requirement", value: "Node.js 18+" },
    ],
  },
  {
    slug: "rusturbo",
    tagline: "Compile familiar dependencies once, reuse them across Rust projects, and measure what actually improves.",
    overview: [
      "A new Rust project often recompiles dependencies that another project on the same machine already built. I built Rusturbo under the-golden-army to target that repeated work: a Cargo-driven CLI with dependency-graph analysis, fingerprinted artifact reuse, linker selection, and an Actix Web preset. The package manifest and changelog identify version 0.1.2.",
      "The useful first-build case is a fresh project with a previously populated, compatible cache — not a dependency graph that has never been downloaded or compiled. Rusturbo keeps Cargo in charge of compilation and freshness checks, and provides a benchmark harness so the benefit can be measured on the user's own machine rather than expressed as an invented multiplier.",
    ],
    howItWorks: [
      {
        title: "Inspect the project and explain the build",
        body: "init writes rusturbo.toml and detects Actix Web. analyze uses cargo metadata to inspect the resolved graph, estimate its critical path and parallel waves, identify duplicate versions and broad feature sets, and report hardware, toolchain, linker, and cache information. A JSON mode makes the report consumable by other tools, including Anar IDE.",
      },
      {
        title: "Fingerprint the inputs before reusing artifacts",
        body: "A domain-separated SHA-256 key includes the exact rustc identity, Cargo version, target, build profile, resolved dependency versions and features, preset settings, flags, and relevant environment variables. Entries retain the input list so cache decisions can be explained. CARGO_TARGET_DIR is intentionally excluded because the target directory is an output location controlled by the reuse strategy.",
      },
      {
        title: "Reuse compatible dependencies in two ways",
        body: "The default strategy points compatible projects at a shared Cargo target directory, letting Cargo's own fingerprints decide which dependencies are fresh. Portable entries instead materialize a cached profile directory into the project's target directory using hard links, with copies as a fallback. The cache has a configurable size limit and LRU eviction; build-script policy can warn about or refuse sharing for risky graphs.",
      },
      {
        title: "Tune the invocation, then measure it",
        body: "build and run apply presets through Cargo --config arguments rather than rewriting Cargo.toml. Linker detection prefers mold or lld where applicable and retains the system linker on unsupported targets. benchmark compares cargo-clean, cargo-warm-registry, rusturbo-clean, rusturbo-warm, and rusturbo-shared, producing JSON and Markdown reports. Linux /proc sampling records process-tree resource metrics alongside timing and application-readiness measurements.",
      },
    ],
    stack: [
      { group: "CLI and configuration", items: ["Rust 2021 (1.74+)", "clap", "serde / serde_json", "toml", "anyhow"] },
      { group: "Graph and cache", items: ["cargo_metadata", "SHA-256 via sha2", "rayon", "Shared Cargo target directories", "Portable artifact entries + LRU eviction"] },
      { group: "Build integration", items: ["Cargo argv-based subprocesses", "mold / lld detection", "Optional sccache", "Actix Web profile preset"] },
      { group: "Evidence and distribution", items: ["Five-scenario benchmark harness", "JSON and Markdown reports", "Linux /proc resource sampling", "Cross-platform CI", "Cargo installation and npm binary installer"] },
    ],
    engineering: [
      "Cargo remains the authority on artifact freshness. Rusturbo changes the target directory and supplies compatible cached artifacts; it does not patch Cargo's fingerprint files to manufacture a cache hit.",
      "Presets are per-invocation --config arguments, not persistent edits to the project's manifest. They tune dependency debug information and dev codegen settings without changing optimization levels; --dry-run exposes the commands and environment, and --explain exposes cache reasoning.",
      "Build scripts can capture host-specific libraries and environment. The configurable strict policy refuses sharing for such graphs instead of assuming a dependency name and version are enough for safe reuse.",
      "Graph analysis reports critical paths, concurrency, and RAM-aware job recommendations. These reports should not be confused with replacing Cargo's scheduler or guaranteeing that every available core improves the build.",
      "Benchmarks separate an empty cache from a warm cache and a fresh project reusing another project's dependencies. Results are machine-specific; remote cache servers, prebuilt dependency distribution, and distributed compilation are documented roadmap items, not shipped capabilities.",
      "The v0.1.2 changelog records Windows-driven CLI fixes: Cargo arguments precede the program-argument separator, forwarded program arguments use build-then-execute with exit-code propagation, and the installable workspace excludes demo binaries to keep cargo install unambiguous.",
    ],
    facts: [
      { label: "Package version", value: "0.1.2 (manifest and changelog)" },
      { label: "License", value: "MIT" },
      { label: "Organization", value: "the-golden-army" },
      { label: "Requires", value: "Rust 1.74+ and Cargo" },
      { label: "Configuration", value: "rusturbo.toml" },
      { label: "Cache scope", value: "Local cross-project dependency artifacts" },
      { label: "Benchmark reports", value: "JSON + Markdown" },
    ],
  },
  {
    slug: "anar-ide",
    tagline: "A Rust-focused desktop editor: a thin React interface over a Rust-first workspace, language, and build core.",
    overview: [
      "I built Anar IDE under the-golden-army as an open-source desktop editor specifically for Rust. Tauri 2 hosts a React and TypeScript interface, while CodeMirror 6 provides the editing surface. The work behind the interface is separated into five Rust crates: shared models, workspace operations, language-server transport, task execution, and framework support.",
      "The documented v0.1.0 milestone covers files and editing: a workspace explorer, multi-file tabs, syntax highlighting, persistent preferences, and safe handling of changes made outside the editor. The changelog separately lists unreleased additions for rust-analyzer, Cargo execution, Rusturbo, framework profiles, search, Git, and an interactive terminal. Those additions should not be mistaken for features of the v0.1.0 milestone.",
    ],
    howItWorks: [
      {
        title: "Open a workspace, keep file access inside it",
        body: "The Rust workspace layer canonicalizes paths and checks containment before file operations. The explorer supports creating, renaming, and deleting entries while filtering directories such as .git, target, and node_modules. Recent workspaces are persisted so reopening a project does not start from scratch.",
      },
      {
        title: "Edit across tabs without losing context",
        body: "CodeMirror retains a separate EditorState for each tab, with Rust, JSON, and Markdown highlighting. Dirty-state tracking uses Text.eq rather than rebuilding document strings. Saves are atomic, and a debounced filesystem watcher distinguishes the editor's own saves from external modifications, offering reload or conflict handling without silently overwriting edits.",
      },
      {
        title: "Language intelligence and tasks — unreleased additions",
        body: "The changelog records a rust-analyzer JSON-RPC bridge for document synchronization, diagnostics, completions, hover information, navigation, and formatting. It also records streaming Cargo build, run, check, and test tasks, clickable compiler diagnostics, interactive input, and process-tree termination when a task is stopped.",
      },
      {
        title: "Rusturbo with explicit fallbacks — unreleased additions",
        body: "The Rusturbo integration probes the installed tool, inspects rusturbo.toml, and reads analyze --json output for dependency-graph, linker, sccache, and cache information. Build and run can use Rusturbo; check and test fall back to Cargo because Rusturbo does not expose those commands. The integration notes also explain why Rusturbo's output handling requires fallback parsing for compiler diagnostics.",
      },
    ],
    stack: [
      { group: "Desktop interface", items: ["Tauri 2", "React", "TypeScript", "Vite", "Tailwind CSS", "CodeMirror 6"] },
      { group: "Rust domain layer", items: ["anar-core", "anar-workspace", "anar-lsp", "anar-runner", "anar-frameworks"] },
      { group: "Workspace safety", items: ["Canonical path containment", "Atomic writes", "notify filesystem watcher", "Binary and large-file guards"] },
      { group: "Documented unreleased integrations", items: ["rust-analyzer / JSON-RPC 2.0", "Cargo + Rusturbo", "portable-pty + xterm.js", "Git and workspace search"] },
      { group: "Quality gates", items: ["Rustfmt", "Clippy", "Cargo tests", "Frontend lint, typecheck, tests, and build", "GitHub Actions on Linux, macOS, and Windows"] },
    ],
    engineering: [
      "The five domain crates do not depend on Tauri. The desktop shell owns IPC and UI state, while core logic can compile and be tested without a WebView.",
      "Filesystem access is scoped to the opened workspace rather than exposing unrestricted paths to the frontend. Atomic writes and external-change conflict handling address two ways editors can damage user work.",
      "Large-file mode begins at 1 MiB, with binary and 50 MiB file guards documented in the v0.1.0 changelog. Per-tab editor state preserves context without recreating the editing surface on every switch.",
      "Rusturbo is an optional build backend, not a replacement for every Cargo command. Integration research documents its limitations instead of assuming identical capabilities or promising unmeasured compilation speedups.",
    ],
    facts: [
      { label: "License", value: "MIT" },
      { label: "Organization", value: "the-golden-army" },
      { label: "v0.1.0 scope", value: "Files & editor" },
      { label: "Architecture", value: "Five Rust domain crates + Tauri desktop shell" },
      { label: "CI matrix", value: "Linux, macOS, Windows" },
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
    slug: "rustpad",
    tagline: "A Word and PDF studio in one ~3.9 MB Rust binary — offline, with legal redlines and forensic PDF redaction.",
    overview: [
      "Desktop document editors often ship as 150–400 MB Chromium or Electron wrappers, or as multi-gigabyte suites, just to write a report or redline a contract. RustPad reads and writes Microsoft Word (.docx) and PDF (.pdf) files natively, in one standalone executable that works fully offline.",
      "Everything is implemented in the repository itself — from DEFLATE/PKZIP compression and OpenXML serialization to PDF 1.5+ object streams, PDF/A-2b output, TrueType rasterization, and native Win32 and X11 windowing. The latest release is v2.1.0, focused on smooth 60–120Hz interaction; v2.0.0 added the enterprise layer: legal redlines, PDF sanitization, sealing, and AI data-loss prevention.",
    ],
    howItWorks: [
      {
        title: "Author, format, and review",
        body: "Start from a built-in template or open an existing .docx or .md. Saving a .docx keeps its theme, custom XML, and embedded media byte for byte. Track Changes (<w:ins> / <w:del>) can be accepted or rejected one clause at a time, and comments sit in a sidebar.",
      },
      {
        title: "Redact, seal, and verify PDFs",
        body: "Sanitize a marked-up PDF and the intersecting text runs and annotations are physically removed, not painted over. Seal the result with a SHA-256 tamper seal and PDF/A-2b metadata, then check it later with rustpad verify.",
      },
      {
        title: "Govern AI and automate from the terminal",
        body: "A policy.json can lock AI providers to localhost or an allowlisted gateway in air-gapped mode. Every GUI capability is also a headless command — redline, sanitize, sign, verify, sbom, convert, and inspect --a11y — for CI and compliance workflows.",
      },
    ],
    stack: [
      { group: "Language", items: ["100% Rust", "9 workspace crates", "0 crates.io runtime dependencies"] },
      { group: "Document formats", items: ["ECMA-376 OpenXML (.docx)", "ISO 32000 PDF 1.5+ and PDF/A-2b", "RFC 1951 DEFLATE · RFC 6234 SHA-256"] },
      { group: "Platform & supply chain", items: ["Win32 GDI + native WinHTTP (Windows)", "Linux X11", "CycloneDX 1.5 SBOM via rustpad sbom"] },
    ],
    engineering: [
      "No WebView by design: the document model, layout, and rendering run in native Rust memory, so the whole app is a ~3.9 MB binary with no browser or Electron runtime.",
      "Redaction removes the underlying text from the content stream, so redacted text can't be copied or extracted. The guarantee comes from the data, not from a visual overlay.",
      "Zero external crates.io dependencies, verifiable with an SBOM, and parsers guarded against zip bombs, ZipSlip paths, and deeply nested XML.",
      "Responsiveness is a stated goal: burst-coalesced repaints and 60Hz spring scrolling aim for smooth interaction on 60–120Hz displays.",
    ],
    facts: [
      { label: "Current release", value: "v2.1.0 — ultra-smooth 60–120Hz studio" },
      { label: "Binary size", value: "~3.9 MB single executable" },
      { label: "Dependencies", value: "Zero external crates.io runtime dependencies" },
      { label: "Licence", value: "MIT" },
    ],
  },
  {
    slug: "agencyos",
    tagline: "One workspace for the business and the delivery of agency work — multi-tenant, role-scoped, and honest about what it cannot verify.",
    overview: [
      "An agency runs two businesses at once: winning and servicing clients, and actually delivering the work. Those usually live in different tools, so nobody can answer simple questions — what is blocked, what is invoiced, what the client can see. AgencyOS puts both halves in one multi-tenant platform: clients and their onboarding checklist, projects and milestones, a Kanban board with dependency rules, support tickets, documents, invoices, notifications and reporting — plus a client portal that shows a client only their own work.",
      "It is a modular monolith with two deployables and one database: Next.js 15 (App Router) for the web, NestJS 11 for the REST API, PostgreSQL 17 with Prisma for persistence. The browser never learns the API host — it calls the same-origin path /api/v1 and Next.js rewrites to API_INTERNAL_URL, so cookies stay first-party and there is no CORS preflight in the happy path.",
      "The project's discipline is separating what is proven from what is merely possible. Builds, lint, 11 unit tests, 15 integration tests against a real PostgreSQL and 4 Playwright end-to-end specs pass; the docs state plainly that Docker images, GitHub Actions runs and every third-party provider call (Stripe, OpenAI, Resend, S3) were not executed in the build sandbox, and those paths are implemented to report themselves unavailable rather than fake success.",
    ],
    howItWorks: [
      {
        title: "Tenancy enforced in the query, not the controller",
        body: "Every tenant-owned table carries organizationId, and required relations use composite foreign keys — [organizationId, parentId] — so the database itself rejects a row pointing at another tenant's parent. Five roles narrow the scope further: OWNER and MANAGER see the whole organization, DEVELOPER sees only projects they are a member of, and CLIENT sees only rows tied to their clientId, with drafts hidden and boards read-only. Cross-tenant reads return 404 (no existence oracle) and organisation-level denials return 403.",
      },
      {
        title: "Sessions that survive a stolen token",
        body: "Authentication is bcrypt-hashed passwords with access and refresh cookies. Refresh tokens are grouped into families: rotating one invalidates the old one, and replaying an old token revokes the entire family. Cookie-authenticated mutations additionally require CSRF double-submit — Origin must match WEB_URL and the x-csrf-token header must equal the cookie, compared in constant time. Bearer clients skip CSRF by design.",
      },
      {
        title: "Delivery with order, not just columns",
        body: "The board is drag and drop, but the interesting part is underneath: tasks can depend on each other, the dependency graph is checked for cycles, and a task refuses to complete while prerequisites are open. ProjectsService.projectWhere(scope) is the single definition of \"which projects can this caller see\", reused by tasks, analytics, documents and the assistant — one rule, one place to audit.",
      },
      {
        title: "Money the browser cannot edit",
        body: "Invoice totals are calculated on the server, never accepted from the client. Stripe Checkout creates the session, and webhooks are signature-verified and idempotent through a WebhookEvent unique on [provider, eventId], so a retried delivery cannot double-apply a payment. No card data is stored, and invoices are numbered per organization per year.",
      },
      {
        title: "Integrations that admit when they are off",
        body: "Stripe, OpenAI, Resend and S3-compatible storage are all optional and lazily constructed — IntegrationsService only builds a client when its key exists, and GET /api/v1/integrations/status tells the UI the truth. Ask the assistant something without OPENAI_API_KEY configured and you get 503 AI_UNAVAILABLE with no fabricated output; a deadline reminder with no mail provider is recorded as explicitly not delivered. Deadline reminders also dedupe on a key like deadline:<taskId>:<date>, so nobody gets the same nudge twice.",
      },
    ],
    stack: [
      { group: "Web", items: ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Radix primitives", "TanStack Query v5", "React Hook Form + Zod", "dnd-kit", "Recharts"] },
      { group: "API", items: ["NestJS 11", "REST under /api/v1", "Swagger / OpenAPI", "class-validator DTOs", "Zod env validation", "Helmet", "Throttling (240 req/min, tighter on auth)", "Structured logging with request ids"] },
      { group: "Data", items: ["PostgreSQL 17", "Prisma 6 — 23 models, 12 enums, 45 indexes", "2 reviewable SQL migrations", "Composite tenant foreign keys"] },
      { group: "Integrations", items: ["Stripe Checkout + signature-verified webhooks", "OpenAI (grounded analyses)", "Resend (transactional email)", "S3-compatible storage, local disk in development"] },
      { group: "Quality", items: ["Jest + Supertest (unit + integration)", "Playwright end-to-end on Chromium", "ESLint 9", "GitHub Actions", "Dockerfiles + Compose"] },
    ],
    engineering: [
      "A modular monolith on purpose: 19 controllers grouped by domain, each with its own service and DTOs. Splitting into microservices at this scale would add distributed transactions and deployment overhead for no gain, and clean module boundaries keep a later extraction possible without a rewrite.",
      "The cross-module rule is enforced socially and in review: a module calls another module's service, never its tables through a private query. That is what keeps \"who can see this project\" a single function instead of five subtly different WHERE clauses.",
      "Where Prisma falls short, the trade-off is written down instead of hidden: it cannot express optional composite relations, so optional links (for example Document.projectId) use single-column foreign keys plus a service-level tenant check. PostgreSQL row-level security is not used — it is listed on the roadmap as the next defence-in-depth step.",
      "The seeds are safe by construction: both the base seed and the additive ~1,400-row activity seed are deterministic, idempotent, labelled with demo-activity-* ids, and refuse to run when NODE_ENV is production. Every payment record carries a demo_* provider id, so no one mistakes demo data for real transactions.",
      "Honest degradation is treated as a feature, not a gap. An assistant that says \"unavailable\" and an integration panel that says \"not configured\" are worth more in a review than a demo that appears to work because it is quietly making things up.",
    ],
    facts: [
      { label: "Verified", value: "2026-11-06 (builds, lint, tests, migrations)" },
      { label: "API surface", value: "66 paths / 85 operations / 31 schemas" },
      { label: "Tests", value: "11 unit · 15 integration · 4 end-to-end" },
      { label: "Data model", value: "23 models · 12 enums · 45 indexes" },
      { label: "Web app", value: "23 routes, production build green" },
      { label: "Licence", value: "Apache-2.0" },
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
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((detail) => detail.slug === slug);
}
