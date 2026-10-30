import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useLocaleStore } from '@/features/localization/localeStore';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';
import PracticePage from './PracticePage';

function renderPractice(path = '/practice') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  useStructuredLearningStore.setState({
    quizAttempts: {},
    codeDrafts: {},
    practiceChecklists: {},
    sectionProgress: {},
  });
});

describe('PracticePage', () => {
  it('aggregates exercises and links to the correct lesson block with local activity', async () => {
    useLocaleStore.setState({ locale: 'en' });
    useStructuredLearningStore.setState({
      quizAttempts: {},
      codeDrafts: {
        'html.document-structure::practice-about-me': {
          code: '<main><h1>About me</h1></main>',
          updatedAt: '2026-10-30T08:00:00.000Z',
        },
      },
      practiceChecklists: {
        'html.document-structure::practice-about-me': {
          checkedCriteria: [0],
          updatedAt: '2026-10-30T08:00:00.000Z',
        },
      },
      sectionProgress: {},
    });

    renderPractice();

    expect(await screen.findByRole('heading', { name: 'Build an About Me page' })).toBeTruthy();
    expect(screen.getByText('Draft saved')).toBeTruthy();
    expect(screen.getByText('Criteria checked: 1 / 4')).toBeTruthy();
    const link = screen.getAllByRole('link', { name: 'Open exercise' }).find((item) => item.getAttribute('href') === '/en/structured-lessons/html.document-structure#practice-about-me');
    expect(link).toBeTruthy();

    fireEvent.change(screen.getByRole('combobox', { name: 'Show' }), { target: { value: 'drafts' } });
    expect(screen.getByRole('heading', { name: 'Build an About Me page' })).toBeTruthy();
  });

  it('renders a localized catalog and keeps activity wording separate from mastery', async () => {
    useLocaleStore.setState({ locale: 'ru' });
    renderPractice();

    expect(await screen.findByRole('heading', { name: 'Центр практики' })).toBeTruthy();
    expect(screen.getByText(/не подтверждают освоение темы/)).toBeTruthy();
    expect(screen.getAllByRole('link', { name: 'Открыть упражнение' }).length).toBeGreaterThan(0);
  });
});
