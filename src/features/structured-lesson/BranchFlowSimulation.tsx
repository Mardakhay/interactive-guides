import { useState } from 'react';
import type { LessonContentBlock } from '@/content/schemas/lessonContent';
import type { SupportedLocale } from '@/content/repository';

type BranchFlowBlock = Extract<LessonContentBlock, { type: 'branchFlowSimulation' }>;
type Branch = 'main' | 'develop' | 'feature' | 'hotfix';

interface BranchCommit {
  id: number;
  branch: Branch;
  message: string;
  parents: number[];
  tag?: string;
}

interface BranchHeads {
  main: number;
  develop: number | null;
  feature: number | null;
  hotfix: number | null;
}

interface BranchFlowState {
  commits: BranchCommit[];
  heads: BranchHeads;
  activeBranch: Branch;
  nextCommitId: number;
  hotfixBackMergePending: boolean;
}

interface BranchFlowSimulationProps {
  block: BranchFlowBlock;
  locale: SupportedLocale;
}

const branchOrder: Branch[] = ['main', 'develop', 'feature', 'hotfix'];
const laneY: Record<Branch, number> = { main: 42, develop: 100, feature: 158, hotfix: 216 };
const branchColors: Record<Branch, string> = {
  main: '#dc2626',
  develop: '#16a34a',
  feature: '#2563eb',
  hotfix: '#d97706',
};

function initialState(): BranchFlowState {
  return {
    commits: [{ id: 0, branch: 'main', message: 'Initial commit', parents: [] }],
    heads: { main: 0, develop: null, feature: null, hotfix: null },
    activeBranch: 'main',
    nextCommitId: 1,
    hotfixBackMergePending: false,
  };
}

function addCommit(
  state: BranchFlowState,
  branch: Branch,
  message: string,
  parents: number[],
  tag?: string,
): BranchFlowState {
  const id = state.nextCommitId;
  const commit: BranchCommit = { id, branch, message, parents, ...(tag ? { tag } : {}) };
  return {
    ...state,
    commits: [...state.commits, commit],
    heads: { ...state.heads, [branch]: id },
    nextCommitId: id + 1,
  };
}

