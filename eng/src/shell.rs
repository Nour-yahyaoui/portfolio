//! Application HTML5 Shell, Precision Design System CSS, Persistent Graphite Sidebar,
//! Compact Top Header, and Global `Ctrl + K` Command Palette.

use crate::icons::{self, Icon};
use crate::models::escape_html;

/// Generates the `<head>` with zero-flash theme initialization, Inter + JetBrains Mono
/// typography, Tailwind CSS CDN configuration, and strict Engineering Workstation CSS tokens.
pub fn render_head(page_title: &str) -> String {
    let safe_title = escape_html(page_title);
    format!(
        r##"<!DOCTYPE html>
<html lang="en" class="h-full antialiased">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{safe_title}</title>
  <meta name="description" content="the-factory — Personal Software Engineering, System Design & Technical Leadership Workstation." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <script>
    (function() {{
      try {{
        var raw = localStorage.getItem('the_factory_state_v1');
        var pref = 'light';
        if (raw) {{
          var parsed = JSON.parse(raw);
          if (parsed && parsed.settings && parsed.settings.theme) pref = parsed.settings.theme;
        }}
        var isDark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) document.documentElement.classList.add('dark');
      }} catch (_) {{}}
    }})();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
          }},
          colors: {{
            sidebar: '#111418',
            emerald: {{
              DEFAULT: '#10B981',
              500: '#10B981',
              600: '#059669',
            }},
            techblue: '#3977B8',
            warn: '#F59E0B',
            err: '#DC5555',
          }}
        }}
      }}
    }};
  </script>
  <style>
    :root {{
      --bg-main: #F5F6F7;
      --bg-surface: #FFFFFF;
      --bg-elevated: #FAFBFC;
      --bg-muted: #F0F2F5;
      --text-primary: #171A1F;
      --text-secondary: #747C87;
      --border-subtle: #E6E9ED;
      --accent: #10B981;
      --accent-soft: rgba(16, 185, 129, 0.10);
      --accent-blue: #3977B8;
      --warning: #F59E0B;
      --error: #DC5555;
      --card-shadow: 0 1px 2px rgba(17, 20, 24, 0.035);
    }}

    html.dark {{
      --bg-main: #0D1014;
      --bg-surface: #151A20;
      --bg-elevated: #1C222A;
      --bg-muted: #191F27;
      --text-primary: #F1F3F5;
      --text-secondary: #929BA8;
      --border-subtle: #29313B;
      --accent: #10B981;
      --accent-soft: rgba(16, 185, 129, 0.14);
      --accent-blue: #3977B8;
      --warning: #F59E0B;
      --error: #DC5555;
      --card-shadow: 0 1px 2px rgba(0, 0, 0, 0.28);
    }}

    * {{ box-sizing: border-box; }}

    body {{
      margin: 0;
      background-color: var(--bg-main);
      color: var(--text-primary);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }}

    .wf-surface {{
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      box-shadow: var(--card-shadow);
      border-radius: 10px;
    }}

    .wf-elevated {{
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
    }}

    .wf-muted {{
      background-color: var(--bg-muted);
    }}

    .wf-border {{ border-color: var(--border-subtle); }}
    .wf-text {{ color: var(--text-primary); }}
    .wf-subtext {{ color: var(--text-secondary); }}

    .wf-input {{
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      border-radius: 8px;
      transition: border-color 140ms ease;
    }}
    .wf-input:focus {{
      outline: none;
      border-color: #10B981;
    }}

    /* Sidebar transitions & collapsed mode */
    #app-sidebar {{
      width: 235px;
      background-color: #111418;
      border-right: 1px solid #1E242C;
      transition: width 180ms cubic-bezier(0.2, 0, 0, 1), transform 200ms ease;
    }}
    #app-sidebar[data-collapsed="true"] {{
      width: 68px;
    }}
    #app-sidebar[data-collapsed="true"] .sb-label,
    #app-sidebar[data-collapsed="true"] .sb-footer-card,
    #app-sidebar[data-collapsed="true"] .sb-version-text {{
      display: none !important;
    }}
    #app-sidebar[data-collapsed="true"] .sb-nav-btn {{
      justify-content: center;
      padding-left: 0;
      padding-right: 0;
    }}
    #app-sidebar[data-collapsed="true"] .sb-brand-wrap {{
      justify-content: center;
    }}

    .sb-nav-btn {{
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13.5px;
      font-weight: 500;
      color: #929BA8;
      transition: background-color 120ms ease, color 120ms ease;
      text-decoration: none;
    }}
    .sb-nav-btn:hover {{
      background-color: rgba(255, 255, 255, 0.045);
      color: #F1F3F5;
    }}
    .sb-nav-btn.active {{
      background-color: #1B2129;
      color: #F1F3F5;
    }}
    .sb-nav-btn.active .sb-icon {{
      color: #10B981;
    }}
    .sb-nav-btn.active::before {{
      content: "";
      position: absolute;
      left: 0;
      top: 7px;
      bottom: 7px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background-color: #10B981;
    }}

    /* Lesson & Technical Prose Typography */
    .eng-prose {{
      font-size: 15px;
      line-height: 1.72;
      color: var(--text-primary);
    }}
    .eng-prose p {{
      margin: 0 0 14px 0;
      color: var(--text-primary);
    }}
    .eng-prose ul, .eng-prose ol {{
      margin: 0 0 16px 0;
      padding-left: 20px;
    }}
    .eng-prose li {{
      margin-bottom: 7px;
    }}
    .eng-prose code {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      padding: 2px 6px;
      border-radius: 5px;
      background-color: var(--bg-muted);
      border: 1px solid var(--border-subtle);
    }}
    .eng-code {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      line-height: 1.62;
      background-color: #111418;
      color: #E6EDF3;
      border: 1px solid #252C35;
      border-radius: 8px;
      padding: 14px 16px;
      overflow-x: auto;
      margin: 12px 0 16px 0;
      white-space: pre;
    }}
    .eng-callout {{
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-left: 3px solid #10B981;
      border-radius: 8px;
      padding: 14px 16px;
      margin: 14px 0 16px 0;
    }}
    .eng-callout-title {{
      font-size: 12.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #10B981;
      margin-bottom: 6px;
    }}
    .eng-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
      margin: 12px 0 18px 0;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      overflow: hidden;
    }}
    .eng-table th {{
      text-align: left;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--text-secondary);
      background-color: var(--bg-muted);
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-subtle);
    }}
    .eng-table td {{
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-subtle);
      vertical-align: top;
    }}
    .eng-table tr:last-child td {{
      border-bottom: none;
    }}

    /* Compact mode density setting */
    body[data-density="compact"] .wf-pad {{
      padding: 14px !important;
    }}

    /* Subtle scrollbars */
    ::-webkit-scrollbar {{ width: 7px; height: 7px; }}
    ::-webkit-scrollbar-track {{ background: transparent; }}
    ::-webkit-scrollbar-thumb {{ background: rgba(116, 124, 135, 0.28); border-radius: 999px; }}
    ::-webkit-scrollbar-thumb:hover {{ background: rgba(116, 124, 135, 0.48); }}
  </style>
