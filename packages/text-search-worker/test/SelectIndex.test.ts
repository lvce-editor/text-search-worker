import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SelectIndex from '../src/parts/SelectIndex/SelectIndex.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('selectIndex - no selection', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

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
})

test('selectIndex - select file item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon') {
        return 'file-icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

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
})

test('selectIndex - select match item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        return undefined
      }
      if (method === 'IconTheme.getFileIcon') {
        return 'file-icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

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
})

test('getFileIndex - finds closest file above match', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', lineNumber: 0, end: 0, start: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, end: 0, start: 0, text: '' },
      { type: TextSearchResultType.File, text: 'file2.ts', start: 0, end: 0, lineNumber: 0 },
    ],
  }
  // @ts-ignore
  state.listItems = state.items

  await SelectIndex.selectIndex(state, 2) // Select second match
})

test('getFileIndex - returns -1 when no file found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

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
})

test('selectIndexPreview - handles match with file above', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.ts', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, lineNumber: 5, start: 0, end: 0, text: '' },
      { type: TextSearchResultType.Match, lineNumber: 10, start: 0, end: 0, text: '' },
      { type: TextSearchResultType.File, text: 'file2.ts', start: 0, end: 0, lineNumber: 0 },
    ],
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
})
