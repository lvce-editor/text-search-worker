import { beforeEach, expect, jest, test } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const TextSearchFetch = await import('../src/parts/TextSearchFetch/TextSearchFetch.ts')
const ParentRpc = await import('../src/parts/RendererWorker/RendererWorker.ts')

test('textSearch - calls ParentRpc with correct arguments', async () => {
  // @ts-ignore
  ParentRpc.invoke.mockResolvedValue([
    {
      type: 1,
      text: './index.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ])

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = { includePattern: '*.txt' } as any
  const assetDir = '/assets'

  const result = await TextSearchFetch.textSearch(scheme, root, query, options, assetDir)

  expect(result).toEqual([
    {
      type: 1,
      text: './index.txt',
      start: 0,
      end: 0,
      lineNumber: 0,
    },
  ])
  expect(ParentRpc.invoke).toHaveBeenCalledTimes(1)
  expect(ParentRpc.invoke).toHaveBeenCalledWith('ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir)
})

test('textSearch - handles error from ParentRpc', async () => {
  // @ts-ignore
  ParentRpc.invoke.mockRejectedValue(new Error('Network error'))

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = {} as any
  const assetDir = '/assets'

  await expect(TextSearchFetch.textSearch(scheme, root, query, options, assetDir)).rejects.toThrow('Network error')
})
