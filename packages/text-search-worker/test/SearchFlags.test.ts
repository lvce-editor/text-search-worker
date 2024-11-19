import { expect, test } from '@jest/globals'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggle and check flags', () => {
  let flags = 0

  // Test PreserveCase
  flags = SearchFlags.togglePreserveCase(flags)
  expect(SearchFlags.hasPreserveCase(flags)).toBe(true)

  // Test UseRegularExpression
  flags = SearchFlags.toggleUseRegularExpression(flags)
  expect(SearchFlags.hasUseRegularExpression(flags)).toBe(true)

  // Test multiple flags
  expect(SearchFlags.hasPreserveCase(flags)).toBe(true)
  expect(SearchFlags.hasUseRegularExpression(flags)).toBe(true)
  expect(SearchFlags.hasMatchCase(flags)).toBe(false)

  // Test toggling off
  flags = SearchFlags.togglePreserveCase(flags)
  expect(SearchFlags.hasPreserveCase(flags)).toBe(false)
  expect(SearchFlags.hasUseRegularExpression(flags)).toBe(true)
})
