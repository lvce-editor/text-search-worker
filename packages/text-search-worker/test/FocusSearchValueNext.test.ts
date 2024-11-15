import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as FocusSearchValueNext from '../src/parts/FocusSearchValueNext/FocusSearchValueNext.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('focusSearchValueNext - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: true,
  }

  const result = FocusSearchValueNext.focusSearchValueNext(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
    focusSource: InputSource.User,
  })
})

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }

  const result = FocusSearchValueNext.focusSearchValueNext(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchMatchCase,
    focusSource: InputSource.User,
  })
})
