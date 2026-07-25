import { expect, test } from '@jest/globals'
import { textSearch } from '../src/parts/TextSearchWeb/TextSearchWeb.ts'

test('textSearch returns empty array for empty object', async () => {
  const result = await textSearch('web', '/root', 'test')
  expect(result).toEqual({
    limitHit: false,
    results: [],
  })
})

test('textSearch with different parameters', async () => {
  const result = await textSearch('web', '/different', 'query')
  expect(result).toEqual({
    limitHit: false,
    results: [],
  })
})
