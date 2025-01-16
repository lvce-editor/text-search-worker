import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    ignores: ['packages/text-search-worker/src/textSearchWorkerMain.ts'],
  },
  {
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
]
