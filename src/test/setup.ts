import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Node 25 exposes a global localStorage when --localstorage-file is set.
// Tests use jsdom, so bind app code to the browser-compatible implementation.
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: window.localStorage,
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
