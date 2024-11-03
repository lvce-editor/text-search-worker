import * as Focus from '../Focus/Focus.ts'
import * as GetSearchFocusKey from '../GetSearchFocusKey/GetSearchFocusKey.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const focusSearchValue = (state: SearchState): SearchState => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
  }
}

export const focusSearchValueNext = (state: SearchState): SearchState => {
  const { replaceExpanded } = state
  if (replaceExpanded) {
    return focusReplaceValue(state)
  }
  return focusMatchCase(state)
}

export const focusMatchCasePrevious = (state: SearchState): SearchState => {
  const { replaceExpanded } = state
  if (replaceExpanded) {
    return focusReplaceValue(state)
  }
  return focusSearchValue(state)
}

export const focusReplaceValuePrevious = (state: SearchState): SearchState => {
  return focusSearchValue(state)
}

export const focusReplaceValueNext = (state: SearchState): SearchState => {
  return focusMatchCase(state)
}

export const focusRegexNext = (state: SearchState): SearchState => {
  return focusPreserveCase(state)
}

export const focusPreserveCasePrevious = (state: SearchState): SearchState => {
  return focusRegex(state)
}

export const focusReplaceValue = (state: SearchState): SearchState => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
  }
}

export const focusMatchCase = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchMatchCase }
}

export const focusPreserveCase = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchPreserveCase }
}

export const focusMatchWholeWord = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchWholeWord }
}

export const focusRegex = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchRegex }
}

export const focusReplaceAll = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchReplaceAll }
}

export const handleFocusIn = (state: SearchState, key: any) => {
  const focusKey = GetSearchFocusKey.getSearchFocusKey(key)
  Focus.setFocus(focusKey)
  return {
    ...state,
    focus: focusKey,
  }
}
