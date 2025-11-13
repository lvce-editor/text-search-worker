import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectIndexFile } from '../src/parts/SelectIndexFile/SelectIndexFile.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockIcon = 'file-icon'

test('selectIndexFile - toggles collapsed path and updates state', async () => {
  const mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon, mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
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

  const result = await selectIndexFile(state, state.items[0], 0, false)

  expect(result).toMatchObject({
    ...state,
    collapsedPaths: ['file1.txt'],
    listFocusedIndex: 0,
    listFocused: true,
    listItems: [
      { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
    ],
    maxLineY: 2,
    icons: ['file-icon', 'file-icon'],
    focus: 22,
    focusSource: 2,
  })
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { type: 1, name: 'file1.txt' },
        { type: 1, name: 'file2.txt' },
      ],
    ],
  ])
})

test('selectIndexFile - uncollapse path when already collapsed', async () => {
  const mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon, mockIcon, mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
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

  const result = await selectIndexFile(state, state.items[0], 0, false)

  expect(result).toMatchObject({
    ...state,
    collapsedPaths: [],
    listFocusedIndex: 0,
    listFocused: true,
    listItems: state.items,
    maxLineY: 3,
    icons: ['file-icon', '', 'file-icon'],
    focus: 22,
    focusSource: 2,
  })
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { type: 1, name: 'file1.txt' },
        { type: 1, name: 'file2.txt' },
      ],
    ],
  ])
})
