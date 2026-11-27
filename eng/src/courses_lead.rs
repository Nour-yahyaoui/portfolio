//! Team Execution, Leadership & Rust Architecture Courses (`ENG-401`, `ENG-501`, `ENG-601`).

use crate::models::{Course, Difficulty, InlineCheck, Lesson, LessonSection, Module, Subject};

pub static LEAD_COURSES: &[Course] = &[
    // =========================================================================
    // ENG-401 — Dividing Work Across a Team (Zero Bottlenecks)
    // =========================================================================
    Course {
        slug: "team-task-division",
        code: "ENG-401",
        title: "Dividing Work Across a Team (Zero Bottlenecks)",
        subtitle: "Orchestrate 3–6 developers in parallel using Day-1 contracts, vertical walking skeletons, critical-path mapping, and skill matching.",
        subject: Subject::TeamExecution,
        difficulty: Difficulty::Intermediate,
        thumbnail_kind: "parallel",
        prerequisites: &["decision-making", "task-shaping"],
        phase: 3,
        outcomes: &[
            "Unlock parallel Frontend + Backend + DB work in 30 minutes using Contract-First mocks.",
            "Ship a thin end-to-end Walking Skeleton on Day 1 instead of integrating on Friday night.",
            "Identify the Critical Path in any milestone and keep unblocking work moving.",
            "Assign tasks across Juniors, Mids, and Seniors based on ambiguity—not ego.",
        ],
        modules: &[
            Module {
                code: "MOD-401.1",
                title: "Parallelism by Design",
                goal: "Stop Developer B from waiting 3 days for Developer A to finish an endpoint.",
                lessons: &[
                    Lesson {
                        slug: "contract-first-parallelism",
                        code: "LES-401.1",
                        title: "Contract-First Parallelism (The 30-Minute Unlock)",
                        summary: "How a 30-minute JSON/Type agreement on Monday 09:30 lets Frontend and Backend move at full speed simultaneously.",
                        duration_min: 18,
                        engineer_law: "Never serialize people when you can serialize a 40-line JSON contract on Day 1.",
                        sections: &[
                            LessonSection {
                                anchor: "serial-anti-pattern",
                                heading: "1. The Serial Waterfall Trap Inside 'Agile' Teams",
                                body_html: r#"<p>Watch how most inexperienced teams waste half a 5-day sprint:</p>
<ul>
  <li><strong>Mon–Wed:</strong> Backend dev designs schema and builds API; Frontend dev sits idle or builds fake guesses with wrong field names (<code>userName</code> vs <code>full_name</code>).</li>
  <li><strong>Thu–Fri:</strong> Frontend finally connects to Backend; 14 field/error mismatches explode at 18:00 Friday.</li>
</ul>"#,
                            },
                            LessonSection {
                                anchor: "thirty-minute-contract",
                                heading: "2. The Monday 09:30 Contract Lock",
                                body_html: r#"<p>Instead, before anyone writes application code, Backend + Frontend + Lead spend <strong>30 minutes</strong> writing one shared contract file (OpenAPI, TypeScript types, or a stub route returning realistic JSON fixtures for success + empty + 422 error):</p>
<pre class="eng-code">// Agreed Monday 09:30 — Locked unless both devs approve a diff!
POST /api/v1/reservations
Request:  { "sku_id": "JKT-BLK-M", "quantity": 1, "idempotency_key": "uuid" }
201 OK:   { "reservation_id": "res_91a", "expires_at": "2026-11-27T20:10:00Z", "price_minor": 185000 }
409 Err:  { "error_code": "OUT_OF_STOCK", "message": "All units are currently reserved or sold." }</pre>
<p>By <strong>10:00 AM Monday</strong>, you merge a tiny stub endpoint (or MSW/JSON fixture) returning those exact payloads. Now Frontend builds loading, countdown timer, and out-of-stock states against the real contract while Backend builds atomic SQL locking in parallel. Integration on Wednesday takes <strong>15 minutes</strong>.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Merge agreed request/response types + mock fixtures in the first hour of a milestone.",
                            "Include error codes and empty-state shapes in the Day-1 contract, not just 200 OK.",
                            "Any mid-sprint change to a locked contract requires notifying the paired consumer immediately.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Your frontend developer says 'I can't start the Orders screen until Sami finishes the backend SQL queries on Wednesday.' How do you unblock them in 25 minutes?",
                            options: &[
                                "Tell the frontend developer to watch tutorials until Wednesday.",
                                "Pair Sami and the frontend dev for 25 minutes right now to lock the exact JSON response + error schema, commit a stub fixture, and run both tracks in parallel.",
                                "Have the frontend developer also write a duplicate SQL schema.",
                                "Cancel the Orders screen.",
                            ],
                            correct_index: 1,
                            explanation: "Locking the JSON contract and committing realistic stub data decouples UI development from DB query implementation immediately.",
                        },
                    },
                    Lesson {
                        slug: "vertical-slices-walking-skeleton",
                        code: "LES-401.2",
                        title: "Vertical Slices & Walking Skeletons",
                        summary: "Why building a thin end-to-end wire from UI to deployed DB on Day 1 eliminates late-stage integration disasters.",
                        duration_min: 18,
                        engineer_law: "Prove the pipes connect on Day 1 while the payload is tiny — never wait until Day 10 to discover CORS, auth, or Render env bugs.",
                        sections: &[
                            LessonSection {
                                anchor: "horizontal-vs-vertical",
                                heading: "1. Horizontal Layers vs. Vertical Slices",
                                body_html: r#"<p>Splitting a project into <em>"Week 1: All DB tables &rarr; Week 2: All API routes &rarr; Week 3: All UI screens"</em> means you have <strong>0% working software</strong> until Day 19—and every deployment, auth header, or environment issue hides until the worst possible moment.</p>
<div class="eng-callout">
  <div class="eng-callout-title">The Walking Skeleton</div>
  <p>On Day 1, deploy the thinnest possible vertical slice all the way to staging/production: one minimal UI button &rarr; one authenticated API route &rarr; one DB read/write &rarr; live URL. Once the skeleton walks, 4 developers can hang muscles (features) onto it in parallel without touching the spine.</p>
</div>"#,
                            },
                        ],
                        takeaways: &[
                            "Deploy to your real target environment (e.g. Render / Vercel) on Day 1, not Day 14.",
                            "Slice milestones into user-visible vertical capabilities ('Create Club', 'Register for Event', 'Export Attendance').",
                            "Protect shared files (`router.rs`, `schema.sql`, `layout`) by establishing clear extension seams in the skeleton.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Why do experienced leads deploy a nearly-empty 'Walking Skeleton' to staging/Render on Day 1 of a project?",
                            options: &[
                                "To impress investors with blank white pages.",
                                "To flush out port binding, CORS, auth cookies, DB connection SSL, and CI/CD build issues when code is 100 lines—not 15,000 lines.",
                                "Because local machines cannot run compilers.",
                                "To lock the database against future migrations.",
                            ],
                            correct_index: 1,
                            explanation: "Environment, port-binding (`0.0.0.0:$PORT`), SSL, and auth cookie bugs take 15 minutes to spot on a 100-line skeleton vs. hours of panic on launch night.",
                        },
                    },
                ],
            },
            Module {
                code: "MOD-401.2",
                title: "Critical Paths & Skill-to-Task Matching",
                goal: "Sequence dependencies cleanly and match task ambiguity to each person's level.",
                lessons: &[
                    Lesson {
                        slug: "critical-path-mapping",
                        code: "LES-401.3",
                        title: "Mapping the Critical Path & Dependency DAG",
                        summary: "Spot the 2 tasks that can delay the entire launch, and prevent yourself from becoming the team's bottleneck.",
                        duration_min: 19,
                        engineer_law: "A Tech Lead's #1 job on Day 1 is unblocking the Critical Path — never hoarding the fun isolated feature while 3 teammates wait on auth or schema.",
                        sections: &[
                            LessonSection {
                                anchor: "critical-path",
                                heading: "1. Finding the Critical Path in 10 Minutes",
                                body_html: r#"<p>Draw your milestone tasks as a Directed Acyclic Graph (DAG) of dependencies. The <strong>Critical Path</strong> is the longest chain of dependent tasks from start to ship. Any 1-day slip on the Critical Path delays launch by 1 full day.</p>
<pre class="eng-code">[T1: DB Schema + Auth Context (4h)]  &lt;-- CRITICAL BLOCKER: Do first!
       ├──► [T2: Event Creation API + UI (1d)] ──► [T5: Capacity Waitlist (1d)]  &lt;-- Critical Path
       ├──► [T3: Club Profile Page (1d)]          (Has 1d slack)
       └──► [T4: Admin Export CSV (0.5d)]         (Independent leaf)</pre>
<p><strong>Trap to avoid:</strong> New Tech Leads put themselves on the hardest Critical Path feature <em>and</em> also handle client calls + code reviews. When they get pulled into 3 hours of meetings, the whole team stalls! Instead, build/review the Day-1 unblocking foundation (<code>T1</code>), then take high-risk spikes or glue work off the main bottleneck, or pair closely with your strongest IC.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Finish shared foundations (types, schema, auth guard, mock routes) before noon on Day 1.",
                            "Never assign the critical-path blocker to someone who is part-time or pulled into all-day meetings.",
                            "Review PRs that unblock other teammates FIRST—before writing a single line of your own code.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "It is 10:00 AM. You have two tasks on your plate: writing your own isolated feature (4h) OR reviewing a 150-line schema/contract PR that 2 teammates need to start their work (20m). What goes first?",
                            options: &[
                                "Finish your 4-hour feature first so you feel productive, then review after lunch.",
                                "Review the 20-minute unblocking PR immediately—delaying 2 teammates for 4 hours destroys 8 person-hours of team throughput.",
                                "Approve the PR blindly without reading it.",
                                "Wait until tomorrow's standup to mention it.",
                            ],
                            correct_index: 1,
                            explanation: "As Lead, your output is the team's output, not just your personal commits. Spending 20 minutes now saves 8 hours of idle waiting across two developers.",
                        },
                    },
                    Lesson {
                        slug: "matching-tasks-to-engineers",
                        code: "LES-401.4",
                        title: "Skill-to-Ambiguity Matching",
                        summary: "The real difference between Junior, Mid, and Senior isn't typing speed—it's how much ambiguity they can absorb safely.",
                        duration_min: 20,
                        engineer_law: "Match task ambiguity to seniority: give Juniors clear rails, Mids clear outcomes, and Seniors messy cross-cutting problems.",
                        sections: &[
                            LessonSection {
                                anchor: "ambiguity-matrix",
                                heading: "1. The Task Assignment Matrix",
                                body_html: r#"<table class="eng-table">
  <thead>
    <tr><th>Engineer Level</th><th>Best Task Shape</th><th>Anti-Pattern (Do NOT Do This)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Junior Dev</strong></td><td>Crisp Shoveled-Path ticket (&lt;1 day), exact contract, existing file pattern to copy, plus 10% stretch so they learn.</td><td>Giving them a vague cross-cutting auth/payment problem and disappearing for 3 days.</td></tr>
    <tr><td><strong>Mid-Level Dev</strong></td><td>End-to-end vertical feature slice (2–3 linked tickets) with clear invariants &amp; API contract; let them design internal helpers.</td><td>Micromanaging variable names OR dumping un-spiked third-party unknowns without a check-in.</td></tr>
    <tr><td><strong>Senior / Lead</strong></td><td>High-ambiguity Spikes, core state-machine seams, tricky concurrency/migrations, unblocking reviews, mentoring pairings.</td><td>Taking all the easy greenfield UI tickets while juniors drown in legacy edge cases.</td></tr>
  </tbody>
</table>"#,
                            },
                            LessonSection {
                                anchor: "merge-hell-prevention",
                                heading: "2. Preventing Git Merge Hell",
                                body_html: r#"<p>Never assign two developers tickets that heavily rewrite the exact same 300-line file on the same day. Give each vertical slice its own module file (e.g., <code>orders.rs</code> vs. <code>inventory.rs</code>) connected only by a 1-line registration in <code>main.rs</code>.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Grow juniors safely by giving them well-bounded tickets with clear patterns + fast feedback loops.",
                            "Check file overlap before assigning parallel tickets—2 devs editing the same file all day = guaranteed merge pain.",
                            "Ask mid/senior devs to write a 10-line approach note before coding multi-day slices.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "You have a 4-person team (You as Lead, 1 strong Backend Mid, 1 Frontend Mid, 1 Junior Full-Stack) building an Event Registration feature. Who gets what?",
                            options: &[
                                "Give the Junior the concurrent seat-locking SQL race-condition engine so they 'learn fast under fire'.",
                                "You + Backend lock the API contract in 30m; Backend builds atomic seat-capacity endpoint + tests; Frontend builds registration flow against contract; Junior builds the bounded 'Attendee CSV Export + Empty State' ticket following an existing endpoint pattern.",
                                "Have all 4 people edit `events.ts` at the same time without talking.",
                                "Code the entire project solo over the weekend while the other 3 watch.",
                            ],
                            correct_index: 1,
                            explanation: "Every teammate works in separate files at the right ambiguity level: concurrency invariants go to strong Backend, full UX flow to Frontend Mid, bounded pattern-backed slice to Junior, and Lead orchestrates contracts & reviews.",
                        },
                    },
                ],
            },
        ],
    },
    // =========================================================================
    // ENG-501 — Leading Engineers, Reviews & Incidents
    // =========================================================================
    Course {
        slug: "technical-leadership",
        code: "ENG-501",
        title: "Leading Engineers, Reviews & Incidents",
        subtitle: "Run crisp rituals, give high-trust code reviews, rescue slipping sprints without panic, and command production incidents calmly.",
        subject: Subject::TechLeadership,
        difficulty: Difficulty::Advanced,
        thumbnail_kind: "leadership",
        prerequisites: &["team-task-division"],
        phase: 4,
        outcomes: &[
            "Run 10-minute standups focused on blockers instead of boring status recitals.",
            "Use 15-minute early design checks so nobody ever hears 'rewrite all of this' on Day 4.",
            "Prefix every PR comment (`blocker:`, `suggestion:`, `nit:`) for fast, zero-ego merges.",
            "Lead production incidents and blameless post-mortems that permanently harden systems.",
        ],
        modules: &[
            Module {
                code: "MOD-501.1",
                title: "Daily Execution & High-Signal Code Reviews",
                goal: "Keep daily velocity high and code quality sharp without micromanaging.",
                lessons: &[
                    Lesson {
                        slug: "high-signal-rituals",
                        code: "LES-501.1",
                        title: "10-Minute Standups & Early 15-Minute Check-Ins",
                        summary: "Why walking the board right-to-left beats 'what I did yesterday', and how the 20% Draft Check saves days of wasted work.",
                        duration_min: 16,
                        engineer_law: "Never let a teammate code in silence for more than 24 hours on a new pattern before a 5-minute sanity check.",
                        sections: &[
                            LessonSection {
                                anchor: "walk-the-board",
                                heading: "1. Walk the Board Right-to-Left (Not Person-by-Person)",
                                body_html: r#"<p>Person-by-person standups make everyone tune out while reciting busywork to look productive. Instead, share the board and walk <strong>Right-to-Left</strong> (closest to shipping first):</p>
<ol>
  <li><strong>Waiting for Review / Deploy:</strong> Who reviews this in the next 60 minutes so it ships today?</li>
  <li><strong>In Progress (&gt;1 day):</strong> What specific decision, dependency, or surprise is slowing this ticket down?</li>
  <li><strong>Up Next:</strong> Does everyone starting a new ticket today have a crystal-clear Definition of Done?</li>
</ol>"#,
                            },
                            LessonSection {
                                anchor: "twenty-percent-rule",
                                heading: "2. The '20% Draft Check' (Anti-Rewrite Insurance)",
                                body_html: r#"<p>Nothing crushes a developer's soul faster than spending 3 days polishing a PR only to have the Lead say: <em>"Oh, wrong architecture—start over."</em> Fix this with one rule: <strong>After 60–90 minutes on any non-trivial ticket, drop a 5-line plan or 40-line Draft PR for a 3-minute thumbs-up.</strong> Course-correcting at 20% costs 5 minutes; at 100% it costs 3 days and morale.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Keep daily syncs strictly <= 10 minutes; move deep technical debugging to a 2-person huddle right after.",
                            "Enforce the 20% Draft Check on unfamiliar modules so architectural drift is caught in the first hour.",
                            "Beware the phrase 'Almost done, just cleaning up' two days in a row—ask warmly to look at the screen together.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "A junior dev says 'Everything's fine, still working on the auth middleware' for the second morning in a row with zero commits pushed. What do you do?",
                            options: &[
                                "Publicly scold them in the group channel.",
                                "Ignore it for another 3 days so you 'don't micromanage'.",
                                "Right after standup, say: 'Hey, middleware edge cases can be gnarly—let's screen-share for 10 minutes so I can unblock any rough spots.'",
                                "Secretly rewrite their ticket yourself without telling them.",
                            ],
                            correct_index: 2,
                            explanation: "Juniors often hide being stuck out of embarrassment. A warm, low-ego 10-minute screen share surfaces the exact blocker immediately while building psychological safety.",
                        },
                    },
                    Lesson {
                        slug: "code-reviews-that-teach",
                        code: "LES-501.2",
                        title: "High-Velocity Code Reviews (Blocker / Suggestion / Nit)",
                        summary: "Review invariants, security, and failure modes—let linters argue about semicolons and formatting.",
                        duration_min: 17,
                        engineer_law: "Automate style in CI (`rustfmt` / `eslint`). Use human review brainpower strictly for invariants, edge cases, and clarity.",
                        sections: &[
                            LessonSection {
                                anchor: "review-prefixes",
                                heading: "1. Prefix Every Comment So Intent Is Crystal Clear",
                                body_html: r#"<p>Without labels, juniors treat a casual naming preference with the same panic as a SQL injection bug. Prefix every PR comment:</p>
<ul>
  <li><code>blocker:</code> Must be fixed before merge—breaks an invariant, leaks data, panics on bad input, or misses a required edge case. Explain <em>why</em> and show a 3-line hint.</li>
  <li><code>suggestion:</code> Cleaner or simpler approach worth considering, or extract to follow-up ticket.</li>
  <li><code>nit:</code> Non-blocking tiny polish (typo, clearer variable name). <em>Approve the PR anyway</em> so the author can apply it and merge without waiting another round!</li>
  <li><code>praise:</code> Call out a clean test or smart edge-case catch—what gets praised gets repeated!</li>
</ul>"#,
                            },
                        ],
                        takeaways: &[
                            "Never leave a review comment on formatting that `cargo fmt` or Prettier should enforce automatically.",
                            "When there are only `nit:` comments, approve the PR immediately ('Approved with minor nits') to avoid a 24-hour round-trip.",
                            "Review for: (1) Invariants & Auth, (2) Failure/Retry behavior, (3) Test proof, (4) Readability in 6 months.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "You review a clean, well-tested PR and only spot two variable names that could be slightly clearer (`d` -> `duration_sec`). What is the best review action?",
                            options: &[
                                "Click 'Request Changes' and block deployment over the weekend.",
                                "Leave `nit: consider renaming d -> duration_sec for clarity` AND mark the PR 'Approved' so they can rename and merge without waiting on you again.",
                                "Rewrite their branch via force-push without asking.",
                                "Schedule a team-wide naming committee.",
                            ],
                            correct_index: 1,
                            explanation: "Approving with clearly labeled non-blocking `nit:` notes preserves high velocity and shows trust in your teammates.",
                        },
                    },
                ],
            },
            Module {
                code: "MOD-501.2",
                title: "Friction, Slippage & Production Incidents",
                goal: "Stay calm, decisive, and blameless when plans collide with reality.",
                lessons: &[
                    Lesson {
                        slug: "unblocking-and-slippage",
                        code: "LES-501.3",
                        title: "Rescuing Slipping Sprints & Resolving Disagreements",
                        summary: "What to do on Wednesday noon when you realize Friday's milestone won't all fit—plus breaking deadlocked debates.",
                        duration_min: 18,
                        engineer_law: "Bad news does not age like wine. Surface schedule risk on Wednesday with a scope-trim plan — never on Friday at 17:30.",
                        sections: &[
                            LessonSection {
                                anchor: "wednesday-radar",
                                heading: "1. The Mid-Sprint Radar Check",
                                body_html: r#"<p>Halfway through any milestone (e.g., Wednesday noon of a 1-week sprint), ask one brutal question: <em>"Is the core end-to-end flow already working in staging?"</em> If not, you are already behind—even if everyone feels busy.</p>
<p>Immediately apply <strong>Scope Triage</strong>: protect the P0 core journey, peel off secondary niceties (custom animations, secondary filters, bulk actions) into Phase 1.1, swarm 2 devs onto the critical blocker, and inform stakeholders 48 hours early.</p>"#,
                            },
                            LessonSection {
                                anchor: "disagree-and-commit",
                                heading: "2. Breaking Engineer-vs-Engineer Deadlocks",
                                body_html: r#"<p>When two smart devs deadlock between Approach X and Approach Y: give each <strong>5 minutes</strong> to state their strongest constraint and worst failure mode against the project's #1 goal. If it's a Two-Way Door and still tied, make the call decisively, write 5 lines in the ticket explaining why, and ask both to <strong>disagree and commit</strong> with a metric to check in 2 weeks.</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Check end-to-end integration at the 50% mark of every sprint—not the 90% mark.",
                            "Adding 3 new people to a late 2-day task makes it later (Brooks's Law); cut non-essential scope instead.",
                            "Indecision from a Lead hurts morale far more than choosing Option A over an equally good Option B.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "It's Wednesday afternoon before a Friday client launch. Core checkout works, payment webhook needs 6 hours of testing, and 3 nice-to-have admin charts haven't started. What's your move?",
                            options: &[
                                "Say nothing until Friday 18:00 and hope everyone codes twice as fast without sleep.",
                                "Pull focus off payment testing so charts look pretty for the demo.",
                                "Lock P0 checkout + webhook reliability immediately, move the 3 admin charts to Monday's v1.1 drop, and message the client today with a live preview of checkout.",
                                "Rewrite the backend in a new framework.",
                            ],
                            correct_index: 2,
                            explanation: "Early transparency + rock-solid P0 delivery + a concrete v1.1 date builds massive stakeholder trust while preventing broken launches.",
                        },
                    },
                    Lesson {
                        slug: "incident-command-postmortems",
                        code: "LES-501.4",
                        title: "Incident Command & Blameless Post-Mortems",
                        summary: "Stop the bleeding in 5 minutes when production breaks, then fix the system guardrails so the same mistake is impossible twice.",
                        duration_min: 19,
                        engineer_law: "During an outage, STOP debugging clever theories and ROLL BACK first. In the post-mortem, fix the guardrail — never punish the human.",
                        sections: &[
                            LessonSection {
                                anchor: "stabilize-first",
                                heading: "1. Incident Command: Stabilize First, Root-Cause Second",
                                body_html: r#"<p>Production starts throwing <code>500 Internal Server Error</code> 4 minutes after a deploy. Amateur teams spend 45 minutes reading stack traces and pushing hasty "fix-forward" commits while customers suffer. Engineers follow a strict 4-step protocol:</p>
<ol>
  <li><strong>Declare &amp; Assign Roles (Minute 1):</strong> One person on comms/status, one person at the keyboard.</li>
  <li><strong>Stop the Bleeding (Minutes 2–5):</strong> Did a deploy, config change, or feature flag flip in the last hour? <strong>Revert/rollback immediately.</strong> Verify error rate drops to 0%.</li>
  <li><strong>Reproduce Calmly in Staging:</strong> Write a failing regression test that reproduces the exact crash.</li>
  <li><strong>Blameless Post-Mortem (&lt;24h):</strong> Ask <em>"How did our tests, types, and CI let a human ship this?"</em>—never <em>"Who do we blame?"</em></li>
</ol>"#,
                            },
                        ],
                        takeaways: &[
                            "If you blame people for honest mistakes, they hide bugs next time; if you fix guardrails, the whole team gets safer.",
                            "Rollback speed (<2 minutes) is your #1 insurance policy for shipping fast.",
                            "Every post-mortem ends with 1–3 concrete, owned engineering action items (e.g., adding a compiler lint or integration test).",
                        ],
                        inline_check: InlineCheck {
                            prompt: "A deploy at 14:10 breaks checkout for 30% of users. At 14:13 a developer says 'Wait, I think I see the bug on line 88, give me 15 minutes to write a fix!' What do you order?",
                            options: &[
                                "Let them live-code a new fix under panic while 30% of customers fail checkout for 15+ minutes.",
                                "Roll back to the known-good 14:09 release immediately (restoring 100% checkout in 60 seconds), then write + test the line-88 fix calmly.",
                                "Shut down the database.",
                                "Delete production logs.",
                            ],
                            correct_index: 1,
                            explanation: "Rushed 'fix-forward' patches under adrenaline frequently introduce a second outage. Roll back to known-good in 60 seconds, then fix with a regression test.",
                        },
                    },
                ],
            },
        ],
    },
    // =========================================================================
    // ENG-601 — Rust for Architecture-First Backend Systems
    // =========================================================================
    Course {
        slug: "rust-backend-architecture",
        code: "ENG-601",
        title: "Rust for Architecture-First Backend Systems",
        subtitle: "Use Rust's type system, ownership model, and Actix Web to turn architectural invariants into compile-time guarantees (studied right inside this app!).",
        subject: Subject::RustArchitecture,
        difficulty: Difficulty::Advanced,
        thumbnail_kind: "rust",
        prerequisites: &["systems-foundations", "decision-making"],
        phase: 3,
        outcomes: &[
            "Use Rust algebraic enums and Newtypes to make illegal domain states impossible to compile.",
            "Understand Ownership & Borrowing as architectural mutation contracts.",
            "Structure clean Actix-Web services with thin handlers and zero-allocation static/domain cores.",
            "Ban `.unwrap()` in request paths using typed `Result` errors and deploy cleanly on Render.",
        ],
        modules: &[
            Module {
                code: "MOD-601.1",
                title: "Compiler-Enforced Domain Invariants",
                goal: "Let `rustc` reject invalid business states before your server even starts.",
                lessons: &[
                    Lesson {
                        slug: "illegal-states-unrepresentable",
                        code: "LES-601.1",
                        title: "Making Illegal States Unrepresentable in Rust",
                        summary: "Why Rust's data-carrying `enum`s and Newtype structs are the ultimate tool for software engineering invariants.",
                        duration_min: 20,
                        engineer_law: "Don't write a comment saying 'tx_id is always non-null when status == Paid' — put `tx_id` inside `OrderState::Paid { tx_id }` so `rustc` proves it.",
                        sections: &[
                            LessonSection {
                                anchor: "sum-types",
                                heading: "1. Struct of Optionals vs. Data-Carrying Enum",
                                body_html: r#"<p>Look at how loosely-typed code breeds runtime panics vs. how Rust models exact domain truth:</p>
<pre class="eng-code">// Weak Model: allows status="Paid" with payment_tx_id=None!
struct WeakOrder {
    status: String,
    expires_at: Option&lt;u64&gt;,
    payment_tx_id: Option&lt;String&gt;,
}

// Rust Engineer Model: illegal combinations CANNOT even be constructed!
pub enum OrderState {
    Reserved { expires_at_unix: u64 },
    Paid { payment_tx_id: TransactionId, paid_at_unix: u64 },
    Expired,
}</pre>
<p>And when a teammate adds a fourth variant later (e.g., <code>Refunded</code>), <code>rustc</code> immediately flags <strong>every single <code>match</code> statement across the entire codebase</strong> that hasn't handled <code>Refunded</code> yet! Look at <code>eng/src/icons.rs</code> and <code>eng/src/models.rs</code> in this repository to see exhaustive <code>match</code> in action.</p>"#,
                            },
                            LessonSection {
                                anchor: "newtype-pattern",
                                heading: "2. The Zero-Cost Newtype Pattern",
                                body_html: r#"<p>If a function takes <code>fn transfer(from_id: String, to_id: String)</code>, nothing stops a tired developer from swapping arguments. Wrap primitives in single-field tuple structs with private inner fields and smart constructors:</p>
<pre class="eng-code">pub struct StoreId(String);
pub struct MinorCurrency(i64); // Compiled away at runtime — zero memory overhead!

impl MinorCurrency {
    pub fn new_non_negative(amount: i64) -&gt; Result&lt;Self, DomainError&gt; {
        if amount &lt; 0 { return Err(DomainError::NegativeAmount); }
        Ok(Self(amount))
    }
}</pre>"#,
                            },
                        ],
                        takeaways: &[
                            "Replace stringly-typed `status: String` fields + `Option` soup with Rust algebraic `enum`s.",
                            "Use Newtype wrappers (`UserId(Uuid)`, `MinorCurrency(i64)`) so `rustc` prevents parameter-swapping bugs at zero runtime cost.",
                            "Parse, don't just validate: convert raw inputs into validated domain structs right at the HTTP boundary.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "What happens at runtime to the memory layout of `struct MinorCurrency(i64)` compared to a raw `i64` in Rust?",
                            options: &[
                                "It allocates an extra heap object and garbage-collector header.",
                                "Zero overhead—at runtime it has the exact same 8-byte register/stack representation as `i64`, while preventing type mix-ups at compile time.",
                                "It doubles network bandwidth.",
                                "It requires unsafe pointers.",
                            ],
                            correct_index: 1,
                            explanation: "Newtypes in Rust are a zero-cost abstraction: strict compile-time distinctness with identical machine representation to the inner type.",
                        },
                    },
                    Lesson {
                        slug: "ownership-as-architecture",
                        code: "LES-601.2",
                        title: "Ownership & Borrowing as Architectural Seams",
                        summary: "Stop fighting the borrow checker—realize it is asking you the exact same question a Staff Engineer asks: 'Who owns this state, and who is mutating it?'",
                        duration_min: 20,
                        engineer_law: "Shared mutable state is the root of spooky bugs at a distance — in threads AND in team codebases. Rust simply makes that rule explicit.",
                        sections: &[
                            LessonSection {
                                anchor: "three-signatures",
                                heading: "1. Reading Function Signatures Like Contracts",
                                body_html: r#"<p>In JavaScript or Python, passing an object into <code>processOrder(order)</code> tells you nothing: did it only read <code>order</code>, secretly mutate 3 fields inside it, or store a reference forever? In Rust, the function signature IS the architectural contract:</p>
<ul>
  <li><code>fn summarize(course: &amp;Course) -&gt; usize</code> &mdash; <strong>Immutable Borrow:</strong> Guaranteed read-only view; safe for 1,000 readers simultaneously; cannot mutate or drop <code>course</code>.</li>
  <li><code>fn mark_complete(progress: &amp;mut ProgressLog)</code> &mdash; <strong>Exclusive Mutable Borrow:</strong> Explicit mutation; nobody else holds a reference while this runs—zero data races!</li>
  <li><code>fn seal_order(draft: DraftOrder) -&gt; ConfirmedOrder</code> &mdash; <strong>Move / Typestate Transition:</strong> Consumes <code>draft</code> by value so the caller can literally never accidentally reuse the old unconfirmed draft again!</li>
</ul>"#,
                            },
                        ],
                        takeaways: &[
                            "Default to borrowing slices (`&[T]`, `&str`) in read-only functions instead of cloning `Vec<T>` or `String`.",
                            "Use move semantics (`self` instead of `&self`) for one-way state transitions so old states cannot be reused.",
                            "Notice in `eng/src/models.rs` how `&'static str` avoids heap allocations completely for compile-time constants.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Look at `fn finalize(draft: DraftInvoice) -> SealedInvoice` (taking `draft` by value, without `&`). What bug does this prevent at compile time?",
                            options: &[
                                "It prevents CSS layout shifts.",
                                "Once `finalize(draft)` is called, ownership of `draft` moves—making it a compile error for caller code to accidentally edit or finalize the same `draft` a second time.",
                                "It disables HTTP compression.",
                                "It forces SQLite instead of Postgres.",
                            ],
                            correct_index: 1,
                            explanation: "Consuming `self` by value implements the Typestate Pattern: once transitioned to `SealedInvoice`, the `DraftInvoice` binding is statistically gone.",
                        },
                    },
                ],
            },
            Module {
                code: "MOD-601.2",
                title: "Production Actix-Web & Render Deployment",
                goal: "Write rock-solid, zero-panic Actix-Web services and ship lean binaries to Render.",
                lessons: &[
                    Lesson {
                        slug: "actix-thin-handlers",
                        code: "LES-601.3",
                        title: "Thin Actix-Web Handlers & Pure Domain Cores",
                        summary: "How `eng/src/main.rs` separates HTTP routing from `curriculum.rs` and `views.rs`—and how to scale that pattern with databases.",
                        duration_min: 20,
                        engineer_law: "Keep Actix `#[get]` / `#[post]` handlers under 20 lines: extract input -> call pure domain/view function -> map to `HttpResponse`.",
                        sections: &[
                            LessonSection {
                                anchor: "handler-anatomy",
                                heading: "1. Studying `eng/src/main.rs` in This Repo",
                                body_html: r#"<p>Open <code>eng/src/main.rs</code> alongside this lesson. Notice how clean the separation is:</p>
<pre class="eng-code">#[get("/lessons/{course_slug}/{lesson_slug}")]
async fn lesson_page(path: web::Path&lt;(String, String)&gt;) -&gt; impl Responder {
    let (course_slug, lesson_slug) = path.into_inner();
    match curriculum::find_lesson(&amp;course_slug, &amp;lesson_slug) {
        Some((course, lesson)) =&gt; {
            let title = format!("{} — {} | the-factory", lesson.title, course.code);
            let route = format!("/lessons/{}/{}", course.slug, lesson.slug);
            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .body(views::render_workstation(&amp;title, &amp;route))
        }
        None =&gt; HttpResponse::NotFound()
            .content_type("text/html; charset=utf-8")
            .body(views::render_not_found(&amp;format!("/lessons/{course_slug}/{lesson_slug}"))),
    }
}</pre>
<p>Why is this clean? Because <code>curriculum::find_lesson</code> and <code>views::render_workstation</code> know <strong>zero</strong> about sockets, headers, or Tokio runtimes—you can unit-test them with plain <code>assert!</code> in 2 milliseconds!</p>"#,
                            },
                        ],
                        takeaways: &[
                            "Use typed Actix extractors (`web::Path`, `web::Query`, `web::Json`, `web::Data<AppState>`) to validate HTTP inputs at the edge.",
                            "Share read-heavy pools or config across Actix worker threads via `web::Data::new(...)` (which wraps `Arc<T>` internally).",
                            "Keep HTML/JSON rendering and business rules in pure functions outside `main.rs`.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "What does Actix Web's `web::Data<T>` use under the hood so multiple worker threads can safely access shared state like a DB pool?",
                            options: &[
                                "Global `static mut` unsafe pointers.",
                                "`Arc<T>` (Atomically Reference-Counted smart pointer) for thread-safe shared ownership across workers.",
                                "Copying the entire database into every HTTP request.",
                                "Writing state to `/tmp/state.txt` on every click.",
                            ],
                            correct_index: 1,
                            explanation: "`web::Data<T>` wraps `Arc<T>` so cloning the handle per worker thread only increments an atomic counter while sharing the underlying pool safely.",
                        },
                    },
                    Lesson {
                        slug: "zero-panic-render-deploy",
                        code: "LES-601.4",
                        title: "Zero-Panic Error Handling & Deploying to Render",
                        summary: "Why `.unwrap()` on user input is a denial-of-service bug, and the exact checklist for deploying Actix Web to Render.",
                        duration_min: 20,
                        engineer_law: "Ban `.unwrap()` and `.expect()` inside request handlers — malformed client input must return a 4xx `Result`, never panic a worker thread.",
                        sections: &[
                            LessonSection {
                                anchor: "render-checklist",
                                heading: "1. The 4-Rule Render Deployment Checklist for Actix Web",
                                body_html: r#"<p>When deploying <code>/eng</code> as a Native Rust Web Service on <strong>Render</strong>, four details separate a smooth 2-minute deploy from a failed boot loop:</p>
<ol>
  <li><strong>Bind <code>0.0.0.0</code>, NEVER <code>127.0.0.1</code>:</strong> Inside Render's container network, binding <code>127.0.0.1</code> makes your port invisible to Render's load balancer and causes a health-check timeout.</li>
  <li><strong>Read Dynamic <code>PORT</code> from Env:</strong> Render injects <code>PORT</code> (typically <code>10000</code>). Parse <code>std::env::var("PORT")</code> with a safe fallback (e.g. <code>8080</code>) for local dev.</li>
  <li><strong>Expose <code>GET /health</code> Returning <code>200 OK</code>:</strong> Configure Render's Health Check Path to <code>/health</code> for zero-downtime rolling deploys.</li>
  <li><strong>Keep Dependencies Lean:</strong> Notice <code>Cargo.toml</code> uses <code>default-features = false, features = ["macros"]</code> on <code>actix-web</code>—skipping native OpenSSL/zstd C builds cuts Render compile RAM and build time dramatically!</li>
</ol>
<pre class="eng-code">// Render configuration for this repo:
// Root Directory:  eng
// Build Command:   cargo build --release
// Start Command:   ./target/release/the-factory
// Health Check:    /health</pre>"#,
                            },
                        ],
                        takeaways: &[
                            "Use `?` with typed error enums instead of `.unwrap()` in every request handler.",
                            "Always bind `(\"0.0.0.0\", port)` reading `std::env::var(\"PORT\")` for cloud container platforms.",
                            "Trim unused Cargo default features so cloud builds stay fast and within free-tier memory limits.",
                        ],
                        inline_check: InlineCheck {
                            prompt: "Your Actix server logs 'Listening on 127.0.0.1:8080' on Render, compiles cleanly, and then Render kills the deploy with 'Port scan timeout'. Why?",
                            options: &[
                                "Rust binaries cannot run on Linux.",
                                "It bound to loopback `127.0.0.1` instead of `0.0.0.0` AND ignored Render's `PORT` environment variable.",
                                "Tailwind CSS blocked the TCP socket.",
                                "You need at least 64 GB of RAM to listen on a port.",
                            ],
                            correct_index: 1,
                            explanation: "Container routers reach your process over the container's network interface, not loopback `127.0.0.1`, and route traffic to the injected `$PORT`.",
                        },
                    },
                ],
            },
        ],
    },
];
