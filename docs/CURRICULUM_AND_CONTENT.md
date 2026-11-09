# Curriculum and Content Model

## Canonical curriculum

The supplied ABB bootcamp syllabus is the canonical core-track order. It covers six months and 24 weeks. The application may include optional supplementary modules, but must label them as extensions rather than silently placing them inside the original syllabus.

### Month 1 — Web Fundamentals & Layout

Structured lessons are present for Weeks 1–4 in both locales, all with editorial status `review`. They are content pilots, not fully approved/published.
- Week 1: `web.internet-http` teaches browser/client-server, URL components, DNS at a high level, HTTP requests/responses, status codes, HTTPS/TLS and Network DevTools; `html.document-structure` covers HTML document structure and semantic elements. Practice spans request inspection and an About Me page.
- Week 2: forms, input attributes, labels, accessibility basics. Practice: login/register layout.
- Week 3: CSS authoring, selectors/specificity, box model, display. Practice: landing page.
- Week 4: Flexbox, Grid, media queries, mobile-first. Month project: responsive landing page.

### Month 2 — JavaScript Core & Git

Structured bilingual lessons are registered for Weeks 5–8. Week 8 is split into two lessons (async JavaScript/Fetch and Git fundamentals) to keep the concepts separate.
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

## Structured lesson inventory and implementation status

The current app registers 25 canonical lesson IDs across the 24-week core syllabus. Each ID has an English and Russian structured JSON translation. All translations remain status `review`; this means the material is implemented but still requires editorial/source review before it should be presented as fully approved.

| Week | Stable lesson ID | Main scope |
|---|---|---|
| 1 | `web.internet-http` | Internet/Web distinction, URL anatomy, DNS, HTTP messages/statuses, HTTPS/TLS, DevTools Network |
| 1 | `html.document-structure` | HTML document shell, metadata and semantics |
| 2 | `html.forms-accessibility` | Forms, labels, native validation and accessible errors |
| 3 | `css.fundamentals` | Selectors, cascade, specificity, box model and display |
| 4 | `css.flexbox-grid-responsive` | Flexbox, Grid and responsive design |
| 5 | `js.basics-types-control-flow` | Variables, primitives, operators and control flow |
| 6 | `js.functions-arrays-objects` | Functions, callbacks, array methods, objects, destructuring and spread; optional deep dive into lexical scope, environment records, name shadowing and independent closures |
| 7 | `js.dom-events` | DOM APIs, events, forms and event delegation |
| 8 | `js.async-fetch` | Promise, async/await, Fetch and request states |
| 8 | `git.fundamentals` | Staging, commit history, remotes, push and .gitignore |
| 9 | `tooling.node-npm-vite` | Node.js, npm, package metadata, lockfiles, Vite and quality tools |
| 10 | `typescript.fundamentals` | Inference, unknown, union/object types and generics |
| 11 | `react.components-jsx-state` | Components, JSX, props and useState |
| 12 | `react.effects-lists-composition` | useEffect, cleanup, composition and stable list keys |
| 13 | `react.router-spa` | SPA routing, parameters, nested layouts and not-found paths |
| 14 | `react.forms-validation` | Controlled/uncontrolled forms, validation and accessible errors |
| 15 | `react.context-shared-state` | State ownership, lifting state, Context API |
| 16 | `react.api-custom-hooks` | API/service layer, custom Hooks and error handling |
| 17 | `ui.design-systems` | Design tokens and reusable UI components |
| 18 | `performance.accessibility` | Performance, keyboard access and ARIA |
| 19 | `testing.react-testing-library` | Component testing and Testing Library patterns |
| 20 | `git.workflow-ci` | Branch strategy, reviews, pull requests and CI/CD |
| 21 | `capstone.requirements-discovery` | User stories, requirements and acceptance criteria |
| 22 | `capstone.design-architecture-planning` | Wireframes, component architecture and technical planning |
| 23 | `capstone.implementation` | Integrating features, data, routing and tests |
| 24 | `capstone.review-demo` | Refactoring, QA, accessibility, performance and demo |

The catalog, search, lesson reader and previous/next navigation recognize these structured lessons. Registration and block schemas are tested in CI. Source-by-source parity with the original 25 legacy HTML documents is not yet complete and should not be conflated with the structured lessons existing in the app.

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
