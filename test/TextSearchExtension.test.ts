import { beforeEach, expect, jest, test } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/ExtensionHost/ExtensionHostTextSearch.js', () => {
  return {
    executeTextSearchProvider: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const TextSearchExtension = await import('../src/parts/TextSearchExtension/TextSearchExtension.ts')

test.skip('textSearch - extension search - error', async () => {
  // @ts-ignore
  ExtensionHostTextSearch.executeTextSearchProvider.mockImplementation(() => {
    throw new TypeError('x is not a function')
  })
  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
})

test.skip('textSearch - extension search', async () => {
  // @ts-ignore
  ExtensionHostTextSearch.executeTextSearchProvider.mockImplementation(() => {
    return [
      [
        './index.txt',
        {
          absoluteOffset: 208,
          preview: '    <title>Document</title>\n',
        },
      ],
    ]
  })
  expect(await TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).toEqual([
    [
      './index.txt',
      {
        absoluteOffset: 208,
        preview: '    <title>Document</title>\n',
      },
    ],
  ])
  // @ts-ignore
  expect(ExtensionHostTextSearch.executeTextSearchProvider).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(ExtensionHostTextSearch.executeTextSearchProvider).toHaveBeenCalledWith('xyz', 'abc')
})
