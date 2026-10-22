# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)  
**Latest verified implementation checkpoint:** `ab64fcbb54f00a0bbd302da3061bd9aa1936f211`

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

## Static content audit

See `docs/CONTENT_AUDIT.md` for the inspected 26 lesson IDs and the exact scope/limitations. A successful structural audit is not editorial approval.

## CI verification

GitHub Actions run [#203](https://github.com/Mardakhay/interactive-guides/actions/runs/39787357810) passed for exact implementation/test checkpoint SHA `ab64fcbb54f00a0bbd302da3061bd9aa1936f211`: `npm ci`, ESLint, TypeScript typecheck, all tests (including the Worker execution regression test), and production build succeeded. Any later code commit needs its own exact-SHA check.

## Next actions

1. Use `docs/EDITORIAL_REVIEW_CHECKLIST.md` to review content quality, source accuracy, code, references and EN/RU parity. All 26 pairs remain in `review` status until this is done.
2. Continue the full source-by-source audit of the 25 legacy HTML files; `docs/LEGACY_CONTENT_INVENTORY.md` now maps known destinations and explicitly marks supplementary IDs that still need definition.
4. Run an end-to-end locale sweep and consolidate the design system across legacy pages; test keyboard access, narrow viewports, contrast, focus states and reduced motion.
5. Test Worker execution under the actual deployed hosting/CSP environment and keep the non-hardened-runner limitation visible.
6. Exercise the structured-learning v1→v2 migration, backup merge and Retry save path against quota/storage errors in a real browser; add migrations for other stores when their schemas change.
7. Test PWA install/offline behavior on supported browsers/devices, including direct routes, offline lessons, service-worker update and cache quota behavior.
8. Decide on dedicated Supabase ownership/cost only after local contracts stabilize and the user explicitly approves the plan.
9. Keep PR #1 in draft until editorial review, tests and release acceptance criteria are satisfied.

## Commit conventions

Use focused messages such as `feat(playground): add disposable worker runner`, `feat(i18n): localize remaining app shell`, `test(content): ...`, `content(javascript): ...`, and `docs: ...`.
