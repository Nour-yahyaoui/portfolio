/**
 * Content for the Emerald edition (/emerald) — the same portfolio, colder.
 *
 * Everything here is written from the project repositories themselves
 * (READMEs, manifests, release notes), the same rule as lib/projectDetails:
 * if the code can't show it, the copy doesn't claim it.
 */

export type ArtifactKind = "core" | "knot" | "helix" | "shards" | "terrain";

export interface LabArtifact {
  id: ArtifactKind;
  name: string;
  tag: string;
  /** What the object literally is, in three.js terms. */
  build: string;
  /** Why it is here — the piece of work it stands for. */
  meaning: string;
  blurb: string;
  /** Two or three facts rendered next to the canvas. */
  specs: { label: string; value: string }[];
}

/**
 * The Lab: five 3D artifacts, each a metaphor for a real system in the index.
 * Procedural geometry only — no textures, no external HDRIs, no downloads.
 */
export const labArtifacts: LabArtifact[] = [
  {
    id: "core",
    name: "Crystal Core",
    tag: "Permission kernel",
    build:
      "Icosahedron (detail 5), vertex-displaced by three sine fields with a fresnel shell and a wireframe cage.",
    meaning:
      "How nour-code is shaped: a model at the centre, and around it a hard shell of path checks, shell allow/deny lists, and a JSONL audit trail. The core moves; the shell decides how far.",
    blurb:
      "Turn it around and the silhouette never repeats — the same discipline as an agent whose tools are validated on every call instead of trusted once.",
    specs: [
      { label: "Geometry", value: "Icosahedron · 20 480 tris" },
      { label: "Shader", value: "sine displacement + fresnel" },
      { label: "Mirrors", value: "nour-code permissions.yaml" },
    ],
  },
  {
    id: "knot",
    name: "Orbital Knot",
    tag: "Agentic loop",
    build:
      "Torus knot (p2 q3) in emissive wireframe, orbited by twelve instanced nodes riding three tilted rings.",
    meaning:
      "The agentic loop: reason → call a tool → read the result → continue, up to a configurable cap. Every node passes through the same gate, every time.",
    blurb:
      "Nothing skips a turn. That is the whole point of an iteration cap with an audit line per call — the loop is visible, not magic.",
    specs: [
      { label: "Geometry", value: "TorusKnot · p2 q3" },
      { label: "Orbiters", value: "12 instanced nodes" },
      { label: "Mirrors", value: "15-iteration tool loop" },
    ],
  },
  {
    id: "helix",
    name: "Data Helix",
    tag: "Schema & migrations",
    build:
      "Two helical strands of instanced spheres joined by rungs, counter-rotating around a shared spine.",
    meaning:
      "A schema and its migrations: two strands that must stay paired. Break the pairing and the data lies — which is why order and stock commit in one transaction.",
    blurb:
      "Campus ships seven checksummed migrations for exactly this reason: the helix either stays paired or the deploy stops.",
    specs: [
      { label: "Geometry", value: "Instanced spheres + rungs" },
      { label: "Pairing", value: "locked, counter-rotating" },
      { label: "Mirrors", value: "atomic commit · 7 migrations" },
    ],
  },
  {
    id: "shards",
    name: "Shard Storm",
    tag: "Edge cases",
    build:
      "Two hundred instanced tetrahedra swirling inside a torus cloud, each with its own spin and drift phase.",
    meaning:
      "Everything that arrives sideways: unknown barcodes, dust on a scanner, a shop open past midnight, an Arabic label in a French receipt. Handled, not exceptional.",
    blurb:
      "OneClick's defining feature lives here — scan something the shop never entered, answer two questions, and the sale goes through while the product sheet writes itself.",
    specs: [
      { label: "Instances", value: "200 tetrahedra" },
      { label: "Motion", value: "per-instance drift + spin" },
      { label: "Mirrors", value: "unknown-barcode flow" },
    ],
  },
  {
    id: "terrain",
    name: "Wire Terrain",
    tag: "Systems surface",
    build:
      "A 64 × 64 plane displaced by layered sines, drawn as an emerald wireframe dissolving into fog.",
    meaning:
      "The surface area I work across: kernels and packages, tills and storefronts, agents and APIs. Wide, but surveyed — the parts I haven't measured are marked as unknown rather than guessed.",
    blurb:
      "VexOS is the deep end of this grid — a Debian-based distribution built with live-build, and the reason the fog at the horizon is honest about what you can't see.",
    specs: [
      { label: "Geometry", value: "64 × 64 displaced plane" },
      { label: "Render", value: "wireframe + exponential fog" },
      { label: "Mirrors", value: "VexOS · Debian live-build" },
    ],
  },
];

