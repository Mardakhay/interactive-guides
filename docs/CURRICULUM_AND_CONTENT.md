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
