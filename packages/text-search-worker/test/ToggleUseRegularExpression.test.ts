import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleUseRegularExpression from '../src/parts/ToggleUseRegularExpression/ToggleUseRegularExpression.ts'

test('toggleUseRegularExpression', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = await ToggleUseRegularExpression.toggleUseRegularExpression(initialState)
  expect(SearchFlags.hasUseRegularExpression(newState.flags)).toBe(true)
})
