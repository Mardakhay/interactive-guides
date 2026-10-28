# Structured content authoring guide

This guide describes how to edit the bilingual structured curriculum without breaking its runtime contracts or overstating source parity.

## Where content lives

- `src/content/lessons/<lesson-id>/en.json` and `ru.json`: complete English and Russian lesson records.
- `src/content/lessonManifest.ts`: compact EN/RU titles used in navigation while full lesson bodies are lazy-loaded.
- `src/content/repository.ts`: lesson registry, dynamic loading, parsing, and validation.
- `src/content/schemas/lessonContent.ts`: the authoritative Zod content contract.
- `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`: core curriculum metadata.
- `src/data/learning-paths.json`: ordered classic and structured paths, including each step's English note.
- `src/features/localization/translations.ts`: application copy and Russian translations for path titles, descriptions, and step notes.

Use the canonical lesson ID in both locale files and in the manifest. The English and Russian files are loaded as separate locale variants of the same stable ID.

## Required lesson contract

Every locale file must satisfy the Zod schema. Important fields include:

- `id`, `locale`, positive integer `version`, `updatedAt` in `YYYY-MM-DD` format, and review metadata.
- Exactly one curriculum placement: a core `week` or a `supplementaryTrackId`.
- `moduleId`, nonnegative `order`, `title`, `description`, `estimatedMinutes`, `difficulty`, prerequisites, tags, and at least one learning outcome.
- A non-empty `blocks` array with unique block IDs.

Supported block types are `heading`, `paragraph`, `list`, `callout`, `code`, `codeWalkthrough`, `knowledgeCheck`, `codingExercise`, and `references`. Use the schema rather than inventing custom block shapes. Walkthrough line ranges must fit the code sample; knowledge-check option IDs must be unique and the answer cardinality must match the question type.

## Editing an existing lesson

1. Read the relevant source lesson and the matching entry in `docs/FULL_SOURCE_CONTENT_AUDIT.md` or `docs/LEGACY_CONTENT_INVENTORY.md`.
2. Update the English source and Russian translation as a pair when semantics change; keep IDs and ordering aligned unless a migration is explicitly intended.
3. Explain mechanisms and trade-offs, not only definitions. Include a worked example, at least one realistic failure mode or edge case, a practice task, and feedback that explains why an answer is right or wrong when appropriate.
4. Keep code samples executable or clearly label them as partial/pseudocode. Do not translate language keywords, API names, CLI commands, URLs, or identifiers.
5. Update the lesson manifest title in both locales if the visible title changes.
6. Update regression tests for schema validity, locale parity, unique IDs, exercise answer behavior, and source-specific claims that the change is meant to protect.

## Adding a lesson

1. Choose a stable, namespaced ID such as `topic.lesson-name`; do not reuse classic catalog IDs to represent structured lessons.
2. Create `en.json` and `ru.json` under `src/content/lessons/<lesson-id>/`. Both records must use the same ID and curriculum placement.
3. Register the ID and both display titles in `src/content/lessonManifest.ts`; ensure the dynamic-loader folder matches the registered folder.
4. If it belongs in the core course, update both core curriculum metadata files. If it is a supplement, use the existing supplementary-track mechanism and keep it separate from the 24-week sequence.
5. Add the ID to relevant learning paths only when it is an appropriate prerequisite/progression step. Add an English step note in `src/data/learning-paths.json` and a Russian translation keyed by `<path-id>.<lesson-id>` in `src/features/localization/translations.ts`.
6. Add tests that prove the lesson ID resolves, the selected locale is rendered, path notes are localized, and the relevant user flow remains navigable.

## Learning paths and localization

Learning-path titles and descriptions are translated in `learningPathTranslations`. English step notes live in the JSON path data; the helper `getLocalizedLearningPathStepNote(locale, pathId, lessonId, fallbackNote)` resolves Russian copy by the composite key `<path-id>.<lesson-id>`. Use a composite key because the same lesson can appear in multiple paths with different instructional context.

When adding or changing a path:

- Keep the ordered step IDs stable unless a reviewed content migration requires otherwise.
- Confirm every step resolves to a classic catalog lesson or registered structured lesson.
- Add one Russian note for every step that has an English note.
- Test the route and title in both locales and keep structured routes under `/:locale/structured-lessons/:lessonId`.
- Preserve classic path IDs and `/lessons/:lessonId` routes; do not imply the legacy-to-structured crosswalk is approved.

## Validation

From the repository root:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

For focused checks, run `npx vitest run src/features/learning-paths/api.test.ts src/app/pages/LearningPathDetailPage.test.tsx src/content/repository.test.ts`.

The additional `src/content/lessonQuality.test.ts` checks two important content invariants:
- all registered structured lessons in both locales have no duplicate URL within an individual `references` block;
- a reviewed set of 23 Russian prose fields remains localized, guarding against regressions in the audited quiz prompts, feedback, explanation and lesson paragraphs.

This is a targeted regression guard, not a general-purpose language detector or a substitute for a human EN/RU editorial comparison. Keep the broader source-parity and translation-review tasks open until they have evidence.

CI validation does not prove full source parity or editorial approval. Before declaring a lesson migrated, review the mapped source material and record unresolved content/interaction gaps in the audit. The legacy route cutover remains blocked until a reviewed crosswalk and tested learner-state retention policy exist. Do not add Supabase authentication or sync ahead of the documented reconciliation and RLS/security gates.

## Pull-request checklist

- [ ] English and Russian records validate and communicate the same learning outcomes.
- [ ] Manifest titles and curriculum placement match the lesson files.
- [ ] IDs are stable, unique, and referenced only by valid links/paths.
- [ ] Code, line ranges, quiz answer keys, and feedback are checked.
- [ ] Path notes, route labels, and common UI copy are localized.
- [ ] Relevant tests, lint, typecheck, and production build pass.
- [ ] Browser, screen-reader, mobile, deployment, and offline claims reflect evidence actually collected.
- [ ] Documentation records remaining gaps; CI success is not presented as proof of content parity.
