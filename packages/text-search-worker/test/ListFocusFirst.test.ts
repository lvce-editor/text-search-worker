import { expect, test } from '@jest/globals'
import type { List } from '../src/parts/List/List.ts'
import * as ListFocusFirst from '../src/parts/ListFocusFirst/ListFocusFirst.ts'

test('focusFirst', () => {
  const initialItems: readonly string[] = []
  const initialState: List<string> = {
    focusedIndex: -1,
    items: initialItems,
    headerHeight: 0,
    height: 100,
    itemHeight: 20,
    maxLineY: 10,
    minLineY: 0,
  }
  const result = ListFocusFirst.focusFirst(initialState)
  expect(result.focusedIndex).toBe(-1)
})
