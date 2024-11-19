import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('saveState', () => {
  let flags = 0
  flags = SearchFlags.togglePreserveCase(flags)
  flags = SearchFlags.toggleMatchCase(flags)
  flags = SearchFlags.toggleMatchWholeWord(flags)
  flags = SearchFlags.toggleUseRegularExpression(flags)
  flags = SearchFlags.toggleReplaceExpanded(flags)

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    value: 'test-value',
    flags,
  }
  SearchViewStates.set(1, state, state)

  const result = saveState(1)

  expect(result).toEqual({
    value: 'test-value',
    replacement: '',
    flags,
  })
})
