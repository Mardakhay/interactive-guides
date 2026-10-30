import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useLocaleStore, useUiLocale } from '@/features/localization/localeStore';
import { LegacyPathRedirect, LocalizedAppLayout } from './LocalizedRouteLayout';

vi.mock('@/components/layout/AppLayout', async () => {
  const { Outlet: RouterOutlet } = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { AppLayout: () => <RouterOutlet /> };
});

function RouteProbe() {
  const location = useLocation();
  const locale = useUiLocale();
  return <output data-testid="route-probe">{location.pathname}{location.search}{location.hash}|{locale}</output>;
}

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('localized route layout', () => {
  it('redirects an old root URL to the saved language and preserves search/hash', async () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(
      <MemoryRouter initialEntries={['/courses?category=html#results']}>
        <Routes>
          <Route path="/courses" element={<LegacyPathRedirect />} />
          <Route path="/:locale/courses" element={<RouteProbe />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('route-probe')).toHaveTextContent('/ru/courses?category=html#results|ru');
  });

  it('uses the route locale as the source of truth and persists it as preference', async () => {
    useLocaleStore.setState({ locale: 'en' });
    render(
      <MemoryRouter initialEntries={['/ru/courses']}>
        <Routes>
          <Route path="/:locale" element={<LocalizedAppLayout />}>
            <Route path="courses" element={<RouteProbe />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('route-probe')).toHaveTextContent('/ru/courses|ru');
    await waitFor(() => expect(useLocaleStore.getState().locale).toBe('ru'));
    expect(localStorage.getItem('interactive-guides.ui-locale')).toBe('ru');
  });

  it('repairs an unsupported locale segment without losing the requested route', async () => {
    useLocaleStore.setState({ locale: 'en' });
    render(
      <MemoryRouter initialEntries={['/xx/courses?tab=one#main']}>
        <Routes>
          <Route path="/:locale" element={<LocalizedAppLayout />}>
            <Route path="courses" element={<RouteProbe />} />
            <Route path="*" element={<RouteProbe />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('route-probe')).toHaveTextContent('/en/courses?tab=one#main|en');
  });
});
