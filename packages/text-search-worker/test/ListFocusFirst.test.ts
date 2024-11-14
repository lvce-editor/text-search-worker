import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { focusFirst } from '../src/parts/ListFocusFirst/ListFocusFirst.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('focusFirst sets focusedIndex to zero', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: -1,
  }
  const result = focusFirst(initialState)
  expect(result.focusedIndex).toBe(0)
})
