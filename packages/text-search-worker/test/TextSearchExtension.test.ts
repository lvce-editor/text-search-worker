import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'

test('textSearch - extension search', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => [
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
    ],
  })

  const mockResults = {
    results: [
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
    ],
    limitHit: false,
  }

  const result = await TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')
  expect(result).toEqual(mockResults)
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostTextSearch.executeTextSearchProvider', 'xyz', 'xyz://', 'abc'],
  ])
})

test('textSearch - extension search error', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => {
      throw new TypeError('x is not a function')
    },
  })

  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostTextSearch.executeTextSearchProvider', 'xyz', 'xyz://', 'abc'],
  ])
})
