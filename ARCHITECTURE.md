# Interactive Guides — Architecture Plan (MVP)

## 1. Overview

Interactive Guides is a learning platform that transforms interactive HTML lessons into structured courses. Users can track their progress, bookmark lessons, take notes, complete quizzes, search across content, and follow guided learning paths.

### MVP Scope

The first version is a **local-first single-user application** with no backend, no authentication, and no remote storage. All persistence happens in the browser via `localStorage`. Lesson and course content is sourced from local JSON files bundled with the app.

| Capability        | MVP Status | Persistence           |
|-------------------|------------|-----------------------|
| Course Catalog    | Yes        | Local JSON (static)   |
| Lesson Viewer     | Yes        | Local JSON (static)   |
| Progress Tracking | Yes        | localStorage          |
| Bookmarks         | Yes        | localStorage          |
| Notes             | Yes        | localStorage          |
| Quiz Engine       | Yes        | localStorage (results)|
| Search            | Yes        | In-memory over JSON   |
| Learning Paths    | Yes        | Local JSON (static)   |
| Dashboard         | Yes        | Derived from above    |
| Authentication    | No         | —                     |
| Multi-user        | No         | —                     |

### Scalability Path

The architecture is designed so a Supabase backend can be layered in later without rewriting the UI or application layers. Data access is isolated behind repository-style modules (`api.ts` / `lib/`), so swapping localStorage for Supabase is a change in one layer, not a refactor across the app.

---

## 2. Technology Stack

| Concern             | Technology                                   |
|---------------------|----------------------------------------------|
| Framework           | React 18 + TypeScript (strict mode)          |
| Build Tool          | Vite                                         |
| Styling             | Tailwind CSS                                 |
| Routing             | React Router v6                              |
| State Management    | Zustand                                      |
| Data Source         | Local JSON files (courses, lessons, quizzes) |
| Persistence         | localStorage (progress, bookmarks, notes)    |
| Data Validation     | Zod (runtime validation of JSON + storage)   |
| Icons               | lucide-react                                 |

---

## 3. Architecture Principles

### Clean Architecture Layers

```
┌──────────────────────────────────────────────┐
│                  UI Layer                     │  React components, pages
├──────────────────────────────────────────────┤
│               Application Layer               │  Hooks, stores (Zustand)
├──────────────────────────────────────────────┤
│                 Domain Layer                  │  Types, business rules, models
├──────────────────────────────────────────────┤
│            Infrastructure Layer               │  JSON loaders, localStorage repos
└──────────────────────────────────────────────┘
```

- **UI Layer** — Presentational components and pages. No direct data access.
- **Application Layer** — Zustand stores and custom hooks that orchestrate data flow and hold UI state. Components talk to stores, never to storage or JSON directly.
- **Domain Layer** — Shared TypeScript types, enums, and pure business logic. No external dependencies.
- **Infrastructure Layer** — JSON content loaders and localStorage repository functions. The only layer that reads `localStorage` or imports content JSON. When Supabase is added later, this is the only layer that changes.

### Dependency Rule

Dependencies always point inward. The UI layer depends on the application layer; the application layer depends on the domain and infrastructure layers; the domain layer depends on nothing.

### Feature-Based Organization

Each feature (courses, lessons, bookmarks, etc.) is a self-contained vertical slice containing its own components, hooks, types, and store. Cross-feature communication happens through shared stores and types, not direct imports between feature folders.

---

## 4. Folder Structure

