import { expect, test } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - no previous state', () => {
  const state = {
    value: '',
    replaceExpanded: false,
    matchCase: false,
    matchWholeWord: false,
    useRegularExpression: false,
    preserveCase: false,
    includeValue: '',
    excludeValue: '',
  }
  const result = restoreState(state)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})

test('restoreState - with previous state', () => {
  const state = {
    value: '',
    replaceExpanded: false,
    matchCase: false,
    matchWholeWord: false,
    useRegularExpression: false,
    preserveCase: false,
    includeValue: '',
    excludeValue: '',
  }

  const result = restoreState(state)

  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})

test('restoreState - preserves non-persisted values', () => {
  const state = {
    value: '',
    replaceExpanded: false,
    matchCase: false,
    items: [],
    focusedIndex: -1,
    height: 100,
  }

  const result = restoreState(state)

  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})

test('restoreState - handles undefined values in previous state', () => {
  const state = {
    value: '',
    replaceExpanded: false,
    matchCase: false,
  }

  const result = restoreState(state)

  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedReplaceExpanded: false,
    savedValue: '',
    threads: 1,
  })
})
