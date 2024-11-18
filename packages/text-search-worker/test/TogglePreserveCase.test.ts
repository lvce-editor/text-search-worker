import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as TogglePreserveCase from '../src/parts/TogglePreserveCase/TogglePreserveCase.ts'

test('togglePreserveCase', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    matchCase: false,
  }
  const newState = TogglePreserveCase.togglePreserveCase(initialState)
  expect(newState.matchCase).toBe(true)
})
