import { expect, test } from '@jest/globals'
import { getSavedFocus, isSavedListFocused } from '../src/parts/GetSavedFocus/GetSavedFocus.ts'

test('getSavedFocus returns focus value when it exists and is a number', () => {
  const savedState = { focus: 5 }
  const result = getSavedFocus(savedState)
  expect(result).toBe(5)
})

test('getSavedFocus returns 0 when savedState is null', () => {
  const result = getSavedFocus(null)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when savedState is undefined', () => {
  const result = getSavedFocus(undefined)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when savedState is not an object', () => {
  const result = getSavedFocus('not an object')
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when focus does not exist', () => {
  const savedState = { other: 'value' }
  const result = getSavedFocus(savedState)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when focus is not a number', () => {
  const savedState = { focus: 'not a number' }
  const result = getSavedFocus(savedState)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when focus is null', () => {
  const savedState = { focus: null }
  const result = getSavedFocus(savedState)
  expect(result).toBe(0)
})

test('isSavedListFocused returns listFocused value when it exists and is a boolean', () => {
  const savedState = { listFocused: true }
  const isResult = isSavedListFocused(savedState)
  expect(isResult).toBe(true)
})

test('isSavedListFocused returns false when listFocused is false', () => {
  const savedState = { listFocused: false }
  const isResult = isSavedListFocused(savedState)
  expect(isResult).toBe(false)
})

test('isSavedListFocused returns false when savedState is null', () => {
  const isResult = isSavedListFocused(null)
  expect(isResult).toBe(false)
})

test('isSavedListFocused returns false when savedState is undefined', () => {
  const isResult = isSavedListFocused(undefined)
  expect(isResult).toBe(false)
})

test('isSavedListFocused returns false when savedState is not an object', () => {
  const isResult = isSavedListFocused('not an object')
  expect(isResult).toBe(false)
})

test('isSavedListFocused returns false when listFocused does not exist', () => {
  const savedState = { other: 'value' }
  const isResult = isSavedListFocused(savedState)
  expect(isResult).toBe(false)
})

test('isSavedListFocused returns false when listFocused is not a boolean', () => {
  const savedState = { listFocused: 'not a boolean' }
  const isResult = isSavedListFocused(savedState)
  expect(isResult).toBe(false)
})

test('isSavedListFocused returns false when listFocused is null', () => {
  const savedState = { listFocused: null }
  const isResult = isSavedListFocused(savedState)
  expect(isResult).toBe(false)
})
