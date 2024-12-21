import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { focusNextPage } from '../src/parts/ListFocusNextPage/ListFocusNextPage.ts'

test('focusNextPage - returns same state when at last index', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 2,
    items: ['item1', 'item2', 'item3'],
    maxLineY: 3,
    minLineY: 0,
  }

  const result = focusNextPage(state)

  expect(result).toBe(state)
})

test('focusNextPage - focuses next page', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 0,
    items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
    maxLineY: 3,
    minLineY: 0,
    itemHeight: 20,
    height: 100,
    headerHeight: 0,
  }

  const result = focusNextPage(state)

  expect(result.focusedIndex).toBe(4) // maxLineY + (maxLineY - minLineY) - 2 = 3 + (3 - 0) - 2 = 4
  expect(result).not.toBe(state)
})

test('focusNextPage - clamps to last index', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 0,
    items: ['item1', 'item2', 'item3'],
    maxLineY: 3,
    minLineY: 0,
    itemHeight: 20,
    height: 100,
    headerHeight: 0,
  }

  const result = focusNextPage(state)

  expect(result.focusedIndex).toBe(2) // Clamped to last index (2)
  expect(result).not.toBe(state)
})
