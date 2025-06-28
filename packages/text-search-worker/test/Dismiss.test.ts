import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as Dismiss from '../src/parts/Dismiss/Dismiss.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('dismissItem - no focused item', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: -1,
  }

  const result = Dismiss.dismissItem(state)
  expect(result).toBe(state)
})

test('dismissItem - dismiss file item', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.File, text: 'file2.txt', end: 0, start: 0, lineNumber: 0 },
    ],
    listFocusedIndex: 0,
    fileCount: 2,
    matchCount: 1,
  }

  const result = Dismiss.dismissItem(state)
  expect(result.items).toHaveLength(1)
  expect(result.fileCount).toBe(1)
  expect(result.matchCount).toBe(0)
  expect(result.listFocusedIndex).toBe(0)
})

test('dismissItem - dismiss match item', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, lineNumber: 0, start: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 0, lineNumber: 0, start: 0 },
      { type: TextSearchResultType.Match, text: 'match2', end: 0, lineNumber: 0, start: 0 },
    ],
    listFocusedIndex: 1,
    fileCount: 1,
    matchCount: 2,
  }

  const result = Dismiss.dismissItem(state)
  expect(result.items).toHaveLength(2)
  expect(result.fileCount).toBe(1)
  expect(result.matchCount).toBe(1)
  expect(result.listFocusedIndex).toBe(1)
})
