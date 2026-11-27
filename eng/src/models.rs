//! Domain models for `the-factory`.
//!
//! Rust Learning Note:
//! Notice how all static curriculum data uses `'static` string and slice references
//! (`&'static str`, `&'static [Module]`). Because the curriculum is known at compile time,
//! it lives directly in the compiled binary's read-only data segment (`rodata`) — meaning
//! zero heap allocations at startup and sub-millisecond HTTP responses on Render.

use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Difficulty {
    Foundational,
    Intermediate,
    Advanced,
}

impl Difficulty {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Foundational => "Foundational",
            Self::Intermediate => "Intermediate",
            Self::Advanced => "Advanced",
        }
    }

    pub const fn level_num(self) -> u8 {
        match self {
            Self::Foundational => 1,
            Self::Intermediate => 2,
            Self::Advanced => 3,
        }
    }
}

impl fmt::Display for Difficulty {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.label())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Subject {
    SystemsDesign,
    DecisionMaking,
    TaskShaping,
    TeamExecution,
    TechLeadership,
    RustArchitecture,
}

impl Subject {
    pub const fn label(self) -> &'static str {
        match self {
            Self::SystemsDesign => "Systems & Design",
            Self::DecisionMaking => "Decision Making",
            Self::TaskShaping => "Task Shaping",
            Self::TeamExecution => "Team Execution",
            Self::TechLeadership => "Leadership & Reviews",
            Self::RustArchitecture => "Rust Architecture",
        }
    }

    pub const fn slug(self) -> &'static str {
        match self {
            Self::SystemsDesign => "systems-design",
            Self::DecisionMaking => "decision-making",
            Self::TaskShaping => "task-shaping",
            Self::TeamExecution => "team-execution",
            Self::TechLeadership => "leadership",
            Self::RustArchitecture => "rust-architecture",
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct LessonSection {
    pub anchor: &'static str,
    pub heading: &'static str,
    pub body_html: &'static str,
}

#[derive(Debug, Clone, Copy)]
pub struct InlineCheck {
    pub prompt: &'static str,
    pub options: &'static [&'static str],
    pub correct_index: usize,
    pub explanation: &'static str,
}

#[derive(Debug, Clone, Copy)]
pub struct Lesson {
    pub slug: &'static str,
    pub code: &'static str,
    pub title: &'static str,
    pub summary: &'static str,
    pub duration_min: u32,
    pub engineer_law: &'static str,
    pub sections: &'static [LessonSection],
    pub takeaways: &'static [&'static str],
    pub inline_check: InlineCheck,
}

#[derive(Debug, Clone, Copy)]
pub struct Module {
    pub code: &'static str,
    pub title: &'static str,
    pub goal: &'static str,
    pub lessons: &'static [Lesson],
}

#[derive(Debug, Clone, Copy)]
pub struct Course {
    pub slug: &'static str,
    pub code: &'static str,
    pub title: &'static str,
    pub subtitle: &'static str,
    pub subject: Subject,
    pub difficulty: Difficulty,
    pub thumbnail_kind: &'static str,
    pub prerequisites: &'static [&'static str],
    pub phase: u8,
    pub outcomes: &'static [&'static str],
    pub modules: &'static [Module],
}

impl Course {
    pub fn lesson_count(&self) -> usize {
        self.modules.iter().map(|m| m.lessons.len()).sum()
    }

    pub fn total_minutes(&self) -> u32 {
        self.modules
            .iter()
            .flat_map(|m| m.lessons.iter())
            .map(|l| l.duration_min)
            .sum()
    }
}

#[derive(Debug, Clone, Copy)]
pub struct PracticeQuestion {
    pub id: &'static str,
    pub course_slug: &'static str,
    pub category: &'static str,
    pub difficulty: Difficulty,
    pub scenario: &'static str,
    pub question: &'static str,
    pub options: &'static [&'static str],
    pub correct_index: usize,
    pub explanation: &'static str,
}

