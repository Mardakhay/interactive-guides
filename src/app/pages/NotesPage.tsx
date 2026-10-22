import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, Trash2, Compass } from 'lucide-react';
import { getLessonById, getCategoryById, getCategories } from '@/features/content';
import { useNoteStore } from '@/features/notes';
import { Card, Badge, Button, Input } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, coursePath, lessonPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, getCategoryCopy } from '@/lib/i18n';

const ALL_CATEGORIES = 'all';

export default function NotesPage() {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].notesPage;
  const noteLessons = useNoteStore((state) => state.lessons);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const categories = useMemo(() => getCategories(), []);

  const notes = useMemo(() => Object.entries(noteLessons)
    .map(([lessonId, entry]) => {
      const lesson = getLessonById(lessonId);
      if (!lesson) return null;
      const category = getCategoryById(lesson.categoryId);
      return { lesson, category, content: entry.content, updatedAt: entry.updatedAt };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [noteLessons]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesCategory = categoryFilter === ALL_CATEGORIES || note.lesson.categoryId === categoryFilter;
      const matchesQuery = q.length === 0 || note.content.toLowerCase().includes(q) || note.lesson.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [notes, query, categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">{copy.title}</h1>
        <p className="text-neutral-600">{copy.summary.replace('{count}', String(notes.length))}</p>
      </div>
      {notes.length === 0 ? (
        <EmptyState title={copy.emptyTitle} message={copy.emptyMessage} icon={StickyNote}
          action={<Link to={ROUTE_PATHS.COURSES}><Button variant="primary" size="sm"><Compass className="h-4 w-4" />{copy.browseCatalog}</Button></Link>} />
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder}
              aria-label={copy.searchLabel} className="sm:max-w-xs" />
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label={copy.filterLabel}
              className={cn('h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900', 'transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30')}>
              <option value={ALL_CATEGORIES}>{copy.allCourses}</option>
              {categories.map((category) => {
                const categoryCopy = getCategoryCopy(locale, category.id);
                return <option key={category.id} value={category.id}>{categoryCopy?.name ?? category.name}</option>;
              })}
            </select>
          </div>
          {filteredNotes.length === 0 ? (
            <EmptyState title={copy.noMatchesTitle} message={copy.noMatchesMessage} icon={StickyNote} />
          ) : (
            <div className="space-y-3">
              {filteredNotes.map(({ lesson, category, content, updatedAt }) => {
                const categoryCopy = category ? getCategoryCopy(locale, category.id) : undefined;
                return (
                  <Card key={lesson.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link to={lessonPath(lesson.id)} className="text-sm font-semibold text-neutral-900 hover:text-primary-700">{lesson.title}</Link>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                          {category && <Link to={coursePath(category.id)} className="hover:text-primary-600"><Badge variant="neutral">{categoryCopy?.name ?? category.name}</Badge></Link>}
                          <span>{copy.updated} {new Date(updatedAt).toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteNote(lesson.id)}><Trash2 className="h-4 w-4" />{copy.delete}</Button>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">{content}</p>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