export interface Capability {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  proof: { label: string; href: string };
}

export const capabilities: Capability[] = [
  {
    id: "product",
    title: "Products, end to end",
    summary:
      "Interface, API, database, deploy. One person accountable for the whole path from sketch to production — nothing lost between handoffs, because there are none.",
    bullets: [
      "Typed contracts shared by UI, API and schema",
      "Server Components where they help, plain REST where they don't",
      "Deployed on Vercel with previews per branch",
    ],
    proof: { label: "Campus — university platform", href: "https://github.com/Nour-yahyaoui/Campus" },
  },
  {
    id: "commerce",
    title: "Commerce that keeps its books",
    summary:
      "Storefronts with variants and offers, cash-on-delivery checkout, and an admin desk where orders and stock can never disagree — because they commit in the same transaction.",
    bullets: [
      "Money as integers, never floats",
      "Products archived, never deleted",
      "Low-stock alerts and an operations inbox",
    ],
    proof: { label: "Nextgen — full e-commerce", href: "https://github.com/Nour-yahyaoui/nextgen" },
  },
  {
    id: "tills",
    title: "Tills that work offline",
    summary:
      "Point of sale, inventory, debts, staff, and the Z report — on the web, in a pocket, or in a single Rust binary that opens the till with no internet at all.",
    bullets: [
      "Inventory that fills itself from an unknown barcode",
      "Cash sessions, audit journal, Arabic RTL and French",
      "One file to install, no runtime to babysit",
    ],
    proof: { label: "OneClick — Rust POS", href: "https://github.com/Nour-yahyaoui/onclick" },
  },
  {
    id: "agents",
    title: "Local AI with guardrails",
    summary:
      "Agents that do real work on your own machine: permission-checked tools, shell allowlists, and an audit trail for every call. Useful first, contained always.",
    bullets: [
      "Qwen3 8B through Ollama, SSE streaming",
      "Hot-reloadable Python skills, secrets scanning",
      "345 offline tests, restart-safe sessions",
    ],
    proof: { label: "nour-code — local agent", href: "https://github.com/Nour-yahyaoui/nour-code" },
  },
  {
    id: "systems",
    title: "Systems & documents",
    summary:
      "Native tools where the web is the wrong answer: a ~3.9 MB Rust studio that reviews Word redlines and seals PDFs, with no WebView and no runtime to install.",
    bullets: [
      "Track Changes reviewed clause by clause",
      "Forensic redaction and SHA-256 sealing",
      "CycloneDX SBOM for supply-chain review",
    ],
    proof: { label: "RustPad — Word & PDF studio", href: "https://github.com/Nour-yahyaoui/rustpad" },
  },
  {
    id: "platform",
    title: "Platforms & distribution",
    summary:
      "Multi-role products with the unglamorous machinery that decides whether a platform survives its second month — approvals, capacity, moderation, audit logs.",
    bullets: [
      "Capacity-safe registration and check-in",
      "Role- and plan-based access",
      "A Debian-based distribution built with live-build",
    ],
    proof: { label: "VexOS — Linux for developers", href: "https://github.com/Nour-yahyaoui" },
  },
];

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  output: string;
}

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Define done in writing",
    body: "Before any code: what the thing must do, who uses it, what \"finished\" means, and what is explicitly out of scope. One page, plain language, agreed by both of us.",
    output: "A one-page brief with scope and exclusions",
  },
  {
    n: "02",
    title: "Draw the data first",
    body: "Entities, relationships, and the invariants that must never break — stock can't go negative, an order can't outlive its customer. The schema is the product's skeleton; interfaces come after.",
    output: "Schema + migrations under version control",
  },
  {
    n: "03",
    title: "Build the boring path end to end",
    body: "One complete slice through every layer — UI, API, database, deploy — before any feature is polished. If the boring path doesn't work on day three, nothing else matters yet.",
    output: "A thin working version, deployed",
  },
  {
    n: "04",
    title: "Harden while it's small",
    body: "Rate limits, validation, secret scanning, and audit trails go in while the codebase is still small enough to hold in one head — not as a patch before launch.",
    output: "Security controls in the first release",
  },
  {
    n: "05",
    title: "Hand it over properly",
    body: "Documentation written well enough that you never need me to understand your own system: how to run it, how to back it up, and what to do when it breaks at 2am.",
    output: "README, runbook, and a walkthrough",
  },
];

