import { expect, test } from '@jest/globals'
import type { List } from '../src/parts/List/List.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as ListFocusPrevious from '../src/parts/ListFocusPrevious/ListFocusPrevious.ts'

test('focusPrevious - returns same state when focusedIndex is 0', () => {
  const state: List<string> = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 0,
    items: ['item1', 'item2'],
    headerHeight: 0,
    height: 100,
    itemHeight: 20,
    minLineY: 0,
    maxLineY: 5,
  }

  const result = ListFocusPrevious.focusPrevious(state)

  expect(result).toBe(state)
})

test('focusPrevious - returns same state when focusedIndex is -1', () => {
  const state: List<string> = {
    focusedIndex: -1,
    items: ['item1', 'item2'],
    headerHeight: 0,
    height: 100,
    itemHeight: 20,
    minLineY: 0,
    maxLineY: 5,
  }

  const result = ListFocusPrevious.focusPrevious(state)

  expect(result).toBe(state)
})

test('focusPrevious - focuses previous item', () => {
  const state: List<string> = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focusedIndex: 2,
    items: ['item1', 'item2', 'item3'],
    itemHeight: 20,
    height: 100,
    headerHeight: 0,
  }

  const result = ListFocusPrevious.focusPrevious(state)

  expect(result.focusedIndex).toBe(1)
  expect(result).not.toBe(state)
})
