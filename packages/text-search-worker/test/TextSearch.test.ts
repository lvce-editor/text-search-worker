import { expect, jest, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { textSearch } from '../src/parts/TextSearch/TextSearch.ts'
import { set } from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

test('textSearch - calls provider with correct arguments', async () => {
  const root = 'test:///test/path'
  const query = 'search term'
  const options = { includePattern: '*.ts' } as any
  const assetDir = '/assets'

  const search = jest.fn(async (): Promise<readonly SearchResult[]> => {
    return ['result1', 'result2'] as any[]
  })
  set({
    test: search,
  })

  const results = await textSearch(root, query, options, assetDir)
  // @ts-ignore
  expect(search).toHaveBeenCalledWith('test', root, query, options, assetDir, undefined)
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
  const options = {} as any
  const assetDir = '/assets'

  const mockProvider = jest.fn(async (): Promise<readonly SearchResult[]> => {
    return ['result'] as any[]
  })
  set({
    http: mockProvider,
  })

  await textSearch(root, query, options, assetDir)

  // @ts-ignore
  expect(mockProvider).toHaveBeenCalledWith('http', root, query, options, assetDir, undefined)
})
