import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ToggleUseRegularExpression from '../src/parts/ToggleUseRegularExpression/ToggleUseRegularExpression.ts'

test('toggleUseRegularExpression', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    useRegularExpression: false,
  }
  const newState = ToggleUseRegularExpression.toggleUseRegularExpression(initialState)
  expect(newState.useRegularExpression).toBe(true)
})
