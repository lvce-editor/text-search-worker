import { test, expect } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { getTreeListItems } from '../src/parts/GetTreeListItems/GetTreeListItems.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test.skip('getTreeListItems transforms flat results into tree structure', () => {
  const results = [
    { type: TextSearchResultType.File, text: 'src/file1.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/folder/file2.ts', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ]

  const treeResults = getTreeListItems(results, '/workspace')

  expect(treeResults).toEqual([
    { type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/file1.ts', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 2 },
    { type: TextSearchResultType.File, text: 'src/folder', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/folder/file2.ts', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ])
})

test('getTreeListItems handles empty results', () => {
  const results: readonly SearchResult[] = []
  const treeResults = getTreeListItems(results, '/workspace')
  expect(treeResults).toEqual([])
})

test.skip('getTreeListItems handles single file with multiple matches', () => {
  const results = [
    { type: TextSearchResultType.File, text: 'file.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match2', start: 10, end: 16, lineNumber: 2 },
  ]

  const treeResults = getTreeListItems(results, '/workspace')

  expect(treeResults).toEqual([
    { type: TextSearchResultType.File, text: 'file.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match2', start: 10, end: 16, lineNumber: 2 },
  ])
})

test.skip('getTreeListItems handles nested folders', () => {
  const results = [
    { type: TextSearchResultType.File, text: 'src/folder1/folder2/file.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match', start: 0, end: 5, lineNumber: 1 },
  ]

  const treeResults = getTreeListItems(results, '/workspace')

  expect(treeResults).toEqual([
    { type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/folder1', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/folder1/folder2', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.File, text: 'src/folder1/folder2/file.ts', start: 0, end: 0, lineNumber: 3 },
    { type: TextSearchResultType.Match, text: 'match', start: 0, end: 5, lineNumber: 4 },
  ])
})
