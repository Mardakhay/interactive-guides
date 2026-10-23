# Implementation Roadmap

Follow this sequence. Each phase should land as a small reviewed change; avoid one giant rewrite.

## Phase 0 — Baseline and safeguards
- [ ] Create working branch `feat/learning-platform-foundation`.
- [ ] Run and record `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- [x] Confirm default branch/CI behavior and inspect the existing user-data contracts.
- [x] Add documentation and maintain this handoff.
- Acceptance: baseline is known, current `main` remains intact, clean rollback path exists.
- Suggested commit: `docs: document platform redesign and migration plan`

## Phase 1 — Requirements, schemas and curriculum
- [x] Confirm the structured curriculum route/content/localization contract; app-wide localization remains a separate unfinished phase.
- [x] Define and validate schemas for curriculum, lesson translations and content blocks.
- [x] Map registered core and supplementary lesson IDs to the 24-week syllabus or a separately labeled track; source-content parity is tracked separately.
- [x] Add automated schema, repository, curriculum and locale checks for required fields, IDs/order, references and answer keys.
- [x] Create bilingual structured lessons and a React authoring/rendering path; source parity and editorial approval remain open.
- Acceptance: the curriculum can be loaded without an HTML manifest; content validation runs in CI.
- Suggested commits:
  - `feat(content): add typed bilingual lesson schemas`
  - `feat(curriculum): model the six-month bootcamp track`
  - `test(content): validate lesson links and translation parity`

## Phase 2 — Application UI and locale routing
- [ ] Establish design tokens, reusable layout primitives and typography/code components.
- [ ] Add `en`/`ru` route-aware language selection and localized UI dictionaries.
- [ ] Update dashboard/course/module/lesson flows to use curriculum order.
- [ ] Refine mobile navigation, reading layout and error/empty/loading states.
- Acceptance: every route is consistent and keyboard/touch usable at mobile widths.
- Suggested commits:
  - `feat(i18n): add English and Russian locale routing`
  - `refactor(ui): unify application design tokens and lesson reader`
  - `feat(curriculum): navigate modules and lessons in syllabus order`

## Phase 3 — Structured lesson reader
- [ ] Build typed React renderers for content blocks.
- [ ] Add section table of contents, reading progress and accessible code blocks.
- [ ] Implement knowledge-check feedback per answer.
- [ ] Implement practice task UX, attempt capture and hint/solution policies.
- [ ] Gate “mastered” status on required practice evidence where specified.
- Acceptance: lesson pages render without independent HTML documents; exercises remain testable and accessible.
- Suggested commits:
  - `feat(lesson-reader): render structured lesson blocks`
  - `feat(practice): capture quiz and coding attempts`
  - `feat(progress): separate completion from demonstrated mastery`

## Phase 4 — Content migration
- [ ] Build a migration inventory from all 25 current HTML files.
- [ ] Extract and rewrite one pilot topic; validate the translation and content depth.
- [ ] Run source/technical review and update the pilot in both locales.
- [ ] Migrate the remaining lessons in small topic batches in syllabus order.
- [ ] Keep all legacy HTML until replacements are reviewed and regression checked.
- Acceptance: no lesson is labelled migrated until both locales, exercises and source links pass review.
- Suggested commits:
  - `content(html): migrate semantic HTML and forms lessons`
  - `content(css): migrate layout and responsive design lessons`
  - `content(javascript): migrate core language lesson series`
  - `content(react): migrate component and hooks lessons`
  - `content(tooling): migrate Git, package and deployment lessons`

## Phase 5 — Local-first data foundations
- [ ] Introduce versioned local repositories and explicit migration/export behavior.
- [ ] Migrate existing progress, notes, bookmarks and quiz data without silent loss.
- [ ] Add tests for malformed state, storage unavailable and migration retry.
- Acceptance: existing saved state survives update or export/import recovery.
- Suggested commit: `refactor(storage): add versioned local repositories`

## Phase 6 — Supabase auth and sync
- [ ] Create SQL migrations and RLS policies.
- [ ] Add environment validation and a no-cloud mode.
- [ ] Implement auth screens, session handling, repository adapters and sync states.
- [ ] Design and test local/cloud conflict reconciliation.
- [ ] Verify cross-user isolation and account cleanup.
- Acceptance: two users cannot read or modify each other's data; local learning works without Supabase settings.
- Suggested commits:
  - `feat(auth): add Supabase session integration`
  - `feat(sync): sync progress notes and bookmarks`
  - `test(security): verify RLS and user data isolation`

## Phase 7 — PWA and deployment
- [ ] Add icons and web app manifest.
- [ ] Add service worker with documented cache/update lifecycle.
- [ ] Configure production environment and hosting/deep-link routing.
- [ ] Add deployment workflow and post-deploy smoke checks.
- Acceptance: installable app and documented offline scenarios pass on supported devices.
- Suggested commits:
  - `feat(pwa): add installable app shell and offline lesson cache`
  - `ci(deploy): automate production build and deployment checks`

## Phase 8 — Capstone and release readiness
- [ ] Build capstone-like guided project path with requirements, user stories, architecture, implementation, tests and deployment.
- [ ] Review all learning outcomes against syllabus.
- [ ] Audit keyboard access, contrast, mobile, bundle size, broken links and stale content.
- [ ] Update project README, screenshots and contributor/content authoring guide.
- Acceptance: complete learning path is usable from a fresh browser, bilingual coverage is measured, and release notes describe limitations honestly.
- Suggested commits:
  - `feat(curriculum): add frontend capstone learning path`
  - `test(e2e): cover core learning and account flows`
  - `docs: document authoring deployment and learner data portability`

## Commit style

Use short, scoped Conventional Commit-style messages:
- `docs: ...`
- `feat(scope): ...`
- `fix(scope): ...`
- `refactor(scope): ...`
- `test(scope): ...`
- `content(scope): ...`
- `ci(scope): ...`

One commit should express one logical change. Avoid `update files`, `fix`, or huge commits mixing content, UI, schema and cloud changes.

## Content migration checkpoint — 2026-10-23

The broad source inventory is reconciled (21 fetched Notion pages, 25 HTML files), but full source review and parity are not complete: two HTML pages were fully reviewed in the previous pass, one additional API lesson received a focused factual review, and remaining HTML body/code/exercises still need review. Structured EN/RU migration, curriculum registration, and runtime access for supplementary SQL/hosting JSON remain outstanding. Continue with source-by-source extraction and bilingual lesson work; do not mark curriculum/content migration complete based on the inventory document alone.


## Delivery checkpoint — 2026-10-23

The branch now has the structured bilingual curriculum repository, learner-facing curriculum index and lesson routes, 26 core lesson IDs / 52 locale files, and 11 registered supplementary IDs / 22 locale files. This supersedes roadmap statements that the schema, route, and pilot were entirely unimplemented. Legacy lessons are still retained as sources.

Remaining work is substantive: finish full review of all 25 HTML files and accessible Notion course pages; replace stale mapping/status entries with current canonical IDs and block-level evidence; verify explanations, code, edge cases, practice/feedback, and EN/RU parity; close or explicitly defer uncovered themes; run all validations on the exact final feature SHA. No source is “fully migrated” just because a lesson ID exists. Latest CI after the route/test change is being verified; see the handoff for its exact result before claiming green.


**Validation note (2026-10-23):** clean-clone checks at `132636c4007141454a903e815d6f0418a3c511b0` passed lint, typecheck, 92 tests, production build, and `git diff --check`. GitHub Actions has not reported a run for the API-created latest head; record CI separately once a workflow run is available. Full source reading/parity remains a required open item.


**CI update (2026-10-23):** [Run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed all configured checks on `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6`. This closes the exact-head CI validation checkpoint for that commit, not the source-audit or editorial-review work.


**Latest CI:** [Run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056) passed on `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5`. The source-to-lesson audit and editorial review remain open.

## Authoritative implementation status — 2026-10-23

The checked tasks above reflect the technical foundation where verified. They do not mean editorial review or all product phases are complete.

| Phase | Status | Evidence and remaining work |
|---|---|---|
| 0. Baseline and safeguards | Complete for remote checkpoint | Feature branch exists and exact-head GitHub Actions run #39976179595 passes. Main remains unchanged. Local clone unavailable in the current environment. |
| 1. Schemas and curriculum | Technical foundation implemented | Zod schemas, bilingual curriculum, supplementary tracks and repository checks exist. Source parity is tracked separately. |
| 2. App UI and localization | Partial | Structured routes support EN/RU. The legacy shell and all application pages are not consistently localized/refined. |
| 3. Structured lesson reader | Implemented foundation; mastery policy partial | React renderer, curriculum index, knowledge checks, practice, store/persistence and tests exist. Do not equate completion flags with mastery. |
| 4. Content migration and parity | In progress; not complete | 26 core and 11 supplementary IDs are registered in both locales. All 25 legacy HTML sources remain. Most source concepts, code, exercises, answers and interactions still need full mapping/review. |
| 5. Local-first persistence | Partial | Legacy stores and structured learning persistence exist. Cross-feature migration, export/import and preservation of all old records need further verification/implementation. |
| 6. Supabase authentication/sync | Not started | Keep gated behind stable local contracts, RLS design and explicit project/cost checks. |
| 7. PWA and deployment | Not implemented/verified | Current feature tree lacks public/manifest.webmanifest and public/sw.js; no manifest link or service-worker registration was found. Implement and test this phase. |
| 8. Capstone and release readiness | Partial | Four bilingual capstone-stage lessons are registered; source audit, app-wide accessibility/localization, PWA tests and release acceptance remain. |

### Exact-head validation
- Branch: feat/learning-platform-foundation
- SHA: 9c51012aff7631fc12b1dd5af0b74b7de9b28691
- Actions: run #39976179595 passed npm ci, lint, typecheck, tests and build: https://github.com/Mardakhay/interactive-guides/actions/runs/39976179595
- Merge recovery: d47d96cb1b471468e9687ab923744ce9ec248a99; bilingual SQL schema fix: 9c51012aff7631fc12b1dd5af0b74b7de9b28691.

### Next priority
Continue source-to-block parity in small syllabus-ordered batches. Record uncovered examples, exercises, answer interactions and English/Russian mismatches. Then prioritize app-wide localization and the missing PWA foundation. Keep lessons in review until editorial criteria are met.
