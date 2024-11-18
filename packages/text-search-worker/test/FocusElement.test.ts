import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as FocusElement from '../src/parts/FocusElement/FocusElement.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('focusElement - sets correct focus state', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const focusKey = WhenExpression.FocusSearchInput

  const result = FocusElement.focusElement(state, focusKey)

  expect(result).toEqual({
    ...state,
    focus: focusKey,
    focusSource: InputSource.Script,
  })
})