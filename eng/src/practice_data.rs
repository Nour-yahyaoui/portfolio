//! Practice Questions, Interactive Tech-Lead Simulation Drills,
//! Real-World Engineering Examples, and Starter Notes.

use crate::models::{
    Difficulty, EngineeringExample, PracticeQuestion, SimulationDrill, StarterNote,
};

pub static PRACTICE_QUESTIONS: &[PracticeQuestion] = &[
    // ENG-101
    PracticeQuestion {
        id: "q-101-1",
        course_slug: "systems-foundations",
        category: "Invariants & Concurrency",
        difficulty: Difficulty::Foundational,
        scenario: "A university event has 30 seats left. At 12:00 PM, 200 students click 'Register' at the same second. Your handler runs `SELECT count(*) FROM registrations WHERE event_id = $1`, sees 70/100, and runs `INSERT INTO registrations`.",
        question: "What happens in production, and what is the cleanest fix?",
        options: &[
            "Postgres automatically blocks concurrent SELECTs; nothing goes wrong.",
            "Dozens of concurrent requests read 70/100 simultaneously and over-register the event past 100. Fix with an atomic `UPDATE events SET seats_taken = seats_taken + 1 WHERE id = $1 AND seats_taken < capacity` inside the registration transaction.",
            "Add `setTimeout` of 500ms on the React button.",
            "Move the `if count < 100` check into client-side localStorage.",
        ],
        correct_index: 1,
        explanation: "A plain `SELECT` under default `READ COMMITTED` isolation does not prevent concurrent readers from seeing the same stale count. An atomic conditional `UPDATE ... WHERE seats_taken < capacity` serializes writes on that row safely.",
    },
    PracticeQuestion {
        id: "q-101-2",
        course_slug: "systems-foundations",
        category: "State Machines",
        difficulty: Difficulty::Foundational,
        scenario: "A teammate proposes adding `is_submitted: bool`, `is_approved: bool`, `is_rejected: bool`, and `needs_revision: bool` columns to the `student_projects` table.",
        question: "Why should you flag this as a `blocker:` in design review?",
        options: &[
            "Boolean columns use 10 GB of disk space per row.",
            "Four booleans create 16 combinations—including impossible states like `is_approved = true AND is_rejected = true`. A single `status` enum (`Draft | Submitted | NeedsRevision | Approved | Rejected`) makes illegal states impossible.",
            "SQL databases do not support `WHERE` clauses on booleans.",
            "Booleans break CSS dark mode.",
        ],
        correct_index: 1,
        explanation: "Mutually exclusive lifecycle stages belong in one explicit state enum/column with defined transitions, eliminating contradictory flag combinations.",
    },
    PracticeQuestion {
        id: "q-101-3",
        course_slug: "systems-foundations",
        category: "Idempotency",
        difficulty: Difficulty::Intermediate,
        scenario: "A store cashier on spotty 4G taps 'Complete Cash Sale' twice because the spinner froze for 3 seconds. Two identical HTTP POST requests reach your backend.",
        question: "How do you guarantee only one sale is recorded and inventory is decremented once?",
        options: &[
            "Disable the button in CSS only—network retries never happen on mobile.",
            "Have the POS client generate a UUID `idempotency_key` when the cart opens, send it on POST, and enforce `UNIQUE(store_id, idempotency_key)` inside the sale DB transaction, returning the existing receipt on conflict.",
            "Reject all requests from mobile networks.",
            "Delete duplicate sales manually every Friday night.",
        ],
        correct_index: 1,
        explanation: "UI button disabling helps UX, but mobile OSes/proxies still retry dropped TCP responses. Server-side idempotency keys enforced atomically in the DB make retries 100% safe.",
    },
    // ENG-201
    PracticeQuestion {
        id: "q-201-1",
        course_slug: "decision-making",
        category: "One-Way vs Two-Way Doors",
        difficulty: Difficulty::Intermediate,
        scenario: "Your team is starting a new B2B SaaS app and has two decisions on Monday morning: (1) Whether every database table requires `organization_id` vs. assuming single-user accounts forever; (2) Whether toast notifications appear top-right or bottom-right.",
        question: "How should you allocate engineering review time between (1) and (2)?",
        options: &[
            "Spend 30 minutes on each so everything is fair.",
            "(1) is a classic One-Way Door—retrofitting multi-tenancy later touches every query and auth check, so invest 1 hour writing a clear ADR. (2) is a 2-minute Two-Way Door—pick bottom-right and move on.",
            "Build a custom notification positioning physics engine first.",
            "Delay both decisions for two weeks.",
        ],
        correct_index: 1,
        explanation: "Multi-tenant data isolation shapes every table, index, and permission boundary (expensive to retrofit), whereas UI toast placement changes in one line of config.",
    },
    PracticeQuestion {
        id: "q-201-2",
        course_slug: "decision-making",
        category: "Architecture Trade-Offs",
        difficulty: Difficulty::Intermediate,
        scenario: "A developer wants to split a 3-person team's new MVP into 7 microservices with Kafka + Kubernetes from Day 1 'so it scales later', even though launch traffic is 200 daily active users.",
        question: "What is your call as Tech Lead?",
        options: &[
            "Approve it—more services always means cleaner engineering.",
            "Build a modular monolith in one deployable service with strict internal module boundaries, backed by Postgres, and set an explicit ADR revisit trigger (e.g., independent team scaling >15 engineers or isolated CPU bottleneck).",
            "Remove all module folders and put 20,000 lines in `index.js`.",
            "Use 3 microservices instead of 7 as a random compromise.",
        ],
        correct_index: 1,
        explanation: "For a 3-person team, distributed microservices multiply deployment, debugging, and distributed-transaction cost by 5x while solving zero current bottlenecks. A modular monolith preserves clean boundaries without network tax.",
    },
    PracticeQuestion {
        id: "q-201-3",
        course_slug: "decision-making",
        category: "Scope Negotiation",
        difficulty: Difficulty::Intermediate,
        scenario: "On Tuesday, the founder asks for automated PDF monthly statements, custom brand logos per PDF, AND WhatsApp auto-delivery by Thursday evening.",
        question: "Which response applies the 3-Option Engineering Negotiation rule?",
        options: &[
            "'No way, pick another week.'",
            "'Sure!' (then silently ship broken PDFs with wrong numbers on Thursday midnight).",
            "Offer 3 clear options: (A) Accurate downloadable PDF statement live Thursday, custom logos + WhatsApp Monday; (B) Web printable statement + manual WhatsApp share link Thursday; (C) Full automated suite next Wednesday.",
            "Stop writing tests so all three ship half-tested on Thursday.",
        ],
        correct_index: 2,
        explanation: "You protect financial data accuracy (non-negotiable) while giving the founder real business choices on timeline vs. automation breadth.",
    },
    // ENG-301
    PracticeQuestion {
        id: "q-301-1",
        course_slug: "task-shaping",
        category: "Spikes vs Delivery",
        difficulty: Difficulty::Intermediate,
        scenario: "You need to add offline barcode scanning via smartphone camera on budget Android browsers, and nobody on the team knows if `BarcodeDetector` API works reliably across Samsung/Xiaomi browsers.",
        question: "What is the very first ticket you create?",
        options: &[
            "A 5-point feature ticket assigned to your junior dev due tomorrow: 'Implement full barcode inventory scanner'.",
            "A strictly timeboxed 2-hour Spike ticket: 'Test native BarcodeDetector vs ZXing WASM fallback on 3 target Android browsers; output 10-line decision + delivery ticket breakdown.'",
            "Rewrite the web app in Java Android Studio immediately.",
            "Wait until the end of the sprint to test on a real phone.",
        ],
        correct_index: 1,
        explanation: "Hardware/browser support is an external unknown. A 2-hour Spike eliminates the unknown on Day 1 before you commit UI and sprint plans around a broken assumption.",
    },
    PracticeQuestion {
        id: "q-301-2",
        course_slug: "task-shaping",
        category: "Shoveled-Path Specs",
        difficulty: Difficulty::Foundational,
        scenario: "You write a ticket for a teammate: 'Add password reset endpoint.' Two days later they open a 900-line PR that also refactored login sessions, added SMS 2FA stubs, and used plain SHA-1.",
        question: "What missing parts of your ticket caused this?",
        options: &[
            "You forgot to write the ticket in all caps.",
            "Missing Non-Goals (no session/SMS changes), missing Security/Codebase Pointers (token hashing with SHA-256 + 30m TTL + rate limit pattern), and missing Definition of Done.",
            "Password reset always requires 900 lines.",
            "You should never delegate backend tickets.",
        ],
        correct_index: 1,
        explanation: "Vague 4-word tickets force developers to invent scope and security rules alone. Explicit Non-Goals + security invariants + codebase pointers prevent rework.",
    },
    PracticeQuestion {
        id: "q-301-3",
        course_slug: "task-shaping",
        category: "Task Sizing",
        difficulty: Difficulty::Intermediate,
        scenario: "During sprint planning, a developer estimates their single ticket 'Build Employee Shift & Payroll Module' at 6 full days.",
        question: "What should you do before starting the sprint?",
        options: &[
            "Approve the 6-day ticket and check back next Monday.",
            "Decompose it into 4–5 <1-day shippable slices: (1) Shift schema + overlap invariant unit tests, (2) Create/list shifts API, (3) Weekly schedule grid UI, (4) Hours summary calculation + export.",
            "Tell them they must finish the exact same 6-day scope in 2 days.",
            "Assign 4 developers to edit the same payroll file simultaneously.",
        ],
        correct_index: 1,
        explanation: "6-day monolith tickets hide blockers until Day 5. Daily <1-day slices merge cleanly, surface edge cases early, and keep momentum visible.",
    },
    // ENG-401
    PracticeQuestion {
        id: "q-401-1",
        course_slug: "team-task-division",
        category: "Parallelism",
        difficulty: Difficulty::Intermediate,
        scenario: "Monday 09:00: You have 1 Backend dev and 1 Frontend dev building a 'Course Progress Dashboard' due Wednesday.",
        question: "Which sequence ships fastest with the fewest integration bugs?",
        options: &[
            "Backend codes Mon–Tue while Frontend waits; Frontend crams all UI Wednesday afternoon.",
            "Both build separate guesses without talking and reconcile field names Wednesday night.",
            "09:00–09:30: Lock exact `GET /api/progress` JSON contract (including 0%-new-user empty state) and commit a mock fixture. 09:30–Tue: Backend builds SQL aggregations while Frontend builds charts + empty/error states in parallel. Wed AM: Connect & verify.",
            "Have both developers pair on CSS colors for two days.",
        ],
        correct_index: 2,
        explanation: "A 30-minute Day-1 contract + mock fixture turns a sequential 4-day chain into a parallel 2-day build with near-zero integration surprises.",
    },
    PracticeQuestion {
        id: "q-401-2",
        course_slug: "team-task-division",
        category: "Critical Path",
        difficulty: Difficulty::Intermediate,
        scenario: "Four tasks exist: [A: Auth Context & Tenant Guard (3h)] blocks [B: Store Settings (6h)], [C: Inventory CRUD (8h)], and [D: Sales Report (6h)]. You also have [E: Landing Page Footer (2h)] with zero dependents.",
        question: "Which task MUST start at 09:00 Day 1 and get immediate PR review?",
        options: &[
            "Task E (Landing Page Footer) because it's easy and feels rewarding.",
            "Task A (Auth Context & Tenant Guard) because it sits at the root of the Critical Path and unblocks three parallel streams (B, C, D).",
            "Let everyone start B, C, and D with hardcoded `tenant_id = 1` and rewrite auth next month.",
            "Hold a 3-hour meeting about Task E.",
        ],
        correct_index: 1,
        explanation: "Unblocking high-fan-out root dependencies (`Task A`) immediately multiplies the parallel capacity of the entire team.",
    },
    PracticeQuestion {
        id: "q-401-3",
        course_slug: "team-task-division",
        category: "Merge Conflict Prevention",
        difficulty: Difficulty::Intermediate,
        scenario: "Three developers are adding three new settings tabs (`Profile`, `Billing`, `Notifications`) on the same day.",
        question: "How do you structure the work so they don't hit brutal Git merge conflicts at 17:00?",
        options: &[
            "Have all three write 400 lines directly inside `app/settings/page.tsx`.",
            "Commit a 30-line tab shell in `settings/page.tsx` first that imports `<ProfileTab/>`, `<BillingTab/>`, and `<NotificationsTab/>` from three separate files—each dev owns their own isolated file.",
            "Tell Dev 2 and Dev 3 not to code today.",
            "Disable Git branches and edit files over FTP.",
        ],
        correct_index: 1,
        explanation: "Creating a tiny shell seam first gives each engineer an isolated file boundary, eliminating merge conflicts completely.",
    },
    // ENG-501
    PracticeQuestion {
        id: "q-501-1",
        course_slug: "technical-leadership",
        category: "Code Review Culture",
        difficulty: Difficulty::Advanced,
        scenario: "A mid-level teammate submits a 220-line PR. You spot 1 missing tenant authorization check (security bug) and 4 stylistic preferences on local variable names.",
        question: "How do you write the review so they learn fast without feeling nitpicked?",
        options: &[
            "Leave 5 unmarked comments so they have to guess which one is critical.",
            "Mark the missing tenant check clearly as `blocker: Verify resource.store_id == session.store_id before update (prevents cross-store mutation)` with a test suggestion, and mark at most 1–2 helpful renames as `nit: (non-blocking)`.",
            "Approve it anyway and hope nobody exploits the missing auth check.",
            "Comment 'Sloppy code, read the docs' and close the PR.",
        ],
        correct_index: 1,
        explanation: "Separating true security/invariant `blocker:` items from optional `nit:` notes teaches engineering rigor while keeping reviews respectful and actionable.",
    },
    PracticeQuestion {
        id: "q-501-2",
        course_slug: "technical-leadership",
        category: "Incident Response",
        difficulty: Difficulty::Advanced,
        scenario: "A junior developer's migration + code deploy causes a spike in 502 errors in production. They look terrified in Slack.",
        question: "What are your exact actions in the first 10 minutes and the next morning?",
        options: &[
            "Ask 'How could you miss this?!' in public chat while users see 502s.",
            "First 5 min: Calmly say 'No stress, happens to all of us—rolling back deploy now to restore service.' Next morning: Run a blameless post-mortem asking why staging/CI didn't catch the migration issue, and pair with the junior to ship the automated check.",
            "Ban juniors from ever deploying again.",
            "Hide the outage from the founder.",
        ],
        correct_index: 1,
        explanation: "Fast rollback protects users; calm psychological safety + systemic CI guardrails turns a scary mistake into permanent team resilience.",
    },
    PracticeQuestion {
        id: "q-501-3",
        course_slug: "technical-leadership",
        category: "Early Alignment",
        difficulty: Difficulty::Intermediate,
        scenario: "You assign a tricky PDF export feature to a developer on Monday morning, due Wednesday.",
        question: "Which leadership habit prevents discovering on Wednesday afternoon that they built it the wrong way?",
        options: &[
            "Ping them every 12 minutes asking 'Are you done yet?'",
            "Agree at kickoff: 'Spend 60 minutes mapping your approach + function contract and drop a 6-line outline / draft PR before lunch so we lock alignment in 5 minutes.'",
            "Never talk to them until Thursday.",
            "Write half the code on a competing branch.",
        ],
        correct_index: 1,
        explanation: "The 20% Draft Check aligns architecture in 5 minutes without hovering or micromanaging.",
    },
    // ENG-601
    PracticeQuestion {
        id: "q-601-1",
        course_slug: "rust-backend-architecture",
        category: "Zero-Panic Rust",
        difficulty: Difficulty::Advanced,
        scenario: "In an Actix-Web handler, you see `let page: usize = query.get(\"page\").unwrap().parse().unwrap();`.",
        question: "What happens if someone requests `/courses?page=abc`, and what is the idiomatic Rust fix?",
        options: &[
            "Rust automatically converts `'abc'` to `1`.",
            "`.unwrap()` panics the worker task on malformed user input! Instead use typed `web::Query<CourseFilter>` with `Option<usize>` / `unwrap_or(1)` or return `Result<HttpResponse, AppError>` mapping bad input to `400 Bad Request`.",
            "Wrap the entire server in `unsafe {}`.",
            "Nothing—`usize::parse` never fails.",
        ],
        correct_index: 1,
        explanation: "User-controlled HTTP query/path/JSON inputs are untrusted boundaries; parse into typed structs with graceful defaults or 400 errors, never `.unwrap()`.",
    },
    PracticeQuestion {
        id: "q-601-2",
        course_slug: "rust-backend-architecture",
        category: "Type-Driven Design",
        difficulty: Difficulty::Intermediate,
        scenario: "You are modeling a task assignment in Rust: a task can be `Unassigned`, `Assigned` (must have `assignee_id` and `due_day`), or `Completed` (must have `assignee_id`, `pr_url`, and `completed_at`).",
        question: "Which Rust data model enforces those exact invariants at compile time?",
        options: &[
            "A single struct with `status: String` and five `Option<String>` fields.",
            "An `enum TaskStatus { Unassigned, Assigned { assignee_id: UserId, due_day: String }, Completed { assignee_id: UserId, pr_url: String, completed_at: u64 } }`.",
            "A `HashMap<String, String>`.",
            "Three global mutable arrays.",
        ],
        correct_index: 1,
        explanation: "Rust sum-type enums attach fields strictly to the variant where they exist, making `Completed` without a `pr_url` a compile error.",
    },
    PracticeQuestion {
        id: "q-601-3",
        course_slug: "rust-backend-architecture",
        category: "Cloud Deployment",
        difficulty: Difficulty::Foundational,
        scenario: "You deploy an Actix-Web app inside `/eng` to Render. Locally `HttpServer::new(...).bind((\"127.0.0.1\", 8080))` worked fine.",
        question: "What exact binding change is required so Render's router can reach your service?",
        options: &[
            "Hardcode `127.0.0.1:80` with root privileges.",
            "Read `std::env::var(\"PORT\")` (fallback `8080`) and bind `(\"0.0.0.0\", port)` across all network interfaces.",
            "Disable async/await.",
            "Switch HTTP to UDP.",
        ],
        correct_index: 1,
        explanation: "Cloud container platforms route external traffic to the container's `0.0.0.0:$PORT` interface, never `127.0.0.1`.",
    },
];

