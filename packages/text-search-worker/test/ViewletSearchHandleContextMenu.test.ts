import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as MouseEventType from '../src/parts/MouseEventType/MouseEventType.ts'
import { handleContextMenu } from '../src/parts/ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'

const shownX = 0
const shownY = 0
const shownMenuId = 0

RendererWorker.registerMockRpc({
  'ContextMenu.show': () => undefined,
})

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
