import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as HandleIconThemeChange from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleIconThemeChange updates icons for visible items', async () => {
  const getFileIcon = jest.fn(() => 'icon1')
  RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': getFileIcon,
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
  expect(getFileIcon).toHaveBeenCalledTimes(2)
})

test('handleIconThemeChange handles empty items array', async () => {
  const getFileIcon = jest.fn(() => 'icon1')
  RendererWorker.registerMockRpc({})
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    minLineY: 0,
    maxLineY: 0,
  }
  const newState = await HandleIconThemeChange.handleIconThemeChange(state)
  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual([])
  expect(getFileIcon).not.toHaveBeenCalled()
})
