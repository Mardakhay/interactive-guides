# Interactive Guides

Interactive Guides is a local-first learning platform for structured technical lessons. It supports course browsing, lesson progress, bookmarks, notes, quizzes, search, learning paths, and a progress dashboard.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- Zod
- Vitest and Testing Library

## Features

- Browse courses and interactive HTML lessons
- Track lesson progress and continue learning
- Bookmark lessons
- Create and manage lesson notes
- Complete quizzes and view saved results
- Search lessons, courses, and notes
- Follow curated learning paths
- View dashboard recommendations and activity

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Scripts

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

## Quality Checks

The project includes ESLint, TypeScript strict checking, Vitest tests, and GitHub Actions CI.

CI runs the following checks on every push and pull request to `main`:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
