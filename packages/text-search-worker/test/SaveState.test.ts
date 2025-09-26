import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

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

  const result = saveState(state)

  expect(result).toEqual({
    value: 'test-value',
    replacement: 'test-replacement',
    flags,
    includeValue: '*.ts',
    excludeValue: 'node_modules',
    history: [],
    collapsedPaths: [],
  })
})
