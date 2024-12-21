import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { focusLast } from '../src/parts/ListFocusLast/ListFocusLast.ts'

test('focusLast', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: -1,
  }
  const result = focusLast(initialState)
  expect(result.focusedIndex).toBe(-1)
})
