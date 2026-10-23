import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, Trash2, Compass } from 'lucide-react';
import { getLessonById, getCategoryById, getCategories } from '@/features/content';
import { useNoteStore } from '@/features/notes';
import { Card, Badge, Button, Input } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, coursePath, lessonPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';
import { formatNoteCount, getLocalizedCategoryCopy, translate, useUiLocale } from '@/features/localization';

const ALL_CATEGORIES = 'all';

export default function NotesPage() {
  const locale = useUiLocale();
  const noteLessons = useNoteStore((s) => s.lessons);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);

  const categories = useMemo(() => getCategories(), []);

  const notes = useMemo(() => {
    return Object.entries(noteLessons)
      .map(([lessonId, entry]) => {
        const lesson = getLessonById(lessonId);
        if (!lesson) return null;
        const category = getCategoryById(lesson.categoryId);
        return { lesson, category, content: entry.content, updatedAt: entry.updatedAt };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [noteLessons]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesCategory = categoryFilter === ALL_CATEGORIES || note.lesson.categoryId === categoryFilter;
      const matchesQuery =
        q.length === 0 ||
        note.content.toLowerCase().includes(q) ||
        note.lesson.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [notes, query, categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">{translate(locale, 'notes')}</h1>
        <p className="text-neutral-600">
          {notes.length > 0
            ? translate(locale, 'notesSummary', { count: formatNoteCount(locale, notes.length) })
            : translate(locale, 'notesSummaryEmpty')}
        </p>
      </div>

      {notes.length === 0 ? (
        <EmptyState
          title={translate(locale, 'notesEmptyTitle')}
          message={translate(locale, 'notesEmptyMessage')}
          icon={StickyNote}
          action={
            <Link to={ROUTE_PATHS.COURSES}>
              <Button variant="primary" size="sm">
                <Compass className="h-4 w-4" />
                {translate(locale, 'browseCatalog')}
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={translate(locale, 'searchNotesPlaceholder')}
              aria-label={translate(locale, 'searchNotesAria')}
              className="sm:max-w-xs"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label={translate(locale, 'filterByCourse')}
              className={cn(
                'h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900',
                'transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30',
              )}
            >
              <option value={ALL_CATEGORIES}>{translate(locale, 'allCourses')}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getLocalizedCategoryCopy(locale, category.id, category.name, category.description).name}
                </option>
              ))}
            </select>
          </div>

          {filteredNotes.length === 0 ? (
            <EmptyState
              title={translate(locale, 'noMatchingNotesTitle')}
              message={translate(locale, 'noMatchingNotesMessage')}
              icon={StickyNote}
            />
          ) : (
            <div className="space-y-3">
              {filteredNotes.map(({ lesson, category, content, updatedAt }) => (
                <Card key={lesson.id} className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to={lessonPath(lesson.id)}
                        className="text-sm font-semibold text-neutral-900 hover:text-primary-700"
                      >
                        {lesson.title}
                      </Link>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        {category && (
                          <Link to={coursePath(category.id)} className="hover:text-primary-600">
                            <Badge variant="neutral">{getLocalizedCategoryCopy(locale, category.id, category.name, category.description).name}</Badge>
                          </Link>
                        )}
                        <span>
                          {translate(locale, 'updated')}{' '}
                          {new Date(updatedAt).toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteNote(lesson.id)}>
                      <Trash2 className="h-4 w-4" />
                      {translate(locale, 'delete')}
                    </Button>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">{content}</p>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
