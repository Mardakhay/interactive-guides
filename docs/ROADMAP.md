# Implementation Roadmap

Use small, reversible phases; keep useful current behavior working while migration proceeds.

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
- [x] Add structured Week 5 JavaScript basics lesson (pending exact latest CI validation at handoff time).
- [x] Add tests for schema invariants, stable translation block structure, curriculum order, repository lookups and walkthrough line references.
- [ ] Map all legacy lesson files to exact curriculum/sub-track lesson IDs.
- [ ] Add a content editorial/review/publishing checklist and workflow.
- Acceptance: content loads only through schema validation, canonical ordering is stable, and CI validates content invariants.

## Phase 2 — Application UI and locale routing
- [x] Add locale-aware structured lesson routes.
- [x] Add reusable React block renderers and lesson TOC.
- [x] Add EN/RU switch preserving the current stable lesson ID.
- [x] Add curriculum-ordered previous/next navigation between available structured lessons.
- [x] Add explicit self-attested completion controls, separate from practice evidence/mastery.
- [ ] Localize the whole application shell and all legacy pages.
- [ ] Consolidate legacy styling into a consistent application design system.
- [ ] Verify keyboard access, contrast, reflow, reduced motion and screen-reader behavior.
- Acceptance: the entire app is consistent and accessible at mobile sizes in both locales.

## Phase 3 — Structured lesson reader and evidence
- [x] Render typed blocks: prose, headings, lists, callouts, code, walkthroughs, checks, practice and references.
- [x] Add option-specific feedback and resettable knowledge checks.
- [x] Add sandboxed HTML preview.
- [x] Persist structured quiz attempts, code drafts and self-review checklists locally.
- [x] Validate code-walkthrough line references against sample length.
- [ ] Persist section completion and a richer review queue.
- [ ] Add stronger coding-practice evidence; do not confuse a checklist tick with validated correctness.
- [ ] Add explicit “retry/review” UX for weak quiz areas.
- Acceptance: exercises are accessible and testable; mastery requires evidence beyond visiting a page.

## Phase 4 — Content migration
- [x] Build a first-pass inventory of 25 legacy HTML files and likely syllabus mappings.
- [x] Create an initial Week 1 pilot and add structured Week 2–4 content in both locales.
- [ ] Fully audit each HTML file including headings, code, diagrams, hidden answers, links and interactions.
- [ ] Review and fact-check the new Week 8 async/Fetch and Git lessons, including EN/RU equivalence.
- [ ] Review source accuracy and translation parity for the four pilots.
- [ ] Migrate remaining topics incrementally in syllabus order, splitting large HTML files where appropriate.
- [ ] Keep all source HTML until both locales of its replacement pass review.
- Week 1–5 structured pilot lesson records now exist. Editorial review and complete legacy-source parity checks remain pending.
- Acceptance: a topic is only marked migrated when source checks, language parity, navigation, code and exercises pass.

## Phase 5 — Local-first persistence
- [x] Add local storage for structured quiz attempt history, code drafts and practice checklist state.
- [ ] Add versioned storage migrations and an export/import backup path.
- [ ] Preserve existing progress, notes, bookmarks and old quiz results through data-shape changes.
- [ ] Handle storage quota failures visibly and test retry/recovery.
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
