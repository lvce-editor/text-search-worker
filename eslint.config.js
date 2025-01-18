import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    ignores: ['packages/text-search-worker/src/textSearchWorkerMain.ts'],
  },
]
