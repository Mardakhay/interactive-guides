import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getStructuredLesson } from '@/content/repository';
import { PipelineSimulation } from './PipelineSimulation';

describe('PipelineSimulation', () => {
  afterEach(() => cleanup());

  async function getBlock(locale: 'en' | 'ru') {
    const lesson = await getStructuredLesson('git.workflow-ci', locale);
    if (!lesson) throw new Error('Git workflow lesson is missing');
    const block = lesson.blocks.find((entry) => entry.id === 'git-workflow-pipeline-simulation-ui');
    if (!block || block.type !== 'pipelineSimulation') throw new Error('Pipeline simulation block is missing');
    return block;
  }

  it('stops on a required pre-merge failure and requires a new commit before rerun', async () => {
    const block = await getBlock('en');
    render(<PipelineSimulation block={block} locale="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Inject failure: Tests' }));
    fireEvent.click(screen.getByRole('button', { name: 'Run pipeline' }));

    const stages = screen.getByRole('list', { name: 'Pipeline stages' });
    expect(within(stages).getByRole('listitem', { name: 'Checkout: Passed' })).toBeTruthy();
    expect(within(stages).getByRole('listitem', { name: 'Tests: Failed' })).toBeTruthy();
    expect(within(stages).getByRole('listitem', { name: 'Deployment: Skipped' })).toBeTruthy();
    expect(screen.getByRole('status', { name: 'Pipeline simulation result' })).toHaveTextContent(/required pre-merge check failed/i);

    fireEvent.click(screen.getByRole('button', { name: 'Fix the stage and create a new commit' }));
    expect(screen.getByText('Simulated commit: #2')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Run pipeline' }));
    expect(screen.getByRole('status', { name: 'Pipeline simulation result' })).toHaveTextContent(/all stages passed/i);
  });

  it('continues when the dependency audit advisory is informational', async () => {
    const block = await getBlock('en');
    render(<PipelineSimulation block={block} locale="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Inject failure: Dependency audit' }));
    fireEvent.click(screen.getByRole('button', { name: 'Run pipeline' }));

    const stages = screen.getByRole('list', { name: 'Pipeline stages' });
    expect(within(stages).getByRole('listitem', { name: 'Dependency audit: Warning' })).toBeTruthy();
    expect(within(stages).getByRole('listitem', { name: 'Deployment: Passed' })).toBeTruthy();
    expect(screen.getByRole('status', { name: 'Pipeline simulation result' })).toHaveTextContent(/completed with a warning/i);
  });

  it('treats post-merge deployment failure as a recovery incident, not a PR gate failure', async () => {
    const block = await getBlock('en');
    render(<PipelineSimulation block={block} locale="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Inject failure: Deployment' }));
    fireEvent.click(screen.getByRole('button', { name: 'Run pipeline' }));

    expect(screen.getByRole('status', { name: 'Pipeline simulation result' })).toHaveTextContent(/pre-merge checks passed/i);
    fireEvent.click(screen.getByRole('button', { name: 'Simulate deployment rollback' }));
    expect(screen.getByText(/rollback restored the last known good version/i)).toBeTruthy();
  });

  it('localizes the simulator controls and stage labels in Russian', async () => {
    const block = await getBlock('ru');
    render(<PipelineSimulation block={block} locale="ru" />);

    expect(screen.getByRole('button', { name: 'Запустить pipeline' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Вызвать сбой: Тесты' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Вызвать сбой: Тесты' }));
    fireEvent.click(screen.getByRole('button', { name: 'Запустить pipeline' }));
    expect(screen.getByRole('status', { name: 'Результат симуляции pipeline' })).toHaveTextContent(/Обязательная pre-merge проверка завершилась ошибкой/i);
  });
});
