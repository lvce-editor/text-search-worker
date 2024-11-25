import { expect, test } from '@jest/globals'
import * as GetFocusSelector from '../src/parts/GetFocusSelector/GetFocusSelector.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('getFocusSelector - search input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchInput)).toBe('SearchValue')
})

test('getFocusSelector - replace input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchReplaceInput)).toBe('ReplaceValue')
})

test('getFocusSelector - match case', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchMatchCase)).toBe('MatchCase')
})

test('getFocusSelector - preserve case', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchPreserveCase)).toBe('PreserveCase')
})

test('getFocusSelector - regex', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchRegex)).toBe('UseRegularExpression')
})

test('getFocusSelector - match whole word', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchWholeWord)).toBe('MatchWholeWord')
})

test('getFocusSelector - search include input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchIncludeInput)).toBe('FilesToInclude')
})

test('getFocusSelector - search exclude input', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchExcludeInput)).toBe('FilesToExclude')
})

test('getFocusSelector - unknown focus key', () => {
  expect(GetFocusSelector.getFocusSelector(-1)).toBe('')
})

test('getFocusSelector - toggle details', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusToggleDetails)).toBe('ToggleSearchDetails')
})

test('getFocusSelector - replace all', () => {
  expect(GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchReplaceAll)).toBe('ReplaceAll')
})
