import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getRipGrepArgs } from '../src/parts/GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'

test('textSearch - extension search', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: 1,
      },
      {
        end: 212,
        lineNumber: 1,
        start: 208,
        text: '    <title>Document</title>\n',
        type: 2,
      },
    ],
  })

  const mockResults = {
    limitHit: false,
    results: [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: 1,
      },
      {
        end: 212,
        lineNumber: 1,
        start: 208,
        text: '    <title>Document</title>\n',
        type: 2,
      },
    ],
  }

  const result = await TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')
  expect(result).toEqual(mockResults)
  expect(mockRpc.invocations).toEqual([
    [
      'ExtensionHostTextSearch.executeTextSearchProvider',
      'xyz',
      'abc',
      'xyz://',
      getRipGrepArgs({ isCaseSensitive: false, searchString: 'abc', threads: 1, useRegularExpression: false }),
    ],
  ])
})

test('textSearch - extension search error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => {
      throw new TypeError('x is not a function')
    },
  })

  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
  expect(mockRpc.invocations).toEqual([
    [
      'ExtensionHostTextSearch.executeTextSearchProvider',
      'xyz',
      'abc',
      'xyz://',
      getRipGrepArgs({ isCaseSensitive: false, searchString: 'abc', threads: 1, useRegularExpression: false }),
    ],
  ])
})

test('preserves remote search roots, options, and result limits', async () => {
  const result = { limitHit: true, results: [] }
  using mockRpc = RendererWorker.registerMockRpc({ 'ExtensionHostTextSearch.executeTextSearchProvider': () => result })
  const options = { exclude: 'node_modules', include: '*.ts', isCaseSensitive: true, threads: 1, useRegularExpression: true }
  await expect(TextSearchExtension.textSearch('remote-ssh', 'remote-ssh://host/work', 'query', options)).resolves.toEqual(result)
  expect(mockRpc.invocations).toEqual([
    [
      'ExtensionHostTextSearch.executeTextSearchProvider',
      'remote-ssh',
      'query',
      'remote-ssh://host/work',
      getRipGrepArgs({ ...options, searchString: 'query' }),
    ],
  ])
})
