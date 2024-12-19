import { expect, test } from '@jest/globals'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleOpenEditors from '../src/parts/ToggleOpenEditors/ToggleOpenEditors.ts'

test('toggleOpenEditors', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleOpenEditors.toggleOpenEditors(initialState)
  expect(SearchFlags.hasOpenEditors(newState.flags)).toBe(true)
})