export interface Milestone {
  year: string;
  title: string;
  body: string;
}

export const timeline: Milestone[] = [
  {
    year: "2023",
    title: "Python, and the first paying work",
    body: "Started with Python and took the first freelance jobs — small sites and scripts for people who needed a thing to simply work. Learned that shipping beats elegance when rent is involved.",
  },
  {
    year: "2024",
    title: "JavaScript, React, and the full stack",
    body: "Moved into the browser and then behind it: React, then Next.js, Node, PostgreSQL. First client dashboards and storefronts, first lesson in what a bad schema costs.",
  },
  {
    year: "2025",
    title: "Systems, Rust, and going offline",
    body: "Went down the stack — Rust for tills and desktop tools that work with no internet, Actix Web for APIs, SQLite for data that lives on one machine. Started building VexOS with Debian live-build.",
  },
  {
    year: "2026",
    title: "Local AI, and keeping it contained",
    body: "nour-code put a Qwen3 8B model behind real tools with real permissions, and 345 offline tests behind that. The pattern held: powerful by default, bounded by construction.",
  },
];

export interface Metric {
  value: number;
  suffix?: string;
  label: string;
  note: string;
}

export const metrics: Metric[] = [
  { value: 20, label: "Projects in the index", note: "Each with a written case study" },
  { value: 345, label: "Offline tests", note: "Guarding nour-code alone" },
  { value: 3.9, suffix: " MB", label: "RustPad binary", note: "Word + PDF, no runtime" },
  { value: 7, label: "Checksummed migrations", note: "Campus schema, in order" },
  { value: 3, label: "Languages shipped in UIs", note: "Arabic, French, English" },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Why would a client hire one developer instead of a team?",
    a: "Because the failure mode of small projects isn't a lack of hands — it's the gap between them. One person who owns the schema, the API, the interface and the deploy doesn't lose weeks to handoffs, and there's no ambiguity about who fixes what.",
  },
  {
    q: "Does local AI actually work as well as the hosted agents?",
    a: "Not on raw model quality — an 8B model on your laptop is not a frontier model in a datacentre. It wins on the things the benchmark doesn't measure: your code never leaves the machine, there's no per-token bill, and it works on a plane. For refactors, tests, and codebase-specific work, that trade is usually correct.",
  },
  {
    q: "Why Rust for shop software?",
    a: "A till is the worst place for a surprise: no internet, a queue of people, and money involved. Rust gives one binary with no runtime to install, integer arithmetic so millimes never drift, and a compiler that refuses the class of bug you'd otherwise find on a Friday night.",
  },
  {
    q: "What happens after the project ships?",
    a: "You get documentation written for a human: how to run it, how to back it up, what each environment variable does, and what to check first when something breaks. If you'd rather keep me on a retainer for changes, that's available — but the point is that you don't have to.",
  },
  {
    q: "How do you handle a project you're not the right person for?",
    a: "I say so early, and specifically — usually with a pointer to the kind of person or stack that fits better. A week of honesty is cheaper than a quarter of the wrong build for both of us.",
  },
  {
    q: "Can I see the code before we talk?",
    a: "Yes — twenty repositories are public, including the three flagship systems. Read the READMEs; they're the same documentation style you'd get for your own project.",
  },
];

/** The three systems the emerald edition expands into full narratives. */
export const deepDiveSlugs = ["nour-code", "rustpad", "oneclick"] as const;

export interface DeepDive {
  slug: string;
  title: string;
  question: string;
  paragraphs: string[];
  proofPoints: { label: string; value: string }[];
  href: string;
}

