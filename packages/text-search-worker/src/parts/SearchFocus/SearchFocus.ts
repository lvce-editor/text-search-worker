import * as Focus from '../Focus/Focus.ts'
import * as GetSearchFocusKey from '../GetSearchFocusKey/GetSearchFocusKey.ts'
import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusSearchValue = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
}

export const focusSearchValueNext = (state: SearchHeader): SearchHeader => {
  const { replaceExpanded } = state
  if (replaceExpanded) {
    return focusReplaceValue(state)
  }
  return focusMatchCase(state)
}

export const focusMatchCasePrevious = (state: SearchHeader): SearchHeader => {
  const { replaceExpanded } = state
  if (replaceExpanded) {
    return focusReplaceValue(state)
  }
  return focusSearchValue(state)
}

export const focusReplaceValuePrevious = (state: SearchHeader): SearchHeader => {
  return focusSearchValue(state)
}

export const focusReplaceValueNext = (state: SearchHeader): SearchHeader => {
  return focusMatchCase(state)
}

export const focusRegexNext = (state: SearchHeader): SearchHeader => {
  return focusPreserveCase(state)
}

export const focusPreserveCasePrevious = (state: SearchHeader): SearchHeader => {
  return focusRegex(state)
}

export const focusReplaceValue = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
    focusSource: InputSource.Script,
  }
}

export const focusMatchCase = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchMatchCase,
    focusSource: InputSource.Script,
  }
}

export const focusPreserveCase = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchPreserveCase,
    focusSource: InputSource.Script,
  }
}

export const focusMatchWholeWord = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchWholeWord,
    focusSource: InputSource.Script,
  }
}

export const focusRegex = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchRegex,
    focusSource: InputSource.Script,
  }
}

export const focusReplaceAll = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchReplaceAll,
    focusSource: InputSource.Script,
  }
}

export const handleFocusIn = (state: SearchHeader, key: any): SearchHeader => {
  const focusKey = GetSearchFocusKey.getSearchFocusKey(key)
  if (state.focus === focusKey) {
    return state
  }
  void Focus.setFocus(focusKey)
  return {
    ...state,
    focus: focusKey,
    focusSource: InputSource.User,
  }
}
