# Session Handoff

**Last updated:** 2026-10-23  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch created:** `feat/learning-platform-foundation`

## Project goal

Rebuild the existing Interactive Guides as a cohesive bilingual (English/Russian), mobile-friendly, PWA-ready learning platform based on:
1. the user's Notion learning notes and lesson-writing/learning-progress approach,
2. the supplied six-month / 24-week ABB Frontend Bootcamp syllabus,
3. carefully verified current primary documentation for web/platform topics,
4. the existing application's useful features and code.

Lessons should be deep but understandable: teach concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain mistakes, and require independent practice before treating a subject as mastered. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, package managers/build tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Verified repository facts from remote GitHub inspection

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Catalog: `src/data/lessons.json`; quiz data: `src/data/quizzes.json`.
- HTML mapping: `src/features/lesson-renderer/lessonLoader.ts`.
- Legacy content: 25 files in `public/lessons/*.html`.
- Progress store: `src/features/progress/store.ts`, backed by `localStorage`.
- Lesson viewer: `src/app/pages/LessonViewerPage.tsx`.
- Existing features include dashboard, catalog, lessons, learning paths, bookmarks, notes, search and quizzes.
- Supabase is not listed in the current `package.json` inspected in this session.
- Current CI checks lint, typecheck, tests and production build on pushes/PRs targeting `main`.

## Documentation created on main

1. `docs/README.md`
2. `docs/CURRENT_STATE.md`
3. `docs/PRODUCT_REQUIREMENTS.md`
4. `docs/ARCHITECTURE.md`
5. `docs/CURRICULUM_AND_CONTENT.md`
6. `docs/PERSISTENCE_AND_SUPABASE.md`
7. `docs/PWA_AND_MOBILE.md`
8. `docs/ROADMAP.md`
9. `docs/DECISIONS.md`
10. `docs/SESSION_HANDOFF.md`
11. `docs/LEGACY_CONTENT_INVENTORY.md`

The documentation is an audit/plan, not the completed redesign. The inventory gives a first-pass topic mapping from names and sampled content; it is not a full content review of every HTML file.

## What has and has not changed

- Added documentation files with focused commits directly on `main`.
- Created `feat/learning-platform-foundation` from `main` for implementation work.
- No app source, HTML lesson, package manifest, CI workflow, database or Supabase project has been modified.
- Build, tests and lint were not run in a local checkout during this remote GitHub audit.
- No cloud credentials, database secrets or service-role keys were read or added.

## Exact next steps

1. Ensure branch `feat/learning-platform-foundation` includes the current documentation commits (it was created after the first docs were added; if it is behind `main`, update it with a fast-forward/merge rather than rewriting history).
2. Check out the branch in a local environment and run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; record baseline results and existing issues.
3. Audit all current lesson files in full and reconcile the inventory with exact headings, code snippets, exercises, solution toggles and sources.
4. Design the stable lesson/curriculum/block schemas and validation tests before large-scale content conversion.
5. Implement one pilot lesson in English and Russian with the new React content renderer.
6. Only after the content contract works, migrate lessons in syllabus order; preserve existing local progress/notes/bookmarks via migrations.
7. Add Supabase sync after local repository contracts are stable, then PWA behavior, deployment workflows and end-to-end coverage.

## Commit convention

Use focused Conventional Commit-style messages such as:
- `docs: document platform redesign and migration plan`
- `feat(content): add typed bilingual lesson schemas`
- `feat(i18n): add English and Russian locale routing`
- `test(content): validate lesson links and translation parity`

Do not mark planned features as implemented. After each phase, update this file with exact changes, validation evidence, unresolved questions and the next action.

## Handoff update — 2026-10-23

