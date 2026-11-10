import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const featureNames = [
  'bookmarks',
  'content',
  'dashboard',
  'learning-paths',
  'lesson-renderer',
  'notes',
  'progress',
  'quizzes',
  'search',
];

const sharedRules = {
  '@typescript-eslint/no-explicit-any': 'error',
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['../..', '../../*'],
          message: 'Use the @/ alias instead of traversing multiple parent directories.',
        },
      ],
    },
  ],
};

const featureBoundaryConfigs = featureNames.map((featureName) => ({
  files: [`src/features/${featureName}/**/*.{ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: featureNames
              .filter((name) => name !== featureName)
              .map((name) => `@/features/${name}/**`),
            message: 'Import another feature only through its public barrel.',
          },
          {
            group: ['../..', '../../*'],
            message: 'Use the @/ alias instead of traversing multiple parent directories.',
          },
        ],
      },
    ],
  },
}));

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'vite.config.js'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...sharedRules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
  ...featureBoundaryConfigs,
);
