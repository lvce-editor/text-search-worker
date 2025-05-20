import { expect, test } from '@jest/globals'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import { treeToList } from '../src/parts/TreeToList/TreeToList.ts'

test('treeToList converts tree to flat list', () => {
  const tree = {
    src: [],
    'src/folder': [],
    'src/folder/file.ts': [
      { type: TextSearchResultType.File, text: 'src/folder/file.ts', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match', start: 0, end: 5, lineNumber: 1 },
    ],
  }

  const list = treeToList(tree)

  expect(list).toEqual([
    { type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/folder', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/folder/file.ts', start: 0, end: 0, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match', start: 0, end: 5, lineNumber: 3 },
  ])
})

test('treeToList handles multiple matches in same file', () => {
  const tree = {
    'src/file.ts': [
      { type: TextSearchResultType.File, text: 'src/file.ts', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 1 },
      { type: TextSearchResultType.Match, text: 'match2', start: 10, end: 16, lineNumber: 2 },
    ],
  }

  const list = treeToList(tree)

  expect(list).toEqual([
    { type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/file.ts', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 6, lineNumber: 2 },
    { type: TextSearchResultType.Match, text: 'match2', start: 10, end: 16, lineNumber: 2 },
  ])
})

test('treeToList handles root level files', () => {
  const tree = {
    'file.ts': [
      { type: TextSearchResultType.File, text: 'file.ts', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match', start: 0, end: 5, lineNumber: 1 },
    ],
  }

  const list = treeToList(tree)

  expect(list).toEqual([
    { type: TextSearchResultType.File, text: 'file.ts', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.Match, text: 'match', start: 0, end: 5, lineNumber: 1 },
  ])
})

test('treeToList handles empty tree', () => {
  const tree = {}
  const list = treeToList(tree)
  expect(list).toEqual([])
})

test('treeToList preserves file order', () => {
  const tree = {
    'src/b.ts': [{ type: TextSearchResultType.File, text: 'src/b.ts', start: 0, end: 0, lineNumber: 0 }],
    'src/a.ts': [{ type: TextSearchResultType.File, text: 'src/a.ts', start: 0, end: 0, lineNumber: 0 }],
  }

  const list = treeToList(tree)

  expect(list).toEqual([
    { type: TextSearchResultType.File, text: 'src', start: 0, end: 0, lineNumber: 0 },
    { type: TextSearchResultType.File, text: 'src/a.ts', start: 0, end: 0, lineNumber: 1 },
    { type: TextSearchResultType.File, text: 'src/b.ts', start: 0, end: 0, lineNumber: 1 },
  ])
})
