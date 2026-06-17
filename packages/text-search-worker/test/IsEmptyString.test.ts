import { expect, test } from '@jest/globals'
import * as Character from '../src/parts/Character/Character.ts'
import { isEmptyString } from '../src/parts/IsEmptyString/IsEmptyString.ts'

test('isEmptyString returns true for empty string', () => {
  const isResult = isEmptyString('')
  expect(isResult).toBe(true)
})

test('isEmptyString returns false for non-empty string', () => {
  const isResult = isEmptyString('Hello')
  expect(isResult).toBe(false)
})

test('isEmptyString returns false for string equal to Character.EmptyString', () => {
  const isResult = isEmptyString(Character.EmptyString)
  expect(isResult).toBe(true)
})

test('isEmptyString returns false for whitespace string', () => {
  const isResult = isEmptyString(' '.repeat(3))
  expect(isResult).toBe(false)
})
