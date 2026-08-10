# DEVELOPMENT_RULES.md — Interactive Guides

> Rules and conventions for all contributors.
> Every commit must adhere to these rules.

---

## 1. Technology Requirements

| Rule | Requirement |
|------|-------------|
| Language | TypeScript, strict mode (`"strict": true` in tsconfig) |
| Framework | React 18+ with function components and hooks |
| Build Tool | Vite |
| Styling | Tailwind CSS — no custom CSS files except `index.css` for Tailwind directives |
| Routing | React Router v6 (data routers, `createBrowserRouter`) |
| State | Zustand for all client state. No Redux, no Context for state (Context only for static dependency injection like theme) |
| Backend | Supabase for database, auth, and edge functions |
| Validation | Zod for runtime validation of external data (API responses, form input) |

---

## 2. TypeScript Rules

- **Strict mode is mandatory.** No `any` type. Use `unknown` when the type is genuinely unknown, then narrow.
- **Explicit types on all function parameters and return types** for exported functions.
- **No non-null assertions (`!`)** unless the value is guaranteed by construction (rare). Prefer optional chaining or guards.
- **No `// @ts-ignore` or `// @ts-expect-error`.** Fix the type error instead.
- **Use `interface` for object shapes, `type` for unions and intersections.**
- **Import types with `import type`** when importing only types.
- **Enable `noUnusedLocals` and `noUnusedParameters`.** Remove dead code.
- **Path aliases:** Use `@/` for `src/` imports. Never use relative paths that cross more than one folder level upward (`../../`).

```typescript
// Good
import { Button } from '@/components/ui';
import type { Course } from '@/features/courses/types';

// Bad
import { Button } from '../../../components/ui/Button';
```

---

## 3. Folder Architecture Rules

- **Feature modules are self-contained.** Each feature folder contains its own `components/`, `hooks/`, `store.ts`, `api.ts`, and `types.ts`.
- **Features do not import from each other.** Cross-feature communication happens through shared types (`src/types/`), shared stores (`src/stores/`), or shared components (`src/components/`).
- **Shared components only.** A component used by 2+ features goes in `src/components/`. A component used by one feature stays in `src/features/<name>/components/`.
- **API access is isolated.** Only `api.ts` files within feature folders (or `src/lib/`) import from `@supabase/supabase-js`. Components and hooks never call Supabase directly.
- **No circular imports.** If A imports B and B needs something from A, extract the shared piece to a third location.

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `CourseCard.tsx` |
| Hooks | camelCase with `use` prefix | `useCourseProgress.ts` |
| Stores | camelCase with `store` suffix | `courseStore.ts` or `store.ts` within feature |
| Types | camelCase | `types.ts` (feature-level) or `database.ts` (shared) |
| Utilities | camelCase | `utils.ts`, `formatters.ts` |
| Constants | camelCase | `constants.ts` |
| Pages | PascalCase with `Page` suffix | `DashboardPage.tsx` |

---

## 4. Component Rules

- **One component per file.** A file exports one primary component. Small sub-components used only by that component may live in the same file.
- **Props are typed with an interface.** Name it `<ComponentName>Props`.
- **Composition over inheritance.** Use children, render props, or compound components.
- **No inline styles.** Use Tailwind classes. If a dynamic value is needed, use `style` with a typed object (e.g., for computed widths).
- **Forwarded refs** when a component wraps a DOM element that callers may need to access.
- **Accessible by default.** Every interactive element must be keyboard-reachable. Buttons use `<button>`, links use `<a>` or `<Link>`. No `onClick` on `<div>`.

### Component Structure

```typescript
import { useState } from 'react';
import type { Course } from '@/features/courses/types';
import { Card } from '@/components/ui';

interface CourseCardProps {
  course: Course;
  onSelect?: (course: Course) => void;
}

export function CourseCard({ course, onSelect }: CourseCardProps) {
  // hooks first
  // derived state
  // handlers
  // render
  return (
    <Card>
      {/* ... */}
    </Card>
  );
}
```

---

## 5. State Management Rules (Zustand)

- **Each feature owns its store.** Feature stores live at `src/features/<name>/store.ts`.
- **Global stores** that span features live in `src/stores/`.
- **Use selectors** to prevent unnecessary re-renders. Never subscribe to an entire store object.

```typescript
// Good — only re-renders when `courses` changes
const courses = useCourseStore((s) => s.courses);

// Bad — re-renders on any store change
const store = useCourseStore();
```

- **Actions are defined in the store, not in components.** Components call actions; they don't contain business logic.
- **Stores call API functions from `api.ts`.** The store is the orchestrator: component → store action → API function → Supabase.
- **No global mutable state outside stores.** No module-level variables, no singletons.

---

## 6. Data Access Rules

- **All database access goes through Supabase.** No direct SQL in the frontend.
- **API functions are the only layer that touches Supabase.** They return typed data validated by Zod schemas.
- **Handle loading, error, and empty states** in every data-fetching hook. Never assume data exists.
- **Check API responses before using them.** Destructure `{ data, error }` and handle both branches.

