import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getStructuredLesson } from '@/content/repository';
import { BranchFlowSimulation } from './BranchFlowSimulation';

describe('BranchFlowSimulation', () => {
  afterEach(() => cleanup());

  async function getBlock(locale: 'en' | 'ru') {
    const lesson = await getStructuredLesson('git.workflow-ci', locale);
    if (!lesson) throw new Error('Git workflow lesson is missing');
    const block = lesson.blocks.find((entry) => entry.id === 'git-workflow-branch-canvas-simulation');
    if (!block || block.type !== 'branchFlowSimulation') throw new Error('Branch simulation block is missing');
    return block;
  }

  it('creates develop and feature commits, then merges the feature into develop', async () => {
    const block = await getBlock('en');
    render(<BranchFlowSimulation block={block} locale="en" />);

    expect(screen.getByRole('button', { name: 'Create / switch to feature' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Create / switch to develop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create / switch to feature' }));
    fireEvent.click(screen.getByRole('button', { name: 'Commit on active branch' }));
    fireEvent.click(screen.getByRole('button', { name: 'Merge feature into develop' }));

    expect(screen.getByRole('status', { name: 'Commit history status' })).toHaveTextContent('The feature branch was merged into develop.');
    expect(screen.getByRole('img', { name: 'Branch and commit graph' })).toBeTruthy();
    expect(screen.getByText('feature')).toBeTruthy();
  });

  it('requires a hotfix back-merge before a new release', async () => {
    const block = await getBlock('en');
    render(<BranchFlowSimulation block={block} locale="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Create / switch to develop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create / switch to hotfix' }));
    fireEvent.click(screen.getByRole('button', { name: 'Commit on active branch' }));
    fireEvent.click(screen.getByRole('button', { name: 'Merge hotfix into main' }));

    expect(screen.getByText(/still needs to be back-merged into develop/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Release develop to main' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Back-merge hotfix into develop' }));
    expect(screen.getByRole('button', { name: 'Release develop to main' })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Release develop to main' }));
    expect(screen.getAllByText('Release develop to main').length).toBeGreaterThan(0);
    expect(screen.getByText('v2.0.0')).toBeTruthy();
  });

  it('resets the graph and commit history to the initial repository state', async () => {
    const block = await getBlock('en');
    render(<BranchFlowSimulation block={block} locale="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Create / switch to develop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reset graph' }));

    expect(screen.getByRole('status', { name: 'Commit history status' })).toHaveTextContent('The graph was reset to its initial state.');
    expect(screen.getByText('Initial commit')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Create / switch to feature' })).toBeDisabled();
  });

  it('localizes branch actions and live status in Russian', async () => {
    const block = await getBlock('ru');
    render(<BranchFlowSimulation block={block} locale="ru" />);

    fireEvent.click(screen.getByRole('button', { name: 'Создать / переключиться на develop' }));
    expect(screen.getByRole('status', { name: 'История коммитов status' })).toHaveTextContent('Ветка develop создана на текущем коммите main.');
  });
});
