# Curriculum and Content Model

## Canonical curriculum

The supplied ABB bootcamp syllabus is the canonical core-track order. It covers six months and 24 weeks. The application may include optional supplementary modules, but must label them as extensions rather than silently placing them inside the original syllabus.

### Month 1 — Web Fundamentals & Layout
- Week 1: internet, browser, HTTP, URL, request/response; HTML document structure and semantic elements. Practice: About Me page and DevTools.
- Week 2: forms, input attributes, labels, accessibility basics. Practice: login/register layout.
- Week 3: CSS authoring, selectors/specificity, box model, display. Practice: landing page.
- Week 4: Flexbox, Grid, media queries, mobile-first. Month project: responsive landing page.

### Month 2 — JavaScript Core & Git
- Week 5: let/const, primitives, operators, conditionals and loops. Practice: array/condition/loop tasks.
- Week 6: functions, declarations vs expressions, arrow functions, map/filter/reduce/find/some/every, objects, destructuring and spread. Practice: dataset exercises.
- Week 7: DOM selection/manipulation and click/input/submit events. Project: DOM To-do app.
- Week 8: Promises, async/await, fetch/public APIs; Git init/add/commit/push/.gitignore. Project: API-driven page published to own repository.

### Month 3 — Tooling, TypeScript & Intro to React
- Week 9: Node.js, npm/yarn, Vite/Create React App concepts, ESLint/Prettier. Practice: configured project.
- Week 10: TS annotations, unknown/any, interface/type, optional/union, basic generics. Practice: typed user list.
- Week 11: React components, JSX, props, function components, useState. Practice: counter and to-do.
- Week 12: useEffect, composition, prop drilling, list rendering and keys. Project: API-driven News/Posts list with loading/error states.

### Month 4 — React Ecosystem
- Week 13: SPA and React Router Routes/Link/useParams. Practice: Home/About/Posts SPA.
- Week 14: controlled/uncontrolled forms, validation and React Hook Form. Practice: form with validation messages.
- Week 15: Context API, lifting state, prop drilling and simple global state. Practice: theme and user state.
- Week 16: service/API layer, custom hooks, error handling and retry concepts. Project: searchable/filterable dashboard using multiple APIs.

### Month 5 — UI Systems, Performance, Accessibility, Testing and Workflow
- Week 17: UI library, reusable Button/Input/Modal, component props and variants. Practice: mini UI kit.
- Week 18: memoization concepts, lazy loading, keyboard/ARIA/accessibility. Practice: improve bundle/routing performance.
- Week 19: why tests, unit/integration, Jest vocabulary and React Testing Library render/screen/userEvent. Practice: component tests.
- Week 20: feature/hotfix/release branches, pull/merge requests, reviews and CI/CD. Practice: simulated review workflow.

### Month 6 — Capstone and Professional Skills
- Weeks 21–22: requirements, user stories, Figma/wireframes, endpoints/pages/component tree, sprint plan.
- Week 23: feature-based structure, API, routing, forms, state, CRUD/basic auth if required, critical tests.
- Week 24: code review, refactoring, QA, performance/accessibility, demo and technical Q&A.

## Additional topics the user requests

These are explicitly in scope for the expanded platform but are not all separate weeks in the original supplied bootcamp syllabus. Create supplementary lessons and label them honestly:

- Deeper JavaScript engine concepts: execution contexts, call stack, hoisting, TDZ, scope, lexical environments, closures, stack/heap and garbage collection.
- Additional CSS/HTML/browser reference and accessibility.
- TypeScript beyond introductory types.
- Vite/build tooling internals, package manager trade-offs, lockfiles, dependency lifecycle.
- Project architecture and folder boundaries.
- Authentication and authorization: threat model, sessions/tokens, OAuth/OIDC, route guards versus server authorization.
- Deployment, hosting, environment variables, DNS/TLS and CI/CD deployment.
- SQL/PostgreSQL basics for frontend developers.
- Supabase auth/data/RLS/integration, when useful to the product and learner track.
- Further React patterns, forms, API error handling, retries, performance and testing.

