import { expect, jest, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { TextSearchCompletionResult } from '../src/parts/TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../src/parts/TextSearchOptions/TextSearchOptions.ts'
import { textSearch } from '../src/parts/TextSearch/TextSearch.ts'
import { set } from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

test('textSearch - calls provider with correct arguments', async () => {
  const root = 'test:///test/path'
  const query = 'search term'
  const assetDir = '/assets'
  const options: TextSearchOptions = {
    scheme: 'test',
    root,
    query,
    assetDir,
    threads: 0,
    include: '*.ts',
    exclude: '',
    useRegularExpression: false,
    isCaseSensitive: false,
    matchWholeWord: false,
    flags: 0,
    limit: 0,
  }

  const search = jest.fn(async (): Promise<TextSearchCompletionResult> => {
    const results: readonly SearchResult[] = [
      { text: 'result1', type: 1, start: 0, end: 0, lineNumber: 0 },
      { text: 'result2', type: 1, start: 0, end: 0, lineNumber: 0 },
    ]
    return {
      limitHit: false,
      results,
    }
  })
  set({
    test: search,
  })

  const results = await textSearch(root, query, options, assetDir)
  // @ts-ignore
  expect(search).toHaveBeenCalledWith('test', root, query, options, assetDir, undefined)
  expect(results).toEqual({
    limitHit: false,
    results: [
      { text: 'result1', type: 1, start: 0, end: 0, lineNumber: 0 },
      { text: 'result2', type: 1, start: 0, end: 0, lineNumber: 0 },
    ],
  })
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
  const assetDir = '/assets'
  const options: TextSearchOptions = {
    scheme: 'http',
    root,
    query,
    assetDir,
    threads: 0,
    include: '',
    exclude: '',
    useRegularExpression: false,
    isCaseSensitive: false,
    matchWholeWord: false,
    flags: 0,
    limit: 0,
  }

  const mockProvider = jest.fn(async (): Promise<TextSearchCompletionResult> => {
    const results: readonly SearchResult[] = [{ text: 'result', type: 1, start: 0, end: 0, lineNumber: 0 }]
    return {
      limitHit: false,
      results,
    }
  })
  set({
    http: mockProvider,
  })

  await textSearch(root, query, options, assetDir)

  // @ts-ignore
  expect(mockProvider).toHaveBeenCalledWith('http', root, query, options, assetDir, undefined)
})
