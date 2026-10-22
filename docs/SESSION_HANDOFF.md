# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)  
**Checkpoint before this documentation refresh:** `d8676ba3b4813ea8d9e9483f0436704e53a9a42a`

## Project goal

Rebuild Interactive Guides as a cohesive English/Russian, mobile-first, PWA-ready learning platform based on the supplied ABB six-month / 24-week frontend syllabus, the user's Notion learning notes, verified primary documentation, and valuable existing code. Content should be deep but understandable: mental models, step-by-step mechanisms, worked examples, misconceptions, knowledge checks with feedback, and meaningful independent coding practice. Reading or clicking “complete” is not proof of mastery.

## Verified architecture and content status

- Stack: React 18, TypeScript, Vite 5, Tailwind CSS, React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions.
- Structured content has all 26 core lesson IDs in both EN and RU: 52 JSON locale files covering the six-month/24-week syllabus. Week 1 splits Internet/HTTP and HTML; Week 8 splits async/Fetch and Git.
- Content is served by Zod-validated JSON from `src/content/lessons/<lesson-id>/<locale>.json`, with shared schema validation and a canonical curriculum in `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`.
- `src/content/repository.ts` registers the structured lessons and provides curriculum lookup/adjacent lesson navigation.
- `src/features/structured-lesson/StructuredLessonRenderer.tsx` renders lesson blocks. `src/app/pages/StructuredLessonPage.tsx` provides the structured lesson page with locale switching, curriculum navigation, and completion control.
- All structured lessons are in editorial `review` status, not published/approved.
- Static content audit found no block-ID duplicates, EN/RU ordered block-shape mismatches, invalid walkthrough line ranges, bad single-answer counts, duplicate quiz-option IDs, or incomplete practice task scaffolds in the 52 files. Full semantic/source parity is still unreviewed; see `docs/CONTENT_AUDIT.md`.

## Practice execution: current limitation

- Coding exercises persist drafts and self-review checklist state locally; quiz attempts are tracked separately.
- HTML preview exists and runs in an iframe with scripts disabled.
- **There is no JavaScript/TypeScript execution runner in the current source tree.** Coding examples and starter code must be run in the learner's own project/environment. Do not describe JS/TS exercises as executed or automatically graded.
- Next runner design should prioritize a real hard-stop mechanism for runaway synchronous code (e.g. a disposable Worker for pure JS), explicit restrictions on outbound network/capabilities, clear timeout/output limits, tests, and a truthful security note. A parent-page timeout around synchronous iframe code is not sufficient to guarantee the page remains responsive.

## Progress and data portability

- Existing progress, notes, bookmarks and quiz-result stores remain in place.
- Structured learner state stores quiz attempt history, code drafts, practice-review checklists, and completed lesson-section IDs.
- The section progress schema defaults missing `sectionProgress` for older v1 records, and tests cover section-state preservation through draft reset and backup merge.
- `src/features/data-portability/backup.ts` and the Data Management page provide validated JSON backup export/import with merge rules, including progress, notes, bookmarks, quiz results, structured attempts/drafts/checklists and selected preferences.
- Storage write/removal failures are surfaced with a localized warning; explicit version-to-version migration and user-triggered retry/recovery still need work.
- Cloud sync, Supabase Auth/RLS and cross-device synchronization are not implemented.

## PWA and UI

- Manifest, SVG icons, service worker registration, basic cache behavior, install/update UI, and offline status UI exist.
- No real Android/iOS install/offline acceptance test has been completed.
- The structured reader has localization, but the entire legacy app shell and all old content still need localization/design consolidation/accessibility review.

## Static content audit

See `docs/CONTENT_AUDIT.md` for the inspected 26 lesson IDs and the exact scope/limitations. A successful structural audit is not editorial approval.

## CI verification

GitHub Actions run [#185](https://github.com/Mardakhay/interactive-guides/actions/runs/39778390430) passed for checkpoint SHA `d8676ba3b4813ea8d9e9483f0436704e53a9a42a`: `npm ci`, lint, TypeScript typecheck, tests and production build all succeeded. This documentation update will produce a new SHA; verify that SHA before claiming it is green.

## Next actions

1. Implement the JS practice runner in a separate, tightly scoped change with hard termination, network restrictions, UI states, and tests; be honest about browser sandbox limits.
2. Localize the remaining app shell and consolidate the design system across legacy pages; test keyboard access, narrow viewports and reduced-motion behavior.
3. Work through `docs/CONTENT_AUDIT.md` against Notion and legacy HTML sources, verifying claims, links, code and translation parity lesson by lesson.
4. Add explicit local storage migrations and a user-triggered recovery/retry flow; preserve old progress, notes, bookmarks and quiz results.
5. Test the PWA on supported browsers/devices, including deep routes, offline lessons, service-worker update and cache quota behavior.
6. Decide on a dedicated Supabase project and any cost only after local data contracts stabilize and the user explicitly approves the plan.
7. Keep PR #1 in draft until editorial review, tests and release acceptance criteria are satisfied.

## Commit conventions

Use focused messages such as `feat(playground): add disposable worker runner`, `feat(i18n): localize remaining app shell`, `test(content): ...`, `content(javascript): ...`, and `docs: ...`.
