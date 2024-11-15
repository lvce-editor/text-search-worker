import { expect, test, jest } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

const mockContextMenu = {
  show: jest.fn(),
}

jest.unstable_mockModule('../src/parts/ContextMenu/ContextMenu.ts', () => mockContextMenu)

const { handleContextMenuMouseAt } = await import('../src/parts/ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts')

test('handleContextMenuMouseAt - shows context menu and returns same state', async () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const x = 100
  const y = 200

  const result = await handleContextMenuMouseAt(state, x, y)

  expect(result).toBe(state)
  expect(mockContextMenu.show).toHaveBeenCalledWith(x, y, MenuEntryId.Search)
})

test('handleContextMenuMouseAt - calls show with correct coordinates', async () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const x = 150
  const y = 250

  await handleContextMenuMouseAt(state, x, y)

  expect(mockContextMenu.show).toHaveBeenCalledWith(x, y, MenuEntryId.Search)
})
