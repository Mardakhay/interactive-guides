import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useLocaleStore } from '@/features/localization/localeStore';
import { ServiceWorkerUpdatePrompt } from './ServiceWorkerUpdatePrompt';

let registration: ServiceWorkerRegistration;
let waitingWorker: ServiceWorker;
let serviceWorkerContainer: ServiceWorkerContainer;
let previousServiceWorkerDescriptor: PropertyDescriptor | undefined;

function renderPrompt() {
  render(
    <MemoryRouter initialEntries={['/courses']}>
      <ServiceWorkerUpdatePrompt />
    </MemoryRouter>,
  );
}

async function showUpdatePrompt() {
  renderPrompt();
  if (document.readyState !== 'complete') {
    window.dispatchEvent(new Event('load'));
  }
  await screen.findByRole('heading', { name: 'Update available' });
}

beforeEach(() => {
  vi.stubEnv('PROD', true);
  useLocaleStore.setState({ locale: 'en' });
  previousServiceWorkerDescriptor = Object.getOwnPropertyDescriptor(navigator, 'serviceWorker');

  waitingWorker = {
    postMessage: vi.fn(),
  } as unknown as ServiceWorker;
  const activeWorker = {} as ServiceWorker;
  registration = Object.assign(new EventTarget(), {
    waiting: waitingWorker,
    installing: null,
    update: vi.fn().mockResolvedValue(undefined),
  }) as unknown as ServiceWorkerRegistration;
  serviceWorkerContainer = Object.assign(new EventTarget(), {
    controller: activeWorker,
    register: vi.fn().mockResolvedValue(registration),
  }) as unknown as ServiceWorkerContainer;
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: serviceWorkerContainer,
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  useLocaleStore.setState({ locale: 'en' });
  if (previousServiceWorkerDescriptor) {
    Object.defineProperty(navigator, 'serviceWorker', previousServiceWorkerDescriptor);
  } else {
    delete (navigator as Navigator & { serviceWorker?: ServiceWorkerContainer }).serviceWorker;
  }
});

describe('ServiceWorkerUpdatePrompt', () => {
  it('allows the learner to defer an update without activating the waiting worker', async () => {
    await showUpdatePrompt();

    fireEvent.click(screen.getByRole('button', { name: 'Later' }));

    expect(screen.queryByRole('heading', { name: 'Update available' })).not.toBeInTheDocument();
    expect(waitingWorker.postMessage).not.toHaveBeenCalled();

    document.dispatchEvent(new Event('visibilitychange'));

    await screen.findByRole('heading', { name: 'Update available' });
    expect(registration.update).toHaveBeenCalled();
    expect(waitingWorker.postMessage).not.toHaveBeenCalled();
  });

  it('sends the activation message only when the learner chooses Update now', async () => {
    await showUpdatePrompt();

    fireEvent.click(screen.getByRole('button', { name: 'Update now' }));

    expect(waitingWorker.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
  });

  it('localizes the defer action with the selected UI locale', async () => {
    useLocaleStore.setState({ locale: 'ru' });

    render(
      <MemoryRouter initialEntries={['/courses']}>
        <ServiceWorkerUpdatePrompt />
      </MemoryRouter>,
    );
    if (document.readyState !== 'complete') window.dispatchEvent(new Event('load'));

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Доступно обновление' })).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Позже' })).toBeInTheDocument();
  });
});
