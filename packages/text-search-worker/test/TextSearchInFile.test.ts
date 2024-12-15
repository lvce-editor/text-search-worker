import { expect, jest, test } from '@jest/globals'
import * as BrowserErrorTypes from '../src/parts/BrowserErrorTypes/BrowserErrorTypes.ts'

jest.unstable_mockModule('../src/parts/FileSystemFileHandle/FileSystemFileHandle.ts', () => ({
  getFile: jest.fn(),
}))

jest.unstable_mockModule('../src/parts/TextSearchInText/TextSearchInText.ts', () => ({
  textSearchInText: jest.fn(),
}))

const FileSystemFileHandle = await import('../src/parts/FileSystemFileHandle/FileSystemFileHandle.ts')
const TextSearchInText = await import('../src/parts/TextSearchInText/TextSearchInText.ts')
const TextSearchInFile = await import('../src/parts/TextSearchInFile/TextSearchInFile.ts')

test('textSearchInFile - successful search', async () => {
  const mockFile = new File(['test content'], 'test.txt')
  // @ts-ignore
  FileSystemFileHandle.getFile.mockResolvedValue(mockFile)
  const mockResults = [{ text: 'test', lineNumber: 1 }]
  // @ts-ignore
  TextSearchInText.textSearchInText.mockReturnValue(mockResults)

  const all: any[] = []
  const handle = { name: 'test.txt' }
  const absolutePath = '/test/test.txt'
  const query = 'test'

  // @ts-ignore
  await TextSearchInFile.textSearchInFile(all, handle, absolutePath, query)

  expect(all).toEqual(mockResults)
  expect(FileSystemFileHandle.getFile).toHaveBeenCalledWith(handle)
  expect(TextSearchInText.textSearchInText).toHaveBeenCalledWith(absolutePath, 'test content', query)
})

test('textSearchInFile - ignores NotReadableError', async () => {
  const error = new Error('not readable')
  // @ts-ignore
  error.name = BrowserErrorTypes.NotReadableError
  // @ts-ignore
  FileSystemFileHandle.getFile.mockRejectedValue(error)

  const all: any[] = []
  const handle = { name: 'test.txt' }
  const absolutePath = '/test/test.txt'
  const query = 'test'

  // @ts-ignore
  await TextSearchInFile.textSearchInFile(all, handle, absolutePath, query)

  expect(all).toEqual([])
})

test('textSearchInFile - propagates other errors', async () => {
  const error = new Error('other error')
  // @ts-ignore
  FileSystemFileHandle.getFile.mockRejectedValue(error)

  const all: any[] = []
  const handle = { name: 'test.txt' }
  const absolutePath = '/test/test.txt'
  const query = 'test'

  // @ts-ignore
  await expect(TextSearchInFile.textSearchInFile(all, handle, absolutePath, query)).rejects.toThrow('other error')
})
