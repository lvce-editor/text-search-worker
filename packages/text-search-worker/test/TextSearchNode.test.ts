import { expect, test, jest } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchNode from '../src/parts/TextSearchNode/TextSearchNode.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('textSearch - error', async () => {
  RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => {
      throw new TypeError('x is not a function')
    },
  })

  await expect(TextSearchNode.textSearch('', '/test', 'abc', {} as any)).rejects.toThrow(new TypeError('x is not a function'))
})

test('textSearch', async () => {
  const handler = jest.fn(() => ({
    results: [
      {
        type: TextSearchResultType.File,
        text: './index.txt',
        start: 0,
        end: 0,
        lineNumber: 0,
      },
      {
        type: TextSearchResultType.Match,
        text: '    <title>Document</title>\n',
        start: 0,
        end: 0,
        lineNumber: 0,
      },
    ],
  }))
  const mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': handler,
  })

  expect(await TextSearchNode.textSearch('', '/test', 'abc', {} as any)).toEqual([
    {
      type: TextSearchResultType.File,
      text: './index.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: '    <title>Document</title>\n',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'TextSearch.search',
      {
        ripGrepArgs: [
          '--hidden',
          '--no-require-git',
          '--smart-case',
          '--stats',
          '--json',
          '--threads',
          'undefined',
          '--ignore-case',
          '--fixed-strings',
          '--',
          'abc',
          '.',
        ],
        searchDir: '/test',
      },
    ],
  ])
})