Do not claim that every supplementary topic was part of the original ABB syllabus.

## Bilingual content rules

- Locale IDs: `en`, `ru`.
- Stable topic and lesson IDs across locales, e.g. `js.execution-context`.
- Metadata and body have parallel translation files.
- Content is translated as an equivalent lesson, with the same examples, requirements, correct answers and difficulty. Some explanations may require language-specific phrasing.
- Keep keywords/API names canonical; explain them in the surrounding language.
- Lesson status has three states: draft, review, published. A lesson is not published into the core curriculum until both language versions pass review or a documented exception is made.
- Avoid duplicating code just to translate prose. Code examples have language-independent code blocks plus separate localized explanation text when possible.

## Standard lesson template

Every lesson should include these sections, when relevant:

1. Metadata: ID, title, locale, version, status, author/reviewer, updated date, estimated time, difficulty, tags.
2. Why this matters; prerequisites.
3. Explicit, observable learning outcomes.
4. Core mental model and terminology.
5. Detailed conceptual explanation.
6. Mechanism: what happens step by step.
7. Worked examples, explained line by line.
8. Variants, edge cases, misconceptions and debugging.
9. A practical scenario linked to real frontend work.
10. Knowledge checks, with detailed feedback for every option.
11. Coding practice (where relevant): task, constraints, starter code, observable requirements, tests/rubric, hints and deferred solution.
12. Reflection / explain-it-yourself prompt.
13. Summary, trade-offs and interview explanation.
14. References to primary documentation and related lessons.

A lesson may combine sections into a coherent narrative; the template is a quality checklist, not a reason to add filler. The content must be substantial enough to teach the concept and not merely link elsewhere.

## Lesson mastery

- Reader milestones and lesson completion are separate from demonstrated knowledge.
- Use formative checks throughout.
- Practice-required lessons require at least one successful independent attempt, not just visiting or clicking complete.
- Track quiz attempts and coding rubric results separately.
- Revisit weak concepts via review queues, without auto-labeling unverified mastery.

## Content migration

- Inventory each legacy HTML file.
- Extract content into a source inventory; map sections/code/diagrams/exercises/answers/references.
- Identify outdated, duplicated, inaccurate or unsupported claims.
- Verify technical assertions with current official documentation. Preserve source-specific claims as source-derived until verified.
- Rewrite as original instructional prose, retaining useful detailed explanations.
- Create English and Russian versions.
- Create structured block content and quiz/exercise data.
- Validate schemas, links, code-block languages, answer keys, translation completeness and curriculum links in CI.
- Retain old HTML as a temporary migration reference until the structured replacement is reviewed in both locales.

## Implementation status — 2026-10-23

The curriculum and lesson template above remain the target, not the implemented application model. The current feature branch still has the 25-item legacy catalog and HTML loader; it does not yet expose a complete 24-week bilingual sequence or consume structured SQL/hosting supplements. Notion and legacy source mappings, confidence limits, and concrete coverage gaps are recorded in FULL_SOURCE_CONTENT_AUDIT.md. Counts and mappings distinguish discovered/inventoried sources from content fully read and migrated.


## Embedded content implementation checkpoint — 2026-10-23

The bilingual React content reader now exposes the canonical 24-week curriculum at `/:locale/structured-lessons` and lesson text at `/:locale/structured-lessons/:lessonId`. The repository registers 26 core lesson IDs (52 EN/RU files) plus 11 separately labeled supplementary IDs (22 EN/RU files), including the capstone stages. Lessons are structured content blocks rendered in-app; standalone HTML remains migration/source material, not the embedded lesson format.

This does not mean all 25 legacy HTML sources or all Notion details have been fully audited and migrated. The current source-depth limits and exact follow-up inventory are in `FULL_SOURCE_CONTENT_AUDIT.md`; keep lesson status at review until the topic examples, edge cases, exercises, feedback, and EN/RU quality are verified against sources.


