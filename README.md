# Interactive Guides

Interactive Guides is a bilingual (English/Russian), local-first learning platform for frontend development. The active learning experience uses structured text lessons; there is no account service, hosted backend, or cloud synchronization.

## Learning experience

- Six-month, 24-week frontend curriculum with 27 core topics and 17 supplementary topics.
- 44 stable lesson IDs, each maintained in English and Russian.
- Structured lessons with explanations, examples, code walkthroughs, knowledge checks, coding exercises, and references.
- Guided learning paths, including a frontend capstone.
- Lesson progress, bookmarks, personal notes, practice drafts, self-review checklists, and saved learning activity.
- Search across lesson content and curriculum topics; a separate Practice Center indexes 119 coding exercises.
- JSON backup and restore for browser-local learner data.
- PWA manifest, app icons, service-worker caching, and a user-controlled update prompt.

HTML remains part of the curriculum: semantic HTML and accessible forms are taught as structured lessons. The former standalone HTML lesson-file catalog and its renderer have been retired. Old \`/courses\` and \`/lessons/:id\` URLs redirect to the structured curriculum.

## Technology

- React 18, TypeScript, Vite 8, Tailwind CSS
- React Router 7, Zustand, Zod
- Vitest, Testing Library, ESLint
- GitHub Actions for lint, typecheck, tests, production build, and preview smoke checks
- Netlify for deploy previews and production hosting

## Requirements

Use Node.js 22 and npm 11.21.1, matching the CI toolchain.

## Run locally

\`\`\`bash
npm install --global npm@11.21.1
npm ci
npm run dev
\`\`\`

Vite prints the local development URL.

## Quality checks

\`\`\`bash
npm run lint
npm run typecheck
npm test
npm run build
npm run smoke:preview
\`\`\`

The build generates the lesson search/practice indexes, runs TypeScript checks, creates the production Vite bundle, and enforces bundle budgets. The preview smoke script checks HTTP deep-route fallback and the built entry, manifest, service worker, and PWA assets. It is not a substitute for manual browser, accessibility, or device acceptance.

## Local data and offline behavior

Learner data stays in the browser. Backup restore replaces the current local learning-data snapshot; it is not a merge. Backup files may contain personal notes and code drafts, so keep them private.

Lesson bodies are loaded on demand and can be cached after a successful fetch. A lesson that has never been opened while online is not guaranteed to be available offline. See the [browser/device acceptance checklist](./docs/BROWSER_SMOKE_TEST_CHECKLIST.md).

## Documentation

- [Current state and scope](./docs/CURRENT_STATE.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Product requirements](./docs/PRODUCT_REQUIREMENTS.md)
- [24-week curriculum and content model](./docs/CURRICULUM_AND_CONTENT.md)
- [Structured lesson authoring guide](./docs/CONTENT_AUTHORING_GUIDE.md)
- [Structured content audit](./docs/CONTENT_AUDIT.md)
- [Local persistence and backup](./docs/LOCAL_PERSISTENCE_AND_BACKUP.md)
- [PWA and mobile behavior](./docs/PWA_AND_MOBILE.md)
- [Browser/device acceptance checklist](./docs/BROWSER_SMOKE_TEST_CHECKLIST.md)
- [Implementation roadmap](./docs/ROADMAP.md)
- [Decision log](./docs/DECISIONS.md)