```
interactive-guides/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/                          # Application shell and global configuration
│   │   ├── App.tsx                   # Root component, mounts router
│   │   ├── router/
│   │   │   ├── index.tsx             # Router configuration, route definitions
│   │   │   └── routes.ts             # Route path constants
│   │   └── pages/                    # Route-level page components
│   │       ├── DashboardPage.tsx
│   │       ├── CoursesPage.tsx
│   │       ├── CourseDetailPage.tsx
│   │       ├── LessonViewerPage.tsx
│   │       ├── BookmarksPage.tsx
│   │       ├── NotesPage.tsx
│   │       ├── SearchPage.tsx
│   │       └── NotFoundPage.tsx
│   │
│   ├── features/                     # Feature modules — vertical slices
│   │   ├── courses/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts                # Loads course JSON
│   │   │   └── types.ts
│   │   ├── lessons/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts                # Loads lesson JSON
│   │   │   └── types.ts
│   │   ├── progress/
│   │   │   ├── store.ts              # localStorage-backed
│   │   │   └── types.ts
│   │   ├── bookmarks/
│   │   │   ├── store.ts              # localStorage-backed
│   │   │   └── types.ts
│   │   ├── notes/
│   │   │   ├── store.ts              # localStorage-backed
│   │   │   └── types.ts
│   │   ├── quizzes/
│   │   │   ├── components/
│   │   │   ├── store.ts
│   │   │   └── types.ts
│   │   ├── search/
│   │   │   ├── store.ts
│   │   │   └── types.ts
│   │   └── dashboard/
│   │       └── components/
│   │
│   ├── components/                   # Shared UI components — cross-feature reuse
│   │   ├── ui/                       # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts              # Barrel export
│   │   ├── layout/                   # Structural layout components
│   │   │   ├── AppLayout.tsx         # Main app shell with sidebar + content
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── MobileNav.tsx
│   │   └── feedback/                 # Reusable state components
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── EmptyState.tsx
│   │       └── index.ts
│   │
│   ├── stores/                       # Global Zustand stores (cross-feature)
│   │   └── uiStore.ts                # Sidebar open/close, theme
│   │
│   ├── lib/                          # Infrastructure + utilities
│   │   ├── storage.ts                # localStorage repository helpers
│   │   ├── utils.ts                  # cn() class merge, formatters
│   │   ├── constants.ts              # App-wide constants, nav items
│   │   └── validation.ts             # Zod schemas (added with content features)
│   │
│   ├── data/                         # Static JSON content (source of truth)
│   │   ├── courses.json
│   │   ├── lessons/
│   │   │   └── *.json
│   │   └── learning-paths.json
│   │
│   ├── types/                        # Shared domain types (cross-feature)
│   │   └── common.ts                 # Shared types (NavItem, Result, etc.)
│   │
│   ├── hooks/                        # Shared custom hooks (cross-feature)
│   │   ├── useMediaQuery.ts
│   │   └── useDebounce.ts
│   │
│   ├── styles/
│   │   └── index.css                 # Tailwind directives + global styles
│   │
│   └── main.tsx                      # Vite entry point
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.ts
├── postcss.config.js
├── package.json
├── PROJECT_TASKS.md
├── DEVELOPMENT_RULES.md
├── ARCHITECTURE.md
└── README.md
```

### Folder Rationale

| Folder        | Purpose                                                                 |
|---------------|-------------------------------------------------------------------------|
| `app/`        | Application-level wiring: router config and route-level page components. The composition root. |
| `features/`   | Self-contained feature modules. Each is a vertical slice with its own components, hooks, store, API access, and types. Features don't import from each other directly. |
| `components/` | Design system primitives and layout components shared across features. Anything used by 2+ features lives here. |
| `stores/`     | Global stores that span features (e.g., UI state like sidebar toggle). Feature-specific stores live inside `features/<name>/store.ts`. |
| `lib/`        | Infrastructure layer: localStorage helpers, utility functions, constants. The only place that reads/writes `localStorage`. |
| `data/`       | Static JSON content — the source of truth for courses, lessons, quizzes, and learning paths. |
| `types/`      | Shared domain types used across feature boundaries. Feature-internal types stay in `features/<name>/types.ts`. |
| `hooks/`      | Generic hooks not tied to any feature (useMediaQuery, useDebounce). |

---

## 5. Data Strategy

### Content (Static)

Courses, lessons, quizzes, and learning paths are stored as JSON files in `src/data/`. These are imported directly by feature `api.ts` modules. Vite handles JSON imports natively. This is the source of truth for all educational content.

### User State (localStorage)

| Key                        | Shape                                   |
|----------------------------|-----------------------------------------|
| `ig:progress`              | `{ [lessonId]: { status, completedAt } }` |
| `ig:bookmarks`             | `{ [lessonId]: { createdAt } }`          |
| `ig:notes`                 | `{ [lessonId]: { content, updatedAt } }` |
| `ig:last-lesson`           | `lessonId`                              |

