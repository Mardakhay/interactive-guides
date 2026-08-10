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

### M2: Static Data Layer
- [ ] Define content type schemas (Course, Lesson, Quiz, LearningPath)
- [ ] Create sample course JSON with lessons
- [ ] Create data loader utilities (lib/)
- [ ] Git commit: `feat: add static content data layer`

---

## Phase 2 — Content & Viewing

### M3: Course Catalog
- [ ] Create course feature: types, api, store, hooks
- [ ] Build CoursesPage with course grid
- [ ] Build CourseCard component
- [ ] Add category and difficulty filters
- [ ] Add loading and empty states
- [ ] Git commit: `feat: implement lesson catalog`

### M4: Course Detail
- [ ] Build CourseDetailPage with course metadata header
- [ ] Build lesson list with order, duration, completion indicators
- [ ] Show overall course progress bar
- [ ] Navigate to lesson viewer on click
- [ ] Git commit: `feat: add course detail page`

### M5: Lesson Viewer
- [ ] Create lesson feature: types, api, store, hooks
- [ ] Build LessonViewerPage rendering interactive HTML content
- [ ] Build lesson navigation (prev/next, table of contents)
- [ ] Show lesson metadata (duration, course context, breadcrumb)
- [ ] Sanitize HTML content for safe rendering
- [ ] Git commit: `feat: add lesson viewer`

---

## Phase 3 — User Features

### M6: Progress Tracking
- [ ] Create progress feature: store (localStorage), types
- [ ] Add "Mark Complete" action in lesson viewer
- [ ] Auto-advance to next lesson on completion
- [ ] Show progress bar on course detail and dashboard
- [ ] Track in_progress vs completed status
- [ ] Persist last opened lesson
- [ ] Git commit: `feat: implement progress tracking`

### M7: Bookmarks
- [ ] Create bookmark feature: store (localStorage), types
- [ ] Add bookmark toggle in lesson viewer
- [ ] Build BookmarksPage with saved lessons list
- [ ] Remove bookmark from list or lesson view
- [ ] Show bookmark state on course lesson list
- [ ] Git commit: `feat: add bookmarks system`

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

**Current Milestone:** M2 — Static Data Layer
**Last Completed:** M1 — Project Initialization
