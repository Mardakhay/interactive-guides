# Editorial Review Checklist

Use this checklist for each lesson pair at `src/content/lessons/<lesson-id>/en.json` and `ru.json`. A successful schema/CI run is required, but it is not editorial approval. Keep `status: "review"` until the content reviewer records a decision.

## 1. Source and scope

- [ ] Identify the canonical week, lesson ID and intended learner level.
- [ ] Read relevant Notion notes and the full legacy HTML source, including hidden/toggled sections, diagrams, answers and interactive examples.
- [ ] Mark which source ideas are retained, rewritten, moved to another lesson, superseded, or intentionally omitted; record why.
- [ ] Verify that supplementary material is labeled and does not silently change the supplied 24-week core sequence.

## 2. Technical accuracy

- [ ] Verify non-trivial or version-sensitive claims against primary documentation, standards or authoritative references.
- [ ] Check vocabulary and definitions; distinguish language guarantees from common runtime/tool behavior.
- [ ] Read every code sample line by line. Check syntax, imports, assumptions, expected output and failure cases.
- [ ] Test runnable samples where practical. If a sample cannot run in the platform, state what environment/tool the learner needs.
- [ ] Review security, privacy and accessibility claims carefully. Do not describe client-only checks as security enforcement.
- [ ] Confirm every reference link points to the intended source; replace broken, weak or outdated links.

## 3. Teaching quality

- [ ] State the mental model and learning outcomes clearly before relying on jargon.
- [ ] Explain the mechanism step by step, including why it works—not only the final syntax.
- [ ] Include realistic examples plus edge cases, common mistakes and trade-offs where relevant.
- [ ] Ensure a learner can follow the lesson without having to search for a missing explanation elsewhere.
- [ ] Knowledge checks test understanding, have one correct answer for single-choice/true-false, and provide specific feedback for every option.
- [ ] Coding practice states the goal, constraints, input/output or behavior, hints, requirements and success criteria. The solution must require independent work.
- [ ] Keep reading completion, quiz performance and coding evidence as separate signals; do not claim mastery without evidence.

## 4. English/Russian parity

- [ ] EN and RU use the same lesson ID, week/module metadata and ordered block IDs/types.
- [ ] Definitions, examples, caveats, question difficulty, answer keys, feedback, practice constraints and references are equivalent in teaching value.
- [ ] Translation reads naturally in the target language; technical identifiers remain exact and consistent.
- [ ] UI labels, code walkthrough explanations, hints and exercise criteria are translated where learner-facing.
- [ ] Locale switching preserves the same canonical lesson and the document `lang` is correct.

## 5. Application behavior and accessibility

- [ ] Previous/next links follow canonical curriculum order.
- [ ] The outline/TOC links point to the intended sections.
- [ ] Interactive controls have accessible names, keyboard operation, visible focus and understandable success/error feedback.
- [ ] Code blocks remain readable on narrow screens and can be copied with accessible feedback.
- [ ] The lesson reflows without horizontal page overflow at mobile widths.
- [ ] Any preview/runner limitations are explicit; no secrets are requested or exposed.

## 6. Automated checks and publication

- [ ] Content schema and repository tests pass.
- [ ] Full EN/RU block parity and knowledge-check invariants pass.
- [ ] Code walkthrough line ranges and quiz-answer structures pass validation.
- [ ] `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` pass in CI for the reviewed commit.
- [ ] Any relevant user-visible routes, local persistence, backup/restore and responsive behavior are tested.

Record a review entry in the lesson's pull request or review log:

| Field | Value |
|---|---|
| Lesson ID / week | |
| EN file | |
| RU file | |
| Legacy/Notion source checked | |
| Technical references checked | |
| Code samples executed (where practical) | |
| CI run URL and commit SHA | |
| Reviewer and date | |
| Findings / follow-up issues | |
| Decision | `review` / `published` |

Only change both locale files to `status: "published"` after the reviewer has completed the required checks and recorded the decision. If any significant issue remains, leave the lesson in `review` and create a focused follow-up.
