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

test('confirmReplaceOneOccurrenceInOneFile', () => {
  const replacement = 'b'
  expect(SearchStrings.confirmReplaceOneOccurrenceInOneFile(replacement)).toBe("Replace 1 occurrence across 1 file with 'b'")
})

test('confirmReplaceOneOccurrenceInOneFileNoValue', () => {
  expect(SearchStrings.confirmReplaceOneOccurrenceInOneFileNoValue()).toBe('Replace 1 occurrence across 1 file')
})

test('confirmReplaceManyOccurrencesInOneFile', () => {
  const matchCount = 2
  const replacement = 'b'
  expect(SearchStrings.confirmReplaceManyOccurrencesInOneFile(matchCount, replacement)).toBe("Replace 2 occurrences across 1 file with 'b'")
})

test('confirmReplaceManyOccurrencesInOneFileNoValue', () => {
  const matchCount = 2
  expect(SearchStrings.confirmReplaceManyOccurrencesInOneFileNoValue(matchCount)).toBe('Replace 2 occurrences across 1 file')
})

test('confirmReplaceManyOccurrencesInManyFiles', () => {
  const matchCount = 2
  const fileCount = 2
  const replacement = 'b'
  expect(SearchStrings.confirmReplaceManyOccurrencesInManyFiles(matchCount, fileCount, replacement)).toBe(
    "Replace 2 occurrences across 2 files with 'b'",
  )
})

test('confirmReplaceManyOccurrencesInManyFilesNoValue', () => {
  const matchCount = 2
  const fileCount = 2
  expect(SearchStrings.confirmReplaceManyOccurrencesInManyFilesNoValue(matchCount, fileCount)).toBe('Replace 2 occurrences across 2 files')
})

test('replacedOneOccurrenceInOneFile', () => {
  const replacement = 'b'
  expect(SearchStrings.replacedOneOccurrenceInOneFile(replacement)).toBe("Replaced 1 occurrence across 1 file with 'b'")
})

test('replacedManyOccurrencesInOneFile', () => {
  const matchCount = 2
  const replacement = 'b'
  expect(SearchStrings.replacedManyOccurrencesInOneFile(matchCount, replacement)).toBe("Replaced 2 occurrences across 1 file with 'b'")
})

test('replacedManyOccurrencesInManyFiles', () => {
  const matchCount = 2
  const fileCount = 2
  const replacement = 'b'
  expect(SearchStrings.replacedManyOccurrencesInManyFiles(matchCount, fileCount, replacement)).toBe("Replaced 2 occurrences across 2 files with 'b'")
})

test('replaceAll', () => {
  expect(SearchStrings.replaceAll()).toBe('Replace All')
})

test('replace', () => {
  expect(SearchStrings.replace()).toBe('Replace')
})

test('dismiss', () => {
  expect(SearchStrings.dismiss()).toBe('Dismiss')
})

test('copyPath', () => {
  expect(SearchStrings.copyPath()).toBe('Copy Path')
})

test('refresh', () => {
  expect(SearchStrings.refresh()).toBe('Refresh')
})

test('clearSearchResults', () => {
  expect(SearchStrings.clearSearchResults()).toBe('Clear Search Results')
})

test('openNewSearchEditor', () => {
  expect(SearchStrings.openNewSearchEditor()).toBe('Open New Search Editor')
})

test('viewAsTree', () => {
  expect(SearchStrings.viewAsTree()).toBe('View as Tree')
})

test('collapseAll', () => {
  expect(SearchStrings.collapseAll()).toBe('Collapse All')
})
