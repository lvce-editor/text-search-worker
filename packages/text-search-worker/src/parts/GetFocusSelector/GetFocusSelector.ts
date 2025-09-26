import * as InputName from '../InputName/InputName.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getFocusSelector = (focusKey: number): string => {
  switch (focusKey) {
    case WhenExpression.FocusSearchInput:
      return InputName.SearchValue
    case WhenExpression.FocusSearchReplaceInput:
      return InputName.ReplaceValue
    case WhenExpression.FocusToggleDetails:
      return InputName.ToggleSearchDetails
    case WhenExpression.FocusSearchMatchCase:
      return InputName.MatchCase
    case WhenExpression.FocusSearchPreserveCase:
      return InputName.PreserveCase
    case WhenExpression.FocusSearchRegex:
      return InputName.UseRegularExpression
    case WhenExpression.FocusSearchIncludeInput:
      return InputName.FilesToInclude
    case WhenExpression.FocusSearchExcludeInput:
      return InputName.FilesToExclude
    case WhenExpression.FocusSearchWholeWord:
      return InputName.MatchWholeWord
    case WhenExpression.FocusSearchReplaceAll:
      return InputName.ReplaceAll
    case WhenExpression.FocusSearchOpenEditors:
      return InputName.SearchOnlyOpenEditors
    case WhenExpression.FocusIgnoreFiles:
      return InputName.UseExcludeSettings
    case WhenExpression.FocusToggleReplace:
      return InputName.ToggleReplace
    case WhenExpression.FocusSearchResults:
      return '.Tree'
    default:
      return ''
  }
}
