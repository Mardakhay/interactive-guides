import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useLocaleStore } from '@/features/localization/localeStore';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
});

describe('localized application navigation', () => {
  it('keeps desktop and mobile navigation inside the active locale and marks the current route', () => {
    useLocaleStore.setState({ locale: 'en' });
    render(
      <MemoryRouter initialEntries={['/ru/courses']}>
        <Routes>
          <Route path="/:locale/courses" element={<><Sidebar /><MobileNav /></>} />
        </Routes>
      </MemoryRouter>,
    );

    const courseLinks = screen.getAllByRole('link', { name: 'Курсы' });
    expect(courseLinks).toHaveLength(2);
    expect(courseLinks.every((link) => link.getAttribute('href') === '/ru/courses')).toBe(true);
    expect(courseLinks.every((link) => link.className.includes('primary'))).toBe(true);

    expect(screen.getAllByRole('link', { name: 'Практика' }).every((link) => link.getAttribute('href') === '/ru/practice')).toBe(true);
    expect(screen.getByRole('link', { name: 'Настройки' }).getAttribute('href')).toBe('/ru/settings');
  });
});
