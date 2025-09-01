import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFileIcons from '../src/parts/GetFileIcons/GetFileIcons.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('GetFileIcons', async () => {
  const getFileIcon = jest.fn(() => 'file-icon')
  RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': getFileIcon,
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
  expect(getFileIcon).toHaveBeenCalledTimes(2)
  expect(getFileIcon).toHaveBeenCalledWith({ name: 'file1.txt' })
  expect(getFileIcon).toHaveBeenCalledWith({ name: 'file3.css' })
})
