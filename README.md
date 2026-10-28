# Interactive Guides

Interactive Guides is a bilingual (English/Russian), local-first learning platform for frontend development. It combines a structured curriculum with retained legacy HTML lessons while source content is reviewed and migrated.

## What is included

- Structured lessons with typed content blocks, knowledge checks, coding exercises, and EN/RU lesson files.
- Classic lesson catalog and legacy HTML fallbacks retained during migration.
- Curated learning paths, including a guided frontend capstone from requirements through demo/review.
- Lesson progress, bookmarks, notes, quiz history, search, and dashboard activity.
- Versioned local learning data with JSON backup and restore. Restore replaces the current local learning-data snapshot; it is not a merge.
- PWA manifest, icons, SPA deep-link fallback, and a service worker with scoped runtime asset caching and user-controlled updates.

**Offline limitation:** dynamically loaded lesson chunks are cached after they have been successfully fetched. A lesson never opened online is not guaranteed to work offline. PWA install, offline, update, and native backup-file interactions still require acceptance in real browsers and devices; see the [browser/device checklist](./docs/BROWSER_SMOKE_TEST_CHECKLIST.md).

## Stack

- React 18, TypeScript, Vite 8, Tailwind CSS
- Zustand, React Router 7, Zod
- Vitest, Testing Library, ESLint
- GitHub Actions CI (Node.js 22, npm 11.21.1)

## Getting started

Use Node.js 22 and the npm version pinned in CI when possible:

```bash
npm install --global npm@11.21.1
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

Run the same checks used by CI before submitting a change:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The build includes TypeScript project checks, the production Vite build, and JavaScript bundle-budget enforcement. GitHub Actions runs on pull requests targeting `main` and pushes to `main`. A green automated run is necessary but does not certify source parity, screen-reader behavior, mobile layouts, deployment behavior, or offline acceptance.

## Documentation

- [Project status and constraints](./docs/CURRENT_STATE.md)
- [Implementation roadmap](./docs/ROADMAP.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Curriculum/content model](./docs/CURRICULUM_AND_CONTENT.md)
- [Content authoring guide](./docs/CONTENT_AUTHORING_GUIDE.md)
- [Persistence and backup/Supabase plan](./docs/PERSISTENCE_AND_SUPABASE.md)
- [PWA and mobile behavior](./docs/PWA_AND_MOBILE.md)
- [Browser/device acceptance checklist](./docs/BROWSER_SMOKE_TEST_CHECKLIST.md)
- [Session handoff](./docs/SESSION_HANDOFF.md)
