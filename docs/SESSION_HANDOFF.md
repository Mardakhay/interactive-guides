# Session Handoff

**Last updated:** 2026-10-23  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)  
**Latest verified implementation/content checkpoint:** `59000b4c15d34403378d4d3c862a3b59983b3d99`

## Project goal

Rebuild Interactive Guides as a cohesive English/Russian, mobile-first, PWA-ready learning platform based on the supplied ABB six-month / 24-week frontend syllabus, the user's Notion learning notes, verified primary documentation, and valuable existing code. Content should be deep but understandable: mental models, step-by-step mechanisms, worked examples, misconceptions, knowledge checks with feedback, and meaningful independent coding practice. Reading or clicking “complete” is not proof of mastery.

## Verified architecture and content status

- Stack: React 18, TypeScript, Vite 5, Tailwind CSS, React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions.
- The core curriculum has 26 lesson IDs with EN/RU translations (52 locale files). The repository registers 11 supplementary lesson IDs with both translations (22 files) covering network/DNS, browser rendering, JS runtime and prototypes, architecture, auth/security, deployment, SQL, package workflows, Sass/SCSS and Bootstrap/MUI: 37 stable IDs / 74 locale files overall. Supplementary lessons remain outside the 24-week core-week sequence. Week 1 splits Internet/HTTP and HTML; Week 8 splits async/Fetch and Git.
- Content is served by Zod-validated JSON from `src/content/lessons/<lesson-id>/<locale>.json`, with shared schema validation and a canonical curriculum in `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`.
- `src/content/repository.ts` registers the structured lessons and provides curriculum lookup/adjacent lesson navigation.
- `src/features/structured-lesson/StructuredLessonRenderer.tsx` renders lesson blocks. `src/app/pages/StructuredLessonPage.tsx` provides the structured lesson page with locale switching, curriculum navigation, and completion control.
- All structured lessons are in editorial `review` status, not published/approved.
- Static checks and GitHub-hosted CI validate schemas, current lesson registrations, EN/RU parity and practice/quiz invariants. The latest verified commit is `59000b4c15d34403378d4d3c862a3b59983b3d99`; CI run #279 passed the complete pipeline. Full semantic source parity is still incomplete; see `docs/CONTENT_AUDIT.md` and `docs/SOURCE_PARITY_AUDIT.md`.

## Practice execution

- Coding exercises persist drafts and self-review checklist state locally; quiz attempts are tracked separately.
- HTML has a sandboxed preview with scripts disabled.
- `src/features/structured-lesson/JavaScriptRunner.tsx` integrates a disposable dedicated Worker for ordinary JavaScript practice. `src/features/structured-lesson/JavaScriptWorkerProgram.ts` captures console output, reports runtime errors, blocks common network APIs and nested-worker loading, limits source to 12,000 characters and console output, and allows the parent page to terminate the Worker after 1.5 seconds.
- The runner has tests for source construction, console output, termination, reader integration, and actual Worker-bootstrap execution of an async snippet. A regression test now catches malformed source-prefix escaping that a mocked Worker lifecycle test missed.
- **Important limitations:** the Worker has no browser DOM, no TypeScript/TSX transpilation, and no shell. DOM exercises explicitly direct learners to run the task in their own project; live network requests are blocked, so Fetch examples must be run locally to observe a real successful response. The runner is a learning aid, not a hardened security boundary for malicious code; dynamic browser capability risks cannot be fully eliminated in client-side code. Do not paste secrets or claim the runner is safe for hostile snippets.

## Progress and data portability

- Existing progress, notes, bookmarks and quiz-result stores remain in place.
- Structured learner state stores quiz attempt history, code drafts, practice-review checklists, and completed lesson-section IDs.
- The section progress schema defaults missing `sectionProgress` for older v1 records, and tests cover section-state preservation through draft reset and backup merge.
- `src/features/data-portability/backup.ts` and the Data Management page provide validated JSON backup export/import with merge rules, including progress, notes, bookmarks, quiz results, structured attempts/drafts/checklists and selected preferences.
- Structured learning storage now uses the `interactive-guides:structured-learning:v2` envelope (`schemaVersion: 2`, `data`). The old raw `...:v1` key/shape migrates only after the v2 write succeeds; a malformed legacy record is preserved and reported rather than overwritten.
- Storage warnings persist in memory if raised before the banner mounts, distinguish read/write/remove failures, and link to data management. For write/remove warnings, **Retry save** re-writes current in-memory progress, bookmarks, notes, quiz results and structured learning data. Read/validation failures intentionally do not offer an automatic overwrite retry.
- Other feature stores retain their current validated formats; add future migrations as their schema changes rather than implying all stores already have version envelopes.
- Cloud sync, Supabase Auth/RLS and cross-device synchronization are not implemented.

## PWA and UI

