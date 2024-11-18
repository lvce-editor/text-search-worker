import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ToggleMatchCase from '../src/parts/ToggleMatchCase/ToggleMatchCase.ts'

test('toggleMatchCase', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    matchCase: false,
  }
  const newState = ToggleMatchCase.toggleMatchCase(initialState)
  expect(newState.matchCase).toBe(true)
})
