import { expect, test, jest } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'

const mockGetFileIcons = {
  getFileIcons: jest.fn(),
}

jest.unstable_mockModule('../src/parts/GetFileIcons/GetFileIcons.ts', () => mockGetFileIcons)

const { handleIconThemeChange } = await import('../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts')

test('handleIconThemeChange updates icons for visible items', async () => {
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

  const mockIcons = ['icon1', 'icon2']
  // @ts-ignore
  mockGetFileIcons.getFileIcons.mockResolvedValue(mockIcons)

  const newState = await handleIconThemeChange(state)

  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual(mockIcons)
  expect(mockGetFileIcons.getFileIcons).toHaveBeenCalledWith(state.items.slice(0, 2))
})

test('handleIconThemeChange handles empty items array', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    minLineY: 0,
    maxLineY: 0,
  }

  // @ts-ignore
  mockGetFileIcons.getFileIcons.mockResolvedValue([])

  const newState = await handleIconThemeChange(state)

  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual([])
  expect(mockGetFileIcons.getFileIcons).toHaveBeenCalledWith([])
})
