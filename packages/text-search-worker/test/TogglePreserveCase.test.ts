import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as TogglePreserveCase from '../src/parts/TogglePreserveCase/TogglePreserveCase.ts'

test('togglePreserveCase', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = TogglePreserveCase.togglePreserveCase(initialState)
  expect(SearchFlags.hasPreserveCase(newState.flags)).toBe(true)
})
