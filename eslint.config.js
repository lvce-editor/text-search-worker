import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
  {
    ignores: ['packages/text-search-worker/src/textSearchWorkerMain.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      'unicorn/prefer-single-call': 'off',
      'jest/no-restricted-jest-methods': 'off',
    },
  },
  {
    rules: {
      'github-actions/permissions': 'off',
    },
  },
]
