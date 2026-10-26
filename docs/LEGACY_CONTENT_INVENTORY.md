# Legacy Lesson Inventory

**Inventory date:** 2026-10-22  
**Source directory:** `public/lessons/`  
**Purpose:** migration tracking, not a declaration that any lesson is already migrated.

## Inventory

| Legacy HTML | Proposed subject area | Canonical track mapping | Notes |
|---|---|---|---|
| `internet-fundamentals.html` | Browser, network, HTTP, DNS, TLS | Month 1 / Week 1 | Start here; align to syllabus outcomes and current web standards |
| `html-reference.html` | HTML structure, semantics, forms and accessibility | Month 1 / Weeks 1–2 | Split reference depth into sequential lessons |
| `css-reference.html` | CSS syntax, selectors, box model, layout | Month 1 / Weeks 3–4 | Split foundational CSS from advanced reference sections |
| `dom-masterclass.html` | DOM, events, browser APIs | Month 2 / Week 7 | Practical DOM module |
| `js_interactive_book.html` | JavaScript core syntax | Month 2 / Weeks 5–6 | Audit ordering and depth; split into concepts |
| `js-deep-dive.html` | Objects, prototypes, classes | Supplementary JavaScript track | Place after core object/function foundations |
| `js-memory-mastery.html` | Execution, stack/heap, memory | Supplementary JavaScript internals | Connect to the user's Notion source A |
| `interactive-async-js.html` | Promises, async/await, event loop, fetch | Month 2 / Week 8 | Divide into mental models, network use, failure handling |
| `git-reference.html` | Git commands and concepts | Month 2 / Week 8 | Reference plus retrieval tasks |
| `git-workflow-cicd-guide.html` | Branching, PR/MR, review, CI/CD | Month 5 / Week 20 | Some deployment content also overlaps Month 6 |
| `intro.dev.html` | Development environment, Node and package tooling | Month 3 / Week 9 | Clarify current Node/npm versions during rewrite |
| `react-usestate-guide.html` | React state and useState | Month 3 / Week 11 | Core React |
| `react-hooks-guide.html` | Hooks and composition | Month 3 / Week 12 + extension | Use effect rules and current React docs |
| `react-forms-tutorial.html` | Forms and validation | Month 4 / Week 14 | Include accessible errors and form semantics |
| `react-api-hooks-lesson.html` | API layer and custom hooks | Month 4 / Week 16 | Keep core fetch concepts separate from library choices |
| `react-ecosystem-course.html` | SPA, React Router and ecosystem | Month 4 / Week 13 | Match route concepts to current installed major version |
| `react-performance-a11y.html` | Rendering performance, lazy loading, accessibility | Month 5 / Week 18 | Teach profiling/measurement before memoization |
| `ui-design-system-learn.html` | UI systems, tokens, components | Month 5 / Week 17 | Use one coherent system in examples |
| `material-ui-masterclass.html` | MUI library practice | Month 5 / Week 17 extension | Keep library-specific material supplementary |
| `frontend-architecture-and-planning.html` | Requirements, architecture and project planning | Months 6 / Weeks 21–23 + extension | Connect to the capstone |
| `test.guide.html` | Unit, integration and component testing | Month 5 / Week 19 | Align examples with selected test stack |
| `frontend-auth.html` | Authentication and authorization | Month 6 / Week 23 extension | Security review required; distinguish UI guards from data authorization |
| `deployment-learning.html` | Build output, environments, hosting and release | Month 6 / Week 24 extension | Include platform differences and current deployment docs |
| `sql-learning-page.html` | SQL and database fundamentals | Supplementary track | Outside the supplied 24-week core sequence |
| `frontend-bootcamp-notes.html` | Broad course handbook | Orientation / cross-links | Do not keep as a competing canonical curriculum |

## Migration status vocabulary

- `not-started`: source file has not been analyzed in full.
- `extracted`: outline, examples, exercises, answers, links and claims have been inventoried.
- `review-needed`: content has been rewritten but needs technical/instructional review.
- `translated`: both locales are present; this alone does not imply review passed.
- `validated`: source accuracy, content schema, language parity, navigation, exercises and tests passed.
- `published`: linked in the canonical curriculum and usable through the new lesson reader.

## Important limitation

The table is an initial subject mapping based on filenames and sampled content, not a full line-by-line audit of all 25 large HTML files. Before each file is rewritten, inspect its complete content and preserve useful examples and nuanced explanations where they are accurate. The migration should be curriculum-driven: split a legacy file when it contains several separate learnable concepts.

