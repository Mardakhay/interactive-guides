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
