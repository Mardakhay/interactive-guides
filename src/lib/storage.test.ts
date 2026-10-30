import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clearLastStorageError,
  loadJSON,
  removeKey,
  saveJSON,
  STORAGE_ERROR_EVENT,
  type StorageErrorDetail,
} from './storage';

const storageErrorListeners: EventListener[] = [];

function listenForStorageErrors(listener: (event: Event) => void): void {
  window.addEventListener(STORAGE_ERROR_EVENT, listener);
  storageErrorListeners.push(listener);
}

afterEach(() => {
  for (const listener of storageErrorListeners) {
    window.removeEventListener(STORAGE_ERROR_EVENT, listener);
  }
  storageErrorListeners.length = 0;
  vi.restoreAllMocks();
  localStorage.clear();
  clearLastStorageError();
});

describe('local storage helper', () => {
  it('writes and reads JSON when storage is available', () => {
    expect(saveJSON('ig:test', { value: 3 })).toBe(true);
    expect(loadJSON('ig:test', { value: 0 })).toEqual({ value: 3 });
    expect(removeKey('ig:test')).toBe(true);
    expect(loadJSON('ig:test', { value: 0 })).toEqual({ value: 0 });
  });

  it('reports write failures without throwing or hiding that persistence failed', () => {
    const events: StorageErrorDetail[] = [];
    const listener = (event: Event) => {
      if (event instanceof CustomEvent) events.push(event.detail as StorageErrorDetail);
    };
    listenForStorageErrors(listener);
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });

    expect(saveJSON('ig:test', { value: 3 })).toBe(false);
    expect(events).toEqual([{ key: 'ig:test', operation: 'write' }]);

    window.removeEventListener(STORAGE_ERROR_EVENT, listener);
  });

  it('reports when removing a persisted record fails', () => {
    const events: StorageErrorDetail[] = [];
    const listener = (event: Event) => {
      if (event instanceof CustomEvent) events.push(event.detail as StorageErrorDetail);
    };
    listenForStorageErrors(listener);
    vi.spyOn(localStorage, 'removeItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    });

    expect(removeKey('ig:test')).toBe(false);
    expect(events).toEqual([{ key: 'ig:test', operation: 'remove' }]);

    window.removeEventListener(STORAGE_ERROR_EVENT, listener);
  });
});