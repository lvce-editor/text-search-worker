import { test, expect } from '@jest/globals'
import * as ToggleReplace from '../src/parts/ToggleReplace/ToggleReplace.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('toggles replaceExpanded state', () => {
  const initialState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }
  const newState = ToggleReplace.toggleReplace(initialState)
  expect(newState.replaceExpanded).toBe(true)

  const nextState = ToggleReplace.toggleReplace(newState)
  expect(nextState.replaceExpanded).toBe(false)
})
