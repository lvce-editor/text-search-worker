import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleOpenEditors from '../src/parts/ToggleOpenEditors/ToggleOpenEditors.ts'

test('toggleOpenEditors', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = await ToggleOpenEditors.toggleOpenEditors(initialState)
  expect(SearchFlags.hasOpenEditors(newState.flags)).toBe(true)
})
