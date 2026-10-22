export const STORAGE_ERROR_EVENT = 'interactive-guides:storage-error' as const;

export type StorageOperation = 'read' | 'write' | 'remove';

export interface StorageErrorDetail {
  readonly key: string;
  readonly operation: StorageOperation;
}

let lastStorageError: StorageErrorDetail | null = null;

export function getLastStorageError(): StorageErrorDetail | null {
  return lastStorageError;
}

export function clearLastStorageError(): void {
  lastStorageError = null;
}

/** Keeps an error visible to the app shell even if it happens before the banner mounts. */
export function reportStorageError(key: string, operation: StorageOperation): void {
  const detail: StorageErrorDetail = { key, operation };
  lastStorageError = detail;
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;

  try {
    window.dispatchEvent(
      new CustomEvent<StorageErrorDetail>(STORAGE_ERROR_EVENT, { detail }),
    );
  } catch {
    // Storage reporting must never crash the application.
  }
}

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    reportStorageError(key, 'read');
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Keep the in-memory app responsive, but report that persistence did not succeed.
    reportStorageError(key, 'write');
    return false;
  }
}

export function removeKey(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    reportStorageError(key, 'remove');
    return false;
  }
}
