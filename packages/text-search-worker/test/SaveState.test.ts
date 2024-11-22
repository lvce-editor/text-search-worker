import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('saveState', () => {
  let flags = 0
  flags = SearchFlags.togglePreserveCase(flags)
  flags = SearchFlags.toggleMatchCase(flags)
  flags = SearchFlags.toggleMatchWholeWord(flags)
  flags = SearchFlags.toggleUseRegularExpression(flags)
  flags = SearchFlags.toggleReplaceExpanded(flags)

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
  })
})
