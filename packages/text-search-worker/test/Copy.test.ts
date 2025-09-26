import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Copy from '../src/parts/Copy/Copy.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('copy - no focused item returns same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: -1,
    items: [],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('copy - copies text from focused item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: 0,
    items: [{ text: 'test text', end: 0, lineNumber: 0, start: 0, type: 0 }],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['ClipBoard.writeText', 'test text'],
  ])
})
