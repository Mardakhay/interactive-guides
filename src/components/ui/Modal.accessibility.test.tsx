import { useState } from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { Modal } from './Modal';

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Open dialog</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example settings">
        <button type="button">First action</button>
        <button type="button">Last action</button>
      </Modal>
    </>
  );
}

afterEach(cleanup);

describe('Modal keyboard accessibility', () => {
  it('moves focus into the dialog, traps Tab/Shift+Tab, closes on Escape and restores focus', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Example settings' });
    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');

    const lastAction = screen.getByRole('button', { name: 'Last action' });
    lastAction.focus();
    await user.tab();
    expect(closeButton).toHaveFocus();

    closeButton.focus();
    await user.tab({ shift: true });
    expect(lastAction).toHaveFocus();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    expect(dialog).not.toBeInTheDocument();
  });
});
