import { expect, test } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - with empty state', () => {
  const state = {}
  const result = restoreState(state)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})

test('restoreState - with null state', () => {
  const result = restoreState(null)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})

test('restoreState - with undefined state', () => {
  const result = restoreState(undefined)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})

test('restoreState - with basic state', () => {
  const state = {
    value: 'test',
    replaceExpanded: true,
  }
  const result = restoreState(state)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: true,
    savedValue: 'test',
    threads: 1,
  })
})
