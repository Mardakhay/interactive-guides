# PROJECT_TASKS.md — Interactive Guides

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
- [x] Define architecture plan (ARCHITECTURE.md)
- [x] Create project task tracker (PROJECT_TASKS.md)
- [x] Create development rules (DEVELOPMENT_RULES.md)
- [ ] Initialize Vite + React + TypeScript (strict mode)
- [ ] Configure Tailwind CSS with design system (colors, typography, spacing)
- [ ] Install dependencies: React Router, Zustand, Supabase JS, Zod, lucide-react
- [ ] Configure tsconfig.json (strict, path aliases)
- [ ] Configure vite.config.ts (path aliases)
- [ ] Set up base folder structure (app/, features/, components/, lib/, types/, hooks/, stores/)
- [ ] Create Supabase client (lib/supabase.ts)
- [ ] Initial git commit: `feat: initialize project architecture`

### M2: Application Shell
- [ ] Create root App.tsx with providers
- [ ] Set up React Router with route skeleton (all routes defined, pages as placeholders)
- [ ] Build AppLayout (sidebar + topbar + content area)
- [ ] Build Sidebar navigation with nav items
- [ ] Build TopBar with search trigger and user menu
- [ ] Build MobileNav (responsive bottom nav or hamburger drawer)
- [ ] Create UI primitives: Button, Card, Badge, Spinner, Input
- [ ] Create feedback components: LoadingState, ErrorState, EmptyState
- [ ] Create Zustand uiStore (sidebar toggle, theme)
- [ ] Git commit: `feat: create application shell`

### M3: Database Schema & Shared Types
- [ ] Create Supabase migration: profiles, courses, lessons tables
- [ ] Create Supabase migration: learning_paths, learning_path_courses
- [ ] Create Supabase migration: quizzes, quiz_results
- [ ] Create Supabase migration: lesson_progress, bookmarks, notes
- [ ] Enable RLS on all tables with proper ownership policies
- [ ] Create seed data: 2–3 sample courses with lessons
- [ ] Generate / write TypeScript database types (types/database.ts)
- [ ] Create shared domain types (types/common.ts)
- [ ] Git commit: `feat: implement database schema and shared types`

---

## Phase 2 — Content & Viewing

### M4: Course Catalog
- [ ] Create course feature: types, api, store, hooks
- [ ] Build CoursesPage with course grid
- [ ] Build CourseCard component (title, description, category, difficulty, progress)
- [ ] Add category and difficulty filters
- [ ] Add loading and empty states
- [ ] Git commit: `feat: implement lesson catalog`

### M5: Course Detail
- [ ] Build CourseDetailPage with course metadata header
- [ ] Build lesson list with order, duration, completion indicators
- [ ] Show overall course progress bar
- [ ] Navigate to lesson viewer on click
- [ ] Git commit: `feat: add course detail page`

### M6: Lesson Viewer
- [ ] Create lesson feature: types, api, store, hooks
- [ ] Build LessonViewerPage rendering interactive HTML content
- [ ] Build lesson navigation (prev/next, table of contents)
- [ ] Show lesson metadata (duration, course context, breadcrumb)
- [ ] Sanitize HTML content for safe rendering
- [ ] Git commit: `feat: add lesson viewer`

---

## Phase 3 — User Features

### M7: Progress Tracking
- [ ] Create progress feature: types, api, store, hooks
- [ ] Add "Mark Complete" action in lesson viewer
- [ ] Auto-advance to next lesson on completion
- [ ] Show progress bar on course detail and dashboard
- [ ] Track in_progress vs completed status
- [ ] Git commit: `feat: implement progress tracking`

### M8: Bookmarks
- [ ] Create bookmark feature: types, api, store, hooks
- [ ] Add bookmark toggle in lesson viewer
- [ ] Build BookmarksPage with saved lessons list
- [ ] Remove bookmark from list or lesson view
- [ ] Show bookmark state on course lesson list
- [ ] Git commit: `feat: add bookmarks system`

### M9: Notes
- [ ] Create notes feature: types, api, store, hooks
- [ ] Add notes panel in lesson viewer (create, edit, delete)
- [ ] Build NotesPage with all notes, filterable by lesson/course
- [ ] Show note timestamps and lesson context
- [ ] Git commit: `feat: add notes feature`

### M10: Quiz Engine
- [ ] Create quiz feature: types, api, store, hooks
- [ ] Build QuizRenderer (multiple choice, true/false)
- [ ] Capture answers and calculate score
- [ ] Show quiz results with correct/incorrect feedback
- [ ] Save quiz results to database
- [ ] Allow quiz retry
- [ ] Git commit: `feat: add quiz engine`

---

## Phase 4 — Discovery & Polish

### M11: Search
- [ ] Create search feature: types, api, store, hooks
- [ ] Build SearchBar in TopBar with debounce
- [ ] Build SearchPage with results across lessons, courses, notes
- [ ] Add result type filters (lessons, courses, notes)
- [ ] Highlight matching terms in results
- [ ] Git commit: `feat: implement search functionality`

### M12: Learning Paths
- [ ] Create learning paths feature: types, api, store, hooks
- [ ] Build LearningPathsPage with path cards
- [ ] Build LearningPathDetailPage with course sequence
- [ ] Show path progress (courses completed)
- [ ] Navigate to next incomplete course in path
- [ ] Git commit: `feat: add guided learning paths`

### M13: Dashboard
- [ ] Create dashboard feature: components, hooks
- [ ] Show "Continue Learning" with last in-progress lesson
- [ ] Show overall progress summary (courses, lessons, quizzes)
- [ ] Show recent bookmarks and notes
- [ ] Show recommended next courses/paths
- [ ] Git commit: `feat: add dashboard overview`

---

## Phase 5 — Hardening

### M14: Accessibility
- [ ] Keyboard navigation audit across all pages
- [ ] ARIA labels on interactive elements
- [ ] Focus management for modals and route transitions
- [ ] Color contrast verification (WCAG AA)
- [ ] Screen reader testing on key flows
- [ ] Git commit: `feat: improve accessibility across application`

### M15: Performance & Polish
- [ ] Lazy-load route components with React.lazy + Suspense
- [ ] Add skeleton loaders for async content
- [ ] Add error boundaries at route level
- [ ] Responsive design audit across breakpoints
- [ ] Optimize re-renders (Zustand selector review)
- [ ] Git commit: `feat: optimize performance and add polish`

---

## Summary

| Phase | Milestones | Focus                    |
|-------|------------|--------------------------|
| 1     | M1–M3      | Foundation & Setup       |
| 2     | M4–M6      | Content & Viewing        |
| 3     | M7–M10     | User Features            |
| 4     | M11–M13    | Discovery & Dashboard    |
| 5     | M14–M15    | Hardening & Polish       |

**Current Milestone:** M1 — Project Initialization
**Next Milestone:** M2 — Application Shell
