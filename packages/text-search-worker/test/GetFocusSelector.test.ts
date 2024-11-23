import { expect, test } from '@jest/globals'
import * as GetFocusSelector from '../src/parts/GetFocusSelector/GetFocusSelector.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('getFocusSelector - search input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchInput)).toBe('[name="search-value"]')
})

test('getFocusSelector - replace input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchReplaceInput)).toBe('[name="search-replace-value"]')
})

test('getFocusSelector - match case', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchMatchCase)).toBe('[title="Match Case"]')
})

test('getFocusSelector - preserve case', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchPreserveCase)).toBe('[title="Preserve Case"]')
})

test('getFocusSelector - regex', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchRegex)).toBe('[title="Use Regular Expression"]')
})

test('getFocusSelector - match whole word', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchWholeWord)).toBe('[title="Match Whole Word"]')
})

test('getFocusSelector - search include input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchIncludeInput)).toBe('[name="files-to-include-value"]')
})

test('getFocusSelector - search exclude input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchExcludeInput)).toBe('[name="files-to-exclude-value"]')
})

test('getFocusSelector - unknown focus key', () => {
  expect(GetFocusSelector.getFocusSelector(-1)).toBe('')
})

test('getFocusSelector - toggle details', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusToggleDetails)).toBe('[title="Toggle Search Details"]')
})

test('getFocusSelector - replace all', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchReplaceAll)).toBe('[title="Replace All"]')
})
