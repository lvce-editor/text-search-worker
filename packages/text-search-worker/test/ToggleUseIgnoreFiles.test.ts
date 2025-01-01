import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleUseIgnoreFiles from '../src/parts/ToggleUseIgnoreFiles/ToggleUseIgnoreFiles.ts'

test('toggleUseIgnoreFiles', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = await ToggleUseIgnoreFiles.toggleUseIgnoreFiles(initialState)
  expect(SearchFlags.hasUseIgnoreFiles(newState.flags)).toBe(true)
})