- Manifest, SVG icons, service worker registration, basic cache behavior, install/update UI, and offline status UI exist.
- No real Android/iOS install/offline acceptance test has been completed.
- The major app shell components (sidebar, top bar, mobile navigation) and principal pages use a shared EN/RU UI copy layer; perform a full end-to-end locale sweep, including banners, empty/error states and every route. Legacy standalone HTML lesson content is still predominantly English and remains migration input. Cross-page visual consistency, mobile reflow and accessibility review are still required.

## Content/source audit

See `docs/CONTENT_AUDIT.md` for the audit scope and `docs/SOURCE_PARITY_AUDIT.md` for the inventory of all 25 source HTML pages, their structural markers, destinations and open semantic review steps. A successful schema/test/CI run does not mean every source paragraph or interaction has been migrated. The 26 core pairs plus 11 supplementary pairs remain in editorial `review`; a successful structural audit is not editorial approval.

## Content expansion and source-parity work — 2026-10-23

- Compared Week 14 against Notion Part 4 §§ 4.5–4.7 and `react-forms-tutorial.html`; expanded multi-field state, native validation constraints, timing, RHF, common mistakes and five scaffolded exercises.
- Compared Week 15 against Notion Part 4 §§ 4.8–4.14 and state portions of `react-ecosystem-course.html`; added custom-Hook instance ownership, a BookClub reducer/project and state-tool decision guidance.
- Expanded the other core lesson pairs with deeper tracing/practice on TDZ, closures/object identity, DOM delegation, event-loop ordering, Git undo/CI, package lockfiles, TypeScript runtime validation, React state snapshots/effects/API, URL state, HTML semantics/forms, CSS cascade/layout, accessibility/performance, RTL testing and capstone workflows.
- Added nine new bilingual supplementary lessons: `js.runtime-memory`, `js.object-prototypes`, `frontend.architecture-boundaries`, `frontend.auth-security`, `deployment.production-hosting`, `data.sql-postgresql`, `css.sass-scss`, `ui.bootstrap-mui`, and `tooling.advanced-package-workflows`.
- Registered the new lessons and updated both EN/RU curriculum tracks; added `src/content/schemas/supplementaryLessons.test.ts`. Source IDs and destinations are tracked in `docs/LEGACY_CONTENT_INVENTORY.md`; a 25-file structural scan is summarized in `docs/SOURCE_PARITY_AUDIT.md`.
- Fix commits after failed checks: `e7c89400813f0f0fe93b5a6e0a6ebe192efb61e7` adds the two missing deployment/SQL pairs to the tracked branch and updates old count/reader assertions; `59000b4c15d34403378d4d3c862a3b59983b3d99` fixes required metadata and aligns the Sass/Bootstrap/MUI track IDs.
- All lesson statuses remain `review`. The audit includes structural markers across all sources, but paragraph-by-paragraph and hidden-interaction parity remains open; new TSX examples have not been executed in a real React host app.

## CI verification

- GitHub Actions [run #279](https://github.com/Mardakhay/interactive-guides/actions/runs/39921024455) passed on exact code/content/test commit `59000b4c15d34403378d4d3c862a3b59983b3d99`: `npm ci`, ESLint, TypeScript typecheck, the full test suite and production build all succeeded.
- Prior runs failed during the expansion while the quiz-count assertions, reader selectors, missing branch files and lesson metadata were corrected. Those failures were inspected from CI logs and corrected before the currently verified checkpoint.
- These are GitHub-hosted checks. No independent local checkout, real-device acceptance test, or actual React/TSX code execution has been performed. The documentation-only source audit commit will trigger another run and must be checked before treating its exact head as green.

## Next actions

1. Continue paragraph/example/hidden-answer/interaction mapping for the 25 sources using `docs/SOURCE_PARITY_AUDIT.md`; the current scan is structural, not full semantic parity.
2. Human-review each EN/RU lesson pair, execute/review new TSX examples in a real React project and only then change any lesson status from `review`.
3. Complete an end-to-end locale sweep and consolidate design-system styling across routes; test keyboard access, narrow viewports, contrast, focus states and reduced motion.
4. Test Worker execution under the deployed hosting/CSP environment while preserving the warning that it is not hardened for hostile code.
5. Exercise the structured-learning v1→v2 migration, backup merge and Retry save path against real browser storage/quota failures.
6. Test PWA installation and offline behavior on supported browsers/devices, including deep routes, cached lessons, service-worker updates and cache quota behavior.
7. Decide on dedicated Supabase ownership/cost only after local contracts stabilize and the user explicitly approves the plan.
8. Keep PR #1 in draft until editorial review and release acceptance criteria are satisfied.

## Commit conventions

Use focused messages such as `feat(playground): add disposable worker runner`, `feat(i18n): localize remaining app shell`, `test(content): ...`, `content(javascript): ...`, and `docs: ...`.
