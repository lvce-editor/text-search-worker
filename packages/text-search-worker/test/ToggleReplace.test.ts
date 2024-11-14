import { test, expect } from '@jest/globals'
import { toggleReplace } from '../src/parts/ToggleReplace/ToggleReplace.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('toggles replaceExpanded state', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }
  const newState = toggleReplace(initialState)
  expect(newState.replaceExpanded).toBe(true)

  const nextState = toggleReplace(newState)
  expect(nextState.replaceExpanded).toBe(false)
})
