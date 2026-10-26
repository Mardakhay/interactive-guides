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
