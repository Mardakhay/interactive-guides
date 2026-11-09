import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useLocaleStore } from '@/features/localization/localeStore';
import { useUIStore } from '@/stores/uiStore';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  useUIStore.setState({ sidebarOpen: false });
});

describe('mobile sidebar keyboard behavior', () => {
  it('traps focus while open, closes with Escape and restores the trigger focus', async () => {
    const user = userEvent.setup();
    useLocaleStore.setState({ locale: 'en' });
    useUIStore.setState({ sidebarOpen: false });

    render(
      <MemoryRouter initialEntries={['/en/courses']}>
        <TopBar />
        <Sidebar />
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: 'Open menu' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Main navigation' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    expect(first).toHaveFocus();

    last?.focus();
    await user.tab();
    expect(first).toHaveFocus();

    first?.focus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Main navigation' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
