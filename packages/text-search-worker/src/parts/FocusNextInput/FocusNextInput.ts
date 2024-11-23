import * as InputSource from '../InputSource/InputSource.ts'
import { ReplaceExpanded } from '../SearchFlags/SearchFlags.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

const getNextFocus = (focus: number, flags: number): number => {
  switch (focus) {
    case WhenExpression.FocusSearchInput:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchReplaceInput
      }
      return WhenExpression.FocusSearchMatchCase
    case WhenExpression.FocusSearchMatchCase:
      return WhenExpression.FocusSearchWholeWord
    case WhenExpression.FocusSearchWholeWord:
      return WhenExpression.FocusSearchRegex
    case WhenExpression.FocusSearchRegex:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchPreserveCase
      }
      return WhenExpression.FocusToggleDetails
    case WhenExpression.FocusSearchReplaceInput:
      return WhenExpression.FocusSearchMatchCase
    case WhenExpression.FocusSearchPreserveCase:
      return WhenExpression.FocusSearchReplaceAll
    case WhenExpression.FocusSearchReplaceAll:
      return WhenExpression.FocusToggleDetails
    case WhenExpression.FocusSearchIncludeInput:
      return WhenExpression.FocusSearchOpenEditors
    case WhenExpression.FocusSearchOpenEditors:
      return WhenExpression.FocusSearchExcludeInput
    case WhenExpression.FocusSearchExcludeInput:
      return WhenExpression.FocusIgnoreFiles
    default:
      return focus
  }
}

export const focusNextInput = (state: SearchState): SearchState => {
  const nextFocus = getNextFocus(state.focus, state.flags)
  return {
    ...state,
    focus: nextFocus,
    focusSource: InputSource.Script,
  }
}

export const focusPreviousInput = (state: SearchState): SearchState => {
  return state
}
