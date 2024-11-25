import { expect, test } from '@jest/globals'
import * as GetSearchFocusKey from '../src/parts/GetSearchFocusKey/GetSearchFocusKey.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('searchValue', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.SearchValue)).toBe(WhenExpression.FocusSearchInput)
})

test('searchReplaceValue', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.ReplaceValue)).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('matchCase', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.MatchCase)).toBe(WhenExpression.FocusSearchMatchCase)
})

test('matchWholeWord', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.MatchWholeWord)).toBe(WhenExpression.FocusSearchWholeWord)
})

test('useRegularExpression', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.UseRegularExpression)).toBe(WhenExpression.FocusSearchRegex)
})

test('replaceAll', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.ReplaceAll)).toBe(WhenExpression.FocusSearchReplaceAll)
})

test('preserveCase', () => {
  expect(GetSearchFocusKey.getSearchFocusKey(InputName.PreserveCase)).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('other', () => {
  const key = ''
  expect(GetSearchFocusKey.getSearchFocusKey(key)).toBe(WhenExpression.Empty)
})
