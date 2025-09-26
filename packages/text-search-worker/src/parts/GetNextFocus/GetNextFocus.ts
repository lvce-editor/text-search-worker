import { ReplaceExpanded, DetailsExpanded } from '../SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getNextFocus = (focus: number, flags: number): number => {
  switch (focus) {
    case WhenExpression.FocusToggleReplace:
      return WhenExpression.FocusSearchInput
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
    case WhenExpression.FocusToggleDetails:
      if (flags & DetailsExpanded) {
        return WhenExpression.FocusSearchIncludeInput
      }
      return WhenExpression.FocusSearchResults
    case WhenExpression.FocusIgnoreFiles:
      return WhenExpression.FocusSearchResults
    default:
      return focus
  }
}
