# Style — Nour Yahyaoui portfolio (v2)

The one-page brief so future changes don't drift back to the average.
Derived from the owner's UX skill library: `distinctive-visual-style`
(Recipe R1), `design-system-and-visual-language`, and `global-ui-reformat`.

```
ANCESTOR:   a printed manual / spec sheet / broadsheet index
PALETTE:    light — paper #F5F3EE · ink #141310 · mute #625D51 · rule #D9D5CB
            dark  — paper #12110F · ink #EDEAE2 · mute #A8A294 · rule #2B2924
            accent vermilion #C4340B (light) / #F26D3D (dark), on ~4% of the surface:
            the period after the name, index numbers' punctuation, primary-link
            rules, focus rings, active nav dot, button hover. Nothing else.
TYPE:       display = "Iowan Old Style", Palatino, Georgia, serif — weight 400
            body    = system-ui 17/1.65 · label = ui-monospace 11px, uppercase, +0.14em
SCALE:      64 / 34 / 21 / 17 / 11 — hierarchy from scale, never from colour
LAYOUT:     max-w 72rem (1152px), left-aligned, left rail for numbers/labels,
            hairlines (1px var(--rule)) between rows, generous whitespace
RADIUS:     2px. Nothing else (dots excepted).
SHADOW:     none. Elevation is a 1px border on a surface one step off the paper.
SIGNATURE:  the numbered project index — every project set densely in type
            with tabular numerals, like a spec sheet's table of contents.
THEME:      system preference by default; header toggle persists to
            localStorage and wins over the system; blocking inline script
            in app/layout.tsx sets [data-theme] before paint (no FOUC).
            All colour goes through tokens in app/globals.css —
            zero hardcoded theme colours in components.
BANNED:     gradients · gradient text · emoji as icons · centred body copy ·
            radius > 4px · glow/blur shadows · glassmorphism · fake
            browser/terminal chrome · accent on headings · pill eyebrows ·
            hardcoded hex in components · lorem/placeholder content
```

## Rules that gate "done"

- Contrast ≥ 4.5:1 for text in **both** themes (verified for every token pair
  in v2: ink 16.7:1, mute 5.9:1, accent 4.9:1 light / 6.3:1 dark).
- Tap targets ≥ 44px; visible `:focus-visible` ring everywhere; Escape
  closes the mobile menu and returns focus.
- Works at 320px with no horizontal scroll; checked 320 → 1440.
- `prefers-reduced-motion` kills transitions and smooth scrolling.
- Every interactive element has hover, focus-visible, and active states.
- Buttons follow the button law (disable in flight, progress in the button,
  timeout, human error copy, keep the user's input on failure).
- Numbers that appear on the site are real and specific (versions, test
  counts, counts of projects) — update them from the source repos, never
  round them into marketing claims.

## Where things live

| Piece | File |
|---|---|
| Tokens, type scale, buttons, fields | `app/globals.css` |
| Theme state (system + persist) | `components/ThemeProvider.tsx` |
| Theme toggle | `components/ThemeToggle.tsx` |
| No-FOUC init script | `app/layout.tsx` (`THEME_INIT_SCRIPT`) |
| Masthead / colophon | `components/Header.tsx`, `components/Footer.tsx` |
| Signature index entries | `components/ProjectCard.tsx` |
| Project data (single source) | `lib/projects.ts` |
| Case-study prose per project | `lib/projectDetails.ts` |
| Skills data (single source) | `lib/skills.ts` |
| Skills marquee (horizontal showcase) | `components/SkillMarquee.tsx` — pure CSS transform animation, zero client JS; pauses on hover/focus, scrollable under reduced motion |
