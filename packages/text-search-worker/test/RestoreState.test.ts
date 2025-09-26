import { expect, test } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('restoreState - with empty state', () => {
  const state = {}
  const result = restoreState(state)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedValue: '',
    threads: 1,
    flags: 0,
    includeValue: '',
    excludeValue: '',
    history: [],
    focus: 0,
  })
})

test('restoreState - with null state', () => {
  const result = restoreState(null)
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedValue: '',
    threads: 1,
    flags: 0,
    includeValue: '',
    excludeValue: '',
    history: [],
    focus: 0,
  })
})

test('restoreState - with basic state', () => {
  const state = {
    value: 'test',
    flags: 31,
    includeValue: '*.ts',
    excludeValue: 'node_modules',
  }
  const result = restoreState(state)
  const expectedFlags =
    SearchFlags.PreserveCase | SearchFlags.ReplaceExpanded | SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseRegularExpression
  expect(result).toEqual({
    replacement: '',
    savedCollapsedPaths: [],
    savedValue: 'test',
    threads: 1,
    flags: expectedFlags,
    includeValue: '*.ts',
    excludeValue: 'node_modules',
    history: [],
    focus: 0,
  })
})
