import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as TextSearchNode from '../src/parts/TextSearchNode/TextSearchNode.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('textSearch - error', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'SearchProcess.invoke') {
      throw new TypeError('x is not a function')
    }
    throw new Error(`unexpected method ${method}`)
  })
  const errorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, errorRpc)

  await expect(TextSearchNode.textSearch('', '/test', 'abc', {} as any)).rejects.toThrow(new TypeError('x is not a function'))
})

test('textSearch', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'SearchProcess.invoke') {
      return {
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
      }
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

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
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('SearchProcess.invoke', 'TextSearch.search', {
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
  })
})
