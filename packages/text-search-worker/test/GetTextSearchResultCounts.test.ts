import { expect, test } from '@jest/globals'
import { getTextSearchResultCounts } from '../src/parts/GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'

test('getTextSearchResultCounts returns correct counts for mixed results', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 1 },
  ]

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 2, resultCount: 2 })
})

test('getTextSearchResultCounts returns zero counts for empty results', () => {
  const results: readonly SearchResult[] = []

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 0, resultCount: 0 })
})

test('getTextSearchResultCounts counts only files', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 1 },
  ]

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 2, resultCount: 0 })
})

test('getTextSearchResultCounts counts only matches', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 1 },
  ]

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 0, resultCount: 2 })
})
