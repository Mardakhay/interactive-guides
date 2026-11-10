# Structured Content Authoring Guide

This guide covers the active bilingual JSON curriculum. Standalone HTML lesson files and their former renderer are not part of the authoring workflow.

## Where content lives

- \`src/content/lessons/<lesson-id>/en.json\` and \`ru.json\`: English and Russian lesson records.
- \`src/content/lessonManifest.ts\`: stable lesson IDs, folder names, translated titles, and publication/review status.
- \`src/content/repository.ts\`: lesson registry, dynamic loading, parsing, and search/practice document generation.
- \`src/content/schemas/lessonContent.ts\`: authoritative Zod lesson contract.
- \`src/content/curriculum/bootcamp-core.en.json\` and \`bootcamp-core.ru.json\`: six-month, 24-week core curriculum.
- \`src/data/learning-paths.json\`: structured learning paths and ordered step notes.
- \`src/features/localization/translations.ts\`: UI copy and Russian learning-path translations.

## Required invariants

Every lesson translation must satisfy the Zod schema and include:

- A stable lesson ID, matching locale, positive version, update date, and review metadata.
- Exactly one placement: a core week or a supplementary track.
- A title, description, estimated time, difficulty, prerequisites, tags, and learning outcomes.
- A non-empty block list with unique block IDs.

The English and Russian files must use the same lesson ID, placement, and ordered block identities/types. Keep walkthrough line references within the code sample. Knowledge-check answer cardinality must match the question type, and all options need meaningful feedback.

Supported blocks are headings, paragraphs, lists, callouts, code, code walkthroughs, knowledge checks, coding exercises, and references.

## Editing a lesson

1. Read both locale records and the relevant schema before editing.
2. Make the semantic change in English and Russian together.
3. Keep block IDs stable where possible so saved section activity and exercise drafts continue to refer to the intended content.
4. Explain mechanisms and trade-offs; include examples, edge cases, practice, and useful feedback.
5. Keep code examples executable or clearly label pseudocode. Do not translate language keywords, API names, identifiers, CLI commands, or URLs.
6. Update manifest titles/status when learner-facing metadata changes.
7. Add or update tests for schema validity, EN/RU parity, answer behavior, and the specific claim or example being protected.

## Adding a lesson

1. Choose a stable namespaced ID such as \`topic.lesson-name\`.
2. Create \`en.json\` and \`ru.json\` under \`src/content/lessons/<lesson-id>/\`.
3. Add the ID, folder, translated titles, and status to \`src/content/lessonManifest.ts\`.
4. Assign it to one core week or one supplementary track in both curriculum locale files.
5. Add it to a learning path only when the sequence is pedagogically justified. Keep the English step note in \`src/data/learning-paths.json\` and add its Russian translation in \`src/features/localization/translations.ts\`.
6. Add tests that prove the ID loads in both locales and that the curriculum and learning-path references resolve.

## Validation

\`\`\`bash
npm run content:index
npm run lint
npm run typecheck
npm test
npm run build
\`\`\`

A green test suite validates machine-readable contracts; it does not replace technical fact-checking or human review of Russian and English teaching quality.
