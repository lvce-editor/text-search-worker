import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFileIcons from '../src/parts/GetFileIcons/GetFileIcons.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('GetFileIcons', async () => {
  const mockInvoke = jest.fn((method: string) => {
    if (method === 'IconTheme.getFileIcon') {
      return 'file-icon'
    }
    throw new Error(`unexpected method ${method}`)
  })
  RendererWorker.registerMockRpc({
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
  expect(mockRpc.invoke).toHaveBeenCalledTimes(2)
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file1.txt' })
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file3.css' })
})
