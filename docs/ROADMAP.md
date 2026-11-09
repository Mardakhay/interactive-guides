# Implementation Roadmap

Use small, reversible phases; keep useful current behavior working while migration proceeds.

## Phase 0 — Baseline and safeguards
- [x] Create working branch `feat/learning-platform-foundation`.
- [x] Establish a draft PR to run repository CI.
- [x] Run baseline-quality checks through GitHub Actions for the first vertical slice.
- [x] Record the current storage/content architecture and preserve `main` history.
- [ ] Check out locally and capture independent `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` results if/when local access is available.
- Acceptance: working branch is reversible, the new content contract is checked in CI, and the current main branch remains untouched by feature implementation.
- Commit style: `docs: document platform redesign and migration plan`

## Phase 1 — Requirements, schemas and curriculum
- [x] Define typed lesson translation and content-block schemas.
- [x] Define a canonical 6-month / 24-week syllabus representation with explicit supplementary tracks.
- [x] Add a representative English/Russian HTML lesson with metadata, theory, code walkthrough, knowledge checks, coding practice and official references.
- [x] Add tests for schema invariants, stable cross-locale IDs, curriculum ordering and the structured renderer.
- [ ] Map every legacy lesson to the curriculum or a clearly labelled supplementary track.
- [ ] Complete the content-author review checklist and publish workflow.
- Acceptance: all lesson content loads through schema validation, curriculum order is canonical and CI validates the content contract.

## Phase 2 — Application UI and locale routing
- [x] Add locale-aware route for structured lessons.
- [x] Add shared React block renderers for the pilot content types.
- [x] Add language switching and dashboard entry points for the pilot.
- [ ] Localize the whole application shell and all existing routes.
- [ ] Establish design tokens, reusable layout primitives and typography/code components consistently across old and new UI.
- [ ] Validate mobile reading, keyboard support, contrast and reduced motion.
- Acceptance: the complete app is consistent and keyboard/touch usable at mobile sizes in both locales.

## Phase 3 — Structured lesson reader and evidence
- [x] Render headings, prose, lists, callouts, code, code walkthroughs, knowledge checks, coding tasks and references.
- [x] Add per-option feedback and resettable quiz checks.
- [x] Add isolated HTML preview for HTML coding practice with scripts disabled.
- [ ] Persist per-lesson quiz attempts and code drafts.
- [ ] Add exercise completion evidence and separate it from read/lesson status.
- [ ] Add responsive table of contents and more robust error/empty states.
- Acceptance: exercises remain accessible and testable; “mastery” reflects evidence rather than opening a lesson.

## Phase 4 — Content migration
- [ ] Audit each of the 25 legacy HTML files fully, including code examples, diagrams, quizzes, hidden answers, links and interactions.
- [ ] Migrate one pilot through technical review and translation review (initial Week 1 pilot is under review).
- [ ] Migrate remaining content in syllabus order; split large HTML files when they teach multiple different concepts.
- [ ] Keep all source HTML files until replacements in both locales pass content and regression validation.
- Acceptance: no topic is labelled migrated until content, language parity, source checks, navigation, examples and exercises pass.

## Phase 5 — Local-first persistence
- [ ] Add a versioned storage format and explicit migration/export behavior.
- [ ] Preserve existing progress, notes, bookmarks and quiz results during schema changes.
- [ ] Add handling for malformed state, storage quota, unavailable storage and migration retry.
- Acceptance: upgrading never silently resets existing learner data.

## Phase 6 — Supabase auth and sync
- [ ] Finalize ownership of a dedicated Supabase project before using any existing project.
- [ ] Quote project cost and obtain explicit approval if creating a new billable project.
- [ ] Add SQL migrations, Auth integration and RLS policies.
- [ ] Add environment validation and a no-cloud mode.
- [ ] Implement account restore, sync status, retry and a tested local/cloud conflict policy.
- [ ] Verify cross-user data isolation, sign-out, account switching, export and deletion.
- Acceptance: users cannot access one another's data and the app remains useful without Supabase configuration.

## Phase 7 — PWA and deployment
- [ ] Add web app manifest and production-quality icons.
- [ ] Add service worker with explicit cache, update and offline strategy.
- [ ] Configure production hosting and SPA deep-link routing.
- [ ] Add deployment checks and smoke tests.
- Acceptance: installability and documented offline scenarios work on supported devices.

## Phase 8 — Capstone and release readiness
- [ ] Build a capstone learning path that covers requirements, user stories, architecture, implementation, tests and deployment.
- [ ] Check all learning outcomes against the bootcamp syllabus.
- [ ] Audit keyboard support, contrast, mobile, broken links, performance and stale content.
- [ ] Update README, authoring guide, screenshots and learner-data portability docs.
- Acceptance: a new learner can follow the path in either language and return later without losing progress.

## Commit style

- `docs: ...`
- `feat(scope): ...`
- `fix(scope): ...`
- `refactor(scope): ...`
- `test(scope): ...`
- `content(scope): ...`
- `ci(scope): ...`

One commit should describe one logical change. Avoid vague messages and huge commits mixing UI, content, storage, security and tooling.
