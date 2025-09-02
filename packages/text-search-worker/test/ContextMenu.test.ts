import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('show - invokes rpc with correct coordinates and menu id', async () => {
  RendererWorker.registerMockRpc({
    'ContextMenu.show': () => undefined,
  })

  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  await ContextMenu.show(x, y, menuId)
})

test('show - handles rpc error', async () => {
  RendererWorker.registerMockRpc({
    'ContextMenu.show': () => {
      throw new Error('Failed to show context menu')
    },
  })

  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  await expect(ContextMenu.show(x, y, menuId)).rejects.toThrow('Failed to show context menu')
})
