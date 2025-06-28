import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../src/parts/ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

test('handleContextMenuMouseAt - shows context menu and returns same state', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'ContextMenu.show') {
      return Promise.resolve(undefined)
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const x = 100
  const y = 200

  const result = await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(result).toBe(state)
  expect(mockInvoke).toHaveBeenCalledWith('ContextMenu.show', x, y, MenuEntryId.Search)
})

test('handleContextMenuMouseAt - calls show with correct coordinates', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'ContextMenu.show') {
      return Promise.resolve(undefined)
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const x = 150
  const y = 250

  await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(mockInvoke).toHaveBeenCalledWith('ContextMenu.show', x, y, MenuEntryId.Search)
})
