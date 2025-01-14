import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['packages/text-search-worker/src/textSearchWorkerMain.ts'],
  },
]
