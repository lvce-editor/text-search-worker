import * as FocusElement from '../FocusElement/FocusElement.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const focusSearchValue = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchInput)
}

export const focusReplaceValue = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchReplaceInput)
}

export const focusMatchCase = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchMatchCase)
}

export const focusPreserveCase = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchPreserveCase)
}

export const focusRegex = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchRegex)
}

export const focusReplaceAll = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchReplaceAll)
}
