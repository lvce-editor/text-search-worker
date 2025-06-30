import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as ViewletSearchHandleContextMenuKeyBoard from '../src/parts/ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts'

test('handleContextMenuKeyboard', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'ContextMenu.show') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    x: 100,
    y: 200,
  }

  const result = await ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard(state)

  expect(result).toBe(state)
  expect(mockInvoke).toHaveBeenCalledWith('ContextMenu.show', 100, 200, 18)
})
