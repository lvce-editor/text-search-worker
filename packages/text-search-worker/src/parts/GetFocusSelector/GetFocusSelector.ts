import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

// TODO just return name
export const getFocusSelector = (focusKey: number): string => {
  switch (focusKey) {
    case WhenExpression.FocusSearchInput:
      return '[name="search-value"]'
    case WhenExpression.FocusSearchReplaceInput:
      return '[name="search-replace-value"]'
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
    default:
      return ''
  }
}