### Current branch and verification
- Feature branch: `feat/learning-platform-foundation`.
- Latest verified feature HEAD at handoff: `e2684ed0d4eba181f7305738f9aa87e412823424`.
- PR #1 remains an open draft targeting `main`.
- GitHub Actions run [#39922070075](https://github.com/Mardakhay/interactive-guides/actions/runs/39922070075) passed on `e2684ed0d4eba181f7305738f9aa87e412823424`: lint, typecheck, tests and build succeeded.
- `main` currently points to `b13af92576e8a73753a6e3f3d26765d9f9c44397`. Do not rewrite or force-push it as part of this work.

### GitHub Contents API incident
- Four lesson-file commits were accidentally created against the default branch because the Contents API calls omitted `branch`: `485b04221d005452c17eb6aff04fc52d82c9b082`, `2e2e2914dc32eb150fdc23681b9d959bce4d82e3`, `f447147eda20ca415cde647dabb816296456f04d`, and `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This moved `main` to the last SHA. The current PR diff includes all four lesson files, and they are retained on the feature branch.
- Going forward, make grouped changes by creating blobs/tree/commit and then update only `feat/learning-platform-foundation` with `expected_sha`; verify branch HEAD, PR head and workflow runs after each change. Do not use create_file/update_file without an explicit branch.

### Supplementary source-derived lessons present
- JavaScript runtime/memory and object prototypes.
- Frontend authentication/security.
- Deployment/hosting in EN and RU.
- SQL/PostgreSQL in EN and RU.
- Sass/SCSS, Bootstrap/MUI comparison, frontend architecture boundaries, and advanced package workflows.
- The curriculum/repository links these supplements in the bilingual content catalog. These lessons remain `review`, not `published`.

### Audit completeness — not yet finished
- Week 14/15 Notion + legacy HTML targeted comparison is documented in `docs/CONTENT_PARITY_REVIEW_WEEK14-15.md`.
- The wider set of HTML sources has a mapping, but not every file has a verified section-by-section parity audit. In particular, network/hosting details, advanced JS internals, auth-security edge cases, database/RLS topics, and specific library-version steps require itemized source review against the actual HTML and current primary documentation.
- Do not call an HTML source migrated until its headings, explanations, code samples, diagrams, exercises, answer/reveal controls, links, and key claims have been mapped to the structured destination and the EN/RU teaching coverage has been reviewed.
- Next: continue exact source-section inventory, add a source-to-block mapping report, close or explicitly defer each uncovered concept, then run CI on the resulting feature HEAD.

## Handoff — 2026-10-23

- Work is on feat/learning-platform-foundation; latest content commit is 6579f9926c57317947de2f90ddfeb66a0974b61a (content(api): clarify retry limits and safety). Do not use GitHub Contents writes without branch=feat/learning-platform-foundation and an exact current content SHA.
- Four supplementary JSON files for SQL/PostgreSQL and production hosting exist on feature, but are not wired into the app. The app still exposes 25 English legacy HTML lessons.
- Source scope: 21 Notion pages fetched (connector marks them unverified); 25 HTML files inventoried/structurally inspected. Two HTML pages were fully read in the previous pass; the API lesson received a targeted review. The other 22 HTML files still require full text/code/exercise/answer review. This is not a complete source audit or parity completion.
- Focused corrections: React Router uses installed react-router-dom 6.26.2 API; form-validation guidance separates UX from security and treats timing as contextual; API lesson clarifies retry counts/backoff safety, optional Axios, PATCH partial updates, and non-persistent demo writes.
- Before documentation-only updates, lint, typecheck, tests and production build passed; tests reported 7 files / 11 tests. Rerun on exact final HEAD. Node 25 needed an in-memory Storage test stub. npm audit reported 17 dependency vulnerabilities; review separately.
- CONTENT_AUDIT.md and CONTENT_PARITY_REVIEW_WEEK14-15.md were absent in the checkout. The source matrix lives in FULL_SOURCE_CONTENT_AUDIT.md and is the current audit record.
- Next: finish full text/code review of remaining HTML and relevant Notion pages; implement and register complete bilingual curriculum/structured lesson reader; add parity/content invariants; rerun CI on exact feature SHA. PR #1 is open/draft; verify current head and CI after documentation commits.


## Embedded lesson integration — 2026-10-23

The active feature now embeds lesson bodies for re-003, re-004, and re-005 in src/data/lessons.json. The loader uses those bodies before consulting the legacy iframe manifest; blank lessons continue to use the old HTML source during migration. The three embedded lessons cover forms/validation, API lifecycle/error handling, and React state ownership/Context/reducers with examples and practice criteria. This is a real in-app migration checkpoint, but not full completion: the remaining catalog entries are still blank/external and Russian locale content is not supported by the current app model. Full local verification (8 files / 16 tests, lint, typecheck, production build, and browser smoke tests for re-003/re-004/re-005) passed on code SHA 667c57a27bf1c64fadaa0ec9a8e6294a9128ccf7; the following commit only updates this handoff.


## Active continuation checkpoint — 2026-10-23

- Keep all work on `feat/learning-platform-foundation`; `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. PR #1 remains open/draft. Do not merge or force-push.
- Restored structured curriculum is now learner-accessible through the bilingual React route and index: 26 core IDs / 52 locale files and 11 separately listed supplements / 22 locale files. The four SQL/hosting translations are registered. This is in-app embedded text, not a request to create more standalone HTML lesson pages.
- The 2026-10-23 CI run on `26a8c7d4efe24402094f69c25678528aaa11067f` failed one curriculum-page test because Russian week count text was split into number and label nodes; lint and typecheck passed, tests had 91/92 passing, and build was skipped. The test was corrected in feature commits `6975d303ff107904baf408190755b11884bb3210` and `433855acab952074705fd0135576a31f76f104fb`; verify Actions on the exact latest SHA before reporting the fix as validated.
- Local branch is stale/diverged from the remote and must not be pushed blindly. The branch update was made using feature-only GitHub commits with expected-head checks. Reconcile any local checkout only after inspecting its diff and ancestry; never move `main`.
- Source audit remains open. 21 Notion pages were fetched (all connector results unverified); 25 HTML files were inventoried and structurally surveyed. Full prose/code/interaction review remains outstanding for most HTML sources. Week 14/15 and API received focused review; no claim of complete parity is valid yet.
- Continue by polling CI for the latest feature HEAD; fix any failing check; then update audit mappings/evidence as actual source review progresses. Keep this handoff, `CURRENT_STATE.md`, `ROADMAP.md`, and `FULL_SOURCE_CONTENT_AUDIT.md` synchronized at each material checkpoint.


## Latest verified checkpoint — 2026-10-23

- Feature branch: `feat/learning-platform-foundation`; PR #1 remains open/draft. Latest verified code commit before this documentation-only checkpoint: `132636c4007141454a903e815d6f0418a3c511b0`.
- On a clean clone of that exact SHA: `npm ci` completed; `npm run lint`, `npm run typecheck`, `npm test` (19 files, 92 tests), `npm run build`, and `git diff --check` passed. Build emits the existing Vite chunk-size warning for the structured-content repository bundle (~1.4 MB minified).
- GitHub Actions previously failed at `26a8c7d4efe24402094f69c25678528aaa11067f` due to a localized curriculum test matcher. The latest corrected test passes locally; Actions has not returned a run for the later API-created commit(s), so the latest CI check is **unconfirmed**. Do not label CI green until a run exists and passes on the exact head.
- Main was not modified in this continuation. PR base currently reports `452a0296fc875e48f1a050e5af557ef0c08f68c8`; feature head is the only target for these changes.
- Source audit remains incomplete: 21 Notion fetches (unverified), 25 HTML sources structurally surveyed; full prose/code/hidden interaction review for most HTML files remains open. See `FULL_SOURCE_CONTENT_AUDIT.md` and keep lesson editorial status at review.
- Next work: finish source-by-source HTML and Notion parity, update matrix rows with precise canonical IDs and block evidence, verify content depth/code/EN-RU parity, then obtain an actual Actions run for the resulting PR head. Do not mark the project complete yet.


### CI confirmation — 2026-10-23

GitHub Actions [run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed on exact feature HEAD `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6` (install, lint, typecheck, 92 tests, build). PR #1 remains open/draft and mergeable. This latest result supersedes the earlier “Actions unconfirmed” note above. The source audit remains incomplete; do not mark the overall project complete. Any later docs-only head needs its own exact-head workflow verification.


### Latest branch/CI status

Feature head `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5` passed GitHub Actions [run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056). PR #1 remains open, draft, and mergeable. Source review is still incomplete: source matrix targets have now been corrected to canonical IDs, but most HTML sources still need full content/interaction parity review. Keep main unchanged.

## Authoritative checkpoint — 2026-10-23 (supersedes earlier status notes)

### Exact refs and PR state
- Working branch: feat/learning-platform-foundation
- Feature HEAD at this checkpoint: 9c51012aff7631fc12b1dd5af0b74b7de9b28691
- main remains at b13af92576e8a73753a6e3f3d26765d9f9c44397; no commit was made to main in this recovery.
- PR #1 is open and remains Draft: https://github.com/Mardakhay/interactive-guides/pull/1
- GitHub reported mergeable=true and mergeable_state=clean after the merge and successful CI.

### Branch reconciliation
The feature branch and main diverged from common ancestor 452a0296fc875e48f1a050e5af557ef0c08f68c8. The four main commits added only the two SQL/PostgreSQL and two production-hosting locale JSON files. The two-parent merge commit is https://github.com/Mardakhay/interactive-guides/commit/d47d96cb1b471468e9687ab923744ce9ec248a99, with feature as first parent and main as second parent.

- Both production-hosting files were byte-identical on main and feature.
- The feature PostgreSQL files are richer: 35 blocks each and 110 estimated minutes, compared with 10 blocks each and 75 minutes in the older main versions.
- Both feature PostgreSQL files retain every block ID in the main versions and add explanations, walkthroughs, checks and practice. No main-only block IDs were lost.
- The merge retained the richer feature files. The main ref was not moved.

### Exact-head validation and fix
GitHub Actions run #39976179595 passed on exact feature SHA 9c51012aff7631fc12b1dd5af0b74b7de9b28691: npm ci, lint, typecheck, tests and production build.
https://github.com/Mardakhay/interactive-guides/actions/runs/39976179595

The preceding run on merge commit d47d96cb1b471468e9687ab923744ce9ec248a99 failed during test module loading because the new English/Russian SQL content used unsupported callout tone info. The schema allows note, tip, important and warning. Commit 9c51012 changed that tone to important in both locale files; the exact-head Actions run then passed.

A local clone could not be obtained during this session because network DNS resolution for github.com failed in the container. Current verification evidence is GitHub Actions, not a local terminal run.

### Current product status
- Structured content: 26 core lesson IDs and 11 supplementary lesson IDs, with English and Russian files (74 JSON files total).
- Legacy source: all 25 HTML lessons remain under public/lessons/.
- Structured routes: /:locale/structured-lessons and /:locale/structured-lessons/:lessonId.
- The current runner uses JavaScriptRunner.tsx and JavaScriptWorkerProgram.ts with disposable Web Workers and a timeout, not the older iframe-based design.
- PWA is not implemented in the checked feature tree: public/manifest.webmanifest and public/sw.js are absent; index.html has no manifest link and src/main.tsx does not register a service worker.
- App-wide localization is incomplete; localized structured routes do not mean the legacy shell and all application pages are translated.
- Source-to-block parity and editorial approval remain incomplete. Registration and passing tests are not proof of full migration or approval.

### Next action
Continue the source-to-block audit for legacy HTML and accessible Notion material. Work in small syllabus-ordered batches, record uncovered examples and exercises plus EN/RU differences, and do not create duplicate lessons when a registered destination already exists. Then prioritize app-wide localization and implement/test the missing PWA foundation. Keep this handoff synchronized with exact branch HEAD and CI evidence.


## PWA foundation implementation — 2026-10-23

Feature commit c794088f15fb57ba3c1b8c51032e7e76e11f72bf adds:
- manifest link, theme/mobile metadata in index.html;
- public/manifest.webmanifest and public/pwa-icon.svg;
- production-only service-worker registration in src/main.tsx;
- public/sw.js with app-shell precache, network-first navigation fallback for deep links, and runtime caching for successful same-origin GET assets.

The worker skips cross-origin requests, requests carrying Authorization and /api/ paths. This is an initial offline foundation, not release acceptance: SVG-only icon support needs platform validation (PNG sizes may be needed), external Google Fonts may not load offline, and installability/cache-update/offline behavior has not yet been tested in real browsers. GitHub Actions for the PWA commit must be checked before claiming CI green. Main remains unchanged.


## Latest PWA CI checkpoint — 2026-10-23

- PWA foundation commit: c794088f15fb57ba3c1b8c51032e7e76e11f72bf.
- Lint fix: 8d7172bf0faa128aee370afc675c9b5cdd9739ac declares service-worker runtime globals.
- Security hardening: 9e4e08c57725e595c3f279ce6f431fabb2d49281 limits runtime caching to static asset extensions and avoids intercepting arbitrary same-origin data/document requests.
- GitHub Actions [run #39977258811](https://github.com/Mardakhay/interactive-guides/actions/runs/39977258811) passed npm ci, lint, typecheck, tests and production build on exact SHA 9e4e08c57725e595c3f279ce6f431fabb2d49281.
- Current branch still has no real-device installability/offline acceptance evidence. Main remains b13af92576e8a73753a6e3f3d26765d9f9c44397 and was not modified.


## PWA platform asset follow-up — 2026-10-23

The feature branch now includes PNG app icons (180px Apple touch, 192px and 512px manifest assets), a shell precache version bump, a Netlify SPA rewrite, and PWA contract tests in `src/pwa/pwaAssets.test.ts`. These changes are committed on `feat/learning-platform-foundation`; `main` is deliberately untouched. Wait for the exact latest-head Actions run before describing the commit as validated. The automated test cannot replace Android Chrome/iOS Safari install/offline acceptance. Remaining product-sized work still includes broad source parity review, app-wide localization, persistence migration/export, and the Supabase design/implementation.


## Application locale foundation — 2026-10-23

The UI now has an English/Russian preference stored under `interactive-guides.ui-locale`, a route-aware override for `/:locale/structured-lessons`, and a language switch in the top bar. The shared sidebar/mobile navigation, dashboard headings, main catalogue/bootcamp promotion and category cards have localized strings; category lesson counts handle English and Russian plural forms. App-level `html lang` follows the active UI locale.

This is the start of Phase 2, not complete app-wide localization. Course details, legacy HTML lessons, learning-path detail pages, bookmarks, notes, quizzes, search result UI and all empty/error states still need systematic translation and tests. The source lesson/catalog content remains English unless it uses the bilingual structured lesson route.


## Continuation handoff — 2026-10-23 (current PWA/update and UI locale checkpoint)

- Branch: `feat/learning-platform-foundation`; tested code SHA: `5628ca69a6981a6d81357ab1d20e466c3f1d783e`.
- GitHub Actions [run #39982235822](https://github.com/Mardakhay/interactive-guides/actions/runs/39982235822) passed install, lint, typecheck, tests and build on that exact SHA.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains open/draft. Do not merge or force-push as part of continuation.
- PWA now has PNG assets at 180/192/512, manifest links, Netlify SPA fallback, versioned `v3` cache, and a localized learner-controlled update prompt. `public/sw.js` only activates a waiting update after an explicit `SKIP_WAITING` message and reloads only after the learner selects “Update now”.
- UI localization now covers shell navigation, top bar language switch, dashboard headings, catalogue/category cards, category detail, learning-path list/detail, bookmarks, notes and search UI. Structured curriculum/lesson routes keep their route-specific language. This is still **partial**: legacy lesson body content, quiz controls/feedback and remaining labels/empty/error states need audit and translation.
- Source-to-block parity for the 25 legacy HTML files is incomplete. All 26 core and 11 supplementary bilingual structured lesson IDs remain registered, but registration or schema/CI checks do not prove full instructional parity or editorial approval.
- Persistence remains local-first with open work for cross-store legacy data migration and export/import. Supabase auth/sync has not been implemented. Real browser/device PWA acceptance has not been run in this session.
- Next steps: check exact-head Actions after any subsequent change; continue itemized source parity in syllabus order; finish localization audit across remaining pages and content; triage the dependency audit reported by `npm ci`; then add verified PWA/manual deployment acceptance evidence. Keep editorial status at `review` until content review is complete.


## Previous validated handoff — 2026-10-23 (superseded by the latest checkpoint below)

- Branch: `feat/learning-platform-foundation`.
- Exact validated HEAD: `3762826f6952df4a72fce4149694728ea5f1e378`.
- GitHub Actions [run #39985536493](https://github.com/Mardakhay/interactive-guides/actions/runs/39985536493) passed dependency install, lint, typecheck, all 102 tests and production build on the exact SHA.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 is still open/Draft. Do not merge or force-push.
- The CSS source pass compared `public/lessons/css-reference.html` (98,870 bytes; SHA `be8fb951799659672119c32def19167a9c659424`) with `css.fundamentals`, `css.flexbox-grid-responsive` and the Sass/SCSS supplement. The EN/RU `css.fundamentals` pair is version 3, 53 blocks, 110 minutes, 5 knowledge checks, 5 walkthroughs and 3 coding exercises per locale. Schema/CI and matching IDs/types confirm structural consistency—not complete parity or editorial approval.
- Remaining CSS parity: the legacy page's live color-swatch copy behavior, duration/timing/delay transition controls, Flexbox/Grid playgrounds with generated output, section-specific copy/navigation and full quick-reference tables are not reproduced one-to-one. Positioning/z-index/float/clear details, custom web-font loading details and some filter demos also require mapping or a documented defer decision. Keep the legacy HTML intact.
- Broad app UI localization now covers the shell/navigation, dashboard widgets, course catalog and category detail, learning paths, bookmarks, notes, lesson controls/metadata/navigation, quiz controls, search and common empty/error states. Continue auditing all remaining UI and source lesson-body content.
- PWA foundations include PNG icons, manifest, static-asset-only runtime caching, SPA fallback, and learner-controlled service-worker activation. CI is green but no real-device install/offline acceptance was recorded. Local data migration/export/import remains incomplete; Supabase auth/sync remains not started.
- Next: continue source-to-block parity in small batches; use exact-head CI after any change; record intentional interaction deferrals; preserve the `review` status until human editorial/source review is complete.


## Latest validated handoff — 2026-10-23

- **Working branch:** `feat/learning-platform-foundation`.
- **Latest validated application/content snapshot:** `64dea28924aed5701452ae60b121cb57fc747598`; the current branch also contains the documentation refresh.
- **CI:** GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passed `npm ci`, lint, typecheck, 102 tests in 22 test files, and production build on the exact SHA.
- **Main protection:** `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. PR #1 is still open/Draft. Do not merge or force-push without explicit instruction.
- **Curriculum inventory:** 26 core and 11 supplementary stable lesson IDs in EN/RU (74 JSON files total). The app contains the structured curriculum route/reader. All 25 legacy HTML lesson files remain for source comparison and rollback.
- **Current source-parity work:** CSS reference, Git reference and Git workflow got focused source-to-target audits. `css.fundamentals` v3 has 53 blocks/110 min/5 checks/5 walkthroughs/3 exercises per locale; `git.fundamentals` v3 has 38 blocks/95 min; `git.workflow-ci` v3 has 37 blocks/110 min. Git/CSS content status remains `review`; legacy demos, copy controls, navigation and quick-reference parity still need explicit mapping/defer decisions. Most other HTML/Notion content still needs full prose/code/exercise/answer review.
- **UI locale:** broad but partial EN/RU coverage across shell, dashboard, catalogue, category details, learning paths, bookmarks, notes, lesson metadata/navigation, quiz controls and search. Do not claim every legacy lesson body is translated.
- **PWA:** icons, manifest, service-worker caching/update prompt and Netlify-style SPA fallback are present. No real-device install/offline/update acceptance has been recorded.
- **Data/Supabase:** local stores are active; a versioned migration and explicit export/import recovery path remain open. Supabase authentication and synchronization are not implemented.
- **Release diagnostics:** the latest install reported 13 audit findings (8 moderate, 3 high, 2 critical). The build has a large-chunk warning and test output includes React Router future-flag warnings. Triage without unreviewed forced upgrades.
- **Next:** continue source-to-block audits in syllabus order; close or defer the remaining UI/interactions with evidence; add and test local data portability; record browser/device PWA acceptance; triage dependency and bundle warnings. Keep lesson status at `review` until actual editorial approval.


## Documentation snapshot — 2026-10-23 (exact current HEAD)

The implementation/content snapshot reviewed for this documentation sync was `64dea28924aed5701452ae60b121cb57fc747598`, with GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passing on that exact SHA. The previous documentation sync `a4d5eadb045f03a5c7cc995b6f150b42e2ca3eb4` also passed exact-head CI [run #40008684548](https://github.com/Mardakhay/interactive-guides/actions/runs/40008684548). This commit records the handoff and does not change release blockers. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`, and PR #1 remains open as a draft.


## Current handoff — 2026-10-26

- Work only on `feat/learning-platform-foundation`. Code/content HEAD: `17b79e07b8377e8aa92c5aa14305da0062389ac5`. PR [#1](https://github.com/Mardakhay/interactive-guides/pull/1) is open, Draft, and mergeable against `main` SHA `b13af92576e8a73753a6e3f3d26765d9f9c44397`. No new commit in this continuation targeted `main`.
- Exact-head CI [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed install, lint, typecheck, 102 tests across 22 test files, and build. Install reported 14 audit findings (8 moderate, 4 high, 2 critical); build still reports a >500 kB chunk warning.
- New deployment deep dive is in `src/content/lessons/deployment.production-hosting/{en,ru}.json`: 21 ordered blocks per locale, 3 walkthroughs, 2 knowledge checks, 2 scaffolded exercises. The new learning covers `dist` and content hashes, build-time public env values, Vite env precedence (process variables win), host-specific fallback, DevTools/log diagnosis, and rollback. Official Vite/Netlify references are included. A first CI run caught an unsupported `info` callout; it was corrected to supported `tip` in both locales and the rerun passed.
- Current inventory: 21 Notion pages fetched, all connector-unverified; 25 legacy HTML sources inventoried/structurally surveyed. Focused deeper passes are documented for selected React, CSS and Git sources; full audit/parity is not complete. Keep the audit matrix statuses partial/review; do not claim all sources migrated.
- Existing recent content depth: CSS fundamentals v3 / 53 blocks, Git fundamentals v3 / 38 blocks, Git workflow/CI v3 / 37 blocks, SQL/PostgreSQL / 35 blocks per locale. Curriculum has 26 core plus 11 supplementary IDs across EN/RU.
- Other open work: complete source review and matrix evidence; remaining UI/content localization; learner-data migration/export-import; Supabase auth/sync; real Android/iOS PWA acceptance; review dependency audit and large bundle warning.
- A local clone used for the initial inspection was stale and Git network fetch was unavailable in the sandbox. Remote GitHub API mutations were guarded by exact `expected_sha` and explicit feature branch; re-check live PR/branch state before further writes.

## Next action

Continue source-by-source parity and content deepening from `docs/FULL_SOURCE_CONTENT_AUDIT.md`, starting with the next largest unaudited source. For every lesson pair, verify structure, technical correctness, depth, feedback and source evidence. Re-run exact-head CI after implementation and update this handoff again.

## Current handoff — 2026-10-26 (DOM milestone)

- Feature code/content commit: `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902`. GitHub Actions [run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed `npm ci`, lint, typecheck, 102 tests across 22 files and production build.
- `js.dom-events` EN/RU now share 35 ordered blocks, 7 walkthroughs, 6 checks and 3 coding exercises. The content test checks the expanded counts and locale block structure. One earlier run exposed the stale expectation of four checks; it was updated to six and the exact latest run passed.
- The legacy DOM HTML was structurally mapped and compared against the embedded lesson. Remaining gaps: interactive traversal/live-collection/theme demos, parts of the five code-editor challenges and final six-part Card Manager. Do not call it fully migrated; preserve the HTML source.
- Deployment/hosting is also deepened at 21 blocks/locale (3 walkthroughs, 2 checks, 2 practices) with official Vite/Netlify references. CSS and Git/CI have prior deepening. All lessons remain in editorial review.
- Current source scope: 21 Notion pages fetched (unverified by the connector) and 25 HTML files inventoried; complete line-level review remains open. PR #1 is open/Draft on `feat/learning-platform-foundation`; `main` was not modified.
- Next: continue full source review beyond DOM, record block-level evidence and explicit deferrals, deepen the next largest uncovered curriculum topic, then rerun exact-head CI and update this handoff.

## Current handoff — 2026-10-26 (network/DOM checkpoint)

- Feature code/content SHA: `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1`. Exact Actions [run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588) passed install, lint, typecheck, 102 tests / 22 files and production build.
- New `network.dns-tcp-tls` content: 22 blocks per locale, 2 walkthroughs, 3 checks, 2 exercises. It corrects a misleading legacy HTTP/2 claim and explains TCP transport HOL versus HTTP/3 QUIC stream behavior with packet/congestion caveats and IETF RFC references.
- `js.dom-events` remains 35 blocks per locale (7 walkthroughs, 6 checks, 3 exercises); deployment hosting 21 blocks per locale (3 walkthroughs, 2 checks, 2 exercises). Related tests and EN/RU structural parity passed.
- Source audit remains open: 21 Notion fetches marked unverified; 25 HTML sources inventoried; only selected sources have focused/full content reviews. Exact source evidence and residuals are in FULL_SOURCE_CONTENT_AUDIT.md.
- PR #1 is open/Draft; base main SHA `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This continuation did not write to main.
- Next: continue full source review and add only evidence-backed bilingual content; then update the matrix and rerun CI. Keep app lesson status at `review`.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## Current handoff (2026-10-26): embedded lessons and icon milestone

- Active branch: feat/learning-platform-foundation. PR #1 remains open/Draft; main was not modified.
- Local GPT-created lesson restoration was preserved; merge bbee000943990cc3dc6e1fe7a52d66100296d137 joins it to fetched remote feature history without rewriting either side. Local lint, typecheck, 102 tests across 22 files and production build passed on the merged tree before the icon update.
- The generated icon concept from commit 912742dc3549f6bd659c7baf2beb4cd1d67034e1 was rejected by the user and superseded. Correction commit 2cedeeae948b0a35e6a983c428cb72b17140895c uses only their exact supplied blue-and-white SVG byte-for-byte for favicon and scalable PWA icon; 180/192/512 PNGs are generated directly from that same SVG with 4× supersampling and RGBA antialiasing, not variants. Theme color is #0284c7 and service-worker cache version is v5. GitHub Actions [run #387](https://github.com/Mardakhay/interactive-guides/actions/runs/40276045811) passed on the SVG correction. Follow-up PNG rasterization commit de3706c32abefbdd24550133f8db91d241724387 generated all three RGBA PNG sizes directly from that SVG with 4× supersampling; Actions [run #389](https://github.com/Mardakhay/interactive-guides/actions/runs/40276645065) passed on its exact SHA.
- Content is still in migration/review. The 21 fetched Notion pages are marked unverified; 25 HTML sources are inventoried, but full prose/code/exercise/reveal parity is incomplete. Keep legacy delivery until the full source-to-block and bilingual depth gate passes; then disable legacy HTML for learners while retaining sources for audit evidence.
- Next work order: complete source-by-source review and deepen missing EN/RU structured material in-app; validate every learner route uses that content and then cut over from legacy HTML; stabilize local data migration/export/recovery; implement Supabase auth/sync, schema and RLS for progress and related saved data.
- Do not claim the course, source audit, Supabase or device-level PWA release acceptance is complete.


## Continuation checkpoint — 2026-10-26

The Week 14/15 parity work remains useful but does not imply the whole course is complete. Source discovery has expanded to 21 Notion pages and 25 legacy lesson HTML files. Three new structured bilingual depth passes in the current continuation target architecture boundaries, Sass/SCSS and object prototypes; their evidence is recorded in `FULL_SOURCE_CONTENT_AUDIT.md`. Full source-section coverage outside those focused areas remains pending, so the app still has its legacy HTML-backed learner flow and Supabase remains sequenced afterward.


## Content continuation — 2026-10-26

The Week 14/15 lessons remain a focused parity milestone, not the end of course content work. Recent additional source-derived structured depth now includes Bootstrap's collapse behavior, grid/card semantics, and carousel accessibility tradeoffs in the separate UI ecosystem supplement. All-source parity remains open, so the legacy learner catalog/routes are intentionally still present and Supabase remains the next-after-cutover phase.


## Handoff checkpoint — 2026-10-26

Latest code change: bilingual DOM lesson adds DocumentFragment, IntersectionObserver/MutationObserver cleanup, custom-event contract, debounce/throttle, and a debugging exercise. Branch HEAD at note time: `68a3d192b6be30fc2b94d3aca9d825f0edbae5fd`; CI run #396 was queued. Continue auditing remaining legacy/Notion subtopics, keep the HTML learner flow until the content gate passes, then switch to JSON and implement Supabase only afterward.


## Handoff — 2026-10-26

The user-requested order is unchanged: finish source-depth verification → switch learner app to bilingual structured JSON and remove HTML from learner delivery (retain source evidence) → implement Supabase progress persistence. Seven source-derived lesson areas now have targeted bilingual depth work, but all source subtopics are not yet verified. CI #401 on code/test checkpoint `604b57e98fdadf6558ef83209145dab9b7253ebf` was still running at the time of this handoff note; recheck exact SHA before continuing.
