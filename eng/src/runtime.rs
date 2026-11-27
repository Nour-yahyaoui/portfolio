//! Client-side Workstation Engine (Part 1):
//! `localStorage` state persistence, routing (`history.pushState`), global `Ctrl + K`
//! command palette, Home Command Center, Roadmap (Visual DAG + Tree View), and Courses Library.

pub const CLIENT_RUNTIME_PART_1: &str = r##"
(function() {
  const STORAGE_KEY = 'the_factory_state_v1';
  const DATA = JSON.parse(document.getElementById('tf-curriculum-data').textContent);
  const BLUEPRINTS = window.__TF_BLUEPRINTS__ || {};

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function defaultState() {
    const t = todayKey();
    return {
      completedLessons: {},
      checkedTakeaways: {},
      inlineChecks: {},
      quizAnswers: {},
      drillDrafts: {},
      drillRubrics: {},
      drillRevealed: {},
      bookmarkedExamples: {},
      notes: (DATA.starterNotes || []).map(function(n, idx) {
        return {
          id: n.id,
          title: n.title,
          courseSlug: n.courseSlug,
          lessonSlug: '',
          tag: n.tag,
          content: n.content,
          updatedAt: Date.now() - (idx * 3600000)
        };
      }),
      activeNoteId: (DATA.starterNotes && DATA.starterNotes[0]) ? DATA.starterNotes[0].id : '',
      studyDays: { [t]: 1 },
      lastLesson: { courseSlug: 'systems-foundations', lessonSlug: 'invariants-and-state-machines' },
      activities: [
        { id: 'act-init', text: 'Initialized the-factory Engineering Workstation', kind: 'system', ts: Date.now() }
      ],
      ui: {
        sidebarCollapsed: false,
        homeCourseFilter: 'all',
        roadmapView: 'visual',
        roadmapFilter: 'all',
        roadmapSearch: '',
        selectedRoadmapCourse: 'systems-foundations',
        coursesSubject: 'all',
        coursesSort: 'roadmap',
        coursesLayout: 'grid',
        coursesSearch: '',
        practiceTab: 'questions',
        practiceCourse: 'all',
        practiceFilter: 'all',
        activeDrillId: 'drill-flash-drop',
        examplesType: 'all',
        activeExampleId: 'ex-shoveled-ticket',
        notesTag: 'all',
        notesSearch: '',
        noteViewMode: 'write'
      },
      settings: {
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        density: 'comfortable',
        dailyGoalMin: 30
      }
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const base = defaultState();
      const merged = Object.assign({}, base, parsed);
      merged.ui = Object.assign({}, base.ui, parsed.ui || {});
      merged.settings = Object.assign({}, base.settings, parsed.settings || {});
      merged.studyDays = Object.assign({}, parsed.studyDays || {});
      merged.studyDays[todayKey()] = (merged.studyDays[todayKey()] || 0) + 0;
      if (!Object.keys(merged.studyDays).length) merged.studyDays[todayKey()] = 1;
      if (!Array.isArray(merged.notes) || merged.notes.length === 0) merged.notes = base.notes;
      if (!Array.isArray(merged.activities)) merged.activities = base.activities;
      return merged;
    } catch (_) {
      return defaultState();
    }
  }

  let STATE = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
    } catch (_) {}
    syncShellTelemetry();
  }

  function logActivity(text, kind) {
    const t = todayKey();
    STATE.studyDays[t] = (STATE.studyDays[t] || 0) + 1;
    STATE.activities.unshift({
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      text: text,
      kind: kind || 'study',
      ts: Date.now()
    });
    if (STATE.activities.length > 40) STATE.activities.length = 40;
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function toast(msg) {
    const el = document.getElementById('tf-toast');
    if (!el) return;
    el.innerHTML = '<span class="w-2 h-2 rounded-full bg-[#10B981]"></span><span>' + esc(msg) + '</span>';
    el.classList.remove('hidden');
    el.classList.add('flex');
    clearTimeout(window.__tfToastTimer);
    window.__tfToastTimer = setTimeout(function() {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }, 2300);
  }

  function lessonKey(courseSlug, lessonSlug) {
    return courseSlug + '::' + lessonSlug;
  }

  function isLessonDone(courseSlug, lessonSlug) {
    return !!STATE.completedLessons[lessonKey(courseSlug, lessonSlug)];
  }

  function getCourse(slug) {
    return DATA.courses.find(function(c) { return c.slug === slug; }) || null;
  }

  function getFlatLessons(course) {
    const list = [];
    course.modules.forEach(function(m) {
      m.lessons.forEach(function(l) {
        list.push({ course: course, module: m, lesson: l });
      });
    });
    return list;
  }

  function getAllFlatLessons() {
    const all = [];
    DATA.courses.forEach(function(c) {
      getFlatLessons(c).forEach(function(item) { all.push(item); });
    });
    return all;
  }

  function getCourseProgress(course) {
    const lessons = getFlatLessons(course);
    const done = lessons.filter(function(x) { return isLessonDone(course.slug, x.lesson.slug); }).length;
    const total = lessons.length || 1;
    const pct = Math.round((done / total) * 100);
    let status = 'Not Started';
    if (done >= lessons.length) status = 'Completed';
    else if (done > 0) status = 'In Progress';
    return { done: done, total: lessons.length, pct: pct, status: status };
  }

  function isCourseUnlocked(course) {
    if (!course.prerequisites || !course.prerequisites.length) return true;
    return course.prerequisites.every(function(preSlug) {
      const pre = getCourse(preSlug);
      if (!pre) return true;
      return getCourseProgress(pre).done >= 1;
    });
  }

  function getStreakDays() {
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (STATE.studyDays && STATE.studyDays[k]) {
        streak++;
      } else if (i === 0) {
        streak = Math.max(streak, 1);
      } else {
        break;
      }
      d.setDate(d.getDate() - 1);
    }
    return Math.max(streak, 1);
  }

  function getGlobalMetrics() {
    const allLessons = getAllFlatLessons();
    const doneLessons = allLessons.filter(function(x) {
      return isLessonDone(x.course.slug, x.lesson.slug);
    }).length;
    const completedCourses = DATA.courses.filter(function(c) {
      return getCourseProgress(c).status === 'Completed';
    }).length;
    let solvedQuestions = 0;
    let correctQuestions = 0;
    DATA.questions.forEach(function(q) {
      if (STATE.quizAnswers[q.id] !== undefined) {
        solvedQuestions++;
        if (STATE.quizAnswers[q.id] === q.correctIndex) correctQuestions++;
      }
    });
    const overallPct = allLessons.length ? Math.round((doneLessons / allLessons.length) * 100) : 0;
    return {
      totalLessons: allLessons.length,
      doneLessons: doneLessons,
      totalCourses: DATA.courses.length,
      completedCourses: completedCourses,
      totalQuestions: DATA.questions.length,
      solvedQuestions: solvedQuestions,
      correctQuestions: correctQuestions,
      overallPct: overallPct,
      streak: getStreakDays()
    };
  }

  function getNextTargetLesson() {
    if (STATE.lastLesson && STATE.lastLesson.courseSlug && STATE.lastLesson.lessonSlug) {
      const c = getCourse(STATE.lastLesson.courseSlug);
      if (c) {
        const flat = getFlatLessons(c);
        const found = flat.find(function(x) { return x.lesson.slug === STATE.lastLesson.lessonSlug; });
        if (found && !isLessonDone(c.slug, found.lesson.slug)) return found;
      }
    }
    const all = getAllFlatLessons();
    return all.find(function(x) { return !isLessonDone(x.course.slug, x.lesson.slug); }) || all[0];
  }

  function applyThemeAndDensity() {
    const pref = STATE.settings.theme || 'light';
    const isDark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    document.body.setAttribute('data-density', STATE.settings.density || 'comfortable');
    const sb = document.getElementById('app-sidebar');
    if (sb) sb.setAttribute('data-collapsed', STATE.ui.sidebarCollapsed ? 'true' : 'false');
  }

  function syncShellTelemetry() {
    const m = getGlobalMetrics();
    const miniPct = document.getElementById('sb-mini-pct');
    const miniBar = document.getElementById('sb-mini-bar');
    const notesCnt = document.getElementById('sb-notes-count');
    const streakLbl = document.getElementById('top-streak-label');
    if (miniPct) miniPct.textContent = m.overallPct + '%';
    if (miniBar) miniBar.style.width = m.overallPct + '%';
    if (notesCnt) notesCnt.textContent = String(STATE.notes.length);
    if (streakLbl) streakLbl.textContent = m.streak + 'd streak';
  }

  function formatRelTime(ts) {
    const diffSec = Math.max(1, Math.floor((Date.now() - ts) / 1000));
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return Math.floor(diffSec / 60) + 'm ago';
    if (diffSec < 86400) return Math.floor(diffSec / 3600) + 'h ago';
    return Math.floor(diffSec / 86400) + 'd ago';
  }

  function statusBadgeHtml(status) {
    if (status === 'Completed') {
      return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#10B981]/15 text-[#10B981]">Completed</span>';
    }
    if (status === 'In Progress') {
      return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#10B981] text-white">In Progress</span>';
    }
    return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#29313B]/75 text-[#E6EDF3]">Not Started</span>';
  }

  // =========================================================================
  // HOME DASHBOARD VIEW
  // =========================================================================
  function renderHomeView() {
    const m = getGlobalMetrics();
    const target = getNextTargetLesson();
    const targetProg = getCourseProgress(target.course);
    const radius = 44;
    const circ = +(2 * Math.PI * radius).toFixed(2);
    const offset = +(circ - (m.overallPct / 100) * circ).toFixed(2);

    const filter = STATE.ui.homeCourseFilter || 'all';
    const filteredCourses = DATA.courses.filter(function(c) {
      const st = getCourseProgress(c).status;
      if (filter === 'in-progress') return st === 'In Progress';
      if (filter === 'not-started') return st === 'Not Started';
      if (filter === 'completed') return st === 'Completed';
      return true;
    }).slice(0, 4);

    const nextQuestion = DATA.questions.find(function(q) { return STATE.quizAnswers[q.id] === undefined; }) || DATA.questions[0];
    const nextExample = DATA.examples[0];

    const roadmapNodesHtml = DATA.courses.map(function(c, idx) {
      const p = getCourseProgress(c);
      const unlocked = isCourseUnlocked(c);
      let dotCls = 'border-[#747C87]/50 bg-transparent text-[#747C87]';
      let tag = 'Upcoming';
      if (p.status === 'Completed') {
        dotCls = 'border-[#10B981] bg-[#10B981] text-white';
        tag = 'Completed';
      } else if (c.slug === target.course.slug || p.status === 'In Progress') {
        dotCls = 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] ring-4 ring-[#10B981]/10';
        tag = 'Current';
      } else if (!unlocked) {
        dotCls = 'border-dashed border-[#747C87]/40 wf-subtext opacity-65';
        tag = 'Prerequisite';
      }
      const connector = idx < DATA.courses.length - 1
        ? '<div class="hidden md:block flex-1 h-[1.5px] mx-1 ' + (p.status === 'Completed' ? 'bg-[#10B981]' : 'bg-[var(--border-subtle)]') + '"></div>'
        : '';
      return '' +
        '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="group flex items-center gap-2.5 min-w-[138px] md:min-w-0">' +
          '<div class="w-7 h-7 rounded-full border-2 flex items-center justify-center font-mono text-[11px] font-semibold shrink-0 transition ' + dotCls + '">' +
            (p.status === 'Completed' ? '✓' : (idx + 1)) +
          '</div>' +
          '<div class="min-w-0">' +
            '<div class="font-mono text-[10.5px] wf-subtext">' + esc(c.code) + ' · ' + tag + '</div>' +
            '<div class="text-[12.5px] font-medium wf-text group-hover:text-[#10B981] truncate max-w-[125px] transition">' + esc(c.subject) + '</div>' +
          '</div>' +
        '</a>' + connector;
    }).join('');

    const courseCardsHtml = filteredCourses.length ? filteredCourses.map(function(c) {
      const p = getCourseProgress(c);
      const firstLesson = getFlatLessons(c).find(function(x) { return !isLessonDone(c.slug, x.lesson.slug); }) || getFlatLessons(c)[0];
      const lessonHref = '/lessons/' + c.slug + '/' + firstLesson.lesson.slug;
      const thumb = BLUEPRINTS[c.thumbnailKind] || BLUEPRINTS.systems || '';
      return '' +
        '<div class="wf-surface overflow-hidden flex flex-col hover:border-[#10B981]/50 transition">' +
          '<div class="relative h-[112px] bg-[#111418] border-b wf-border overflow-hidden">' +
            thumb +
            '<div class="absolute top-2.5 right-2.5">' + statusBadgeHtml(p.status) + '</div>' +
            '<div class="absolute bottom-2 left-2.5 font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-[#111418]/85 text-[#929BA8] border border-[#29313B]">' + esc(c.code) + '</div>' +
          '</div>' +
          '<div class="p-4 flex-1 flex flex-col justify-between">' +
            '<div>' +
              '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="block text-[14.5px] font-semibold wf-text hover:text-[#10B981] transition leading-snug mb-1">' + esc(c.title) + '</a>' +
              '<p class="text-[12.5px] wf-subtext line-clamp-2 leading-relaxed mb-3">' + esc(c.subtitle) + '</p>' +
            '</div>' +
            '<div>' +
              '<div class="flex items-center justify-between text-[11.5px] font-mono wf-subtext mb-1.5">' +
                '<span>' + p.done + '/' + p.total + ' lessons</span>' +
                '<span class="wf-text font-semibold">' + p.pct + '%</span>' +
              '</div>' +
              '<div class="w-full h-1.5 rounded-full wf-muted overflow-hidden mb-3.5">' +
                '<div class="h-full bg-[#10B981] transition-all duration-300" style="width:' + p.pct + '%"></div>' +
              '</div>' +
              '<div class="flex items-center justify-between gap-2">' +
                '<a href="' + esc(lessonHref) + '" onclick="return window.TF.nav(event, \'' + esc(lessonHref) + '\')" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full wf-elevated hover:border-[#10B981] text-[12px] font-medium wf-text transition">' +
                  '<span class="w-4 h-4 rounded-full bg-[#111418] dark:bg-[#F1F3F5] text-white dark:text-[#111418] inline-flex items-center justify-center text-[9px]">▶</span>' +
                  '<span>' + (p.done > 0 ? 'Continue →' : 'Start Course →') + '</span>' +
                '</a>' +
                '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="text-[11.5px] font-mono wf-subtext hover:wf-text px-1.5 py-1" title="Course details">Syllabus</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('') : '<div class="col-span-full wf-surface p-6 text-center text-[13px] wf-subtext">No courses match the selected filter yet.</div>';

    const activitiesHtml = (STATE.activities || []).slice(0, 4).map(function(a) {
      return '' +
        '<div class="flex items-start justify-between gap-3 py-2 border-b last:border-b-0 wf-border">' +
          '<div class="flex items-start gap-2.5 min-w-0">' +
            '<span class="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0"></span>' +
            '<span class="text-[12.5px] wf-text leading-snug truncate">' + esc(a.text) + '</span>' +
          '</div>' +
          '<span class="font-mono text-[11px] wf-subtext shrink-0">' + formatRelTime(a.ts) + '</span>' +
        '</div>';
    }).join('');

    const targetHref = '/lessons/' + target.course.slug + '/' + target.lesson.slug;

    return '' +
      '<div class="max-w-[1380px] mx-auto p-4 sm:p-6 space-y-5">' +
        '<!-- Row 1: Asymmetric Hero (8) + Progress Telemetry (4) -->' +
        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5">' +
          '<div class="lg:col-span-8 relative rounded-xl bg-[#111418] border border-[#242C37] overflow-hidden min-h-[228px] flex items-center">' +
            '<div class="relative z-10 p-6 sm:p-7 max-w-xl">' +
              '<div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1B222C] border border-[#2B3441] text-[11.5px] font-medium text-[#D0D6DF] mb-4">' +
                '<span class="w-2 h-2 rounded-full bg-[#10B981]"></span>' +
                '<span>Your Learning Journey</span>' +
              '</div>' +
              '<h1 class="text-[26px] sm:text-[32px] font-bold tracking-tight text-[#F1F3F5] leading-[1.15] mb-2.5">' +
                'Build Your <span class="text-[#10B981]">Engineering</span><br/>Skills, Step by Step.' +
              '</h1>' +
              '<p class="text-[13.5px] text-[#929BA8] mb-5">Learn deeply. Practice consistently. Understand everything.</p>' +
              '<div class="flex flex-wrap items-center gap-3">' +
                '<a href="' + esc(targetHref) + '" onclick="return window.TF.nav(event, \'' + esc(targetHref) + '\')" class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F1F3F5] hover:bg-white text-[#111418] text-[13px] font-semibold transition">' +
                  '<span class="w-4 h-4 rounded-full bg-[#111418] text-[#F1F3F5] inline-flex items-center justify-center text-[8.5px]">▶</span>' +
                  '<span>Continue Learning →</span>' +
                '</a>' +
                '<span class="font-mono text-[11.5px] text-[#929BA8] px-2.5 py-1 rounded-md bg-[#171C23] border border-[#262E3A]">' +
                  esc(target.course.code + ' · ' + target.lesson.code) +
                '</span>' +
              '</div>' +
            '</div>' +
            '<div class="hidden sm:block absolute right-0 inset-y-0 w-[56%] opacity-95 pointer-events-none">' +
              (BLUEPRINTS.hero || '') +
            '</div>' +
          '</div>' +

          '<div class="lg:col-span-4 wf-surface wf-pad p-5 flex flex-col justify-between">' +
            '<div class="flex items-center justify-between mb-3">' +
              '<div class="text-[14.5px] font-semibold wf-text">Your Progress</div>' +
              '<a href="/progress" onclick="return window.TF.nav(event, \'/progress\')" class="text-[12px] wf-subtext hover:text-[#10B981] font-medium transition">View Details →</a>' +
            '</div>' +
            '<div class="flex items-center gap-5 my-2">' +
              '<div class="relative w-[106px] h-[106px] shrink-0">' +
                '<svg class="w-full h-full -rotate-90" viewBox="0 0 108 108">' +
                  '<circle cx="54" cy="54" r="' + radius + '" fill="none" stroke="var(--border-subtle)" stroke-width="8.5"></circle>' +
                  '<circle cx="54" cy="54" r="' + radius + '" fill="none" stroke="#10B981" stroke-width="8.5" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '"></circle>' +
                '</svg>' +
                '<div class="absolute inset-0 flex items-center justify-center font-semibold text-[20px] wf-text">' + m.overallPct + '%</div>' +
              '</div>' +
              '<div>' +
                '<div class="text-[12px] wf-subtext mb-0.5">Overall Progress</div>' +
                '<div class="text-[22px] font-bold wf-text leading-tight">' + m.doneLessons + ' <span class="font-normal wf-subtext text-[17px]">/ ' + m.totalLessons + '</span></div>' +
                '<div class="text-[12px] wf-subtext">Lessons Completed</div>' +
              '</div>' +
            '</div>' +
            '<div class="grid grid-cols-3 gap-2 pt-3 border-t wf-border text-center">' +
              '<div class="wf-elevated py-2 px-1.5">' +
                '<div class="text-[14px] font-bold wf-text font-mono">' + m.completedCourses + '/' + m.totalCourses + '</div>' +
                '<div class="text-[11px] wf-subtext">Courses</div>' +
              '</div>' +
              '<div class="wf-elevated py-2 px-1.5">' +
                '<div class="text-[14px] font-bold wf-text font-mono">' + m.solvedQuestions + '/' + m.totalQuestions + '</div>' +
                '<div class="text-[11px] wf-subtext">Solved</div>' +
              '</div>' +
              '<div class="wf-elevated py-2 px-1.5">' +
                '<div class="text-[14px] font-bold text-[#10B981] font-mono">' + m.streak + 'd</div>' +
                '<div class="text-[11px] wf-subtext">Streak</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<!-- Current Learning Position Bar -->' +
        '<div class="wf-surface px-5 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">' +
          '<div class="flex items-start sm:items-center gap-3.5 min-w-0">' +
            '<div class="w-9 h-9 rounded-lg bg-[#10B981]/12 border border-[#10B981]/30 text-[#10B981] font-mono text-[11.5px] font-semibold flex items-center justify-center shrink-0">' + esc(target.course.code.replace('ENG-', '')) + '</div>' +
            '<div class="min-w-0">' +
              '<div class="flex flex-wrap items-center gap-1.5 text-[11.5px] font-mono wf-subtext">' +
                '<span class="text-[#10B981] font-medium">CURRENT POSITION</span>' +
                '<span>·</span><span>' + esc(target.course.subject) + '</span>' +
                '<span>·</span><span>' + esc(target.module.title) + '</span>' +
              '</div>' +
              '<div class="text-[14.5px] font-semibold wf-text truncate">' + esc(target.lesson.title) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="flex items-center gap-4 shrink-0">' +
            '<div class="hidden sm:block w-36">' +
              '<div class="flex justify-between text-[11px] font-mono wf-subtext mb-1"><span>Course</span><span>' + targetProg.pct + '%</span></div>' +
              '<div class="h-1.5 rounded-full wf-muted overflow-hidden"><div class="h-full bg-[#10B981]" style="width:' + targetProg.pct + '%"></div></div>' +
            '</div>' +
            '<a href="' + esc(targetHref) + '" onclick="return window.TF.nav(event, \'' + esc(targetHref) + '\')" class="px-3.5 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12.5px] font-semibold transition">Resume Lesson →</a>' +
          '</div>' +
        '</div>' +

        '<!-- Row 2: Roadmap + Courses + Quick Access (8) | Today Plan + Activity (4) -->' +
        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5">' +
          '<div class="lg:col-span-8 space-y-5">' +
            '<!-- Connected Roadmap Preview -->' +
            '<div class="wf-surface p-4 sm:p-5">' +
              '<div class="flex items-center justify-between gap-2 mb-3.5">' +
                '<div>' +
                  '<h2 class="text-[15px] font-semibold wf-text">Learning Roadmap Path</h2>' +
                  '<p class="text-[12px] wf-subtext">Connected engineering progression from Systems Foundations to Technical Leadership</p>' +
                '</div>' +
                '<a href="/roadmap" onclick="return window.TF.nav(event, \'/roadmap\')" class="text-[12px] font-medium text-[#10B981] hover:underline shrink-0">Interactive Graph →</a>' +
              '</div>' +
              '<div class="flex items-center gap-3 overflow-x-auto pb-1">' + roadmapNodesHtml + '</div>' +
            '</div>' +

            '<!-- Course Cards Preview Section -->' +
            '<div>' +
              '<div class="flex flex-wrap items-center justify-between gap-2 mb-3">' +
                '<h2 class="text-[16px] font-semibold wf-text">Your Engineering Courses</h2>' +
                '<div class="flex items-center gap-1 p-1 rounded-lg wf-surface">' +
                  ['all:All', 'in-progress:In Progress', 'not-started:Not Started', 'completed:Completed'].map(function(pair) {
                    const parts = pair.split(':');
                    const active = filter === parts[0];
                    return '<button type="button" onclick="window.TF.setUi(\'homeCourseFilter\', \'' + parts[0] + '\')" class="px-2.5 py-1 rounded-md text-[12px] font-medium transition ' +
                      (active ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext hover:wf-text') + '">' + parts[1] + '</button>';
                  }).join('') +
                '</div>' +
              '</div>' +
              '<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">' + courseCardsHtml + '</div>' +
            '</div>' +

            '<!-- Quick Access -->' +
            '<div>' +
              '<h2 class="text-[15px] font-semibold wf-text mb-2.5">Quick Access</h2>' +
              '<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">' +
                [
                  { href: '/practice', title: 'Take a Quiz', sub: 'Test decision judgment', icon: BLUEPRINTS.icQuiz || 'Q' },
                  { href: '/notes', title: 'View Notes', sub: STATE.notes.length + ' local specs & notes', icon: BLUEPRINTS.icNotes || 'N' },
                  { href: '/examples', title: 'Explore Examples', sub: '7 real ADRs & specs', icon: BLUEPRINTS.icCode || '</>' },
                  { href: '/progress', title: 'Check Progress', sub: 'Track mastery telemetry', icon: BLUEPRINTS.icProgress || '%' }
                ].map(function(q) {
                  return '<a href="' + q.href + '" onclick="return window.TF.nav(event, \'' + q.href + '\')" class="wf-surface p-3.5 flex items-center gap-3 hover:border-[#10B981]/60 transition">' +
                    '<div class="w-9 h-9 rounded-lg wf-elevated flex items-center justify-center wf-text shrink-0">' + q.icon + '</div>' +
                    '<div class="min-w-0">' +
                      '<div class="text-[13px] font-semibold wf-text truncate">' + q.title + '</div>' +
                      '<div class="text-[11.5px] wf-subtext truncate">' + esc(q.sub) + '</div>' +
                    '</div>' +
                  '</a>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- Right Column: Today Plan + Recent Activity + Engineering Principle -->' +
          '<div class="lg:col-span-4 space-y-5">' +
            '<div class="wf-surface p-5">' +
              '<div class="flex items-center justify-between mb-4">' +
                '<h2 class="text-[15px] font-semibold wf-text">Today\'s Plan</h2>' +
                '<span class="font-mono text-[11px] wf-subtext">Target: ' + STATE.settings.dailyGoalMin + 'm</span>' +
              '</div>' +
              '<div class="relative pl-5 space-y-4 before:content-[\'\'] before:absolute before:left-[6px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[var(--border-subtle)]">' +
                '<div class="relative">' +
                  '<span class="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/15"></span>' +
                  '<div class="flex items-start justify-between gap-2">' +
                    '<a href="' + esc(targetHref) + '" onclick="return window.TF.nav(event, \'' + esc(targetHref) + '\')" class="text-[13px] font-semibold wf-text hover:text-[#10B981] transition">Next Lesson: ' + esc(target.lesson.title) + '</a>' +
                    '<span class="font-mono text-[11px] wf-subtext shrink-0">' + target.lesson.durationMin + 'm</span>' +
                  '</div>' +
                  '<div class="text-[11.5px] wf-subtext">' + esc(target.course.title) + '</div>' +
                '</div>' +
                '<div class="relative">' +
                  '<span class="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full border-2 border-[#10B981] bg-[var(--bg-surface)]"></span>' +
                  '<div class="flex items-start justify-between gap-2">' +
                    '<a href="/practice" onclick="return window.TF.nav(event, \'/practice\')" class="text-[13px] font-medium wf-text hover:text-[#10B981] transition">Practice: ' + esc(nextQuestion.category) + '</a>' +
                    '<span class="font-mono text-[11px] wf-subtext shrink-0">5m</span>' +
                  '</div>' +
                  '<div class="text-[11.5px] wf-subtext">Scenario judgment drill + Flash Drop lab</div>' +
                '</div>' +
                '<div class="relative">' +
                  '<span class="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-[var(--border-subtle)]"></span>' +
                  '<div class="flex items-start justify-between gap-2">' +
                    '<a href="/examples" onclick="return window.TF.nav(event, \'/examples\')" class="text-[13px] font-medium wf-text hover:text-[#10B981] transition">Review Artifact: ' + esc(nextExample.artifactType) + '</a>' +
                    '<span class="font-mono text-[11px] wf-subtext shrink-0">5m</span>' +
                  '</div>' +
                  '<div class="text-[11.5px] wf-subtext">' + esc(nextExample.title) + '</div>' +
                '</div>' +
              '</div>' +
              '<a href="' + esc(targetHref) + '" onclick="return window.TF.nav(event, \'' + esc(targetHref) + '\')" class="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111418] hover:bg-[#1C222A] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white text-[13px] font-semibold transition">' +
                '<span>Start Today →</span>' +
              '</a>' +
            '</div>' +

            '<div class="wf-surface p-5">' +
              '<div class="flex items-center justify-between mb-2.5">' +
                '<h2 class="text-[14.5px] font-semibold wf-text">Recent Activity</h2>' +
                '<span class="font-mono text-[10.5px] wf-subtext">localStorage</span>' +
              '</div>' +
              '<div>' + activitiesHtml + '</div>' +
            '</div>' +

            '<div class="rounded-xl bg-[#111418] border border-[#242C37] p-5 text-[#F1F3F5]">' +
              '<div class="font-mono text-[11px] text-[#10B981] mb-1.5">// WORKSTATION PRINCIPLE</div>' +
              '<p class="text-[13.5px] italic text-[#E2E8F0] leading-relaxed mb-3">&ldquo;Any developer can make code work once. An engineer designs boundaries and specs so a whole team ships safely at speed.&rdquo;</p>' +
              '<div class="flex items-center gap-1.5">' +
                '<span class="w-4 h-1 rounded-full bg-[#10B981]"></span>' +
                '<span class="w-1.5 h-1.5 rounded-full bg-[#29313B]"></span>' +
                '<span class="w-1.5 h-1.5 rounded-full bg-[#29313B]"></span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // =========================================================================
  // ROADMAP WORKSPACE (VISUAL DAG + TREE VIEW)
  // =========================================================================
  function renderRoadmapView() {
    const mode = STATE.ui.roadmapView || 'visual';
    const filter = STATE.ui.roadmapFilter || 'all';
    const q = (STATE.ui.roadmapSearch || '').trim().toLowerCase();
    const target = getNextTargetLesson();

    function matchesCourse(c) {
      const p = getCourseProgress(c);
      const unlocked = isCourseUnlocked(c);
      if (filter === 'completed' && p.status !== 'Completed') return false;
      if (filter === 'in-progress' && p.status !== 'In Progress') return false;
      if (filter === 'locked' && unlocked) return false;
      if (!q) return true;
      if ((c.title + ' ' + c.code + ' ' + c.subtitle + ' ' + c.subject).toLowerCase().includes(q)) return true;
      return getFlatLessons(c).some(function(x) {
        return (x.lesson.title + ' ' + x.lesson.code).toLowerCase().includes(q);
      });
    }

    let bodyHtml = '';
    if (mode === 'visual') {
      // Precision SVG + Node Coordinate Layout (Desktop 4-Phase DAG)
      const coords = {
        'systems-foundations':       { x: 40,  y: 135 },
        'decision-making':           { x: 315, y: 45  },
        'task-shaping':              { x: 315, y: 225 },
        'team-task-division':        { x: 600, y: 45  },
        'rust-backend-architecture': { x: 600, y: 225 },
        'technical-leadership':      { x: 885, y: 135 }
      };
      const nodeW = 215;
      const nodeH = 104;

      let linesSvg = '';
      DATA.courses.forEach(function(c) {
        const to = coords[c.slug];
        if (!to) return;
        (c.prerequisites || []).forEach(function(preSlug) {
          const from = coords[preSlug];
          if (!from) return;
          const preCourse = getCourse(preSlug);
          const preDone = preCourse && getCourseProgress(preCourse).done > 0;
          const x1 = from.x + nodeW;
          const y1 = from.y + nodeH / 2;
          const x2 = to.x;
          const y2 = to.y + nodeH / 2;
          const cx = (x1 + x2) / 2;
          linesSvg += '<path d="M ' + x1 + ' ' + y1 + ' C ' + cx + ' ' + y1 + ', ' + cx + ' ' + y2 + ', ' + x2 + ' ' + y2 + '" fill="none" stroke="' +
            (preDone ? '#10B981' : '#747C87') + '" stroke-opacity="' + (preDone ? '0.85' : '0.35') + '" stroke-width="1.75" ' +
            (preDone ? '' : 'stroke-dasharray="4 4"') + '/>';
          linesSvg += '<circle cx="' + x2 + '" cy="' + y2 + '" r="3" fill="' + (preDone ? '#10B981' : '#747C87') + '"/>';
        });
      });

      const nodesHtml = DATA.courses.map(function(c) {
        const pos = coords[c.slug] || { x: 40, y: 40 };
        const p = getCourseProgress(c);
        const unlocked = isCourseUnlocked(c);
        const isSelected = STATE.ui.selectedRoadmapCourse === c.slug;
        const dim = !matchesCourse(c) ? 'opacity-30' : '';
        let borderCls = 'wf-border';
        let badge = '<span class="font-mono text-[10px] wf-subtext">UPCOMING</span>';
        if (p.status === 'Completed') {
          borderCls = '!border-[#10B981]';
          badge = '<span class="font-mono text-[10px] text-[#10B981] font-semibold">✓ COMPLETED</span>';
        } else if (c.slug === target.course.slug || p.status === 'In Progress') {
          borderCls = '!border-[#10B981] ring-2 ring-[#10B981]/20';
          badge = '<span class="font-mono text-[10px] text-[#10B981] font-semibold">● CURRENT</span>';
        } else if (!unlocked) {
          badge = '<span class="font-mono text-[10px] wf-subtext">LOCKED · PREREQ</span>';
        }
        return '' +
          '<button type="button" onclick="window.TF.selectRoadmapNode(\'' + esc(c.slug) + '\')" style="left:' + pos.x + 'px;top:' + pos.y + 'px;width:' + nodeW + 'px;height:' + nodeH + 'px" class="absolute text-left p-3.5 wf-surface ' + borderCls + ' ' + (isSelected ? 'ring-2 ring-[#3977B8]/40' : '') + ' ' + dim + ' hover:border-[#10B981] transition flex flex-col justify-between">' +
            '<div class="flex items-center justify-between gap-1">' +
              '<span class="font-mono text-[11px] font-semibold wf-subtext">' + esc(c.code) + '</span>' +
              badge +
            '</div>' +
            '<div class="text-[13px] font-semibold wf-text leading-snug line-clamp-2">' + esc(c.title) + '</div>' +
            '<div class="w-full flex items-center gap-2">' +
              '<div class="flex-1 h-1.5 rounded-full wf-muted overflow-hidden"><div class="h-full bg-[#10B981]" style="width:' + p.pct + '%"></div></div>' +
              '<span class="font-mono text-[10.5px] wf-subtext">' + p.done + '/' + p.total + '</span>' +
            '</div>' +
          '</button>';
      }).join('');

      const sel = getCourse(STATE.ui.selectedRoadmapCourse) || DATA.courses[0];
      const selProg = getCourseProgress(sel);
      const selLessonsHtml = getFlatLessons(sel).map(function(item) {
        const done = isLessonDone(sel.slug, item.lesson.slug);
        const href = '/lessons/' + sel.slug + '/' + item.lesson.slug;
        return '<a href="' + esc(href) + '" onclick="return window.TF.nav(event, \'' + esc(href) + '\')" class="flex items-center justify-between gap-3 p-2.5 rounded-lg wf-elevated hover:border-[#10B981] transition">' +
          '<div class="flex items-center gap-2.5 min-w-0">' +
            '<span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono shrink-0 ' + (done ? 'bg-[#10B981] text-white' : 'border wf-border wf-subtext') + '">' + (done ? '✓' : '·') + '</span>' +
            '<span class="font-mono text-[11px] wf-subtext shrink-0">' + esc(item.lesson.code) + '</span>' +
            '<span class="text-[13px] font-medium wf-text truncate">' + esc(item.lesson.title) + '</span>' +
          '</div>' +
          '<span class="font-mono text-[11px] wf-subtext shrink-0">' + item.lesson.durationMin + 'm →</span>' +
        '</a>';
      }).join('');

      bodyHtml = '' +
        '<div class="wf-surface p-4 overflow-x-auto">' +
          '<div class="flex items-center justify-between text-[11px] font-mono wf-subtext px-2 pb-2 border-b wf-border min-w-[1120px]">' +
            '<span>PHASE 01 // FOUNDATIONS</span>' +
            '<span>PHASE 02 // DECISIONS &amp; SPECS</span>' +
            '<span>PHASE 03 // TEAM &amp; RUST SYSTEMS</span>' +
            '<span>PHASE 04 // LEADERSHIP</span>' +
          '</div>' +
          '<div class="relative min-w-[1120px] h-[370px]">' +
            '<svg class="absolute inset-0 w-[1120px] h-[370px] pointer-events-none" viewBox="0 0 1120 370">' + linesSvg + '</svg>' +
            nodesHtml +
          '</div>' +
        '</div>' +
        '<div class="wf-surface p-5">' +
          '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b wf-border">' +
            '<div>' +
              '<div class="font-mono text-[11.5px] text-[#10B981] mb-0.5">' + esc(sel.code) + ' · SELECTED NODE INSPECTOR</div>' +
              '<h3 class="text-[17px] font-bold wf-text">' + esc(sel.title) + '</h3>' +
              '<p class="text-[13px] wf-subtext mt-0.5">' + esc(sel.subtitle) + '</p>' +
            '</div>' +
            '<div class="flex items-center gap-2 shrink-0">' +
              '<span class="font-mono text-[12px] wf-subtext mr-2">' + selProg.done + '/' + selProg.total + ' completed</span>' +
              '<a href="/courses/' + esc(sel.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(sel.slug) + '\')" class="px-3.5 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12.5px] font-semibold transition">Open Course →</a>' +
            '</div>' +
          '</div>' +
          '<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">' + selLessonsHtml + '</div>' +
        '</div>';
    } else {
      // Structured Tree View Hierarchy
      const treeCourses = DATA.courses.filter(matchesCourse);
      bodyHtml = '<div class="space-y-4">' + treeCourses.map(function(c) {
        const p = getCourseProgress(c);
        const prereqs = (c.prerequisites && c.prerequisites.length)
          ? 'Prereq: ' + c.prerequisites.map(function(s) { const pc = getCourse(s); return pc ? pc.code : s; }).join(', ')
          : 'Entry Track (No Prerequisites)';
        return '' +
          '<div class="wf-surface p-5">' +
            '<div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b wf-border">' +
              '<div>' +
                '<div class="flex items-center gap-2 mb-1">' +
                  '<span class="font-mono text-[11.5px] px-2 py-0.5 rounded wf-elevated wf-text font-semibold">' + esc(c.code) + '</span>' +
                  '<span class="font-mono text-[11px] wf-subtext">Phase ' + c.phase + ' · ' + esc(prereqs) + '</span>' +
                '</div>' +
                '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="text-[16px] font-bold wf-text hover:text-[#10B981] transition">' + esc(c.title) + '</a>' +
              '</div>' +
              '<div class="flex items-center gap-3">' +
                '<span class="font-mono text-[12px] wf-subtext">' + p.done + '/' + p.total + ' (' + p.pct + '%)</span>' +
                statusBadgeHtml(p.status) +
              '</div>' +
            '</div>' +
            '<div class="pl-3 border-l-2 wf-border space-y-3">' +
              c.modules.map(function(mod) {
                return '<div>' +
                  '<div class="text-[12.5px] font-semibold wf-text mb-1.5"><span class="font-mono text-[11px] wf-subtext mr-1.5">' + esc(mod.code) + '</span>' + esc(mod.title) + '</div>' +
                  '<div class="pl-4 border-l wf-border space-y-1.5">' +
                    mod.lessons.map(function(l) {
                      const done = isLessonDone(c.slug, l.slug);
                      const href = '/lessons/' + c.slug + '/' + l.slug;
                      return '<div class="flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-lg hover:bg-[var(--bg-muted)] transition">' +
                        '<a href="' + esc(href) + '" onclick="return window.TF.nav(event, \'' + esc(href) + '\')" class="flex items-center gap-2.5 min-w-0 flex-1">' +
                          '<span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ' + (done ? 'bg-[#10B981] text-white' : 'border wf-border wf-subtext') + '">' + (done ? '✓' : '') + '</span>' +
                          '<span class="font-mono text-[11px] wf-subtext shrink-0">' + esc(l.code) + '</span>' +
                          '<span class="text-[13px] wf-text hover:text-[#10B981] truncate">' + esc(l.title) + '</span>' +
                        '</a>' +
                        '<span class="font-mono text-[11px] wf-subtext shrink-0">' + l.durationMin + 'm</span>' +
                      '</div>';
                    }).join('') +
                  '</div>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>';
      }).join('') + '</div>';
    }

    return '' +
      '<div class="max-w-[1320px] mx-auto p-4 sm:p-6 space-y-5">' +
        '<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">' +
          '<div>' +
            '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Knowledge Navigation</div>' +
            '<h1 class="text-[24px] font-bold tracking-tight wf-text">Learning Roadmap</h1>' +
            '<p class="text-[13.5px] wf-subtext mt-0.5">Prerequisite graph and full module tree from foundational invariants to leading engineering teams.</p>' +
          '</div>' +
          '<div class="flex flex-wrap items-center gap-2.5">' +
            '<input type="text" value="' + esc(STATE.ui.roadmapSearch || '') + '" oninput="window.TF.setUiSilent(\'roadmapSearch\', this.value, true)" placeholder="Filter nodes or lessons..." class="wf-input h-9 px-3 text-[13px] w-48 sm:w-56" />' +
            '<div class="inline-flex p-1 rounded-lg wf-surface">' +
              '<button type="button" onclick="window.TF.setUi(\'roadmapView\', \'visual\')" class="px-3 py-1 rounded-md text-[12px] font-medium transition ' + (mode === 'visual' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Visual Roadmap</button>' +
              '<button type="button" onclick="window.TF.setUi(\'roadmapView\', \'tree\')" class="px-3 py-1 rounded-md text-[12px] font-medium transition ' + (mode === 'tree' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Tree View</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex flex-wrap items-center justify-between gap-3">' +
          '<div class="flex flex-wrap items-center gap-1.5">' +
            ['all:All Nodes', 'in-progress:In Progress', 'completed:Completed', 'locked:Locked by Prereq'].map(function(p) {
              const kv = p.split(':');
              const act = filter === kv[0];
              return '<button type="button" onclick="window.TF.setUi(\'roadmapFilter\', \'' + kv[0] + '\')" class="px-2.5 py-1 rounded-md text-[12px] font-medium border transition ' +
                (act ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]' : 'wf-surface wf-subtext hover:wf-text') + '">' + kv[1] + '</button>';
            }).join('') +
          '</div>' +
          '<div class="flex items-center gap-4 text-[11.5px] font-mono wf-subtext">' +
            '<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>Completed / Active</span>' +
            '<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full border border-[#747C87]"></span>Upcoming</span>' +
          '</div>' +
        '</div>' +
        bodyHtml +
      '</div>';
  }

  // =========================================================================
  // COURSES LIBRARY & COURSE DETAIL
  // =========================================================================
  function renderCoursesView() {
    const subj = STATE.ui.coursesSubject || 'all';
    const sortBy = STATE.ui.coursesSort || 'roadmap';
    const layout = STATE.ui.coursesLayout || 'grid';
    const q = (STATE.ui.coursesSearch || '').trim().toLowerCase();

    let list = DATA.courses.filter(function(c) {
      if (subj !== 'all' && c.subjectSlug !== subj) return false;
      if (!q) return true;
      return (c.title + ' ' + c.subtitle + ' ' + c.code + ' ' + c.subject).toLowerCase().includes(q);
    });

    list = list.slice().sort(function(a, b) {
      if (sortBy === 'progress') return getCourseProgress(b).pct - getCourseProgress(a).pct;
      if (sortBy === 'difficulty') return a.difficultyLevel - b.difficultyLevel;
      if (sortBy === 'duration') return a.totalMinutes - b.totalMinutes;
      return a.phase - b.phase;
    });

    const subjects = [
      ['all', 'All Subjects'],
      ['systems-design', 'Systems & Design'],
      ['decision-making', 'Decision Making'],
      ['task-shaping', 'Task Shaping'],
      ['team-execution', 'Team Execution'],
      ['leadership', 'Leadership'],
      ['rust-architecture', 'Rust Architecture']
    ];

    const cardsHtml = list.map(function(c) {
      const p = getCourseProgress(c);
      const nextL = getFlatLessons(c).find(function(x) { return !isLessonDone(c.slug, x.lesson.slug); }) || getFlatLessons(c)[0];
      const resumeHref = '/lessons/' + c.slug + '/' + nextL.lesson.slug;
      const thumb = BLUEPRINTS[c.thumbnailKind] || BLUEPRINTS.systems || '';

      if (layout === 'list') {
        return '' +
          '<div class="wf-surface p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#10B981]/60 transition">' +
            '<div class="flex items-start gap-4 min-w-0">' +
              '<div class="hidden sm:block w-36 h-20 rounded-lg overflow-hidden bg-[#111418] border wf-border shrink-0">' + thumb + '</div>' +
              '<div class="min-w-0">' +
                '<div class="flex flex-wrap items-center gap-2 mb-1">' +
                  '<span class="font-mono text-[11px] font-semibold text-[#10B981]">' + esc(c.code) + '</span>' +
                  '<span class="text-[11.5px] wf-subtext">' + esc(c.subject) + ' · ' + esc(c.difficulty) + ' · ' + c.lessonCount + ' lessons · ' + c.totalMinutes + 'm</span>' +
                '</div>' +
                '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="text-[16px] font-bold wf-text hover:text-[#10B981] transition">' + esc(c.title) + '</a>' +
                '<p class="text-[12.5px] wf-subtext mt-0.5 line-clamp-1">' + esc(c.subtitle) + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="flex items-center gap-4 shrink-0">' +
              '<div class="w-28">' +
                '<div class="flex justify-between font-mono text-[11px] wf-subtext mb-1"><span>' + p.done + '/' + p.total + '</span><span>' + p.pct + '%</span></div>' +
                '<div class="h-1.5 rounded-full wf-muted overflow-hidden"><div class="h-full bg-[#10B981]" style="width:' + p.pct + '%"></div></div>' +
              '</div>' +
              '<a href="' + esc(resumeHref) + '" onclick="return window.TF.nav(event, \'' + esc(resumeHref) + '\')" class="px-3.5 py-2 rounded-lg wf-elevated hover:border-[#10B981] text-[12.5px] font-semibold wf-text transition">' + (p.done > 0 ? 'Continue →' : 'Start →') + '</a>' +
            '</div>' +
          '</div>';
      }

      return '' +
        '<div class="wf-surface overflow-hidden flex flex-col hover:border-[#10B981]/60 transition">' +
          '<div class="relative h-32 bg-[#111418] border-b wf-border">' +
            thumb +
            '<div class="absolute top-3 left-3 font-mono text-[11px] px-2 py-0.5 rounded bg-[#111418]/90 text-[#F1F3F5] border border-[#29313B]">' + esc(c.code) + '</div>' +
            '<div class="absolute top-3 right-3">' + statusBadgeHtml(p.status) + '</div>' +
          '</div>' +
          '<div class="p-5 flex-1 flex flex-col justify-between">' +
            '<div>' +
              '<div class="flex items-center justify-between text-[11.5px] wf-subtext mb-1.5">' +
                '<span>' + esc(c.subject) + '</span>' +
                '<span class="font-mono">' + esc(c.difficulty) + '</span>' +
              '</div>' +
              '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="block text-[16.5px] font-bold wf-text hover:text-[#10B981] transition leading-snug mb-1.5">' + esc(c.title) + '</a>' +
              '<p class="text-[13px] wf-subtext leading-relaxed mb-4">' + esc(c.subtitle) + '</p>' +
            '</div>' +
            '<div>' +
              '<div class="flex items-center justify-between text-[11.5px] font-mono wf-subtext mb-1.5">' +
                '<span>' + c.lessonCount + ' lessons · ' + c.totalMinutes + ' min</span>' +
                '<span class="wf-text font-semibold">' + p.pct + '%</span>' +
              '</div>' +
              '<div class="w-full h-1.5 rounded-full wf-muted overflow-hidden mb-4">' +
                '<div class="h-full bg-[#10B981]" style="width:' + p.pct + '%"></div>' +
              '</div>' +
              '<div class="flex items-center justify-between gap-2">' +
                '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="px-3 py-1.5 rounded-lg wf-elevated text-[12.5px] font-medium wf-text hover:border-[#10B981] transition">Course Details</a>' +
                '<a href="' + esc(resumeHref) + '" onclick="return window.TF.nav(event, \'' + esc(resumeHref) + '\')" class="px-3.5 py-1.5 rounded-lg bg-[#111418] dark:bg-[#10B981] text-white text-[12.5px] font-semibold hover:opacity-90 transition">' + (p.done > 0 ? 'Continue →' : 'Start Course →') + '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    return '' +
      '<div class="max-w-[1320px] mx-auto p-4 sm:p-6 space-y-5">' +
        '<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">' +
          '<div>' +
            '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Curriculum Library</div>' +
            '<h1 class="text-[24px] font-bold tracking-tight wf-text">Engineering Courses</h1>' +
            '<p class="text-[13.5px] wf-subtext mt-0.5">Deep, zero-fluff modules on systems thinking, decision-making, task shaping, team parallelism, leadership, and Rust.</p>' +
          '</div>' +
          '<div class="flex flex-wrap items-center gap-2">' +
            '<input type="text" value="' + esc(STATE.ui.coursesSearch || '') + '" oninput="window.TF.setUiSilent(\'coursesSearch\', this.value, true)" placeholder="Search courses..." class="wf-input h-9 px-3 text-[13px] w-48" />' +
            '<select onchange="window.TF.setUi(\'coursesSort\', this.value)" class="wf-input h-9 px-2.5 text-[12.5px]">' +
              '<option value="roadmap" ' + (sortBy === 'roadmap' ? 'selected' : '') + '>Sort: Roadmap Order</option>' +
              '<option value="progress" ' + (sortBy === 'progress' ? 'selected' : '') + '>Sort: Progress</option>' +
              '<option value="difficulty" ' + (sortBy === 'difficulty' ? 'selected' : '') + '>Sort: Difficulty</option>' +
              '<option value="duration" ' + (sortBy === 'duration' ? 'selected' : '') + '>Sort: Shortest</option>' +
            '</select>' +
            '<div class="inline-flex p-1 rounded-lg wf-surface">' +
              '<button type="button" onclick="window.TF.setUi(\'coursesLayout\', \'grid\')" class="px-2.5 py-1 rounded text-[12px] font-medium ' + (layout === 'grid' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Grid</button>' +
              '<button type="button" onclick="window.TF.setUi(\'coursesLayout\', \'list\')" class="px-2.5 py-1 rounded text-[12px] font-medium ' + (layout === 'list' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">List</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="flex flex-wrap items-center gap-1.5">' +
          subjects.map(function(s) {
            const active = subj === s[0];
            return '<button type="button" onclick="window.TF.setUi(\'coursesSubject\', \'' + s[0] + '\')" class="px-3 py-1.5 rounded-lg text-[12px] font-medium border transition ' +
              (active ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]' : 'wf-surface wf-subtext hover:wf-text') + '">' + s[1] + '</button>';
          }).join('') +
        '</div>' +

        '<div class="' + (layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-3') + '">' + cardsHtml + '</div>' +
      '</div>';
  }

  function renderCourseDetailView(courseSlug) {
    const c = getCourse(courseSlug);
    if (!c) return '<div class="p-8 text-center wf-subtext">Course not found.</div>';
    const p = getCourseProgress(c);
    const flat = getFlatLessons(c);
    const nextItem = flat.find(function(x) { return !isLessonDone(c.slug, x.lesson.slug); }) || flat[0];
    const nextHref = '/lessons/' + c.slug + '/' + nextItem.lesson.slug;
    const thumb = BLUEPRINTS[c.thumbnailKind] || BLUEPRINTS.systems || '';

    return '' +
      '<div class="max-w-[1120px] mx-auto p-4 sm:p-6 space-y-6">' +
        '<a href="/courses" onclick="return window.TF.nav(event, \'/courses\')" class="inline-flex items-center gap-1.5 text-[12.5px] font-mono wf-subtext hover:text-[#10B981] transition">← Back to Courses</a>' +

        '<div class="wf-surface overflow-hidden grid grid-cols-1 lg:grid-cols-12">' +
          '<div class="lg:col-span-8 p-6 space-y-4">' +
            '<div class="flex flex-wrap items-center gap-2">' +
              '<span class="font-mono text-[11.5px] font-semibold px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">' + esc(c.code) + '</span>' +
              '<span class="text-[12px] wf-subtext">' + esc(c.subject) + ' · ' + esc(c.difficulty) + ' · ' + c.lessonCount + ' lessons · ' + c.totalMinutes + ' min</span>' +
            '</div>' +
            '<h1 class="text-[24px] sm:text-[28px] font-bold tracking-tight wf-text leading-tight">' + esc(c.title) + '</h1>' +
            '<p class="text-[14px] wf-subtext leading-relaxed">' + esc(c.subtitle) + '</p>' +
            '<div class="flex flex-wrap items-center gap-3 pt-1">' +
              '<a href="' + esc(nextHref) + '" onclick="return window.TF.nav(event, \'' + esc(nextHref) + '\')" class="px-4 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[13px] font-semibold transition">' +
                (p.done > 0 ? 'Continue Learning (' + esc(nextItem.lesson.code) + ') →' : 'Start First Lesson →') +
              '</a>' +
              '<button type="button" onclick="window.TF.openCoursePractice(\'' + esc(c.slug) + '\')" class="px-3.5 py-2.5 rounded-lg wf-elevated text-[12.5px] font-medium wf-text hover:border-[#10B981] transition">Practice Course Questions</button>' +
            '</div>' +
          '</div>' +
          '<div class="lg:col-span-4 bg-[#111418] border-t lg:border-t-0 lg:border-l wf-border p-5 flex flex-col justify-between">' +
            '<div class="h-28 rounded-lg overflow-hidden border border-[#252D38] mb-3">' + thumb + '</div>' +
            '<div>' +
              '<div class="flex justify-between text-[12px] font-mono text-[#929BA8] mb-1.5"><span>Course Completion</span><span class="text-[#10B981] font-semibold">' + p.done + '/' + p.total + ' (' + p.pct + '%)</span></div>' +
              '<div class="h-2 rounded-full bg-[#222933] overflow-hidden"><div class="h-full bg-[#10B981]" style="width:' + p.pct + '%"></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
          '<div class="lg:col-span-8 space-y-4">' +
            '<h2 class="text-[16px] font-semibold wf-text">Modules &amp; Lessons</h2>' +
            c.modules.map(function(mod) {
              return '<div class="wf-surface overflow-hidden">' +
                '<div class="px-5 py-3.5 wf-muted border-b wf-border flex items-center justify-between gap-2">' +
                  '<div>' +
                    '<div class="font-mono text-[11px] text-[#10B981]">' + esc(mod.code) + '</div>' +
                    '<div class="text-[14.5px] font-semibold wf-text">' + esc(mod.title) + '</div>' +
                  '</div>' +
                  '<span class="text-[12px] wf-subtext hidden sm:inline">' + esc(mod.goal) + '</span>' +
                '</div>' +
                '<div class="divide-y wf-border">' +
                  mod.lessons.map(function(l) {
                    const done = isLessonDone(c.slug, l.slug);
                    const lHref = '/lessons/' + c.slug + '/' + l.slug;
                    return '<div class="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[var(--bg-elevated)] transition">' +
                      '<div class="flex items-start gap-3 min-w-0">' +
                        '<button type="button" onclick="window.TF.toggleLesson(\'' + esc(c.slug) + '\', \'' + esc(l.slug) + '\')" class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 transition ' +
                          (done ? 'bg-[#10B981] text-white' : 'border wf-border wf-subtext hover:border-[#10B981]') + '" title="Toggle lesson completion">' + (done ? '✓' : '') + '</button>' +
                        '<div class="min-w-0">' +
                          '<a href="' + esc(lHref) + '" onclick="return window.TF.nav(event, \'' + esc(lHref) + '\')" class="text-[14px] font-semibold wf-text hover:text-[#10B981] transition block">' +
                            '<span class="font-mono text-[11.5px] wf-subtext mr-2">' + esc(l.code) + '</span>' + esc(l.title) +
                          '</a>' +
                          '<p class="text-[12.5px] wf-subtext mt-0.5">' + esc(l.summary) + '</p>' +
                        '</div>' +
                      '</div>' +
                      '<a href="' + esc(lHref) + '" onclick="return window.TF.nav(event, \'' + esc(lHref) + '\')" class="font-mono text-[11.5px] wf-subtext hover:text-[#10B981] shrink-0">' + l.durationMin + 'm →</a>' +
                    '</div>';
                  }).join('') +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>' +

          '<div class="lg:col-span-4 space-y-4">' +
            '<div class="wf-surface p-5">' +
              '<h3 class="text-[14px] font-semibold wf-text mb-3">What This Rewires</h3>' +
              '<ul class="space-y-2.5">' +
                c.outcomes.map(function(o) {
                  return '<li class="flex items-start gap-2 text-[12.5px] wf-subtext leading-relaxed"><span class="text-[#10B981] font-bold mt-0.5">✓</span><span>' + esc(o) + '</span></li>';
                }).join('') +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Expose Core API so Part 2 can attach remaining views cleanly
  window.__TF_CORE__ = {
    DATA: DATA,
    STATE: STATE,
    saveState: saveState,
    logActivity: logActivity,
    esc: esc,
    toast: toast,
    lessonKey: lessonKey,
    isLessonDone: isLessonDone,
    getCourse: getCourse,
    getFlatLessons: getFlatLessons,
    getAllFlatLessons: getAllFlatLessons,
    getCourseProgress: getCourseProgress,
    getGlobalMetrics: getGlobalMetrics,
    getNextTargetLesson: getNextTargetLesson,
    applyThemeAndDensity: applyThemeAndDensity,
    syncShellTelemetry: syncShellTelemetry,
    formatRelTime: formatRelTime,
    statusBadgeHtml: statusBadgeHtml,
    defaultState: defaultState,
    renderHomeView: renderHomeView,
    renderRoadmapView: renderRoadmapView,
    renderCoursesView: renderCoursesView,
    renderCourseDetailView: renderCourseDetailView
  };
})();
"##;
