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

test('createParentFolderTree creates tree for deeply nested folders', () => {
  const results = [
    { type: TextSearchResultType.File, text: 'src/folder1/folder2/folder3/file.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
  ]

  const tree = createParentFolderTree(results)

  expect(tree).toEqual({
    '': [],
    'src/folder1/folder2/folder3': [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: 'src/folder1/folder2/folder3/file.ts',
        type: 1,
      },
    ],
    'src/folder1/folder2/folder3/file.ts': [
      {
        end: 6,
        lineNumber: 1,
        start: 0,
        text: 'match1',
        type: 2,
      },
    ],
  })
})

test.skip('createParentFolderTree creates tree for multiple files in same folder', () => {
  const results = [
    { type: TextSearchResultType.File, text: 'src/folder/file1.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/folder/file2.ts', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ]

  const tree = createParentFolderTree(results)

  expect(tree['']).toEqual([{ type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 }])
  expect(tree['src']).toEqual([{ type: TextSearchResultType.File, text: 'src/folder', start: 0, end: 0, lineNumber: 0 }])
  expect(tree['src/folder']).toEqual([
    { type: TextSearchResultType.File, text: 'src/folder/file1.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/folder/file2.ts', start: 0, end: 0, lineNumber: 2 },
  ])
  expect(tree['src/folder/file1.ts']).toEqual([{ type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 }])
  expect(tree['src/folder/file2.ts']).toEqual([{ type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 }])
})

test.skip('createParentFolderTree creates tree for files in different folders', () => {
  const results = [
    { type: TextSearchResultType.File, text: 'src/folder1/file1.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/folder2/file2.ts', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 },
  ]

  const tree = createParentFolderTree(results)

  expect(tree['']).toEqual([{ type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 }])
  expect(tree['src']).toEqual([
    { type: TextSearchResultType.File, text: 'src/folder1', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/folder2', start: 0, end: 0, lineNumber: 2 },
  ])
  expect(tree['src/folder1']).toEqual([{ type: TextSearchResultType.File, text: 'src/folder1/file1.ts', start: 0, end: 0, lineNumber: 0 }])
  expect(tree['src/folder2']).toEqual([{ type: TextSearchResultType.File, text: 'src/folder2/file2.ts', start: 0, end: 0, lineNumber: 2 }])
  expect(tree['src/folder1/file1.ts']).toEqual([{ type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 }])
  expect(tree['src/folder2/file2.ts']).toEqual([{ type: TextSearchResultType.Match, text: 'match2', start: 0, end: 6, lineNumber: 3 }])
})
