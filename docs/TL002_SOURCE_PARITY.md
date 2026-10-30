# Source parity review: Git Workflow & CI/CD

**Review date:** 2026-10-30  
**Legacy source:** `public/lessons/git-workflow-cicd-guide.html` (94,686 bytes; 1 inline script; 20 buttons)  
**Structured target:** `git.workflow-ci` EN/RU v11 (70 blocks per locale)  
**Related target:** `deployment.production-hosting` for provider rollback and post-merge recovery concepts  
**Cutover:** **Blocked** — the pipeline simulator is now interactive, but source canvas, tab and sequential quiz parity is incomplete.

## Source interaction inventory

The legacy guide contains seven top-level tabs: Why Strategy, Branches, Git Flow, Merge Requests, Code Review, CI/CD and Quiz. Its branch canvas has eight controls for creating/switching branches, committing, merging feature/hotfix/release branches and resetting the diagram. The CI/CD panel simulates seven stages (`checkout`, `install`, `lint`, `build`, `test`, `security`, `deploy`), allows a failure to be injected at one stage, runs the pipeline sequentially and can be reset. The original quiz presents ten questions one at a time, records answers, shows per-question explanations, tracks score/progress and ends with a percentage/result screen and restart action.

## Content and assessment crosswalk

| Legacy topic / question | Structured evidence | Review |
|---|---|---|
| Branch purpose and Git Flow branch roles | `branching-purpose`, `branch-workflow`, `git-branch-strategies-body`, `git-branch-strategy-choices` | Covers Git Flow as one team policy, plus alternative branch strategies. |
| Pull requests, review lifecycle and actionable feedback | `pull-request-body`, `code-review-body`, `review-comment-taxonomy`, `review-comment-labels`, `review-comment-practice` | Explains observable issue, impact, requested action and priority labels; style-only concerns are not blockers. |
| Merge/rebase and conflict recovery | `merge-rebase-body`, `conflict-resolution-procedure`, merge/rebase walkthroughs and applied exercise | Distinguishes operation-specific continuation/abort commands; does not teach blanket ours/theirs or hard-reset recovery. |
| CI and actual project workflow | `ci-body`, `ci-example`, `ci-failure-diagnosis-matrix`, `ci-failure-diagnosis-check` | The example uses this repository's actual Node/npm and fail-fast checks; npm audit is explicitly informational. |
| Q1: production hotfix origin | `hotfix-origin-check` | Assessed individually. |
| Q2: branch protection purpose | `branch-protection-check` | Distinguishes CI reporting from server-side branch-protection enforcement. |
| Q3: Git Flow feature target | `git-flow-feature-target-check` | Assesses feature-to-`develop`. |
| Q4: CI purpose | `ci-basics-check` | Assesses automated checks on changes. |
| Q5: actionable review feedback | `review-comment-specificity-check` | Assesses specific, respectful, actionable feedback. |
| Q6: hotfix back-merge | `hotfix-back-merge-check` | Assesses back-merging production hotfixes into the integration branch. |
| Q7: SemVer MINOR | `git-semver-minor-check` | Assesses backward-compatible feature versioning. |
| Q8: continuous deployment | `continuous-deployment-check` | Distinguishes automatic deployment from an approval-gated delivery model. |
| Q9: small PR reviewability | `small-pr-review-check` | Avoids presenting a fixed line count as a universal policy. |
| Q10: lockfile install in CI | `npm-ci-lockfile-check` | Assesses reproducible `npm ci` behavior. |

## Interactive seven-stage pipeline simulator — v11

The new bilingual `pipelineSimulation` block is rendered by `src/features/structured-lesson/PipelineSimulation.tsx` and has deterministic interaction rather than random delays:

1. Learners choose any of seven stages as a failure-injection point and run the pipeline.
2. A required pre-merge failure (`checkout`, `install`, `lint`, `build`, `test`) marks later stages skipped and explains that merge is blocked when branch protection requires the failing check.
3. The dependency audit is classified as informational in this model: an injected advisory is announced as a warning, but subsequent stages continue. Teams may choose a stricter required policy.
4. Deployment is explicitly post-merge. An injected deployment failure does not pretend to turn an earlier successful PR gate red; it exposes a rollback/recovery action.
5. A failed required gate offers a simulated fix/new-commit action. The learner must run the pipeline again against that new simulated commit rather than reusing an earlier result.
6. Stage selectors expose `aria-pressed`, status is announced through a labelled polite live region, and all controls/status copy is localized.

The source visual places deployment inside the same simulated pre-merge progression and says an MR cannot merge when deploy fails, while its displayed workflow YAML has no deployment job. The structured simulator deliberately corrects this inconsistency by modelling deployment as post-merge release work. This is conceptually safer and matches the documented delivery/deployment distinction.

## Locale and test evidence

- `git.workflow-ci` EN/RU v11: 70 blocks per locale; 19 knowledge checks, 5 walkthroughs and 5 coding exercises per locale; ordered block IDs/types stay aligned.
- The seven simulation stages have the same IDs/order and gate classification in EN/RU: five required pre-merge gates, one informational audit stage and one post-merge deployment stage.
- `src/features/structured-lesson/PipelineSimulation.test.tsx` has four tests for pre-merge stop/new-commit rerun, informational audit continuation, post-merge rollback and Russian localization.
- `src/content/schemas/lessonContent.test.ts` verifies the seven-stage order and gate semantics.
- Exact-head [Actions #41057274229 (run #872)](https://github.com/Mardakhay/interactive-guides/actions/runs/41057274229) passed 63 test files / 348 tests, lint, typecheck, production build, 141 JavaScript budgets, zero npm audit advisories and preview smoke for 13 routes plus 14 generated content assets.

## Interaction disposition

| Legacy interaction | Structured target / disposition |
|---|---|
| Seven top-level tabs | Replaced by the structured lesson outline/flow; no exact tab state or transition parity. |
| Animated Git Flow branch canvas and eight actions | Not implemented in this increment. Branch strategy explanations and command walkthroughs remain, but not a live graph. |
| Seven-stage failure-injection simulator | Implemented as a localized accessible block; gate semantics are corrected as documented above. |
| Sequential 10-question quiz with score/progress/restart | The ten concepts are assessed as individual scored knowledge checks, but the source's one-question-at-a-time sequence, aggregate percentage and restart screen are not reproduced. |
| Learner state on classic lesson route | Retain classic route and quiz-result identity; no automatic result migration is authorized. |

## Remaining release blockers

1. Decide whether the animated branch canvas and its eight branch actions need a faithful structured interactive equivalent or may be explicitly deferred.
2. Decide whether to add a sequential quiz presentation layer on top of the ten existing assessments, preserving current per-question feedback and learner state.
3. Complete full claim/code/example/reference review and editorial sign-off for both locales.
4. Define learner-state retention for classic `tl-002` quiz results before changing route identity.
5. Execute keyboard, screen-reader, responsive and native browser checks for the new simulator and all other app routes.

**Current disposition: Blocked.** The pipeline simulator interaction gap is materially reduced, but tabs, branch canvas, sequential quiz and migration/manual-acceptance gates remain open.
