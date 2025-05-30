import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as FocusSearchValueNext from '../src/parts/FocusSearchValueNext/FocusSearchValueNext.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('focusSearchValueNext - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = FocusSearchValueNext.focusSearchValueNext(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
    focusSource: InputSource.Script,
  })
})

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }

  const result = FocusSearchValueNext.focusSearchValueNext(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchMatchCase,
    focusSource: InputSource.User,
  })
})
