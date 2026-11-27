//! Curriculum registry, lookup functions, summary telemetry, and invariant tests.

use crate::courses_core::CORE_COURSES;
use crate::courses_lead::LEAD_COURSES;
use crate::models::{
    serialize_curriculum_json, Course, EngineeringExample, Lesson, PracticeQuestion,
    SimulationDrill, StarterNote,
};
use crate::practice_data::{
    ENGINEERING_EXAMPLES, PRACTICE_QUESTIONS, SIMULATION_DRILLS, STARTER_NOTES,
};
use std::sync::OnceLock;

#[derive(Debug, Clone, Copy)]
pub struct CurriculumStats {
    pub courses_count: usize,
    pub lessons_count: usize,
    pub questions_count: usize,
    pub drills_count: usize,
    pub examples_count: usize,
    pub total_minutes: u32,
}

/// Returns all 6 courses in deterministic roadmap order.
pub fn all_courses() -> Vec<Course> {
    let mut list = Vec::with_capacity(CORE_COURSES.len() + LEAD_COURSES.len());
    list.extend_from_slice(CORE_COURSES);
    list.extend_from_slice(LEAD_COURSES);
    list
}

pub fn find_course(slug: &str) -> Option<Course> {
    CORE_COURSES
        .iter()
        .chain(LEAD_COURSES.iter())
        .copied()
        .find(|c| c.slug == slug)
}

pub fn find_lesson(course_slug: &str, lesson_slug: &str) -> Option<(Course, Lesson)> {
    let course = find_course(course_slug)?;
    let lesson = course
        .modules
        .iter()
        .flat_map(|m| m.lessons.iter())
        .copied()
        .find(|l| l.slug == lesson_slug)?;
    Some((course, lesson))
}

pub fn all_questions() -> &'static [PracticeQuestion] {
    PRACTICE_QUESTIONS
}

pub fn all_drills() -> &'static [SimulationDrill] {
    SIMULATION_DRILLS
}

pub fn all_examples() -> &'static [EngineeringExample] {
    ENGINEERING_EXAMPLES
}

pub fn starter_notes() -> &'static [StarterNote] {
    STARTER_NOTES
}

pub fn stats() -> CurriculumStats {
    let courses = all_courses();
    let lessons_count = courses.iter().map(Course::lesson_count).sum();
    let total_minutes = courses.iter().map(Course::total_minutes).sum();
    CurriculumStats {
        courses_count: courses.len(),
        lessons_count,
        questions_count: PRACTICE_QUESTIONS.len(),
        drills_count: SIMULATION_DRILLS.len(),
        examples_count: ENGINEERING_EXAMPLES.len(),
        total_minutes,
    }
}

/// Memoizes the serialized JSON payload once in process memory using `std::sync::OnceLock`
/// so subsequent requests serve the curriculum payload in nanoseconds.
pub fn curriculum_json() -> &'static str {
    static CACHE: OnceLock<String> = OnceLock::new();
    CACHE.get_or_init(|| {
        let courses = all_courses();
        serialize_curriculum_json(
            &courses,
            all_questions(),
            all_drills(),
            all_examples(),
            starter_notes(),
        )
    })
}

pub fn stats_json() -> String {
    let s = stats();
    format!(
        "{{\"coursesCount\":{},\"lessonsCount\":{},\"questionsCount\":{},\"drillsCount\":{},\"examplesCount\":{},\"totalMinutes\":{}}}",
        s.courses_count,
        s.lessons_count,
        s.questions_count,
        s.drills_count,
        s.examples_count,
        s.total_minutes
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn curriculum_invariants_hold() {
        let courses = all_courses();
        assert_eq!(courses.len(), 6, "Expected 6 engineering courses");

        let mut total_lessons = 0usize;
        for c in &courses {
            assert!(!c.slug.is_empty());
            for prereq in c.prerequisites {
                assert!(
                    find_course(prereq).is_some(),
                    "Course {} references unknown prerequisite {}",
                    c.slug,
                    prereq
                );
            }
            for m in c.modules {
                assert!(!m.lessons.is_empty());
                for l in m.lessons {
                    total_lessons += 1;
                    assert!(
                        l.inline_check.correct_index < l.inline_check.options.len(),
                        "Lesson {} inline_check correct_index out of bounds",
                        l.slug
                    );
                }
            }
        }
        assert_eq!(total_lessons, 24, "Expected 24 total lessons across 6 courses");

        for q in all_questions() {
            assert!(find_course(q.course_slug).is_some());
            assert!(q.correct_index < q.options.len());
        }

        let json = curriculum_json();
        assert!(json.starts_with("{\"courses\":["));
        assert!(!json.contains("</script>"), "JSON must escape closing script tags");
    }
}
