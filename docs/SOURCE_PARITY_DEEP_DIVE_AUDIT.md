# Source-Parity Deep-Dive Audit

**Date:** 2026-10-23  
**Branch:** `feat/learning-platform-foundation`  
**Baseline before this audit:** `eb93d8560f0c77406bacc6c337c75de7587c7716`

## Purpose and definition of done

The new course must teach the same useful concepts as the user's Notion notes and legacy interactive HTML—not merely have matching lesson titles or structurally valid JSON. A topic is not migrated just because a lesson mentions its name.

For each source topic, the review should capture:
1. Mental model and why it matters in frontend work.
2. Mechanism/sequence, not only a definition.
3. A worked example with line-by-line reasoning or a state trace.
4. Edge cases, common misconceptions, and debugging.
5. A substantive knowledge check with explanatory feedback for distractors.
6. Independent practice with observable acceptance criteria and progressive hints.
7. EN/RU content parity and valid internal lesson navigation.
8. Technical review against current primary documentation; practical execution where the environment supports it.

## Notion sources examined

| Notion source | Topic scope | Planned structured destination(s) |
|---|---|---|
| [Frontend-dev: full reference guide](https://app.notion.com/p/3ba855c6fbb08124942bf8feb97cab39) | Course overview, six parts and conceptual sequence | Curriculum/source index; do not duplicate the whole guide as a lesson |
| [Part 1 — Web, HTML, CSS](https://app.notion.com/p/3ba855c6fbb081449279d5d844bebebb) | DNS/network and HTTP, HTML semantics, forms/a11y, CSS cascade/box model, Flexbox/Grid/responsive | `web.internet-http`, `html.document-structure`, `html.forms-accessibility`, `css.fundamentals`, `css.flexbox-grid-responsive`, plus network/browser supplements |
| [Part 2 — JavaScript and Git](https://app.notion.com/p/3ba855c6fbb081689521c816fd0fc1cf) | Values/types/coercion, declarations/hoisting, functions, arrays/objects, closures, DOM/events, async/Fetch, Git commands | `js.basics-types-control-flow`, `js.functions-arrays-objects`, `js.dom-events`, `js.async-fetch`, `git.fundamentals`, plus JS internals supplement |
| [Part 3 — Tooling, TypeScript, React intro](https://app.notion.com/p/3ba855c6fbb0809f8129c462c3abab56) | Node/npm, lockfiles/SemVer, ESLint/Prettier, Vite, TypeScript types/generics, JSX/props/state/effects | `tooling.node-npm-vite`, `typescript.fundamentals`, `react.components-jsx-state`, `react.effects-lists-composition` |
| [Part 4 — React ecosystem](https://app.notion.com/p/3ba855c6fbb08075a08ef30c3ac20d89) | SPA/router, forms/validation/RHF, state ownership/Context/reducer/custom Hooks, API/services/server state | `react.router-spa`, `react.forms-validation`, `react.context-shared-state`, `react.api-custom-hooks` |
| [Part 5 — UI/performance/a11y/testing/workflow](https://app.notion.com/p/3ba855c6fbb080209b86c53883286823) | Design systems, measured optimization, accessibility, RTL/Jest, PR/review/CI and branching | `ui.design-systems`, `performance.accessibility`, `testing.react-testing-library`, `git.workflow-ci` |
| [Part 6 — Architecture/professional practice](https://app.notion.com/p/3ba855c6fbb0806f87fdfb52ad902ce4) | Project boundaries, stories/acceptance criteria, refactoring, review, SOLID and demos | `capstone.requirements-discovery`, `capstone.design-architecture-planning`, `capstone.implementation`, `capstone.review-demo` |
| [HTML](https://app.notion.com/p/339855c6fbb0816099feeb7ffa3c2938) | Document skeleton, text/media/tables/forms/semantics | `html.document-structure`, `html.forms-accessibility` |
| [CSS](https://app.notion.com/p/339855c6fbb081d28720cea322987271) | Selectors, specificity, box model, display/position, colors/typography, Flexbox/Grid/transitions | `css.fundamentals`, `css.flexbox-grid-responsive` |
| [JavaScript](https://app.notion.com/p/339855c6fbb081398da1f00ab2e359cb) | Syntax and core language, values, conditions, functions, arrays, loops, iterators | `js.basics-types-control-flow`, `js.functions-arrays-objects` |
| [Advanced JS](https://app.notion.com/p/339855c6fbb081d0b8d1fd0a61851207) | Destructuring/spread/rest, Map/Set/Symbol, iterators/generators, weak collections, closures, prototypes, `this`, DOM/storage/Web APIs | `js.functions-arrays-objects`, `js.dom-events`, future object-model/browser-API supplements |
| [JS full guide](https://app.notion.com/p/339855c6fbb08109bac0c8e4191bf9f6) | Detailed language reference including lexical grammar, numeric/string edge cases, types and execution | Core JS lessons; use as a reference, not as proof of lesson completeness |
| [How JavaScript works](https://app.notion.com/p/3ab855c6fbb081d1bb86eca789beb634) | Execution context, creation/execution phases, stack, hoisting, TDZ, scope, lexical environment/scope chain; further engine internals | `js.basics-types-control-flow` prerequisites + dedicated supplementary JS-runtime lessons |
| [DOM](https://app.notion.com/p/339855c6fbb081f09262fdee7ddb51b5) | Nodes/elements, selector return types, traversal/manipulation, attributes/properties, events and delegation | `js.dom-events` |
| [GIT](https://app.notion.com/p/339855c6fbb08107932add7691c6cf8f) | Working tree/index/commits, reset/revert/stash, remotes/branches, GitHub Flow/rebase/ignore | `git.fundamentals`, `git.workflow-ci` |
| [Internet Fundamentals](https://app.notion.com/p/339855c6fbb081ff938ccc83a1224e76) | DNS, IP/TCP/UDP, HTTP versions, TLS, ports/sockets, hosting, browser/rendering/security | `web.internet-http`, `network.dns-tcp-tls`, `browser.rendering-pipeline`; hosting remains explicit follow-up |
| [Sass/SCSS](https://app.notion.com/p/339855c6fbb08179b2a9f4dcf2db09f4) | Variables, nesting, maps/lists, mixins/functions/control directives, imports/partials, extend | Supplementary CSS tooling lesson or explicit optional reference; not a core-week requirement |
| [Bootstrap](https://app.notion.com/p/339855c6fbb08190a929eb379c4615de) | Grid, breakpoints, utilities and standard components | Optional library supplement; version check needed |
| [SQL](https://app.notion.com/p/339855c6fbb0813293b0f2eab944595e) | Relational model, SELECT/filter/sort/aggregate/JOIN, DDL/DML, constraints/views/set operations | Supplementary SQL/PostgreSQL track, not an original core week |
| [Master Prompt](https://app.notion.com/p/3f7855c6fbb08049a666fa447a34232a) | Explicit teaching format: intuition, precise theory, code analysis, checks, independent practice and cumulative review | Quality bar across lesson pairs, especially the JS internals sequence |
| English assessment | Interview English, not frontend curriculum | Keep outside technical lesson destinations |

## Legacy HTML inventory: source concepts that must not be lost

The complete filenames remain under `public/lessons/`. This is a topic inventory from inspecting the HTML headings, code samples and visible interactive controls; it does not claim every paragraph and every conditional browser interaction has been line-by-line reconciled yet.

| Legacy HTML | Source concepts / interactions observed | Structured destination or disposition |
|---|---|---|
| `internet-fundamentals.html` | 78 headings; DNS hierarchy/cache; IP/TCP/UDP; HTTP 0.9–2; TLS; sockets/ports; hosting/resources; browser engines; rendering and sandbox/security sections | `web.internet-http`, `network.dns-tcp-tls`, `browser.rendering-pipeline`; hosting/resource mapping must be made explicit |
| `html-reference.html` | 46 headings; document/metadata, text, links/images, tables, forms/input types, semantic regions, media, global attrs and quick reference; copy/code/preview controls | `html.document-structure` + `html.forms-accessibility`; reference-only details need deliberate retention/triage |
| `css-reference.html` | 43 headings; selectors, visual rules, box model, display/position, color/typography, transitions/transforms, Flexbox/Grid, responsive, functions, accessibility/compatibility | `css.fundamentals` + `css.flexbox-grid-responsive`; retain practical selectors/layout examples |
| `dom-masterclass.html` | 50 headings; node explorer, selector practice, static/live collections, traversal lab, `innerHTML`/XSS demo, attributes/properties, theme switcher, DocumentFragment, Todo creation, propagation/delegation, MutationObserver/IntersectionObserver/custom events | `js.dom-events`; preserve concept progression and turn each useful simulation into traceable walkthrough/practice |
| `js_interactive_book.html` | 82 headings; syntax/types, operators, conditions, functions, scope, arrays/loops/iterators, objects/classes, Promises, async/fetch, errors/debugging, modules, destructuring/spread, Map/Set, closures, prototypes, `this`, generators, DOM/events/memory; quizzes and runnable examples | JS core lessons + future dedicated object-model/runtime lessons; do not compress advanced topics into one short block |
| `js-deep-dive.html` | 24 headings; object identity/mutation, keys/methods, prototype chain lookup tracer, `Object.create`, constructors, actual `new` steps, classes/inheritance/private fields, progressive exercises/hints/solutions | Supplementary JavaScript object/prototype model lesson needed; map initial concepts to `js.functions-arrays-objects` without pretending the whole deep-dive is covered |
| `js-memory-mastery.html` | 48 headings; stack/heap model, call stack/overflow, execution contexts, scope, shallow/deep copy, `const`, GC/mark-and-sweep/reachability/leaks, V8 hidden classes/inline caching, closures and object identity; live simulations | Supplementary JS runtime/memory lesson needed; Notion “How JavaScript works” is a primary source for cross-reference |
| `interactive-async-js.html` | 37 headings; sync/async traces, event-loop animation, Promise states/chains/static combinators, error handling, async/await, sequential vs parallel, Fetch/REST/Response/JSON, UI request states, quizzes/challenge | `js.async-fetch`; verify a genuinely step-by-step event-loop trace, combinator trade-offs and realistic request-state practice |
| `git-reference.html` | 63 headings; working tree/index/repo, basic workflow, undo/reset/revert/stash/amend/aliases, branch use, remotes/GitHub Flow, collaboration/Markdown/Pages/PR guidance/rebase/.gitignore | `git.fundamentals`, `git.workflow-ci`; explicitly teach which commands rewrite history and their recovery/safety implications |
| `git-workflow-cicd-guide.html` | 57 headings; branch types, protection/CI gate, SemVer, merge vs rebase, GitFlow/GitHub Flow/trunk-based, PR lifecycle/size/checklist, review feedback quality, CI pipeline simulator/GitHub Actions | `git.workflow-ci`; interactive pipeline and strategy comparison should become an exercise/check, not only terms |
| `intro.dev.html` | 5 chapters; npm/package-manager version choices, TS fundamentals/utility types, React state/effects, npm integration and Vite pipeline; chapter gates | `tooling.node-npm-vite`, `typescript.fundamentals`, React fundamentals/effects |
| `react-usestate-guide.html` | 34 headings; plain-variable re-render bug, useState mental model, types, immutable array/object updates, render snapshot, functional updates, controlled forms, TS, five challenges and quiz | `react.components-jsx-state`; retain state-snapshot and stale-update reasoning, not just Hook syntax |
| `react-hooks-guide.html` | 31 headings; effect lifecycle/dependencies/cleanup, API/timer/listener/storage effects, lifecycle simulator, composition, prop drilling, children/layout/slots, stable keys, derived state vs effects, code challenges | `react.effects-lists-composition`; require cleanup/race/key-identity debugging practice |
| `react-forms-tutorial.html` | 61 headings; controlled/uncontrolled, multi-field handler, native/custom/server validation, timing, RHF full example, best practices/mistakes, quiz, five exercises/hint/reveal | `react.forms-validation` — focused parity pass exists, pending editor/runtime review |
| `react-api-hooks-lesson.html` | 55 headings; API layers, Fetch vs Axios, interceptors, service types/CRUD, Hooks/useFetch, state simulator, debounced search, errors/retry/backoff, optimistic updates | `react.api-custom-hooks`; compare whole API lifecycle and races/retry safety rather than just a basic fetch |
| `react-ecosystem-course.html` | 38 headings; SPA/router/parameters/nested Outlet, form validation/RHF, prop drilling/Context, Provider/hook, useReducer/Todo, Context+reducer, tool-choice and full BookClub project | `react.router-spa`, `react.forms-validation`, `react.context-shared-state`, `react.api-custom-hooks`; source Router setup is v7 while app lesson stack is v6, so verify code rather than copy blindly |
| `react-performance-a11y.html` | 16 headings; render cascade simulation, memoization, function identity, e-commerce example, lazy loading/chunk size, bundle analyzer, keyboard menus, ARIA and image alt | `performance.accessibility`; prioritise measurement and semantic/keyboard behavior over generic memoization claims |
| `ui-design-system-learn.html` | 14 headings; tokens, library/build decision, component principles/variants, Button/Input/Card examples, advanced composition patterns, quiz/practice | `ui.design-systems`; include constrained component API and accessibility/visual regression considerations |
| `material-ui-masterclass.html` | 9 main headings; create project, install MUI, theme provider, Button/TextField/Card/Login form walkthrough | Supplementary MUI-specific lesson; examples depend on MUI/React major versions and require current-version verification |
| `frontend-architecture-and-planning.html` | 53 headings; flat/feature/layered/FSD comparisons, colocation/barrel trade-offs, UI/state planning, architecture/ecosystem map, trade-offs/anti-patterns/checklists | Capstone architecture/implementation; avoid teaching FSD as a mandatory default |
| `test.guide.html` | 26 headings; test pyramid, Jest setup/matchers/mocks, RTL queries/query priority, userEvent, async API tests, AAA, FAQ, quizzes | `testing.react-testing-library`; test behavior and asynchronous states using the project's Vitest setup, not copy Jest-only commands without translation |
| `frontend-auth.html` | Authn/authz distinction, tokens/sessions, JWT payload decoder, OAuth + PKCE, OIDC ID token, BFF pattern and security pitfalls | Supplementary security/auth lesson needed; client route guards are not authorization |
| `deployment-learning.html` | 43 headings; dev/prod build pipeline, dist/hash, environment priority/secrets, Vercel/Netlify, SPA redirects, preview/rollback/custom domain and release checklist | `capstone.review-demo` plus future deployment supplement; platform-specific steps require refresh |
| `sql-learning-page.html` | SQL first principles, relational algebra, SELECT/filter/null/order/aggregate/subquery/JOIN, DDL/DML/constraints/views/CASE/set ops/identity; query runner/hints | Supplementary SQL/PostgreSQL track; outside core 24-week course |
| `frontend-bootcamp-notes.html` | 80 headings; six-month recap linking Web/HTML/CSS, JS/Git, tooling/TS/React, ecosystem, advanced practice/capstone; interactive show-answer sections | Orientation/index and quality cross-check; don't duplicate as a competing canonical course |

## Material gaps established by this inspection

1. **Source parity is not currently complete.** Only Week 14–15 have a topic-by-topic parity report from the recent pass; the 25-file inventory was previously a destination map, not full migration proof.
2. **Large interactive pages hold more instruction than headings show.** Their simulations, state transitions, hidden solution/hint controls, exercise progression and output traces need a deliberate structured equivalent.
3. **Advanced Notion pages are not automatically present in the 24-week plan.** In particular, runtime/lexical environments, prototypes/new, memory/GC/V8, Sass, Bootstrap, MUI, authentication, deployment and SQL require explicit depth/optional-track decisions.
4. **Depth must not be measured by block count.** The required check is whether the learner can predict behavior, explain the mechanism, diagnose a wrong result, and produce a working solution with acceptance criteria.
5. **Locale parity is pedagogical, not just structural.** Matching block IDs does not establish equivalent explanations, hint quality, natural language or correct feedback.
6. **Version-specific examples need controlled treatment.** React Router/MUI/testing tools, browser APIs and deployment providers must match current dependencies or be clearly presented as source-specific/optional.

## Status of this pass

- Notion: the six course parts, main JS reference pages, HTML/CSS/DOM/Git pages and several supplementary references were fetched for heading/concept mapping.
- Legacy HTML: all 25 named source files were inspected for headings and interactive controls; many code samples were sampled for topic mapping.
- Week 14–15: targeted source comparison and committed expansions already exist in `CONTENT_PARITY_REVIEW_WEEK14-15.md`.
- Still required before calling the source corpus migrated: inspect each source's full explanatory paragraphs, code, branch logic/hidden content and every exercise; compare these against all replacement EN/RU lesson blocks; verify technical claims/links; execute runnable examples where possible; then pass editorial review.
- No lesson should be marked `published` merely because schema checks or CI pass. Keep all sources until replacements are reviewed.
