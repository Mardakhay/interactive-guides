# Implementation Roadmap

Follow this sequence. Each phase should land as a small reviewed change; avoid one giant rewrite.

## Phase 0 — Baseline and safeguards
- [ ] Create working branch `feat/learning-platform-foundation`.
- [ ] Run and record `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- [ ] Confirm default branch/CI behavior and existing user data formats.
- [ ] Add documentation and maintain this handoff.
- Acceptance: baseline is known, current `main` remains intact, clean rollback path exists.
- Suggested commit: `docs: document platform redesign and migration plan`

## Phase 1 — Requirements, schemas and curriculum
- [ ] Confirm route/content/localization decisions.
- [ ] Define and validate schemas for curriculum, lesson translations and content blocks.
- [ ] Map every current lesson to the syllabus or a labeled supplementary module.
- [ ] Add tests for required fields, unique IDs/orders, locale completeness, valid references and answer keys.
- [ ] Create one representative lesson in each locale to validate the authoring/rendering path.
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
