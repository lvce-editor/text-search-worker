import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchFocus from '../src/parts/SearchFocus/SearchFocus.ts'

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }

  const result = SearchFocus.focusSearchValueNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusSearchValueNext - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = SearchFocus.focusSearchValueNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusMatchCasePrevious - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = SearchFocus.focusMatchCasePrevious(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusMatchCasePrevious - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }

  const result = SearchFocus.focusMatchCasePrevious(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('focusReplaceValueNext', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = SearchFocus.focusReplaceValueNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})
