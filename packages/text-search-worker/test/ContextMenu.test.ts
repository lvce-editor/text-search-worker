import { expect, test, jest, beforeEach } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const ContextMenu = await import('../src/parts/ContextMenu/ContextMenu.ts')
const Rpc = await import('../src/parts/RendererWorker/RendererWorker.ts')

test('show - invokes rpc with correct coordinates and menu id', async () => {
  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  // @ts-ignore
  Rpc.invoke.mockResolvedValue(undefined)

  await ContextMenu.show(x, y, menuId)

  expect(Rpc.invoke).toHaveBeenCalledTimes(1)
  expect(Rpc.invoke).toHaveBeenCalledWith('ContextMenu.show', x, y, menuId)
})

test('show - handles rpc error', async () => {
  const x = 100
  const y = 200
  const menuId = MenuEntryId.Search

  // @ts-ignore
  Rpc.invoke.mockRejectedValue(new Error('Failed to show context menu'))

  await expect(ContextMenu.show(x, y, menuId)).rejects.toThrow('Failed to show context menu')
})
