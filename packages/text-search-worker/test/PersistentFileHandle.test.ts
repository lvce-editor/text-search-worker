import { expect, test, jest } from '@jest/globals'
import { VError } from '../src/parts/VError/VError.ts'

jest.unstable_mockModule('../src/parts/IndexedDb/IndexedDb.ts', () => {
  return {
    getHandle: jest.fn(),
  }
})

const IndexedDb = await import('../src/parts/IndexedDb/IndexedDb.ts')
const PersistentFileHandle = await import('../src/parts/PersistentFileHandle/PersistentFileHandle.ts')

test('getHandle retrieves handle successfully', async () => {
  const uri = 'test-uri'
  const mockHandle = { id: 1, name: 'Test Handle' }

  // @ts-ignore
  IndexedDb.getHandle.mockResolvedValue(mockHandle)

  const result = await PersistentFileHandle.getHandle(uri)
  expect(result).toEqual(mockHandle)
  expect(IndexedDb.getHandle).toHaveBeenCalledWith(uri)
})

test('getHandle throws VError on failure', async () => {
  const uri = 'test-uri'
  const mockError = new Error('Database error')

  // @ts-ignore
  IndexedDb.getHandle.mockRejectedValue(mockError)

  await expect(PersistentFileHandle.getHandle(uri)).rejects.toThrow(VError)
  await expect(PersistentFileHandle.getHandle(uri)).rejects.toThrow('Failed to get handle')
})
