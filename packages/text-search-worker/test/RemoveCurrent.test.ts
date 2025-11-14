import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RemoveCurrent from '../src/parts/RemoveCurrent/RemoveCurrent.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('removeCurrent - no focused item returns state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: -1,
    items: [],
  }

  const result = await RemoveCurrent.removeCurrent(state)
  expect(result).toEqual({
    ...state,
  })
})

test('removeCurrent - with focused item returns state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [{ type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 }],
  }

  const result = await RemoveCurrent.removeCurrent(state)
  expect(result).toEqual({
    ...state,
  })
})

test('removeCurrent - with focused match item returns state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 5, start: 0, lineNumber: 1 },
    ],
  }

  const result = await RemoveCurrent.removeCurrent(state)
  expect(result).toEqual({
    ...state,
  })
})
