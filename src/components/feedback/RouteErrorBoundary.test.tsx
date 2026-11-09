import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useLocaleStore } from '@/features/localization/localeStore';
import { RouteErrorBoundary } from './RouteErrorBoundary';

function BrokenPage(): never {
  throw new Error('Synthetic route failure');
}

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  vi.restoreAllMocks();
});

describe('RouteErrorBoundary localization', () => {
  it('announces a Russian error page with a localized retry action', async () => {
    useLocaleStore.setState({ locale: 'en' });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const router = createMemoryRouter(
      [{
        path: '/:locale/courses',
        element: <BrokenPage />,
        errorElement: <RouteErrorBoundary />,
      }],
      { initialEntries: ['/ru/courses'] },
    );

    render(<RouterProvider router={router} />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Что-то пошло не так');
    expect(alert).toHaveTextContent('При открытии страницы произошла ошибка');
    expect(screen.getByRole('heading', { level: 1, name: 'Что-то пошло не так' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Повторить попытку' })).toBeInTheDocument();
  });
});
