import { expect, jest, test } from '@jest/globals'
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
  expect(getFileIcon.mock.calls.length).toBe(2)
  expect(getFileIcon.mock.calls[0]).toEqual([{ name: 'file1.txt' }])
  expect(getFileIcon.mock.calls[1]).toEqual([{ name: 'file3.css' }])
})
