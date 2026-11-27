//! `the-factory` — Pure Rust + Actix-Web Engineering Learning Workstation.
//!
//! Designed for single-binary cloud deployment on Render:
//! - Root Directory: `eng`
//! - Build Command:  `cargo build --release`
//! - Start Command:  `./target/release/the-factory`
//! - Health Check:   `/health`

mod courses_core;
mod courses_lead;
mod curriculum;
mod icons;
mod illustrations;
mod models;
mod practice_data;
mod runtime;
mod runtime_views;
mod shell;
mod views;

use actix_web::{get, head, web, App, HttpResponse, HttpServer, Responder};

fn html_ok(body: String) -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(body)
}

#[get("/")]
async fn home_page() -> impl Responder {
    html_ok(views::render_workstation(
        "the-factory — Engineering Learning Workstation",
        "/",
    ))
}

#[get("/roadmap")]
async fn roadmap_page() -> impl Responder {
    html_ok(views::render_workstation(
        "Learning Roadmap | the-factory",
        "/roadmap",
    ))
}

#[get("/courses")]
async fn courses_page() -> impl Responder {
    html_ok(views::render_workstation(
        "Engineering Courses | the-factory",
        "/courses",
    ))
}

#[get("/courses/{course_slug}")]
async fn course_detail_page(path: web::Path<String>) -> impl Responder {
    let course_slug = path.into_inner();
    match curriculum::find_course(&course_slug) {
        Some(course) => {
            let title = format!("{} ({}) | the-factory", course.title, course.code);
            let route = format!("/courses/{}", course.slug);
            html_ok(views::render_workstation(&title, &route))
        }
        None => HttpResponse::NotFound()
            .content_type("text/html; charset=utf-8")
            .body(views::render_not_found(&format!("/courses/{course_slug}"))),
    }
}

#[get("/lessons/{course_slug}/{lesson_slug}")]
async fn lesson_page(path: web::Path<(String, String)>) -> impl Responder {
    let (course_slug, lesson_slug) = path.into_inner();
    match curriculum::find_lesson(&course_slug, &lesson_slug) {
        Some((course, lesson)) => {
            let title = format!("{} — {} | the-factory", lesson.title, course.code);
            let route = format!("/lessons/{}/{}", course.slug, lesson.slug);
            html_ok(views::render_workstation(&title, &route))
        }
        None => HttpResponse::NotFound()
            .content_type("text/html; charset=utf-8")
            .body(views::render_not_found(&format!(
                "/lessons/{course_slug}/{lesson_slug}"
            ))),
    }
}

#[get("/notes")]
async fn notes_page() -> impl Responder {
    html_ok(views::render_workstation(
        "Engineering Notes & Specs | the-factory",
        "/notes",
    ))
}

#[get("/practice")]
async fn practice_page() -> impl Responder {
    html_ok(views::render_workstation(
        "Practice & Tech Lead Drills | the-factory",
        "/practice",
    ))
}

#[get("/examples")]
async fn examples_page() -> impl Responder {
    html_ok(views::render_workstation(
        "Production Examples | the-factory",
        "/examples",
    ))
}

#[get("/progress")]
async fn progress_page() -> impl Responder {
    html_ok(views::render_workstation(
        "Learning Progress | the-factory",
        "/progress",
    ))
}

#[get("/settings")]
async fn settings_page() -> impl Responder {
    html_ok(views::render_workstation("Settings | the-factory", "/settings"))
}

#[get("/api/curriculum")]
async fn api_curriculum() -> impl Responder {
    HttpResponse::Ok()
        .content_type("application/json; charset=utf-8")
        .body(curriculum::curriculum_json())
}

#[get("/api/stats")]
async fn api_stats() -> impl Responder {
    HttpResponse::Ok()
        .content_type("application/json; charset=utf-8")
        .body(curriculum::stats_json())
}

#[head("/")]
async fn head_root() -> impl Responder {
    HttpResponse::Ok().finish()
}

#[head("/health")]
async fn head_health() -> impl Responder {
    HttpResponse::Ok().finish()
}

#[get("/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok()
        .content_type("application/json; charset=utf-8")
        .body(r#"{"status":"ok","service":"the-factory","version":"1.0.0"}"#)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|raw| raw.parse::<u16>().ok())
        .unwrap_or(8080);

    let stats = curriculum::stats();
    println!(
        "[the-factory] Booting on http://0.0.0.0:{port} ({} courses, {} lessons, {} scenarios, {} drills)",
        stats.courses_count, stats.lessons_count, stats.questions_count, stats.drills_count
    );

    HttpServer::new(|| {
        App::new()
            .service(home_page)
            .service(head_root)
            .service(roadmap_page)
            .service(courses_page)
            .service(course_detail_page)
            .service(lesson_page)
            .service(notes_page)
            .service(practice_page)
            .service(examples_page)
            .service(progress_page)
            .service(settings_page)
            .service(api_curriculum)
            .service(api_stats)
            .service(health_check)
            .service(head_health)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
