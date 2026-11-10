# Application Architecture

## Runtime overview

Interactive Guides is a client-side React application built with TypeScript and Vite. It uses React Router for locale-prefixed navigation, Zustand for local application state, and Zod for validation at content and persistence boundaries.

The active application is local-first. There is no API server, user-account layer, Supabase dependency, or cloud synchronization service.

## Main code areas

\`\`\`text
src/
  app/
    pages/                 # routed pages
    router/                # locale-aware routes and legacy URL redirects
  components/
    feedback/              # loading, empty, error, storage feedback
    layout/                # app shell, navigation, breadcrumbs
    ui/                    # reusable primitives
  content/
    curriculum/            # EN/RU 24-week curriculum metadata
    lessons/               # EN/RU structured lesson JSON
    schemas/               # lesson and curriculum contracts
    lessonManifest.ts      # lightweight navigation metadata
    repository.ts          # lesson loading, parsing, and lookup
  features/
    backup/
    bookmarks/
    dashboard/
    learning-paths/
    localization/
    notes/
    persistence/
    progress/
    search/
    structured-lesson/
  lib/
    storage.ts
    versionedStorage.ts
  pwa/
  styles/
\`\`\`

## Content flow

1. The curriculum and lesson manifest provide stable IDs and small navigation labels.
2. Full English or Russian lesson bodies are loaded from their corresponding JSON records when needed.
3. Zod schemas validate the lesson structure and the content repository exposes typed records to the reader.
4. Reusable renderers present headings, explanations, code, walkthroughs, knowledge checks, coding exercises, and references.
5. Search and Practice indexes are generated from structured lesson content; answer feedback, hidden hints, and solutions are excluded from public search/practice summaries where required by the index contract.

## Learner-state flow

Feature stores use browser storage through shared persistence utilities. The backup feature validates a versioned JSON payload and restores a snapshot with best-effort rollback if a storage write fails. Structured lesson activity has its own versioned state contract for attempts, drafts, checklists, and section progress.

Old records with retired lesson IDs are retained locally but are filtered out of active lesson surfaces. The application does not automatically map those IDs to structured lessons.

## Quality boundaries

ESLint, TypeScript, Vitest, the Vite production build, bundle budgets, and preview HTTP smoke tests run in CI. They do not replace human review for content accuracy, EN/RU editorial quality, keyboard/screen-reader behavior, mobile layouts, PWA installation, or native file interactions.

## Key principles

- Keep stable lesson IDs and equivalent EN/RU block structures.
- Keep content data separate from reusable rendering components.
- Keep state access behind feature stores and persistence utilities.
- Keep local-only functionality useful without a connection or account.
- Avoid speculative service layers and backend abstractions that have no current consumer.
