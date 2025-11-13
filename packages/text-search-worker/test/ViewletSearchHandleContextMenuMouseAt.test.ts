import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../src/parts/ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

test('handleContextMenuMouseAt - shows context menu and returns same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RendererWorker.showContextMenu2': () => undefined,
  })

  const state: SearchState = CreateDefaultState.createDefaultState()
  const x = 100
  const y = 200

  const result = await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['RendererWorker.showContextMenu2', state.uid, MenuEntryId.Search, x, y, { menuId: MenuEntryId.Search }]])
})

test('handleContextMenuMouseAt - calls show with correct coordinates', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RendererWorker.showContextMenu2': () => undefined,
  })

  const state: SearchState = CreateDefaultState.createDefaultState()
  const x = 150
  const y = 250

  await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(mockRpc.invocations).toEqual([['RendererWorker.showContextMenu2', state.uid, MenuEntryId.Search, x, y, { menuId: MenuEntryId.Search }]])
})
