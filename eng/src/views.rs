//! HTML Document Assemblers for `the-factory`.
//!
//! Combines `shell.rs`, Rust-generated technical SVG blueprints (`illustrations.rs`),
//! static curriculum data (`curriculum.rs`), and the client-side `localStorage` runtime.

use crate::curriculum;
use crate::icons::{self, Icon};
use crate::illustrations;
use crate::models::{escape_html, json_str};
use crate::runtime::CLIENT_RUNTIME_PART_1;
use crate::runtime_views::CLIENT_RUNTIME_PART_2;
use crate::shell;

/// Renders the complete `the-factory` Engineering Workstation HTML document for any valid route.
pub fn render_workstation(page_title: &str, initial_route: &str) -> String {
    let head = shell::render_head(page_title);
    let frame = shell::render_app_frame(initial_route, curriculum::curriculum_json());

    let blueprints_script = format!(
        "<script>window.__TF_BLUEPRINTS__={{\"hero\":{},\"systems\":{},\"decisions\":{},\"tasks\":{},\"parallel\":{},\"leadership\":{},\"rust\":{},\"icQuiz\":{},\"icNotes\":{},\"icCode\":{},\"icProgress\":{}}};</script>",
        json_str(illustrations::hero_blueprint_svg()),
        json_str(illustrations::course_thumbnail_svg("systems")),
        json_str(illustrations::course_thumbnail_svg("decisions")),
        json_str(illustrations::course_thumbnail_svg("tasks")),
        json_str(illustrations::course_thumbnail_svg("parallel")),
        json_str(illustrations::course_thumbnail_svg("leadership")),
        json_str(illustrations::course_thumbnail_svg("rust")),
        json_str(&icons::render(Icon::Target, "w-[18px] h-[18px]")),
        json_str(&icons::render(Icon::BookOpen, "w-[18px] h-[18px]")),
        json_str(&icons::render(Icon::Code, "w-[18px] h-[18px]")),
        json_str(&icons::render(Icon::Progress, "w-[18px] h-[18px]")),
    );

    format!(
        "{head}\n{frame}\n{blueprints_script}\n<script>{CLIENT_RUNTIME_PART_1}\n{CLIENT_RUNTIME_PART_2}</script>\n</body>\n</html>"
    )
}

/// Renders a crisp, workstation-styled 404 response for unknown course or lesson slugs.
pub fn render_not_found(requested_path: &str) -> String {
    let head = shell::render_head("404 Not Found — the-factory");
    let safe_path = escape_html(requested_path);
    format!(
        r##"{head}
<body class="h-full flex items-center justify-center p-6">
  <div class="max-w-md w-full wf-surface p-7 text-center space-y-4">
    <div class="inline-flex items-center gap-2 font-mono text-[11.5px] px-2.5 py-1 rounded bg-[#DC5555]/10 text-[#DC5555]">
      HTTP 404 · UNKNOWN ROUTE
    </div>
    <h1 class="text-[22px] font-bold wf-text">Resource Not Found</h1>
    <p class="text-[13.5px] wf-subtext">
      No workstation course or lesson matched <code class="font-mono px-1.5 py-0.5 rounded wf-elevated">{safe_path}</code>.
    </p>
    <div class="pt-2">
      <a href="/" class="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[13px] font-semibold transition">
        Return to Command Center →
      </a>
    </div>
  </div>
</body>
</html>"##
    )
}
