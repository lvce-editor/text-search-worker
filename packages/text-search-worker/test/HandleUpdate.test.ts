import { expect, jest, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

RpcRegistry.set(RpcId.RendererWorker, mockRpc)

const { handleUpdate } = await import('../src/parts/HandleUpdate/HandleUpdate.ts')

test('handleUpdate - empty search value returns cleared state', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    value: '',
  }
  const update = { value: '' }

  const result = await handleUpdate(state, update)

  expect(result).toEqual({
    ...state,
    ...update,
    minLineY: 0,
    maxLineY: 0,
    deltaY: 0,
    items: [],
    listItems: [],
    matchCount: 0,
    message: '',
    loaded: true,
    searchInputErrorMessage: '',
  })
})

test.skip('handleUpdate - performs search with valid input', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    workspacePath: '/test',
    value: 'test',
    itemHeight: 20,
    height: 500,
    headerHeight: 40,
    minimumSliderSize: 20,
  }
  const update = { value: 'test' }
  const searchResults = [
    { text: 'file1.txt', type: 1 },
    { text: 'match1', type: 2 },
  ]

  mockRpc.invoke.mockResolvedValue(searchResults)

  const result = await handleUpdate(state, update)

  expect(result).toMatchObject({
    ...state,
    value: 'test',
    items: searchResults,
    listItems: searchResults,
    matchCount: 1,
    fileCount: 1,
    loaded: true,
    searchInputErrorMessage: '',
  })
})

test('handleUpdate - handles search error', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    value: 'test',
  }
  const update = { value: 'test' }
  const error = new Error('Search failed')

  mockRpc.invoke.mockRejectedValue(error)

  const result = await handleUpdate(state, update)

  expect(result).toMatchObject({
    ...state,
    message: 'Error: Search failed',
    items: [],
    listItems: [],
    matchCount: 0,
    fileCount: 0,
    minLineY: 0,
    maxLineY: 0,
  })
})

test.skip('handleUpdate - uses search flags from state', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    workspacePath: '/test',
    value: 'test',
    flags: SearchFlags.MatchCase | SearchFlags.UseRegularExpression,
  }
  const update = { value: 'test' }

  mockRpc.invoke.mockResolvedValue([])

  await handleUpdate(state, update)

  expect(mockRpc.invoke).toHaveBeenCalledWith(
    'TextSearch.search',
    expect.objectContaining({
      isCaseSensitive: true,
      useRegularExpression: true,
    }),
  )
})
