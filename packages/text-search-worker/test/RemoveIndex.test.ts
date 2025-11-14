import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RemoveIndex from '../src/parts/RemoveIndex/RemoveIndex.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('removeIndex - returns state unchanged', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 0, start: 0, lineNumber: 0 },
    ],
    fileCount: 1,
    matchCount: 1,
  }

  const searchResult: SearchResult = {
    type: TextSearchResultType.File,
    text: 'file1.txt',
    end: 0,
    start: 0,
    lineNumber: 0,
  }

  const result = await RemoveIndex.removeIndex(state, searchResult, 0)
  expect(result).toEqual({
    ...state,
  })
})

test('removeIndex - with empty state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [],
    fileCount: 0,
    matchCount: 0,
  }

  const searchResult: SearchResult = {
    type: TextSearchResultType.File,
    text: 'file1.txt',
    end: 0,
    start: 0,
    lineNumber: 0,
  }

  const result = await RemoveIndex.removeIndex(state, searchResult, 0)
  expect(result).toEqual({
    ...state,
  })
})

test('removeIndex - with file item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.File, text: 'file2.txt', end: 0, start: 0, lineNumber: 0 },
    ],
    fileCount: 2,
    matchCount: 1,
  }

  const searchResult: SearchResult = {
    type: TextSearchResultType.File,
    text: 'file1.txt',
    end: 0,
    start: 0,
    lineNumber: 0,
  }

  const result = await RemoveIndex.removeIndex(state, searchResult, 0)
  expect(result).toEqual({
    ...state,
  })
})

test('removeIndex - with match item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match2', end: 0, start: 0, lineNumber: 0 },
    ],
    fileCount: 1,
    matchCount: 2,
  }

  const searchResult: SearchResult = {
    type: TextSearchResultType.Match,
    text: 'match1',
    end: 0,
    start: 0,
    lineNumber: 0,
  }

  const result = await RemoveIndex.removeIndex(state, searchResult, 1)
  expect(result).toEqual({
    ...state,
  })
})

test('removeIndex - with invalid index', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 }],
    fileCount: 1,
    matchCount: 0,
  }

  const searchResult: SearchResult = {
    type: TextSearchResultType.File,
    text: 'file1.txt',
    end: 0,
    start: 0,
    lineNumber: 0,
  }

  const result = await RemoveIndex.removeIndex(state, searchResult, 10)
  expect(result).toEqual({
    ...state,
  })
})
