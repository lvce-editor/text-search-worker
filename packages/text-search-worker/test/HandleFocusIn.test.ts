import { test, expect } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { handleFocusIn } from '../src/parts/HandleFocusIn/HandleFocusIn.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

test('handleFocusIn changes focus when different key', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const result = await handleFocusIn(state, InputName.SearchValue)
  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn returns same state when focus already matches', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const stateWithFocus = { ...state, focus: WhenExpression.FocusSearchInput }
  const result = await handleFocusIn(stateWithFocus, InputName.SearchValue)
  expect(result).toBe(stateWithFocus)
})

test('handleFocusIn with different focus key', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const result = await handleFocusIn(state, InputName.ReplaceValue)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn with exclude key', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const result = await handleFocusIn(state, InputName.FilesToExclude)
  expect(result.focus).toBe(WhenExpression.FocusSearchExcludeInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn with include key', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const result = await handleFocusIn(state, InputName.FilesToInclude)
  expect(result.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(result.focusSource).toBe(InputSource.User)
})
