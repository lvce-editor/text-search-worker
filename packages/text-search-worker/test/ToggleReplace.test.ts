import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleReplace from '../src/parts/ToggleReplace/ToggleReplace.ts'

test('toggleReplace', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = await ToggleReplace.toggleReplace(initialState)
  expect(SearchFlags.hasReplaceExpanded(newState.flags)).toBe(true)
})
