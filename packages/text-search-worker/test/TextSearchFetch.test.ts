import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as TextSearchFetch from '../src/parts/TextSearchFetch/TextSearchFetch.ts'

test('textSearch - calls ParentRpc with correct arguments', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostTextSearch.textSearchFetch') {
        return Promise.resolve([
          {
            type: 1,
            text: './index.txt',
            start: 0,
            end: 0,
            lineNumber: 0,
          },
        ])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = { includePattern: '*.txt' } as any
  const assetDir = '/assets'

  const result = await TextSearchFetch.textSearch(scheme, root, query, options, assetDir)

  expect(result).toEqual([
    {
      type: 1,
      text: './index.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ])
})

test('textSearch - handles error from ParentRpc', async () => {
  const errorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostTextSearch.textSearchFetch') {
        throw new Error('Network error')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, errorRpc)

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = {} as any
  const assetDir = '/assets'

  await expect(TextSearchFetch.textSearch(scheme, root, query, options, assetDir)).rejects.toThrow('Network error')
})
