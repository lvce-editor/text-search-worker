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
    default:
      return ''
  }
}
