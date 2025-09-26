import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'

test('show - invokes rpc with correct coordinates and menu id', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => undefined,
  })

  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  await ContextMenu.show(x, y, menuId)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', x, y, menuId]])
})

test('show - handles rpc error', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => {
      throw new Error('Failed to show context menu')
    },
  })

  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  await expect(ContextMenu.show(x, y, menuId)).rejects.toThrow('Failed to show context menu')
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', x, y, menuId]])
})
