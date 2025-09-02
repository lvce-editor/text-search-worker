import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'

test('textSearch - extension search', async () => {
  RendererWorker.registerMockRpc({
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
  RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => {
      throw new TypeError('x is not a function')
    },
  })

  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
})
