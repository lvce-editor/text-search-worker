import { expect, test } from '@jest/globals'
import { getReplaceAllConfirmText } from '../src/parts/GetReplaceAllConfirmText/GetReplaceAllConfirmText.ts'
import * as ViewletSearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'

test('getReplaceAllConfirmText returns correct message for one match in one file with replacement', () => {
  const matchCount = 1
  const fileCount = 1
  const replacement = 'replacement text'

  const result = getReplaceAllConfirmText(matchCount, fileCount, replacement)
  expect(result).toBe(ViewletSearchStrings.confirmReplaceOneOccurrenceInOneFile(replacement))
})

test('getReplaceAllConfirmText returns correct message for one match in one file without replacement', () => {
  const matchCount = 1
  const fileCount = 1
  const replacement = ''

  const result = getReplaceAllConfirmText(matchCount, fileCount, replacement)
  expect(result).toBe(ViewletSearchStrings.confirmReplaceOneOccurrenceInOneFileNoValue())
})

test('getReplaceAllConfirmText returns correct message for multiple matches in one file with replacement', () => {
  const matchCount = 5
  const fileCount = 1
  const replacement = 'replacement text'

  const result = getReplaceAllConfirmText(matchCount, fileCount, replacement)
  expect(result).toBe(ViewletSearchStrings.confirmReplaceManyOccurrencesInOneFile(matchCount, replacement))
})

test('getReplaceAllConfirmText returns correct message for multiple matches in one file without replacement', () => {
  const matchCount = 5
  const fileCount = 1
  const replacement = ''

  const result = getReplaceAllConfirmText(matchCount, fileCount, replacement)
  expect(result).toBe(ViewletSearchStrings.confirmReplaceManyOccurrencesInOneFileNoValue(matchCount))
})

test('getReplaceAllConfirmText returns correct message for multiple matches in multiple files with replacement', () => {
  const matchCount = 10
  const fileCount = 3
  const replacement = 'replacement text'

  const result = getReplaceAllConfirmText(matchCount, fileCount, replacement)
  expect(result).toBe(ViewletSearchStrings.confirmReplaceManyOccurrencesInManyFiles(matchCount, fileCount, replacement))
})

test('getReplaceAllConfirmText returns correct message for multiple matches in multiple files without replacement', () => {
  const matchCount = 10
  const fileCount = 3
  const replacement = ''

  const result = getReplaceAllConfirmText(matchCount, fileCount, replacement)
  expect(result).toBe(ViewletSearchStrings.confirmReplaceManyOccurrencesInManyFilesNoValue(matchCount, fileCount))
})
