# Interactive Guides — Architecture Plan

## 1. Overview

Interactive Guides is a learning platform that transforms interactive HTML lessons into structured courses. Users can track their progress, bookmark lessons, take notes, complete quizzes, search across content, and follow guided learning paths.

### Core Capabilities

| Capability        | Description                                                            |
|-------------------|------------------------------------------------------------------------|
| Course Catalog    | Browse structured courses containing ordered lessons                   |
| Lesson Viewer     | Render interactive HTML lessons with embedded activities               |
| Progress Tracking | Per-user completion state for lessons and courses                      |
| Bookmarks         | Save lessons for quick access                                          |
| Notes             | Annotate lessons with personal notes                                   |
| Quiz Engine       | Knowledge checks embedded in or associated with lessons                |
| Search            | Full-text search across lessons, courses, and notes                    |
| Learning Paths    | Curated sequences of courses with guided progression                   |
| Dashboard         | Personalized overview of progress, bookmarks, and recommendations     |

---

## 2. Technology Stack

| Concern             | Technology                                   |
|---------------------|----------------------------------------------|
| Framework           | React 18 + TypeScript (strict mode)          |
| Build Tool          | Vite                                         |
| Styling             | Tailwind CSS                                 |
| Routing             | React Router v6                              |
| State Management    | Zustand                                      |
| Backend / Database  | Supabase (Postgres, Auth, Storage, Edge Fn)  |
| Data Validation     | Zod (runtime validation of API/DB responses) |
| Icons               | lucide-react                                 |
| Testing             | Vitest + React Testing Library               |

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
│            Infrastructure Layer               │  Supabase client, API access
└──────────────────────────────────────────────┘
```

- **UI Layer** — Presentational components and pages. No direct database access.
- **Application Layer** — Zustand stores and custom hooks that orchestrate data flow and hold UI state. Components talk to stores, never to Supabase directly.
- **Domain Layer** — Shared TypeScript types, enums, and pure business logic (validation helpers, completion calculators). No external dependencies.
- **Infrastructure Layer** — Supabase client initialization and repository functions that encapsulate all database queries. The only layer that imports `@supabase/supabase-js`.

### Dependency Rule

Dependencies always point inward. The UI layer depends on the application layer; the application layer depends on the domain and infrastructure layers; the domain layer depends on nothing. This keeps business logic testable and swappable.

### Feature-Based Organization

Each feature (courses, lessons, bookmarks, etc.) is a self-contained vertical slice containing its own components, hooks, types, and store slice. Cross-feature communication happens through shared stores and types, not direct imports between feature folders.

---

## 4. Folder Structure

```
interactive-guides/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/                          # Application shell and global configuration
│   │   ├── App.tsx                   # Root component, mounts providers + router
│   │   ├── providers/
│   │   │   ├── QueryProvider.tsx     # (future) React Query provider if needed
│   │   │   └── ThemeProvider.tsx     # Theme context (light/dark)
│   │   └── router/
│   │       ├── index.tsx             # Router configuration, route definitions
│   │       └── routes.ts             # Route path constants
│   │
│   ├── features/                     # Feature modules — vertical slices
│   │   ├── auth/
│   │   │   ├── components/           # SignIn, SignUp, AuthGuard
│   │   │   ├── hooks/
│   │   │   ├── store.ts              # Zustand auth store
│   │   │   └── types.ts
│   │   ├── courses/
│   │   │   ├── components/           # CourseCard, CourseList, CourseDetail
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts                # Supabase queries for courses
│   │   │   └── types.ts
│   │   ├── lessons/
│   │   │   ├── components/           # LessonViewer, LessonNav, LessonSidebar
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   ├── progress/
│   │   │   ├── components/           # ProgressBar, ProgressIndicator
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   ├── bookmarks/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   ├── notes/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   ├── quizzes/
│   │   │   ├── components/           # QuizRenderer, QuizQuestion, QuizResult
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   ├── search/
│   │   │   ├── components/           # SearchBar, SearchResults
│   │   │   ├── hooks/
│   │   │   ├── store.ts
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   └── dashboard/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── store.ts
│   │
│   ├── components/                   # Shared UI components — cross-feature reuse
│   │   ├── ui/                       # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
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
│   │   └── uiStore.ts                # Sidebar open/close, theme, active modal
│   │
│   ├── lib/                          # Infrastructure + utilities
│   │   ├── supabase.ts               # Supabase client initialization
│   │   ├── utils.ts                  # cn() class merge, formatters
│   │   ├── constants.ts              # App-wide constants, nav items
│   │   └── validation.ts             # Zod schemas
│   │
│   ├── types/                        # Shared domain types (cross-feature)
│   │   ├── database.ts               # Supabase generated types
│   │   └── common.ts                 # Shared types (PaginatedResult, etc.)
│   │
│   ├── hooks/                        # Shared custom hooks (cross-feature)
│   │   ├── useMediaQuery.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   │
│   └── styles/
│       └── index.css                 # Tailwind directives + global styles
│
├── supabase/
│   └── functions/                    # Edge functions (if needed later)
│
├── index.html
├── vite.config.ts
├── tsconfig.json
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
| `app/`        | Application-level wiring: providers, router config. The composition root. |
| `features/`   | Self-contained feature modules. Each is a vertical slice with its own components, hooks, store, API access, and types. Features don't import from each other directly — they communicate through shared types and the store layer. |
| `components/` | Design system primitives and layout components shared across features. Anything used by 2+ features lives here. |
| `stores/`     | Global stores that span features (e.g., UI state like sidebar toggle, theme). Feature-specific stores live inside `features/<name>/store.ts`. |
| `lib/`        | Infrastructure layer: Supabase client, utility functions, constants, validation schemas. The only place that knows about Supabase connection details. |
| `types/`      | Shared domain types used across feature boundaries. Feature-internal types stay in `features/<name>/types.ts`. |
| `hooks/`      | Generic hooks not tied to any feature (useMediaQuery, useDebounce). Feature-specific hooks stay in their feature folder. |

