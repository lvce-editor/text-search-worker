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

test('selectIndex - no selection', async () => {
  const { selectIndex } = await import('../src/parts/SelectIndex/SelectIndex.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await selectIndex(state, -1)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(-1)
})

test('selectIndex - select file item', async () => {
  const { selectIndex } = await import('../src/parts/SelectIndex/SelectIndex.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt' }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['/absolute/path/file.txt'])
  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.txt')
})

test('selectIndex - select match item', async () => {
  const { selectIndex } = await import('../src/parts/SelectIndex/SelectIndex.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt' }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }

  const result = await selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['/absolute/path/file.txt'])
  expect(mockWorkspace.getAbsolutePath).toHaveBeenCalledWith('file1.txt')
})
