import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('saveState', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    value: 'test-value',
    replaceExpanded: true,
    preserveCase: true,
    matchCase: true,
    matchWholeWord: true,
    useRegularExpression: true,
  }
  SearchViewStates.set(1, state, state)

  const result = saveState(1)

  expect(result).toEqual({
    value: 'test-value',
    replaceExpanded: true,
    replacement: '',
    preserveCase: true,
    matchCase: true,
    matchWholeWord: true,
    useRegularExpression: true,
  })
})
