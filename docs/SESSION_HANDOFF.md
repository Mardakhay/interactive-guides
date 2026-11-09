# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)  
**Current branch head:** `3b61392a839b169591ac3dbdb1170cfb94b4eb4e`

## Project goal

Rebuild Interactive Guides as a cohesive bilingual (English/Russian), mobile-first, PWA-ready learning platform based on the user's Notion learning notes, the supplied six-month/24-week ABB Frontend Bootcamp syllabus, carefully verified primary documentation, and useful existing code.

Lessons must be deep but understandable: explain concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain errors, and avoid claiming mastery just because content was opened. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, Node/npm/build/package tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Verified application before redesign

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Existing course catalog: `src/data/lessons.json`; quiz data: `src/data/quizzes.json`.
- Existing HTML map: `src/features/lesson-renderer/lessonLoader.ts`.
- Legacy source content: 25 standalone files in `public/lessons/*.html`.
- Existing progress: `src/features/progress/store.ts`, persisted in localStorage.
- Existing features include dashboard, course catalog, lesson reader, learning paths, bookmarks, notes, search, quizzes and local progress.

## Implemented content foundation on the working branch

- Typed lesson block/translation schema in `src/content/schemas/lessonContent.ts`.
- Curriculum schema enforcing six months, 24 consecutive weeks and unique identifiers in `src/content/schemas/curriculum.ts`.
- English/Russian bootcamp curriculum in `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`, with supplementary topics explicitly separated from the original syllabus.
- Validated lesson repository in `src/content/repository.ts`; available structured lesson IDs currently resolve in the following sequence:
  1. Week 1: `html.document-structure`
  2. Week 2: `html.forms-accessibility`
  3. Week 3: `css.fundamentals`
  4. Week 4: `css.flexbox-grid-responsive`
  5. Week 5: `js.basics-types-control-flow`

Each lesson has an English and Russian JSON translation under `src/content/lessons/<lesson-id>/`. All currently use the editorial status `review` and should not be called fully approved/published yet.

### Lesson topics

- **Week 1 — HTML document structure:** doctype, html/head/body, metadata, semantic sections, code walkthrough, knowledge checks, independent About Me page exercise and references.
- **Week 2 — HTML forms and accessibility:** form submission basics, label/id/name, input types, autocomplete, validation, fieldset/legend, accessible errors, three checks, registration form exercise.
- **Week 3 — CSS fundamentals:** stylesheet placement, selectors, cascade/specificity, box model, border-box, display, checks and landing-page practice.
- **Week 4 — Flexbox/Grid/responsive design:** flex axes and alignment, Grid tracks/fr/repeat/minmax, mobile-first media queries, responsive failure modes, checks and a responsive-card exercise.
- **Week 5 — JavaScript basics:** let/const, primitive types, null/undefined, operators, strict equality/coercion, if/else, switch, for/while/for...of, checks and a running-order-total coding task.

## Reader and learner state

- Shared React renderer: `src/features/structured-lesson/StructuredLessonRenderer.tsx`.
- Locale-aware route: `/:locale/structured-lessons/:lessonId`.
- Reader includes learning outcomes, TOC, EN/RU switching, curriculum-ordered previous/next navigation and a self-attested completion marker.
- Reader changes the document `lang` attribute when locale changes.
- Completion is explicitly distinct from quiz results and practice evidence; it is not marketed as mastery.
- Local structured learning store: `src/features/structured-lesson/store.ts`, tracks quiz-attempt history, code drafts, and self-review checklist state separately from the old lesson-status store.
- The editor executes no arbitrary JavaScript. Only HTML preview is provided and runs in a sandboxed iframe with scripts disabled.
- Schema validation now includes line-reference bounds for code walkthroughs.

## PWA foundation

- `public/manifest.webmanifest`, SVG icon assets, `public/sw.js`, production service-worker registration, network status banner and install/update UI have been added.
- App shell, hashed assets and public legacy lesson files have basic cache strategies.
- API/auth/functions/storage/realtime paths are explicitly excluded from service-worker caching.
- PWA installability and offline behavior have not yet been verified on actual Android/iOS devices.

## Latest CI evidence

- Latest CI run: [run #41](https://github.com/Mardakhay/interactive-guides/actions/runs/39755952551) — status `completed`, conclusion `failure`.
The repository workflow checks `npm ci`, lint, TypeScript typecheck, tests and production build. When resuming, inspect the exact current branch head and its latest run rather than assuming a previous passing run covers subsequent commits.

## Supabase status

The connected Supabase account has projects named `kaelig` and `Mardakhay's Project`; neither is named for Interactive Guides. No schema was changed. Do not repurpose an existing project or create a potentially billable one without confirming intent and cost. Never expose service-role credentials in browser code. Local-first work should proceed before cloud sync.

## Documents in `docs/`

- `README.md`
- `CURRENT_STATE.md`
- `PRODUCT_REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `CURRICULUM_AND_CONTENT.md`
- `LEGACY_CONTENT_INVENTORY.md`
- `PERSISTENCE_AND_SUPABASE.md`
- `PWA_AND_MOBILE.md`
- `ROADMAP.md`
- `DECISIONS.md`
- `SESSION_HANDOFF.md`

## Next actions

1. Verify the latest CI run for the exact current branch head and fix any failures before continuing.
2. Continue Week 6 — functions, array methods and objects — in both locales, preserving the given syllabus order.
3. Add the new lesson to the curriculum JSON, lesson repository and schema/locale parity tests.
4. Audit local progress/notes/bookmarks persistence for versioned migrations and data export before cloud sync.
5. Continue migrating the 25 HTML inputs in syllabus order, fully inspecting source content, improving accuracy, and maintaining equivalent translations.
6. Test mobile layout and PWA behavior through actual browser/device checks when available.
7. Implement Supabase only after local contracts stabilize and the intended project/cost are agreed.
8. Keep PR #1 in draft until tests, content quality and scope are ready for review.

## Commit conventions

Use focused Conventional Commit-style messages:
- `content(javascript): ...`
- `content(css): ...`
- `feat(lesson-reader): ...`
- `feat(progress): ...`
- `test(content): ...`
- `docs: ...`

Do not report planned features as implemented and do not delete legacy HTML until each replacement passes review.