## Follow-up source audit status — 2026-10-23

The repository inventory reconciles to 25 HTML files. A structural pass inspected headings and interactive-control presence across all 25; full content/code review was completed only for react-forms-tutorial.html and react-ecosystem-course.html in the prior pass. react-api-hooks-lesson.html also received a targeted factual review for client choice, partial-update semantics, demo API persistence, and retry behavior. The remaining HTML documents still need body/code/example/feedback review before this inventory can be called fully audited. See FULL_SOURCE_CONTENT_AUDIT.md for source-to-target status and limitations.


## Embedded migration checkpoint — 2026-10-23

The inventory above is the source list and first-pass topic map; it is not a claim of completed migration. The feature branch now includes a bilingual structured curriculum of 26 core IDs / 52 locale files and 11 supplementary IDs / 22 locale files, accessible through the React text renderer and curriculum index. Legacy HTML remains source material and is not the learner-facing format for these structured lessons.

Source review depth is still incomplete: all 25 files were checked for existence and structurally surveyed (titles/headings/control markers); the React forms and React ecosystem HTML received full reads, with targeted API-source review. The other files still need full prose, code, hidden/revealed content, exercise, answer, link, and behavior checks. Keep each source listed until a source-to-block mapping and depth assessment exists in `docs/FULL_SOURCE_CONTENT_AUDIT.md`. Registration of a similarly named lesson is not parity evidence.


**Verification update (2026-10-23):** the current feature content code passed lint, typecheck, all 92 tests, production build and diff whitespace check at `132636c4007141454a903e815d6f0418a3c511b0`. This validates the platform structure, not full semantic migration for every file in the inventory. GitHub Actions has no reported run for that API-created commit.


## Latest structured migration status — 2026-10-26

The 25-file inventory remains the source inventory; source files are retained. The feature has 26 core and 11 supplementary bilingual lesson IDs in-app. This is not full migration.

Recent source-to-content passes expanded CSS fundamentals (53 blocks/locale), Git fundamentals (38 blocks/locale), Git workflow/CI (37 blocks/locale), SQL/PostgreSQL (35 blocks/locale), and production hosting (21 blocks/locale: 3 walkthroughs, 2 checks, 2 exercises). Deployment’s new in-app evidence covers generated `dist`, content hashes, Vite mode/env precedence, build-time configuration, hosting fallback diagnosis and rollback planning.

Legacy `deployment-learning.html` still contains interactions not equivalent to structured blocks (including a pipeline simulator, provider tabs and custom-domain walk-through); mark its status partial and keep it intact. The broader source audit still has 21 fetched Notion pages marked unverified and most HTML files still need complete body/code/hidden-answer/interaction parity review. Detailed evidence is in [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md).

## DOM source checkpoint — 2026-10-26

