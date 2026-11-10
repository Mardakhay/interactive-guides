import { useEffect, useState } from 'react';
import { StickyNote, Trash2 } from 'lucide-react';
import { useNoteStore } from '../store';
import { useDebounce } from '@/hooks/useDebounce';
import { Textarea, Button } from '@/components/ui';
import { translate, useUiLocale } from '@/features/localization';

const AUTOSAVE_DELAY_MS = 600;

interface NoteEditorProps {
  lessonId: string;
}

export function NoteEditor({ lessonId }: NoteEditorProps) {
  const locale = useUiLocale();
  const savedContent = useNoteStore((s) => s.lessons[lessonId]?.content ?? '');
  const updatedAt = useNoteStore((s) => s.lessons[lessonId]?.updatedAt);
  const setNote = useNoteStore((s) => s.setNote);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  const [draft, setDraft] = useState(savedContent);
  const debouncedDraft = useDebounce(draft, AUTOSAVE_DELAY_MS);

  // Reset the draft whenever the lesson changes so notes never leak between lessons.
  // Deliberately keyed only on lessonId — resyncing on every savedContent change would
  // overwrite in-flight typing when the debounced save lands.
  useEffect(() => {
    setDraft(savedContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Changing saved content during autosave must not overwrite the active draft.
  }, [lessonId]);

  // Persist the debounced draft once it settles and actually differs from what's saved.
  // Deliberately keyed only on debouncedDraft — including setNote/savedContent would
  // refire the effect from store updates the effect itself triggers.
  useEffect(() => {
    if (debouncedDraft !== savedContent) {
      setNote(lessonId, debouncedDraft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Store updates caused by autosave must not retrigger it.
  }, [debouncedDraft]);

  const handleDelete = () => {
    setDraft('');
    deleteNote(lessonId);
  };

  return (
    <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <StickyNote className="h-4 w-4 text-neutral-500" />
          {translate(locale, 'myNotesTitle')}
        </div>
        {draft.trim().length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            {translate(locale, 'deleteNote')}
          </Button>
        )}
      </div>

      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={translate(locale, 'lessonNotesPlaceholder')}
        rows={5}
        aria-label={translate(locale, 'lessonNotesAria')}
      />

      <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-neutral-500">
        {updatedAt
          ? translate(locale, 'savedAt', { date: new Date(updatedAt).toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }) })
          : translate(locale, 'autosavesAsYouType')}
      </p>
    </div>
  );
}
