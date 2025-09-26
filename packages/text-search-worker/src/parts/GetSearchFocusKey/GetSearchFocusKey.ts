import * as InputName from '../InputName/InputName.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const getSearchFocusKey = (key: string): number => {
  switch (key) {
    case InputName.SearchValue:
      return WhenExpression.FocusSearchInput
    case InputName.ReplaceValue:
      return WhenExpression.FocusSearchReplaceInput
    case InputName.MatchCase:
      return WhenExpression.FocusSearchMatchCase
    case InputName.MatchWholeWord:
      return WhenExpression.FocusSearchWholeWord
    case InputName.UseRegularExpression:
      return WhenExpression.FocusSearchRegex
    case InputName.ReplaceAll:
      return WhenExpression.FocusSearchReplaceAll
    case InputName.PreserveCase:
      return WhenExpression.FocusSearchPreserveCase
    case InputName.ToggleSearchDetails:
      return WhenExpression.FocusToggleDetails
    case InputName.FilesToInclude:
      return WhenExpression.FocusSearchIncludeInput
    case InputName.FilesToExclude:
      return WhenExpression.FocusSearchExcludeInput
    case InputName.SearchOnlyOpenEditors:
      return WhenExpression.FocusSearchOpenEditors
    case InputName.UseExcludeSettings:
      return WhenExpression.FocusIgnoreFiles
    case InputName.ToggleReplace:
      return WhenExpression.FocusToggleReplace
    default:
      return WhenExpression.Empty
  }
}
