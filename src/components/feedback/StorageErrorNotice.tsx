import { useSyncExternalStore } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { translate, useUiLocale, type TranslationKey } from '@/features/localization';
import {
  clearLastStorageError,
  getLastStorageError,
  STORAGE_ERROR_CLEARED_EVENT,
  STORAGE_ERROR_EVENT,
  type StorageOperation,
} from '@/lib/storage';

function subscribeToStorageErrors(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const handleChange = () => onChange();
  window.addEventListener(STORAGE_ERROR_EVENT, handleChange);
  window.addEventListener(STORAGE_ERROR_CLEARED_EVENT, handleChange);
  return () => {
    window.removeEventListener(STORAGE_ERROR_EVENT, handleChange);
    window.removeEventListener(STORAGE_ERROR_CLEARED_EVENT, handleChange);
  };
}

function messageKeyFor(operation: StorageOperation): TranslationKey {
  switch (operation) {
    case 'read': return 'storageReadFailed';
    case 'write': return 'storageWriteFailed';
    case 'remove': return 'storageRemoveFailed';
  }
}

export function StorageErrorNotice() {
  const locale = useUiLocale();
  const detail = useSyncExternalStore(
    subscribeToStorageErrors,
    getLastStorageError,
    getLastStorageError,
  );

  if (!detail) return null;

  return (
    <div
      role="alert"
      className="mx-auto flex max-w-6xl items-start gap-3 rounded-lg border border-warning-300 bg-warning-50 p-4 text-sm text-warning-900"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-semibold">{translate(locale, 'storageErrorTitle')}</p>
        <p>{translate(locale, messageKeyFor(detail.operation))}</p>
        <p>{translate(locale, 'storageErrorAdvice')}</p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-md p-1 hover:bg-warning-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-700"
        aria-label={translate(locale, 'dismissStorageWarning')}
        onClick={clearLastStorageError}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
