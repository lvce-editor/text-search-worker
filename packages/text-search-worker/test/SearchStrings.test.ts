import { expect, test } from '@jest/globals'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'

test('noResults', () => {
  expect(SearchStrings.noResults()).toBe('No results found')
})

test('oneResult', () => {
  expect(SearchStrings.oneResult()).toBe('1 result in 1 file')
})

test('manyResultsInOneFile', () => {
  const resultCount = 2
  expect(SearchStrings.manyResultsInOneFile(resultCount)).toBe('2 results in 1 file')
})

test('manyResultsInManyFiles', () => {
  const resultCount = 2
  const fileResultCount = 2
  expect(SearchStrings.manyResultsInManyFiles(resultCount, fileResultCount)).toBe('2 results in 2 files')
})
