import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

// TODO just return name
export const getFocusSelector = (focusKey: number): string => {
  switch (focusKey) {
    case WhenExpression.FocusSearchInput:
      return '[name="search-value"]'
    case WhenExpression.FocusSearchReplaceInput:
      return '[name="search-replace-value"]'
    case WhenExpression.FocusToggleDetails:
      return '[title="Toggle Search Details"]'
    case WhenExpression.FocusSearchMatchCase:
      return '[title="Match Case"]'
    case WhenExpression.FocusSearchPreserveCase:
      return '[title="Preserve Case"]'
    case WhenExpression.FocusSearchRegex:
      return '[title="Use Regular Expression"]'
    case WhenExpression.FocusSearchIncludeInput:
      return '[name="files-to-include-value"]'
    case WhenExpression.FocusSearchExcludeInput:
      return '[name="files-to-exclude-value"]'
    case WhenExpression.FocusSearchWholeWord:
      return '[title="Match Whole Word"]'
    case WhenExpression.FocusSearchReplaceAll:
      return '[title="Replace All"]'
    case WhenExpression.FocusSearchOpenEditors:
      return '[title="Search Only Open Editors"]'
    case WhenExpression.FocusIgnoreFiles:
      return '[title="Use Exclude Settings"]'
    default:
      return ''
  }
}
