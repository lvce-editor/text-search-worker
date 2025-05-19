import { expect, test } from '@jest/globals'
import { createFolderTree } from '../src/parts/EnsureDenseTree/EnsureDenseTree.ts'

test('ensureDenseTree creates parent directories', () => {
  const folders = ['src/folder']
  const denseTree = createFolderTree(folders)
  expect(denseTree).toEqual({
    src: [],
  })
})

test('ensureDenseTree handles multiple files in same directory', () => {
  const folders = ['src']
  const denseTree = createFolderTree(folders)
  expect(denseTree).toEqual({})
})

test('ensureDenseTree handles empty tree', () => {
  const folders: readonly string[] = []
  const denseTree = createFolderTree(folders)
  expect(denseTree).toEqual({})
})
