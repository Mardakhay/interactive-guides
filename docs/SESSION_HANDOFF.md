# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)

## Project goal

Rebuild Interactive Guides as a cohesive bilingual (English/Russian), mobile-friendly, PWA-ready learning platform based on the user's Notion learning notes, the supplied six-month / 24-week ABB Frontend Bootcamp syllabus, verified primary documentation, and useful existing code.

Lessons must be deep but understandable: explain concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain mistakes, and do not claim mastery just because content was opened. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, Node/npm/build/package tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Existing app and migration strategy

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Existing features include dashboard, course catalog, legacy lesson reader, learning paths, bookmarks, notes, search, quizzes and coarse local progress.
- Legacy source input: 25 standalone HTML documents in `public/lessons/*.html`.
- Keep legacy source content until each replacement has been reviewed in both locales; the structured reader coexists with the old reader during migration.

## Structured content architecture

- `src/content/schemas/lessonContent.ts`: typed Zod lesson blocks and translation metadata; validates knowledge-check answer keys, unique block IDs and code-walkthrough line boundaries.
- `src/content/schemas/curriculum.ts`: validates the 6-month / 24-week order and unique identifiers.
- `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`: canonical core syllabus, with supplementary topics explicitly separated.
- `src/content/repository.ts`: validates content and returns lessons, curriculum order and available previous/next lessons.
- `src/features/structured-lesson/StructuredLessonRenderer.tsx`: shared React renderer for text, lists, callouts, code, walkthroughs, knowledge checks, coding exercises and references.
- `src/app/pages/StructuredLessonPage.tsx`: locale-aware structured reader at `/:locale/structured-lessons/:lessonId`.

## Current structured lessons

All 26 canonical course lesson IDs have registered English and Russian JSON translations. The lessons are marked `review` and should not be treated as editorially approved/published. The full curriculum sequence is:

| Week | Lesson ID | Main scope |
|---|---|---|
| 1 | `web.internet-http` | Internet/Web, URL anatomy, DNS, HTTP requests/responses, status codes, HTTPS/TLS, Network DevTools |
| 1 | `html.document-structure` | HTML shell, metadata, semantics, About Me practice |
| 2 | `html.forms-accessibility` | Forms, labels, native validation, fieldsets and accessible errors |
| 3 | `css.fundamentals` | Selectors, cascade/specificity, box model and display |
| 4 | `css.flexbox-grid-responsive` | Flexbox, Grid, responsive layouts and mobile-first media queries |
| 5 | `js.basics-types-control-flow` | Variables, types, coercion, branches and loops |
| 6 | `js.functions-arrays-objects` | Functions, callbacks, array methods, objects, destructuring and spread |
| 7 | `js.dom-events` | DOM tree, selectors, safe manipulation, events and a to-do list |
| 8 | `js.async-fetch` | Promises, async/await, Fetch, HTTP failures and request states |
| 8 | `git.fundamentals` | Staging, commits, remotes, push and .gitignore |
| 9 | `tooling.node-npm-vite` | Node.js, npm, package.json, lockfiles, Vite, ESLint and Prettier |
| 10 | `typescript.fundamentals` | Annotations, inference, unknown, unions, object types and generics |
| 11 | `react.components-jsx-state` | Function components, JSX, props and useState |
| 12 | `react.effects-lists-composition` | useEffect, cleanup, composition, keys and request states |
| 13 | `react.router-spa` | SPA navigation, nested routes, URL parameters and not-found paths |
| 14 | `react.forms-validation` | Controlled/uncontrolled forms, validation and accessible errors |
| 15 | `react.context-shared-state` | Lifting state, prop drilling and Context API |
| 16 | `react.api-custom-hooks` | API services, request lifecycle and custom Hooks |
| 17 | `ui.design-systems` | Design tokens, reusable UI components and consistency |
| 18 | `performance.accessibility` | Performance patterns, keyboard support and ARIA |
| 19 | `testing.react-testing-library` | Vitest/Jest-style tests, Testing Library and user interactions |
| 20 | `git.workflow-ci` | Branches, pull requests, reviews and CI |
| 21 | `capstone.requirements-discovery` | User stories, requirements and acceptance criteria |
| 22 | `capstone.design-architecture-planning` | Wireframes, component architecture, data flows and planning |
| 23 | `capstone.implementation` | Integrated capstone implementation and tests |
| 24 | `capstone.review-demo` | Refactoring, quality review, demo and release readiness |

