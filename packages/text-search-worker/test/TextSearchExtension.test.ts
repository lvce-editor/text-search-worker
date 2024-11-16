import { test, expect, jest, beforeEach } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const TextSearchExtension = await import('../src/parts/TextSearchExtension/TextSearchExtension.ts')
const Rpc = await import('../src/parts/ParentRpc/ParentRpc.ts')

test('textSearch - extension search', async () => {
  const mockResults = [
    {
      type: 1,
      text: './index.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
    {
      type: 2,
      text: '    <title>Document</title>\n',
      start: 208,
      end: 212,
      lineNumber: 1,
    },
  ]

  // @ts-ignore
  Rpc.invoke.mockResolvedValue(mockResults)

  const result = await TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')
  expect(result).toEqual(mockResults)
  expect(Rpc.invoke).toHaveBeenCalledTimes(1)
  expect(Rpc.invoke).toHaveBeenCalledWith('ExtensionHostTextSearch.executeTextSearchProvider', 'xyz', 'abc')
})

test('textSearch - extension search error', async () => {
  // @ts-ignore
  Rpc.invoke.mockRejectedValue(new TypeError('x is not a function'))

  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
})
