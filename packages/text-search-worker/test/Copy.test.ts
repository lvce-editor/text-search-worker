import { expect, jest, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

const mockRpc = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => mockRpc)

test('copy - no focused item returns same state', async () => {
  const { copy } = await import('../src/parts/Copy/Copy.ts')
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: -1,
    items: [],
  }

  const result = await copy(state)
  expect(result).toBe(state)
  expect(mockRpc.invoke).not.toHaveBeenCalled()
})

test('copy - copies text from focused item', async () => {
  const { copy } = await import('../src/parts/Copy/Copy.ts')
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: 0,
    items: [{ text: 'test text' }],
  }

  const result = await copy(state)
  expect(result).toBe(state)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ClipBoard.writeText', 'test text')
})
