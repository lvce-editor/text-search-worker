import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as OpenUri from '../src/parts/OpenUri/OpenUri.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('openUri - without options', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  await OpenUri.openUri('/test/file.txt')
})

test('openUri - with preview', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  await OpenUri.openUri('/test/file.txt', true)
})

test('openUri - with options', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const options = {
    selections: new Uint32Array([1, 0, 1, 0]),
  }
  await OpenUri.openUri('/test/file.txt', false, options)
})

test('openUri - error', async () => {
  const errorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Main.openUri') {
        throw new Error('Failed to open file')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, errorRpc)

  await expect(OpenUri.openUri('/test/file.txt')).rejects.toThrow('Failed to open file')
})