export const deepDives: DeepDive[] = [
  {
    slug: "nour-code",
    title: "nour-code",
    question: "Can a coding agent be genuinely useful without sending your code anywhere?",
    paragraphs: [
      "Cloud agents are strong, and they ask for your repository in exchange. nour-code takes the opposite bet: Qwen3 8B served locally by Ollama, behind a FastAPI service, given controlled access to your filesystem and shell. Nothing leaves the machine except traffic you explicitly allow.",
      "The interesting part isn't the model, it's the perimeter. Seven tools — read, write, list, search, shell, patch, delete — are each Pydantic-validated, output-capped, and checked against permissions.yaml on every single call. Paths are validated and symlink escapes rejected; shell commands run against an allow/deny list with timeouts; every call lands in a JSONL audit trail you can read afterwards.",
      "Guardrails live in code, not in the prompt, so the model cannot talk its way past them. Skills hot-reload from a directory — drop a Python file in and its tools join the list without a restart, and a broken one is logged and skipped instead of taking the server down.",
      "It's built like a service, not a script: SSE token streaming, sessions that survive restarts, rotating JSON logs, optional Prometheus metrics, a --doctor command that says in plain language whether Python, the port, or Ollama is the problem — and 345 tests that run with no network at all.",
    ],
    proofPoints: [
      { label: "Release", value: "v1.4.0" },
      { label: "Tools", value: "7, permission-checked" },
      { label: "Tests", value: "345 offline" },
      { label: "Streaming", value: "SSE, token by token" },
    ],
    href: "https://github.com/Nour-yahyaoui/nour-code",
  },
  {
    slug: "rustpad",
    title: "RustPad — Native Word & PDF Studio",
    question: "What does a document tool look like with no browser inside it?",
    paragraphs: [
      "Not a website, not an Electron app: roughly 3.9 MB of pure Rust that opens .docx and .pdf files directly. No WebView, no HTML, no CSS, no JavaScript, and no runtime to install — which is the entire reason it can be handed to a legal team and audited in an afternoon.",
      "It does the work documents actually need: Track Changes reviewed clause by clause instead of accepted in bulk, redactions that are forensically removed rather than painted over, and PDFs sealed with SHA-256 and exported as PDF/A-2b for long-term archiving.",
      "Pure Rust here is a supply-chain decision, not a slogan — zero crates.io runtime dependencies, with a CycloneDX SBOM shipped alongside the binary so a security review can see exactly what is inside it.",
      "The result is the kind of tool that opens instantly on an old office machine, works with the network unplugged, and doesn't phone home with the contract it just redlined.",
    ],
    proofPoints: [
      { label: "Binary", value: "~3.9 MB" },
      { label: "Formats", value: ".docx · .pdf" },
      { label: "Archiving", value: "PDF/A-2b + SHA-256" },
      { label: "Dependencies", value: "Zero runtime crates" },
    ],
    href: "https://github.com/Nour-yahyaoui/rustpad",
  },
  {
    slug: "oneclick",
    title: "OneClick — Point of Sale",
    question: "What breaks when the internet does, and how do you design around it?",
    paragraphs: [
      "A phone-shop till has unforgiving requirements: it must open at 8am with no internet, in French, Arabic (right-to-left) or English, and it must not lose a single sale. OneClick is one Rust binary that does all of that on the machine behind the counter.",
      "Its defining idea is inventory that fills itself. Scan a barcode the shop never entered, answer two questions, and the sale completes while the product sheet is created behind it — no blocked queue, no \"I'll add it later\", no phantom stock at the end of the month.",
      "Money is stored as integer millimes, never floats, so the books can't drift by fractions. Owner authentication is Argon2id; cash sessions reconcile into a Z report; customer debts live in a carnet; and every action is written to an audit journal.",
      "It has survived a full trading day in a real shop, which is a stricter test than any test suite — and the suite is there too.",
    ],
    proofPoints: [
      { label: "Release", value: "v1.0.10" },
      { label: "Money", value: "Integer millimes" },
      { label: "Languages", value: "FR · AR (RTL) · EN" },
      { label: "Auth", value: "Argon2id owner account" },
    ],
    href: "https://github.com/Nour-yahyaoui/onclick",
  },
];

export const emeraldSections = [
  { id: "intro", index: "01", label: "The short version" },
  { id: "capabilities", index: "02", label: "What I build" },
  { id: "work", index: "03", label: "Selected work" },
  { id: "deep-dives", index: "04", label: "Three in full" },
  { id: "lab", index: "05", label: "The lab" },
  { id: "process", index: "06", label: "How I work" },
  { id: "stack", index: "07", label: "Stack constellation" },
  { id: "journey", index: "08", label: "Journey" },
  { id: "numbers", index: "09", label: "By the numbers" },
  { id: "faq", index: "10", label: "Questions" },
  { id: "contact", index: "11", label: "Contact" },
];
