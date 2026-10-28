# Target Architecture

**Status:** proposed target, not yet implemented.

## Principles

- Feature-oriented modular architecture with explicit boundaries.
- Curriculum and lesson content are data, rendered by reusable React components.
- UI components do not read `localStorage` or call Supabase directly.
- Local-first repositories enable anonymous/offline reading; Supabase is an optional authenticated synchronization adapter.
- Stable domain IDs, schema validation at data boundaries, and tested migrations.
- Avoid an over-engineered “clean architecture” ceremony. Add abstractions where there are real separate responsibilities or replaceable implementations.

## Suggested project shape

```text
src/
  app/
    providers/
    router/
    layouts/
    pages/
  components/
    ui/                    # design-system primitives
    feedback/              # errors, empty, loading, offline
    lesson/                # reusable content block renderers
  features/
    curriculum/
      model/               # curriculum hierarchy + queries
      components/
    lesson-reader/
      model/
      components/
    exercises/
      model/
      components/
    quizzes/
    progress/
    bookmarks/
    notes/
    search/
    learning-paths/
    settings/
    auth/
    sync/
  entities/
    course/
    lesson/
    learner/
  content/
    curriculum/
      curriculum.en.json
      curriculum.ru.json
    lessons/
      <lesson-id>/
        en.json
        ru.json
    schemas/
  infrastructure/
    storage/
      local/
      migrations/
    supabase/
      client.ts
      repositories/
  shared/
    i18n/
    config/
    lib/
    types/
  styles/
    tokens.css
    index.css
public/
  icons/
  manifest.webmanifest
  legacy-lessons/           # temporary migration inputs only
docs/
supabase/
  migrations/
.github/
  workflows/
```

This is a target direction, not a mandate to create every directory immediately. Reuse current `src/features`, `src/app`, and existing UI modules when they fit. Introduce boundaries incrementally.

## Curriculum and content domain

Recommended domain objects:

- CurriculumStage: stable ID, order, localized title/summary, duration or month range.
- CurriculumModule: stage ID, order, week/range, localized title/summary, outcomes.
- Lesson: stable ID, module ID, order, difficulty, format, prerequisites, estimated minutes, tags and completion policy.
- LessonTranslation: `lessonId + locale`, localized metadata, ordered typed content blocks, references, translation/review status.
- Quiz: stable ID, lesson ID, localized prompt/options/explanations, question type, answer key stored with content; do not expose answers in progress records.
- Exercise: stable ID, lesson ID, task statement, starter code, constraints, checks/rubric, optional hints and solution reveal policy.
- ContentVersion: revision/version metadata used to identify material changes and avoid applying stale completion blindly.

Use schemas (existing Zod is a natural fit) and compile-time TypeScript types derived from or kept synchronized with schemas. Validate all content during CI and preferably at app load boundaries.

## Typed lesson content

Do not embed full HTML documents as strings. Render a safe, finite set of supported blocks, for example:

- `heading`, `paragraph`, `list`, `callout`
- `code`, `codeWalkthrough`, `comparisonTable`
- `diagram`, `image`, `link`, `definition`
- `knowledgeCheck`, `codingExercise`, `reflectionPrompt`
- `sourceList`

Every renderer has a schema and accessible markup. Unknown block types should fail content validation rather than silently disappearing. Do not use arbitrary `dangerouslySetInnerHTML` for lesson content.

For code snippets, keep exact source code separate from localized prose. Provide copy controls, language labels, accessible output and mobile overflow handling.

## Rendering and routing

- Locale is explicit in route and context, e.g. `/:locale/curriculum/:stageId/:moduleId` and `/:locale/lessons/:lessonId`.
- A locale-aware route helper should generate links. Unknown locale redirects to the remembered default; unknown lesson produces a useful not-found page.
- Course/module/lesson routes load localized metadata and typed content by stable ID.
- Existing routes can be temporarily redirected or retained to avoid needless breakage during migration.
- Reader should show an in-page table of contents on wide screens and a compact drawer on small screens.
- Add previous/next based on curriculum order, not alphabetical category order.
- Section progress may be tracked, but should not overstate mastery.

## State and repositories

Keep Zustand for client state where useful, but split durable domain data from transient UI state. Use repository interfaces only where multiple implementations exist (local and Supabase).

Candidate contracts:
- `ProgressRepository`: progress summaries, section status, quiz attempts, exercise attempts.
- `BookmarkRepository`
- `NoteRepository`
- `SettingsRepository`
- `SyncService`

Local adapters must preserve current data during schema migration. Add versioned local storage with migrations and an export/import escape hatch. Persistence failures should be visible via non-blocking UI instead of silently losing data.

## Supabase integration boundaries

Supabase client only in `infrastructure/supabase`. Feature logic depends on repository contracts. Use Auth + Postgres + Row Level Security; do not ship service role credentials in the browser. Keep anonymous local-first use working with no Supabase environment variables.

## Reliability

- Error boundaries around route and interactive exercise widgets.
- Abort/cancel fetches and handle loading/error/empty states.
- Schema-check remote and local JSON before use.
- Stable lesson IDs and content-version-aware sync.
- Automated test coverage for domain invariants, migrations, authorization/RLS assumptions (where possible), and conflict handling.

## Architecture decision gate

Do not add a backend or migrate data solely because it seems more “production-ready.” First land a content model and local adapter; then add Supabase as an independent sync capability.
