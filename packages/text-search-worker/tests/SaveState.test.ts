import { expect, test } from '@jest/globals'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('saveState', () => {
  const state = {
    value: 'test-value',
    replaceExpanded: true,
  }
  SearchViewStates.set(1, state, state)

  const result = saveState(1)

  expect(result).toEqual({
    value: 'test-value',
    replaceExpanded: true,
  })
})
