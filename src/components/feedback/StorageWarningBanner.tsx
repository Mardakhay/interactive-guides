import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { STORAGE_ERROR_EVENT, type StorageErrorDetail } from '@/lib/storage';
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
  const [visible, setVisible] = useState(false);
  const isRussian = pathname.startsWith('/ru/') || (!pathname.startsWith('/en/') && locale === 'ru');
  const backupPath = pathname.startsWith('/ru/')
    ? '/ru/settings/data'
    : pathname.startsWith('/en/')
      ? '/en/settings/data'
      : '/settings/data';

  useEffect(() => {
    const handleStorageError = (event: Event) => {
      if (getDetails(event)) setVisible(true);
    };

    window.addEventListener(STORAGE_ERROR_EVENT, handleStorageError);
    return () => window.removeEventListener(STORAGE_ERROR_EVENT, handleStorageError);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:px-6"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">
          {isRussian ? 'Не удалось сохранить учебные данные' : 'Could not save learning data'}
        </p>
        <p className="mt-0.5 leading-5 text-amber-900">
          {isRussian
            ? 'Последние изменения могут остаться только в текущей вкладке и пропасть после перезагрузки. Проверь свободное место в браузере и создай резервную копию.'
            : 'Your latest changes may exist only in this tab and could be lost after a reload. Check available browser storage and create a backup.'}
        </p>
        <Link
          to={backupPath}
          className="mt-1 inline-flex min-h-8 items-center font-semibold underline underline-offset-2"
        >
          {isRussian ? 'Открыть резервное копирование данных' : 'Open data backup'}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label={isRussian ? 'Скрыть предупреждение о сохранении' : 'Dismiss storage warning'}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-amber-900 transition hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
