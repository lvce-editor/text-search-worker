import { expect, test } from '@jest/globals'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleReplace from '../src/parts/ToggleReplace/ToggleReplace.ts'

test('toggleReplace', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleReplace.toggleReplace(initialState)
  expect(newState.flags & SearchFlags.ReplaceExpanded).toBeTruthy()
})
