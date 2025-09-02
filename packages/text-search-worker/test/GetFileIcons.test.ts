import { expect, jest, test } from '@jest/globals'
void jest
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFileIcons from '../src/parts/GetFileIcons/GetFileIcons.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('GetFileIcons', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'file-icon',
  })

  const mockFiles: readonly SearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: 'file1.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.Match,
      text: 'file2.js',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: TextSearchResultType.File,
      text: 'file3.css',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ]

  const result = await GetFileIcons.getFileIcons(mockFiles)

  expect(result).toEqual(['file-icon', '', 'file-icon'])
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'file1.txt' }],
    ['IconTheme.getFileIcon', { name: 'file3.css' }],
  ])
})
