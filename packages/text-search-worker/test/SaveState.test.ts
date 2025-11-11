import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('saveState', () => {
  const flags =
    SearchFlags.PreserveCase | SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseRegularExpression | SearchFlags.ReplaceExpanded

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test-value',
    replacement: 'test-replacement',
    includeValue: '*.ts',
    excludeValue: 'node_modules',
    flags,
  }

  const result = saveState(state)

  expect(result).toEqual({
    value: 'test-value',
    replacement: 'test-replacement',
    flags,
    includeValue: '*.ts',
    excludeValue: 'node_modules',
    history: [],
    collapsedPaths: [],
    focus: 0,
    listFocused: false,
  })
})
