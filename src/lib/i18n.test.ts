import { afterEach, describe, expect, it } from 'vitest';
import { getLocaleFromPathname, getOtherLocale, isAppLocale, LOCALE_STORAGE_KEY, UI_COPY } from './i18n';

describe('application localization utilities', () => {
  afterEach(() => window.localStorage.clear());

  it('recognizes only the supported interface locales', () => {
    expect(isAppLocale('en')).toBe(true);
    expect(isAppLocale('ru')).toBe(true);
    expect(isAppLocale('az')).toBe(false);
    expect(isAppLocale(null)).toBe(false);
  });

  it('reads a supported locale from the start of a route', () => {
    expect(getLocaleFromPathname('/en/structured-lessons/js.async-fetch')).toBe('en');
    expect(getLocaleFromPathname('/ru/settings/data')).toBe('ru');
    expect(getLocaleFromPathname('/courses')).toBeUndefined();
    expect(getLocaleFromPathname('/russian/courses')).toBeUndefined();
  });

  it('keeps language switch labels consistent', () => {
    expect(UI_COPY.en.language.shortLabel).toBe('RU');
    expect(UI_COPY.ru.language.shortLabel).toBe('EN');
    expect(getOtherLocale('en')).toBe('ru');
    expect(getOtherLocale('ru')).toBe('en');
    expect(LOCALE_STORAGE_KEY).toBe('ig:locale');
  });
});
