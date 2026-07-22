import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchMemory from '../src/parts/TextSearchMemory/TextSearchMemory.ts'

const options = {} as any

test('textSearch - uses the completion result API', async () => {
  const completion = { limitHit: true, results: [] }
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchMemory2': () => completion,
  })

  await expect(TextSearchMemory.textSearch('memfs', 'memfs://workspace', 'test', options, '/assets')).resolves.toEqual(completion)
  expect(mockRpc.invocations).toEqual([['ExtensionHostTextSearch.textSearchMemory2', 'memfs', 'memfs://workspace', 'test', options, '/assets']])
})

test('textSearch - falls back to the legacy result API', async () => {
  const results = [{ end: 4, lineNumber: 1, start: 0, text: 'test', type: 2 }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchMemory': () => results,
    'ExtensionHostTextSearch.textSearchMemory2': () => undefined,
  })

  await expect(TextSearchMemory.textSearch('memfs', 'memfs://workspace', 'test', options, '/assets')).resolves.toEqual({
    limitHit: false,
    results,
  })
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostTextSearch.textSearchMemory2', 'memfs', 'memfs://workspace', 'test', options, '/assets'],
    ['ExtensionHostTextSearch.textSearchMemory', 'memfs', 'memfs://workspace', 'test', options, '/assets'],
  ])
})
