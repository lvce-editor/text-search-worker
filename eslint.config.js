import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
  ...config.recommendedTsconfig,
  {
    ignores: ['packages/text-search-worker/src/textSearchWorkerMain.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      'e2e/no-direct-click': 'off',
      'e2e/no-inline-locator-in-expect': 'off',
      'e2e/no-inline-nth-in-expect': 'off',
      'e2e/prefer-filesystem-set-files': 'off',
      'jest/no-restricted-jest-methods': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/prefer-minimal-ternary': 'off',
      'unicorn/prefer-https': 'off',
      'unicorn/prefer-single-call': 'off',
    },
  },
  {
    rules: {
      'github-actions/permissions': 'off',
      'tsconfig/dont-skip-lib-check': 'off',
      '@cspell/spellchecker': 'off',
    },
  },
]
