import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('show - invokes rpc with correct coordinates and menu id', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ContextMenu.show') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  await ContextMenu.show(x, y, menuId)
})

test('show - handles rpc error', async () => {
  const errorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ContextMenu.show') {
        throw new Error('Failed to show context menu')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, errorRpc)

  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  await expect(ContextMenu.show(x, y, menuId)).rejects.toThrow('Failed to show context menu')
})