export function BranchFlowSimulation({ block, locale }: BranchFlowSimulationProps) {
  const isRu = locale === 'ru';
  const [state, setState] = useState<BranchFlowState>(initialState);
  const [announcement, setAnnouncement] = useState(isRu
    ? 'Репозиторий инициализирован: main указывает на начальный commit.'
    : 'Repository initialized: main points to the initial commit.');

  const labels = isRu ? {
    currentBranch: 'Активная ветка',
    graph: 'Граф веток и коммитов',
    history: 'История коммитов',
    reset: 'Сбросить граф',
    main: 'main',
    develop: 'develop',
    feature: 'feature',
    hotfix: 'hotfix',
    parent: 'Родители',
    tag: 'Тег',
    pendingBackMerge: 'Hotfix ещё нужно вернуть в develop, чтобы следующая версия содержала исправление.',
    noPendingBackMerge: 'Hotfix уже возвращён в develop.',
    developCreated: 'Ветка develop создана на текущем коммите main.',
    featureCreated: 'Feature создана на текущем коммите develop.',
    switchedDevelop: 'Переключено на develop.',
    switchedFeature: 'Переключено на feature.',
    hotfixCreated: 'Hotfix создан на текущем production-коммите main.',
    switchedHotfix: 'Переключено на hotfix.',
    commitAdded: 'Commit добавлен в активную ветку.',
    featureMerged: 'Feature слита в develop.',
    hotfixMerged: 'Hotfix слит в main. Не забудь вернуть его в develop.',
    hotfixBackMerged: 'Hotfix возвращён в develop.',
    releaseCreated: 'Release создан в main.',
    resetDone: 'Граф возвращён к начальному состоянию.',
    visualOnly: 'Это учебная модель. Действия не изменяют настоящий Git-репозиторий.',
    branchActions: 'Действия с ветками',
  } : {
    currentBranch: 'Active branch',
    graph: 'Branch and commit graph',
    history: 'Commit history',
    reset: 'Reset graph',
    main: 'main',
    develop: 'develop',
    feature: 'feature',
    hotfix: 'hotfix',
    parent: 'Parents',
    tag: 'Tag',
    pendingBackMerge: 'The hotfix still needs to be back-merged into develop so the next release keeps the fix.',
    noPendingBackMerge: 'The hotfix has already been back-merged into develop.',
    developCreated: 'The develop branch now points to the current main commit.',
    featureCreated: 'The feature branch now points to the current develop commit.',
    switchedDevelop: 'Switched to develop.',
    switchedFeature: 'Switched to feature.',
    hotfixCreated: 'The hotfix branch now points to the current production main commit.',
    switchedHotfix: 'Switched to hotfix.',
    commitAdded: 'A commit was added to the active branch.',
    featureMerged: 'The feature branch was merged into develop.',
    hotfixMerged: 'The hotfix was merged into main. Remember to back-merge it into develop.',
    hotfixBackMerged: 'The hotfix was back-merged into develop.',
    releaseCreated: 'A release was created on main.',
    resetDone: 'The graph was reset to its initial state.',
    visualOnly: 'This is a learning simulation. Actions do not change a real Git repository.',
    branchActions: 'Branch actions',
  };

  const branchName = (branch: Branch) => labels[branch];

  const isDisabled = (actionId: string) => {
    if (actionId === 'create-develop' || actionId === 'create-hotfix' || actionId === 'commit') {
      return actionId === 'create-hotfix' && state.hotfixBackMergePending;
    }
    if (actionId === 'create-feature') return state.heads.develop === null;
    if (actionId === 'merge-feature') return state.heads.feature === null;
    if (actionId === 'merge-hotfix') return state.heads.hotfix === null;
    if (actionId === 'back-merge-hotfix') return !state.hotfixBackMergePending || state.heads.develop === null;
    if (actionId === 'release') {
      return state.heads.develop === null || state.heads.feature !== null || state.heads.hotfix !== null || state.hotfixBackMergePending;
    }
    return true;
  };

  const performAction = (actionId: string) => {
    const action = block.actions.find((candidate) => candidate.id === actionId);
    let next = state;
    let message = action?.description ?? '';

    if (actionId === 'create-develop') {
      if (state.heads.develop === null) {
        next = { ...state, heads: { ...state.heads, develop: state.heads.main }, activeBranch: 'develop' };
        message = labels.developCreated;
      } else {
        next = { ...state, activeBranch: 'develop' };
        message = labels.switchedDevelop;
      }
    } else if (actionId === 'create-feature') {
      if (state.heads.develop === null) return;
      if (state.heads.feature === null) {
        next = { ...state, heads: { ...state.heads, feature: state.heads.develop }, activeBranch: 'feature' };
        message = labels.featureCreated;
      } else {
        next = { ...state, activeBranch: 'feature' };
        message = labels.switchedFeature;
      }
    } else if (actionId === 'commit') {
      const parent = state.heads[state.activeBranch];
      if (parent === null) return;
      next = addCommit(state, state.activeBranch, (isRu ? 'Commit в ' : 'Commit on ') + branchName(state.activeBranch), [parent]);
      message = labels.commitAdded;
    } else if (actionId === 'merge-feature') {
      if (state.heads.feature === null || state.heads.develop === null) return;
      next = addCommit(state, 'develop', action?.label ?? 'Merge feature', [state.heads.develop, state.heads.feature]);
      next = { ...next, heads: { ...next.heads, feature: null }, activeBranch: 'develop' };
      message = labels.featureMerged;
    } else if (actionId === 'create-hotfix') {
      if (state.hotfixBackMergePending) return;
      if (state.heads.hotfix === null) {
        next = { ...state, heads: { ...state.heads, hotfix: state.heads.main }, activeBranch: 'hotfix' };
        message = labels.hotfixCreated;
      } else {
        next = { ...state, activeBranch: 'hotfix' };
        message = labels.switchedHotfix;
      }
    } else if (actionId === 'merge-hotfix') {
      if (state.heads.hotfix === null) return;
      next = addCommit(state, 'main', action?.label ?? 'Merge hotfix', [state.heads.main, state.heads.hotfix], 'v1.0.1');
      next = { ...next, heads: { ...next.heads, hotfix: null }, activeBranch: 'main', hotfixBackMergePending: true };
      message = labels.hotfixMerged;
    } else if (actionId === 'back-merge-hotfix') {
      if (!state.hotfixBackMergePending || state.heads.develop === null) return;
      next = addCommit(state, 'develop', action?.label ?? 'Back-merge hotfix', [state.heads.develop, state.heads.main]);
      next = { ...next, activeBranch: 'develop', hotfixBackMergePending: false };
      message = labels.hotfixBackMerged;
    } else if (actionId === 'release') {
      if (state.heads.develop === null || state.heads.feature !== null || state.heads.hotfix !== null || state.hotfixBackMergePending) return;
      next = addCommit(state, 'main', action?.label ?? 'Release', [state.heads.main, state.heads.develop], 'v2.0.0');
      next = { ...next, activeBranch: 'main' };
      message = labels.releaseCreated;
    }

    setState(next);
    setAnnouncement(message);
  };

  const reset = () => {
    setState(initialState());
    setAnnouncement(labels.resetDone);
  };

  const graphWidth = Math.max(560, 156 + state.commits.length * 72);
  const x = (commitId: number) => 84 + commitId * 72;
  const commitsById = new Map(state.commits.map((commit) => [commit.id, commit]));
  const branchLabels: Record<Branch, string> = {
    main: labels.main,
    develop: labels.develop,
    feature: labels.feature,
    hotfix: labels.hotfix,
  };

  return (
    <section className="my-7 rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-5" aria-labelledby={block.id + '-title'}>
      <h3 id={block.id + '-title'} className="text-lg font-semibold text-neutral-950">{block.title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{block.description}</p>
      <p className="mt-3 text-xs font-medium text-neutral-600">{labels.visualOnly}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-neutral-900">{labels.currentBranch}:</span>
        <span className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-900">{branchName(state.activeBranch)}</span>
      </div>

      <fieldset className="mt-4 rounded-xl border border-neutral-200 p-3">
        <legend className="px-1 text-sm font-semibold text-neutral-900">{labels.branchActions}</legend>
        <div className="flex flex-wrap gap-2">
          {block.actions.map((action) => (
            <button
              key={action.id}
              type="button"
              disabled={isDisabled(action.id)}
              onClick={() => performAction(action.id)}
              title={action.description}
              className="min-h-10 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {action.label}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="min-h-10 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            {labels.reset}
          </button>
        </div>
      </fieldset>

      <div className="mt-5 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-2">
        <svg
          role="img"
          aria-labelledby={block.id + '-graph-title ' + block.id + '-graph-description'}
          viewBox={'0 0 ' + graphWidth + ' 260'}
          width={graphWidth}
          height="260"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={block.id + '-graph-title'}>{labels.graph}</title>
          <desc id={block.id + '-graph-description'}>{labels.visualOnly}</desc>
          {branchOrder.map((branch) => (
            <g key={branch}>
              <line x1="76" y1={laneY[branch]} x2={graphWidth - 20} y2={laneY[branch]} stroke="#d4d4d4" strokeDasharray="4 6" />
              <text x="8" y={laneY[branch] + 4} fill="#404040" fontSize="12" fontWeight="600">{branchLabels[branch]}</text>
            </g>
          ))}
          {state.commits.flatMap((commit) => commit.parents.map((parentId) => {
            const parent = commitsById.get(parentId);
            if (!parent) return null;
            return (
              <path
                key={commit.id + '-' + parentId}
                d={'M ' + x(parent.id) + ' ' + laneY[parent.branch] + ' C ' + (x(parent.id) + 28) + ' ' + laneY[parent.branch] + ', ' + (x(commit.id) - 28) + ' ' + laneY[commit.branch] + ', ' + x(commit.id) + ' ' + laneY[commit.branch]}
                fill="none"
                stroke={branchColors[commit.branch]}
                strokeWidth="2.5"
              />
            );
          }))}
          {state.commits.map((commit) => (
            <g key={commit.id}>
              <circle cx={x(commit.id)} cy={laneY[commit.branch]} r="10" fill={branchColors[commit.branch]} stroke="#ffffff" strokeWidth="2" />
              <text x={x(commit.id)} y={laneY[commit.branch] - 16} fill="#171717" fontSize="11" textAnchor="middle">#{commit.id}</text>
              {commit.tag && <text x={x(commit.id)} y={laneY[commit.branch] + 26} fill="#404040" fontSize="10" textAnchor="middle">{commit.tag}</text>}
            </g>
          ))}
        </svg>
      </div>

      {state.hotfixBackMergePending && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">{labels.pendingBackMerge}</p>
      )}
      {!state.hotfixBackMergePending && state.commits.some((commit) => commit.message.startsWith('Back-merge')) && (
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950">{labels.noPendingBackMerge}</p>
      )}

      <h4 className="mt-5 text-sm font-semibold text-neutral-900">{labels.history}</h4>
      <ol aria-label={labels.history} className="mt-2 space-y-2">
        {state.commits.map((commit) => (
          <li key={commit.id} className="rounded-lg border border-neutral-200 p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-semibold">#{commit.id}</span>
              <span className="font-semibold text-neutral-900">{branchName(commit.branch)}</span>
              {commit.tag && <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">{labels.tag}: {commit.tag}</span>}
            </div>
            <p className="mt-1 text-xs leading-5 text-neutral-600">{commit.message}</p>
            {commit.parents.length > 0 && <p className="mt-1 text-xs text-neutral-500">{labels.parent}: {commit.parents.map((parent) => '#' + parent).join(', ')}</p>}
          </li>
        ))}
      </ol>

      <p role="status" aria-label={labels.history + ' status'} aria-live="polite" aria-atomic="true" className="mt-4 text-sm text-neutral-700">{announcement}</p>
    </section>
  );
}
