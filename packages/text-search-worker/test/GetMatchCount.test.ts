import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import * as GetMatchCount from '../src/parts/GetMatchCount/GetMatchCount.ts'

test('getMatchCount - empty results', () => {
  const results: readonly SearchResult[] = []
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(0)
})

test('getMatchCount - only file results', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 1 },
  ]
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(0)
})

test('getMatchCount - only match results', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 1 },
  ]
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(2)
})

test('getMatchCount - mixed results with startIndex', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 2 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 3 },
    { type: TextSearchResultType.Match, text: 'match3', start: 0, end: 6, lineNumber: 4 },
  ]
  expect(GetMatchCount.getMatchCount(results, 1)).toBe(2) // Should count 2 matches before next file
})

test('getMatchCount - startIndex after last file', () => {
  const results: readonly SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 2 },
  ]
  expect(GetMatchCount.getMatchCount(results, 1)).toBe(2) // Should count all matches after startIndex
})
