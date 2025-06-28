import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as Create from '../src/parts/Create/Create.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('loadContent with saved value calls handleUpdate', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = {
    value: 'test',
    savedCollapsedPaths: [],
    threads: 4,
    replacement: 'replacement',
    flags: 1,
    includeValue: 'include',
    excludeValue: 'exclude',
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'SearchProcess.invoke') {
        return { results: [] }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    value: 'test',
    threads: 1,
    flags: 1,
    includeValue: 'include',
    excludeValue: 'exclude',
    loaded: true,
  })
})

test('loadContent without saved value returns state with loaded flag', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = {
    value: '',
    savedCollapsedPaths: [],
    threads: 4,
    replacement: '',
    flags: 1,
    includeValue: '',
    excludeValue: '',
  }

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    threads: 1,
    flags: 1,
    loaded: true,
  })
})

test('loadContent with null savedState', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = null

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})

test('loadContent with undefined savedState', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = undefined

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})