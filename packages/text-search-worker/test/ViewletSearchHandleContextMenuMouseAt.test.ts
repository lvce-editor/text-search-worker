import { expect, test, jest } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../src/parts/ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

test('handleContextMenuMouseAt - shows context menu and returns same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => undefined,
  })

  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const x = 100
  const y = 200

  const result = await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show', x, y, MenuEntryId.Search],
  ])
})

test('handleContextMenuMouseAt - calls show with correct coordinates', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => undefined,
  })

  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const x = 150
  const y = 250

  await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show', x, y, MenuEntryId.Search],
  ])
})
