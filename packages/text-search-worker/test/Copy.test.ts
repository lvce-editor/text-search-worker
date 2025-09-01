import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Copy from '../src/parts/Copy/Copy.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('copy - no focused item returns same state', async () => {
  RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: -1,
    items: [],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
})

test('copy - copies text from focused item', async () => {
  RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: 0,
    items: [{ text: 'test text', end: 0, lineNumber: 0, start: 0, type: 0 }],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
})
