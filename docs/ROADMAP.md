# Implementation Roadmap

Use small, reversible phases; keep useful current behavior working while migration proceeds.

## Verified checkpoint — 2026-10-23

- Repaired `src/content/repository.ts` by removing the orphaned duplicate navigation block without weakening TypeScript settings or removing the valid adjacency implementation.
- Updated content registry tests to derive expectations from the canonical curriculum and corrected a supplementary-track test fixture that had duplicated an empty track.
- Added a bilingual `useReducer` + Context walkthrough and provider-scope guidance to Week 15; translated previously English quiz prompts in Russian Week 14/15 content.
- Compared Weeks 14–15 with the specific Notion sections and retained HTML sources. Filled in the missing multi-field form, validation timing, complete RHF example, common mistakes, quiz/exercise progression, custom-Hook state ownership and BookClub reducer project. See `docs/CONTENT_PARITY_REVIEW_WEEK14-15.md`.
- GitHub Actions [run #212](https://github.com/Mardakhay/interactive-guides/actions/runs/39909489666) passed for code/content SHA `495467a470828ffad5f689f2c4b2015771be18a5`: `npm ci`, lint, typecheck, tests and production build.
- The repository registers 26 core lesson IDs plus two supplementary lesson IDs (28 stable IDs / 56 locale files). The core 24-week order is unchanged; all lesson content remains in editorial `review`.
- Local and real-device testing were not performed. Continue human editorial review, actual React/TSX example verification, wider source parity review, localization/accessibility, storage and PWA acceptance rather than claiming release readiness.

## Phase 0 — Baseline and safeguards
- [x] Create working branch `feat/learning-platform-foundation`.
- [x] Establish draft PR #1 to run repository CI.
- [x] Run and record CI-quality checks for each vertical slice.
- [x] Record current architecture and preserve legacy lesson sources.
- [ ] If local checkout access becomes available, run independent local `npm ci`, lint, typecheck, tests and build checks.
- Acceptance: the working branch is reversible, content contracts are checked in CI, and feature implementation has not rewritten `main`.

## Phase 1 — Requirements, schemas and curriculum
- [x] Define typed lesson translation/content-block schemas.
- [x] Define the canonical six-month / 24-week syllabus with supplementary tracks separate.
- [x] Add structured bilingual pilot lessons for Weeks 1–4.
- [x] Add structured bilingual lessons for all 24 core weeks (26 lesson IDs: Week 1 splits web fundamentals and HTML; Week 8 splits async/Fetch and Git).
- [x] Add tests for schema invariants, bilingual lesson structure, curriculum order, repository lookups and walkthrough line references.
- [x] Add a full-course EN/RU block-structure and knowledge-check presence invariant.
- [x] Run a static audit of 26 bilingual lesson pairs for block identity, walkthrough ranges, quiz answer structure, and practice completeness (`CONTENT_AUDIT.md`).
- [x] Map all 25 legacy HTML files to existing canonical lesson IDs where available, and explicitly record TBD destinations for future supplementary content (`LEGACY_CONTENT_INVENTORY.md`).
- [x] Add a content editorial/review/publishing checklist and workflow (`EDITORIAL_REVIEW_CHECKLIST.md`).
- Acceptance: content loads only through schema validation, canonical ordering is stable, and CI validates content invariants.

## Phase 2 — Application UI and locale routing
- [x] Add locale-aware structured lesson routes.
- [x] Add reusable React block renderers and lesson TOC.
- [x] Add EN/RU switch preserving the current stable lesson ID.
- [x] Add curriculum-ordered previous/next navigation between available structured lessons.
- [x] Integrate structured lessons into localized catalog/search results and preserve locale in reader routes.
- [x] Add explicit self-attested completion controls, separate from practice evidence/mastery.
- [ ] Finish localizing the whole application shell and all remaining legacy pages; structured catalog/search/reader strings are localized and tested.
- [ ] Consolidate legacy styling into a consistent application design system.
- [ ] Verify keyboard access, contrast, reflow, reduced motion and screen-reader behavior.
- Acceptance: the entire app is consistent and accessible at mobile sizes in both locales.

## Phase 3 — Structured lesson reader and evidence
- [x] Render typed blocks: prose, headings, lists, callouts, code, walkthroughs, checks, practice and references.
- [x] Add option-specific feedback and resettable knowledge checks.
- [x] Add sandboxed HTML preview.
- [x] Persist structured quiz attempts, code drafts and self-review checklists locally.
- [x] Validate code-walkthrough line references against sample length.
- [x] Persist completed lesson sections with a version-tolerant schema; test preservation during draft reset and backup merge.
- [ ] Add a richer review queue.
- [x] Add a disposable Web Worker runner for ordinary JavaScript exercises with a 1.5-second hard-stop timeout, source/output limits, common network-capability blocking, actual async-snippet execution coverage and tests.
- [ ] Evaluate separate execution support for TypeScript/TSX and DOM-dependent lessons; shell and real network workflows continue in the learner's own project.
- Note: the Worker runner is a learning aid, not a hardened security boundary for hostile code; the UI displays this limitation explicitly.
- [ ] Add stronger coding-practice evidence; do not confuse a checklist tick with validated correctness.
- [ ] Add explicit “retry/review” UX for weak quiz areas.
- Acceptance: exercises are accessible and testable; mastery requires evidence beyond visiting a page.

## Phase 4 — Content migration
- [x] Build a first-pass inventory of 25 legacy HTML files and likely syllabus mappings.
- [x] Create an initial Week 1 pilot and add structured Week 2–4 content in both locales.
- [ ] Fully audit each HTML file including paragraphs, code, diagrams, hidden answers, links and interactions. `internet-fundamentals.html` has a heading-level coverage map; paragraph/example/interaction parity remains open.
- [ ] Review and fact-check the new Week 1 web fundamentals and Week 8 async/Fetch/Git lessons, including EN/RU equivalence.
- [ ] Apply the editorial checklist to every lesson pair before changing `status: review`.
- [ ] Review source accuracy and translation parity for the four pilots.
- [x] Create structured bilingual content for the complete 24-week core syllabus.
- [ ] Review each mapped legacy HTML source line-by-line and reconcile it against the replacement lesson; implementation is not proof of source parity.
- [ ] Keep all source HTML until both locales of its replacement pass review.
- All 24 core weeks now have structured bilingual content (26 lesson IDs). A static audit found no structural errors in the 52 EN/RU lesson files; this is not a substitute for semantic/source parity review. All lessons remain in `review` status.
- Acceptance: a topic is only marked migrated when source checks, language parity, navigation, code and exercises pass.

## Phase 5 — Local-first persistence
- [x] Add local storage for structured quiz attempt history, code drafts and practice checklist state.
- [x] Add validated local-data export/import with preview, merge rules and best-effort rollback (`src/features/data-portability/backup.ts`, Data Management page, tests).
- [x] Add an explicit raw-v1 to versioned-v2 migration for structured learning state, preserving old records until the new copy has been written; keep backup export/import payload format stable.
- [ ] Preserve existing progress, notes, bookmarks and old quiz results through data-shape changes.
- [x] Surface localStorage write/removal failures with a localized warning and tests.
- [x] Add a localized storage warning that distinguishes read/write/remove failures and a user-triggered retry that re-writes current in-memory progress, bookmarks, notes, quiz results and structured learning state after write failures.
- [ ] Add migrations for other persisted stores when their data schemas change; the current explicit v1→v2 migration is scoped to structured learning.
- Acceptance: upgrades cannot silently reset existing learner data.

## Phase 6 — Supabase auth and sync
- [ ] Finalize ownership of a dedicated Supabase project before using any existing project.
- [ ] Review cost and obtain explicit approval if a new billable project is needed.
- [ ] Add SQL migrations, Auth, RLS and per-user data access.
- [ ] Keep a no-cloud mode and local-first use.
- [ ] Implement sync status, retry, deterministic conflict rules, export/delete and account switching.
- [ ] Test cross-user isolation and security behavior.
- Acceptance: users cannot access each other's data and learning works without Supabase configuration.

## Phase 7 — PWA and deployment
- [x] Add app manifest, SVG icons and service worker registration.
- [x] Add basic offline banner, install prompt and safe manual update activation.
- [x] Add explicit cache exclusions for private/dynamic API routes.
- [ ] Verify actual installability and offline behavior on supported devices/browsers.
- [ ] Test service-worker update lifecycle, quota failure and cached/deep lesson routes on a deployed URL.
- [ ] Confirm manifest, service-worker scope and hosting base path agree.
- [ ] Add production deployment and post-deploy smoke checks.
- Acceptance: installability and documented offline scenarios pass on real supported devices.

## Phase 8 — Capstone and release readiness
- [ ] Build a capstone learning path with requirements, user stories, architecture, implementation, tests and deployment.
- [ ] Check all learning outcomes against the supplied bootcamp syllabus.
- [ ] Audit keyboard support, contrast, mobile, broken links, performance and stale content.
- [ ] Update user README, authoring guide, screenshots and learner-data portability docs.
- Acceptance: a new learner can complete the core path in either language and return without losing progress.

## Commit style

- `docs: ...`
- `feat(scope): ...`
- `fix(scope): ...`
- `refactor(scope): ...`
- `test(scope): ...`
- `content(scope): ...`
- `ci(scope): ...`

One commit should describe one logical change. Avoid vague messages and huge commits mixing UI, content, storage, security and tooling.
