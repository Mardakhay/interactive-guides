import { afterEach, describe, expect, it } from 'vitest';
import { useLocaleStore } from './localeStore';
import { LOCALE_STORAGE_KEY } from '@/lib/i18n';

describe('locale store', () => {
  afterEach(() => {
    window.localStorage.clear();
    useLocaleStore.setState({ locale: 'en' });
  });

  it('persists an explicitly selected language', () => {
    useLocaleStore.getState().setLocale('ru');
    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('ru');
    useLocaleStore.getState().setLocale('en');
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
  });
});