#[derive(Debug, Clone, Copy)]
pub struct SimulationDrill {
    pub id: &'static str,
    pub code: &'static str,
    pub course_slug: &'static str,
    pub title: &'static str,
    pub role_context: &'static str,
    pub situation: &'static str,
    pub prompts: &'static [&'static str],
    pub rubric_points: &'static [&'static str],
    pub staff_reference_html: &'static str,
}

#[derive(Debug, Clone, Copy)]
pub struct EngineeringExample {
    pub id: &'static str,
    pub code: &'static str,
    pub course_slug: &'static str,
    pub artifact_type: &'static str,
    pub title: &'static str,
    pub summary: &'static str,
    pub bad_approach: &'static str,
    pub engineer_approach_html: &'static str,
    pub note_markdown_template: &'static str,
}

#[derive(Debug, Clone, Copy)]
pub struct StarterNote {
    pub id: &'static str,
    pub title: &'static str,
    pub course_slug: &'static str,
    pub tag: &'static str,
    pub content: &'static str,
}

/// Escapes user/plain text safely for HTML element bodies and attributes.
pub fn escape_html(input: &str) -> String {
    let mut out = String::with_capacity(input.len() + 16);
    for ch in input.chars() {
        match ch {
            '&' => out.push_str("&amp;"),
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '"' => out.push_str("&quot;"),
            '\'' => out.push_str("&#39;"),
            _ => out.push(ch),
        }
    }
    out
}

/// Escapes a string as a valid JSON string literal (including surrounding quotes)
/// AND escapes `</` as `<\/` so it can be safely embedded inside an HTML `<script>` block.
pub fn json_str(input: &str) -> String {
    let mut out = String::with_capacity(input.len() + 16);
    out.push('"');
    let bytes = input.as_bytes();
    let mut prev_lt = false;
    for ch in input.chars() {
        if prev_lt && ch == '/' {
            out.push_str("\\/");
            prev_lt = false;
            continue;
        }
        prev_lt = ch == '<';
        match ch {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            c if (c as u32) < 0x20 => {
                let code = c as u32;
                out.push_str(&format!("\\u{:04x}", code));
            }
            c => out.push(c),
        }
    }
    let _ = bytes;
    out.push('"');
    out
}

pub fn json_str_slice(items: &[&str]) -> String {
    let mut out = String::from("[");
    for (idx, item) in items.iter().enumerate() {
        if idx > 0 {
            out.push(',');
        }
        out.push_str(&json_str(item));
    }
    out.push(']');
    out
}

