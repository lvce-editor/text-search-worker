import { expect, test, jest } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFocus from '../src/parts/SearchFocus/SearchFocus.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

const mockFocus = {
  setFocus: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Focus/Focus.ts', () => mockFocus)

test('focusSearchValue - sets correct focus state', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = SearchFocus.focusSearchValue(state)

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

  const result = SearchFocus.focusSearchValueNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }

  const result = SearchFocus.focusSearchValueNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusMatchCasePrevious - with replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: true,
  }

  const result = SearchFocus.focusMatchCasePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusMatchCasePrevious - without replace expanded', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    replaceExpanded: false,
  }

  const result = SearchFocus.focusMatchCasePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('focusReplaceValuePrevious', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = SearchFocus.focusReplaceValuePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('focusReplaceValueNext', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = SearchFocus.focusReplaceValueNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusRegexNext', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = SearchFocus.focusRegexNext(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('focusPreserveCasePrevious', () => {
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')

  const result = SearchFocus.focusPreserveCasePrevious(state)

  expect(result.focus).toBe(WhenExpression.FocusSearchRegex)
})

test('handleFocusIn - same focus key returns same state', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focus: 0,
  }

  const mockKey = { dataset: { focusKey: 0 } }
  const result = SearchFocus.handleFocusIn(state, mockKey)

  expect(result).toBe(state)
  expect(mockFocus.setFocus).not.toHaveBeenCalled()
})

test('handleFocusIn - different focus key updates state', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    focus: 'oldKey',
  }

  const mockKey = { dataset: { focusKey: 'newKey' } }
  const result = SearchFocus.handleFocusIn(state, mockKey)

  expect(result).toEqual({
    ...state,
    focus: 'newKey',
    focusSource: InputSource.User,
  })
  expect(mockFocus.setFocus).toHaveBeenCalledWith('newKey')
})