</head>"##
    )
}

/// Renders the persistent dark-graphite sidebar + compact top bar + main viewport shell.
pub fn render_app_frame(initial_route: &str, embedded_curriculum_json: &str) -> String {
    let logo = icons::brand_logo_svg();
    let ic_home = icons::render(Icon::Home, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_roadmap = icons::render(Icon::Roadmap, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_courses = icons::render(Icon::Courses, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_notes = icons::render(Icon::Notes, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_practice = icons::render(Icon::Practice, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_examples = icons::render(Icon::Examples, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_progress = icons::render(Icon::Progress, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_settings = icons::render(Icon::Settings, "w-[17px] h-[17px] shrink-0 sb-icon");
    let ic_collapse = icons::render(Icon::SidebarCollapse, "w-4 h-4");
    let ic_menu = icons::render(Icon::Menu, "w-5 h-5");
    let ic_search = icons::render(Icon::Search, "w-4 h-4");
    let ic_sun = icons::render(Icon::Sun, "w-[17px] h-[17px]");
    let ic_moon = icons::render(Icon::Moon, "w-[17px] h-[17px]");
    let ic_max = icons::render(Icon::Maximize, "w-[16px] h-[16px]");
    let ic_flame = icons::render(Icon::Flame, "w-3.5 h-3.5 text-[#F59E0B]");

    let safe_route = escape_html(initial_route);

    format!(
        r##"<body class="h-full overflow-hidden flex select-text" data-initial-route="{safe_route}">
  <!-- Mobile Drawer Backdrop -->
  <div id="mobile-backdrop" class="fixed inset-0 bg-black/60 z-30 hidden lg:hidden" onclick="window.TF.closeMobileDrawer()"></div>

  <!-- Persistent Dark Graphite Sidebar (#111418) -->
  <aside id="app-sidebar" data-collapsed="false" class="fixed lg:static inset-y-0 left-0 z-40 flex flex-col shrink-0 h-full -translate-x-full lg:translate-x-0 select-none">
    <!-- Brand Header -->
    <div class="h-14 px-4 flex items-center justify-between border-b border-[#1E242C] sb-brand-wrap">
      <a href="/" onclick="return window.TF.nav(event, '/')" class="flex items-center gap-2.5 min-w-0">
        {logo}
        <div class="sb-label min-w-0">
          <div class="text-[15px] font-semibold tracking-tight text-[#F1F3F5] leading-tight truncate">the-factory</div>
          <div class="text-[10.5px] font-mono text-[#747C87] tracking-wide truncate">Engineering Edition</div>
        </div>
      </a>
    </div>

    <!-- Primary Navigation -->
    <nav class="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto" aria-label="Main Navigation">
      <a href="/" data-nav="home" onclick="return window.TF.nav(event, '/')" class="sb-nav-btn" title="Home">
        {ic_home}
        <span class="sb-label truncate">Home</span>
      </a>
      <a href="/roadmap" data-nav="roadmap" onclick="return window.TF.nav(event, '/roadmap')" class="sb-nav-btn" title="Roadmap">
        {ic_roadmap}
        <span class="sb-label truncate">Roadmap</span>
      </a>
      <a href="/courses" data-nav="courses" onclick="return window.TF.nav(event, '/courses')" class="sb-nav-btn" title="Courses">
        {ic_courses}
        <span class="sb-label flex-1 truncate">Courses</span>
        <span class="sb-label font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-[#1B2129] text-[#929BA8]">6</span>
      </a>
      <a href="/notes" data-nav="notes" onclick="return window.TF.nav(event, '/notes')" class="sb-nav-btn" title="Notes">
        {ic_notes}
        <span class="sb-label flex-1 truncate">Notes</span>
        <span id="sb-notes-count" class="sb-label font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-[#1B2129] text-[#929BA8]">3</span>
      </a>
      <a href="/practice" data-nav="practice" onclick="return window.TF.nav(event, '/practice')" class="sb-nav-btn" title="Practice">
        {ic_practice}
        <span class="sb-label truncate">Practice</span>
      </a>
      <a href="/examples" data-nav="examples" onclick="return window.TF.nav(event, '/examples')" class="sb-nav-btn" title="Examples">
        {ic_examples}
        <span class="sb-label truncate">Examples</span>
      </a>
      <a href="/progress" data-nav="progress" onclick="return window.TF.nav(event, '/progress')" class="sb-nav-btn" title="Progress">
        {ic_progress}
        <span class="sb-label truncate">Progress</span>
      </a>
    </nav>

    <!-- Bottom Status Card + Settings + Version -->
    <div class="px-2.5 pb-3 pt-2 space-y-2 border-t border-[#1E242C]">
      <div class="sb-footer-card rounded-lg bg-[#161B22] border border-[#242C37] p-3">
        <div class="flex items-center justify-between text-[12px] font-semibold text-[#F1F3F5] mb-1">
          <span>Keep building.</span>
          <span id="sb-mini-pct" class="font-mono text-[11px] text-[#10B981]">0%</span>
        </div>
        <p class="text-[11px] text-[#8A93A0] leading-snug mb-2.5">Great engineers design invariants before writing code.</p>
        <div class="w-full h-1.5 rounded-full bg-[#242C37] overflow-hidden">
          <div id="sb-mini-bar" class="h-full bg-[#10B981] transition-all duration-300" style="width: 0%"></div>
        </div>
      </div>

      <a href="/settings" data-nav="settings" onclick="return window.TF.nav(event, '/settings')" class="sb-nav-btn" title="Settings">
        {ic_settings}
        <span class="sb-label truncate">Settings</span>
      </a>

      <div class="px-2 pt-1 flex items-center justify-between text-[11px] text-[#747C87]">
        <div class="sb-version-text flex items-center gap-1.5 font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          <span>the-factory v1.0</span>
        </div>
        <button type="button" onclick="window.TF.toggleSidebarCollapse()" class="hidden lg:inline-flex items-center justify-center w-7 h-7 rounded-md text-[#8A93A0] hover:text-[#F1F3F5] hover:bg-white/5 transition" title="Toggle compact sidebar">
          {ic_collapse}
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Workspace Column -->
  <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
    <!-- Compact Persistent Top Navigation (56px) -->
    <header class="h-14 shrink-0 wf-surface !rounded-none !border-t-0 !border-x-0 px-4 lg:px-6 flex items-center justify-between gap-3 z-20">
      <div class="flex items-center gap-3 min-w-0">
        <button type="button" onclick="window.TF.openMobileDrawer()" class="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg wf-elevated wf-text" aria-label="Open navigation">
          {ic_menu}
        </button>

        <!-- Global Search Trigger -->
        <button type="button" onclick="window.TF.openCommandPalette()" class="group flex items-center justify-between gap-3 w-56 sm:w-80 md:w-[390px] h-9 px-3 rounded-lg wf-elevated hover:border-[#10B981]/60 transition text-left">
          <span class="flex items-center gap-2.5 min-w-0 wf-subtext text-[13px]">
            {ic_search}
            <span class="truncate">Search courses, topics, or concepts...</span>
          </span>
          <kbd class="hidden sm:inline-block font-mono text-[11px] px-1.5 py-0.5 rounded wf-surface wf-subtext shrink-0">Ctrl + K</kbd>
        </button>
      </div>

      <!-- Right Header Controls -->
      <div class="flex items-center gap-2 shrink-0">
        <div id="top-breadcrumb" class="hidden xl:flex items-center gap-1.5 text-[12px] font-mono wf-subtext mr-2"></div>

        <div class="hidden sm:flex items-center gap-1.5 h-8 px-2.5 rounded-lg wf-elevated text-[12px] font-medium wf-text" title="Active study streak">
          {ic_flame}
          <span id="top-streak-label" class="font-mono text-[11.5px]">1d streak</span>
        </div>

        <button type="button" id="theme-toggle-btn" onclick="window.TF.toggleTheme()" class="inline-flex items-center justify-center w-8 h-8 rounded-lg wf-elevated wf-subtext hover:wf-text transition" title="Toggle Light / Dark theme" aria-label="Toggle theme">
          <span class="dark:hidden">{ic_moon}</span>
          <span class="hidden dark:inline">{ic_sun}</span>
        </button>

        <button type="button" onclick="window.TF.toggleFullscreen()" class="inline-flex items-center justify-center w-8 h-8 rounded-lg wf-elevated wf-subtext hover:wf-text transition" title="Toggle Fullscreen" aria-label="Toggle fullscreen">
          {ic_max}
        </button>
      </div>
    </header>

    <!-- Scrollable View Container -->
    <main id="app-viewport" class="flex-1 overflow-y-auto focus:outline-none">
      <noscript>
        <div class="max-w-2xl mx-auto p-8">
          <h1 class="text-xl font-bold mb-2">the-factory Engineering Workstation</h1>
          <p class="text-sm text-gray-600">Enable JavaScript to hydrate localStorage progress, interactive drills, notes, and instant navigation.</p>
        </div>
      </noscript>
    </main>
  </div>

  <!-- Raycast / Linear Style Command Palette Modal (Ctrl + K) -->
  <div id="cmd-modal" class="fixed inset-0 z-50 hidden items-start justify-center pt-[11vh] px-4 bg-black/55 backdrop-blur-[1px]" onclick="if(event.target===this) window.TF.closeCommandPalette()">
    <div class="w-full max-w-xl wf-surface overflow-hidden shadow-2xl">
      <div class="flex items-center gap-2.5 px-4 h-12 border-b wf-border">
        <span class="wf-subtext">{ic_search}</span>
        <input id="cmd-input" type="text" placeholder="Jump to any course, lesson, note, example, or action..." class="flex-1 bg-transparent border-none focus:outline-none text-[14px] wf-text placeholder:text-[#747C87]" oninput="window.TF.renderCommandResults(this.value)" onkeydown="window.TF.handleCommandKey(event)" autocomplete="off" />
        <kbd class="font-mono text-[10.5px] px-1.5 py-0.5 rounded wf-elevated wf-subtext">ESC</kbd>
      </div>
      <div id="cmd-results" class="max-h-[370px] overflow-y-auto p-2 space-y-0.5"></div>
      <div class="px-4 py-2 border-t wf-border flex items-center justify-between text-[11px] wf-subtext font-mono">
        <span>↑↓ Navigate · Enter Open</span>
        <span>the-factory index</span>
      </div>
    </div>
  </div>

  <!-- Toast Feedback Banner -->
  <div id="tf-toast" class="fixed bottom-5 right-5 z-50 hidden items-center gap-2 px-3.5 py-2 rounded-lg bg-[#111418] text-[#F1F3F5] border border-[#29313B] text-[12.5px] font-medium shadow-lg"></div>

  <!-- Embedded Static Curriculum & SVG Blueprints from Rust -->
  <script id="tf-curriculum-data" type="application/json">{embedded_curriculum_json}</script>
"##
    )
}
