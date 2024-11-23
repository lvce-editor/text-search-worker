import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getSearchFocusKey = (key: string): number => {
  switch (key) {
    case 'search-value':
      return WhenExpression.FocusSearchInput
    case 'search-replace-value':
      return WhenExpression.FocusSearchReplaceInput
    case 'Match Case':
      return WhenExpression.FocusSearchMatchCase
    case 'Match Whole Word':
      return WhenExpression.FocusSearchWholeWord
    case 'Use Regular Expression':
      return WhenExpression.FocusSearchRegex
    case 'Replace All':
      return WhenExpression.FocusSearchReplaceAll
    case 'Preserve Case':
      return WhenExpression.FocusSearchPreserveCase
    case 'Toggle Search Details':
      return WhenExpression.FocusToggleDetails
    case 'files-to-include-value':
      return WhenExpression.FocusSearchIncludeInput
    case 'files-to-exclude-value':
      return WhenExpression.FocusSearchExcludeInput
    case 'Search Only Open Editors':
      return WhenExpression.FocusSearchOpenEditors
    case 'Use Exclude Settings':
      return WhenExpression.FocusIgnoreFiles
    default:
      return WhenExpression.Empty
  }
}