---

## 5. Data Model (Supabase)

### Entity Relationship

```
profiles ──< lesson_progress >── lessons
profiles ──< bookmarks >── lessons
profiles ──< notes >── lessons
profiles ──< quiz_results >── quizzes
courses ──< lessons
courses ──< learning_path_courses >── learning_paths
lessons ──< quizzes
```

### Tables

| Table                    | Purpose                                                        |
|--------------------------|----------------------------------------------------------------|
| `profiles`               | User display name, avatar URL, created_at (1:1 with auth.users)|
| `courses`                | Title, description, category, difficulty, estimated hours      |
| `lessons`                | Title, slug, HTML content, order, course_id, duration_minutes  |
| `learning_paths`         | Curated sequences: title, description                          |
| `learning_path_courses`  | Junction: learning_path_id, course_id, order                   |
| `quizzes`                | Questions (JSONB), lesson_id, passing_score                    |
| `lesson_progress`        | user_id, lesson_id, status (in_progress/completed), completed_at|
| `bookmarks`              | user_id, lesson_id, created_at (unique pair)                   |
| `notes`                  | user_id, lesson_id, content, created_at, updated_at            |
| `quiz_results`           | user_id, quiz_id, score, answers (JSONB), passed, attempted_at |

All tables use RLS with `auth.uid()` ownership checks. Seed data (courses, lessons, quizzes) is readable by all authenticated users; user-specific data (progress, bookmarks, notes, quiz_results) is scoped to the owner.

---

## 6. State Management Strategy

### Zustand Store Architecture

Each feature owns its store. Stores are the application layer — components call store actions, stores call infrastructure-layer API functions.

```
Component → Store Action → API Function (lib/) → Supabase
                ↓
         Updates local state
                ↓
         Component re-renders
```