`dom-masterclass.html` has received a structural/control inventory and targeted comparison with `js.dom-events`. The lesson now includes nodeType/element collection distinctions, attributes vs live properties/default reset, event phase ordering, and corresponding walkthroughs, checks and a diagnostic practice in both locales. Automated checks passed at code/content SHA `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902` (102 tests and build included in Actions run #40271279200).

This is still **partial**, not a completed source audit or full interactive migration. The legacy tree navigator, collection/theme demos, several editable challenges and the final Card Manager do not yet have equivalent app interactions. Keep the HTML file and the lesson status at review until prose/code/answers and remaining behaviors are audited or explicitly deferred.

## Network source checkpoint — 2026-10-26

A targeted technical review of `internet-fundamentals.html` identified an overclaim that HTTP/2 multiplexing eliminates head-of-line blocking. The structured bilingual destination now separates HTTP/2 streams from TCP's ordered connection delivery and contrasts HTTP/3 over QUIC, including caveats for shared-packet loss and connection congestion. Evidence and current RFC references are in `network.dns-tcp-tls` and [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md).

The legacy source is preserved and its broader DNS/HTTP/TLS/browser interactions are not fully migrated. This was a focused correction, not a line-by-line audit.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## Continuation checkpoint — 2026-10-26

The source inventory covers 25 legacy lesson HTML files plus the app-shell `public/index.html`; the app shell is not a lesson. All 25 lesson files were fetched fully, and their headings/interactive-control structure was inventoried. The interactive controls are useful source evidence, not learner-facing parity. Full per-file concept/example/pitfall/practice-to-JSON review remains open. Do not delete source HTML or claim a completed migration yet.

Latest code content additions on the feature branch are bilingual structured lesson content in architecture boundaries, Sass/SCSS, and object prototypes. HTML is still used by legacy learner routes. The safe next removal is the learner-facing route/catalog dependency only after all source material is represented and validated in structured JSON; preserve the historical files as audit evidence unless separately approved for repository deletion.


## Content continuation — 2026-10-26

Four bilingual supplementary lessons now have additional learner-facing explanations, walkthroughs, feedback and practice: architecture boundaries, Sass/SCSS, object prototypes, and Bootstrap/MUI. The Bootstrap/MUI supplement now explicitly covers a responsive navbar collapse dependency and ARIA wiring, responsive cards with meaningful alt text, and the tradeoffs of carousels. See `FULL_SOURCE_CONTENT_AUDIT.md` for concrete block evidence and current limitations. Source HTML remains in the app while parity review is unfinished.


## DOM inventory note — 2026-10-26

The DOM Masterclass source contains interactive tree/selector exercises, content and attribute/property comparisons, DocumentFragment, event phases/delegation, observer APIs, custom events, and rate-control patterns. The structured `js.dom-events` pair now explicitly covers those advanced observer and batching topics in addition to its existing safe rendering and delegation practice. The file remains a source artifact; learner-flow migration is still gated by the remaining sources.


## HTML-source pass — 2026-10-26

Targeted source comparison has now translated several previously missing interactive concepts into structured lessons: DOM observers/batching, React effect integrations/storage events, Fetch-vs-Axios service behavior, and MUI form behavior. `FULL_SOURCE_CONTENT_AUDIT.md` lists block-level evidence. This does not yet mean every old HTML page is conceptually migrated; keep source files and learner routes until the complete audit gate passes.


## HTML/CSS source findings — 2026-10-26

Added structured bilingual evidence for native data tables and accessible media (captions, alternatives), plus a CSS lesson on margin collapsing. See `FULL_SOURCE_CONTENT_AUDIT.md` for exact block IDs. Legacy HTML remains as source evidence and in the learner flow until every remaining source row is reviewed; these additions alone do not authorize the cutover.


## Git workflow update — 2026-10-26

The structured Git/CI lesson now teaches the release trigger distinction between continuous delivery and continuous deployment and how branch protection enforces a CI/review gate. It adds a complete pipeline simulation task. See the full audit for exact evidence. Legacy HTML is still retained and still serves the learner route pending the global content gate.

## 2026-10-26 content checkpoint

The JSON curriculum now registers `js.iterators-generators` in English and Russian under `supplement-js-internals`. Its source-linked depth evidence is recorded in `FULL_SOURCE_CONTENT_AUDIT.md`: the Advanced JS Notion page's generator/lazy-iteration topic is covered with three walkthroughs, two feedback quizzes, a practical exercise, edge cases and cleanup behavior. The repository is at 38 bilingual lesson pairs (26 core + 12 supplementary). Legacy HTML files remain preserved as source material and learner-facing HTML routes have **not** been removed; the all-source parity gate is still open. Supabase remains deferred until JSON cutover.

## 2026-10-26 incremental source checkpoint

A deeper fetch of the Advanced JS Notion page confirmed distinct Map/Set/WeakMap/WeakSet sections. The structured course now has a bilingual registered supplement `js.collections-weakmaps` (15 aligned blocks: three worked traces, two explained checks, one coding exercise), but this only partially covers the source's complete API examples. Evidence and remaining subtopics are in `FULL_SOURCE_CONTENT_AUDIT.md`. Repository inventory: 39 EN/RU pairs (26 core + 13 supplements). Legacy HTML is still preserved and learner routes remain active until the all-source gate passes; Supabase is not started.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## 2026-10-26 regex content checkpoint

`js.regex-text-processing` is now a bilingual registered supplement (order 5) covering regex construction, captures, global state, matchAll, computed replacement, limits of format validation, and ReDoS-aware caution. It includes three walkthroughs, two explained quizzes and an applied task. Source parity is partial because the Advanced JS page also has distinct URL, phone, password, hashtag and whitespace examples. The broader inventory is 40 EN/RU pairs (26 core, 14 supplementary); keep legacy HTML routes while source gaps remain.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.

## 2026-10-26 browser-storage checkpoint

Added `browser.storage-indexeddb` as a bilingual registered lesson in `supplement-browser-storage`. It covers local/session storage, defensive string/JSON handling, origin/XSS and sync limitations, storage-event scope, IndexedDB upgrades and transaction commit semantics, with four walkthroughs, two feedback quizzes and applied transaction practice. Source parity remains partial (not every IndexedDB CRUD/cursor/quota example is migrated). Inventory: 41 pairs (26 core + 15 supplements); legacy learner HTML remains active.

## Verification checkpoint — 2026-10-26

Browser-storage lesson code SHA `7915276b6514a56a3a700c0ba488b784e348754b` passed lint, typecheck, test suite, and production build on [CI run 40282414157](https://github.com/Mardakhay/interactive-guides/actions/runs/40282414157). The documentation checkpoint `97008a25d5312fe207756e6a6061f3d75bd72a7b` also passed the same required checks on [CI run 40282496515](https://github.com/Mardakhay/interactive-guides/actions/runs/40282496515). The next content/docs checkpoint will receive a fresh exact-HEAD run.

## 2026-10-26 core JavaScript depth update

`js.functions-arrays-objects` now explains array destructuring, default values vs null, rest parameters vs spread calls, optional chaining, and `??` versus `||` with three traces, two explained quizzes and a profile-normalization task. Existing object destructuring and shallow spread remain intact. The topic is still partial against Advanced JS (nested/function-parameter destructuring and other examples remain); total lesson pair count stays 41.

## 2026-10-26 invocation/strict-mode checkpoint

The existing `js.object-prototypes` supplement now has explicit examples for call-site `this`, `call` vs `apply` vs `bind`, arrow lexical receiver, bound event-listener identity, and strict-mode effects. A practical invoice task and feedback quizzes accompany the explanation. Both locales are 31 blocks; broader strict-mode edge cases remain partial. Pair inventory remains 41.

## 2026-10-26 networking/worker checkpoint

Added registered bilingual `browser.realtime-workers` in `supplement-browser-platform`. It differentiates XHR/Fetch, WebSocket, dedicated Worker and Service Worker with four code traces, two explained quizzes and a worker sorting exercise. Source depth is partial: upload progress, XHR states, explicit reconnect and full service-worker cache/version strategies remain. Catalog now has 42 pairs (26 core, 16 supplements); learner HTML remains active.


## Browser capability API checkpoint — 2026-10-26

Added the bilingual browser.capability-apis lesson to supplement-browser-platform. It covers geolocation, clipboard, notifications, battery API limits, ResizeObserver feedback and Page Visibility cleanup. The full source audit records block-level evidence. Catalog count is now 43 EN/RU pairs (26 core + 17 supplementary). This does not close Notion-wide parity or detailed review of every HTML source. Legacy learner routes and source files remain; no cutover/deletion or Supabase implementation has occurred.


## Typed-array / binary-data checkpoint — 2026-10-26

Added bilingual js.typed-arrays-binary to supplement-js-internals. It teaches ArrayBuffer versus typed views, byte units and aliasing, numeric conversion, DataView endianness, transferable ownership, and defensive packet parsing. Source details and evidence IDs are in FULL_SOURCE_CONTENT_AUDIT.md. Catalog count is 44 EN/RU pairs (26 core + 18 supplementary). This is a focused source slice, not completion of the Advanced JS page or the complete Notion/HTML parity audit. HTML learner routes/files remain; no JSON cutover, source deletion, or Supabase work has occurred.


## Binary-data lesson CI follow-up — 2026-10-26

The first binary-data lesson CI run [40285183316](https://github.com/Mardakhay/interactive-guides/actions/runs/40285183316) failed only because its line-range test used a literal backslash-n delimiter. The test was corrected without weakening its range assertion. Follow-up SHA `bef3e581f966e41262e2da00d60da621b3a2d6ce` passed lint, typecheck, tests, and production build on [CI run 40285395490](https://github.com/Mardakhay/interactive-guides/actions/runs/40285395490). Lesson content remains in review; the broad source parity and legacy HTML cutover gates remain open.


## intro.dev.html full-read checkpoint — 2026-10-26

Completed the full 3,472-line source read, including five chapters, 20 interactive quiz items and 10 starter/solution exercises. It maps across existing npm/tooling, TypeScript, React, API Hooks, testing and browser-storage lessons. The pass identified the missing TypeScript utility-types topic; the bilingual core TS lesson now explains Pick/Omit/Partial, compile-time/runtime limits, a walkthrough, explained check and applied exercise. Detailed per-chapter evidence and outdated sample caveats are in FULL_SOURCE_CONTENT_AUDIT.md. Source parity is still partial; legacy HTML remains intact.


## js-deep-dive.html full-read checkpoint — 2026-10-26

Completed the full 2,334-line read, including three playgrounds, the interactive lookup tracer, nine quiz questions and five numbered exercises (the page advertises six). The audit records source inaccuracies and block-level mapping. Added bilingual class semantics/private state/super/static/prototype walkthroughs and applied practice to js.object-prototypes. Source interaction parity is partial and the HTML remains intact.


## CI correction in progress — 2026-10-26

CI run [40286184091](https://github.com/Mardakhay/interactive-guides/actions/runs/40286184091) on TypeScript utility-type content failed because an existing translation test still expected four quiz blocks after the lesson gained its fifth knowledge check. The lesson and quiz are retained; this follow-up updates the invariant to five and adds targeted coverage. The associated class-lesson/source-audit work also remains pending CI verification.


## Exact CI checkpoint — 2026-10-26

Feature SHA 6b92bb9a0d70fdd299c0ae72bf864392f5b27d99 passed lint, typecheck, all tests and production build in GitHub Actions run [40286622209](https://github.com/Mardakhay/interactive-guides/actions/runs/40286622209). This includes the TypeScript quiz-count correction and new class-model lesson tests. Source audit remains incomplete: four of 25 HTML files have full reads documented; 21 Notion fetches remain marked unverified and complete source-to-block parity is open. Legacy HTML routes/files remain; JSON cutover and Supabase work have not started.


## Continuation update — 2026-10-26 (API hooks source pass)

The complete 3,031-line `react-api-hooks-lesson.html` was read, including its quiz and five practice tasks. This brings the full-read count to 5 of 25 inventoried HTML sources (react-forms-tutorial, react-ecosystem-course, intro.dev, js-deep-dive, react-api-hooks). `react.api-custom-hooks` v4 adds a bilingual debounce model, a line-checked timer-cleanup walkthrough, feedback-rich check and race-safe search exercise. This closes that identified topic gap, but not full legacy interaction parity, the remaining HTML sources, or Notion verification. Debounce source-specific checks are included; exact-head CI remains pending for this updated test correction.


## Schema validation correction — 2026-10-26

The first debounce-content CI run (`80d84f0da72078976524abadb9860f0fe8c65476`, [run 40287373963](https://github.com/Mardakhay/interactive-guides/actions/runs/40287373963)) passed lint/typecheck but failed runtime schema validation: the newly added quiz used legacy field names and omitted option IDs. The quiz is corrected to the renderer's required `questionType`, `prompt`, and ID-bearing option schema in both locales. The line-range test's newline split is also now verified as a real newline delimiter. Follow-up CI is pending.


## Continuation update — 2026-10-26 (React hooks source pass)

The full 2,491-line `react-hooks-guide.html` has now been reviewed, including its five quiz questions, four editable code challenges, tab variants and lifecycle simulator behavior. This brings full HTML reads to 6 of 25. `react.effects-lists-composition` v4 adds a bilingual filter/sort/map walkthrough that keeps derived values out of state, sorts a fresh filtered array, uses stable keys and includes a feedback-rich check plus applied coding task. Source claims that an empty dependency array always means exactly once and unstable keys simply rerender everything are explicitly corrected by the structured lesson's Strict Mode and identity explanations. Legacy UI interaction parity and other sources remain open.


## EN/RU assertion correction — 2026-10-26

The v4 lesson content is bilingual and block-aligned. The first follow-up CI on `71c89b215defd8e719d9a16557e68e6b2cf62513` failed because the quiz check on both translations had not been incremented; the subsequent source-content commit also retained old RU block-count expectations. Both exact CI logs identify assertions only (`40287582166`, `40287881297`); no schema, typecheck or lint failure. Test expectations now count matching EN/RU additions. Re-run CI on the corrected exact head before reporting green.


## Assertion precision update — 2026-10-26

CI run [40288097099](https://github.com/Mardakhay/interactive-guides/actions/runs/40288097099) confirmed all schemas and unrelated suites pass, then found two over/under-counted assertions: the new RU list walkthrough increased its count to six, and cancellation guidance belongs to the walkthrough's explanation rather than the debounce snippet's executable code. Tests now assert the bilingual count and verify `AbortController` in the step explanation. These were test expectation defects; content remains unchanged.


## Audit continuation — 2026-10-26

Notion discovery returned 21 relevant pages (all are retrievable; all currently carry Notion connector status `unverified`). The complete 4.1–4.30 content of [Part 4](https://app.notion.com/p/3ba855c6fbb08075a08ef30c3ac20d89) has now been read section-by-section; its source matrix is split by routing, forms, shared state/Context/hooks, API state and integrated pitfalls. Other pages have been fetched and their titles/section outlines inventoried, but must not be reported as fully source-mapped until examples, caveats and practice are reviewed. Six of 25 HTML sources have full lesson-content reads. The React hooks source added the filter/sort/map walkthrough; the API source added debounced search and race safety. Feature code SHA `8fa4885ea09423c6901084c2da50704a5aa7a4d5` passed CI [run 40288265138](https://github.com/Mardakhay/interactive-guides/actions/runs/40288265138) (lint, typecheck, tests and build). This is an exact code checkpoint; the documentation-only update now being committed requires its own exact-head CI.


## Source-audit continuation — 2026-10-26

Completed a full-content and interaction review of `public/lessons/js-memory-mastery.html` (source 7 of 25 fully studied). Its useful lessons on object identity, nested copy behavior, closure retention and memory diagnosis are now embedded in both `js.runtime-memory` JSON locales. The new lesson explicitly separates ECMAScript guarantees from engine-specific physical memory/optimization claims, and adds a repeatable DevTools investigation plus an immutable-update exercise. Source-specific coverage and deliberate corrections are recorded in `FULL_SOURCE_CONTENT_AUDIT.md`; full-source completion remains open (7/25 HTML files, and Notion connector verification remains unverified).


## Full-content review checkpoint — 2026-10-26

- Fully inspected HTML source 8/25: `public/lessons/react-usestate-guide.html` (blob `73b6d53f95f6b06dad75d58cd63f50a7c6e77e71`, 82568 bytes). This includes the whole document, all code samples, the inline demo/editor/quiz scripts, five coding-task rubrics and all 10 quiz answers/feedback.
- Covered in existing embedded EN/RU lessons: `react.components-jsx-state` (state snapshot, updater queue, immutable arrays/objects, controlled inputs, deeper state exercise), `react.forms-validation` (controlled/uncontrolled inputs, multi-field forms, validation, debugging exercises and 10 checks), and `typescript.fundamentals` (inference and generic state types).
- Status is strong concept coverage but partial interaction parity: the legacy remote AI code reviewer is deliberately not reproduced. The source matrix records the lesson block evidence and inaccurate legacy simplifications.
- Total HTML full reads: 8/25. Remaining 17 require full content/interaction review before the HTML cutover gate can close.


## Full-content review checkpoint — 2026-10-26

- Fully reviewed HTML source 9/25: `public/lessons/internet-fundamentals.html` (45,620 bytes), including the DNS accordion, expandable HTTP sequence, sidebar, all prose and browser/hosting/network diagrams.
- HTTP/3 and TLS references were checked against IETF RFC 9114, RFC 9110, and the July 2026 TLS 1.3 revision RFC 9846 (which supersedes RFC 8446). Corrected the RU/EN reference metadata to current standards.
- Added bilingual resource-capacity and hosting-model coverage plus a scenario-based exercise to `deployment.production-hosting`. HTTP/3, DNS, rendering and security coverage mapped to their existing lessons. The source's universal TCP+TLS and per-tab process claims are not transferred.
- 9/25 HTML full reads; 16 remaining.


## Full-content review checkpoint — 2026-10-26

- Fully reviewed HTML source 10/25: `public/lessons/git-workflow-cicd-guide.html` (1,977 lines; 99226 bytes), including all tabs, branch canvas transitions, CI simulator/failure injection, annotated workflow, MR/review examples and 10 quiz questions/feedback.
- Existing bilingual `git.fundamentals` and `git.workflow-ci` lessons cover its content in depth; no duplicate lesson was warranted. Matrix evidence records exact blocks and remaining visual-interaction parity.
- Corrected/documented legacy issues rather than copying them: Git Flow is not universal, PR line thresholds are heuristics, simulator deployment-before-merge conflicts with its YAML, and its floating `@master` action lacks explicit least-privilege permissions.
- 10/25 HTML sources fully reviewed; 15 remain. Current code/test SHA `3156a29de9b951bfd5b25322c2a40bbefa525ac2` passed CI run [40290215609](https://github.com/Mardakhay/interactive-guides/actions/runs/40290215609). Earlier lint failure from a missing test-suite brace was fixed and this run validates the corrected head.
