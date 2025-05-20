import { expect, test } from '@jest/globals'
import { createParentFolderTree } from '../src/parts/CreateTree/CreateTree.ts'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('createTree creates tree from search results', () => {
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

  const result = createParentFolderTree(results)

  expect(result).toEqual({
    '': [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: 'file1.ts',
        type: 5,
      },
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: 'file2.ts',
        type: 5,
      },
    ],
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

test('createTree handles empty results', () => {
  const results: SearchResult[] = []
  const result = createParentFolderTree(results)
  expect(result).toEqual({
    '': [],
  })
})

test('createTree handles single file with no matches', () => {
  const results: SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: 'file1.ts',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ]
  const result = createParentFolderTree(results)
  expect(result).toEqual({
    '': [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: 'file1.ts',
        type: 5,
      },
    ],
    'file1.ts': [],
  })
})
