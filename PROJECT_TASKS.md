# PROJECT_TASKS.md — Interactive Guides (MVP)

> Tracking document for all milestones and features.
> Updated after every major milestone.

---

## Status Legend

- [x] Completed
- [ ] Pending
- [~] In Progress

---

## Phase 1 — Foundation

### M1: Project Initialization
- [x] Update architecture plan for MVP (local-first, no backend)
- [x] Update PROJECT_TASKS.md for MVP roadmap
- [x] Update DEVELOPMENT_RULES.md for MVP stack
- [x] Initialize Vite + React + TypeScript (strict mode)
- [x] Configure Tailwind CSS with design system (colors, typography, spacing)
- [x] Install dependencies: React Router, Zustand, lucide-react, clsx, tailwind-merge
- [x] Configure tsconfig.json (strict, path aliases)
- [x] Configure vite.config.ts (path aliases)
- [x] Set up base folder structure (app/, features/, components/, lib/, types/, hooks/, stores/)
- [x] Create reusable layout system (AppLayout, Sidebar, TopBar, MobileNav)
- [x] Create theme foundation (6 color ramps, Inter font, 8px spacing, animations)
- [x] Create empty routes with lazy-loaded placeholder pages
- [x] Create global UI store (uiStore: sidebar toggle)
- [x] Create shared utilities (cn, constants, storage helpers)
- [x] Create UI primitives (Button, Card, Input, Badge, Spinner)
- [x] Create feedback components (LoadingState, ErrorState, EmptyState, Skeleton)
- [x] Create shared hooks (useMediaQuery, useDebounce)
- [x] Git commit: `feat: initialize project architecture`

### M2: Content Foundation
- [x] Define TypeScript types (Category, Lesson, LessonDifficulty, LessonStatus)
- [x] Create Zod validation schemas for categories and lessons
- [x] Create categories.json with 9 categories (Start Here, Web Basics, JavaScript, React, UI/Design, Tooling, Quality, Security, Data)
- [x] Create lessons.json with 30 realistic sample lessons across all categories
- [x] Create data access utilities (getCategories, getCategoryById, getLessons, getLessonById, getLessonsByCategory, getCatalog)
- [x] Create content feature module (src/features/content/)
- [x] Build catalog page displaying categories with lesson counts and descriptions
- [x] Git commit: `feat: create content foundation and catalog`

---

## Phase 2 — Content & Viewing

### M3: Lesson Viewer Infrastructure
- [x] Create category route (/courses/:categoryId) and lesson route (/lessons/:lessonId)
- [x] Create route helper functions (coursePath, lessonPath)
- [x] Build CourseDetailPage with category header, lesson list, difficulty badges, durations
- [x] Build LessonViewerPage with breadcrumb, title, description, placeholder content
- [x] Create lesson navigation component (previous/next within category)
- [x] Create getAdjacentLessons() logic for next/previous lesson
- [x] Create Breadcrumbs component with multi-level trail
- [x] Create LessonSidebarTree with expandable categories and lesson links
- [x] Create LessonMetadata panel (difficulty, duration, category link, tags)
- [x] Create lesson not-found state with EmptyState
- [x] Git commit: `feat: create lesson viewer infrastructure`

### M4: HTML Lesson Engine
- [x] Create lesson-rendering feature module (src/features/lesson-renderer/)
- [x] Add types for lesson rendering (LessonSource) and manifests (LessonManifest)
- [x] Add LessonRenderer component that dispatches on source type
- [x] Add LessonLoader abstraction (resolveLessonSource / defaultLessonLoader)
- [x] Support inline-html rendering mode (current lessons.json content)
- [x] Support external-html rendering mode (sandboxed iframe, future-ready, unused today)
- [x] Wire LessonRenderer into LessonViewerPage, replacing the placeholder block
- [x] Keep breadcrumbs, lesson tree, metadata panel, and navigation unchanged
- [x] Add placeholder lesson manifest registry (empty, keyed by lesson id)
- [x] Add `.lesson-content` typography styles in styles/index.css
- [x] Remove tracked build artifacts (vite.config.js, vite.config.d.ts, tsconfig.tsbuildinfo) and gitignore them
- [x] Verify typecheck and build pass
- [x] Git commit: `feat: create html lesson engine`

