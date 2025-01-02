import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as ConvertSearchResults from '../src/parts/ConvertSearchResults/ConvertSearchResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('convertSearchResults - converts flat array to hierarchical structure', () => {
  const flatResults: readonly SearchResult[] = [
    { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 2 },
    { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match3', start: 0, end: 6, lineNumber: 1 },
  ]

  const result = ConvertSearchResults.convertSearchResults(flatResults)
  expect(result).toEqual([
    {
      path: 'file1.txt',
      isExpanded: true,
      matches: [
        { text: 'match1', start: 0, end: 6, lineNumber: 1 },
        { text: 'match2', start: 0, end: 6, lineNumber: 2 },
      ],
    },
    {
      path: 'file2.txt',
      isExpanded: true,
      matches: [{ text: 'match3', start: 0, end: 6, lineNumber: 1 }],
    },
  ])
})
