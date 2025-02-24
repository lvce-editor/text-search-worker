import { expect, jest, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MouseEventType from '../src/parts/MouseEventType/MouseEventType.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { handleContextMenu } from '../src/parts/ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'

const shownX = 0
const shownY = 0
const shownMenuId = 0

const mockRpc = {
  invoke: jest.fn(),
} as any

RpcRegistry.set(RpcId.RendererWorker, mockRpc)

test('handleContextMenu - mouse event shows context menu at mouse position', async () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const button = MouseEventType.Keyboard
  const x = 100
  const y = 200

  const result = await handleContextMenu(state, button, x, y)

  expect(result).toBe(state)
  expect(shownX).toBe(0)
  expect(shownY).toBe(0)
  expect(shownMenuId).toBe(0)
})
