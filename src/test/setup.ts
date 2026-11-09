import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

const values = new Map<string, string>();
const testStorage: Storage = {
  get length() {
    return values.size;
  },
  clear() {
    values.clear();
  },
  getItem(key) {
    return values.get(String(key)) ?? null;
  },
  key(index) {
    return [...values.keys()][index] ?? null;
  },
  removeItem(key) {
    values.delete(String(key));
  },
  setItem(key, value) {
    values.set(String(key), String(value));
  },
};

// Node 25 may expose an incomplete localStorage global under the test runner's
// --localstorage-file flag. Use deterministic in-memory browser storage in tests.
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: testStorage,
});

afterEach(() => {
  cleanup();
  testStorage.clear();
});