### M4.5: Import Real HTML Lessons (Phase 2)
- [x] Delete duplicate lesson files (dev-guide.html, master-npm-typescript-react.html)
- [x] Move 25 real HTML lesson files to public/lessons/ for static serving
- [x] Replace all 30 mock lessons in lessons.json with 25 real lessons across 9 categories
- [x] Wire every lesson into manifestRegistry in lessonLoader.ts (external-html source)
- [x] Update categories.json descriptions to match real lesson content
- [x] Verify typecheck and build pass with all 25 lessons
- [x] Git commit: `chore: finalize real lesson import`

---

## Phase 3 — User Features

### M6: Progress Tracking
- [x] Create progress feature: store (localStorage), types
- [x] Add "Mark Complete" action in lesson viewer
- [x] Auto-advance to next lesson on completion
- [x] Show progress bar on course detail and dashboard
- [x] Track in_progress vs completed status
- [x] Persist last opened lesson
- [x] Git commit: `feat: implement progress tracking`

### M7: Bookmarks
- [x] Create bookmark feature: store (localStorage), types
- [x] Add bookmark toggle in lesson viewer
- [x] Build BookmarksPage with saved lessons list
- [x] Remove bookmark from list or lesson view
- [x] Show bookmark state on course lesson list
- [x] Git commit: `feat: add bookmarks system`

### M8: Notes
- [ ] Create notes feature: store (localStorage), types
- [ ] Add notes panel in lesson viewer (create, edit, delete)
- [ ] Build NotesPage with all notes, filterable by lesson/course
- [ ] Show note timestamps and lesson context
- [ ] Git commit: `feat: add notes feature`

### M9: Quiz Engine
- [ ] Create quiz feature: types, store (localStorage), components
- [ ] Build QuizRenderer (multiple choice, true/false)
- [ ] Capture answers and calculate score
- [ ] Show quiz results with correct/incorrect feedback
- [ ] Save quiz results to localStorage
- [ ] Allow quiz retry
- [ ] Git commit: `feat: add quiz engine`

---

## Phase 4 — Discovery & Polish

### M10: Search
- [ ] Create search feature: store, types
- [ ] Build SearchBar with debounce
- [ ] Build SearchPage with results across lessons, courses, notes
- [ ] Add result type filters
- [ ] Highlight matching terms
- [ ] Git commit: `feat: implement search functionality`

### M11: Learning Paths
- [ ] Create learning paths feature: types, api, store
- [ ] Build LearningPathsPage with path cards
- [ ] Build LearningPathDetailPage with course sequence
- [ ] Show path progress
- [ ] Git commit: `feat: add guided learning paths`

### M12: Dashboard
- [ ] Create dashboard feature: components, hooks
- [ ] Show "Continue Learning" with last in-progress lesson
- [ ] Show overall progress summary
- [ ] Show recent bookmarks and notes
- [ ] Show recommended next courses/paths
- [ ] Git commit: `feat: add dashboard overview`

### M13: Accessibility & Performance
- [ ] Keyboard navigation audit
- [ ] ARIA labels on interactive elements
- [ ] Focus management for modals and route transitions
- [ ] Color contrast verification (WCAG AA)
- [ ] Lazy-load route components
- [ ] Add skeleton loaders and error boundaries
- [ ] Responsive design audit
- [ ] Git commit: `feat: improve accessibility and performance`

---

## Summary

| Phase | Milestones | Focus                    |
|-------|------------|--------------------------|
| 1     | M1–M2      | Foundation & Data Layer  |
| 2     | M3–M5      | Content & Viewing        |
| 3     | M6–M9      | User Features            |
| 4     | M10–M13    | Discovery & Polish       |

**Current Milestone:** M8 — Notes
**Last Completed:** M7 — Bookmarks
