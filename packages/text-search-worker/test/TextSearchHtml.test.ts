import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchHtml from '../src/parts/TextSearchHtml/TextSearchHtml.ts'

test('textSearch - delegates html search to the renderer worker', async () => {
  const results = [{ end: 4, lineNumber: 1, start: 0, text: 'test', type: 2 }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchHtml': () => results,
  })

  await expect(TextSearchHtml.textSearch('html', 'html://workspace', 'test')).resolves.toEqual({ limitHit: false, results })
  expect(mockRpc.invocations).toEqual([['ExtensionHostTextSearch.textSearchHtml', 'html', 'html://workspace', 'test']])
})
