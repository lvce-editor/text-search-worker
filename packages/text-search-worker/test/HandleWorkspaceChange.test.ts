import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleWorkspaceChange from '../src/parts/HandleWorkspaceChange/HandleWorkspaceChange.ts'

test('handleWorkspaceChange - clears search and replace values', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: 'replace-me',
    value: 'search-me',
    workspacePath: 'test',
  }

  const result = HandleWorkspaceChange.handleWorkspaceChange(state)

  expect(result).toEqual({
    ...state,
    replacement: '',
    value: '',
  })
})