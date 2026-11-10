import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, Trash2, Compass } from 'lucide-react';
import { getStructuredLessonMetadata } from '@/content/repository';
import { useNoteStore } from '@/features/notes';
import { Card, Button, Input, Badge } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, localizedPath } from '@/app/router/routes';
import { formatNoteCount, translate, useUiLocale } from '@/features/localization';

export default function NotesPage() {
  const locale = useUiLocale();
  const noteLessons = useNoteStore((state) => state.lessons);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const [query, setQuery] = useState('');

  const notes = useMemo(() => {
    // Notes for retired HTML lessons stay in local storage; only structured text-lesson notes are shown.
    return Object.entries(noteLessons)
      .flatMap(([lessonId, entry]) => {
        const lesson = getStructuredLessonMetadata(lessonId, locale);
        if (!lesson) return [];
        return [{
          id: lesson.id,
          title: lesson.title,
          href: '/' + locale + '/structured-lessons/' + lesson.id,
          content: entry.content,
          updatedAt: entry.updatedAt,
        }];
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [noteLessons, locale]);

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return notes;
    return notes.filter((note) =>
      note.content.toLowerCase().includes(normalizedQuery)
      || note.title.toLowerCase().includes(normalizedQuery),
    );
  }, [notes, query]);

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
            <Link to={localizedPath(ROUTE_PATHS.COURSES, locale)}>
              <Button variant="primary" size="sm">
                <Compass className="h-4 w-4" />
                {translate(locale, 'browseCatalog')}
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={translate(locale, 'searchNotesPlaceholder')}
            aria-label={translate(locale, 'searchNotesAria')}
            className="sm:max-w-xs"
          />

          {filteredNotes.length === 0 ? (
            <EmptyState
              title={translate(locale, 'noMatchingNotesTitle')}
              message={translate(locale, 'noMatchingNotesMessage')}
              icon={StickyNote}
            />
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={note.href} className="text-sm font-semibold text-neutral-900 hover:text-primary-700">
                        {note.title}
                      </Link>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        <Badge variant="neutral">{locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum'}</Badge>
                        <span>
                          {translate(locale, 'updated')}{' '}
                          {new Date(note.updatedAt).toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                      <Trash2 className="h-4 w-4" />
                      {translate(locale, 'delete')}
                    </Button>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">{note.content}</p>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
