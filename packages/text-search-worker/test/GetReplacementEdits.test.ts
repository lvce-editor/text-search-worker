import { expect, test } from '@jest/globals'
import * as GetReplacementEdits from '../src/parts/GetReplaceElements/GetReplaceElements.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'

test('getReplacementEdits - single file with one match', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: './file.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'test content',
      start: 0,
      end: 4,
      lineNumber: 1,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      uri: '/test/file.txt',
      changes: [
        {
          text: 'new',
          startRowIndex: 0,
          startColumnIndex: 0,
          endRowIndex: 1,
          endColumnIndex: 4,
        },
      ],
    },
  ])
})

test('getReplacementEdits - multiple files with matches', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: './file1.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'test content',
      start: 0,
      end: 4,
      lineNumber: 1,
    },
    {
      type: TextSearchResultType.File,
      text: './file2.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'test other',
      start: 2,
      end: 6,
      lineNumber: 3,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      uri: '/test/file1.txt',
      changes: [
        {
          text: 'new',
          startRowIndex: 0,
          startColumnIndex: 0,
          endRowIndex: 1,
          endColumnIndex: 4,
        },
      ],
    },
    {
      uri: '/test/file2.txt',
      changes: [
        {
          text: 'new',
          startRowIndex: 2,
          startColumnIndex: 2,
          endRowIndex: 3,
          endColumnIndex: 6,
        },
      ],
    },
  ])
})

test('getReplacementEdits - empty results', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = []
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([])
})

test('getReplacementEdits - file with multiple matches', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: './file.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'test content test',
      start: 0,
      end: 4,
      lineNumber: 1,
    },
    {
      type: TextSearchResultType.Match,
      text: 'test content test',
      start: 12,
      end: 16,
      lineNumber: 1,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      uri: '/test/file.txt',
      changes: [
        {
          text: 'new',
          startRowIndex: 0,
          startColumnIndex: 0,
          endRowIndex: 1,
          endColumnIndex: 4,
        },
        {
          text: 'new',
          startRowIndex: 0,
          startColumnIndex: 12,
          endRowIndex: 1,
          endColumnIndex: 16,
        },
      ],
    },
  ])
})

test('getReplacementEdits - handles different file paths', () => {
  const workspacePath = 'memfs:///test'
  const results: readonly SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: 'file.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'test content',
      start: 0,
      end: 4,
      lineNumber: 1,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      uri: 'memfs:///test/file.txt',
      changes: [
        {
          text: 'new',
          startRowIndex: 0,
          startColumnIndex: 0,
          endRowIndex: 1,
          endColumnIndex: 4,
        },
      ],
    },
  ])
})
