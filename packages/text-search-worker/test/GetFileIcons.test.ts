import { expect, jest, test } from '@jest/globals'
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
  const mockFiles = [
    { text: 'file1.txt', type: TextSearchResultType.File },
    { text: 'file2.js', type: TextSearchResultType.Match },
    { text: 'file3.css', type: TextSearchResultType.File },
  ]

  const result = await getFileIcons(mockFiles)

  expect(result).toEqual(['file-icon', 'file-icon'])
  expect(mockRpc.invoke).toHaveBeenCalledTimes(2)
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file1.txt' })
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file3.css' })
})
