import { expect, test } from '@jest/globals'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggle and check flags', () => {
  let flags = 0

  // Test PreserveCase
  flags = SearchFlags.togglePreserveCase(flags)
  expect(SearchFlags.hasPreserveCase(flags)).toBe(SearchFlags.PreserveCase)

  // Test UseRegularExpression
  flags = SearchFlags.toggleUseRegularExpression(flags)
  expect(SearchFlags.hasUseRegularExpression(flags)).toBe(SearchFlags.UseRegularExpression)

  // Test multiple flags
  expect(SearchFlags.hasPreserveCase(flags)).toBe(SearchFlags.PreserveCase)
  expect(SearchFlags.hasUseRegularExpression(flags)).toBe(SearchFlags.UseRegularExpression)
  expect(SearchFlags.hasMatchCase(flags)).toBe(0)

  // Test toggling off
  flags = SearchFlags.togglePreserveCase(flags)
  expect(SearchFlags.hasPreserveCase(flags)).toBe(0)
  expect(SearchFlags.hasUseRegularExpression(flags)).toBe(SearchFlags.UseRegularExpression)
})

test('toggle and check details expanded flag', () => {
  let flags = 0

  flags = SearchFlags.toggleDetailsExpanded(flags)
  expect(SearchFlags.hasDetailsExpanded(flags)).toBe(SearchFlags.DetailsExpanded)

  flags = SearchFlags.toggleDetailsExpanded(flags)
  expect(SearchFlags.hasDetailsExpanded(flags)).toBe(0)
})
