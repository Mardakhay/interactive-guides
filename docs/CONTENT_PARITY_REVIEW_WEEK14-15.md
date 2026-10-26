# Source parity review: React forms and shared state

**Updated:** 2026-10-23  
**Structured targets:** `react.forms-validation` (Week 14) and `react.context-shared-state` (Week 15)  
**Status:** focused migration review; not a complete course-source audit.

## Sources reviewed

- [Notion Part 4: React ecosystem](https://app.notion.com/p/3ba855c6fbb08075a08ef30c3ac20d89), including forms/validation and state-management sections previously studied.
- `public/lessons/react-forms-tutorial.html`
- `public/lessons/react-ecosystem-course.html` (forms/state-relevant sections).

Notion connector fetches were marked unverified. HTML source content is treated as instructional input, not as authority where APIs or guidance may be outdated.

## Coverage captured in the embedded EN/RU lessons

| Area | Structured coverage | Remaining review |
|---|---|---|
| Controlled and uncontrolled inputs | Ownership and synchronization trade-offs, input examples | Execute all examples in a current React project |
| Native constraints and custom validation | Constraint attributes, custom rules, accessible feedback | Verify remaining source-specific edge cases and timing nuances |
| Validation timing | Submit/blur/change trade-offs; avoid overwhelming learners | Editorial comparison against every source exercise/quiz |
| React Hook Form | Registration/submission/error flow and when a library helps | Confirm installed/current major-version API before teaching a specific version |
| Shared state | Prop drilling, state ownership, Context and reducer action flow | Test performance boundaries and provide source-linked examples where missing |
| Custom Hooks | Reuse of stateful logic distinguished from shared state | Review all ecosystem-source tabs and revealed answers |
| Practice and checks | Expanded quizzes and scaffolded coding/project exercises with feedback/success criteria | Run code exercises; validate every individual feedback option in both locales |

The EN/RU JSON pairs use matching ordered block IDs/types and are schema-validated by the catalog tests. This is structural evidence only. Keep both lesson pairs in review until the remaining interaction inventory and examples are reconciled; do not infer publication readiness from registration or passing tests.

## Evidence

Lesson content: `src/content/lessons/react.forms-validation/{en,ru}.json` and `src/content/lessons/react.context-shared-state/{en,ru}.json`.  
Audit matrix and remaining source scope: [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md).  
Application entry point: `/:locale/structured-lessons/:lessonId`.
undefined


## Latest overall validation — 2026-10-26

The React forms/shared-state focus of this report is unchanged; both topics remain focused reviews rather than complete parity. The full feature CI currently passes at code/content SHA `17b79e07b8377e8aa92c5aa14305da0062389ac5` in [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) (22 files, 102 tests, lint, typecheck and production build). This validates the content contract/rendering but does not close the source interaction or bilingual editorial gaps listed above. See the full audit for the broader CSS/Git/SQL/deployment continuation status.

## Overall project checkpoint — 2026-10-26

Focused React forms/shared-state status above is unchanged. The latest full Actions run [#40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed at code/content SHA `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902` (102 tests/22 files, lint, typecheck and build). That result does not close the remaining forms/state source interaction and bilingual editorial gaps or the broader audit.

## Overall checkpoint — 2026-10-26

The focused forms/shared-state audit above is unchanged; the broader structured content has also gained DOM, deployment and network deep dives. GitHub Actions [run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588) passed on code/content SHA `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1`. This does not close the source interaction or bilingual editorial gaps in Week 14/15 or the remaining course.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.undefinedundefined

## Latest source work — 2026-10-26

Beyond the Week 14/15 forms/shared-state review, targeted source-derived depth now includes DOM observers, API client semantics, React external effects, and UI-library forms. Concrete evidence is in `FULL_SOURCE_CONTENT_AUDIT.md`. These additions do not close all legacy HTML mapping; routes remain unchanged until the full source gate passes.


## Additional parity finding — 2026-10-26

HTML document structure now includes semantically correct data tables and media alternatives/captions, while CSS fundamentals adds the margin-collapse cases discussed in the source notes. These concepts were not part of the Week 14/15 React audit. Their bilingual block evidence and tests are in `FULL_SOURCE_CONTENT_AUDIT.md`; global source parity remains pending.


## Git/CI continuation — 2026-10-26

The Git workflow lesson now explicitly differentiates continuous delivery from continuous deployment and explains branch protection as enforcement separate from CI reporting. The legacy pipeline simulator is represented as a structured, feedback-bearing coding scenario. The all-source gate remains open.

## Cross-course content checkpoint — 2026-10-26

Although this document focuses on React forms/shared state, the broader parity pass also added `js.iterators-generators` from the Advanced JS Notion source. Its EN/RU JSON is registered in the JS internals track and contains focused walkthroughs, quizzes, cleanup edge cases and applied practice. This does not change the Week 14–15 audit scope or imply that remaining Notion/HTML sources have passed; see `FULL_SOURCE_CONTENT_AUDIT.md`. Legacy learner routes remain until the full audit supports JSON cutover, after which Supabase progress can be implemented.

## Broader source-depth note — 2026-10-26

The cross-course pass now also includes a bilingual `js.collections-weakmaps` supplement based on the separate Map/Set/WeakMap/WeakSet sections of Advanced JS. It teaches key identity, ordering, weak-collection limits and an applied aggregation task, while the source's broader APIs remain only partially covered. Detailed evidence is in `FULL_SOURCE_CONTENT_AUDIT.md`; this remains separate from the Week 14–15 React audit and does not mean the all-source gate has passed.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## Broader content progress — 2026-10-26

The broader source pass now also includes a registered bilingual regex supplement with walkthroughs, quizzes and applied practice. It is only partial parity with Advanced JS; see `FULL_SOURCE_CONTENT_AUDIT.md`. This update does not change the Week 14–15 scope and does not close the all-source or JSON-cutover gates.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.

## Broader source progress — 2026-10-26

The broader source pass also added a dedicated bilingual browser-storage/IndexedDB lesson; its source map and partial-coverage evidence are in `FULL_SOURCE_CONTENT_AUDIT.md`. It does not change the React Week 14–15 scope and does not mean the global content gate is complete. App progress persistence still waits on the JSON learner-flow cutover.

## Verification checkpoint — 2026-10-26

Browser-storage lesson code SHA `7915276b6514a56a3a700c0ba488b784e348754b` passed lint, typecheck, test suite, and production build on [CI run 40282414157](https://github.com/Mardakhay/interactive-guides/actions/runs/40282414157). The documentation checkpoint `97008a25d5312fe207756e6a6061f3d75bd72a7b` also passed the same required checks on [CI run 40282496515](https://github.com/Mardakhay/interactive-guides/actions/runs/40282496515). The next content/docs checkpoint will receive a fresh exact-HEAD run.

## Broader source progress — 2026-10-26

Outside this document's React scope, the core JavaScript lesson gained array destructuring, rest/spread, optional chaining and nullish behavior from the Advanced JS source. Its parity remains partial; evidence is in `FULL_SOURCE_CONTENT_AUDIT.md`. This does not close the all-source gate.

## Broader JavaScript source note — 2026-10-26

The broader Advanced JS pass added explicit function receiver/call/apply/bind and strict-mode lessons in `js.object-prototypes`; the mapped coverage remains partial. It does not change the Week 14–15 audit scope or close the full-source gate.

## Broader content progress — 2026-10-26

The broader JavaScript/browser pass now includes a source-mapped bilingual networking/workers lesson. It remains partial against Advanced JS; see `FULL_SOURCE_CONTENT_AUDIT.md`. This does not change Week 14–15 scope or close the all-source gate.


## Browser capability API checkpoint — 2026-10-26

Added the bilingual browser.capability-apis lesson to supplement-browser-platform. It covers geolocation, clipboard, notifications, battery API limits, ResizeObserver feedback and Page Visibility cleanup. The full source audit records block-level evidence. Catalog count is now 43 EN/RU pairs (26 core + 17 supplementary). This does not close Notion-wide parity or detailed review of every HTML source. Legacy learner routes and source files remain; no cutover/deletion or Supabase implementation has occurred.


## Typed-array / binary-data checkpoint — 2026-10-26

Added bilingual js.typed-arrays-binary to supplement-js-internals. It teaches ArrayBuffer versus typed views, byte units and aliasing, numeric conversion, DataView endianness, transferable ownership, and defensive packet parsing. Source details and evidence IDs are in FULL_SOURCE_CONTENT_AUDIT.md. Catalog count is 44 EN/RU pairs (26 core + 18 supplementary). This is a focused source slice, not completion of the Advanced JS page or the complete Notion/HTML parity audit. HTML learner routes/files remain; no JSON cutover, source deletion, or Supabase work has occurred.


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
