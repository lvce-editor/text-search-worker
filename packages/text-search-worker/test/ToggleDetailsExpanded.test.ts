import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as ToggleDetailsExpanded from '../src/parts/ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggleDetailsExpanded', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(true)
})
