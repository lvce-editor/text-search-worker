import { expect, test } from '@jest/globals'
import * as GetFilteredResults from '../src/parts/GetFilteredResults/GetFilteredResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'

test('getFilteredResults - returns all results when no filters', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, [])
  expect(filteredResults).toEqual(results)
})

test('getFilteredResults - filters results based on include patterns', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'test match', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'other match', start: 0, end: 6, lineNumber: 3 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['*.txt'])
  expect(filteredResults).toEqual(results)
})

test('getFilteredResults - returns empty array for no matches', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['*.js'])
  expect(filteredResults).toEqual([
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file1.txt',
      type: 1,
    },
    {
      end: 6,
      lineNumber: 1,
      start: 0,
      text: 'match1',
      type: 2,
    },
  ])
})

test('getFilteredResults - handles empty results array', () => {
  const results: SearchResult[] = []
  const filteredResults = GetFilteredResults.getFilteredResults(results, ['*.txt'])
  expect(filteredResults).toEqual([])
})
