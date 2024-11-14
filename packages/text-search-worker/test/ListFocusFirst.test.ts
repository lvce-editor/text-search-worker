import { test, expect } from '@jest/globals'
import { focusFirst } from '../src/parts/ListFocusFirst/ListFocusFirst.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ListIndex from '../src/parts/ListIndex/ListIndex.ts'

test('focusFirst sets focusedIndex to zero', () => {
  const initialState: SearchState = { focusedIndex: -1 /* other state properties */ }
  const firstIndex = ListIndex.first() // Call the actual implementation

  const result = focusFirst(initialState)

  expect(result.focusedIndex).toBe(0) // Ensure focusedIndex is set to zero
})
