import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('saveState', () => {
  const flags =
    SearchFlags.PreserveCase | SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseRegularExpression | SearchFlags.ReplaceExpanded

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    value: 'test-value',
    replacement: 'test-replacement',
    includeValue: '*.ts',
    excludeValue: 'node_modules',
    flags,
  }

  const uid = 1
  SearchViewStates.set(uid, state, state)

  const result = saveState(uid)

  expect(result).toEqual({
    value: 'test-value',
    replacement: 'test-replacement',
    flags,
    includeValue: '*.ts',
    excludeValue: 'node_modules',
  })
})
