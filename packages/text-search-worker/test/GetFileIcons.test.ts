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

test('GetFileIcons', async () => {
  // Import after mocking
  const { getFileIcons } = await import('../src/parts/GetFileIcons/GetFileIcons.ts')

  // Test data
  const mockFiles = [
    { text: 'file1.txt', type: 'file' },
    { text: 'file2.js', type: TextSearchResultType.Match },
    { text: 'file3.css', type: 'file' },
  ]

  // Execute
  const result = await getFileIcons(mockFiles)

  // Verify
  expect(result).toEqual(['file-icon', 'file-icon'])
  expect(mockRpc.invoke).toHaveBeenCalledTimes(2)
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file1.txt' })
  expect(mockRpc.invoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'file3.css' })
})
