import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Copy from '../src/parts/Copy/Copy.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('copy - no focused item returns same state', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: -1,
    items: [],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
})

test('copy - copies text from focused item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ClipBoard.writeText') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: 0,
    items: [{ text: 'test text', end: 0, lineNumber: 0, start: 0, type: 0 }],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
})
