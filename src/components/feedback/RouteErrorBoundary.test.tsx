import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useLocaleStore } from '@/features/localization/localeStore';
import { RouteErrorBoundary } from './RouteErrorBoundary';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
});

describe('RouteErrorBoundary localization', () => {
  it('announces a Russian error page with a localized retry action', async () => {
    useLocaleStore.setState({ locale: 'en' });
    const router = createMemoryRouter(
      [{
        path: '/:locale/courses',
        loader: () => {
          throw new Error('Synthetic route failure');
        },
        element: <div>Unreachable route content</div>,
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
