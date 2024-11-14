import { expect, test } from '@jest/globals'
import { handleIconThemeChange } from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('handleIconThemeChange returns new state with copied items', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { id: 1, icon: 'old-icon-1' },
      { id: 2, icon: 'old-icon-2' },
    ],
  }

  const newState = handleIconThemeChange(state)

  // Check that state is copied, not mutated
  expect(newState).not.toBe(state)
  expect(newState.items).not.toBe(state.items)

  // Check that items array is copied
  expect(newState.items).toEqual(state.items)
})

test('handleIconThemeChange handles empty items array', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
  }

  const newState = handleIconThemeChange(state)

  expect(newState.items).toEqual([])
  expect(newState.items).not.toBe(state.items)
})
