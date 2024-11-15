import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as ListFocusNext from '../src/parts/ListFocusNext/ListFocusNext.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('focusNext updates focusedIndex to the next index', () => {
  const initialItems = ['item1', 'item2', 'item3']
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 0,
    items: initialItems,
  }
  const result = ListFocusNext.focusNext(initialState)
  expect(result.focusedIndex).toBe(1)
})
