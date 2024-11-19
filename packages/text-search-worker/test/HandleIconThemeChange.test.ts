import { expect, test, jest } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

const mockGetFileIcons = {
  getFileIcons: jest.fn(),
}

jest.unstable_mockModule('../src/parts/GetFileIcons/GetFileIcons.ts', () => mockGetFileIcons)

const { handleIconThemeChange } = await import('../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts')

test('handleIconThemeChange updates icons for visible items', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { id: 1, text: 'file1.txt' },
      { id: 2, text: 'file2.txt' },
      { id: 3, text: 'file3.txt' },
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
