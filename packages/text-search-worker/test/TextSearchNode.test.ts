import { beforeEach, expect, jest, test } from '@jest/globals'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/RendererWorker/RendererWorker.ts', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const TextSearchNode = await import('../src/parts/TextSearchNode/TextSearchNode.ts')

const ParentRpc = await import('../src/parts/RendererWorker/RendererWorker.ts')

test('textSearch - error', async () => {
  // @ts-ignore
  ParentRpc.invoke.mockRejectedValue(new TypeError('x is not a function'))
  await expect(TextSearchNode.textSearch('', '/test', 'abc', {} as any)).rejects.toThrow(new TypeError('x is not a function'))
})

test('textSearch', async () => {
  // @ts-ignore
  ParentRpc.invoke.mockResolvedValue({
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
  expect(ParentRpc.invoke).toHaveBeenCalledTimes(1)
  expect(ParentRpc.invoke).toHaveBeenCalledWith('SearchProcess.invoke', 'TextSearch.search', {
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
