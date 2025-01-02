import { expect, jest, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockIcon = 'file-icon'
const mockRpc = {
  // @ts-ignore
  invoke: jest.fn().mockResolvedValue(mockIcon),
}

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => ({
  invoke: mockRpc.invoke,
}))

const { getFileIcons } = await import('../src/parts/GetFileIcons/GetFileIcons.ts')

test('GetFileIcons', async () => {
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

  const result = await getFileIcons(mockFiles)

  expect(result).toEqual(['file-icon', '', 'file-icon'])
  expect(mockRpc.invoke).toHaveBeenCalledTimes(2)
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file1.txt' })
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file3.css' })
})
