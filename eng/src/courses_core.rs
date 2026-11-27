//! Core Engineering Courses (`ENG-101`, `ENG-201`, `ENG-301`).
//!
//! Covers:
//! 1. Thinking in Invariants, State Machines, Contracts & Failure Modes before writing code.
//! 2. Making fast, defensible engineering & scope decisions (One-Way/Two-Way doors, ADRs).
//! 3. Shaping unambiguous "Shoveled-Path" tasks so any developer finishes easily.

use crate::models::{Course, Difficulty, InlineCheck, Lesson, LessonSection, Module, Subject};

pub static CORE_COURSES: &[Course] = &[
    // =========================================================================
    // ENG-101 — Systems Thinking & Software Engineering Foundations
    // =========================================================================
    Course {
        slug: "systems-foundations",
        code: "ENG-101",
        title: "Systems Thinking & Engineering Foundations",
        subtitle: "Replace trial-and-error coding with invariants, explicit state machines, contracts, and failure-first design.",
        subject: Subject::SystemsDesign,
        difficulty: Difficulty::Foundational,
        thumbnail_kind: "systems",
        prerequisites: &[],
        phase: 1,
        outcomes: &[
            "Write non-negotiable system invariants before touching database schemas or UI.",
            "Model multi-step business workflows as explicit state machines with safe timeouts.",
            "Spot race conditions, duplicate webhooks, and partial failures before shipping.",
            "Choose high-ROI automated tests at system boundaries instead of brittle mocks.",
        ],
        modules: &[
            Module {
                code: "MOD-101.1",
                title: "Thinking Before Typing",
                goal: "Stop jumping into files immediately; define truths and state transitions first.",
                lessons: &[
                    Lesson {
                        slug: "invariants-and-state-machines",
                        code: "LES-101.1",
                        title: "Invariants & State Machines First",
                        summary: "Why 'if stock > 0' explodes under real traffic, and how engineers model laws + state transitions before writing a single line of code.",
                        duration_min: 18,
                        engineer_law: "Never write logic until you can state in one sentence what must NEVER become false — even if two servers crash mid-request.",
                        sections: &[
                            LessonSection {
                                anchor: "coder-vs-engineer",
                                heading: "1. Coder Brain vs. Engineer Brain",
                                body_html: r#"<p>When a solo coder hears a feature request—for example, selling <strong>50 limited-edition jackets</strong> during an Instagram flash drop—they immediately picture happy-path steps: <code>if stock &gt; 0</code> &rarr; redirect to payment &rarr; on success decrement stock and insert an order.</p>
<p>An engineer pauses and asks what happens when <strong>2,000 concurrent requests</strong> hit that check at 20:00:00.400 while external card payments take 45 seconds to complete:</p>
<table class="eng-table">
  <thead>
    <tr><th>Failure Mode</th><th>What Happens in Naive Code</th><th>Business Impact</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Time-of-Check to Time-of-Use (TOCTOU)</strong></td><td>400 users read <code>stock = 50</code> before the first payment returns; all 400 pay.</td><td>350 angry refunds, chargeback fees, ruined brand trust.</td></tr>
    <tr><td><strong>Abandoned Checkout</strong></td><td>If you decrement on click without an expiry timer, 50 window-shoppers close their tabs.</td><td>0 real sales while real buyers see "Sold Out".</td></tr>
    <tr><td><strong>Crash Between Payment &amp; DB</strong></td><td>Card gateway charges customer, server restarts before <code>INSERT INTO orders</code>.</td><td>Customer charged with zero order record in database.</td></tr>
  </tbody>
</table>"#,
                            },
                            LessonSection {
                                anchor: "defining-invariants",
                                heading: "2. Writing Non-Negotiable Invariants",
                                body_html: r#"<p>An <strong>Invariant</strong> is a mathematical conservation law of your domain. Every endpoint, background worker, and admin tool must preserve it:</p>
<div class="eng-callout">
  <div class="eng-callout-title">Flash-Drop Domain Invariants</div>
  <ul>
    <li><strong>INV-01 (No Oversell):</strong> <code>confirmed_orders + active_unexpired_reservations &lt;= 50</code> at every millisecond.</li>
    <li><strong>INV-02 (No Ghost Charge):</strong> Every captured payment references a pre-created <code>OrderIntent</code> ID before the user ever sees the payment form.</li>
    <li><strong>INV-03 (Conservation of Stock):</strong> Every unit of inventory is in exactly one state: <code>Available</code>, <code>Reserved(expires_at)</code>, or <code>Sold(order_id)</code>.</li>
  </ul>
</div>"#,
                            },
                            LessonSection {
                                anchor: "explicit-state-machine",
                                heading: "3. Designing the Explicit State Machine",
                                body_html: r#"<p>Instead of boolean flags (<code>is_paid</code>, <code>is_cancelled</code>, <code>is_expired</code>—which create 2<sup>3</sup> = 8 states, half of them nonsensical like <code>is_paid = true &amp;&amp; is_expired = true</code>), model a single explicit state column or enum:</p>
<pre class="eng-code">AVAILABLE
   │  [POST /reserve — atomic DB check &amp; lock]
   ▼
RESERVED (expires_at = now + 10m)
   ├──► [Webhook: payment.captured] ──► CONFIRMED
   ├──► [User clicks Cancel]        ──► RELEASED ──► AVAILABLE
   └──► [TTL Sweeper: now &gt; exp]    ──► EXPIRED  ──► AVAILABLE</pre>
<p>Notice one subtle edge case engineers catch immediately: <em>What if a user pays at minute 9:59 and the webhook arrives at 10:01 right after TTL expiry?</em> Either reject capture at the gateway using payment session <code>expires_at = 9m</code> (shorter than reservation <code>10m</code>!), or auto-refund cleanly if stock was already reassigned.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Write 2–4 numbered domain invariants (INV-01...) at the top of every spec.",
                            "Ban multiple booleans representing lifecycle stages; use one explicit State enum.",
                            "Always set payment gateway session expiry shorter than inventory reservation TTL.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Your inventory reservation expires after 10 minutes, and your payment gateway checkout link expires after 15 minutes. What failure did you just introduce?",
                            options: &[
                                "The database will run out of connections after 10 minutes.",
                                "A buyer can complete payment between minute 10 and 15 after their reserved unit was released to someone else.",
                                "Users on slow connections cannot load CSS.",
                                "Nothing — the webhook will force stock to -1 safely.",
                            ],
                            correct_index: 1,
                            explanation: "If the payment session outlives the inventory hold, a user paying at minute 12 pays real money for stock already sold to another buyer. Always enforce gateway_ttl < reservation_ttl.",
                        },
                    },
                    Lesson {
                        slug: "contracts-and-seams",
                        code: "LES-101.2",
                        title: "Designing Boundaries, Contracts & Seams",
                        summary: "How to split messy requirements into clean module boundaries with ironclad inputs, outputs, and error contracts.",
                        duration_min: 16,
                        engineer_law: "Good architecture is the art of drawing thin, strict doorways between messy rooms so changing one room never floods the house.",
                        sections: &[
                            LessonSection {
                                anchor: "what-is-a-seam",
                                heading: "1. What Is an Architectural Seam?",
                                body_html: r#"<p>A <strong>seam</strong> is a boundary where Module A talks to Module B exclusively through an explicit data contract—never by reaching into Module B's internal tables, global variables, or UI components.</p>
<p>Solo projects turn into spaghetti when HTTP request parsing, SQL queries, permission checks, and pricing math all live inside one 350-line route handler. Nobody else can work in that file without merge conflicts, and you cannot test pricing math without spinning up an HTTP server and database.</p>"#,
                            },
                            LessonSection {
                                anchor: "contract-checklist",
                                heading: "2. The 4 Elements of a Complete Contract",
                                body_html: r#"<p>Whenever two components (Frontend &harr; Backend, Service &harr; Payment Provider, Handler &harr; Domain Core) meet, write down four things:</p>
<ol>
  <li><strong>Exact Input Shape &amp; Validation Rules:</strong> Types, min/max bounds, normalization (e.g., trim + lowercase email, positive integer cents, never floating-point money!).</li>
  <li><strong>Preconditions (Auth &amp; State):</strong> Who is allowed to call this, and what state must the target resource currently be in?</li>
  <li><strong>Success Output Guarantee:</strong> Exact payload returned when preconditions pass.</li>
  <li><strong>Typed Failure Catalogue:</strong> Every expected domain error (<code>InsufficientStock</code>, <code>ReservationExpired</code>, <code>Forbidden</code>) mapped to deterministic behavior.</li>
</ol>
<pre class="eng-code">// Bad: leaky, untyped, floats for currency
fn checkout(user_id: String, amount: f64) -&gt; Result&lt;String, String&gt;

// Engineer Contract: explicit domain types &amp; exhaustive errors
fn reserve_item(cmd: ReserveCommand) -&gt; Result&lt;ReservationReceipt, ReserveError&gt;
// where amount is MinorUnits(i64) and ReserveError is an exhaustive enum</pre>"#,
                            },
                        ],
                        takeaways: &[
                            "Never store or pass money as floats (f64/number); always use integer minor units (cents/millimes).",
                            "Separate HTTP/UI transport types from pure domain logic functions.",
                            "Enumerate failure cases in the contract—errors are half of your API design.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Why do senior engineers insist on separating pure domain functions from HTTP handler code?",
                            options: &[
                                "To add more files so the repository looks enterprise-grade.",
                                "So business rules can be reasoned about, reused across CLI/workers/HTTP, and tested in milliseconds without network setup.",
                                "Because HTTP frameworks cannot execute arithmetic.",
                                "To avoid using TypeScript or Rust types.",
                            ],
                            correct_index: 1,
                            explanation: "When pricing, permission, or state-transition logic is pure (data in -> result out), unit tests run in <5ms, background jobs reuse the exact same rules, and juniors can work safely inside one layer.",
                        },
                    },
                ],
            },
            Module {
                code: "MOD-101.2",
                title: "Production Reality & Quality Gates",
                goal: "Design for retries, concurrency, and fast automated verification.",
                lessons: &[
                    Lesson {
                        slug: "failure-modes-and-idempotency",
                        code: "LES-101.3",
                        title: "Failure-First Design: Concurrency & Idempotency",
                        summary: "Networks drop packets, mobile users tap 'Pay' three times, and webhooks deliver at-least-once. Make repeating an operation harmless.",
                        duration_min: 17,
                        engineer_law: "In distributed systems, 'exactly-once delivery' does not exist — only 'at-least-once delivery' paired with an idempotent receiver.",
                        sections: &[
                            LessonSection {
                                anchor: "idempotency-mechanics",
                                heading: "1. Idempotency: Making Retries Safe",
                                body_html: r#"<p>An operation <code>f(x)</code> is <strong>idempotent</strong> if calling it once or calling it five times produces the exact same system state and returns the same outcome.</p>
<ul>
  <li><code>SET status = 'CONFIRMED'</code> is naturally idempotent.</li>
  <li><code>SET balance = balance - 5000</code> is <strong>NOT</strong> idempotent—running it twice steals 5,000 twice!</li>
</ul>
<div class="eng-callout">
  <div class="eng-callout-title">The Idempotency Key Pattern</div>
  <p>Generate a deterministic or client-supplied <code>idempotency_key</code> (e.g., <code>checkout:{order_intent_id}</code> or Stripe webhook <code>event_id</code>) with a <code>UNIQUE</code> database constraint inside the same transaction as the state mutation. If the second request arrives, catch the unique constraint or return the stored receipt.</p>
</div>"#,
                            },
                            LessonSection {
                                anchor: "atomic-updates",
                                heading: "2. Killing Race Conditions with Atomic Guarded Updates",
                                body_html: r#"<p>Never read a value into application memory, modify it in JS/Rust, and write it back without a guard. Push the invariant check directly into an atomic SQL conditional update or serializable lock:</p>
<pre class="eng-code">-- Bad (Race Condition):
SELECT stock FROM products WHERE id = $1; -- returns 1 to two concurrent requests
UPDATE products SET stock = 0 WHERE id = $1; -- both succeed!

-- Engineer Pattern (Atomic Guarded Mutation):
UPDATE products
   SET stock = stock - 1
 WHERE id = $1
   AND stock &gt; 0
RETURNING stock;
-- Exactly ONE concurrent caller gets 1 row updated; the 51st gets 0 rows!</pre>"#,
                            },
                        ],
                        takeaways: &[
                            "Every state-mutating POST endpoint and webhook consumer needs an idempotency strategy.",
                            "Move check-and-mutate operations into a single atomic database statement or locked transaction.",
                            "Set explicit timeouts on every outbound HTTP call—default infinite timeouts cause cascading outages.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "A payment gateway sends the same `payment.succeeded` webhook 3 times because your server timed out returning HTTP 200 on the first attempt. What ensures the user's subscription isn't extended by 3 months instead of 1?",
                            options: &[
                                "Adding a 2-second sleep before processing the webhook.",
                                "Recording the unique `webhook_event_id` in a table with a UNIQUE constraint inside the same DB transaction that extends the subscription.",
                                "Checking `if (req.headers['retry']) return` in frontend code.",
                                "Asking the gateway vendor to turn off retries.",
                            ],
                            correct_index: 1,
                            explanation: "Inserting `processed_events(event_id PRIMARY KEY)` inside the same ACID transaction guarantees that retries either roll back harmlessly or short-circuit with 200 OK.",
                        },
                    },
                    Lesson {
                        slug: "quality-gates-and-small-prs",
                        code: "LES-101.4",
                        title: "High-ROI Testing & Small-PR Discipline",
                        summary: "What to test when deadlines are tight, what NOT to test, and why 250-line PRs beat 2,000-line hero branches.",
                        duration_min: 14,
                        engineer_law: "Test behaviors and invariants at module boundaries — never mock so much that your tests pass while production burns.",
                        sections: &[
                            LessonSection {
                                anchor: "what-to-test",
                                heading: "1. Where Automated Tests Pay 10x Dividends",
                                body_html: r#"<p>Teams waste weeks writing brittle tests that assert CSS class names or mock out SQL queries, then ship critical billing bugs anyway. Allocate testing effort by blast radius:</p>
<table class="eng-table">
  <thead>
    <tr><th>Priority</th><th>Target</th><th>Test Style</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>P0 — Mandatory</strong></td><td>Money, permissions/tenancy isolation, state transitions, data invariants.</td><td>Fast pure domain unit tests + real-DB integration tests.</td></tr>
    <tr><td><strong>P1 — High Value</strong></td><td>API contract shapes, webhook idempotency, tricky edge-case parsers.</td><td>Endpoint contract tests (status codes + payload schema).</td></tr>
    <tr><td><strong>P2 — Selective</strong></td><td>One happy-path critical user journey (login &rarr; checkout).</td><td>1–3 lightweight end-to-end smoke checks.</td></tr>
  </tbody>
</table>"#,
                            },
                            LessonSection {
                                anchor: "small-pr-math",
                                heading: "2. Why Small PRs (<300 Lines) Ship Faster",
                                body_html: r#"<p>Give a reviewer a 1,800-line PR and they procrastinate for two days, skim it in 6 minutes, and comment <em>"LGTM"</em> while missing two security bugs. Give them a 180-line PR with a clear verification note and they review it deeply in 12 minutes.</p>
<p>Stack small, safe slices behind feature flags or unused routes: <strong>PR 1</strong> schema + domain logic + tests &rarr; <strong>PR 2</strong> API endpoint &rarr; <strong>PR 3</strong> UI wiring.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Prioritize testing money, auth boundaries, and state-machine invariants first.",
                            "Keep PRs under ~300 changed lines so teammates actually read every line.",
                            "Every PR description must answer: What changed, Why, and How I verified it.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "You have 90 minutes left for testing before shipping a multi-tenant invoicing endpoint. Which test gives the highest protection?",
                            options: &[
                                "Snapshot testing button padding in dark mode.",
                                "Mocking the database and testing that `saveInvoice()` was called once.",
                                "An integration test verifying User from Store A gets 403/404 when requesting Store B's invoice + verifying tax/total integer math.",
                                "Benchmarking JSON serialization for 10 million invoices.",
                            ],
                            correct_index: 2,
                            explanation: "Cross-tenant data leaks and wrong invoice totals are company-ending bugs. Real integration tests against authorization and financial invariants deliver maximum ROI.",
                        },
                    },
                ],
            },
        ],
    },
    // =========================================================================
    // ENG-201 — Engineering Decision-Making & Trade-Offs
    // =========================================================================
    Course {
        slug: "decision-making",
        code: "ENG-201",
        title: "Engineering Decision-Making & Trade-Offs",
        subtitle: "Make fast calls on reversible choices, rigorous ADRs on irreversible ones, and negotiate scope like a seasoned lead.",
        subject: Subject::DecisionMaking,
        difficulty: Difficulty::Intermediate,
        thumbnail_kind: "decisions",
        prerequisites: &["systems-foundations"],
        phase: 2,
        outcomes: &[
            "Distinguish One-Way Doors from Two-Way Doors in under 60 seconds.",
            "Write crisp 1-page ADRs that align a team without 2-hour circular debates.",
            "Spend 'innovation tokens' wisely instead of stacking five unfamiliar tools.",
            "Push back on impossible deadlines using the 3-Option Trade-Off method.",
        ],
        modules: &[
            Module {
                code: "MOD-201.1",
                title: "Speed vs. Rigor",
                goal: "Calibrate how much time a decision deserves based on blast radius and reversibility.",
                lessons: &[
                    Lesson {
                        slug: "one-way-vs-two-way-doors",
                        code: "LES-201.1",
                        title: "One-Way vs. Two-Way Doors",
                        summary: "Stop spending 3 hours arguing about folder names and 3 minutes designing database tenancy.",
                        duration_min: 15,
                        engineer_law: "Calibrate decision time strictly to reversal cost: 15 minutes for Two-Way Doors, deliberate written review for One-Way Doors.",
                        sections: &[
                            LessonSection {
                                anchor: "door-framework",
                                heading: "1. Classifying Decisions by Reversal Cost",
                                body_html: r#"<p>Inexperienced leads treat every decision with equal intensity—debating state-management libraries for days while rushing public API URLs and database primary keys.</p>
<table class="eng-table">
  <thead>
    <tr><th>Door Type</th><th>Examples in Software</th><th>How to Decide</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Two-Way Door</strong> (Cheap to undo in &lt;1 day)</td><td>Internal helper structure, CSS utility naming, internal admin UI layout, feature-flagged UX tweak.</td><td>Timebox to 15 min. Let the person building it pick, ship, and adjust if wrong.</td></tr>
    <tr><td><strong>One-Way Door</strong> (Weeks of migration or broken clients to undo)</td><td>Multi-tenant DB schema, public API/webhook payload, auth/encryption model, desktop file format, billing ledger structure.</td><td>Pause. Write a 1-page ADR, review edge cases with another engineer, verify migration path.</td></tr>
  </tbody>
</table>"#,
                            },
                            LessonSection {
                                anchor: "converting-doors",
                                heading: "2. Turning One-Way Doors into Two-Way Doors",
                                body_html: r#"<p>Great engineers actively convert scary One-Way Doors into safe Two-Way Doors using <strong>abstraction seams</strong>, <strong>versioned schemas</strong>, and <strong>feature flags</strong>. Unsure between two local LLM models or two email providers? Put a 20-line trait/interface seam in front of it—now switching providers tomorrow takes 10 minutes instead of rewriting 40 files.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Ask 'How painful is it to reverse this in 30 days?' before scheduling any meeting.",
                            "Timebox Two-Way Door debates to 15 minutes; pick one and keep momentum.",
                            "Wrap volatile third-party vendors behind a thin internal adapter trait/interface.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Two teammates have argued for 45 minutes in Slack over whether an internal dashboard chart should use bar charts or line charts. As Tech Lead, what do you do?",
                            options: &[
                                "Schedule a 1-hour architecture review for next Tuesday.",
                                "Identify it as a Two-Way Door: pick one in 2 minutes based on user goal, ship it today, and swap in 15 minutes if feedback says otherwise.",
                                "Build a custom charting engine from scratch so it supports 3D graphs.",
                                "Tell both developers to build separate branches and benchmark CPU usage.",
                            ],
                            correct_index: 1,
                            explanation: "Changing an internal UI chart component costs ~15 minutes—classic Two-Way Door. Protect team energy for irreversible schema and contract decisions.",
                        },
                    },
                    Lesson {
                        slug: "writing-1-page-adrs",
                        code: "LES-201.2",
                        title: "Writing Crisp 1-Page ADRs",
                        summary: "Every engineering choice has downsides. An ADR documents the context, options, and why you accepted specific downsides.",
                        duration_min: 16,
                        engineer_law: "There is no 'best architecture' — only the architecture whose specific failure modes hurt your business least right now.",
                        sections: &[
                            LessonSection {
                                anchor: "adr-template",
                                heading: "1. The 5-Block ADR Structure",
                                body_html: r#"<p>An <strong>Architecture Decision Record (ADR)</strong> lives in <code>docs/adr/001-title.md</code> and takes 20 minutes to write. Never exceed one screen:</p>
<pre class="eng-code"># ADR-004: Inventory Reservation Strategy for Flash Drops
Status: Accepted | Date: 2026-11-27 | Owner: Nour

1. CONTEXT &amp; CONSTRAINTS
   Peak 2,000 req/min on 50 items; team of 3 knows Postgres deeply; 4 days to launch; $0 new infra budget.

2. OPTIONS CONSIDERED
   - Option A: Postgres atomic row update + `reservations` table with TTL check.
   - Option B: Introduce Redis + Lua script + sync worker back to Postgres.
   - Option C: Queue every buyer into a virtual waiting room microservice.

3. DECISION
   Choose Option A (Postgres atomic conditional update + indexed `expires_at`).

4. TRADE-OFFS ACCEPTED (Why this is honest)
   + Zero new infrastructure or dual-write consistency bugs between Redis and Postgres.
   + Easily handles 2,000 req/min (~33 req/sec) on a single indexed row.
   - Would bottleneck above ~15,000 concurrent writes/sec on a single hot row (not our scale this year).

5. REVISIT TRIGGER
   Re-evaluate Option B only if single-SKU write contention exceeds 2,500 TPS.</pre>"#,
                            },
                            LessonSection {
                                anchor: "revisit-trigger",
                                heading: "2. The Secret Weapon: The Revisit Trigger",
                                body_html: r#"<p>Notice block #5: <strong>Revisit Trigger</strong>. Junior engineers over-engineer today for imaginary 10-million-user traffic ("What if we become Amazon?!"). Writing an explicit metric trigger (<em>"We stay on single Postgres until hot-SKU TPS &gt; 2,500"</em>) lets everyone choose the simple solution calmly knowing exactly when they'll upgrade.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Always list at least 2 realistic options—if there's only 1 option, it's a mandate, not a decision.",
                            "Explicitly write the downsides of your chosen option; hiding downsides destroys trust.",
                            "Add a quantitative 'Revisit Trigger' to stop premature scaling arguments immediately.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "What makes an ADR credible to senior engineers and future teammates?",
                            options: &[
                                "Using 12 UML diagrams and claiming the chosen option has zero disadvantages.",
                                "Stating hard constraints (team skill, deadline, load), comparing 2–3 real options, naming accepted downsides, and defining a revisit trigger.",
                                "Picking whichever technology appeared on Hacker News this morning.",
                                "Writing it 6 months after launch from memory.",
                            ],
                            correct_index: 1,
                            explanation: "Honest constraints + explicit accepted downsides + a measurable revisit trigger turn subjective opinion wars into calm engineering alignment.",
                        },
                    },
                ],
            },
            Module {
                code: "MOD-201.2",
                title: "Pragmatism, Tech Debt & Scope Negotiation",
                goal: "Protect delivery velocity and negotiate scope constructively with founders and clients.",
                lessons: &[
                    Lesson {
                        slug: "innovation-tokens-and-debt",
                        code: "LES-201.3",
                        title: "Innovation Tokens & Deliberate Tech Debt",
                        summary: "Why choosing boring tech for plumbing lets you innovate on product—and when technical debt is smart leverage vs. reckless mess.",
                        duration_min: 14,
                        engineer_law: "Every unfamiliar tool in your stack costs unknown 3 AM failure modes; spend complexity strictly where your product wins.",
                        sections: &[
                            LessonSection {
                                anchor: "boring-tech",
                                heading: "1. The Innovation Token Budget",
                                body_html: r#"<p>Dan McKinley's famous rule: every startup or project starts with roughly <strong>3 innovation tokens</strong>. If you spend them on an experimental database, a custom auth protocol, AND a bleeding-edge message broker simultaneously, you have zero tokens left for your actual product—and nobody on your team knows how those tools fail under load.</p>
<p>Default to battle-tested tools with well-understood failure modes (e.g., PostgreSQL, standard HTTP/JSON, Actix/Next.js) unless a measurable requirement proves they cannot do the job.</p>"#,
                            },
                            LessonSection {
                                anchor: "good-vs-bad-debt",
                                heading: "2. Strategic Debt vs. Sloppy Mess",
                                body_html: r#"<div class="eng-callout">
  <div class="eng-callout-title">Two Very Different Things Called "Tech Debt"</div>
  <ul>
    <li><strong>Deliberate Leverage (Good):</strong> Shipping an admin CSV export button instead of a custom analytics builder to validate customer demand this week—while keeping data schemas and permissions clean.</li>
    <li><strong>Reckless Mess (Bad):</strong> Skipping auth checks, copy-pasting billing math in 6 files, or using floats for money. That never speeds you up past Tuesday afternoon.</li>
  </ul>
</div>"#,
                            },
                        ],
                        takeaways: &[
                            "Cut UI polish or automate ops later when rushing—NEVER cut data integrity or auth invariants.",
                            "Log deliberate shortcuts as tracked follow-up tickets before closing the milestone.",
                            "When learning a new language (like Rust!), keep external crate dependencies minimal so you master fundamentals.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "You need to ship an MVP in 5 days. Which shortcut is smart 'deliberate debt' rather than reckless mess?",
                            options: &[
                                "Storing passwords in plain text and hashing them next sprint.",
                                "Handling the 2 rare refund requests per week via a protected admin button + SQL audit log instead of building automated self-serve partial refund UI on Day 1.",
                                "Skipping foreign keys and database transactions so inserts are faster to type.",
                                "Hardcoding API keys inside client-side bundles.",
                            ],
                            correct_index: 1,
                            explanation: "Manual-assisted admin operations behind clean data integrity save days of UI/workflow work safely, whereas security or schema shortcuts create irreversible damage.",
                        },
                    },
                    Lesson {
                        slug: "scope-negotiation",
                        code: "LES-201.4",
                        title: "Negotiating Scope with the 3-Option Rule",
                        summary: "Never say 'Impossible' and never silently say 'Yes' to a doomed deadline. Present concrete engineering trade-offs.",
                        duration_min: 15,
                        engineer_law: "When Time and Quality are fixed, Scope is the only honest variable. Make stakeholders choose the trade-off explicitly.",
                        sections: &[
                            LessonSection {
                                anchor: "three-option-rule",
                                heading: "1. Why 'No' and Blind 'Yes' Both Fail",
                                body_html: r#"<p>Founders and clients ask for 3 weeks of work by Friday because they don't see the hidden plumbing underneath the UI. If you just say <em>"No, takes 3 weeks"</em>, you look uncooperative. If you say <em>"Okay, we'll try"</em>, your team works until 3 AM, ships bugs, and misses Friday anyway.</p>
<p>Instead, respond within 1 hour with <strong>Three Concrete Options</strong>:</p>
<pre class="eng-code">"To make sure Friday's launch is rock-solid and never loses an order, here are our 3 realistic paths:

• OPTION A — Ship Core Value Friday (Recommended):
  Single-item checkout + card payment + email receipt live Friday 17:00.
  Promo codes &amp; PDF invoice customization ship Wednesday.

• OPTION B — Hybrid Ops Friday:
  Checkout + manual promo discount link live Friday; refunds handled via dashboard tool until Tuesday.

• OPTION C — Full Scope (Every Requested Feature):
  Ships next Thursday with full test coverage.

Which option best fits Friday's business goal?"</pre>
<p>95% of the time, the stakeholder happily picks <strong>Option A</strong>—and trusts you twice as much because you protected their launch.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Never negotiate quality/security invariants away; negotiate feature breadth and automation polish.",
                            "Translate engineering effort into business outcomes stakeholders actually care about.",
                            "Put scope agreements in writing right after the conversation so everyone shares one reality.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "A client asks on Wednesday for a full multi-currency loyalty points system by Friday morning. What is the strongest Tech Lead response?",
                            options: &[
                                "'Sure, no problem!' and hope the team pulls two all-nighters.",
                                "'That's impossible, our codebase isn't ready.'",
                                "Present 3 options: (A) Launch Friday with core checkout + record points in DB ledger, ship redemption UI Tuesday; (B) Launch Friday with flat launch discount code; (C) Full loyalty engine next Friday.",
                                "Stop answering messages until Friday afternoon.",
                            ],
                            correct_index: 2,
                            explanation: "Giving 3 concrete options puts the business owner in control of the trade-off while keeping engineering quality non-negotiable.",
                        },
                    },
                ],
            },
        ],
    },
    // =========================================================================
    // ENG-301 — Shaping Tasks So Anyone Finishes Easily
    // =========================================================================
    Course {
        slug: "task-shaping",
        code: "ENG-301",
        title: "Shaping Tasks So Anyone Finishes Easily",
        subtitle: "Turn vague, anxiety-inducing feature requests into crisp 'Shoveled-Path' specs that developers complete smoothly on the first try.",
        subject: Subject::TaskShaping,
        difficulty: Difficulty::Intermediate,
        thumbnail_kind: "tasks",
        prerequisites: &["systems-foundations"],
        phase: 2,
        outcomes: &[
            "Diagnose why tasks stall before blaming developer speed.",
            "Separate 2-hour research Spikes from deterministic Delivery tickets.",
            "Write 5-part 'Shoveled-Path' tickets with explicit Non-Goals and Code Pointers.",
            "Slice multi-day work into <1-day verifiable increments.",
        ],
        modules: &[
            Module {
                code: "MOD-301.1",
                title: "Killing Uncertainty Before Assignment",
                goal: "Eliminate hidden landmines before handing a task to a teammate.",
                lessons: &[
                    Lesson {
                        slug: "why-tasks-stall",
                        code: "LES-301.1",
                        title: "Why Developers Actually Get Stuck",
                        summary: "When a '4-hour ticket' drags into Day 4, 90% of the time the developer hit unmapped decisions—not slow typing.",
                        duration_min: 16,
                        engineer_law: "Ambiguity delegated to implementation time multiplies in cost by 5x. Kill ambiguity before the ticket enters the sprint.",
                        sections: &[
                            LessonSection {
                                anchor: "four-task-killers",
                                heading: "1. The 4 Hidden Task Killers",
                                body_html: r#"<p>Watch what happens when you assign a ticket that just says: <em>"Add CSV import for store products."</em></p>
<ol>
  <li><strong>Hidden Product Questions:</strong> What if a SKU already exists—overwrite price, skip row, or fail the whole CSV? What max file size? Which encodings?</li>
  <li><strong>Codebase Archaeology:</strong> A junior spends 5 hours hunting through 40 files trying to guess where validation lives.</li>
  <li><strong>Gold-Plating / Scope Creep:</strong> Without explicit Non-Goals, the dev starts building a drag-and-drop column-mapping wizard nobody asked for.</li>
  <li><strong>No Self-Test Recipe:</strong> They don't know how to verify edge cases locally, so they push broken code and bounce through 6 rounds of PR review.</li>
</ol>"#,
                            },
                        ],
                        takeaways: &[
                            "If you cannot picture the exact files, data contract, and error behavior of a ticket in 2 minutes, neither can your developer.",
                            "Every unanswered product edge case inside a ticket becomes a silent 4-hour stall or a wrong guess.",
                            "Clarity is kindness—and the #1 multiplier of team throughput.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "A mid-level developer has been '80% done' on 'Add Team Invites' for 3 days. What is almost always the root cause?",
                            options: &[
                                "They forgot basic HTML syntax.",
                                "They hit unshaped edge cases mid-flight (expired tokens, inviting an existing user, revoking invites, email failure) that weren't bounded in the ticket.",
                                "Their laptop needs twice as much RAM.",
                                "They didn't attend enough status meetings.",
                            ],
                            correct_index: 1,
                            explanation: "Unbounded workflows explode mid-implementation as hidden states appear. Shaping states and non-goals upfront prevents the 'forever 80% done' trap.",
                        },
                    },
                    Lesson {
                        slug: "spikes-vs-delivery",
                        code: "LES-301.2",
                        title: "Separating Timeboxed Spikes from Delivery",
                        summary: "Never estimate or assign an unknown as a normal feature ticket. Run a 2-hour Spike to turn unknowns into knowns.",
                        duration_min: 16,
                        engineer_law: "Never put a deadline on fog. Timebox a short Spike to map the terrain; estimate delivery only after the fog clears.",
                        sections: &[
                            LessonSection {
                                anchor: "spike-protocol",
                                heading: "1. What Is an Engineering Spike?",
                                body_html: r#"<p>Suppose your client wants thermal receipt printing from the browser, or PDF forensic redaction, and nobody on the team has touched that API before. Asking <em>"How many days will this take?"</em> produces pure fiction.</p>
<div class="eng-callout">
  <div class="eng-callout-title">The 2-Hour Spike Ticket Rules</div>
  <ul>
    <li><strong>Strict Timebox:</strong> Max 2–4 hours (never open-ended "research").</li>
    <li><strong>Specific Question to Answer:</strong> e.g., <em>"Prove whether WebUSB prints UTF-8 Arabic + French text on 80mm ESC/POS printers on Chrome Windows, or if we need a local bridge."</em></li>
    <li><strong>Output Deliverable:</strong> Throwaway 40-line proof script + a 10-line summary naming the exact library/protocol and resulting delivery tickets. Throwaway spike code NEVER merges straight to <code>main</code>!</li>
  </ul>
</div>"#,
                            },
                        ],
                        takeaways: &[
                            "Separate 'figuring out if/how something works' (Spike) from 'building it cleanly' (Delivery).",
                            "Always put a hard clock (e.g., 120 minutes) and concrete yes/no questions on every Spike.",
                            "Discard messy prototype spike code and implement clean production tickets from what you learned.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "What should the deliverable of a 2-hour Spike ticket be?",
                            options: &[
                                "A 1,500-line untested PR merged directly into production.",
                                "Nothing written down—just 'Yeah I think it works'.",
                                "A tiny proof-of-concept verifying the riskiest unknown + a short written note defining the exact implementation tickets.",
                                "A 40-slide PowerPoint deck.",
                            ],
                            correct_index: 2,
                            explanation: "A Spike buys certainty cheaply: prove the risky boundary works, write down findings in 10 lines, and spawn clean, predictable delivery tickets.",
                        },
                    },
                ],
            },
            Module {
                code: "MOD-301.2",
                title: "The Shoveled-Path Ticket Method",
                goal: "Write crystal-clear task specs that make completion feel effortless.",
                lessons: &[
                    Lesson {
                        slug: "shoveled-path-anatomy",
                        code: "LES-301.3",
                        title: "Anatomy of a 'Shoveled-Path' Ticket",
                        summary: "The 5-section template that cuts developer confusion, Slack ping-pong, and PR rework by 80%.",
                        duration_min: 20,
                        engineer_law: "A great ticket clears the snow off the driveway: the developer puts their energy into clean execution, not guessing where the road is.",
                        sections: &[
                            LessonSection {
                                anchor: "five-sections",
                                heading: "1. The 5-Section Ticket Template",
                                body_html: r#"<p>Copy this exact checklist whenever creating a task for a teammate (or even for tomorrow-you!):</p>
<pre class="eng-code">### 1. Context / Why (2 sentences)
Store managers accidentally delete active products. Soft-deleting lets them archive items without breaking historical order receipts.

### 2. In-Scope vs. Non-Goals
IN SCOPE:
- Add nullable `archived_at TIMESTAMPTZ` on `products`.
- Hide archived products from `/api/catalog` while keeping them visible on past orders.
NON-GOALS (Do NOT build in this ticket):
- Do NOT build a "Trash Bin / Restore" UI screen yet (that is Ticket #142).
- Do NOT cascade-delete historical `order_items`.

### 3. Codebase Pointers &amp; Contract
- Follow existing pattern in `src/catalog/categories.rs` (lines 42–78).
- Endpoint: `DELETE /api/products/{id}` -&gt; sets `archived_at = NOW()`, returns `204 No Content`.
- Calling `DELETE` on an already-archived product must be idempotent (`204`, not `500`).

### 4. Edge Cases &amp; Error States
- Unauthorized / wrong store tenant -&gt; `404 Not Found` (do not leak existence).
- Product currently inside an active cart -&gt; reject checkout with `409 ProductUnavailable`.

### 5. Definition of Done (Self-Check Before Opening PR)
- [ ] Integration test covers: archive -&gt; hidden from catalog -&gt; past order still renders title.
- [ ] Idempotent double-DELETE test passes.
- [ ] `cargo test` &amp; linter green.</pre>"#,
                            },
                            LessonSection {
                                anchor: "why-nongoals-matter",
                                heading: "2. Why 'Non-Goals' Are Pure Magic",
                                body_html: r#"<p>Notice Section 2: <strong>Non-Goals</strong>. Ambitious developers naturally spot adjacent ideas while coding (<em>"Ooh, I should also build bulk-restore and an undo toast!"</em>) and turn a 3-hour task into a 3-day rabbit hole. Explicit Non-Goals give them permission to stop cleanly and ship.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Always include explicit Non-Goals to prevent well-intentioned scope creep.",
                            "Give 1–2 file/line pointers for junior/mid devs so they match existing architecture immediately.",
                            "Write a Definition of Done checklist the dev runs BEFORE requesting your review.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Which single section in a ticket prevents a conscientious developer from turning a 3-hour backend task into a 3-day full-stack refactor?",
                            options: &[
                                "Adding 'URGENT!!!' to the title.",
                                "Explicit Non-Goals stating what is intentionally out of scope (and which future ticket covers it).",
                                "Removing the Context section so they don't think.",
                                "Assigning story points in Fibonacci decimals.",
                            ],
                            correct_index: 1,
                            explanation: "Non-Goals draw a sharp fence around the work so developers ship the exact slice needed today without feeling they left something unfinished.",
                        },
                    },
                    Lesson {
                        slug: "one-day-slicing-rule",
                        code: "LES-301.4",
                        title: "The 1-Day Completeness Rule",
                        summary: "How to split intimidating 5-day features into crisp 3-to-6-hour tasks that build unstoppable daily momentum.",
                        duration_min: 18,
                        engineer_law: "Any single task estimated over 1.5 days is hiding at least two smaller tasks and an unspoken assumption. Split it.",
                        sections: &[
                            LessonSection {
                                anchor: "splitting-patterns",
                                heading: "1. Four Proven Ways to Split a Large Task",
                                body_html: r#"<table class="eng-table">
  <thead>
    <tr><th>Splitting Lever</th><th>Before (5-Day Monster)</th><th>After (Three 4-Hour Tasks)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Read before Write</strong></td><td>"Full Analytics &amp; Export Module"</td><td>1) Read-only KPI query + API &rarr; 2) Dashboard cards UI &rarr; 3) CSV download endpoint.</td></tr>
    <tr><td><strong>Happy Path Invariant &rarr; Rich UX</strong></td><td>"Complete Team Role System"</td><td>1) Backend RBAC guard + tests &rarr; 2) Basic invite/remove member table &rarr; 3) Role audit log.</td></tr>
    <tr><td><strong>Zero-External &rarr; External Integration</strong></td><td>"Stripe Billing + Webhooks + Emails"</td><td>1) Internal ledger state machine &rarr; 2) Checkout session redirect &rarr; 3) Idempotent webhook + receipt queue.</td></tr>
    <tr><td><strong>Hardcoded Rule &rarr; Configurable UI</strong></td><td>"Custom Store Tax Engine"</td><td>1) Pure tax calculator with config struct &rarr; 2) DB persistence &rarr; 3) Settings form UI.</td></tr>
  </tbody>
</table>"#,
                            },
                        ],
                        takeaways: &[
                            "Keep individual tasks between 2 and 6 hours of focused work (~1 PR per day).",
                            "Daily merged PRs create psychological momentum and reveal blockers on Day 1 instead of Day 5.",
                            "Each sub-task must leave `main` green and deployable—never break `main` mid-feature.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Why should every sliced sub-task leave the `main` branch compiling and passing tests even before the full feature is visible to users?",
                            options: &[
                                "So other teammates are never blocked by broken builds and hotfixes can deploy to production at any minute.",
                                "Because Git refuses to commit files over 500 lines.",
                                "So you don't have to write tests at all.",
                                "Only open-source libraries need green builds.",
                            ],
                            correct_index: 0,
                            explanation: "Trunk/main health is sacred: small green merges avoid multi-day merge-conflict nightmares and keep production releasable at any moment.",
                        },
                    },
                ],
            },
        ],
    },
];
