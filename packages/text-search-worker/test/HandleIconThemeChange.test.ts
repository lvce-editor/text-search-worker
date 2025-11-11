import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as HandleIconThemeChange from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'

test('handleIconThemeChange updates icons for visible items', async () => {
  const mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['icon1', 'icon1'],
  })
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { text: 'file1.txt', start: 0, end: 0, lineNumber: 0, type: 1 },
      { text: 'file2.txt', start: 0, end: 0, lineNumber: 0, type: 1 },
      { text: 'file3.txt', start: 0, end: 0, lineNumber: 0, type: 1 },
    ],
    minLineY: 0,
    maxLineY: 2,
  }
  const newState = await HandleIconThemeChange.handleIconThemeChange(state)
  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual(['icon1', 'icon1'])
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { type: 7, name: 'file1.txt', path: '/file1.txt' },
        { type: 7, name: 'file2.txt', path: '/file2.txt' },
      ],
    ],
  ])
})

test('handleIconThemeChange handles empty items array', async () => {
  const mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [],
  })
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    minLineY: 0,
    maxLineY: 0,
  }
  const newState = await HandleIconThemeChange.handleIconThemeChange(state)
  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual([])
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', []]])
})
