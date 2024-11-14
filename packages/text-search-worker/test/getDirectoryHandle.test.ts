import { test, expect, jest } from '@jest/globals'
import { getDirectoryHandle } from '../src/parts/GetDirectoryHandle/GetDirectoryHandle.ts'

test('getDirectoryHandle - should get directory handle', async () => {
  const mockHandle = {
    kind: 'directory',
    name: 'test-dir',
  }

  const mockParent = {
    getDirectoryHandle: jest.fn().mockResolvedValue(mockHandle),
  }

  // @ts-ignore
  const result = await getDirectoryHandle(mockParent, 'test-dir')
  expect(result).toEqual(mockHandle)
  expect(mockParent.getDirectoryHandle).toHaveBeenCalledWith('test-dir', { create: true })
})

test('getDirectoryHandle - should throw error when handle cannot be obtained', async () => {
  const mockParent = {
    getDirectoryHandle: jest.fn().mockRejectedValue(new Error('Failed to get handle')),
  }

  // @ts-ignore
  await expect(getDirectoryHandle(mockParent, 'test-dir')).rejects.toThrow('Failed to get handle')
})
