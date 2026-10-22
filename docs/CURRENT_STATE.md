# Current-State Audit

**Audit date:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Default branch observed:** `main`

This audit is based on the repository root, source directory listings, current package/config files, the lesson catalog, the renderer and progress-store implementation, selected full HTML lesson files, and recent commit history available through GitHub. It is not a local test run; no claim is made that the current build or tests were executed during this remote audit.

## Existing application

The repository is already a React application, not just a set of HTML files:

- React 18, TypeScript, Vite 5, Tailwind CSS 3
- React Router 6
- Zustand for state
- Zod schemas
- Vitest and Testing Library
- ESLint and GitHub Actions CI

Available scripts from `package.json`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run test:watch`

The current CI workflow runs install, lint, typecheck, tests, and build for pushes and pull requests targeting `main`.

## Existing application features visible in source

- Dashboard
- Course catalog and category details
- Lesson viewer with previous/next navigation
- Lesson completion status and auto-advance behavior
- Bookmarks
- Notes
- Quizzes and saved results
- Search
- Learning paths
- Sidebar and mobile navigation
- Lazy-loaded route pages and route error boundaries
- Schema validation for catalog and progress state
- Local persistence through a small `localStorage` helper
- Some unit tests

The catalog presently declares 25 lessons (IDs spanning `sh-001`, `wb-001…004`, `js-001…004`, `re-001…006`, `ui-001…002`, `tl-001…004`, `qa-001…002`, `sec-001`, and `dt-001`). These categories do not fully represent the 24-week bootcamp sequence in order yet.

## Current content model

`src/data/lessons.json` stores metadata such as ID, title, slug, description, category, difficulty, tags, duration, and order. Its `content` values are empty for the listed lessons.

`src/features/lesson-renderer/lessonLoader.ts` contains a manifest mapping lesson IDs to files in `public/lessons/`. The viewer resolves the manifest and displays content using `LessonRenderer`. `src/features/lesson-renderer/components/ExternalHtmlLesson.tsx` is the current implementation to inspect closely during migration.

There are 25 large standalone HTML content files in `public/lessons/`. The selected samples (HTML, CSS, JavaScript, React ecosystem, Git, authentication and deployment) have separate document shells, CSS, typography choices, sidebars/navigation patterns, and visual token sets. That makes them rich source material but not a consistent application-level lesson format. At least some content mixes reference material, deep dives, and guided lessons. The migration should extract and improve their instructional substance, not keep their independent shells as the main user experience.

## Current persistence

The progress store uses `localStorage` and tracks per-lesson status (`not-started`, `in-progress`, `completed`), started/completed timestamps, and the last opened lesson. The generic storage helper catches errors and silently falls back. The current model does not represent section-level reading, individual quiz attempts, coding exercise results, confidence/mastery, spaced repetition, or user-scoped cloud synchronization.

Other features should be inspected before modifying them: bookmarks and notes have their own stores/schema/API modules. Preserve and migrate those records where practical.

## Gaps against the desired product

1. HTML documents are the main content container; there is no single typed, component-rendered lesson schema.
2. Lesson catalog/order is category-oriented rather than a canonical curriculum/program/module/week/lesson hierarchy.
3. Lesson metadata and lesson content are split by a hand-maintained manifest.
4. Current quiz formats need to be audited for explanation quality, coverage, localization and attempt history.
5. English and Russian are not modeled as paired translations at the catalog/content level.
6. Progress is mostly binary per lesson and only local to this browser.
7. There is no documented Supabase authentication/sync design.
8. PWA metadata, install prompt, offline strategy, service-worker cache lifecycle and offline acceptance tests need verification/implementation.
9. Visual styling inside each HTML lesson conflicts with the cohesive application design system.
10. The available course set includes deployment, auth, SQL, and architecture, but should be remapped to the bootcamp syllabus and explicitly mark supplements outside the original bootcamp scope.


## Working-branch update — 2026-10-22

The sections above record the original audit of `main` and remain useful as a baseline. The implementation has since advanced on `feat/learning-platform-foundation`; do not treat the baseline gap list as the current feature list.

### Structured bilingual course

- The canonical JSON curriculum still represents six months and 24 weeks. The current structured repository registers 26 lesson IDs, each with an English and a Russian JSON translation (52 translation files in total).
- Week 1 is split into web fundamentals/HTTP and HTML structure; Week 8 is split into async JavaScript/Fetch and Git fundamentals. Every other week currently has one main structured lesson.
- The repository imports and schema-validates all lesson translations. `getStructuredLesson`, `getWeekForLesson`, `getCurriculumWeek`, and `getAdjacentStructuredLessons` expose content and canonical navigation.
- Lessons use stable IDs and typed blocks for prose, lists, callouts, code, code walkthroughs, knowledge checks, coding exercises and references.
- Content covers the entire core sequence from Internet/URL/HTTP/DevTools, HTML/CSS, JS/Git, tooling, TypeScript, React, Router, forms, Context, API/custom Hooks, UI systems, accessibility/performance, testing, CI/workflow and capstone.
- All translations are still `review`, not fully editorial-approved/published. The 25 legacy HTML files remain migration inputs. A first-pass mapping exists, but source-by-source extraction/parity checks against Notion notes and legacy HTML are not complete.

### Application integration

- The app has a separate locale-aware structured lesson route at `/:locale/structured-lessons/:lessonId`; the reader supports EN/RU switching, document `lang`, table of contents, and previous/next lessons in syllabus order.
- Structured lessons are integrated into the bilingual catalog and search flow; tests cover localized routes, localized difficulty labels, and lesson discovery through body content.
- Shared React rendering handles the typed content blocks, option-level knowledge-check feedback, code copy controls, practice instructions/hints, and self-review checklists.
- Completion is a self-attested marker, separate from quiz attempts and practice evidence. A green completion marker is not presented as proof of mastery.

### Practice and progress

- `src/features/structured-lesson/store.ts` persists quiz attempts, code drafts, and checked self-review criteria locally in a dedicated versioned key. `src/lib/storage.ts` now emits a non-data-bearing event when a local persistence write/removal fails, and `StorageWarningBanner` shows a localized warning with a route to data backup.
- Coding exercises save drafts and expose hints/rubrics. The only live preview is HTML in an iframe with scripts disabled. **JavaScript and TypeScript exercises are not executable in the current UI.**
- A bilingual Data Management page and `src/features/data-portability/backup.ts` implement versioned JSON export/import for progress, bookmarks, notes, legacy quiz results, structured quiz attempts, code drafts, practice checklists, last lesson and theme. Import validates before writing, previews a summary, merges instead of clearing, uses per-record conflict rules, and attempts rollback if storage writes fail; `backup.test.ts` covers these cases. Remaining gaps are migration functions for future persisted-schema changes and visible recovery feedback for ordinary autosave/quota failures, since the generic storage helper still catches write errors silently.

### PWA, deployment, account sync

- The repository contains `public/manifest.webmanifest`, SVG icons and `public/sw.js`, plus production registration and install/update/offline UI.
- Cache rules exclude private/auth/API/function/storage/realtime routes. Actual offline and install behavior has not been independently checked on physical mobile devices during this pass.
- Supabase Auth/sync is not set up for a clearly dedicated Interactive Guides project. No schema was changed; project ownership and potential costs must be resolved before adding cloud resources.

### Verification status

- GitHub Actions run [#167](https://github.com/Mardakhay/interactive-guides/actions/runs/39776235742) passed for the exact current code/test HEAD `be9e050fba35082d036367e3e6b7eec47a7636c3`: `npm ci`, lint, TypeScript typecheck, tests and production build all succeeded.
- This run includes the Week 1 web/HTTP lesson, curriculum navigation checks, local-storage failure notification and its tests. Recheck the exact HEAD after subsequent commits.
- This is remote repository/CI evidence; no local `npm ci` or browser/device testing was executed in this environment.

### Next highest-value work

1. Review the source lessons in Notion and `public/lessons`, checking technical accuracy, completeness, outdated claims, source links and EN/RU equivalence.
2. Decide and design a safe, explicitly bounded JavaScript practice runner (including hard timeout semantics); do not equate an iframe timeout with hostile-code isolation.
3. Add versioned storage migrations, visible storage errors and export/import before cloud sync.
4. Finish localization/visual consistency across the legacy shell, then verify keyboard access, narrow mobile layouts and PWA update/offline behavior.
5. Add Supabase only after a dedicated-project decision and the local data contract have been reviewed.

## Non-negotiable migration constraints

- Keep the existing `main` history intact.
- Establish a feature branch before large implementation changes.
- Keep `public/lessons/*.html` as migration input until each lesson is extracted, reviewed, translated, validated and linked to its new structured counterpart.
- Do not delete a source lesson simply because a replacement route exists.
- Add data/content contract tests before bulk content migration.
- No service-role key or secret may be shipped to browser code.
- Do not make cloud accounts mandatory for anonymous/local learning.
