import { expect, jest, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
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
    items: [{ type: TextSearchResultType.File, text: 'file1.txt', start: 0, lineNumber: 0, end: 0 }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['file.txt', '.file.txt'])
  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.txt')
})

test('selectIndex - select match item', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt', end: 0, lineNumber: 0, start: 0 }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['file.txt', '.file.txt'])
  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.txt')
})

test('getFileIndex - finds closest file above match', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', lineNumber: 0, end: 0, start: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.File, text: 'file2.ts', start: 0, end: 0, lineNumber: 0 },
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
      { type: TextSearchResultType.Match, lineNumber: 5, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, end: 0, start: 0, text: '' },
    ],
  }

  await expect(SelectIndex.selectIndex(state, 1)).rejects.toThrow('Search result is missing file')
})

test.skip('selectIndexFile - throws on invalid path', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.ts', end: 0, start: 0, lineNumber: 0 }],
  }

  mockWorkspace.getAbsolutePath.mockReturnValue(undefined)

  await expect(SelectIndex.selectIndex(state, 0)).rejects.toThrow()
})

test('selectIndexPreview - throws on invalid path', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', lineNumber: 0, end: 0, start: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, end: 0, start: 0, text: '' },
    ],
  }

  mockWorkspace.getAbsolutePath.mockReturnValue(undefined)

  await expect(SelectIndex.selectIndex(state, 1)).rejects.toThrow()
})

test('selectIndexPreview - handles match with file above', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, start: 0, end: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, start: 0, end: 0, text: '' },
      { type: TextSearchResultType.File, text: 'file2.ts', start: 0, end: 0, lineNumber: 0 },
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
