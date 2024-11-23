import { expect, jest, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockWorkspace = {
  getAbsolutePath: jest.fn().mockReturnValue('/absolute/path/file.txt'),
}

const mockOpenUri = {
  openUri: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Workspace/Workspace.ts', () => mockWorkspace)
jest.unstable_mockModule('../src/parts/OpenUri/OpenUri.ts', () => mockOpenUri)

const SelectIndex = await import('../src/parts/SelectIndex/SelectIndex.ts')

test('selectIndex - no selection', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await SelectIndex.selectIndex(state, -1)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(-1)
})

test('selectIndex - select file item', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt' }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['/absolute/path/file.txt', './absolute/path/file.txt'])
  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.txt')
})

test('selectIndex - select match item', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt' }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['/absolute/path/file.txt'])
  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.txt')
})

test('getFileIndex - finds closest file above match', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts' },
      { type: TextSearchResultType.Match, lineNumber: 5 },
      { type: TextSearchResultType.Match, lineNumber: 10 },
      { type: TextSearchResultType.File, text: 'file2.ts' },
    ],
  }

  mockWorkspace.getAbsolutePath.mockReturnValue('/abs/file1.ts')

  await SelectIndex.selectIndex(state, 2) // Select second match

  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.ts')
})

test('getFileIndex - returns -1 when no file found', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.Match, lineNumber: 5 },
      { type: TextSearchResultType.Match, lineNumber: 10 },
    ],
  }

  await expect(SelectIndex.selectIndex(state, 1)).rejects.toThrow('Search result is missing file')
})

test('selectIndexFile - throws on invalid path', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.ts' }],
  }

  mockWorkspace.getAbsolutePath.mockReturnValue(undefined)

  await expect(SelectIndex.selectIndex(state, 0)).rejects.toThrow()
})

test('selectIndexPreview - throws on invalid path', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts' },
      { type: TextSearchResultType.Match, lineNumber: 5 },
    ],
  }

  mockWorkspace.getAbsolutePath.mockReturnValue(undefined)

  await expect(SelectIndex.selectIndex(state, 1)).rejects.toThrow()
})

test('selectIndexPreview - handles match with file above', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts' },
      { type: TextSearchResultType.Match, lineNumber: 5 },
      { type: TextSearchResultType.Match, lineNumber: 10 },
      { type: TextSearchResultType.File, text: 'file2.ts' },
    ],
  }

  mockWorkspace.getAbsolutePath.mockReturnValue('/abs/file1.ts')

  const result = await SelectIndex.selectIndex(state, 2)

  expect(result).toEqual({
    ...state,
    listFocusedIndex: 2,
    listFocused: false,
  })
  expect(mockOpenUri.openUri).toHaveBeenCalledWith('/abs/file1.ts', true, {
    selections: new Uint32Array([10, 0, 10, 0]),
  })
})
