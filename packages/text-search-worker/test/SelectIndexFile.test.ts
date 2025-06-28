import { beforeEach, expect, jest, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as ParentRpc from '../src/parts/RendererWorker/RendererWorker.ts'
import { selectIndexFile } from '../src/parts/SelectIndexFile/SelectIndexFile.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockIcon = 'file-icon'
const mockRpc = {
  // @ts-ignore
  invoke: jest.fn().mockResolvedValue(mockIcon),
} as any

ParentRpc.set(mockRpc)

beforeEach(() => {
  mockRpc.invoke.mockReset()
})

test('selectIndexFile - toggles collapsed path and updates state', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 0, lineNumber: 1 },
      { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    ],
    collapsedPaths: [],
    itemHeight: 22,
    headerHeight: 40,
    height: 500,
  }

  const result = await selectIndexFile(state, state.items[0], 0)

  expect(result).toEqual({
    ...state,
    collapsedPaths: ['file1.txt'],
    listFocusedIndex: 0,
    listFocused: true,
    listItems: [
      { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    ],
    maxLineY: 2,
    icons: [undefined, undefined],
    focus: 22,
    focusSource: 2,
  })
})

test('selectIndexFile - uncollapse path when already collapsed', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 0, lineNumber: 1 },
      { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    ],
    collapsedPaths: ['file1.txt'],
    itemHeight: 22,
    headerHeight: 40,
    height: 500,
  }

  const result = await selectIndexFile(state, state.items[0], 0)

  expect(result).toEqual({
    ...state,
    collapsedPaths: [],
    listFocusedIndex: 0,
    listFocused: true,
    listItems: state.items,
    maxLineY: 3,
    icons: [undefined, '', undefined],
    focus: 22,
    focusSource: 2,
  })
})
