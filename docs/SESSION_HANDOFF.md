# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)  
**Latest validated commit:** `ce27c5c63d9a0f6161968e7f34d63e4708364366`  
**Latest GitHub Actions run:** [Run #39 — passed](https://github.com/Mardakhay/interactive-guides/actions/runs/39755299982)

## Project goal

Rebuild Interactive Guides as a cohesive bilingual (English/Russian), mobile-first, PWA-ready learning platform based on the user's Notion learning notes, the supplied six-month/24-week ABB Frontend Bootcamp syllabus, carefully verified current primary documentation, and useful existing code.

Lessons must be deep but understandable: explain concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain errors, and avoid claiming mastery just because content was opened. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, Node/npm/build/package tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Verified current application before redesign

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Current catalog: `src/data/lessons.json`; existing quizzes: `src/data/quizzes.json`.
- Legacy content map: `src/features/lesson-renderer/lessonLoader.ts`.
- Source content: 25 standalone HTML files in `public/lessons/*.html`.
- Existing progress store: `src/features/progress/store.ts`, backed by localStorage.
- Existing features include dashboard, catalog, lesson reader, learning paths, bookmarks, notes, search, quizzes and local progress.
- Existing content is category-first and did not initially represent the full 24-week core syllabus in order.

## Implemented on `feat/learning-platform-foundation`

### Content and curriculum contracts
- `src/content/schemas/lessonContent.ts`: Zod schemas for typed lesson blocks, metadata, quiz answer invariants, unique block IDs, references and code-walkthrough line boundaries.
- `src/content/schemas/curriculum.ts`: validates the six-month / 24-week order and unique stable identifiers.
- `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`: canonical core syllabus and six separately labelled supplementary tracks.
- `src/content/repository.ts`, `src/content/index.ts`: validates and retrieves translations/curriculum; resolves a lesson's week and previous/next available structured lessons in syllabus order.

### Structured bilingual lessons
Available in both locales and included in the content repository:

1. Week 1 — `html.document-structure`
   - `src/content/lessons/html-document-structure/en.json`
   - `src/content/lessons/html-document-structure/ru.json`
   - Document shell, metadata, semantic regions, code walkthrough, knowledge checks, independent About Me page exercise and MDN/WHATWG references.

2. Week 2 — `html.forms-accessibility`
   - `src/content/lessons/html.forms-accessibility/en.json`
   - `src/content/lessons/html.forms-accessibility/ru.json`
   - Form/action/method, id/name/label, placeholders, input types, native validation, fieldset/legend, accessible errors, three checks and a registration-form exercise.

3. Week 3 — `css.fundamentals`
   - `src/content/lessons/css.fundamentals/en.json`
   - `src/content/lessons/css.fundamentals/ru.json`
   - CSS attachment methods, selectors, cascade/specificity, box model, border-box, display types, knowledge checks, landing-page practice and MDN sources.

4. Week 4 — `css.flexbox-grid-responsive`
   - `src/content/lessons/css.flexbox-grid-responsive/en.json`
   - `src/content/lessons/css.flexbox-grid-responsive/ru.json`
   - Flexbox axes/alignment, Grid tracks/fr/repeat/minmax, mobile-first queries, common responsive failures, three checks and a responsive card-layout exercise.

All four are marked `review`; they are structured pilot content, not yet fully editorially approved or published. EN/RU versions use stable lesson IDs and parallel block IDs/types.

### Reader and interactions
- `src/features/structured-lesson/StructuredLessonRenderer.tsx`: shared renderers for prose, callouts, lists, code, code walkthroughs, knowledge checks, coding exercises and references.
- Coding tasks save local drafts and self-review checklist ticks; HTML has an isolated sandboxed preview with scripts disabled.
- Quiz attempts are persisted separately from lesson completion through `src/features/structured-lesson/store.ts`.
- `src/app/pages/StructuredLessonPage.tsx` and `/:locale/structured-lessons/:lessonId`: localized reader, language switch, learning outcomes, TOC, curriculum-context panel, next/previous navigation and self-attested completion control.
- The reader updates the document language for accessibility.
- The existing dashboard links to the pilot lesson in English and Russian.

### PWA foundation
- Added `public/manifest.webmanifest`, SVG app icons, `public/sw.js`, service worker registration, offline status banner, install/update prompt and PWA static contract tests.
- Public app assets/lesson HTML can be cached; API/auth/rest/functions/storage/realtime paths are excluded from service-worker caching.
- This is a PWA foundation, not yet real-device-verified install/offline behavior.

### Learning data and tests
- Local structured learning store tracks quiz-attempt history, code drafts and practice self-review separately from the legacy lesson-status store.
- Tests cover lesson/curriculum schemas, stable translation structure, lesson repository lookups, neighboring lesson order, renderer interaction, completion state, local draft/attempt persistence and PWA static contract.
- Schema now rejects walkthrough line references that exceed sample-code line count.
- No automated arbitrary-language code execution is implemented; HTML previews remain sandboxed.

## Validation evidence

Latest GitHub Actions run #39 passed on `ce27c5c63d9a0f6161968e7f34d63e4708364366`:
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

Two earlier runs failed while introducing walkthrough line-count validation because the line-splitting literal was initially escaped incorrectly. The code now uses actual newline boundaries; run #39 passed with the corrected implementation. Keep the tests; do not remove the validation as a workaround.

## Supabase discovery and constraint

The connected Supabase account lists projects named `kaelig` and `Mardakhay's Project`; neither is named for Interactive Guides. Existing schemas were inspected read-only and no schema was changed. Do not repurpose an existing project or create a potentially billable project without explicit confirmation and cost review. Never expose service-role credentials to browser code.

## Documentation

- `docs/README.md`
- `docs/CURRENT_STATE.md`
- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/CURRICULUM_AND_CONTENT.md`
- `docs/LEGACY_CONTENT_INVENTORY.md`
- `docs/PERSISTENCE_AND_SUPABASE.md`
- `docs/PWA_AND_MOBILE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/SESSION_HANDOFF.md`

## Next actions

1. Continue the canonical syllabus with Week 5 — JavaScript Basics (let/const, primitives, operators, conditions and loops) in English and Russian.
2. Add JavaScript examples and test questions that independently check coercion/types/control-flow reasoning, then an independent coding task.
3. Keep the CSS line-reference validation and build upon schema tests.
4. Improve local progress durability/migration/export before any cloud sync.
5. Make PWA behavior safer and testable: add unit tests for service-worker policies where practical, ensure deployed base paths match manifest/service-worker scope, then perform device checks when a browser/device environment is available.
6. Audit all 25 source HTML files fully; keep them until bilingual structured replacements pass review.
7. Add Supabase after local contracts stabilize and the intended project/cost are agreed.
8. Update this file after every logical phase and keep PR #1 in draft until review and coverage are sufficient.

## Commit conventions

Use focused Conventional Commit-style messages, for example:
- `content(javascript): add bilingual JavaScript basics lesson`
- `test(content): validate lesson links and translation parity`
- `feat(progress): preserve attempts and drafts across sessions`
- `feat(pwa): validate offline routes and update behavior`

Do not report planned features as implemented and do not delete old lessons before verified migration.