**Validation note (2026-10-23):** at code SHA `132636c4007141454a903e815d6f0418a3c511b0`, lint/typecheck, 92 tests, production build and `git diff --check` passed locally. The repository bundle triggers Vite's >500 kB chunk warning. Source parity is still open; see the audit matrix.


## Current implementation and migration status — 2026-10-26

The application now presents the 24-week core curriculum plus separately labeled supplementary tracks through the bilingual structured reader. There are 26 core and 11 supplementary lesson IDs (74 EN/RU JSON files); content is embedded through the React renderer rather than delivered as standalone lesson HTML.

Recent deepening: CSS fundamentals v3 (53 blocks / 5 checks / 5 walkthroughs / 3 exercises per locale); Git fundamentals v3 (38 blocks), Git workflow/CI v3 (37 blocks); SQL/PostgreSQL (35 blocks); and production hosting (21 blocks / 3 walkthroughs / 2 checks / 2 exercises). Deployment now teaches build output and hash caching, Vite env resolution and build-time values, host-specific SPA fallback, failure isolation, and release recovery. Source behavior that is not represented one-to-one remains documented as partial/deferred.

CI [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed at code/content SHA `17b79e07b8377e8aa92c5aa14305da0062389ac5`. This does not certify source parity: 21 Notion fetches remain unverified; all 25 legacy HTML sources are inventoried, but only selected sources have focused deeper parity notes. Keep review states until technical and bilingual editorial review is complete.

## Latest curriculum/content checkpoint — 2026-10-26

The DOM week-7 core lesson `js.dom-events` is version 3, 35 blocks per locale: 7 walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises. New content traces node vs element collections, initial HTML attributes versus current DOM properties and native form reset, and capture/target/bubble order. The EN/RU structure test now asserts this inventory. Actions [run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed on code/content SHA `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902`.

This expands lesson depth but does not complete `dom-masterclass.html` parity: source playgrounds and the final Card Manager are not represented one-to-one. The full audit matrix records evidence and remaining work. All 25 legacy files remain available; keep content in review.

## Current network lesson update — 2026-10-26

`network.dns-tcp-tls` now includes a 22-block bilingual explanation with an HTTP/2/HTTP/3 walkthrough, feedback-rich knowledge check and independent diagnostic exercise. It distinguishes HTTP semantics, HTTP/2 frame multiplexing over TCP, TCP in-order delivery, and QUIC stream loss isolation; citations point to IETF RFC 9113, 9114 and 9000. The old source claim that HTTP/2 removes head-of-line blocking is not carried forward.

The lesson and overall source audit remain in review. CI [run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588) passed on code/content SHA `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1`.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## Continuation checkpoint — 2026-10-26

Supplementary content quality review identified three short/underdeveloped candidates and added bilingual depth blocks to architecture boundaries, Sass/SCSS and object prototypes. Their updated lessons now include explanations, concrete walkthroughs, edge cases, feedback-bearing checks and applied exercises. The remaining supplements and the complete 26-lesson core still require semantic review against the source matrix; structural parity alone is not a completion criterion.

Source IDs and registrations remain unchanged. Do not remove existing JSON lessons or legacy HTML files during this content pass. The app cutover and Supabase work are deliberately sequenced after the content gate.


## Content continuation — 2026-10-26

Supplementary curriculum registration is unchanged. Four EN/RU lesson pairs have source-derived depth additions in this continuation; their concrete content IDs and concept coverage are listed in `FULL_SOURCE_CONTENT_AUDIT.md`. The UI ecosystem supplement now distinguishes Bootstrap CSS grid/utilities and JavaScript-driven collapse from MUI's React component/theme approach and includes version-aware, accessible component practice. No legacy files were removed and learner routes have not yet been switched.


## Source-derived lesson updates — 2026-10-26

In addition to the four supplements deepened previously, `js.dom-events`, `react.api-custom-hooks`, and `react.effects-lists-composition` now contain bilingual worked examples, feedback checks and applied exercises for source gaps. The UI ecosystem lesson includes MUI form-component integration alongside Bootstrap behavior. These are targeted updates with explicit block IDs; no curriculum IDs changed and no content was removed.


## HTML/CSS source-derived additions — 2026-10-26

The HTML document lesson now covers semantic data tables and accessible media; CSS fundamentals now explains vertical margin collapsing in normal flow versus flex/grid. This preserves the core IDs and adds only source-derived sections. Detailed evidence and remaining parity work are tracked in `FULL_SOURCE_CONTENT_AUDIT.md`.


## Git/CI content update — 2026-10-26

`git.workflow-ci` now includes a pipeline walkthrough and feedback quiz for CI versus continuous delivery/deployment plus a practical fail/fix/approval/release scenario. Tests preserve EN/RU structure and assert the new task's exact SHA and rollback criteria. Remaining legacy source parity is tracked in `FULL_SOURCE_CONTENT_AUDIT.md`.

## Curriculum checkpoint — 2026-10-26

The `supplement-js-internals` track now includes the EN/RU lesson `js.iterators-generators` (order 3), registered in the repository and both curriculum locale files. It adds generator execution, iterator protocol, return/completion, lazy-vs-eager consumption, cleanup, async generators and applied practice. Current inventory: 26 core + 12 supplementary = 38 bilingual pairs. Source parity remains an active gate; HTML learner routes remain in place until the complete audit supports a safe JSON cutover. Supabase follows that cutover, not this checkpoint.

## Supplementary curriculum checkpoint — 2026-10-26

`supplement-js-internals` now registers `js.collections-weakmaps` (order 4) in English and Russian, following the new iterators/generators lesson. It teaches Map/Set identity and ordering plus WeakMap trade-offs through three walkthroughs and a cart aggregation exercise. The source's full method-by-method treatment remains only partially covered. Inventory: 26 core + 13 supplementary IDs (39 bilingual pairs). Full parity is still a gate before HTML-backed route removal; Supabase follows only after cutover.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## Curriculum inventory update — 2026-10-26

The `supplement-js-internals` track now includes bilingual `js.regex-text-processing` at order 5. It adds regex matching/capture walkthroughs and applied text extraction without treating regex as universal validation. Notion source parity for the many individual regex examples is still partial. Total registered content is 26 core + 14 supplementary = 40 EN/RU pairs.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.

## New browser-storage track — 2026-10-26

Both curricula now include `supplement-browser-storage` with bilingual `browser.storage-indexeddb`. The 19-block lesson covers browser storage decisions and transactional IndexedDB practice; source parity remains partial. Inventory: 26 core + 15 supplementary = 41 bilingual pairs. This lesson does not replace or preempt the later project decision to persist user progress in Supabase after learner-flow cutover.

## Verification checkpoint — 2026-10-26

Browser-storage lesson code SHA `7915276b6514a56a3a700c0ba488b784e348754b` passed lint, typecheck, test suite, and production build on [CI run 40282414157](https://github.com/Mardakhay/interactive-guides/actions/runs/40282414157). The documentation checkpoint `97008a25d5312fe207756e6a6061f3d75bd72a7b` also passed the same required checks on [CI run 40282496515](https://github.com/Mardakhay/interactive-guides/actions/runs/40282496515). The next content/docs checkpoint will receive a fresh exact-HEAD run.

## Core JavaScript learning update — 2026-10-26

The core lesson `js.functions-arrays-objects` now includes bilingual examples of array destructuring, rest/spread, optional chaining and nullish defaults, plus a partial-response exercise. No curriculum ID was added; the existing core sequence is preserved. EN/RU are both 71 blocks. Source parity remains partial; catalog total remains 41 bilingual pairs.

## Supplementary lesson depth — 2026-10-26

`js.object-prototypes` retains its ID/track and now teaches call/apply/bind and strict-mode behavior through bilingual examples, two new checks and one applied invoice task. Lesson pair inventory remains 41; source parity for every strict-mode nuance remains partial.

## Browser platform supplement — 2026-10-26

Both curricula register `supplement-browser-platform` with bilingual `browser.realtime-workers`. The lesson retains source/API distinctions and practical cleanup work. Inventory: 26 core + 16 supplementary = 42 bilingual pairs. It is an educational supplement; it is not the app's progress persistence implementation.


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


## Advanced package-tooling supplement — 2026-10-27

`tooling.advanced-package-workflows` v2 now adds source-derived coverage for the Advanced JS Notion page's tooling subsection: npm scripts, toolchain responsibility boundaries, a repository-specific check workflow, an assessed question and a practical command/config review. It differentiates Vite transpilation from TypeScript type checking, bundling from compilation, and lint/format/test responsibilities. Webpack/Babel/Jest examples from the source are discussed as alternatives, not mandatory dependencies. Remaining Advanced JS subtopics and interaction parity stay open.


## Regex supplement source deepening — 2026-10-27

`js.regex-text-processing` v2 now maps the Advanced JS Notion subsection's remaining practical examples (phone/password patterns, URL/hashtag extraction, whitespace normalization) and the `RegExp` constructor case where dynamic input must be escaped. The lesson documents `d/g/i/m/s/u/v/y` flags with current MDN references and explicitly limits what each format pattern proves. Broader Advanced JS source parity remains open.


## Map/Set/Symbol supplement deepening — 2026-10-27

`js.collections-weakmaps` v2 adds the Notion subsection's Map method/iteration patterns, Set union/intersection/difference, and Symbol uniqueness/global registry/property visibility plus `Symbol.iterator`. The applied check rejects treating Symbol keys as private. The complete Advanced JS reference page still has unrelated source-mapping gaps.


## Memoization and cache lifetime — 2026-10-27

`js.runtime-memory` v3 maps the Advanced JS Notion memoization subsection with an explicit cache-key selector, a deterministic numeric example, and an applied task that tests whether all output-affecting inputs participate in the key. It corrects the source's naive recursive Fibonacci wrapper and unqualified JSON.stringify key strategy. TTL and asynchronous cache behavior are covered as risks, but not yet as a complete implementation.


## DOM throttle continuation — 2026-10-27

`js.dom-events` v5 now provides a worked leading-edge throttle for scroll signals, documents the dropped-intermediate-call behavior, demonstrates a passive listener and same-reference teardown, and assesses the cleanup contract. The existing async/API-hook lesson continues to own debounced search and request cancellation; the legacy interaction widgets are not claimed as fully duplicated.


## Week-17 UI-library alignment — 2026-10-28

The canonical week-17 syllabus explicitly includes “UI libraries such as Chakra UI or MUI”. Previously, `ui.design-systems` was mapped to core week 17, while the separate bilingual `ui.bootstrap-mui` lesson (Bootstrap grid and Material UI theming) was incorrectly categorized as supplementary. The feature branch now maps both lessons to `month-5-week-17` in both locales, in sequence: design-system thinking, then UI-library selection/theming. The supplementary UI-ecosystem track is narrowed to `css.sass-scss` (modules, mixins, compile-time tokens and CSS custom properties).

A repository regression test protects this mapping. This is a focused traceability correction, not completion of the full outcome-by-outcome syllabus audit or visual-interaction parity review.


## Full-registry learning-outcome localization guard — 2026-10-28

The structured repository currently registers 44 lesson IDs with EN/RU locale files (27 core and 17 supplementary). A repository regression checks that RU titles and descriptions contain Russian text, the EN/RU learning-outcome counts match, and no Russian outcome is an exact English copy or entirely non-Cyrillic. The check surfaced two English-only outcomes in `js.runtime-memory`; these are translated in both-current v5 lesson records. This is an automated guard for obvious localization regressions, not a semantic/editorial sign-off for every sentence or a complete outcome-to-syllabus audit.

The code/content SHA `cc68eaa8c28cb9e96a1f348a163fdaa44768b873` passed exact-head CI [run #40688503193](https://github.com/Mardakhay/interactive-guides/actions/runs/40688503193): install, lint, typecheck, 221 tests in 35 files, production build and 125-chunk bundle budget checks; npm audit reported zero vulnerabilities. The later documentation checkpoint must receive its own exact-head CI result.
