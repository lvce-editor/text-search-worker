import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { focusPreviousPage } from '../src/parts/ListFocusPreviousPage/ListFocusPreviousPage.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('focusPreviousPage - returns same state when at first index', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 0,
    items: ['item1', 'item2', 'item3'],
    maxLineY: 3,
    minLineY: 0,
  }

  const result = focusPreviousPage(state)

  expect(result).toBe(state)
})

test('focusPreviousPage - focuses previous page', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 5,
    items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
    maxLineY: 3,
    minLineY: 0,
    itemHeight: 20,
    height: 100,
    headerHeight: 0,
  }

  const result = focusPreviousPage(state)

  expect(result.focusedIndex).toBe(0) // minLineY - (maxLineY - minLineY) + 2 = 0 - (3 - 0) + 2 = 1
  expect(result).not.toBe(state)
})

test('focusPreviousPage - clamps to first index', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 2,
    items: ['item1', 'item2', 'item3'],
    maxLineY: 3,
    minLineY: 0,
    itemHeight: 20,
    height: 100,
    headerHeight: 0,
  }

  const result = focusPreviousPage(state)

  expect(result.focusedIndex).toBe(0) // Clamped to first index (0)
  expect(result).not.toBe(state)
})
