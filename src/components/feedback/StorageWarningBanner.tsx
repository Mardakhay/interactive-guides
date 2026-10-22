import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  clearLastStorageError,
  getLastStorageError,
  STORAGE_ERROR_EVENT,
  type StorageErrorDetail,
} from '@/lib/storage';
import { useLocaleStore } from '@/stores/localeStore';

function getDetails(event: Event): StorageErrorDetail | undefined {
  if (!(event instanceof CustomEvent)) return undefined;
  const detail: unknown = event.detail;
  if (!detail || typeof detail !== 'object') return undefined;

  const candidate = detail as Partial<StorageErrorDetail>;
  if (
    typeof candidate.key !== 'string' ||
    (candidate.operation !== 'read' && candidate.operation !== 'write' && candidate.operation !== 'remove')
  ) return undefined;

  return candidate as StorageErrorDetail;
}

export function StorageWarningBanner() {
  const { pathname } = useLocation();
  const locale = useLocaleStore((state) => state.locale);
  const [storageError, setStorageError] = useState<StorageErrorDetail | null>(null);
  const isRussian = pathname.startsWith('/ru/') || (!pathname.startsWith('/en/') && locale === 'ru');
  const backupPath = pathname.startsWith('/ru/')
    ? '/ru/settings/data'
    : pathname.startsWith('/en/')
      ? '/en/settings/data'
      : '/settings/data';
  const operation = storageError?.operation ?? 'write';

  useEffect(() => {
    const handleStorageError = (event: Event) => {
      const detail = getDetails(event);
      if (detail) setStorageError(detail);
    };

    window.addEventListener(STORAGE_ERROR_EVENT, handleStorageError);
    // A store can fail to read/migrate before React has mounted this banner.
    const pending = getLastStorageError();
    if (pending) setStorageError(pending);

    return () => window.removeEventListener(STORAGE_ERROR_EVENT, handleStorageError);
  }, []);

  if (!storageError) return null;

  const copy = isRussian
    ? {
        writeTitle: 'Не удалось сохранить учебные данные',
        writeBody: 'Последние изменения могут остаться только в текущей вкладке и пропасть после перезагрузки. Проверь свободное место в браузере и создай резервную копию.',
        readTitle: 'Не удалось прочитать локальные учебные данные',
        readBody: 'Приложение не смогло прочитать или проверить сохранённую запись. Она не была автоматически удалена. Не очищай хранилище вручную; открой страницу резервного копирования и проверь, удаётся ли экспорт.',
        removeTitle: 'Не удалось завершить очистку старой записи',
        removeBody: 'Новая версия данных могла быть сохранена, но старую копию не удалось удалить. Проверь данные и создай резервную копию, прежде чем вручную очищать хранилище.',
        link: 'Открыть резервное копирование данных',
        dismiss: 'Скрыть предупреждение о хранилище',
      }
    : {
        writeTitle: 'Could not save learning data',
        writeBody: 'Your latest changes may exist only in this tab and could be lost after a reload. Check available browser storage and create a backup.',
        readTitle: 'Could not read local learning data',
        readBody: 'The app could not read or validate a saved record. It was not deleted automatically. Do not clear storage manually; open data backup and check whether an export is available.',
        removeTitle: 'Could not finish legacy-record cleanup',
        removeBody: 'The new data record may have been saved, but an older copy could not be removed. Review your data and create a backup before manually clearing storage.',
        link: 'Open data backup',
        dismiss: 'Dismiss storage warning',
      };

  const title = operation === 'read'
    ? copy.readTitle
    : operation === 'remove'
      ? copy.removeTitle
      : copy.writeTitle;
  const body = operation === 'read'
    ? copy.readBody
    : operation === 'remove'
      ? copy.removeBody
      : copy.writeBody;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:px-6"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 leading-5 text-amber-900">{body}</p>
        <Link
          to={backupPath}
          className="mt-1 inline-flex min-h-8 items-center font-semibold underline underline-offset-2"
        >
          {copy.link}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => {
          clearLastStorageError();
          setStorageError(null);
        }}
        aria-label={copy.dismiss}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-amber-900 transition hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
