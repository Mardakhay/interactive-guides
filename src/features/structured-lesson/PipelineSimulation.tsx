import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Circle, Play, RotateCcw, XCircle } from 'lucide-react';
import type { Extract } from 'typescript';
import type { LessonContentBlock } from '@/content/schemas/lessonContent';
import type { SupportedLocale } from '@/content/repository';

type PipelineSimulationBlock = Extract<LessonContentBlock, { type: 'pipelineSimulation' }>;
type StageStatus = 'pending' | 'passed' | 'warning' | 'failed' | 'skipped';
type PipelineOutcome = 'passed' | 'passed-with-warning' | 'blocked' | 'deployment-failed';

interface PipelineRun {
  commitNumber: number;
  outcome: PipelineOutcome;
  statuses: Record<string, StageStatus>;
  failedStageId?: string;
}

interface PipelineSimulationProps {
  block: PipelineSimulationBlock;
  locale: SupportedLocale;
}

export function PipelineSimulation({ block, locale }: PipelineSimulationProps) {
  const isRu = locale === 'ru';
  const [failureStageId, setFailureStageId] = useState<string | null>(null);
  const [commitNumber, setCommitNumber] = useState(1);
  const [run, setRun] = useState<PipelineRun | null>(null);
  const [deploymentRecovered, setDeploymentRecovered] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const labels = isRu ? {
    injectionHeading: 'Выбери этап для имитации сбоя',
    noFailure: 'Без искусственного сбоя',
    inject: 'Вызвать сбой',
    selected: 'Сбой выбран',
    run: 'Запустить pipeline',
    reset: 'Сбросить симуляцию',
    stages: 'Этапы pipeline',
    idle: 'Pipeline ещё не запускался.',
    passed: 'Все этапы пройдены для симулируемого коммита.',
    warning: 'Pipeline завершился с предупреждением: информационный аудит не остановил процесс.',
    blocked: 'Обязательная pre-merge проверка завершилась ошибкой. Merge блокируется только тогда, когда эта проверка включена в branch protection. Исправь ошибку, создай новый коммит и запусти проверки для нового SHA.',
    deployFailed: 'Pre-merge проверки прошли. Сбой произошёл при post-merge deployment: это инцидент выпуска, а не красная проверка PR.',
    fixCommit: 'Исправить этап и создать новый коммит',
    rollback: 'Симулировать rollback deployment',
    rollbackDone: 'Rollback восстановил последнюю известную рабочую версию. Проверь логи, целевой release и здоровье сервиса.',
    commit: 'Симулируемый commit',
    passedStage: 'Пройден',
    warningStage: 'Предупреждение',
    failedStage: 'Ошибка',
    skippedStage: 'Пропущен',
    pendingStage: 'Не запускался',
    result: 'Результат симуляции pipeline',
    newCommit: 'Подготовлен новый симулируемый коммит. Запусти pipeline ещё раз, чтобы проверить именно его.',
    injectionClear: 'Сбой не выбран.',
    stageSkipped: 'Этап не запускался, потому что предыдущая обязательная проверка завершилась ошибкой.',
    deployRollbackNote: 'Deployment выполняется после merge в этой модели. Его сбой требует восстановления релиза и не отменяет успешно пройденные pre-merge проверки.',
    securityNote: 'В этой модели dependency audit информационный. Команда может сделать security-проверку обязательной политикой branch protection.',
  } : {
    injectionHeading: 'Choose a stage for failure injection',
    noFailure: 'No injected failure',
    inject: 'Inject failure',
    selected: 'Failure selected',
    run: 'Run pipeline',
    reset: 'Reset simulation',
    stages: 'Pipeline stages',
    idle: 'The pipeline has not run yet.',
    passed: 'All stages passed for the simulated commit.',
    warning: 'Pipeline completed with a warning: the informational audit did not stop the run.',
    blocked: 'A required pre-merge check failed. Merge is blocked only when this check is required by branch protection. Fix the problem, create a new commit and run checks for the new SHA.',
    deployFailed: 'Pre-merge checks passed. The failure happened during post-merge deployment: this is a release incident, not a failed PR check.',
    fixCommit: 'Fix the stage and create a new commit',
    rollback: 'Simulate deployment rollback',
    rollbackDone: 'Rollback restored the last known good version. Inspect logs, the target release and service health.',
    commit: 'Simulated commit',
    passedStage: 'Passed',
    warningStage: 'Warning',
    failedStage: 'Failed',
    skippedStage: 'Skipped',
    pendingStage: 'Not run',
    result: 'Pipeline simulation result',
    newCommit: 'A new simulated commit is prepared. Run the pipeline again to verify that exact commit.',
    injectionClear: 'No failure selected.',
    stageSkipped: 'This stage did not run because an earlier required check failed.',
    deployRollbackNote: 'Deployment runs after merge in this model. Its failure needs release recovery and does not invalidate successful pre-merge checks.',
    securityNote: 'The dependency audit is informational in this model. A team may make security checks required through branch-protection policy.',
  };

  const statusLabel = (status: StageStatus) => {
    if (status === 'passed') return labels.passedStage;
    if (status === 'warning') return labels.warningStage;
    if (status === 'failed') return labels.failedStage;
    if (status === 'skipped') return labels.skippedStage;
    return labels.pendingStage;
  };

  const chooseFailure = (stageId: string | null) => {
    setFailureStageId(stageId);
    setRun(null);
    setDeploymentRecovered(false);
    setAnnouncement(stageId ? (isRu ? 'Сбой выбран: ' : 'Failure selected: ') + block.stages.find((stage) => stage.id === stageId)?.label : labels.injectionClear);
  };

  const runPipeline = () => {
    const statuses: Record<string, StageStatus> = {};
    let stopped = false;
    let outcome: PipelineOutcome = 'passed';
    let failedStage: string | undefined;

    for (const stage of block.stages) {
      if (stopped) {
        statuses[stage.id] = 'skipped';
        continue;
      }
      if (stage.id !== failureStageId) {
        statuses[stage.id] = 'passed';
        continue;
      }
      if (stage.gate === 'informational') {
        statuses[stage.id] = 'warning';
        outcome = 'passed-with-warning';
      } else if (stage.gate === 'post-merge') {
        statuses[stage.id] = 'failed';
        outcome = 'deployment-failed';
        failedStage = stage.id;
        stopped = true;
      } else {
        statuses[stage.id] = 'failed';
        outcome = 'blocked';
        failedStage = stage.id;
        stopped = true;
      }
    }
    setRun({ commitNumber, outcome, statuses, failedStageId: failedStage });
    setDeploymentRecovered(false);
    const message = outcome === 'blocked'
      ? labels.blocked
      : outcome === 'deployment-failed'
        ? labels.deployFailed
        : outcome === 'passed-with-warning'
          ? labels.warning
          : labels.passed;
    setAnnouncement(message);
  };

  const createFixCommit = () => {
    setCommitNumber((current) => current + 1);
    setFailureStageId(null);
    setRun(null);
    setDeploymentRecovered(false);
    setAnnouncement(labels.newCommit);
  };

  const rollbackDeployment = () => {
    setDeploymentRecovered(true);
    setAnnouncement(labels.rollbackDone);
  };

  const reset = () => {
    setFailureStageId(null);
    setCommitNumber(1);
    setRun(null);
    setDeploymentRecovered(false);
    setAnnouncement(labels.idle);
  };

  const currentOutcome = run?.outcome;
  const resultText = !run
    ? labels.idle
    : currentOutcome === 'blocked'
      ? labels.blocked
      : currentOutcome === 'deployment-failed'
        ? labels.deployFailed
        : currentOutcome === 'passed-with-warning'
          ? labels.warning
          : labels.passed;

  return (
    <section className="my-7 rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-5" aria-labelledby={block.id + '-title'}>
      <div>
        <h3 id={block.id + '-title'} className="text-lg font-semibold text-neutral-950">{block.title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-700">{block.description}</p>
      </div>

      <fieldset className="mt-5 rounded-xl border border-neutral-200 p-3">
        <legend className="px-1 text-sm font-semibold text-neutral-900">{labels.injectionHeading}</legend>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={failureStageId === null}
            onClick={() => chooseFailure(null)}
            className="min-h-10 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            {labels.noFailure}
          </button>
          {block.stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              aria-pressed={failureStageId === stage.id}
              onClick={() => chooseFailure(stage.id)}
              className={"min-h-10 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 " + (failureStageId === stage.id ? 'border-amber-500 bg-amber-50 text-amber-950' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50')}
            >
              {failureStageId === stage.id ? labels.selected + ': ' : labels.inject + ': '}{stage.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={runPipeline} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800">
          <Play className="h-4 w-4" aria-hidden="true" />
          {labels.run}
        </button>
        <button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {labels.reset}
        </button>
        {currentOutcome === 'blocked' && (
          <button type="button" onClick={createFixCommit} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
            {labels.fixCommit}
          </button>
        )}
        {currentOutcome === 'deployment-failed' && !deploymentRecovered && (
          <button type="button" onClick={rollbackDeployment} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
            {labels.rollback}
          </button>
        )}
      </div>

      <p className="mt-3 text-xs font-medium text-neutral-500">{labels.commit}: #{commitNumber}</p>

      <ol aria-label={labels.stages} className="mt-4 grid gap-2 sm:grid-cols-2">
        {block.stages.map((stage) => {
          const status: StageStatus = run?.statuses[stage.id] ?? 'pending';
          const stateLabel = statusLabel(status);
          const icon = status === 'passed'
            ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
            : status === 'warning'
              ? <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
              : status === 'failed'
                ? <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
                : <Circle className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" aria-hidden="true" />;
          const detail = status === 'passed'
            ? stage.successMessage
            : status === 'warning' || status === 'failed'
              ? stage.failureMessage
              : status === 'skipped'
                ? labels.stageSkipped
                : stage.description;
          return (
            <li key={stage.id} aria-label={stage.label + ': ' + stateLabel} className="flex min-w-0 gap-3 rounded-xl border border-neutral-200 p-3">
              {icon}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900">{stage.label}<span className="ml-2 text-xs font-medium text-neutral-500">{stateLabel}</span></p>
                <p className="mt-1 text-xs leading-5 text-neutral-600">{detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 rounded-xl bg-neutral-50 p-3">
        <h4 className="text-sm font-semibold text-neutral-900">{labels.result}</h4>
        <p role="status" aria-live="polite" aria-atomic="true" className="mt-2 text-sm leading-6 text-neutral-700">{announcement || resultText}</p>
        {currentOutcome === 'deployment-failed' && (
          <p className="mt-2 text-xs leading-5 text-neutral-600">{labels.deployRollbackNote}</p>
        )}
        {block.stages.some((stage) => stage.gate === 'informational') && (
          <p className="mt-2 text-xs leading-5 text-neutral-600">{labels.securityNote}</p>
        )}
        {deploymentRecovered && <p className="mt-2 text-sm font-medium text-emerald-800">{labels.rollbackDone}</p>}
      </div>
    </section>
  );
}
