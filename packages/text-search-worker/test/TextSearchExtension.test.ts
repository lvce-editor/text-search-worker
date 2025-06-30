import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'

test('textSearch - extension search', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostTextSearch.executeTextSearchProvider') {
        return [
          {
            type: 1,
            text: './index.txt',
            start: 0,
            end: 0,
            lineNumber: 0,
          },
          {
            type: 2,
            text: '    <title>Document</title>\n',
            start: 208,
            end: 212,
            lineNumber: 1,
          },
        ]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const mockResults = [
    {
      type: 1,
      text: './index.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: 2,
      text: '    <title>Document</title>\n',
      start: 208,
      end: 212,
      lineNumber: 1,
    },
  ]

  const result = await TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')
  expect(result).toEqual(mockResults)
})

test('textSearch - extension search error', async () => {
  const errorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostTextSearch.executeTextSearchProvider') {
        throw new TypeError('x is not a function')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, errorRpc)

  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
})
