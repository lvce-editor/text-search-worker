import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { focusPrevious } from '../src/parts/ListFocusPrevious/ListFocusPrevious.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('focusPrevious - returns same state when focusedIndex is 0', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 0,
    items: ['item1', 'item2'],
  }

  const result = focusPrevious(state)

  expect(result).toBe(state)
})

test('focusPrevious - returns same state when focusedIndex is -1', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: -1,
    items: ['item1', 'item2'],
  }

  const result = focusPrevious(state)

  expect(result).toBe(state)
})

test('focusPrevious - focuses previous item', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 2,
    items: ['item1', 'item2', 'item3'],
    itemHeight: 20,
    height: 100,
    headerHeight: 0,
  }

  const result = focusPrevious(state)

  expect(result.focusedIndex).toBe(1)
  expect(result).not.toBe(state)
})
