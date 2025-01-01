import { expect, test } from '@jest/globals'
import * as ValidateSearchInput from '../src/parts/ValidateSearchInput/ValidateSearchInput.ts'

test('validateSearchInput - empty string returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('', 1)).toBe('')
})

test('validateSearchInput - regular expression disabled returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('test[', 0)).toBe('')
})

test('validateSearchInput - valid regular expression returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('test.*', 1)).toBe('')
})

test('validateSearchInput - invalid regular expression returns error message', () => {
  expect(ValidateSearchInput.validateSearchInput('[', 1)).toBe('Invalid regular expression: /[/u: Unterminated character class')
})

test('validateSearchInput - complex valid regex returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('(foo|bar)+\\s\\d+', 1)).toBe('')
})

test('validateSearchInput - unescaped special characters returns error message', () => {
  expect(ValidateSearchInput.validateSearchInput('\\', 1)).toMatch(/Invalid regular expression/)
})

test('validateSearchInput - unicode flag is supported', () => {
  expect(ValidateSearchInput.validateSearchInput('\\p{Script=Latin}', 1)).toBe('')
})
