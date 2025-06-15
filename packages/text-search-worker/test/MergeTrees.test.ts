import { test, expect } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { Tree } from '../src/parts/Tree/Tree.ts'
import { mergeTrees } from '../src/parts/MergeTrees/MergeTrees.ts'

test('mergeTrees combines two trees', () => {
  const treeA: Tree = {
    'file1.ts': [{ line: 1, text: 'test1' }] as SearchResult[],
    'file2.ts': [{ line: 2, text: 'test2' }] as SearchResult[],
  }

  const treeB: Tree = {
    'file1.ts': [{ line: 3, text: 'test3' }] as SearchResult[],
    'file3.ts': [{ line: 4, text: 'test4' }] as SearchResult[],
  }

  const result = mergeTrees(treeA, treeB)

  expect(result).toEqual({
    'file1.ts': [
      { line: 1, text: 'test1' },
      { line: 3, text: 'test3' },
    ],
    'file2.ts': [{ line: 2, text: 'test2' }],
    'file3.ts': [{ line: 4, text: 'test4' }],
  })
})

test('mergeTrees handles empty trees', () => {
  const treeA: Tree = {}
  const treeB: Tree = {}

  const result = mergeTrees(treeA, treeB)

  expect(result).toEqual({})
})

test('mergeTrees handles one empty tree', () => {
  const treeA: Tree = {
    'file1.ts': [{ line: 1, text: 'test1' }] as SearchResult[],
  }
  const treeB: Tree = {}

  const result = mergeTrees(treeA, treeB)

  expect(result).toEqual({
    'file1.ts': [{ line: 1, text: 'test1' }],
  })
})
