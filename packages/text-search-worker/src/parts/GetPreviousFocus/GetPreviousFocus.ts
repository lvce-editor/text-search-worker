import { ReplaceExpanded } from '../SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getPreviousFocus = (focus: number, flags: number): number => {
  switch (focus) {
    case WhenExpression.FocusSearchInput:
      return WhenExpression.FocusToggleReplace
    case WhenExpression.FocusSearchMatchCase:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchReplaceInput
      }
      return WhenExpression.FocusSearchInput
    case WhenExpression.FocusSearchWholeWord:
      return WhenExpression.FocusSearchMatchCase
    case WhenExpression.FocusSearchRegex:
      return WhenExpression.FocusSearchWholeWord
    case WhenExpression.FocusSearchPreserveCase:
      return WhenExpression.FocusSearchRegex
    case WhenExpression.FocusSearchReplaceInput:
      return WhenExpression.FocusSearchInput
    case WhenExpression.FocusSearchReplaceAll:
      return WhenExpression.FocusSearchPreserveCase
    case WhenExpression.FocusToggleDetails:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchReplaceAll
      }
      return WhenExpression.FocusSearchRegex
    case WhenExpression.FocusSearchOpenEditors:
      return WhenExpression.FocusSearchIncludeInput
    case WhenExpression.FocusSearchExcludeInput:
      return WhenExpression.FocusSearchOpenEditors
    case WhenExpression.FocusIgnoreFiles:
      return WhenExpression.FocusSearchExcludeInput
    case WhenExpression.FocusSearchIncludeInput:
      return WhenExpression.FocusToggleDetails
    default:
      return focus
  }
}
