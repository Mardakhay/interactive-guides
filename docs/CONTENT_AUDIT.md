# Structured Content Audit

**Updated:** 2026-10-23  
**Branch:** `feat/learning-platform-foundation`  
**Scope:** the embedded, bilingual structured lesson catalog and curriculum registry.

## Inventory

The content repository registers 26 core lesson IDs in English and Russian (52 locale files) across the 24-week bootcamp, plus 11 supplementary IDs in both locales (22 locale files). The supplements are kept outside the bootcamp weeks. The app parses registered translations and curriculum through Zod at import time and exposes them through the structured lesson reader.

Core IDs: `web.internet-http`, `html.document-structure`, `html.forms-accessibility`, `css.fundamentals`, `css.flexbox-grid-responsive`, `js.basics-types-control-flow`, `js.functions-arrays-objects`, `js.dom-events`, `js.async-fetch`, `git.fundamentals`, `tooling.node-npm-vite`, `typescript.fundamentals`, `react.components-jsx-state`, `react.effects-lists-composition`, `react.router-spa`, `react.forms-validation`, `react.context-shared-state`, `react.api-custom-hooks`, `ui.design-systems`, `performance.accessibility`, `testing.react-testing-library`, `git.workflow-ci`, `capstone.requirements-discovery`, `capstone.design-architecture-planning`, `capstone.implementation`, `capstone.review-demo`.

Supplementary IDs: `network.dns-tcp-tls`, `browser.rendering-pipeline`, `js.runtime-memory`, `js.object-prototypes`, `frontend.auth-security`, `deployment.production-hosting`, `data.sql-postgresql`, `css.sass-scss`, `ui.bootstrap-mui`, `frontend.architecture-boundaries`, `tooling.advanced-package-workflows`.

## Structural guarantees and limits

The lesson schema/tests cover required lesson structure, stable unique block IDs, line ranges, quiz answer/feedback shape, coding-exercise scaffolding, locale block parity and curriculum/repository links. These checks establish machine-readable consistency, not that all source explanations are correct, that examples execute, or that translations are editorially equivalent. Lesson editorial status remains review.

## Source parity status

This file does not claim complete parity. The full source inventory and Notion/HTML evidence matrix are maintained in [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md). At the latest repository checkpoint, 21 Notion pages had been fetched (all marked unverified by the connector) and 25 HTML files were inventoried and structurally surveyed. Two React HTML sources were read in full in an earlier pass; the API material received targeted factual review; and the CSS reference plus Git reference/workflow pages received focused source-content, heading/control and structured-target comparisons. Most other HTML bodies, code samples, hidden answers and interactions still require full review against the structured blocks.

Keep standalone HTML files as sources until each relevant subsection has block-level mapping, a depth assessment (explanation, walkthrough, reasoning, pitfalls, practice, feedback), technical verification, and EN/RU review. CI green alone is not a publication approval.

