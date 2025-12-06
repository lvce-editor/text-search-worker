import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SelectIndex from '../src/parts/SelectIndex/SelectIndex.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('selectIndex - no selection', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: [],
    items: [],
    listFocused: false,
    listFocusedIndex: -1,
  }
  // @ts-ignore
  state.listItems = state.items
  const result = await SelectIndex.selectIndex(state, -1)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(-1)
  expect(mockRpc.invocations).toEqual([])
})

test('selectIndex - select file item', async () => {
  const mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: [],
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }],
    listFocused: false,
    listFocusedIndex: -1,
  } // @ts-ignore
  state.listItems = state.items

  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['file1.txt'])
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file1.txt', type: 1 }]]])
})

test('selectIndex - select match item', async () => {
  RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })
  const iconThemeMockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: [],
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }],
    listFocused: false,
    listFocusedIndex: -1,
  }
  // @ts-ignore
  state.listItems = state.items
  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['file1.txt'])
  expect(iconThemeMockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file1.txt', type: 1 }]]])
})

test('getFileIndex - finds closest file above match', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.ts', type: TextSearchResultType.File },
      { end: 0, lineNumber: 5, start: 0, text: '', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 10, start: 0, text: '', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.ts', type: TextSearchResultType.File },
    ],
    workspacePath: '/test',
  }
  // @ts-ignore
  state.listItems = state.items

  await SelectIndex.selectIndex(state, 2) // Select second match
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file1.ts', true, { selections: new Uint32Array([10, 0, 10, 0]) }]])
})

test('getFileIndex - returns -1 when no file found', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 5, start: 0, text: '', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 10, start: 0, text: '', type: TextSearchResultType.Match },
    ],
  }
  // @ts-ignore
  state.listItems = state.items
  await expect(SelectIndex.selectIndex(state, 1)).rejects.toThrow('Search result is missing file')
  expect(mockRpc.invocations).toEqual([])
})

test('selectIndexPreview - handles match with file above', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.ts', type: TextSearchResultType.File },
      { end: 0, lineNumber: 5, start: 0, text: '', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 10, start: 0, text: '', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.ts', type: TextSearchResultType.File },
    ],
    workspacePath: '/test',
  }
  // @ts-ignore
  state.listItems = state.items

  const result = await SelectIndex.selectIndex(state, 2)

  expect(result).toEqual({
    ...state,
    focus: 22,
    focusSource: 2,
    listFocused: false,
    listFocusedIndex: 2,
  })
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file1.ts', true, { selections: new Uint32Array([10, 0, 10, 0]) }]])
})