pub static SIMULATION_DRILLS: &[SimulationDrill] = &[
    SimulationDrill {
        id: "drill-flash-drop",
        code: "DRILL-01",
        course_slug: "systems-foundations",
        title: "The Friday Night Flash Drop (50 Jackets / 2,000 Buyers)",
        role_context: "You are the Tech Lead. Your founder wants Junior Dev Sami to ship naive `if stock > 0 -> pay -> stock - 1` before Friday 20:00.",
        situation: "2,000 Instagram followers will tap Buy at 20:00:00 for 50 limited jackets. External card checkout takes 30–90 seconds on mobile.",
        prompts: &[
            "1. List at least 3 exact production failure scenarios with `if stock > 0 -> pay -> decrement`.",
            "2. Write the 3 non-negotiable Domain Invariants (`INV-01`..`INV-03`).",
            "3. Define the exact Reservation / Order states and what happens when someone closes their phone on the payment screen.",
        ],
        rubric_points: &[
            "Identified TOCTOU overselling when hundreds pass `stock > 0` concurrently before any webhook finishes.",
            "Identified inventory lockup (abandoned tabs) vs. crash gap between card charge and order creation.",
            "Defined strict invariant: `confirmed + unexpired_reserved <= 50` at all times.",
            "Designed explicit `RESERVED` state with TTL (e.g., 10 min) AND payment gateway expiry slightly shorter (e.g., 8–9 min).",
            "Included webhook idempotency using gateway event/intent ID.",
        ],
        staff_reference_html: r#"<p><strong>Staff Engineer Reference Breakdown:</strong></p>
<ul>
  <li><strong>3 Production Failures Killed:</strong> (1) <em>Concurrent Oversell</em>—300 requests read <code>stock=50</code> in the first second and all get payment links; (2) <em>Abandoned Cart DoS</em>—holding stock without TTL lets 50 bots/window-shoppers freeze the drop at 0 sales; (3) <em>Crash / Retry Drift</em>—duplicate payment webhooks decrement stock twice or crash loses a paid order.</li>
  <li><strong>Invariants:</strong> <code>INV-01: sold_count + active_reserved_count &lt;= 50</code>; <code>INV-02: Every payment session maps 1:1 to a persisted OrderIntent created BEFORE redirect</code>; <code>INV-03: Webhook processing is idempotent on event_id</code>.</li>
  <li><strong>State Flow:</strong> Atomic SQL reserve creates <code>RESERVED (expires_at = +10m)</code> and payment session <code>expires_at = +8m</code>. If buyer closes phone, gateway link dies at 8m and sweeper/lazy query releases stock back to <code>AVAILABLE</code> at 10m with zero late-payment collision.</li>
</ul>"#,
    },
    SimulationDrill {
        id: "drill-shoveled-ticket",
        code: "DRILL-02",
        course_slug: "task-shaping",
        title: "Rewrite a Vague Ticket into a 'Shoveled-Path' Spec",
        role_context: "You are delegating a backend + UI task to Yassine, a smart Junior Developer who joined the codebase 2 weeks ago.",
        situation: "The founder dropped a 6-word card on the board: 'Let club admins export event attendees.' Events have up to 800 students, and clubs must NEVER export another club's attendees.",
        prompts: &[
            "1. Write Context / Why in 2 crisp sentences.",
            "2. Define clear In-Scope items AND at least 3 explicit Non-Goals so Yassine finishes in <5 hours.",
            "3. Specify Contract, Security Edge Cases (cross-club auth, 0 attendees, CSV formula injection), and a self-check Definition of Done.",
        ],
        rubric_points: &[
            "Explicit Non-Goals (e.g., NO PDF/Excel styling, NO custom column picker modal, NO async email queue needed for <=800 rows).",
            "Exact endpoint contract (`GET /api/clubs/{club_id}/events/{event_id}/attendees.csv`, headers, UTF-8 BOM or clean columns).",
            "Tenant isolation rule: verify `session.user` is Admin of `club_id` AND `event.club_id == club_id` (return 403/404).",
            "Edge cases covered: 0 attendees (header-only CSV, not 500 error) + sanitizing leading `=`, `+`, `-`, `@` in CSV cells.",
            "Clear Definition of Done test checklist before PR review.",
        ],
        staff_reference_html: r#"<p><strong>Staff Engineer Reference Spec:</strong></p>
<ul>
  <li><strong>Why:</strong> Club leads check students in at the door offline and need a reliable roster spreadsheet in one click.</li>
  <li><strong>In-Scope:</strong> <code>GET /api/clubs/:club_id/events/:event_id/attendees.csv</code> streaming <code>name,email,status,registered_at</code> + 'Export CSV' button on Event Admin header.</li>
  <li><strong>Non-Goals:</strong> No `.xlsx` or PDF generation, no column-selection dialog, no background job queue (800 rows serializes in &lt;8ms).</li>
  <li><strong>Security &amp; Edge Cases:</strong> Enforce club-admin membership check (404 if event belongs to another club); return valid 1-line header CSV when 0 attendees; escape quotes &amp; prefix CSV-injection characters (<code>=+-@</code>).</li>
</ul>"#,
    },
    SimulationDrill {
        id: "drill-team-division",
        code: "DRILL-03",
        course_slug: "team-task-division",
        title: "Slice & Assign a 4-Engineer Sprint with Zero Waiting",
        role_context: "Monday 09:00 Kickoff. Deadline: Friday 16:00. Team: You (Tech Lead), Amira (Strong Backend Mid), Karim (Frontend Mid), Sami (Junior Full-Stack).",
        situation: "Build a 'Store Coupon & Checkout Discount' feature: merchants create percentage/fixed coupons with max-uses & expiry; shoppers apply coupons at checkout; merchants see redemption count.",
        prompts: &[
            "1. What happens in the first 45 minutes on Monday morning to unlock everyone?",
            "2. Break the feature into 5–6 bounded tasks, map the Critical Path, and assign each task to You, Amira, Karim, or Sami (explaining WHY).",
            "3. How do you ensure zero Git merge conflicts and catch integration bugs before Thursday?",
        ],
        rubric_points: &[
            "Monday 09:00–09:45: Lock DB invariants + JSON contracts (`POST /checkout/preview-coupon`, `POST /admin/coupons`) + commit stub fixtures.",
            "Amira (Strong Backend) owns atomic coupon redemption counter (`uses_count < max_uses`) + discount integer math tests.",
            "Karim (Frontend Mid) owns shopper checkout coupon input, applied/expired/maxed-out error states against the Day-1 contract.",
            "Sami (Junior) owns bounded Merchant Coupon List & Create table following existing CRUD pattern (isolated route/files).",
            "You (Lead) ship the Day-1 schema/stub skeleton before noon, prioritize unblocking PR reviews, and verify end-to-end staging integration Wednesday noon.",
        ],
        staff_reference_html: r#"<p><strong>Staff Engineer Sprint Orchestration:</strong></p>
<ul>
  <li><strong>09:00–09:45 Day 1:</strong> Team locks coupon data contract (integer minor units, error codes <code>COUPON_EXPIRED</code>, <code>MAX_USES_REACHED</code>) + Lead merges migration &amp; stub handler by 11:00 AM.</li>
  <li><strong>Parallel Streams (Zero File Overlap):</strong>
    <br/>&bull; <strong>Amira:</strong> Pure discount math + atomic redemption lock in <code>src/coupons/engine.rs</code> + integration tests.
    <br/>&bull; <strong>Karim:</strong> Checkout discount box &amp; error UX in <code>components/checkout/CouponBox.tsx</code>.
    <br/>&bull; <strong>Sami:</strong> Merchant CRUD list + redemption badge in <code>app/dashboard/coupons/</code> (Shoveled-Path spec copying <code>products/</code>).
    <br/>&bull; <strong>You (Lead):</strong> Review PRs within 2h, wire feature flag, run Wednesday 12:00 end-to-end staging check.</li>
</ul>"#,
    },
    SimulationDrill {
        id: "drill-wednesday-rescue",
        code: "DRILL-04",
        course_slug: "technical-leadership",
        title: "Wednesday Crisis: Slipping Deadline + PR Ego Clash",
        role_context: "It is Wednesday 14:00 before a Friday client launch. Two problems hit your desk at the same time.",
        situation: "(1) Payment webhook signature verification hit an undocumented gateway quirk and took an extra day—leaving insufficient time for custom email template theming + multi-admin audit logs. (2) Amira and Karim have traded 14 heated comments on a PR arguing over error JSON format.",
        prompts: &[
            "1. How do you end the 14-comment PR thread in under 10 minutes without crushing either engineer?",
            "2. Write the exact 3-Option scope message you send the client today (Wednesday 15:00) instead of waiting until Friday.",
        ],
        rubric_points: &[
            "Moves PR debate off text comments into a 5-minute live huddle; classifies JSON wrapper style as a fast tie-break, picks one standard, documents it in 4 lines, asks both to commit.",
            "Never compromises payment webhook signature security.",
            "Messages client Wednesday (48h early) with working preview + 3 concrete options cutting cosmetic email theming / audit UI to Monday v1.1 while launching rock-solid payments Friday.",
        ],
        staff_reference_html: r#"<p><strong>Staff Engineer Playbook:</strong></p>
<ul>
  <li><strong>10-Minute PR Tie-Break:</strong> Text threads amplify ego after 3 replies. Hop on a 5-min call: acknowledge both valid points, pick the format that matches existing endpoints, add 4 lines to <code>CONVENTIONS.md</code>, and merge today.</li>
  <li><strong>Wednesday Client Comms:</strong> Show momentum first (<em>"Core checkout &amp; verified gateway security are passing in staging"</em>), then offer <strong>Option A (Recommended):</strong> Launch live Friday 16:00 with clean plain-brand receipt emails, ship custom theme editor + audit log Tuesday; <strong>Option B:</strong> Push full bundle to Tuesday. Clients always respect early control over Friday surprises.</li>
</ul>"#,
    },
];