**CI evidence:** [run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed on `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6` (92 tests plus lint/typecheck/build). Editorial/source-parity gaps listed above remain unresolved by CI.


**Latest CI:** [Run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056) passed on feature SHA `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5`; source parity status remains partial.


## Latest exact-head validation — 2026-10-23

Feature HEAD `9dfa157ce36123144ad84c2f327abdb41984a3a7` passed GitHub Actions [run #39986177388](https://github.com/Mardakhay/interactive-guides/actions/runs/39986177388), including all 102 tests across 22 files and production build. CI remains evidence of schema, test and build consistency only.

The latest focused content additions include CSS fundamentals v3 (53 blocks/110 min per locale), Git fundamentals v3 (38 blocks/95 min), and Git workflow/CI v3 (37 blocks/110 min). They remain in editorial review; legacy HTML pages remain available and their full source-to-block and UI-interaction equivalence is not closed.


## Latest implementation/content validation — 2026-10-26

At feature HEAD `17b79e07b8377e8aa92c5aa14305da0062389ac5`, GitHub Actions [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed install, lint, typecheck, 102 tests across 22 files, and production build. The app has 26 core and 11 supplementary stable lesson IDs in both locales (74 JSON files). Recent depth work includes CSS v3, expanded Git/CI, SQL/PostgreSQL and deployment/hosting content; deployment is 21 blocks per locale with 3 walkthroughs, 2 checks and 2 coding exercises.

This validates runtime/schema and build invariants only. The 21 fetched Notion pages remain unverified by the connector; the 25 HTML sources are inventoried, with full source-to-block review still incomplete. Lesson editorial state remains `review`. See [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md) for the deployment evidence and remaining source gaps.

## Latest content validation — 2026-10-26

At feature code/content SHA `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902`, GitHub Actions [run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed all configured checks (lint, typecheck, 22 test files / 102 tests, production build). The DOM lesson is now 35 blocks per locale (7 walkthroughs, 6 checks, 3 exercises); CSS, Git/CI, SQL and deployment deepening are also present.

Schema/CI establishes structural integrity, not complete source parity. All 25 legacy HTML files remain. The DOM source is only structurally and selectively reviewed, with live demos and the final Card Manager still unmapped; 21 Notion fetches remain marked unverified. Lesson editorial state remains `review`.

## Current code/content checkpoint — 2026-10-26

Feature SHA `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1` passed [Actions run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588): lint, typecheck, 102 tests/22 files and build. The bilingual network supplement now includes the HTTP/2-over-TCP vs HTTP/3-over-QUIC failure model and primary RFC references; the DOM and deployment content also have recent deepening.

These changes improve content depth but do not close parity for the full 25-file HTML inventory or the 21 unverified Notion fetches. See the full source audit for exact evidence and known gaps. Keep all lessons in `review`.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## Continuation checkpoint — 2026-10-26

Current structural audit remains clean for 37 EN/RU lesson pairs, 26 core IDs and 11 supplementary IDs, but semantic/full-source parity is still incomplete. All 21 retrieved Notion pages remain connector-unverified; 25 HTML lesson files are fully retrieved but not all have completed section-by-section concept and interaction parity review. Recent depth additions: `frontend.architecture-boundaries` (20 blocks), `css.sass-scss` (19), `js.object-prototypes` (19), with matching EN/RU block schemas. Do not treat block count as a depth score.

The current app still serves legacy lesson HTML in its old catalog/routes. Cutover is gated on finishing source-level coverage and reviewing all core/supplement content. Supabase has not been implemented. Latest commit CI status should be checked against the exact feature SHA before treating any checkpoint as verified.


## Content continuation — 2026-10-26

Recent depth work now covers four supplementary pairs (architecture boundaries, Sass/SCSS, JS object prototypes, Bootstrap/MUI), preserving the same EN/RU block ID/type order. Bootstrap source-specific behavior and semantics are now represented by `uilib-bootstrap-collapse`, `uilib-collapse-check`, `uilib-grid-cards`, `uilib-carousel-tradeoff`, and `uilib-bootstrap-task`. Structural tests and CI do not establish full semantic parity; the full HTML source audit and app cutover gate remain open.


## DOM content audit — 2026-10-26

Targeted source-to-lesson review of the DOM Masterclass identified five previously missing topic groups; `js.dom-events` now maps them to source-derived walkthroughs and practice. This was a focused semantic pass, not proof of complete parity for all 25 HTML pages. EN/RU ID/type order and code ranges were checked; exact-head CI must be confirmed separately.


## Targeted semantic parity — 2026-10-26

Additional tests now verify source-specific block IDs, bilingual structure, interactive feedback, and exercise criteria for the DOM observer and API client lessons; UI ecosystem tests cover Bootstrap/MUI behavior. The current implementation has not completed semantic review of every HTML source. Exact latest CI status must be checked on feature HEAD `604b57e98fdadf6558ef83209145dab9b7253ebf`.


## Latest source-specific content — 2026-10-26

In this pass `css.fundamentals` gained the margin-collapsing model, code trace, feedback check and debugging exercise; `html.document-structure` gained semantic data-table and accessible image/video lessons. The pair structures and exercise scaffolds are asserted in `lessonContent.test.ts`. Previous source-specific DOM, React API/effects and UI-library additions are documented in the full source audit. Course-wide parity remains incomplete.


## Git/CI parity — 2026-10-26

Source-specific blocks now cover CI status tied to a SHA, branch-rule enforcement, immutable artifact promotion, manual-release versus automatic-deploy triggers, and rollback planning. The exercise requires evidence and a new check run after repair. This focused addition does not mark all Git HTML interactions or all course sources complete.

## Incremental audit update — 2026-10-26

Added `js.iterators-generators` as a registered bilingual supplement after identifying generators in the Advanced JS Notion source. Depth now includes worked execution traces, protocol distinction, completion/return semantics, eager-vs-lazy trade-off, cleanup via `finally`, async-generator context, feedback checks and coding criteria. Audit evidence and explicit remaining scope are in `FULL_SOURCE_CONTENT_AUDIT.md`. Inventory: 38 EN/RU pairs (26 core, 12 supplementary). Other Notion/HTML source rows still require full depth review; no learner-flow cutover or Supabase integration has occurred.

## Content depth update — 2026-10-26

Added bilingual `js.collections-weakmaps` from Advanced JS Notion material. The lesson differentiates Map's object-key identity from structural equality, Set's value uniqueness from domain-key deduplication, and weak collections from enumerable/timed caches. Applied practice groups records by stable ID, preserving order without mutation. This is a partial source slice, not full API parity. Total: 39 EN/RU pairs (26 core, 13 supplementary). See the detailed evidence and gaps in `FULL_SOURCE_CONTENT_AUDIT.md`; JSON cutover and Supabase remain pending.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## Additional source-derived content — 2026-10-26

Added `js.regex-text-processing` as a bilingual registered supplement. The lesson teaches regex as a specific pattern matcher, distinguishes whole-string checks from substring search, traces stateful `/g` behavior, and practices safe extraction. It corrects the source's simplified email-validation implication and documents ReDoS risk. Coverage is partial against the Notion page's complete practical-example set. Total: 40 bilingual pairs (26 core + 14 supplements); see the source matrix for evidence and remaining subtopics.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.

## Browser persistence content update — 2026-10-26

The Advanced JS page's browser-storage material now has a bilingual structured target `browser.storage-indexeddb`. It distinguishes local/session string storage from IndexedDB transactions, corrects storage-event same-window assumptions, adds security/quota caveats, and teaches request success vs transaction completion. The lesson remains partial against all source CRUD/cursor/estimate examples. Total: 41 EN/RU pairs. This is educational content only: Supabase integration remains deferred until JSON cutover.

## Verification checkpoint — 2026-10-26

Browser-storage lesson code SHA `7915276b6514a56a3a700c0ba488b784e348754b` passed lint, typecheck, test suite, and production build on [CI run 40282414157](https://github.com/Mardakhay/interactive-guides/actions/runs/40282414157). The documentation checkpoint `97008a25d5312fe207756e6a6061f3d75bd72a7b` also passed the same required checks on [CI run 40282496515](https://github.com/Mardakhay/interactive-guides/actions/runs/40282496515). The next content/docs checkpoint will receive a fresh exact-HEAD run.

## Core JavaScript source gap checkpoint — 2026-10-26

Deepened the existing functions/arrays/objects core lesson from 58 to 71 bilingual blocks rather than creating a duplicate supplement. Added array destructuring/rest, defaults, optional chaining and nullish-vs-falsy handling plus practice. The source mapping remains partial and is listed by exact block ID in `FULL_SOURCE_CONTENT_AUDIT.md`; the 41-pair inventory is unchanged.

## JS invocation content update — 2026-10-26

Expanded `js.object-prototypes` from 19 to 31 blocks in EN and RU, adding call/apply/bind execution traces, arrow lexical-this, listener identity, strict mode and an applied exercise. Tests assert source-specific structures and aligned translations. This improves but does not complete the Advanced JS page's invocation/strict-mode coverage; see the matrix.

## Browser networking content — 2026-10-26

The Advanced JS source now maps to registered `browser.realtime-workers`: transport/status errors, socket lifecycle and message validation, worker messaging/clone cost, service-worker install/fetch/scope, cleanup and applied work. Content and source-specific gaps are listed in the full audit. Inventory: 42 EN/RU pairs; JSON cutover and Supabase remain pending.


## Browser capability API checkpoint — 2026-10-26

Added the bilingual browser.capability-apis lesson to supplement-browser-platform. It covers geolocation, clipboard, notifications, battery API limits, ResizeObserver feedback and Page Visibility cleanup. The full source audit records block-level evidence. Catalog count is now 43 EN/RU pairs (26 core + 17 supplementary). This does not close Notion-wide parity or detailed review of every HTML source. Legacy learner routes and source files remain; no cutover/deletion or Supabase implementation has occurred.


## Typed-array / binary-data checkpoint — 2026-10-26

Added bilingual js.typed-arrays-binary to supplement-js-internals. It teaches ArrayBuffer versus typed views, byte units and aliasing, numeric conversion, DataView endianness, transferable ownership, and defensive packet parsing. Source details and evidence IDs are in FULL_SOURCE_CONTENT_AUDIT.md. Catalog count is 44 EN/RU pairs (26 core + 18 supplementary). This is a focused source slice, not completion of the Advanced JS page or the complete Notion/HTML parity audit. HTML learner routes/files remain; no JSON cutover, source deletion, or Supabase work has occurred.


**CI correction — 2026-10-26:** run [40285183316](https://github.com/Mardakhay/interactive-guides/actions/runs/40285183316) on `d187359b32cd95dbc859952032b465853daa554a` caught a test-fixture typo: the line-range test used a literal backslash+n delimiter instead of a newline delimiter, so it counted each walkthrough as one line. The content ranges were valid. The assertion remains intact; only the delimiter is corrected, and the full CI suite must pass on the follow-up SHA.


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


## Source audit continuation — 2026-10-26

Completed full text/code/interaction review of `public/lessons/react-usestate-guide.html` (source 8/25). Its core topics already have deep EN/RU coverage in `react.components-jsx-state`, `react.forms-validation` and `typescript.fundamentals`; exact evidence and residual interaction gap (no migrated remote AI grader) are in `FULL_SOURCE_CONTENT_AUDIT.md`. No duplicate lesson was added. Remaining source-parity and editorial gates remain open; HTML cutover and Supabase have not started.

## Source audit continuation — 2026-10-26

Completed the full content/interaction review of `internet-fundamentals.html` (source 9/25). Added bilingual hosting resource/model trade-offs, feedback check and architecture exercise to `deployment.production-hosting`; updated TLS 1.3 references to RFC 9846. The source-to-block evidence and deliberate corrections to legacy claims are in `FULL_SOURCE_CONTENT_AUDIT.md`. Sixteen HTML sources and the Notion parity gate remain open; no HTML cutover or Supabase work has started.


## Full-content review checkpoint — 2026-10-26

- Fully reviewed HTML source 10/25: `public/lessons/git-workflow-cicd-guide.html` (1,977 lines; 99226 bytes), including all tabs, branch canvas transitions, CI simulator/failure injection, annotated workflow, MR/review examples and 10 quiz questions/feedback.
- Existing bilingual `git.fundamentals` and `git.workflow-ci` lessons cover its content in depth; no duplicate lesson was warranted. Matrix evidence records exact blocks and remaining visual-interaction parity.
- Corrected/documented legacy issues rather than copying them: Git Flow is not universal, PR line thresholds are heuristics, simulator deployment-before-merge conflicts with its YAML, and its floating `@master` action lacks explicit least-privilege permissions.
- 10/25 HTML sources fully reviewed; 15 remain. Current code/test SHA `3156a29de9b951bfd5b25322c2a40bbefa525ac2` passed CI run [40290215609](https://github.com/Mardakhay/interactive-guides/actions/runs/40290215609). Earlier lint failure from a missing test-suite brace was fixed and this run validates the corrected head.


## Full-content review checkpoint — 2026-10-26

- Fully reviewed HTML source 11/25: `public/lessons/css-reference.html` (101171 bytes; 1,435 lines), including code snippets and sidebar search, copy buttons, transition controls, Flexbox/Grid playgrounds, and responsive navigation.
- CSS fundamentals and Flexbox/Grid lessons already cover the substantive topics in both locales, with deeper cascade, box sizing, margin collapse, overflow/intrinsic sizing, reduced motion, accessibility and responsive diagnosis than the reference source. Matrix records exact block evidence; no duplicate lesson was created.
- UI parity is partial because the reference copy/property playground is not recreated as a visual simulator; practice, feedback and debugging move to structured blocks.
- Full HTML source reviews: 11/25; 14 remain. Docs HEAD `e3997b2232158f5433ab6e3ffa78ee8dfb6b57f6` passed CI [40290564642](https://github.com/Mardakhay/interactive-guides/actions/runs/40290564642).


## Deployment source deep-review — 2026-10-27

The complete `deployment-learning.html` source (2,267 lines) has now been reviewed. The existing bilingual `deployment.production-hosting` lesson is v3 with 30 aligned blocks per locale, including a custom-domain/DNS/HTTPS walkthrough, feedback-rich domain-verification check and applied domain-migration plan. The lesson now distinguishes provider-directed apex/subdomain DNS, preserves existing MX/TXT records during nameserver changes, and separates DNS verification from certificate issuance. See `FULL_SOURCE_CONTENT_AUDIT.md` for block-level evidence and deliberate corrections to legacy env-precedence and fixed-timing claims.

This is a full source-content review, not a claim that the old interactive pipeline simulator, provider tabs, copy buttons or live checklist have been recreated. Full reads documented: 13 of 25 HTML sources; the remaining source/Notion parity gate is still open.


## Architecture source deep-review — 2026-10-27

The full `frontend-architecture-and-planning.html` source is reviewed. The bilingual `frontend.architecture-boundaries` lesson is now v3 with 28 aligned blocks, including an explicit colocation/public-API walkthrough, quiz and exercise, a qualified abstraction rule, and responsibility-based tool guidance. UI planning, wireframes, component ownership, state placement and API contracts are mapped to the existing capstone design lesson rather than duplicated. See `FULL_SOURCE_CONTENT_AUDIT.md` for block-level evidence, current official FSD reference and deliberate corrections to absolute claims.

Full HTML reads documented: 14 of 25. Ten further HTML sources and a planned `html-reference.html` re-review remain; Notion source verification is not closed.


## Authentication source deep-review — 2026-10-27

The full `frontend-auth.html` source is reviewed. `frontend.auth-security` is now v2 with 23 aligned EN/RU blocks, adding assessed 401/403 handling, JWT decode-vs-verify, OAuth Code + PKCE, cookie/storage trade-offs, single-flight token refresh and expanded credential-lifecycle threat-model practice. The lesson links current MDN/OWASP references; the old interactive decoder/tabs remain documented UI-parity gaps.

Full HTML reads documented: 15 of 25; nine HTML sources plus the planned `html-reference.html` re-review remain, and Notion source verification is still open.


## Cross-course handbook source review — 2026-10-27

Completed a full review of `frontend-bootcamp-notes.html`. Its scope is a six-month, 24-week survey, not a separate canonical lesson. Both EN/RU bootcamp curricula contain 26 aligned lesson IDs across the 24 weeks; the audit matrix now enumerates the complete mapping to canonical lessons, and no duplicative 24-week JSON copy was added.

Source-specific caveats and the remaining month-tab/answer-reveal UI parity gap are in `FULL_SOURCE_CONTENT_AUDIT.md`. Full HTML reads documented: 16/25; nine other HTML files remain unread, with `html-reference.html` tracked for a separate re-review. Notion source verification remains open.


## Git reference source deep-review — 2026-10-27

The complete `git-reference.html` source has been reviewed. Its broad reference material maps to `git.fundamentals` and `git.workflow-ci`; the former was upgraded to v4 in both locales to clarify README/Markdown essentials and demonstrate publishing the checked-out branch only after inspecting the current branch and team policy. A focused regression check covers the push example and pull-request guard.

The audit records safer recovery semantics, configured GitHub Pages sources, tracked-secret handling, and non-equivalent search/copy UI. Full HTML reads documented: 17/25; seven other unread sources remain plus the planned `html-reference.html` re-review. Notion verification is still open.


## Async JavaScript source and legacy-demo remediation — 2026-10-27

The complete `interactive-async-js.html` review found that existing bilingual `js.async-fetch` and `web.internet-http` lessons already provide the canonical concepts; the old interactive animations and run/reset API widgets are not copied into another lesson. The source's live GET/joke/POST examples did contain risky dynamic `innerHTML` interpolation, and POST treated parseable non-2xx responses as success. Those issues are fixed on the legacy page, with a new regression test for safe `textContent` rendering and HTTP status handling.

Full HTML source reads documented: 18/25; six unread source files and the planned `html-reference.html` re-review remain. Notion source verification is still open.


## Interactive JavaScript book — content mapping and runner isolation — 2026-10-27

The full `js_interactive_book.html` content is mapped to four canonical bilingual lessons (JS fundamentals, functions/arrays/objects, DOM/events, and async/fetch), so no parallel mega-lesson was added. The legacy book had a code editor that ran `new Function` in the page context. It now runs inside a dedicated Web Worker with no DOM access, a 2.5-second execution window, bounded output and cleanup on Reset/re-run; regression tests guard the behavior. Worker isolation does not block all network access.

Full HTML source reviews documented: 19/25. Five source files remain unread plus the planned `html-reference.html` re-review; Notion source verification remains incomplete.


## Material UI masterclass source and version audit — 2026-10-27

Full source review completed. Existing bilingual `ui.bootstrap-mui` is expanded to v4 with version-specific dependency/migration guidance, plus official MUI versions and upgrade-to-v9 links. The MUI masterclass content is mapped to the current component-library/design-system lesson and the dedicated forms/accessibility lessons; no duplicate JSON masterclass was added.

Full HTML source reviews documented: 20/25. Four unread HTML files and the `html-reference.html` re-review remain; Notion source verification is not closed.


## React performance and accessibility source deep-review — 2026-10-27

Completed the full `react-performance-a11y.html` content/code/interaction review and expanded the canonical bilingual `performance.accessibility` lesson to v4 (41 aligned blocks). Added React.lazy named-export and rejected-chunk recovery nuance, plus a native site-navigation disclosure with Escape close and focus return, assessed with a feedback-rich check and practice criteria.

The lesson distinguishes ordinary site navigation from an application-menu role pattern, keeps ARIA separate from keyboard behavior, and avoids repeating fixed package-size/compression claims as current facts. Render/bundle simulators and exact copy/focus UI are documented as non-equivalent interactions. Full HTML reviews documented: 21/25; three HTML sources remain unread plus `html-reference.html` re-review and unverified Notion source mapping.


## SQL source deep-review — 2026-10-27

The complete `sql-learning-page.html` source is reviewed. `data.sql-postgresql` v2 adds assessed SQL dialect/version guidance, current MySQL CHECK enforcement nuance, a transactional UPDATE/RETURNING walkthrough with a rollback decision, DML practice, and views/CASE/set-operation guidance. The old Run Query editor is explicitly documented as a canned string-pattern simulator, not a live SQL database.

The audit records the source's dialect/transaction overgeneralizations and links MySQL 8.4's official CHECK documentation. Full HTML reviews documented: 22/25; two sources remain unread plus the separate `html-reference.html` re-review and open Notion source verification.


## Testing guide source deep-review — 2026-10-27

The full `test.guide.html` source has been reviewed. The canonical `testing.react-testing-library` lesson already maps test levels, matcher intent, RTL query priority, user interactions, async states, mocking and AAA. It is now v4 with assessed Vitest mock lifecycle guidance (`clearAllMocks` vs `resetAllMocks` vs `restoreAllMocks`), global-stub cleanup and practice for order-independent tests.

The audit notes that the source's test-pyramid percentages/100x production-cost ratio are heuristics, not universal measurements, and that Jest-specific setup must not be copied into the repository's Vitest/RTL setup. Legacy tabs/FAQ/quiz UI remains a parity gap. Full HTML reviews documented: 23/25; one HTML source (`ui-design-system-learn.html`) remains unread, plus `html-reference.html` re-review and Notion verification.


## UI design-system source deep-review — 2026-10-27

The full `ui-design-system-learn.html` source is reviewed. The canonical `ui.design-systems` lesson is now v3 with an accessible custom TextField walkthrough, focus-visible guidance, and version-aware guidance for compound components, `forwardRef`, and polymorphic `as`. The existing MUI/Bootstrap and performance/accessibility lessons cover adjacent library and keyboard/focus concerns.

The audit corrects the source's universal library-speed claim and unqualified `forwardRef` guidance, and records that `outline:none` needs a visible replacement. The live token/Button/CSS playgrounds are not recreated one-for-one. Full HTML reviews documented: 24/25; only `html-reference.html` re-review and Notion source verification remain open.


## HTML reference re-review — 2026-10-27

The complete `html-reference.html` source has been re-reviewed. Core concepts are consolidated in the existing `html.document-structure` and `html.forms-accessibility` lesson pair; `html.document-structure` v6 now covers text semantics, anchor/link behavior, meta/Open Graph distinctions, and common global attributes in addition to existing semantic/table/media/iframe coverage.

The review corrects overgeneralized SEO/snippet/heading claims and documents remaining interaction parity for searchable reference, preview tabs and copy controls. All 25/25 HTML sources now have content/code reviews documented. Notion source verification remains incomplete.


## Notion source cross-read checkpoint — 2026-10-27

Fetched the parent handbook, its first three course parts, and the HTML, DOM, CSS, JavaScript and Git reference pages. The content supports a broad topic mapping to the current curriculum, but the Notion metadata for the fetched pages is `verification.state=unverified`. Treat this as source-read/mapping progress only: no formal verification status was asserted or changed, and claim-by-claim fact checking remains open.
