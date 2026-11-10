# Product Requirements

## Product intent

Turn Interactive Guides into a serious personal learning environment for becoming a strong frontend engineer. The app should teach the underlying mechanisms and engineering trade-offs, not merely provide simplified summaries. It should be readable and approachable without reducing technical depth.

## Learner and outcomes

Primary learner: a self-directed learner following a Junior Frontend Developer curriculum, studying on desktop and phone, practicing code, and revisiting topics over time.

By completing the core track, a learner should be able to:

- Explain web platform behavior, browser/network fundamentals and semantic HTML.
- Build accessible responsive interfaces with CSS layout systems.
- Write JavaScript independently and reason about scope, execution, objects, async behavior, DOM and browser APIs.
- Use Git confidently and follow a collaborative pull-request workflow.
- Configure a modern project using Node.js, npm, build tools, linting and formatting.
- Use TypeScript to model data and API boundaries.
- Build React applications using composition, state, effects, routing, forms, APIs and custom hooks.
- Reason about architecture, error handling, testing, accessibility, performance, security and deployment.
- Deliver a capstone project, explain design choices, and maintain the app through a professional workflow.

## Product experience

### Core navigation
- Home/dashboard: continue learning, progress overview, recommendations and recent activity.
- Curriculum: ordered stage → month → week/module → lesson hierarchy aligned to the six-month / 24-week syllabus.
- Lesson reader: title, learning outcomes, prerequisites, estimated time, section navigation, content blocks, examples, knowledge checks, coding practice, references, previous/next.
- Practice center: exercises, attempts, feedback and review items.
- Search: localized search across lessons, topics, notes and curriculum.
- Bookmarks and notes, retained from the current application.
- Progress and learning history, with a clear difference between started, completed and demonstrated mastery.
- Settings: language (English/Russian), theme, data export/import, offline and account sync state.

### Bilingual behavior
- Support `en` and `ru` as first-class interface and content locales.
- URL locale should be explicit and shareable (recommended `/:locale/...`).
- UI locale and content locale should stay in sync by default.
- Preserve a stable lesson ID across translations; locale is a separate dimension.
- A translation must be pedagogically equivalent, not a loose summary. Code identifiers and standard technical terms stay canonical; explanations can be localized.
- If one translation is incomplete, show an explicit fallback indicator rather than silently mixing languages.
- Persist language preference locally and in the profile when authenticated.

### Lesson completion and mastery
- Opening a lesson means “in progress,” not completed.
- Completion requirements vary by lesson but are explicit in metadata: required reading/sections, required knowledge checks and/or coding tasks.
- Track lesson completion independently from quiz score and coding-practice outcomes.
- Mastery must require evidence for lessons marked “practice required”; a self-attested override should be explicit and distinguishable.
- Preserve individual attempts and feedback to support review.

## Lesson instructional standard

Every lesson must specify whether it is primarily conceptual, reference, hands-on, or mixed. Even a reference lesson should have learning outcomes and retrieval practice.

Baseline lesson sections:
1. Context, prerequisites and expected outcomes.
2. Why the topic exists; the problem it solves.
3. Mental model and terminology.
4. Detailed explanation of mechanisms and causal relationships.
5. Small examples explained line by line.
6. Variations, edge cases, failure modes and common misconceptions.
7. Practical workflow or realistic case.
8. Knowledge checks with explanatory feedback.
9. Coding exercise when relevant, with constraints, starter code, observable requirements and tests or evaluation rubric.
10. Worked solution or guided hints revealed only after an attempt, where appropriate.
11. Summary of principles, trade-offs and interview-ready explanation.
12. Further reading, primary documentation, and related lessons.

Do not force coding into purely conceptual topics where it adds little value; use a reasoning exercise or scenario instead. For coding topics, independent code writing is required. Never reveal a complete answer before the learner attempts unless they explicitly request it.

## Content quality and fact checking

- Prefer primary sources: official language/framework/platform documentation and standards.
- Use Notion notes and legacy HTML files as important source material, then verify version-sensitive claims with authoritative current documentation.
- Mark inferred or opinionated engineering advice as such.
- Avoid “everything you need so you never need another resource” as a literal guarantee. Aim for a comprehensive curriculum and provide further reading; ecosystem details and security guidance change.
- Each lesson needs version context for tools/APIs where relevant, last-reviewed date, sources and translation status.
- Include a correction process for errors and stale content.
- Avoid copying copyrighted material verbatim from books/articles. Create original explanations and cite sources.

## Design and accessibility

- Establish a cohesive design system: tokens, typography scale, spacing, content width, code styling, callouts, diagrams and interaction states.
- Use a consistent app shell and a responsive lesson reading experience.
- Target WCAG 2.2 AA practices: semantic structure, keyboard support, visible focus, proper labels, contrast, non-color state cues and reduced-motion support.
- Support small screens, touch targets, zoom/reflow and long code samples.
- Prefer clear typography and enough whitespace for dense technical learning; “readable” does not mean “shallow.”
- Offer dark/light themes only with verified contrast.

## Out of scope for initial foundation

- Public social profiles, leaderboards, gamification economies, chat, or complex community features.
- A full browser-based production IDE. Small runnable code examples may be added via safe sandboxed execution later.
- Server-side code execution for arbitrary learner code without an isolated execution service and abuse controls.

## Product acceptance criteria

- A learner can navigate the syllabus in order in English or Russian.
- The same stable lesson can be opened in either locale with equivalent content.
- Lesson content renders through reusable React components, not independent full-document shells.
- Progress, bookmarks and notes have typed storage contracts and migration-safe behavior.
- Anonymous learning continues locally without an account.
- An authenticated user can sync supported progress and personal data across devices, with conflict behavior defined.
- Installability and the documented offline scope are verified on supported devices.
- CI validates types, lint, unit/component tests, content schema, broken lesson links and production build.
