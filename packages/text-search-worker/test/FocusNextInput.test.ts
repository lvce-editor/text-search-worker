import { expect, test } from '@jest/globals'
import * as FocusNextInput from '../src/parts/FocusNextInput/FocusNextInput.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('focusNextInput - from toggle details with details collapsed sets listFocused to true', () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    focus: WhenExpression.FocusToggleDetails,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchResults)
  expect(updatedState.listFocused).toBe(true)
})

test('focusNextInput - from ignore files sets listFocused to true', () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    focus: WhenExpression.FocusIgnoreFiles,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchResults)
  expect(updatedState.listFocused).toBe(true)
})

test('focusNextInput - from use exclude settings sets listFocused to true', () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    focus: WhenExpression.FocusUseExcludeSettings,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchResults)
  expect(updatedState.listFocused).toBe(true)
})

test('focusNextInput - from search input does not set listFocused to true', () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    focus: WhenExpression.FocusSearchInput,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchMatchCase)
  expect(updatedState.listFocused).toBe(false)
})

test('focusNextInput - from toggle details with details expanded does not set listFocused to true', () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    focus: WhenExpression.FocusToggleDetails,
    flags: SearchFlags.DetailsExpanded,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(updatedState.listFocused).toBe(false)
})
