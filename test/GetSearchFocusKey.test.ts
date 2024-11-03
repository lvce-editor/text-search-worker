import { expect, test } from '@jest/globals'
import * as GetSearchFocusKey from '../src/parts/GetSearchFocusKey/GetSearchFocusKey.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('searchValue', () => {
  const key = 'search-value'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchInput)
})

test('searchReplaceValue', () => {
  const key = 'search-replace-value'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('matchCase', () => {
  const key = 'Match Case'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchMatchCase)
})

test('matchWholeWord', () => {
  const key = 'Match Whole Word'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchWholeWord)
})

test('useRegularExpression', () => {
  const key = 'Use Regular Expression'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchRegex)
})

test('replaceAll', () => {
  const key = 'Replace All'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchReplaceAll)
})

test('preserveCase', () => {
  const key = 'Preserve Case'
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('other', () => {
  const key = ''
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.Empty)
})
