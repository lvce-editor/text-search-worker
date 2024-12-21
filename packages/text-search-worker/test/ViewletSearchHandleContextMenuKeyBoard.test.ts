import { expect, jest, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'

const mockContextMenu = {
  show: jest.fn(),
}

jest.unstable_mockModule('../src/parts/ContextMenu/ContextMenu.ts', () => mockContextMenu)

test('handleContextMenuKeyboard', async () => {
  const { handleContextMenuKeyboard } = await import('../src/parts/ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    x: 100,
    y: 200,
  }

  const result = await handleContextMenuKeyboard(state)

  expect(result).toBe(state)
  expect(mockContextMenu.show).toHaveBeenCalledWith(100, 200, 18)
})
