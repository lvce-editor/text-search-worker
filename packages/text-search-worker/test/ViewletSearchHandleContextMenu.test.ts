import { expect, test, jest } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MouseEventType from '../src/parts/MouseEventType/MouseEventType.ts'

const mockContextMenu = {
  show: jest.fn(),
}

jest.unstable_mockModule('../src/parts/ContextMenu/ContextMenu.ts', () => mockContextMenu)

const { handleContextMenu } = await import('../src/parts/ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts')

test.skip('handleContextMenu - mouse event shows context menu at mouse position', async () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const button = MouseEventType.Keyboard
  const x = 100
  const y = 200

  const result = await handleContextMenu(state, button, x, y)

  expect(result).toBe(state)
  expect(mockContextMenu.show).toHaveBeenCalledWith(x, y, MenuEntryId.Search)
})

test('handleContextMenu - keyboard event shows context menu at state position', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    x: 150,
    y: 250,
  }
  const button = MouseEventType.Keyboard

  const result = await handleContextMenu(state, button, 0, 0)

  expect(result).toBe(state)
  expect(mockContextMenu.show).toHaveBeenCalledWith(150, 250, MenuEntryId.Search)
})
