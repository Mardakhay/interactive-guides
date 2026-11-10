# Current State

**Last reconciled:** 2026-11-10  
**Default branch:** \`main\`  
**Product scope:** bilingual, text-based, local-first frontend learning platform

## Active product

- The active catalog is the structured bilingual curriculum under \`src/content\`.
- The curriculum contains 27 core topics across 24 weeks and 17 supplementary topics: 44 lesson IDs with English and Russian records.
- HTML fundamentals remain part of the curriculum through structured lessons. Standalone HTML lesson files, their legacy reader, and the old category catalog are retired.
- The application includes a lesson reader, learning paths, dashboard, search, Practice Center, bookmarks, notes, settings, backup/restore, and a PWA shell.
- Practice Center indexes 119 coding exercises. Search and practice data are generated from structured content during development/build commands.

## Persistence and backend scope

- Learner state is stored locally in the browser and can be exported/imported as JSON.
- Restore replaces the local learner-data snapshot; it is not a merge.
- Existing records keyed to retired classic lesson IDs are not automatically deleted or mapped to new structured IDs. They may remain in local storage or a backup, but are not shown as active lessons.
- Supabase, hosted APIs, accounts, authentication, cloud storage, and cross-device synchronization are not part of the approved product scope.

## Routing

- Primary application routes are locale-prefixed: \`/en/...\` and \`/ru/...\`.
- The active lesson catalog is \`/:locale/structured-lessons\`.
- Old unprefixed URLs and the former \`courses\` / \`lessons/:id\` app paths redirect to the locale-aware structured curriculum.
- The root \`index.html\` and normal application HTML markup are required and remain in the repository.

## Quality and acceptance

GitHub Actions runs dependency installation, production dependency audit, ESLint, TypeScript checking, Vitest, production build, and an HTTP/PWA preview smoke test. A green run validates the configured automation, not editorial approval or real-device behavior.

Manual acceptance remains a separate task: keyboard and screen-reader review, responsive layouts, install/update/offline behavior, storage-denial and quota handling, backup file interactions, and real-browser checks. Dynamically loaded lessons are cached after successful fetch; previously unopened lessons are not guaranteed to be available offline.

## Source of truth

Read the runtime code and tests first. The main implementation areas are:

- \`src/app\` — routing, layouts, and pages
- \`src/content\` — bilingual lesson registry, curriculum, and repository
- \`src/features/structured-lesson\` — structured lesson rendering and learning state
- \`src/features/progress\`, \`bookmarks\`, \`notes\`, \`learning-paths\`, \`search\`, \`backup\` — learner-facing features
- \`src/features/localization\` — EN/RU application copy
- \`src/pwa\` — service-worker update experience
- \`scripts\` — generated indexes, bundle-budget checks, and preview smoke checks

Older standalone-HTML migration inventories and cloud-sync proposals have been removed because they no longer describe the active product.
