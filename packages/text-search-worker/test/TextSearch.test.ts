import { expect, test, jest } from '@jest/globals'

const mockProvider = jest.fn()

jest.unstable_mockModule('../src/parts/TextSearchProvider/TextSearchProvider.ts', () => ({
  getProvider: jest.fn(() => mockProvider),
}))

const { textSearch } = await import('../src/parts/TextSearch/TextSearch.ts')

test('textSearch - calls provider with correct arguments', async () => {
  const root = 'file:///test/path'
  const query = 'search term'
  const options = { includePattern: '*.ts' }
  const assetDir = '/assets'

  // @ts-ignore
  mockProvider.mockResolvedValue(['result1', 'result2'])

  const results = await textSearch(root, query, options, assetDir)

  expect(mockProvider).toHaveBeenCalledWith('file', root, query, options, assetDir, undefined)
  expect(results).toEqual(['result1', 'result2'])
})

test('textSearch - throws error for non-string root', async () => {
  // @ts-expect-error intentionally passing wrong type
  await expect(textSearch(123, 'query', {}, '/assets')).rejects.toThrow()
})

test('textSearch - throws error for non-string query', async () => {
  // @ts-expect-error intentionally passing wrong type
  await expect(textSearch('file:///path', 123, {}, '/assets')).rejects.toThrow()
})

test('textSearch - handles different protocols', async () => {
  const root = 'http://test.com'
  const query = 'search'
  const options = {}
  const assetDir = '/assets'

  // @ts-ignore
  mockProvider.mockResolvedValue(['result'])

  await textSearch(root, query, options, assetDir)

  expect(mockProvider).toHaveBeenCalledWith('http', root, query, options, assetDir, undefined)
})