/// Serializes the entire curriculum dataset to JSON without requiring `serde_derive` proc-macros,
/// keeping compile times blazingly fast while guaranteeing safe `<script>` embedding.
pub fn serialize_curriculum_json(
    courses: &[Course],
    questions: &[PracticeQuestion],
    drills: &[SimulationDrill],
    examples: &[EngineeringExample],
    starter_notes: &[StarterNote],
) -> String {
    let mut out = String::with_capacity(131_072);
    out.push_str("{\"courses\":[");

    for (ci, c) in courses.iter().enumerate() {
        if ci > 0 {
            out.push(',');
        }
        out.push_str(&format!(
            "{{\"slug\":{},\"code\":{},\"title\":{},\"subtitle\":{},\"subject\":{},\"subjectSlug\":{},\"difficulty\":{},\"difficultyLevel\":{},\"thumbnailKind\":{},\"prerequisites\":{},\"phase\":{},\"totalMinutes\":{},\"lessonCount\":{},\"outcomes\":{},\"modules\":[",
            json_str(c.slug),
            json_str(c.code),
            json_str(c.title),
            json_str(c.subtitle),
            json_str(c.subject.label()),
            json_str(c.subject.slug()),
            json_str(c.difficulty.label()),
            c.difficulty.level_num(),
            json_str(c.thumbnail_kind),
            json_str_slice(c.prerequisites),
            c.phase,
            c.total_minutes(),
            c.lesson_count(),
            json_str_slice(c.outcomes),
        ));

        for (mi, m) in c.modules.iter().enumerate() {
            if mi > 0 {
                out.push(',');
            }
            out.push_str(&format!(
                "{{\"code\":{},\"title\":{},\"goal\":{},\"lessons\":[",
                json_str(m.code),
                json_str(m.title),
                json_str(m.goal),
            ));

            for (li, l) in m.lessons.iter().enumerate() {
                if li > 0 {
                    out.push(',');
                }
                out.push_str(&format!(
                    "{{\"slug\":{},\"code\":{},\"title\":{},\"summary\":{},\"durationMin\":{},\"engineerLaw\":{},\"takeaways\":{},\"inlineCheck\":{{\"prompt\":{},\"options\":{},\"correctIndex\":{},\"explanation\":{}}},\"sections\":[",
                    json_str(l.slug),
                    json_str(l.code),
                    json_str(l.title),
                    json_str(l.summary),
                    l.duration_min,
                    json_str(l.engineer_law),
                    json_str_slice(l.takeaways),
                    json_str(l.inline_check.prompt),
                    json_str_slice(l.inline_check.options),
                    l.inline_check.correct_index,
                    json_str(l.inline_check.explanation),
                ));

                for (si, s) in l.sections.iter().enumerate() {
                    if si > 0 {
                        out.push(',');
                    }
                    out.push_str(&format!(
                        "{{\"anchor\":{},\"heading\":{},\"bodyHtml\":{}}}",
                        json_str(s.anchor),
                        json_str(s.heading),
                        json_str(s.body_html),
                    ));
                }
                out.push_str("]}");
            }
            out.push_str("]}");
        }
        out.push_str("]}");
    }

    out.push_str("],\"questions\":[");
    for (qi, q) in questions.iter().enumerate() {
        if qi > 0 {
            out.push(',');
        }
        out.push_str(&format!(
            "{{\"id\":{},\"courseSlug\":{},\"category\":{},\"difficulty\":{},\"scenario\":{},\"question\":{},\"options\":{},\"correctIndex\":{},\"explanation\":{}}}",
            json_str(q.id),
            json_str(q.course_slug),
            json_str(q.category),
            json_str(q.difficulty.label()),
            json_str(q.scenario),
            json_str(q.question),
            json_str_slice(q.options),
            q.correct_index,
            json_str(q.explanation),
        ));
    }

    out.push_str("],\"drills\":[");
    for (di, d) in drills.iter().enumerate() {
        if di > 0 {
            out.push(',');
        }
        out.push_str(&format!(
            "{{\"id\":{},\"code\":{},\"courseSlug\":{},\"title\":{},\"roleContext\":{},\"situation\":{},\"prompts\":{},\"rubricPoints\":{},\"staffReferenceHtml\":{}}}",
            json_str(d.id),
            json_str(d.code),
            json_str(d.course_slug),
            json_str(d.title),
            json_str(d.role_context),
            json_str(d.situation),
            json_str_slice(d.prompts),
            json_str_slice(d.rubric_points),
            json_str(d.staff_reference_html),
        ));
    }

    out.push_str("],\"examples\":[");
    for (ei, ex) in examples.iter().enumerate() {
        if ei > 0 {
            out.push(',');
        }
        out.push_str(&format!(
            "{{\"id\":{},\"code\":{},\"courseSlug\":{},\"artifactType\":{},\"title\":{},\"summary\":{},\"badApproach\":{},\"engineerApproachHtml\":{},\"noteMarkdownTemplate\":{}}}",
            json_str(ex.id),
            json_str(ex.code),
            json_str(ex.course_slug),
            json_str(ex.artifact_type),
            json_str(ex.title),
            json_str(ex.summary),
            json_str(ex.bad_approach),
            json_str(ex.engineer_approach_html),
            json_str(ex.note_markdown_template),
        ));
    }

    out.push_str("],\"starterNotes\":[");
    for (ni, n) in starter_notes.iter().enumerate() {
        if ni > 0 {
            out.push(',');
        }
        out.push_str(&format!(
            "{{\"id\":{},\"title\":{},\"courseSlug\":{},\"tag\":{},\"content\":{}}}",
            json_str(n.id),
            json_str(n.title),
            json_str(n.course_slug),
            json_str(n.tag),
            json_str(n.content),
        ));
    }

    out.push_str("]}");
    out
}
