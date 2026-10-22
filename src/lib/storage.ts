export const STORAGE_ERROR_EVENT = 'interactive-guides:storage-error' as const;

export type StorageOperation = 'read' | 'write' | 'remove';

export interface StorageErrorDetail {
  readonly key: string;
  readonly operation: StorageOperation;
}

function notifyStorageError(key: string, operation: StorageOperation): void {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;

  try {
    window.dispatchEvent(
      new CustomEvent<StorageErrorDetail>(STORAGE_ERROR_EVENT, {
        detail: { key, operation },
      }),
    );
  } catch {
    // Storage reporting must never cause the caller's state update to fail.
  }
}

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Keep the in-memory app responsive, but report that persistence did not succeed.
    notifyStorageError(key, 'write');
    return false;
  }
}

export function removeKey(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    notifyStorageError(key, 'write');
    return false;
  }
}