```typescript
// api.ts pattern
export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) throw error;
  return courseSchema.array().parse(data);
}
```

- **RLS is mandatory on every table.** No exceptions.
- **Never expose the service role key in frontend code.** Only the anon key.

---

## 7. Routing Rules

- **Use `createBrowserRouter`** (React Router v6 data API).
- **Route paths are constants** defined in `src/app/router/routes.ts`.
- **Protected routes use a guard component** that checks auth state and redirects.
- **Pages are lazy-loaded** with `React.lazy` + `Suspense` for code splitting.
- **Route-level error boundaries** catch render errors in a page.

---

## 8. Styling Rules

- **Tailwind only.** No CSS modules, no styled-components, no custom CSS classes.
- **Use the `cn()` utility** (clsx + tailwind-merge) for conditional class composition.

```typescript
import { cn } from '@/lib/utils';

<button className={cn('px-4 py-2 rounded-lg', isActive && 'bg-primary-600 text-white')}>
```

- **Mobile-first.** Start with mobile styles, add `sm:`, `md:`, `lg:` prefixes for larger screens.
- **Design system colors.** Use the defined color ramps (`primary-*`, `secondary-*`, etc.), never raw hex values.
- **8px spacing system.** Use Tailwind's spacing scale (`gap-2`, `p-4`, `mt-6`).
- **Consistent border radius.** Use `rounded-lg` for cards, `rounded-md` for inputs, `rounded-full` for avatars/badges.
- **Readable contrast.** Text on backgrounds must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

---

## 9. Accessibility Rules

- **Semantic HTML.** Use `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`, `<article>`, `<section>` appropriately.
- **Labels on all form inputs.** Use `<label>` with `htmlFor`, or `aria-label` when a visible label isn't possible.
- **Keyboard navigation.** Every interactive element is reachable via Tab and operable via Enter/Space/Arrow keys.
- **Focus management.** Modals trap focus and restore it on close. Route transitions move focus to the page heading.
- **Skip link.** Provide a "Skip to content" link at the top of the app for screen reader users.
- **ARIA only when needed.** Prefer semantic HTML over ARIA attributes. Use ARIA only when HTML semantics are insufficient.
- **Alt text on images.** Decorative images use `alt=""`. Content images have descriptive alt text.
- **Color is never the sole indicator.** Always pair color with text, icons, or patterns.

---

## 10. Git Workflow

### Conventional Commits

```
<type>: <description>
```

| Type     | Use Case                              |
|----------|---------------------------------------|
| `feat`   | New feature                           |
| `fix`    | Bug fix                               |
| `refactor| Code restructuring (no behavior change) |
| `style`  | Styling changes (no logic change)     |
| `chore`  | Tooling, config, dependencies         |
| `docs`   | Documentation only                    |

### Commit Rules

- **One feature per commit.** Don't bundle unrelated changes.
- **Commit after every completed milestone** (see PROJECT_TASKS.md).
- **Present tense, imperative mood.** "add lesson viewer" not "added lesson viewer".
- **Lowercase description, no trailing period.**
- **Keep commits small.** Each commit should represent one logical, reviewable change.

### Examples

```
feat: initialize project architecture
feat: create application shell
feat: add sidebar navigation
feat: implement lesson catalog
feat: add lesson viewer
feat: implement progress tracking
feat: add bookmarks system
feat: add notes feature
feat: implement search functionality
feat: add quiz engine
fix: resolve sidebar navigation issue
refactor: improve lesson data architecture
```

---

## 11. Code Quality Rules

- **No dead code.** Remove unused imports, variables, functions, and files.
- **No commented-out code.** If it's not needed, delete it.
- **No `console.log` in production code.** Use a proper logger or remove before commit.
- **DRY — Don't Repeat Yourself.** If the same logic appears in 2+ places, extract it to a shared utility or hook.
- **YAGNI — You Aren't Gonna Need It.** Don't build for hypothetical future requirements. Build what's needed now.
- **Single Responsibility.** Each function and component does one thing well.
- **Name things clearly.** `fetchCoursesByCategory` not `getData`. `isLessonComplete` not `check`.
- **Avoid deep nesting.** Max 3 levels of indentation. Extract early returns or sub-functions.

---

## 12. Testing Rules (Future)

- **Vitest + React Testing Library** for unit and component tests.
- **Test behavior, not implementation.** Query by role, text, or test-id — not by class name.
- **Every utility function with branching logic gets a test.**
- **Store actions are tested in isolation** by calling them directly and asserting state.
- **E2E tests (Playwright)** for critical user flows: sign in, browse course, complete lesson, take quiz.

---

## 13. Dependency Rules

- **Verify before using.** Check `package.json` before importing a library. Never assume a dependency exists.
- **Minimize dependencies.** Every new dependency must justify its weight. Prefer native APIs when sufficient.
- **Lock versions.** Use exact versions in `package.json`, not `^` or `~` ranges for critical deps.
- **No duplicate functionality.** Don't install two libraries that do the same thing.
