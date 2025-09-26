import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchFetch from '../src/parts/TextSearchFetch/TextSearchFetch.ts'

test('textSearch - calls ParentRpc with correct arguments', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchFetch': () => [
      {
        type: 1,
        text: './index.txt',
        start: 0,
        end: 0,
        lineNumber: 0,
      },
    ],
  })

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = { includePattern: '*.txt' } as any
  const assetDir = '/assets'

  const result = await TextSearchFetch.textSearch(scheme, root, query, options, assetDir)

  expect(result).toEqual({
    results: [
      {
        type: 1,
        text: './index.txt',
        start: 0,
        end: 0,
        lineNumber: 0,
      },
    ],
    limitHit: false,
  })
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir],
  ])
})

test('textSearch - handles error from ParentRpc', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchFetch': () => {
      throw new Error('Network error')
    },
  })

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = {} as any
  const assetDir = '/assets'

  await expect(TextSearchFetch.textSearch(scheme, root, query, options, assetDir)).rejects.toThrow('Network error')
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir],
  ])
})