pub static ENGINEERING_EXAMPLES: &[EngineeringExample] = &[
    EngineeringExample {
        id: "ex-shoveled-ticket",
        code: "EX-01",
        course_slug: "task-shaping",
        artifact_type: "Task Spec",
        title: "Vague Ticket vs. 'Shoveled-Path' Engineering Ticket",
        summary: "See how adding Non-Goals, Codebase Pointers, and Error Contracts turns a confusing 3-day struggle into a clean 3-hour PR.",
        bad_approach: "Ticket #88: Add webhook endpoint for payment provider so orders update when paid. Assign: Junior Dev.",
        engineer_approach_html: r#"<pre class="eng-code">### Ticket #88: Idempotent Payment Captured Webhook (`POST /api/webhooks/payments`)

WHY: Customers who close their browser tab right after card 3DS still need their order confirmed reliably.

IN SCOPE:
1. Verify `X-Signature` HMAC-SHA256 using `PAYMENT_WEBHOOK_SECRET` on raw request bytes.
2. Parse `payment.captured` event; ignore other event types with `200 OK`.
3. Atomically insert `webhook_events(event_id)` + transition `OrderIntent` `Reserved -&gt; Confirmed`.

NON-GOALS (Out of Scope):
- Do NOT handle `payment.refunded` yet (Ticket #91).
- Do NOT send confirmation emails synchronously inside the webhook handler (enqueue job only).

POINTERS &amp; EDGE CASES:
- Copy HMAC helper in `src/security/hmac.rs`.
- Invalid/missing signature -&gt; `401 Unauthorized` (do NOT parse JSON before verifying HMAC!).
- Duplicate `event_id` -&gt; return `200 OK` without error so provider stops retrying.

DEFINITION OF DONE:
- [ ] Test 1: Bad HMAC returns 401 and leaves order `Reserved`.
- [ ] Test 2: Valid payload transitions `Reserved -&gt; Confirmed`.
- [ ] Test 3: Replaying identical payload 3x returns 200 and increments sales count only ONCE.</pre>"#,
        note_markdown_template: "# Ticket: [Feature Slice Name]\n\n## 1. Context / Why\n- \n\n## 2. In-Scope vs. Non-Goals\n- **In-Scope:** \n- **Non-Goals (Do NOT build):** \n\n## 3. Codebase Pointers & Contract\n- Pattern reference: ``\n- Input / Output: \n\n## 4. Edge Cases & Security\n- Unauthorized: \n- Duplicate / Retry: \n- Empty / Timeout: \n\n## 5. Definition of Done\n- [ ] Automated test for invariant\n- [ ] Self-tested locally\n",
    },
    EngineeringExample {
        id: "ex-adr-record",
        code: "EX-02",
        course_slug: "decision-making",
        artifact_type: "ADR",
        title: "1-Page ADR: Postgres Row Locking vs. Redis for Flash Inventory",
        summary: "A complete, honest Architecture Decision Record with constraints, rejected options, accepted trade-offs, and a quantitative revisit trigger.",
        bad_approach: "Slack message: 'Let's add Redis + BullMQ + 2 worker containers tonight because Postgres is slow for counters.' (Zero benchmarks, introduces dual-write drift 48h before launch.)",
        engineer_approach_html: r#"<pre class="eng-code"># ADR-004: Atomic Postgres Reservations Over Redis Cache
Status: Accepted | Owner: Tech Lead | Revisit Trigger: &gt; 2,500 write TPS on single SKU

CONTEXT:
Friday flash drop expects 2,000 peak buyers/min (~33 req/sec) for 50 units. 3 days until launch.

DECISION:
Use single-statement conditional `UPDATE products SET available = available - 1 WHERE id = $1 AND available &gt; 0` inside the same Postgres transaction that inserts `reservations(expires_at)`.

WHY NOT REDIS RIGHT NOW?
- Dual-writing Redis + Postgres introduces split-brain bugs when the app crashes between Redis `DECR` and Postgres `INSERT`.
- Postgres handles ~3,000+ locked row updates/sec on NVMe—100x our actual Friday load.

ACCEPTED TRADE-OFFS:
- Hot-row lock contention if a single SKU ever exceeds ~2,500 concurrent writes/sec.
- Mitigated by indexed PK lookup and keeping zero network calls inside the DB transaction.</pre>"#,
        note_markdown_template: "# ADR-00X: [Decision Title]\n- **Status:** Proposed | Accepted\n- **Date:** \n- **Revisit Trigger:** [Exact metric when we reconsider]\n\n## Context & Hard Constraints\n- \n\n## Options Considered\n1. **Option A:** \n2. **Option B:** \n\n## Decision & Accepted Downsides\n- Chosen: \n- Downsides we explicitly accept: \n",
    },
    EngineeringExample {
        id: "ex-sprint-dag",
        code: "EX-03",
        course_slug: "team-task-division",
        artifact_type: "Sprint DAG",
        title: "4-Engineer Parallel Sprint Plan & Critical Path Map",
        summary: "How to turn a 10-day sequential backlog into a calm 4-day parallel sprint with zero idle developers.",
        bad_approach: "Day 1–3: Dev A builds DB & API while Devs B, C, D wait. Day 4: Everyone collides in 14 merge conflicts.",
        engineer_approach_html: r#"<pre class="eng-code">DAY 1 (09:00 - 11:00) — CRITICAL PATH UNLOCK [Lead + Backend]
└─► Lock OpenAPI/JSON types + merge Walking Skeleton (`0.0.0.0:$PORT`, auth stub, mock fixtures)

DAY 1 (11:00) - DAY 3 — FOUR ISOLATED PARALLEL TRACKS
├─► Track 1 [Backend Mid]  : `src/domain/booking.rs` — Atomic seat capacity + SQL tests
├─► Track 2 [Frontend Mid] : `src/ui/BookingFlow`    — Form, countdown, 409 SoldOut state
├─► Track 3 [Junior Dev]   : `src/ui/MyTickets`      — Read-only ticket list + QR view
└─► Track 4 [Tech Lead]    : Payment HMAC webhook + fast PR reviews (&lt;2h turnaround)

DAY 3 NOON — STAGING INTEGRATION CHECKPOINT
└─► Flip mock flag off -&gt; verify real end-to-end flow 48 hours BEFORE Friday deadline.</pre>"#,
        note_markdown_template: "# Milestone Parallel Plan: [Name]\n\n## Day-1 Morning Unlock (< 2 Hours)\n- [ ] Shared types / JSON contract committed\n- [ ] Mock fixture / stub endpoint merged\n\n## Parallel Tracks (Zero File Overlap)\n- **Dev 1 (High Ambiguity / Core Invariants):** \n- **Dev 2 (Vertical UX Slice):** \n- **Dev 3 (Bounded Pattern Slice):** \n- **Lead (Unblocking + Glue + Reviews):** \n\n## 50% Mid-Sprint Checkpoint\n- Target staging verification time: \n",
    },
    EngineeringExample {
        id: "ex-pr-review",
        code: "EX-04",
        course_slug: "technical-leadership",
        artifact_type: "PR Review",
        title: "Toxic/Vague PR Review vs. High-Signal Tech Lead Review",
        summary: "Side-by-side comparison of review comments that stall teams vs. comments that ship safe code fast.",
        bad_approach: "'Why did you write it like this?? Change `res` variable name, move this helper, also check permissions.' (Requests changes without severity labels; blocks PR for 2 days.)",
        engineer_approach_html: r#"<pre class="eng-code">praise: Great integration test on `test_duplicate_registration_rejected` — super clean setup!

blocker (security): On line 54, `DELETE /api/notes/{id}` deletes by `id` alone without checking `AND user_id = session.user_id`. Any logged-in user could delete another user's note by guessing the ID.
  -&gt; Fix: pass `(note_id, session.user_id)` into `repo::delete_note` and return `404` if 0 rows affected.

suggestion (non-blocking): We can extract this date formatter into `lib/time.rs` in a follow-up if `Progress` page needs it too.

nit (non-blocking): `ttl` -&gt; `ttl_seconds` makes units unmistakable at the call site.

Once the `user_id` ownership check + 1 cross-user test is added, ping me and I'll merge within 15 minutes!</pre>"#,
        note_markdown_template: "## PR Review Checklist\n- [ ] **Invariants & Auth:** Can User A read/mutate User B's data?\n- [ ] **Failure Modes:** What happens on timeout, retry, empty list, or malformed input?\n- [ ] **Tests:** Do tests verify real behavior rather than tautological mocks?\n- [ ] **Labels applied:** Every comment prefixed with `blocker:`, `suggestion:`, `nit:`, or `praise:`.\n",
    },
    EngineeringExample {
        id: "ex-postmortem",
        code: "EX-05",
        course_slug: "technical-leadership",
        artifact_type: "Post-Mortem",
        title: "Blameless Incident Post-Mortem: Duplicate Webhook Charges",
        summary: "How elite engineering teams document an incident in 25 lines so the system becomes permanently immune.",
        bad_approach: "'Post-mortem: Sami forgot to check duplicate webhooks. Action item: Tell developers to be more careful next time.' ('Be more careful' fails 100% of the time.)",
        engineer_approach_html: r#"<pre class="eng-code"># INC-012: Duplicate Order Confirmation Emails on Gateway Retry
Date: 2026-11-20 | Duration: 14 min | Impact: 9 buyers received 2 receipt emails (0 double charges)

TIMELINE (UTC):
- 19:02 Deploy #114 added slower PDF attachment generation (3.4s) inside webhook handler.
- 19:05 Payment gateway timed out at 3.0s and retried `payment.captured` webhooks.
- 19:12 Alert fired on duplicate email metric; Lead rolled back to Deploy #113 at 19:16.

ROOT CAUSE (Systemic, Not Human):
1. Webhook handler performed slow synchronous PDF work before returning `200 OK`.
2. `processed_webhooks(event_id)` deduplication check ran AFTER email dispatch instead of in an initial DB transaction.

PERMANENT GUARDRAILS (Owned Action Items):
- [x] Record `event_id` with `PRIMARY KEY` constraint in &lt;10ms, enqueue background email job, return `200 OK` immediately (@Amira, PR #116).
- [x] Add automated replay test asserting 3 identical webhook POSTs enqueue exactly 1 email (@Sami, PR #117).</pre>"#,
        note_markdown_template: "# Post-Mortem: [Incident Title]\n- **Impact & Duration:** \n- **Time to Rollback / Mitigate:** \n\n## Timeline\n- `HH:MM` — \n\n## Systemic Root Cause (Why guardrails allowed it)\n- \n\n## Permanent Engineering Action Items\n- [ ] [Automated test / lint / constraint] — Owner: \n",
    },
    EngineeringExample {
        id: "ex-rust-boundary",
        code: "EX-06",
        course_slug: "rust-backend-architecture",
        artifact_type: "Rust Boundary",
        title: "Pure Rust Domain State Machine vs. Actix HTTP Adapter",
        summary: "Real idiomatic Rust code showing compile-time state safety, zero `.unwrap()`, and a clean 15-line Actix handler.",
        bad_approach: "Putting 200 lines of nested `if/else`, `.unwrap()`, and SQL/HTML strings directly inside an `async fn` Actix route where unit testing requires booting TCP sockets.",
        engineer_approach_html: r#"<pre class="eng-code">// 1. PURE DOMAIN CORE (`domain.rs` — zero HTTP imports, tests run in 1ms!)
#[derive(Debug, PartialEq, Eq)]
pub enum TicketState {
    Draft,
    Ready { estimated_hours: u8 },
    Completed { pr_number: u32 },
}

#[derive(Debug, PartialEq, Eq)]
pub enum TransitionError {
    EstimateExceedsOneDay { hours: u8 },
    CannotCompleteFromDraft,
}

impl TicketState {
    pub fn mark_ready(self, hours: u8) -&gt; Result&lt;Self, TransitionError&gt; {
        if hours == 0 || hours &gt; 8 {
            return Err(TransitionError::EstimateExceedsOneDay { hours });
        }
        Ok(Self::Ready { estimated_hours: hours })
    }

    pub fn complete(self, pr_number: u32) -&gt; Result&lt;Self, TransitionError&gt; {
        match self {
            Self::Ready { .. } =&gt; Ok(Self::Completed { pr_number }),
            Self::Draft =&gt; Err(TransitionError::CannotCompleteFromDraft),
            Self::Completed { pr_number } =&gt; Ok(Self::Completed { pr_number }), // Idempotent!
        }
    }
}</pre>"#,
        note_markdown_template: "# Rust Module Boundary Sketch\n\n## Domain Types & Invariants (`domain.rs`)\n```rust\npub enum State {\n    \n}\n```\n\n## Typed Error Catalogue\n```rust\npub enum DomainError {\n    \n}\n```\n",
    },
    EngineeringExample {
        id: "ex-scope-matrix",
        code: "EX-07",
        course_slug: "decision-making",
        artifact_type: "Scope Matrix",
        title: "Stakeholder Scope Negotiation Matrix (Friday Launch Rescue)",
        summary: "Exact written artifact used to turn a risky 3-week wish-list into a calm, high-trust 4-day v1.0 launch.",
        bad_approach: "Saying 'Yes' to all 11 features on Monday and telling the client on Friday at 19:00 that nothing is deployed.",
        engineer_approach_html: r#"<pre class="eng-code">LAUNCH SCOPE MATRIX — Client Sign-off (Monday 14:00)

P0 — SHIPS FRIDAY 16:00 (Non-Negotiable Core Loop &amp; Invariants)
  [x] Atomic seat registration + capacity hard cap
  [x] Organizer CSV roster export (tenant-isolated)
  [x] Mobile confirmation screen + QR pass

P1 — SHIPS NEXT TUESDAY (Fast-Follow v1.1 — Zero Blocker to Launch)
  [ ] Custom club theme colors &amp; banner cropper
  [ ] Automated 24h reminder cron email

P2 — DEFERRED UNTIL VALIDATED BY REAL USAGE
  [ ] Multi-stage bracket tournament generator</pre>"#,
        note_markdown_template: "# Scope Matrix: [Release Name]\n\n## P0 — Must Ship (Core Value + Non-Negotiable Invariants)\n- [ ] \n\n## P1 — Fast-Follow (v1.1 within 3–5 days)\n- [ ] \n\n## P2 — Explicit Non-Goals for Now\n- \n",
    },
];

pub static STARTER_NOTES: &[StarterNote] = &[
    StarterNote {
        id: "note-engineer-checklist",
        title: "Pre-Code Engineer Checklist (Before Touching Any File)",
        course_slug: "systems-foundations",
        tag: "Architecture",
        content: "# Pre-Code Engineer Checklist\n\nBefore writing a single line of implementation code, answer these 4 questions in plain words:\n\n1. **Invariants:** What truth must NEVER become false (even under concurrency or crash)?\n2. **State Machine:** What are the exact states and valid transitions? Where can something get stuck forever without a TTL?\n3. **Failure & Retry:** What happens if the user double-clicks, the network drops, or a webhook fires 3 times?\n4. **Contract Seam:** What is the exact input type, output type, and error enum?",
    },
    StarterNote {
        id: "note-shoveled-template",
        title: "My Shoveled-Path Ticket Template for Delegating",
        course_slug: "task-shaping",
        tag: "Team",
        content: "# Ticket: [Short Action Title]\n\n- **Why (2 lines):** \n- **In-Scope:** \n- **Non-Goals (Do NOT touch):** \n- **Codebase Pointers:** See `src/...` for existing pattern.\n- **Edge Cases:** Auth (403/404), Empty state, Retry/Idempotency.\n- **Definition of Done:**\n  - [ ] Automated invariant test passes\n  - [ ] Verified empty + error states locally",
    },
    StarterNote {
        id: "note-rust-learnings",
        title: "Rust & Actix Patterns Inside `the-factory`",
        course_slug: "rust-backend-architecture",
        tag: "ADR",
        content: "# Studying `/eng/src` in This Repo\n\n- `models.rs`: Static slices (`&'static [Course]`) keep curriculum data in binary read-only memory (`0` startup heap allocations) + custom safe `<script>` JSON escaping (`<\\/`).\n- `icons.rs`: Exhaustive `match` over `enum Icon` means a typo'd icon name is a compile-time error.\n- `main.rs`: Thin Actix-Web routes binding `0.0.0.0:$PORT` for Render with `GET /health`.",
    },
];
