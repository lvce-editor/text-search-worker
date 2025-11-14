import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusPreviousInput from '../src/parts/FocusPreviousInput/FocusPreviousInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('focusPreviousInput - from search input to toggle replace', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchInput,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusToggleReplace)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from match case to search input without replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchMatchCase,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from match case to replace input with replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchMatchCase,
    flags: SearchFlags.ReplaceExpanded,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchReplaceInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from whole word to match case', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchWholeWord,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchMatchCase)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from regex to whole word', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchRegex,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchWholeWord)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from preserve case to regex', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchPreserveCase,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from replace input to search input', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from replace all to preserve case', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchReplaceAll,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchPreserveCase)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from toggle details to replace all with replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusToggleDetails,
    flags: SearchFlags.ReplaceExpanded,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchReplaceAll)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from toggle details to regex without replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusToggleDetails,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from open editors to include input', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchOpenEditors,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from exclude input to open editors', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchExcludeInput,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchOpenEditors)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from ignore files to exclude input', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusIgnoreFiles,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchExcludeInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from include input to toggle details', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchIncludeInput,
    flags: 0,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusToggleDetails)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - preserves other state properties', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: WhenExpression.FocusSearchInput,
    value: 'test',
    replacement: 'replace',
    flags: 0,
  })
  expect(updatedState.value).toBe('test')
  expect(updatedState.replacement).toBe('replace')
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - returns same focus for unknown focus value', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    focus: -1,
    flags: 0,
  })
  expect(updatedState.focus).toBe(-1)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})
