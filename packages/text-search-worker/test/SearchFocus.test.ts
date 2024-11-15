import { expect, test, jest, beforeEach } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

const mockSetFocus = jest.fn()

jest.unstable_mockModule('../src/parts/Focus/Focus.ts', () => ({
  setFocus: mockSetFocus,
}))

const {
  focusSearchValue,
  focusSearchValueNext,
  focusMatchCasePrevious,
  focusReplaceValuePrevious,
  focusReplaceValueNext,
  focusRegexNext,
  focusPreserveCasePrevious,
  handleFocusIn,
} = await import('../src/parts/SearchFocus/SearchFocus.ts')

beforeEach(() => {
  mockSetFocus.mockClear()
})

test('focusSearchValue - sets correct focus state', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = focusSearchValue(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  })
})

test('focusSearchValueNext - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: true,
  }

  const result = focusSearchValueNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }

  const result = focusSearchValueNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusMatchCasePrevious - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: true,
  }

  const result = focusMatchCasePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusMatchCasePrevious - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }

  const result = focusMatchCasePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('focusReplaceValuePrevious', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = focusReplaceValuePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('focusReplaceValueNext', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = focusReplaceValueNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusRegexNext', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = focusRegexNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('focusPreserveCasePrevious', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = focusPreserveCasePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchRegex)
})

test('handleFocusIn - same focus key returns same state', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focus: 0,
  }

  const mockKey = { dataset: { focusKey: 'testKey' } }
  const result = handleFocusIn(state, mockKey)

  expect(result).toBe(state)
  expect(mockSetFocus).not.toHaveBeenCalled()
})

test('handleFocusIn - different focus key updates state', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focus: 'oldKey',
  }

  const mockKey = { dataset: { focusKey: 'newKey' } }
  const result = handleFocusIn(state, mockKey)

  expect(result).toEqual({
    ...state,
    focus: 0,
    focusSource: InputSource.User,
  })
})
