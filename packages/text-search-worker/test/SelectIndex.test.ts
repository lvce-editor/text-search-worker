import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SelectIndex from '../src/parts/SelectIndex/SelectIndex.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('selectIndex - no selection', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }
  // @ts-ignore
  state.listItems = state.items
  const result = await SelectIndex.selectIndex(state, -1)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(-1)
  expect(mockRpc.invocations).toEqual([])
})

test('selectIndex - select file item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt', start: 0, lineNumber: 0, end: 0 }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  } // @ts-ignore
  state.listItems = state.items

  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['file1.txt'])
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ type: 7, name: 'file1.txt', path: '/file1.txt' }]]])
})

test('selectIndex - select match item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [{ type: TextSearchResultType.File, text: 'file1.txt', end: 0, lineNumber: 0, start: 0 }],
    listFocusedIndex: -1,
    listFocused: false,
    collapsedPaths: [],
  }
  // @ts-ignore
  state.listItems = state.items
  const result = await SelectIndex.selectIndex(state, 0)
  expect(result.listFocused).toBe(true)
  expect(result.listFocusedIndex).toBe(0)
  expect(result.collapsedPaths).toEqual(['file1.txt'])
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ type: 7, name: 'file1.txt', path: '/file1.txt' }]]])
})

test('getFileIndex - finds closest file above match', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', lineNumber: 0, end: 0, start: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.File, text: 'file2.ts', start: 0, end: 0, lineNumber: 0 },
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
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.Match, lineNumber: 5, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, end: 0, start: 0, text: '' },
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
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, start: 0, end: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, start: 0, end: 0, text: '' },
      { type: TextSearchResultType.File, text: 'file2.ts', start: 0, end: 0, lineNumber: 0 },
    ],
    workspacePath: '/test',
  }
  // @ts-ignore
  state.listItems = state.items

  const result = await SelectIndex.selectIndex(state, 2)

  expect(result).toEqual({
    ...state,
    listFocusedIndex: 2,
    listFocused: false,
    focus: 22,
    focusSource: 2,
  })
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file1.ts', true, { selections: new Uint32Array([10, 0, 10, 0]) }]])
})
