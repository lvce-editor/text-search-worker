import { expect, test, jest } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as ViewletSearchHandleContextMenuKeyBoard from '../src/parts/ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts'

test('handleContextMenuKeyboard', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => undefined,
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    x: 100,
    y: 200,
  }

  const result = await ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show', 100, 200, 18],
  ])
})
