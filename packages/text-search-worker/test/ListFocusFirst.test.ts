import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as ListFocusFirst from '../src/parts/ListFocusFirst/ListFocusFirst.ts'

test('focusFirst', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: -1,
  }
  const result = ListFocusFirst.focusFirst(initialState)
  expect(result.focusedIndex).toBe(-1)
})
