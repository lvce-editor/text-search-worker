import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MouseEventType from '../src/parts/MouseEventType/MouseEventType.ts'
import { handleContextMenu } from '../src/parts/ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'

test('handleContextMenu - mouse event shows context menu at mouse position', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 0,
    y: 0,
  }
  const button = MouseEventType.Keyboard
  const x = 100
  const y = 200

  const result = await handleContextMenu(state, button, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 0, 0, 18]])
})
