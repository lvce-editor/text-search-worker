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
    savedPreserveCase: false,
    savedMatchCase: false,
    savedMatchWholeWord: false,
    savedUseRegularExpression: false,
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
    savedPreserveCase: false,
    savedMatchCase: false,
    savedMatchWholeWord: false,
    savedUseRegularExpression: false,
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
    savedPreserveCase: false,
    savedMatchCase: false,
    savedMatchWholeWord: false,
    savedUseRegularExpression: false,
  })
})

test('restoreState - with basic state', () => {
  const state = {
    value: 'test',
    replaceExpanded: true,
    preserveCase: true,
    matchCase: true,
    matchWholeWord: true,
  }
  const result = restoreState(state)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: true,
    savedValue: 'test',
    threads: 1,
    savedPreserveCase: true,
    savedMatchCase: true,
    savedMatchWholeWord: true,
    savedUseRegularExpression: false,
  })
})
