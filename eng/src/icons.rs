//! Minimal Lucide-style outline SVG icons & brand mark for `the-factory`.
//!
//! Rust Learning Note:
//! Using an `enum` with an exhaustive `match` guarantees at compile time that every
//! `Icon` variant produces valid SVG markup — you can never pass a typo'd icon string!

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Icon {
    Home,
    Roadmap,
    Courses,
    Notes,
    Practice,
    Examples,
    Progress,
    Settings,
    Search,
    Sun,
    Moon,
    Maximize,
    SidebarCollapse,
    Menu,
    Flame,
    BookOpen,
    Code,
    Target,
}

pub fn render(icon: Icon, class: &str) -> String {
    let inner = match icon {
        Icon::Home => {
            r#"<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9 21v-6h6v6"/>"#
        }
        Icon::Roadmap => {
            r#"<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.5 6h4a3 3 0 0 1 3 3v.5"/><path d="M15.5 12h-4a3 3 0 0 0-3 3v.5"/>"#
        }
        Icon::Courses => {
            r#"<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3H11v17H4.5A2.5 2.5 0 0 0 2 22.5z"/><path d="M22 5.5A2.5 2.5 0 0 0 19.5 3H13v17h6.5a2.5 2.5 0 0 1 2.5 2.5z"/>"#
        }
        Icon::Notes => {
            r#"<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>"#
        }
        Icon::Practice => {
            r#"<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>"#
        }
        Icon::Examples => {
            r#"<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/>"#
        }
        Icon::Progress => {
            r#"<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>"#
        }
        Icon::Settings => {
            r#"<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1.02 1.51 1.09H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>"#
        }
        Icon::Search => {
            r#"<circle cx="11" cy="11" r="7.5"/><line x1="20.5" y1="20.5" x2="16.4" y2="16.4"/>"#
        }
        Icon::Sun => {
            r#"<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>"#
        }
        Icon::Moon => {
            r#"<path d="M12 3a7.5 7.5 0 0 0 9 9 9 9 0 1 1-9-9Z"/>"#
        }
        Icon::Maximize => {
            r#"<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>"#
        }
        Icon::SidebarCollapse => {
            r#"<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9-3 3 3 3"/>"#
        }
        Icon::Menu => {
            r#"<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>"#
        }
        Icon::Flame => {
            r#"<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>"#
        }
        Icon::BookOpen => {
            r#"<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>"#
        }
        Icon::Code => {
            r#"<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>"#
        }
        Icon::Target => {
            r#"<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>"#
        }
    };

    format!(
        r#"<svg class="{class}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{inner}</svg>"#
    )
}

/// Minimal geometric engineering mark for `the-factory` sidebar brand header.
pub fn brand_logo_svg() -> &'static str {
    r##"<svg class="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" aria-hidden="true">
  <rect x="1.5" y="1.5" width="33" height="33" rx="8.5" fill="#171C23" stroke="#29313B" stroke-width="1.2"/>
  <circle cx="18" cy="18" r="7.5" stroke="#F1F3F5" stroke-width="1.8"/>
  <circle cx="18" cy="18" r="2.8" fill="#10B981"/>
  <path d="M18 6.5v3M18 26.5v3M6.5 18h3M26.5 18h3M9.9 9.9l2.1 2.1M24 24l2.1 2.1M26.1 9.9 24 12M12 24l-2.1 2.1" stroke="#F1F3F5" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M18 18 L24.5 13.5" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
</svg>"##
}
