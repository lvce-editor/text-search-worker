import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as ToggleReplace from '../src/parts/ToggleReplace/ToggleReplace.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggleReplace', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleReplace.toggleReplace(initialState)
  expect(SearchFlags.hasReplaceExpanded(newState.flags)).toBeTruthy()
})
