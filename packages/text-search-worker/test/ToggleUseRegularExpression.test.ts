import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ToggleUseRegularExpression from '../src/parts/ToggleUseRegularExpression/ToggleUseRegularExpression.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggleUseRegularExpression', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleUseRegularExpression.toggleUseRegularExpression(initialState)
  expect(SearchFlags.hasUseRegularExpression(newState.flags)).toBeTruthy()
})