| Store                  | Responsibility                                              |
|------------------------|-------------------------------------------------------------|
| `authStore`            | Session, user profile, sign in / sign out                   |
| `courseStore`          | Catalog list, current course, loading states                |
| `lessonStore`          | Current lesson, lesson list within course, navigation       |
| `progressStore`        | Per-lesson completion map, course completion percentage     |
| `bookmarkStore`        | Bookmarked lesson IDs, add/remove                           |
| `notesStore`           | Notes per lesson, create/edit/delete                        |
| `quizStore`            | Current quiz state, answers, score, submission              |
| `searchStore`          | Query string, results, filters, loading                     |
| `uiStore`              | Sidebar open/closed (mobile), theme, active modals          |

### Why Zustand (not Redux/Context)

- Minimal boilerplate — no actions/reducers/dispatch
- Selectors prevent unnecessary re-renders
- Stores can be composed without a provider tree
- TypeScript-friendly out of the box
- Each feature owns its store, keeping coupling low

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
| `/profile`                    | ProfilePage          | User settings, progress summary       |
| `/signin`                     | SignInPage           | Authentication (outside app layout)  |
| `/signup`                     | SignUpPage           | Registration (outside app layout)    |

Protected routes redirect to `/signin` when unauthenticated. Auth routes redirect to `/` when already authenticated.

---

## 8. Design System

### Color System

Six color ramps (primary, secondary, accent, success, warning, error) plus neutral tones. Each ramp has multiple shades (50–900). The primary palette is blue-based — professional, trustworthy, suitable for an educational platform.

### Typography

- **Headings:** Inter (or system fallback) — 600 weight, 120% line-height
- **Body:** Inter (or system fallback) — 400 weight, 150% line-height
- **Code:** JetBrains Mono — for lesson code blocks

Maximum 3 font weights per page (400, 500, 600).

### Spacing

8px base unit. Tailwind's spacing scale aligns: `gap-2` = 8px, `gap-4` = 16px, etc.

### Responsive Breakpoints

Mobile-first. Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

- Mobile: single column, bottom navigation or hamburger sidebar
- Tablet: sidebar collapses to icons, content widens
- Desktop: persistent sidebar, full content area

---

## 9. Implementation Roadmap

### Phase 1 — Foundation (Milestones 1–3)

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M1        | Project initialization: Vite + React + TypeScript + Tailwind + strict mode |
| M2        | Application shell: AppLayout, Sidebar, TopBar, responsive navigation, routing skeleton |
| M3        | Supabase client setup, database schema migration (all tables + RLS), shared types |

### Phase 2 — Content & Viewing (Milestones 4–6)

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M4        | Course catalog: course listing page with cards, filters by category/difficulty |
| M5        | Course detail page: lesson list with progress indicators, course metadata |
| M6        | Lesson viewer: renders interactive HTML, prev/next navigation, table of contents |

### Phase 3 — User Features (Milestones 7–10)

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M7        | Progress tracking: mark lessons complete, course progress bar, dashboard integration |
| M8        | Bookmarks: toggle bookmarks from lesson view, bookmarks page, remove bookmarks |
| M9        | Notes: create/edit/delete notes on lessons, notes listing page with filters |
| M10       | Quiz engine: render questions, capture answers, score, save results, retry |

### Phase 4 — Discovery & Polish (Milestones 11–13)

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M11       | Search: full-text search across lessons/courses/notes, result filters, debounced input |
| M12       | Learning paths: curated course sequences, path detail, path progress |
| M13       | Dashboard: progress overview, continue learning, recent activity, recommendations |

### Phase 5 — Hardening (Milestones 14–15)

| Milestone | Deliverable                              |
|-----------|------------------------------------------|
| M14       | Accessibility audit: keyboard navigation, ARIA labels, focus management, color contrast |
| M15       | Performance & polish: lazy-loaded routes, skeleton loaders, empty states, error boundaries, responsive design pass |
