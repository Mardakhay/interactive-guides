import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import StructuredCurriculumPage from './StructuredCurriculumPage';

function renderCurriculum(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:locale/structured-lessons" element={<StructuredCurriculumPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('StructuredCurriculumPage', () => {
  it('lists the full 24-week core course and links lessons into the in-app text renderer', () => {
    renderCurriculum('/en/structured-lessons');
    expect(screen.getByRole('heading', { name: /ABB Frontend Development Bootcamp — Core Curriculum/ })).toBeInTheDocument();
    expect(screen.getByText('24 weeks')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /HTML document structure and semantic page regions/ })).toHaveAttribute(
      'href',
      '/en/structured-lessons/html.document-structure',
    );
    expect(screen.getByRole('heading', { name: 'Supplementary learning tracks' })).toBeInTheDocument();
  });

  it('localizes the curriculum and lesson links in Russian', () => {
    renderCurriculum('/ru/structured-lessons');
    expect(document.documentElement.lang).toBe('ru');
    expect(screen.getByRole('heading', { name: /Учебная программа ABB Frontend Development Bootcamp/ })).toBeInTheDocument();
    expect(screen.getByText('24', { exact: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Структура HTML-документа и семантические области страницы/ })).toHaveAttribute(
      'href',
      '/ru/structured-lessons/html.document-structure',
    );
  });
});
