import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleMatchCase from '../src/parts/ToggleMatchCase/ToggleMatchCase.ts'

test('toggleMatchCase', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleMatchCase.toggleMatchCase(initialState)
  expect(SearchFlags.hasMatchCase(newState.flags)).toBe(true)
})