All localStorage access is funneled through `lib/storage.ts`, which provides typed read/write helpers with Zod validation and graceful fallbacks for corrupted/missing data. Stores hydrate from localStorage on initialization and persist on every change via Zustand middleware.

### Future Supabase Migration

When authentication and multi-user support are added, only the infrastructure layer changes:
- `lib/storage.ts` → `lib/supabase.ts` + feature `api.ts` files
- Stores swap `localStorage` persistence for Supabase queries
- UI and application layers remain unchanged

---

## 6. State Management Strategy

### Zustand Store Architecture

Each feature owns its store. Stores are the application layer — components call store actions, stores call infrastructure-layer functions.

```
Component → Store Action → api.ts (JSON) / storage.ts (localStorage)
                ↓
         Updates local state + persists
                ↓
         Component re-renders
```

| Store                  | Responsibility                                              |
|------------------------|-------------------------------------------------------------|
| `uiStore`              | Sidebar open/closed (mobile), theme                         |
| `courseStore`          | Catalog list, current course, loading states                |
| `lessonStore`          | Current lesson, lesson list within course, navigation       |
| `progressStore`        | Per-lesson completion map, course completion percentage     |
| `bookmarkStore`        | Bookmarked lesson IDs, add/remove                           |
| `notesStore`           | Notes per lesson, create/edit/delete                        |
| `quizStore`            | Current quiz state, answers, score                          |
| `searchStore`          | Query string, results, filters, loading                     |

---

## 7. Routing Plan

| Path                          | Page Component       | Description                           |
|-------------------------------|----------------------|---------------------------------------|
| `/`                           | DashboardPage        | Progress overview, continue learning  |
| `/courses`                    | CoursesPage          | Browse all courses                    |
| `/courses/:courseId`          | CourseDetailPage     | Course info + lesson list             |
| `/lessons/:lessonId`          | LessonViewerPage     | Interactive lesson with nav           |
| `/paths`                      | LearningPathsPage    | Browse guided learning paths          |
| `/paths/:pathId`              | LearningPathDetailPage | Path overview + course sequence      |
| `/bookmarks`                  | BookmarksPage        | Saved lessons                         |
| `/notes`                      | NotesPage            | All notes, filterable by lesson       |
| `/search`                     | SearchPage           | Search results with filters           |
| `*`                           | NotFoundPage         | 404 fallback                          |

No auth routes or protected routes in the MVP — the app is single-user and fully open.

---

## 8. Design System

### Color System

Six color ramps (primary, secondary, accent, success, warning, error) plus neutral tones. Each ramp has multiple shades (50–900). The primary palette is blue-based — professional, trustworthy, suitable for an educational platform.

### Typography

- **Headings & Body:** Inter (system fallback) — 600 weight for headings (120% line-height), 400 weight for body (150% line-height)
- **Code:** JetBrains Mono — for lesson code blocks

Maximum 3 font weights per page (400, 500, 600).

### Spacing

8px base unit via Tailwind's spacing scale.

### Responsive Breakpoints

Mobile-first. Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

- Mobile: single column, hamburger-triggered sidebar drawer
- Tablet: sidebar collapses to icons, content widens
- Desktop: persistent sidebar, full content area

---

## 9. Implementation Roadmap

### Phase 1 — Foundation

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M1        | Project initialization: Vite + React + TS strict + Tailwind + Router + Zustand + path aliases + folder structure + layout system + theme foundation + empty routes |
| M2        | Static data layer: JSON content schema, course/lesson JSON, data loader utilities |

### Phase 2 — Content & Viewing

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M3        | Course catalog: course listing page with cards, filters |
| M4        | Course detail page: lesson list, course metadata |
| M5        | Lesson viewer: renders interactive HTML, prev/next, table of contents |

### Phase 3 — User Features

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M6        | Progress tracking: mark complete, progress bars, dashboard |
| M7        | Bookmarks: toggle, bookmarks page, remove |
| M8        | Notes: create/edit/delete, notes listing |
| M9        | Quiz engine: render, score, save results, retry |

### Phase 4 — Discovery & Polish

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M10       | Search: full-text across JSON content, filters, debounce |
| M11       | Learning paths: curated sequences, path progress |
| M12       | Dashboard: progress overview, continue learning, recommendations |
| M13       | Accessibility & performance: keyboard nav, ARIA, lazy routes, skeletons, error boundaries |
