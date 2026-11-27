//! Client-side Workstation Engine (Part 2):
//! 3-Column Lesson Workspace, Notes Markdown Studio, Practice Quizzes & Tech Lead Drills,
//! Production Examples Library, Progress Telemetry, Settings (Export/Import), and Router.

pub const CLIENT_RUNTIME_PART_2: &str = r##"
(function() {
  const C = window.__TF_CORE__;
  const DATA = C.DATA;
  let STATE = C.STATE;
  const esc = C.esc;

  function simpleMarkdown(md) {
    const lines = String(md || '').split('\n');
    let html = '';
    let inCode = false;
    let inList = false;

    function inlineFmt(text) {
      return esc(text)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    }

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      if (raw.trim().startsWith('```')) {
        if (inList) { html += '</ul>'; inList = false; }
        if (!inCode) { html += '<pre class="eng-code">'; inCode = true; }
        else { html += '</pre>'; inCode = false; }
        continue;
      }
      if (inCode) {
        html += esc(raw) + '\n';
        continue;
      }
      if (raw.startsWith('# ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<h1 class="text-[20px] font-bold wf-text mt-2 mb-2">' + inlineFmt(raw.slice(2)) + '</h1>';
      } else if (raw.startsWith('## ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<h2 class="text-[15.5px] font-semibold wf-text mt-4 mb-1.5">' + inlineFmt(raw.slice(3)) + '</h2>';
      } else if (raw.startsWith('### ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<h3 class="text-[13.5px] font-semibold text-[#10B981] mt-3 mb-1">' + inlineFmt(raw.slice(4)) + '</h3>';
      } else if (raw.startsWith('- [x] ') || raw.startsWith('- [ ] ')) {
        if (!inList) { html += '<ul class="space-y-1 my-2">'; inList = true; }
        const checked = raw.startsWith('- [x] ');
        html += '<li class="flex items-start gap-2 text-[13.5px]"><span class="font-mono text-[#10B981]">' + (checked ? '[✓]' : '[ ]') + '</span><span>' + inlineFmt(raw.slice(6)) + '</span></li>';
      } else if (raw.startsWith('- ') || raw.startsWith('* ')) {
        if (!inList) { html += '<ul class="list-disc pl-5 space-y-1 my-2">'; inList = true; }
        html += '<li class="text-[13.5px]">' + inlineFmt(raw.slice(2)) + '</li>';
      } else if (/^\d+\.\s/.test(raw)) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<div class="text-[13.5px] my-1 font-medium wf-text">' + inlineFmt(raw) + '</div>';
      } else if (raw.trim() === '') {
        if (inList) { html += '</ul>'; inList = false; }
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<p class="text-[13.5px] leading-relaxed my-2">' + inlineFmt(raw) + '</p>';
      }
    }
    if (inList) html += '</ul>';
    if (inCode) html += '</pre>';
    return html || '<p class="wf-subtext text-[13px]">Empty note.</p>';
  }

  // =========================================================================
  // 3-COLUMN LESSON WORKSPACE
  // =========================================================================
  function renderLessonWorkspace(courseSlug, lessonSlug) {
    const course = C.getCourse(courseSlug);
    if (!course) return '<div class="p-8 text-center wf-subtext">Course not found.</div>';
    const flat = C.getFlatLessons(course);
    const idx = flat.findIndex(function(x) { return x.lesson.slug === lessonSlug; });
    if (idx === -1) return '<div class="p-8 text-center wf-subtext">Lesson not found.</div>';

    const current = flat[idx];
    const lesson = current.lesson;
    const mod = current.module;
    const prev = idx > 0 ? flat[idx - 1] : null;
    const next = idx < flat.length - 1 ? flat[idx + 1] : null;
    const prog = C.getCourseProgress(course);
    const done = C.isLessonDone(course.slug, lesson.slug);

    STATE.lastLesson = { courseSlug: course.slug, lessonSlug: lesson.slug };
    C.saveState();

    const noteId = 'lesson-note::' + course.slug + '::' + lesson.slug;
    const existingLessonNote = STATE.notes.find(function(n) { return n.id === noteId; });
    const scratchText = existingLessonNote ? existingLessonNote.content : '';

    const checkKey = C.lessonKey(course.slug, lesson.slug);
    const chosenCheck = STATE.inlineChecks[checkKey];

    // Left Navigation Syllabus
    const leftModulesHtml = course.modules.map(function(m) {
      return '<div class="mb-4">' +
        '<div class="px-2 mb-1.5 flex items-center justify-between">' +
          '<span class="font-mono text-[10.5px] uppercase tracking-wider wf-subtext">' + esc(m.code) + ' · ' + esc(m.title) + '</span>' +
        '</div>' +
        '<div class="space-y-0.5">' +
          m.lessons.map(function(l) {
            const lDone = C.isLessonDone(course.slug, l.slug);
            const isActive = l.slug === lesson.slug;
            const href = '/lessons/' + course.slug + '/' + l.slug;
            return '<a href="' + esc(href) + '" onclick="return window.TF.nav(event, \'' + esc(href) + '\')" class="flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] transition ' +
              (isActive ? 'wf-elevated !border-[#10B981]/60 font-semibold wf-text' : 'wf-subtext hover:wf-text hover:bg-[var(--bg-muted)]') + '">' +
              '<span class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ' +
                (lDone ? 'bg-[#10B981] text-white' : (isActive ? 'border-2 border-[#10B981] text-[#10B981]' : 'border wf-border')) + '">' +
                (lDone ? '✓' : '') +
              '</span>' +
              '<span class="leading-snug">' + esc(l.title) + '</span>' +
            '</a>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    // Center Reading Sections
    const sectionsHtml = lesson.sections.map(function(sec) {
      return '<section id="sec-' + esc(sec.anchor) + '" class="pt-5 border-t wf-border">' +
        '<h2 class="text-[18.5px] font-bold tracking-tight wf-text mb-3">' + esc(sec.heading) + '</h2>' +
        '<div class="eng-prose">' + sec.bodyHtml + '</div>' +
      '</section>';
    }).join('');

    // Inline Quick Check
    const ic = lesson.inlineCheck;
    const inlineCheckHtml = '' +
      '<div class="mt-7 p-5 rounded-xl wf-elevated border wf-border">' +
        '<div class="flex items-center justify-between gap-2 mb-2">' +
          '<span class="font-mono text-[11px] font-semibold text-[#10B981] uppercase tracking-wider">Quick Judgment Check</span>' +
          (chosenCheck !== undefined
            ? (chosenCheck === ic.correctIndex
                ? '<span class="font-mono text-[11px] text-[#10B981] font-semibold">✓ Verified</span>'
                : '<span class="font-mono text-[11px] text-[#DC5555] font-semibold">Try another angle</span>')
            : '<span class="font-mono text-[11px] wf-subtext">Select best engineering response</span>') +
        '</div>' +
        '<p class="text-[14px] font-semibold wf-text mb-3 leading-snug">' + esc(ic.prompt) + '</p>' +
        '<div class="space-y-2">' +
          ic.options.map(function(opt, oi) {
            let cls = 'wf-surface hover:border-[#10B981]/60 wf-text';
            if (chosenCheck !== undefined) {
              if (oi === ic.correctIndex) cls = 'border-[#10B981] bg-[#10B981]/10 wf-text';
              else if (oi === chosenCheck) cls = 'border-[#DC5555] bg-[#DC5555]/10 wf-text';
            }
            return '<button type="button" onclick="window.TF.answerInlineCheck(\'' + esc(course.slug) + '\', \'' + esc(lesson.slug) + '\', ' + oi + ')" class="w-full text-left px-3.5 py-2.5 rounded-lg border text-[13px] leading-snug transition ' + cls + '">' +
              '<span class="font-mono text-[11.5px] wf-subtext mr-2">' + String.fromCharCode(65 + oi) + '.</span>' + esc(opt) +
            '</button>';
          }).join('') +
        '</div>' +
        (chosenCheck !== undefined
          ? '<div class="mt-3 pt-3 border-t wf-border text-[12.5px] wf-subtext leading-relaxed"><strong class="wf-text">Why:</strong> ' + esc(ic.explanation) + '</div>'
          : '') +
      '</div>';

    // Right Column: Outline + Takeaways + Lesson Scratchpad
    const tocHtml = lesson.sections.map(function(sec) {
      return '<a href="#sec-' + esc(sec.anchor) + '" onclick="document.getElementById(\'sec-' + esc(sec.anchor) + '\').scrollIntoView({behavior:\'smooth\'});return false;" class="block text-[12px] wf-subtext hover:text-[#10B981] py-1 truncate transition">' + esc(sec.heading) + '</a>';
    }).join('');

    const takeawaysHtml = lesson.takeaways.map(function(tk, ti) {
      const tkKey = checkKey + '::tk::' + ti;
      const checked = !!STATE.checkedTakeaways[tkKey];
      return '<label class="flex items-start gap-2.5 cursor-pointer text-[12.5px] leading-snug py-1">' +
        '<input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="window.TF.toggleTakeaway(\'' + esc(tkKey) + '\')" class="mt-0.5 accent-[#10B981] rounded" />' +
        '<span class="' + (checked ? 'line-through wf-subtext' : 'wf-text') + '">' + esc(tk) + '</span>' +
      '</label>';
    }).join('');

    return '' +
      '<div class="min-h-full grid grid-cols-1 xl:grid-cols-12">' +
        '<!-- Left Panel: Course Navigation -->' +
        '<aside class="xl:col-span-3 border-b xl:border-b-0 xl:border-r wf-border p-4 xl:p-5 bg-[var(--bg-surface)]">' +
          '<a href="/courses/' + esc(course.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(course.slug) + '\')" class="inline-flex items-center gap-1.5 font-mono text-[11.5px] wf-subtext hover:text-[#10B981] mb-3 transition">← ' + esc(course.code) + ' Overview</a>' +
          '<h2 class="text-[14.5px] font-bold wf-text leading-snug mb-2">' + esc(course.title) + '</h2>' +
          '<div class="mb-4">' +
            '<div class="flex justify-between font-mono text-[11px] wf-subtext mb-1"><span>Progress</span><span>' + prog.done + '/' + prog.total + ' (' + prog.pct + '%)</span></div>' +
            '<div class="h-1.5 rounded-full wf-muted overflow-hidden"><div class="h-full bg-[#10B981]" style="width:' + prog.pct + '%"></div></div>' +
          '</div>' +
          '<div>' + leftModulesHtml + '</div>' +
        '</aside>' +

        '<!-- Center Panel: Technical Reading Workspace -->' +
        '<article class="xl:col-span-6 p-5 sm:p-8 max-w-3xl mx-auto w-full">' +
          '<div class="flex flex-wrap items-center gap-2 font-mono text-[11.5px] wf-subtext mb-2.5">' +
            '<span class="px-2 py-0.5 rounded wf-elevated text-[#10B981] font-semibold">' + esc(lesson.code) + '</span>' +
            '<span>' + esc(mod.title) + '</span>' +
            '<span>·</span>' +
            '<span>' + lesson.durationMin + ' min study</span>' +
          '</div>' +

          '<h1 class="text-[26px] sm:text-[30px] font-bold tracking-tight wf-text leading-tight mb-3">' + esc(lesson.title) + '</h1>' +
          '<p class="text-[15px] wf-subtext leading-relaxed mb-5">' + esc(lesson.summary) + '</p>' +

          '<div class="rounded-xl bg-[#111418] text-[#F1F3F5] border border-[#242C37] p-4 mb-6">' +
            '<div class="font-mono text-[10.5px] text-[#10B981] uppercase tracking-wider mb-1">The Engineer\'s Law</div>' +
            '<div class="text-[13.5px] font-medium leading-relaxed">' + esc(lesson.engineerLaw) + '</div>' +
          '</div>' +

          '<div class="space-y-6">' + sectionsHtml + '</div>' +

          inlineCheckHtml +

          '<!-- Lesson Footer Actions -->' +
          '<div class="mt-8 pt-6 border-t wf-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<button type="button" onclick="window.TF.toggleLesson(\'' + esc(course.slug) + '\', \'' + esc(lesson.slug) + '\')" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-semibold transition ' +
              (done ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40' : 'bg-[#10B981] hover:bg-[#059669] text-white') + '">' +
              '<span>' + (done ? '✓ Lesson Completed (Click to Undo)' : 'Mark Lesson Complete ✓') + '</span>' +
            '</button>' +

            '<div class="flex items-center gap-2">' +
              (prev
                ? '<a href="/lessons/' + esc(course.slug) + '/' + esc(prev.lesson.slug) + '" onclick="return window.TF.nav(event, \'/lessons/' + esc(course.slug) + '/' + esc(prev.lesson.slug) + '\')" class="px-3 py-2 rounded-lg wf-surface text-[12.5px] font-medium wf-subtext hover:wf-text transition">← Prev</a>'
                : '') +
              (next
                ? '<a href="/lessons/' + esc(course.slug) + '/' + esc(next.lesson.slug) + '" onclick="return window.TF.nav(event, \'/lessons/' + esc(course.slug) + '/' + esc(next.lesson.slug) + '\')" class="px-3.5 py-2 rounded-lg wf-surface hover:border-[#10B981] text-[12.5px] font-semibold wf-text transition">Next: ' + esc(next.lesson.code) + ' →</a>'
                : '<a href="/practice" onclick="return window.TF.nav(event, \'/practice\')" class="px-3.5 py-2 rounded-lg wf-surface hover:border-[#10B981] text-[12.5px] font-semibold text-[#10B981] transition">Practice Course Drills →</a>') +
            '</div>' +
          '</div>' +
        '</article>' +

        '<!-- Right Panel: Workstation Inspector (Outline + Takeaways + Live Notes) -->' +
        '<aside class="xl:col-span-3 border-t xl:border-t-0 xl:border-l wf-border p-4 xl:p-5 space-y-5 bg-[var(--bg-surface)]">' +
          '<div>' +
            '<div class="font-mono text-[10.5px] uppercase tracking-wider wf-subtext mb-2">On This Page</div>' +
            '<div class="border-l wf-border pl-3 space-y-0.5">' + tocHtml + '</div>' +
          '</div>' +

          '<div class="pt-4 border-t wf-border">' +
            '<div class="font-mono text-[10.5px] uppercase tracking-wider wf-subtext mb-2">Action Checklist</div>' +
            '<div class="space-y-1">' + takeawaysHtml + '</div>' +
          '</div>' +

          '<div class="pt-4 border-t wf-border">' +
            '<div class="flex items-center justify-between mb-1.5">' +
              '<span class="font-mono text-[10.5px] uppercase tracking-wider wf-subtext">Lesson Scratchpad</span>' +
              '<span id="lesson-note-status" class="font-mono text-[10.5px] text-[#10B981]">localStorage</span>' +
            '</div>' +
            '<textarea rows="7" oninput="window.TF.saveLessonScratchpad(\'' + esc(course.slug) + '\', \'' + esc(lesson.slug) + '\', \'' + esc(lesson.title) + '\', this.value)" placeholder="Write your own summary, edge cases, or team rules for this lesson..." class="w-full wf-input p-2.5 text-[12.5px] font-mono leading-relaxed resize-y">' + esc(scratchText) + '</textarea>' +
            '<a href="/notes" onclick="return window.TF.nav(event, \'/notes\')" class="inline-block mt-1.5 text-[11.5px] font-medium text-[#10B981] hover:underline">Open full Notes studio →</a>' +
          '</div>' +
        '</aside>' +
      '</div>';
  }

  // =========================================================================
  // NOTES STUDIO (LOCALSTORAGE MARKDOWN NOTEBOOK)
  // =========================================================================
  function renderNotesView() {
    const tagFilter = STATE.ui.notesTag || 'all';
    const q = (STATE.ui.notesSearch || '').trim().toLowerCase();
    const viewMode = STATE.ui.noteViewMode || 'write';

    const filtered = STATE.notes.filter(function(n) {
      if (tagFilter !== 'all' && n.tag !== tagFilter) return false;
      if (!q) return true;
      return (n.title + ' ' + n.content + ' ' + n.tag).toLowerCase().includes(q);
    });

    let active = STATE.notes.find(function(n) { return n.id === STATE.activeNoteId; }) || filtered[0] || STATE.notes[0];

    const listHtml = filtered.length ? filtered.map(function(n) {
      const isAct = active && active.id === n.id;
      const course = C.getCourse(n.courseSlug);
      return '<button type="button" onclick="window.TF.selectNote(\'' + esc(n.id) + '\')" class="w-full text-left p-3 rounded-lg border transition ' +
        (isAct ? 'wf-elevated !border-[#10B981]' : 'wf-surface hover:border-[#10B981]/50') + '">' +
        '<div class="flex items-center justify-between gap-2 mb-1">' +
          '<span class="font-mono text-[10.5px] px-1.5 py-0.5 rounded wf-muted wf-subtext">' + esc(n.tag || 'General') + '</span>' +
          '<span class="font-mono text-[10.5px] wf-subtext">' + C.formatRelTime(n.updatedAt || Date.now()) + '</span>' +
        '</div>' +
        '<div class="text-[13.5px] font-semibold wf-text truncate">' + esc(n.title || 'Untitled Note') + '</div>' +
        '<div class="text-[11.5px] wf-subtext truncate mt-0.5">' + esc(course ? course.code + ' · ' + course.title : 'General Workstation') + '</div>' +
      '</button>';
    }).join('') : '<div class="p-4 text-center text-[12.5px] wf-subtext">No notes match filter.</div>';

    const editorHtml = active ? (
      '<div class="wf-surface flex flex-col h-full min-h-[540px]">' +
        '<div class="p-4 border-b wf-border flex flex-wrap items-center justify-between gap-3">' +
          '<input id="note-title-input" type="text" value="' + esc(active.title) + '" oninput="window.TF.updateActiveNote(\'title\', this.value)" placeholder="Note title..." class="flex-1 min-w-[200px] bg-transparent text-[18px] font-bold wf-text focus:outline-none" />' +
          '<div class="flex flex-wrap items-center gap-2">' +
            '<select onchange="window.TF.updateActiveNote(\'tag\', this.value)" class="wf-input h-8 px-2 text-[12px]">' +
              ['Architecture', 'ADR', 'Team', 'Post-Mortem', 'Lesson'].map(function(t) {
                return '<option value="' + t + '" ' + (active.tag === t ? 'selected' : '') + '>' + t + '</option>';
              }).join('') +
            '</select>' +
            '<select onchange="window.TF.updateActiveNote(\'courseSlug\', this.value)" class="wf-input h-8 px-2 text-[12px]">' +
              '<option value="">Unlinked</option>' +
              DATA.courses.map(function(c) {
                return '<option value="' + esc(c.slug) + '" ' + (active.courseSlug === c.slug ? 'selected' : '') + '>' + esc(c.code) + '</option>';
              }).join('') +
            '</select>' +
            '<div class="inline-flex p-0.5 rounded-lg wf-elevated">' +
              '<button type="button" onclick="window.TF.setUi(\'noteViewMode\', \'write\')" class="px-2.5 py-1 rounded text-[11.5px] font-medium ' + (viewMode === 'write' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Write</button>' +
              '<button type="button" onclick="window.TF.setUi(\'noteViewMode\', \'preview\')" class="px-2.5 py-1 rounded text-[11.5px] font-medium ' + (viewMode === 'preview' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Preview</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex-1 p-4">' +
          (viewMode === 'write'
            ? '<textarea id="note-body-input" oninput="window.TF.updateActiveNote(\'content\', this.value)" class="w-full h-[400px] bg-transparent font-mono text-[13px] leading-relaxed wf-text focus:outline-none resize-y" placeholder="Write Markdown notes, ADRs, or task breakdowns...">' + esc(active.content) + '</textarea>'
            : '<div class="eng-prose min-h-[400px]">' + simpleMarkdown(active.content) + '</div>') +
        '</div>' +
        '<div class="px-4 py-2.5 border-t wf-border flex items-center justify-between text-[11.5px] font-mono wf-subtext">' +
          '<span id="note-autosave-msg">Auto-saved to browser localStorage</span>' +
          '<div class="flex items-center gap-3">' +
            '<button type="button" onclick="window.TF.copyActiveNote()" class="hover:text-[#10B981] transition">Copy Markdown</button>' +
            '<button type="button" onclick="window.TF.deleteNote(\'' + esc(active.id) + '\')" class="text-[#DC5555] hover:underline">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    ) : '<div class="wf-surface p-8 text-center wf-subtext">Create a note to begin.</div>';

    return '' +
      '<div class="max-w-[1320px] mx-auto p-4 sm:p-6 space-y-5">' +
        '<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">' +
          '<div>' +
            '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Personal Knowledge Base</div>' +
            '<h1 class="text-[24px] font-bold tracking-tight wf-text">Engineering Notes &amp; Specs</h1>' +
            '<p class="text-[13.5px] wf-subtext mt-0.5">Draft ADRs, Shoveled-Path tickets, sprint plans, and lesson reflections (persisted in localStorage).</p>' +
          '</div>' +
          '<div class="flex flex-wrap items-center gap-2">' +
            '<button type="button" onclick="window.TF.createNoteFromTemplate(\'blank\')" class="px-3.5 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12.5px] font-semibold transition">+ New Note</button>' +
            '<button type="button" onclick="window.TF.createNoteFromTemplate(\'ticket\')" class="px-3 py-2 rounded-lg wf-surface hover:border-[#10B981] text-[12px] font-medium wf-text transition">+ Ticket Template</button>' +
            '<button type="button" onclick="window.TF.createNoteFromTemplate(\'adr\')" class="px-3 py-2 rounded-lg wf-surface hover:border-[#10B981] text-[12px] font-medium wf-text transition">+ 1-Page ADR</button>' +
          '</div>' +
        '</div>' +

        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5">' +
          '<div class="lg:col-span-4 space-y-3">' +
            '<input type="text" value="' + esc(STATE.ui.notesSearch || '') + '" oninput="window.TF.setUiSilent(\'notesSearch\', this.value, true)" placeholder="Search notes..." class="w-full wf-input h-9 px-3 text-[13px]" />' +
            '<div class="flex flex-wrap gap-1">' +
              ['all', 'Architecture', 'ADR', 'Team', 'Post-Mortem', 'Lesson'].map(function(t) {
                const act = tagFilter === t;
                return '<button type="button" onclick="window.TF.setUi(\'notesTag\', \'' + t + '\')" class="px-2 py-1 rounded text-[11.5px] font-medium ' +
                  (act ? 'bg-[#10B981]/15 text-[#10B981]' : 'wf-surface wf-subtext') + '">' + (t === 'all' ? 'All' : t) + '</button>';
              }).join('') +
            '</div>' +
            '<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1">' + listHtml + '</div>' +
          '</div>' +
          '<div class="lg:col-span-8">' + editorHtml + '</div>' +
        '</div>' +
      '</div>';
  }

  // =========================================================================
  // PRACTICE WORKSPACE (QUIZZES + TECH LEAD SIMULATION DRILLS)
  // =========================================================================
  function renderPracticeView() {
    const tab = STATE.ui.practiceTab || 'questions';
    const m = C.getGlobalMetrics();
    const acc = m.solvedQuestions ? Math.round((m.correctQuestions / m.solvedQuestions) * 100) : 0;

    let contentHtml = '';
    if (tab === 'questions') {
      const cSlug = STATE.ui.practiceCourse || 'all';
      const qFilter = STATE.ui.practiceFilter || 'all';
      const questions = DATA.questions.filter(function(q) {
        if (cSlug !== 'all' && q.courseSlug !== cSlug) return false;
        const ans = STATE.quizAnswers[q.id];
        if (qFilter === 'unanswered' && ans !== undefined) return false;
        if (qFilter === 'incorrect' && (ans === undefined || ans === q.correctIndex)) return false;
        return true;
      });

      contentHtml = '' +
        '<div class="flex flex-wrap items-center justify-between gap-3">' +
          '<div class="flex flex-wrap items-center gap-2">' +
            '<select onchange="window.TF.setUi(\'practiceCourse\', this.value)" class="wf-input h-9 px-3 text-[12.5px]">' +
              '<option value="all">All Courses (18)</option>' +
              DATA.courses.map(function(c) {
                return '<option value="' + esc(c.slug) + '" ' + (cSlug === c.slug ? 'selected' : '') + '>' + esc(c.code + ' — ' + c.title) + '</option>';
              }).join('') +
            '</select>' +
            ['all:All', 'unanswered:Unsolved', 'incorrect:Needs Retry'].map(function(p) {
              const kv = p.split(':');
              const act = qFilter === kv[0];
              return '<button type="button" onclick="window.TF.setUi(\'practiceFilter\', \'' + kv[0] + '\')" class="px-3 py-1.5 rounded-lg text-[12px] font-medium border ' +
                (act ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]' : 'wf-surface wf-subtext') + '">' + kv[1] + '</button>';
            }).join('') +
          '</div>' +
          '<div class="flex items-center gap-4 text-[12px] font-mono wf-subtext">' +
            '<span>Solved: <strong class="wf-text">' + m.solvedQuestions + '/' + m.totalQuestions + '</strong></span>' +
            '<span>Accuracy: <strong class="text-[#10B981]">' + acc + '%</strong></span>' +
            '<button type="button" onclick="window.TF.resetQuizzes()" class="hover:text-[#DC5555] underline">Reset Answers</button>' +
          '</div>' +
        '</div>' +
        '<div class="space-y-4">' +
          (questions.length ? questions.map(function(q, qi) {
            const ans = STATE.quizAnswers[q.id];
            const course = C.getCourse(q.courseSlug);
            return '<div class="wf-surface p-5 space-y-3">' +
              '<div class="flex flex-wrap items-center justify-between gap-2">' +
                '<div class="flex items-center gap-2 font-mono text-[11px]">' +
                  '<span class="px-2 py-0.5 rounded wf-elevated text-[#10B981] font-semibold">' + esc(course ? course.code : '') + '</span>' +
                  '<span class="wf-subtext">' + esc(q.category) + ' · ' + esc(q.difficulty) + '</span>' +
                '</div>' +
                (ans !== undefined
                  ? (ans === q.correctIndex
                      ? '<span class="font-mono text-[11.5px] text-[#10B981] font-semibold">✓ Correct Decision</span>'
                      : '<span class="font-mono text-[11.5px] text-[#DC5555] font-semibold">✕ Review Trade-off</span>')
                  : '<span class="font-mono text-[11px] wf-subtext">Scenario #' + (qi + 1) + '</span>') +
              '</div>' +
              '<div class="p-3.5 rounded-lg wf-elevated text-[13px] wf-subtext leading-relaxed"><strong class="wf-text">Scenario:</strong> ' + esc(q.scenario) + '</div>' +
              '<div class="text-[15px] font-semibold wf-text">' + esc(q.question) + '</div>' +
              '<div class="space-y-2">' +
                q.options.map(function(opt, oi) {
                  let cls = 'wf-elevated hover:border-[#10B981]/60 wf-text';
                  if (ans !== undefined) {
                    if (oi === q.correctIndex) cls = 'border-[#10B981] bg-[#10B981]/10 wf-text';
                    else if (oi === ans) cls = 'border-[#DC5555] bg-[#DC5555]/10 wf-text';
                  }
                  return '<button type="button" onclick="window.TF.answerQuiz(\'' + esc(q.id) + '\', ' + oi + ')" class="w-full text-left px-3.5 py-2.5 rounded-lg border text-[13px] leading-snug transition ' + cls + '">' +
                    '<span class="font-mono text-[11.5px] wf-subtext mr-2">' + String.fromCharCode(65 + oi) + '.</span>' + esc(opt) +
                  '</button>';
                }).join('') +
              '</div>' +
              (ans !== undefined
                ? '<div class="pt-3 border-t wf-border text-[13px] wf-subtext leading-relaxed"><strong class="text-[#10B981]">Staff Engineer Analysis:</strong> ' + esc(q.explanation) + '</div>'
                : '') +
            '</div>';
          }).join('') : '<div class="wf-surface p-8 text-center text-[13px] wf-subtext">All matching scenario questions solved!</div>') +
        '</div>';
    } else {
      // Open-Response Tech Lead Simulation Drills
      const activeDrill = DATA.drills.find(function(d) { return d.id === STATE.ui.activeDrillId; }) || DATA.drills[0];
      const draft = STATE.drillDrafts[activeDrill.id] || '';
      const revealed = !!STATE.drillRevealed[activeDrill.id];

      contentHtml = '' +
        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5">' +
          '<div class="lg:col-span-4 space-y-2.5">' +
            DATA.drills.map(function(d) {
              const isAct = d.id === activeDrill.id;
              const hasDraft = !!(STATE.drillDrafts[d.id] && STATE.drillDrafts[d.id].trim().length > 20);
              return '<button type="button" onclick="window.TF.setUi(\'activeDrillId\', \'' + esc(d.id) + '\')" class="w-full text-left p-4 rounded-xl border transition ' +
                (isAct ? 'wf-elevated !border-[#10B981]' : 'wf-surface hover:border-[#10B981]/50') + '">' +
                '<div class="flex items-center justify-between font-mono text-[11px] mb-1">' +
                  '<span class="text-[#10B981] font-semibold">' + esc(d.code) + '</span>' +
                  '<span class="wf-subtext">' + (hasDraft ? '✓ Draft Saved' : 'Simulation') + '</span>' +
                '</div>' +
                '<div class="text-[14px] font-semibold wf-text leading-snug">' + esc(d.title) + '</div>' +
              '</button>';
            }).join('') +
          '</div>' +

          '<div class="lg:col-span-8 wf-surface p-6 space-y-5">' +
            '<div>' +
              '<div class="font-mono text-[11px] text-[#10B981] mb-1">' + esc(activeDrill.code) + ' · LIVE TECH LEAD SIMULATION</div>' +
              '<h2 class="text-[20px] font-bold wf-text">' + esc(activeDrill.title) + '</h2>' +
              '<p class="text-[13px] wf-subtext mt-1">' + esc(activeDrill.roleContext) + '</p>' +
            '</div>' +

            '<div class="p-4 rounded-lg bg-[#111418] text-[#E6EDF3] border border-[#252D38] space-y-2">' +
              '<div class="font-mono text-[10.5px] text-[#F59E0B] uppercase">Situation Brief</div>' +
              '<p class="text-[13.5px] leading-relaxed">' + esc(activeDrill.situation) + '</p>' +
              '<div class="pt-2 border-t border-[#252D38] space-y-1">' +
                activeDrill.prompts.map(function(pr) {
                  return '<div class="text-[12.5px] text-[#929BA8]">' + esc(pr) + '</div>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div>' +
              '<div class="flex items-center justify-between mb-1.5">' +
                '<label class="text-[12.5px] font-semibold wf-text">Your Engineering Decision &amp; Plan (No Code — Pure Reasoning)</label>' +
                '<span class="font-mono text-[11px] wf-subtext">Auto-saved locally</span>' +
              '</div>' +
              '<textarea rows="7" oninput="window.TF.saveDrillDraft(\'' + esc(activeDrill.id) + '\', this.value)" placeholder="Write your invariants, state transitions, task slices, or stakeholder options here before revealing the Staff Engineer solution..." class="w-full wf-input p-3.5 text-[13px] font-mono leading-relaxed">' + esc(draft) + '</textarea>' +
            '</div>' +

            '<div class="pt-2 border-t wf-border">' +
              '<div class="text-[13px] font-semibold wf-text mb-2">Self-Evaluation Rubric</div>' +
              '<div class="space-y-1.5 mb-4">' +
                activeDrill.rubricPoints.map(function(rp, ri) {
                  const rk = activeDrill.id + '::' + ri;
                  const ch = !!STATE.drillRubrics[rk];
                  return '<label class="flex items-start gap-2.5 text-[12.5px] cursor-pointer">' +
                    '<input type="checkbox" ' + (ch ? 'checked' : '') + ' onchange="window.TF.toggleDrillRubric(\'' + esc(rk) + '\')" class="mt-0.5 accent-[#10B981]" />' +
                    '<span class="' + (ch ? 'text-[#10B981]' : 'wf-subtext') + '">' + esc(rp) + '</span>' +
                  '</label>';
                }).join('') +
              '</div>' +
              '<button type="button" onclick="window.TF.toggleDrillReveal(\'' + esc(activeDrill.id) + '\')" class="px-4 py-2 rounded-lg wf-elevated hover:border-[#10B981] text-[12.5px] font-semibold wf-text transition">' +
                (revealed ? 'Hide Staff Engineer Reference Solution' : 'Reveal Staff Engineer Reference Solution →') +
              '</button>' +
              (revealed
                ? '<div class="mt-4 p-4 rounded-lg wf-elevated border-l-4 !border-l-[#10B981] eng-prose text-[13px]">' + activeDrill.staffReferenceHtml + '</div>'
                : '') +
            '</div>' +
          '</div>' +
        '</div>';
    }

    return '' +
      '<div class="max-w-[1320px] mx-auto p-4 sm:p-6 space-y-5">' +
        '<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">' +
          '<div>' +
            '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Active Decision Training</div>' +
            '<h1 class="text-[24px] font-bold tracking-tight wf-text">Practice &amp; Tech Lead Simulations</h1>' +
            '<p class="text-[13.5px] wf-subtext mt-0.5">Sharpen real-world engineering judgment under concurrency, ambiguity, and tight team deadlines.</p>' +
          '</div>' +
          '<div class="inline-flex p-1 rounded-lg wf-surface">' +
            '<button type="button" onclick="window.TF.setUi(\'practiceTab\', \'questions\')" class="px-3.5 py-1.5 rounded-md text-[12.5px] font-medium transition ' + (tab === 'questions' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Scenario Quizzes (18)</button>' +
            '<button type="button" onclick="window.TF.setUi(\'practiceTab\', \'drills\')" class="px-3.5 py-1.5 rounded-md text-[12.5px] font-medium transition ' + (tab === 'drills' ? 'bg-[#111418] text-white dark:bg-[#F1F3F5] dark:text-[#111418]' : 'wf-subtext') + '">Tech Lead Drills (4)</button>' +
          '</div>' +
        '</div>' +
        contentHtml +
      '</div>';
  }

  // =========================================================================
  // EXAMPLES LIBRARY (PRODUCTION ARTIFACTS)
  // =========================================================================
  function renderExamplesView() {
    const typeFilter = STATE.ui.examplesType || 'all';
    const types = ['all', 'Task Spec', 'ADR', 'Sprint DAG', 'PR Review', 'Post-Mortem', 'Rust Boundary', 'Scope Matrix'];
    const filtered = DATA.examples.filter(function(ex) {
      if (typeFilter === 'bookmarked') return !!STATE.bookmarkedExamples[ex.id];
      return typeFilter === 'all' || ex.artifactType === typeFilter;
    });

    const active = filtered.find(function(e) { return e.id === STATE.ui.activeExampleId; }) || filtered[0] || DATA.examples[0];
    const isBookmarked = active && !!STATE.bookmarkedExamples[active.id];

    return '' +
      '<div class="max-w-[1320px] mx-auto p-4 sm:p-6 space-y-5">' +
        '<div>' +
          '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Reference Blueprints</div>' +
          '<h1 class="text-[24px] font-bold tracking-tight wf-text">Production Engineering Examples</h1>' +
          '<p class="text-[13.5px] wf-subtext mt-0.5">Compare naive coder habits against real Tech Lead specs, ADRs, reviews, post-mortems, and Rust boundaries.</p>' +
        '</div>' +

        '<div class="flex flex-wrap gap-1.5">' +
          types.concat(['bookmarked']).map(function(t) {
            const act = typeFilter === t;
            const lbl = t === 'all' ? 'All Artifacts' : (t === 'bookmarked' ? '★ Saved' : t);
            return '<button type="button" onclick="window.TF.setUi(\'examplesType\', \'' + t + '\')" class="px-3 py-1.5 rounded-lg text-[12px] font-medium border transition ' +
              (act ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]' : 'wf-surface wf-subtext hover:wf-text') + '">' + lbl + '</button>';
          }).join('') +
        '</div>' +

        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5">' +
          '<div class="lg:col-span-4 space-y-2.5">' +
            (filtered.length ? filtered.map(function(ex) {
              const sel = active && active.id === ex.id;
              return '<button type="button" onclick="window.TF.setUi(\'activeExampleId\', \'' + esc(ex.id) + '\')" class="w-full text-left p-4 rounded-xl border transition ' +
                (sel ? 'wf-elevated !border-[#10B981]' : 'wf-surface hover:border-[#10B981]/50') + '">' +
                '<div class="flex items-center justify-between font-mono text-[11px] mb-1">' +
                  '<span class="text-[#10B981] font-semibold">' + esc(ex.code + ' · ' + ex.artifactType) + '</span>' +
                  (STATE.bookmarkedExamples[ex.id] ? '<span class="text-[#F59E0B]">★</span>' : '') +
                '</div>' +
                '<div class="text-[14px] font-semibold wf-text leading-snug">' + esc(ex.title) + '</div>' +
                '<p class="text-[12px] wf-subtext mt-1 line-clamp-2">' + esc(ex.summary) + '</p>' +
              '</button>';
            }).join('') : '<div class="wf-surface p-6 text-center text-[13px] wf-subtext">No saved artifacts yet.</div>') +
          '</div>' +

          '<div class="lg:col-span-8">' +
            (active ? (
              '<div class="wf-surface p-6 space-y-5">' +
                '<div class="flex flex-wrap items-start justify-between gap-3 pb-4 border-b wf-border">' +
                  '<div>' +
                    '<div class="font-mono text-[11px] text-[#10B981] mb-1">' + esc(active.code + ' // ' + active.artifactType) + '</div>' +
                    '<h2 class="text-[20px] font-bold wf-text">' + esc(active.title) + '</h2>' +
                    '<p class="text-[13px] wf-subtext mt-1">' + esc(active.summary) + '</p>' +
                  '</div>' +
                  '<div class="flex items-center gap-2 shrink-0">' +
                    '<button type="button" onclick="window.TF.toggleBookmarkExample(\'' + esc(active.id) + '\')" class="px-3 py-1.5 rounded-lg wf-elevated text-[12px] font-medium wf-text hover:border-[#10B981] transition">' +
                      (isBookmarked ? '★ Saved' : '☆ Save') +
                    '</button>' +
                    '<button type="button" onclick="window.TF.cloneExampleToNotes(\'' + esc(active.id) + '\')" class="px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12px] font-semibold transition">Clone Template to Notes →</button>' +
                  '</div>' +
                '</div>' +

                '<div class="rounded-lg border border-[#DC5555]/35 bg-[#DC5555]/5 p-4">' +
                  '<div class="font-mono text-[11px] font-semibold text-[#DC5555] uppercase mb-1">✕ Amateur / High-Risk Habit</div>' +
                  '<p class="text-[13px] wf-text leading-relaxed">' + esc(active.badApproach) + '</p>' +
                '</div>' +

                '<div>' +
                  '<div class="font-mono text-[11px] font-semibold text-[#10B981] uppercase mb-1.5">✓ Production Engineer Artifact</div>' +
                  '<div class="eng-prose">' + active.engineerApproachHtml + '</div>' +
                '</div>' +
              '</div>'
            ) : '') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // =========================================================================
  // PROGRESS ANALYTICS & SETTINGS VIEWS
  // =========================================================================
  function renderProgressView() {
    const m = C.getGlobalMetrics();
    const acc = m.solvedQuestions ? Math.round((m.correctQuestions / m.solvedQuestions) * 100) : 0;
    const drillsDrafted = DATA.drills.filter(function(d) {
      return STATE.drillDrafts[d.id] && STATE.drillDrafts[d.id].trim().length > 20;
    }).length;

    // 14-day consistency strip
    const days = [];
    const cur = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(cur);
      d.setDate(cur.getDate() - i);
      const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const count = (STATE.studyDays && STATE.studyDays[k]) || 0;
      days.push({ label: k.slice(5), count: count });
    }

    return '' +
      '<div class="max-w-[1260px] mx-auto p-4 sm:p-6 space-y-6">' +
        '<div>' +
          '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Mastery Telemetry</div>' +
          '<h1 class="text-[24px] font-bold tracking-tight wf-text">Learning Progress</h1>' +
          '<p class="text-[13.5px] wf-subtext mt-0.5">Track competency across systems design, decision rigor, task shaping, team execution, and Rust.</p>' +
        '</div>' +

        '<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">' +
          [
            { k: 'Lessons Completed', v: m.doneLessons + ' / ' + m.totalLessons, sub: m.overallPct + '% curriculum mastery' },
            { k: 'Scenario Accuracy', v: acc + '%', sub: m.solvedQuestions + ' / ' + m.totalQuestions + ' questions answered' },
            { k: 'Tech Lead Drills', v: drillsDrafted + ' / ' + DATA.drills.length, sub: 'Written decision simulations' },
            { k: 'Active Streak', v: m.streak + ' Days', sub: STATE.notes.length + ' notes & specs authored' }
          ].map(function(card) {
            return '<div class="wf-surface p-5">' +
              '<div class="text-[12px] wf-subtext mb-1">' + card.k + '</div>' +
              '<div class="text-[24px] font-bold font-mono wf-text">' + card.v + '</div>' +
              '<div class="text-[11.5px] text-[#10B981] mt-1">' + card.sub + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +

        '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5">' +
          '<div class="lg:col-span-7 wf-surface p-5 space-y-4">' +
            '<h2 class="text-[15.5px] font-semibold wf-text">Competency by Course</h2>' +
            DATA.courses.map(function(c) {
              const p = C.getCourseProgress(c);
              return '<div class="space-y-1.5">' +
                '<div class="flex items-center justify-between text-[13px]">' +
                  '<a href="/courses/' + esc(c.slug) + '" onclick="return window.TF.nav(event, \'/courses/' + esc(c.slug) + '\')" class="font-medium wf-text hover:text-[#10B981] transition"><span class="font-mono text-[11.5px] wf-subtext mr-2">' + esc(c.code) + '</span>' + esc(c.title) + '</a>' +
                  '<span class="font-mono text-[12px] wf-subtext">' + p.done + '/' + p.total + ' (' + p.pct + '%)</span>' +
                '</div>' +
                '<div class="h-2 rounded-full wf-muted overflow-hidden"><div class="h-full bg-[#10B981] transition-all duration-300" style="width:' + p.pct + '%"></div></div>' +
              '</div>';
            }).join('') +
          '</div>' +

          '<div class="lg:col-span-5 space-y-5">' +
            '<div class="wf-surface p-5">' +
              '<h2 class="text-[15px] font-semibold wf-text mb-3">14-Day Study Consistency</h2>' +
              '<div class="grid grid-cols-7 gap-2">' +
                days.map(function(d) {
                  const activeCls = d.count > 2 ? 'bg-[#10B981] text-white' : (d.count > 0 ? 'bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/40' : 'wf-elevated wf-subtext');
                  return '<div class="p-2 rounded-lg text-center ' + activeCls + '">' +
                    '<div class="font-mono text-[10px]">' + d.label + '</div>' +
                    '<div class="font-mono text-[11px] font-semibold mt-0.5">' + d.count + '</div>' +
                  '</div>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="wf-surface p-5">' +
              '<h2 class="text-[15px] font-semibold wf-text mb-2.5">Activity Log</h2>' +
              '<div class="max-h-56 overflow-y-auto divide-y wf-border">' +
                STATE.activities.slice(0, 12).map(function(a) {
                  return '<div class="py-2 flex items-center justify-between gap-2 text-[12.5px]">' +
                    '<span class="wf-text truncate">' + esc(a.text) + '</span>' +
                    '<span class="font-mono text-[11px] wf-subtext shrink-0">' + C.formatRelTime(a.ts) + '</span>' +
                  '</div>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderSettingsView() {
    const th = STATE.settings.theme || 'light';
    const den = STATE.settings.density || 'comfortable';
    const goal = STATE.settings.dailyGoalMin || 30;

    return '' +
      '<div class="max-w-3xl mx-auto p-4 sm:p-6 space-y-5">' +
        '<div>' +
          '<div class="font-mono text-[11px] text-[#10B981] uppercase tracking-wider mb-1">Workstation Preferences</div>' +
          '<h1 class="text-[24px] font-bold tracking-tight wf-text">Settings &amp; Local Data</h1>' +
          '<p class="text-[13.5px] wf-subtext mt-0.5">All progress, notes, quiz decisions, and drill drafts live privately in your browser localStorage.</p>' +
        '</div>' +

        '<div class="wf-surface divide-y wf-border">' +
          '<div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<div><div class="text-[14px] font-semibold wf-text">Color Theme</div><div class="text-[12.5px] wf-subtext">Neutral workstation palette with persistent graphite sidebar</div></div>' +
            '<div class="inline-flex p-1 rounded-lg wf-elevated">' +
              ['light:Light', 'dark:Dark', 'system:System'].map(function(x) {
                const kv = x.split(':');
                return '<button type="button" onclick="window.TF.updateSetting(\'theme\', \'' + kv[0] + '\')" class="px-3 py-1.5 rounded text-[12px] font-medium ' +
                  (th === kv[0] ? 'bg-[#10B981] text-white' : 'wf-subtext') + '">' + kv[1] + '</button>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<div><div class="text-[14px] font-semibold wf-text">Interface Density</div><div class="text-[12.5px] wf-subtext">Adjust card spacing across dashboard panels</div></div>' +
            '<div class="inline-flex p-1 rounded-lg wf-elevated">' +
              ['comfortable:Comfortable', 'compact:Compact'].map(function(x) {
                const kv = x.split(':');
                return '<button type="button" onclick="window.TF.updateSetting(\'density\', \'' + kv[0] + '\')" class="px-3 py-1.5 rounded text-[12px] font-medium ' +
                  (den === kv[0] ? 'bg-[#10B981] text-white' : 'wf-subtext') + '">' + kv[1] + '</button>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<div><div class="text-[14px] font-semibold wf-text">Daily Study Target</div><div class="text-[12.5px] wf-subtext">Displayed in Today\'s Plan session budget</div></div>' +
            '<select onchange="window.TF.updateSetting(\'dailyGoalMin\', Number(this.value))" class="wf-input h-9 px-3 text-[13px]">' +
              [15, 30, 45, 60].map(function(m) {
                return '<option value="' + m + '" ' + (goal === m ? 'selected' : '') + '>' + m + ' minutes / day</option>';
              }).join('') +
            '</select>' +
          '</div>' +

          '<div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<div><div class="text-[14px] font-semibold wf-text">Backup &amp; Restore (`localStorage`)</div><div class="text-[12.5px] wf-subtext">Export your notes &amp; progress as JSON or restore on another device</div></div>' +
            '<div class="flex flex-wrap items-center gap-2">' +
              '<button type="button" onclick="window.TF.exportStateJson()" class="px-3.5 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12.5px] font-semibold transition">Export JSON</button>' +
              '<label class="px-3.5 py-2 rounded-lg wf-elevated hover:border-[#10B981] text-[12.5px] font-medium wf-text cursor-pointer transition">' +
                'Import JSON<input type="file" accept="application/json" class="hidden" onchange="window.TF.importStateJson(this)" />' +
              '</label>' +
            '</div>' +
          '</div>' +

          '<div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<div><div class="text-[14px] font-semibold text-[#DC5555]">Reset Workstation State</div><div class="text-[12.5px] wf-subtext">Clears completed lessons, quiz answers, and restores starter notes</div></div>' +
            '<button type="button" onclick="window.TF.resetAllData()" class="px-3.5 py-2 rounded-lg border border-[#DC5555]/50 text-[#DC5555] hover:bg-[#DC5555]/10 text-[12.5px] font-semibold transition">Reset All Data</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // =========================================================================
  // ROUTER, INTERACTIONS & GLOBAL COMMAND PALETTE (CTRL + K)
  // =========================================================================
  let currentPath = document.body.getAttribute('data-initial-route') || window.location.pathname || '/';
  let cmdMatches = [];
  let cmdActiveIdx = 0;

  function updateSidebarActive(path) {
    let section = 'home';
    if (path.startsWith('/roadmap')) section = 'roadmap';
    else if (path.startsWith('/courses') || path.startsWith('/lessons')) section = 'courses';
    else if (path.startsWith('/notes')) section = 'notes';
    else if (path.startsWith('/practice')) section = 'practice';
    else if (path.startsWith('/examples')) section = 'examples';
    else if (path.startsWith('/progress')) section = 'progress';
    else if (path.startsWith('/settings')) section = 'settings';

    document.querySelectorAll('[data-nav]').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-nav') === section);
    });

    const bc = document.getElementById('top-breadcrumb');
    if (bc) {
      const clean = path === '/' ? 'workstation / home' : 'workstation ' + path.replace(/\//g, ' / ');
      bc.textContent = clean;
    }
  }

  function renderRoute(path, preserveScroll) {
    currentPath = path || '/';
    updateSidebarActive(currentPath);
    const vp = document.getElementById('app-viewport');
    if (!vp) return;

    if (currentPath === '/' || currentPath === '') {
      vp.innerHTML = C.renderHomeView();
    } else if (currentPath === '/roadmap') {
      vp.innerHTML = C.renderRoadmapView();
    } else if (currentPath === '/courses') {
      vp.innerHTML = C.renderCoursesView();
    } else if (currentPath.startsWith('/courses/')) {
      const slug = currentPath.slice('/courses/'.length).split('/')[0];
      vp.innerHTML = C.renderCourseDetailView(slug);
    } else if (currentPath.startsWith('/lessons/')) {
      const parts = currentPath.slice('/lessons/'.length).split('/');
      vp.innerHTML = renderLessonWorkspace(parts[0] || '', parts[1] || '');
    } else if (currentPath === '/notes') {
      vp.innerHTML = renderNotesView();
    } else if (currentPath === '/practice') {
      vp.innerHTML = renderPracticeView();
    } else if (currentPath === '/examples') {
      vp.innerHTML = renderExamplesView();
    } else if (currentPath === '/progress') {
      vp.innerHTML = renderProgressView();
    } else if (currentPath === '/settings') {
      vp.innerHTML = renderSettingsView();
    } else {
      vp.innerHTML = C.renderHomeView();
    }

    if (!preserveScroll) vp.scrollTop = 0;
    C.syncShellTelemetry();
  }

  function buildSearchIndex() {
    const items = [
      { kind: 'Workspace', title: 'Home Command Center', sub: 'Overview, streak & Today\'s Plan', href: '/' },
      { kind: 'Workspace', title: 'Learning Roadmap (Visual Graph & Tree)', sub: 'Prerequisite architecture map', href: '/roadmap' },
      { kind: 'Workspace', title: 'Practice Quizzes & Tech Lead Simulations', sub: '18 scenarios + 4 open drills', href: '/practice' },
      { kind: 'Workspace', title: 'Engineering Notes Studio', sub: 'Local Markdown specs & ADRs', href: '/notes' },
      { kind: 'Workspace', title: 'Production Examples Library', sub: 'ADRs, Tickets, Reviews & Post-Mortems', href: '/examples' }
    ];
    DATA.courses.forEach(function(c) {
      items.push({ kind: c.code, title: c.title, sub: c.subject + ' · ' + c.lessonCount + ' lessons', href: '/courses/' + c.slug });
      C.getFlatLessons(c).forEach(function(x) {
        items.push({ kind: x.lesson.code, title: x.lesson.title, sub: c.title, href: '/lessons/' + c.slug + '/' + x.lesson.slug });
      });
    });
    DATA.examples.forEach(function(ex) {
      items.push({ kind: ex.code, title: ex.title, sub: 'Example · ' + ex.artifactType, href: '/examples', exampleId: ex.id });
    });
    STATE.notes.forEach(function(n) {
      items.push({ kind: 'Note', title: n.title || 'Untitled', sub: n.tag || 'Personal', href: '/notes', noteId: n.id });
    });
    return items;
  }

  window.TF = {
    nav: function(ev, href) {
      if (ev && (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button === 1)) return true;
      if (ev) ev.preventDefault();
      window.TF.closeMobileDrawer();
      window.TF.closeCommandPalette();
      if (window.location.pathname !== href) {
        window.history.pushState({}, '', href);
      }
      renderRoute(href, false);
      return false;
    },
    openMobileDrawer: function() {
      const sb = document.getElementById('app-sidebar');
      const bd = document.getElementById('mobile-backdrop');
      if (sb) sb.classList.remove('-translate-x-full');
      if (bd) bd.classList.remove('hidden');
    },
    closeMobileDrawer: function() {
      const sb = document.getElementById('app-sidebar');
      const bd = document.getElementById('mobile-backdrop');
      if (sb) sb.classList.add('-translate-x-full');
      if (bd) bd.classList.add('hidden');
    },
    toggleSidebarCollapse: function() {
      STATE.ui.sidebarCollapsed = !STATE.ui.sidebarCollapsed;
      C.applyThemeAndDensity();
      C.saveState();
    },
    toggleTheme: function() {
      const isDark = document.documentElement.classList.contains('dark');
      STATE.settings.theme = isDark ? 'light' : 'dark';
      C.applyThemeAndDensity();
      C.saveState();
      C.toast('Switched to ' + STATE.settings.theme + ' workstation theme');
    },
    toggleFullscreen: function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen && document.exitFullscreen();
      }
    },
    setUi: function(key, val) {
      STATE.ui[key] = val;
      C.saveState();
      renderRoute(currentPath, true);
    },
    setUiSilent: function(key, val, rerender) {
      STATE.ui[key] = val;
      C.saveState();
      if (rerender) {
        const activeId = document.activeElement && document.activeElement.tagName === 'INPUT' ? document.activeElement.placeholder : null;
        const pos = document.activeElement ? document.activeElement.selectionStart : null;
        renderRoute(currentPath, true);
        if (activeId) {
          const inp = Array.from(document.querySelectorAll('input')).find(function(i) { return i.placeholder === activeId; });
          if (inp) { inp.focus(); if (pos !== null) inp.setSelectionRange(pos, pos); }
        }
      }
    },
    selectRoadmapNode: function(slug) {
      STATE.ui.selectedRoadmapCourse = slug;
      C.saveState();
      renderRoute(currentPath, true);
    },
    openCoursePractice: function(courseSlug) {
      STATE.ui.practiceTab = 'questions';
      STATE.ui.practiceCourse = courseSlug;
      C.saveState();
      window.history.pushState({}, '', '/practice');
      renderRoute('/practice', false);
    },
    toggleLesson: function(courseSlug, lessonSlug) {
      const k = C.lessonKey(courseSlug, lessonSlug);
      const course = C.getCourse(courseSlug);
      const flat = course ? C.getFlatLessons(course) : [];
      const found = flat.find(function(x) { return x.lesson.slug === lessonSlug; });
      if (STATE.completedLessons[k]) {
        delete STATE.completedLessons[k];
        C.toast('Marked lesson incomplete');
      } else {
        STATE.completedLessons[k] = Date.now();
        C.logActivity('Completed ' + (found ? found.lesson.code + ': ' + found.lesson.title : lessonSlug), 'lesson');
        C.toast('Lesson marked complete ✓');
      }
      C.saveState();
      renderRoute(currentPath, true);
    },
    answerInlineCheck: function(courseSlug, lessonSlug, optionIdx) {
      const k = C.lessonKey(courseSlug, lessonSlug);
      STATE.inlineChecks[k] = optionIdx;
      C.saveState();
      renderRoute(currentPath, true);
    },
    toggleTakeaway: function(tkKey) {
      if (STATE.checkedTakeaways[tkKey]) delete STATE.checkedTakeaways[tkKey];
      else STATE.checkedTakeaways[tkKey] = true;
      C.saveState();
      renderRoute(currentPath, true);
    },
    saveLessonScratchpad: function(courseSlug, lessonSlug, lessonTitle, content) {
      const noteId = 'lesson-note::' + courseSlug + '::' + lessonSlug;
      let existing = STATE.notes.find(function(n) { return n.id === noteId; });
      if (!existing) {
        existing = {
          id: noteId,
          title: 'Notes: ' + lessonTitle,
          courseSlug: courseSlug,
          lessonSlug: lessonSlug,
          tag: 'Lesson',
          content: content,
          updatedAt: Date.now()
        };
        STATE.notes.unshift(existing);
      } else {
        existing.content = content;
        existing.updatedAt = Date.now();
      }
      C.saveState();
      const st = document.getElementById('lesson-note-status');
      if (st) st.textContent = 'Saved ✓';
    },
    selectNote: function(id) {
      STATE.activeNoteId = id;
      C.saveState();
      renderRoute(currentPath, true);
    },
    createNoteFromTemplate: function(kind) {
      let title = 'Untitled Engineering Note';
      let tag = 'Architecture';
      let content = '# Engineering Note\n\n- ';
      if (kind === 'ticket') {
        title = 'Ticket Spec: [Feature Slice]';
        tag = 'Team';
        content = DATA.examples[0].noteMarkdownTemplate;
      } else if (kind === 'adr') {
        title = 'ADR: [Decision Title]';
        tag = 'ADR';
        content = DATA.examples[1].noteMarkdownTemplate;
      }
      const n = {
        id: 'note-' + Date.now(),
        title: title,
        courseSlug: 'systems-foundations',
        lessonSlug: '',
        tag: tag,
        content: content,
        updatedAt: Date.now()
      };
      STATE.notes.unshift(n);
      STATE.activeNoteId = n.id;
      STATE.ui.notesTag = 'all';
      STATE.ui.noteViewMode = 'write';
      C.logActivity('Created note: ' + title, 'note');
      C.saveState();
      renderRoute('/notes', true);
      C.toast('Created new note in localStorage');
    },
    updateActiveNote: function(field, val) {
      const n = STATE.notes.find(function(x) { return x.id === STATE.activeNoteId; }) || STATE.notes[0];
      if (!n) return;
      n[field] = val;
      n.updatedAt = Date.now();
      C.saveState();
      if (field === 'tag' || field === 'courseSlug') renderRoute(currentPath, true);
      else {
        const msg = document.getElementById('note-autosave-msg');
        if (msg) msg.textContent = 'Saved just now ✓';
      }
    },
    copyActiveNote: function() {
      const n = STATE.notes.find(function(x) { return x.id === STATE.activeNoteId; }) || STATE.notes[0];
      if (n && navigator.clipboard) {
        navigator.clipboard.writeText(n.content || '');
        C.toast('Copied Markdown to clipboard');
      }
    },
    deleteNote: function(id) {
      if (STATE.notes.length <= 1) {
        C.toast('Keep at least one note in workspace');
        return;
      }
      STATE.notes = STATE.notes.filter(function(n) { return n.id !== id; });
      STATE.activeNoteId = STATE.notes[0].id;
      C.saveState();
      renderRoute('/notes', true);
      C.toast('Deleted note');
    },
    answerQuiz: function(qId, optIdx) {
      const q = DATA.questions.find(function(x) { return x.id === qId; });
      STATE.quizAnswers[qId] = optIdx;
      if (q && optIdx === q.correctIndex) {
        C.logActivity('Solved scenario: ' + q.category, 'quiz');
      }
      C.saveState();
      renderRoute(currentPath, true);
    },
    resetQuizzes: function() {
      STATE.quizAnswers = {};
      C.saveState();
      renderRoute(currentPath, true);
      C.toast('Quiz answers cleared');
    },
    saveDrillDraft: function(drillId, text) {
      const wasEmpty = !STATE.drillDrafts[drillId];
      STATE.drillDrafts[drillId] = text;
      if (wasEmpty && text.trim().length > 25) {
        C.logActivity('Drafted simulation response: ' + drillId, 'drill');
      }
      C.saveState();
    },
    toggleDrillRubric: function(rk) {
      if (STATE.drillRubrics[rk]) delete STATE.drillRubrics[rk];
      else STATE.drillRubrics[rk] = true;
      C.saveState();
      renderRoute(currentPath, true);
    },
    toggleDrillReveal: function(drillId) {
      STATE.drillRevealed[drillId] = !STATE.drillRevealed[drillId];
      C.saveState();
      renderRoute(currentPath, true);
    },
    toggleBookmarkExample: function(exId) {
      if (STATE.bookmarkedExamples[exId]) delete STATE.bookmarkedExamples[exId];
      else STATE.bookmarkedExamples[exId] = true;
      C.saveState();
      renderRoute(currentPath, true);
    },
    cloneExampleToNotes: function(exId) {
      const ex = DATA.examples.find(function(x) { return x.id === exId; });
      if (!ex) return;
      const n = {
        id: 'note-' + Date.now(),
        title: 'Template: ' + ex.title,
        courseSlug: ex.courseSlug,
        lessonSlug: '',
        tag: ex.artifactType === 'ADR' ? 'ADR' : 'Architecture',
        content: ex.noteMarkdownTemplate,
        updatedAt: Date.now()
      };
      STATE.notes.unshift(n);
      STATE.activeNoteId = n.id;
      STATE.ui.noteViewMode = 'write';
      C.logActivity('Cloned template: ' + ex.code, 'note');
      C.saveState();
      window.history.pushState({}, '', '/notes');
      renderRoute('/notes', false);
      C.toast('Template cloned into your Notes!');
    },
    updateSetting: function(k, v) {
      STATE.settings[k] = v;
      C.applyThemeAndDensity();
      C.saveState();
      renderRoute(currentPath, true);
      C.toast('Updated setting: ' + k);
    },
    exportStateJson: function() {
      const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'the-factory-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      C.toast('Exported workstation backup JSON');
    },
    importStateJson: function(inputEl) {
      const file = inputEl.files && inputEl.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const parsed = JSON.parse(String(e.target.result));
          STATE = Object.assign(C.defaultState(), parsed);
          C.STATE = STATE;
          localStorage.setItem('the_factory_state_v1', JSON.stringify(STATE));
          C.applyThemeAndDensity();
          renderRoute(currentPath, false);
          C.toast('Restored workstation backup ✓');
        } catch (_) {
          C.toast('Invalid JSON backup file');
        }
      };
      reader.readAsText(file);
    },
    resetAllData: function() {
      if (!window.confirm('Reset all localStorage progress, quiz answers, and notes back to defaults?')) return;
      localStorage.removeItem('the_factory_state_v1');
      window.location.reload();
    },

    // Command Palette (Ctrl + K)
    openCommandPalette: function() {
      const m = document.getElementById('cmd-modal');
      const inp = document.getElementById('cmd-input');
      if (!m || !inp) return;
      m.classList.remove('hidden');
      m.classList.add('flex');
      inp.value = '';
      cmdActiveIdx = 0;
      window.TF.renderCommandResults('');
      setTimeout(function() { inp.focus(); }, 10);
    },
    closeCommandPalette: function() {
      const m = document.getElementById('cmd-modal');
      if (!m) return;
      m.classList.add('hidden');
      m.classList.remove('flex');
    },
    renderCommandResults: function(query) {
      const q = String(query || '').trim().toLowerCase();
      const all = buildSearchIndex();
      cmdMatches = (q
        ? all.filter(function(item) {
            return (item.title + ' ' + item.sub + ' ' + item.kind).toLowerCase().includes(q);
          })
        : all
      ).slice(0, 12);
      if (cmdActiveIdx >= cmdMatches.length) cmdActiveIdx = 0;

      const box = document.getElementById('cmd-results');
      if (!box) return;
      if (!cmdMatches.length) {
        box.innerHTML = '<div class="p-6 text-center text-[13px] wf-subtext">No matching courses, lessons, or notes.</div>';
        return;
      }
      box.innerHTML = cmdMatches.map(function(item, i) {
        const active = i === cmdActiveIdx;
        return '<button type="button" onclick="window.TF.pickCommandResult(' + i + ')" class="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 transition ' +
          (active ? 'bg-[#10B981]/12 text-[#10B981]' : 'hover:bg-[var(--bg-muted)] wf-text') + '">' +
          '<div class="min-w-0">' +
            '<div class="text-[13px] font-medium truncate">' + esc(item.title) + '</div>' +
            '<div class="text-[11.5px] wf-subtext truncate">' + esc(item.sub) + '</div>' +
          '</div>' +
          '<span class="font-mono text-[10.5px] px-2 py-0.5 rounded wf-elevated wf-subtext shrink-0">' + esc(item.kind) + '</span>' +
        '</button>';
      }).join('');
    },
    handleCommandKey: function(ev) {
      if (ev.key === 'Escape') {
        window.TF.closeCommandPalette();
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        cmdActiveIdx = Math.min(cmdMatches.length - 1, cmdActiveIdx + 1);
        window.TF.renderCommandResults(document.getElementById('cmd-input').value);
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        cmdActiveIdx = Math.max(0, cmdActiveIdx - 1);
        window.TF.renderCommandResults(document.getElementById('cmd-input').value);
      } else if (ev.key === 'Enter' && cmdMatches[cmdActiveIdx]) {
        ev.preventDefault();
        window.TF.pickCommandResult(cmdActiveIdx);
      }
    },
    pickCommandResult: function(idx) {
      const item = cmdMatches[idx];
      if (!item) return;
      if (item.exampleId) STATE.ui.activeExampleId = item.exampleId;
      if (item.noteId) STATE.activeNoteId = item.noteId;
      C.saveState();
      window.TF.closeCommandPalette();
      window.history.pushState({}, '', item.href);
      renderRoute(item.href, false);
    }
  };

  window.addEventListener('popstate', function() {
    renderRoute(window.location.pathname || '/', false);
  });

  window.addEventListener('keydown', function(ev) {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
      ev.preventDefault();
      const m = document.getElementById('cmd-modal');
      if (m && !m.classList.contains('hidden')) window.TF.closeCommandPalette();
      else window.TF.openCommandPalette();
    } else if (ev.key === 'Escape') {
      window.TF.closeCommandPalette();
    }
  });

  C.applyThemeAndDensity();
  renderRoute(currentPath, false);
})();
"##;
