import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFilteredResults from '../src/parts/GetFilteredResults/GetFilteredResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

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

test('getFilteredResults - filters matches under collapsed file', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual([
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ])
})

test('getFilteredResults - handles multiple collapsed files', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
    { type: TextSearchResultType.File, text: 'file3.txt', start: 0, end: 0, lineNumber: 4 },
    { type: TextSearchResultType.Match, text: 'match3', start: 0, end: 6, lineNumber: 5 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt', 'file3.txt'])
  expect(filteredResults).toEqual([
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
    { type: TextSearchResultType.File, text: 'file3.txt', start: 0, end: 0, lineNumber: 4 },
  ])
})

test('getFilteredResults - handles consecutive collapsed files', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt', 'file2.txt'])
  expect(filteredResults).toEqual([
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
  ])
})

test('getFilteredResults - handles empty results', () => {
  const results: SearchResult[] = []
  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual([])
})

test('getFilteredResults - handles only file results', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 1 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual([
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 1 },
  ])
})

test('getFilteredResults - handles only match results', () => {
  const results: SearchResult[] = [
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 1 },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual(results)
})
