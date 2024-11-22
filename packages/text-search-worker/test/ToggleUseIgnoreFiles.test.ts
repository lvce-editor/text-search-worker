import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as ToggleUseIgnoreFiles from '../src/parts/ToggleUseIgnoreFiles/ToggleUseIgnoreFiles.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggleUseIgnoreFiles', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleUseIgnoreFiles.toggleUseIgnoreFiles(initialState)
  expect(SearchFlags.hasUseIgnoreFiles(newState.flags)).toBe(true)
})