Lessons live in `src/content/lessons/<lesson-id>/en.json` and `ru.json`, with the first HTML-document lesson retaining its hyphenated directory name. The repository and curriculum tests register all canonical lesson IDs and verify localized routing/order; individual content tests cover schemas, quiz rules, references and EN/RU block structure. The repository test now checks EN/RU block structure, knowledge checks and coding exercises across the full canonical lesson set. Editorial/source parity review remains incomplete.

## Learner state and practice

- `src/app/pages/StructuredLessonPage.tsx` renders a locale-aware reader at `/:locale/structured-lessons/:lessonId`, with TOC, EN/RU switching, document language, and previous/next navigation.
- Completion is a self-attested marker, distinct from quiz results and code mastery.
- `src/features/structured-lesson/store.ts` tracks quiz attempts, code drafts and practice self-review checklists separately from the legacy lesson status.
- The coding exercise editor saves drafts locally and reveals hints/self-review criteria. **JavaScript/TypeScript execution is not currently implemented.** The only live preview is for HTML and uses an iframe with scripts disabled.
- Before adding execution, design the sandbox intentionally. A same-tab synchronous infinite loop cannot reliably be stopped by a parent-page timer; an in-page iframe runner must not be described as a secure arbitrary-code service. A Worker can be terminated for hard time limits but still needs careful capability/network restrictions and an explicit threat model.

## PWA foundation

- Manifest, SVG icons, service worker, production registration, offline status banner and install/update UI exist.
- Shell/assets/public legacy lessons have cache strategies; API/auth/functions/storage/realtime paths are excluded from service-worker caching.
- Real device installability/offline behavior has not been tested on Android/iOS in this session.

## Supabase

The connected account has projects named `kaelig` and `Mardakhay's Project`; neither is clearly an Interactive Guides project. No schema was modified. Do not repurpose a project or create a potentially billable project without cost/intent confirmation. Never expose service-role keys in browser code. Continue local-first data contracts before remote sync.

## Latest CI check

GitHub Actions run [#167](https://github.com/Mardakhay/interactive-guides/actions/runs/39776235742) passed for code/test commit `be9e050fba35082d036367e3e6b7eec47a7636c3`; install, lint, typecheck, tests and production build all succeeded, including the new local-storage warning tests.

The exact current branch HEAD when this note was updated is `0725ed8347b0127c9138690acccadb09091749d1`, a documentation-only commit after #167. Run [#168](https://github.com/Mardakhay/interactive-guides/actions/runs/39776441775) was in progress at last check. Verify the exact latest HEAD's result before claiming that current CI is green.

The workflow runs `npm ci`, ESLint, TypeScript typecheck, tests and production build. A successful run for an earlier SHA does not validate later code changes.

## Documentation

See `docs/README.md`. Key living docs include `CURRENT_STATE.md`, `ARCHITECTURE.md`, `CURRICULUM_AND_CONTENT.md`, `PERSISTENCE_AND_SUPABASE.md`, `PWA_AND_MOBILE.md`, `ROADMAP.md`, `DECISIONS.md`, and this handoff.

## Next actions

1. Run and inspect CI for the latest Week 1 content/test changes.
2. Improve the coding practice workflow: draft persistence is present, but only HTML preview exists; decide on a Worker-based JavaScript playground with explicit network limits and correct timeout semantics.
3. Fully review the 26 structured lessons against the Notion notes and legacy HTML sources; all current lessons remain editorial pilots in `review` state.
4. Localize the remaining legacy app shell and continue mobile/accessibility verification using the existing tests and preview deployment.
5. Keep the existing validated JSON export/import workflow; add explicit schema-version migrations and visible autosave/quota-failure recovery before cloud sync.
6. Validate PWA install/offline behavior and service-worker update lifecycle on supported real devices/browsers.
7. Add Supabase only after local contracts stabilize and dedicated project/cost intent is agreed.
8. Keep PR #1 in draft until editorial review, tests and scope are sufficient.

## Commit conventions

Use focused messages such as `content(javascript): add bilingual async JavaScript and Fetch lesson`, `content(git): add bilingual Git fundamentals lesson`, `feat(playground): ...`, `test(content): ...`, and `docs: ...`.
