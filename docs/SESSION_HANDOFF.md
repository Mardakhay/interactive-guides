# Session Handoff

**Last updated:** 2026-10-23  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)  
**Latest verified implementation/content checkpoint:** `5a0264c658ad9e67988e24bc3d85cc1491c3ddfd`

## Project goal

Rebuild Interactive Guides as a cohesive English/Russian, mobile-first, PWA-ready learning platform based on the supplied ABB six-month / 24-week frontend syllabus, the user's Notion learning notes, verified primary documentation, and valuable existing code. Content should be deep but understandable: mental models, step-by-step mechanisms, worked examples, misconceptions, knowledge checks with feedback, and meaningful independent coding practice. Reading or clicking “complete” is not proof of mastery.

## Verified architecture and content status

- Stack: React 18, TypeScript, Vite 5, Tailwind CSS, React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions.
- The core curriculum has 26 lesson IDs with EN/RU translations (52 locale files). The repository also registers two supplementary lesson IDs — `network.dns-tcp-tls` and `browser.rendering-pipeline` — with both translations, for 28 stable IDs / 56 locale files registered overall. Supplementary lessons remain outside core-week navigation. Week 1 splits Internet/HTTP and HTML; Week 8 splits async/Fetch and Git.
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

See `docs/CONTENT_AUDIT.md` for the structural audit of the 26 core lesson IDs and its exact scope/limitations. The two supplementary lesson pairs are registered and schema-validated separately. A successful structural audit is not editorial approval.

## Recovery and source-parity work — 2026-10-23

- Fixed the malformed tail of `src/content/repository.ts` by removing an orphaned duplicate navigation block; the valid locale-aware adjacent-lesson implementation remains. [Commit](https://github.com/Mardakhay/interactive-guides/commit/73fb9199690b4bdb8198e3ba42976d201d1a780f).
- Made registry and navigation tests derive expectations from canonical EN/RU curricula; corrected the supplementary-track duplicate test so it duplicates a populated track. [Commit](https://github.com/Mardakhay/interactive-guides/commit/b074e73213f66f849e5b7a76830be53baf275906).
- Compared Week 14 against Notion Part 4 §§ 4.5–4.7 and `public/lessons/react-forms-tutorial.html`. Added a multi-field `name` handler walkthrough, native constraints, validation timing, complete React Hook Form flow, common-mistake list, ten knowledge checks, and five scaffolded coding exercises.
- Compared Week 15 against Notion Part 4 §§ 4.8–4.14 and the state-related portions of `public/lessons/react-ecosystem-course.html`. Added the distinction between custom Hook reuse and shared state, a source-derived BookClub reducer walkthrough/project, and expanded the state-tool selection guide. Do not copy the legacy page's React Router examples verbatim because the source and application use different major versions.
- Added `docs/CONTENT_PARITY_REVIEW_WEEK14-15.md`, corrected source destinations in `docs/LEGACY_CONTENT_INVENTORY.md`, and updated `docs/CURRICULUM_AND_CONTENT.md`, `docs/CURRENT_STATE.md`, and `docs/ROADMAP.md`. The parity report records what has been mapped and which interactions were translated into the structured block system rather than reproduced one-to-one.
- Week 14 has 48 blocks, ten knowledge checks and five coding exercises in each locale. Week 15 has 34 blocks, six knowledge checks and two exercises in each locale. Ordered EN/RU block IDs/types and walkthrough line ranges were validated before commit.
- Both pairs remain `review`, not `published`. The lesson authoring UI does not compile TSX, React Hook Form was not added as an app dependency, and these examples still need execution/review in a real React project. The original HTML sources remain in place.

## CI verification

- GitHub Actions [run #217](https://github.com/Mardakhay/interactive-guides/actions/runs/39911961311) passed on exact code/content/test checkpoint `5a0264c658ad9e67988e24bc3d85cc1491c3ddfd`: `npm ci`, ESLint, TypeScript typecheck, the full test suite and production build all succeeded.
- GitHub Actions [run #218](https://github.com/Mardakhay/interactive-guides/actions/runs/39912113116) passed on source-parity documentation checkpoint `ab076ca8b59c3e48843f4b6882931a75ab1eab13`: install, lint, typecheck, full tests and production build all succeeded.
- The earlier content-only run failed because two lesson tests still expected exactly three quiz questions. The tests now correctly expect ten for Week 14 and six for Week 15. The current checkpoint's complete suite passes.
- These are GitHub-hosted checks. No local checkout, physical-browser/device acceptance test, or real React/TSX example execution was performed in this session.

## Next actions

1. Human-review Week 14 and Week 15 against `docs/CONTENT_PARITY_REVIEW_WEEK14-15.md`, execute/review the new TSX examples in a real React project, and continue the source-based EN/RU review. All lesson pairs remain in `review` status.
2. Reconcile all 25 legacy HTML files against their structured replacements; retain source files until both locales have been reviewed.
3. Complete an end-to-end locale sweep and consolidate design-system styling across routes; test keyboard access, narrow viewports, contrast, focus states and reduced motion.
4. Test Worker execution under the deployed hosting/CSP environment while preserving the warning that it is not hardened for hostile code.
5. Exercise the structured-learning v1→v2 migration, backup merge and Retry save path against real browser storage/quota failures.
6. Test PWA installation and offline behavior on supported browsers/devices, including deep routes, cached lessons, service-worker updates and cache quota behavior.
7. Decide on dedicated Supabase ownership/cost only after local contracts stabilize and the user explicitly approves the plan.
8. Keep PR #1 in draft until editorial review and release acceptance criteria are satisfied.

## Commit conventions

Use focused messages such as `feat(playground): add disposable worker runner`, `feat(i18n): localize remaining app shell`, `test(content): ...`, `content(javascript): ...`, and `docs: ...`.
