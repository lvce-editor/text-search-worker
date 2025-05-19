import { test, expect } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { createMatchTree } from '../src/parts/CreateMatchTree/CreateMatchTree.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('createMatchTree creates tree from search results', () => {
  const results: SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: 'file1.ts',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'match1',
      start: 0,
      end: 5,
      lineNumber: 1,
    },
    {
      type: TextSearchResultType.Match,
      text: 'match2',
      start: 0,
      end: 5,
      lineNumber: 2,
    },
    {
      type: TextSearchResultType.File,
      text: 'file2.ts',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'match3',
      start: 0,
      end: 5,
      lineNumber: 1,
    },
  ]

  const result = createMatchTree(results)

  expect(result).toEqual({
    'file1.ts': [
      {
        type: TextSearchResultType.Match,
        text: 'match1',
        start: 0,
        end: 5,
        lineNumber: 1,
      },
      {
        type: TextSearchResultType.Match,
        text: 'match2',
        start: 0,
        end: 5,
        lineNumber: 2,
      },
    ],
    'file2.ts': [
      {
        type: TextSearchResultType.Match,
        text: 'match3',
        start: 0,
        end: 5,
        lineNumber: 1,
      },
    ],
  })
})

test('createMatchTree handles empty results', () => {
  const results: SearchResult[] = []
  const result = createMatchTree(results)
  expect(result).toEqual({})
})

test('createMatchTree handles single file with no matches', () => {
  const results: SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: 'file1.ts',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ]
  const result = createMatchTree(results)
  expect(result).toEqual({
    'file1.ts': [],
  })
})
