import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getReplacePlaceholder = (focus: number): string => {
  if (focus === WhenExpression.FocusSearchReplaceInput) {
    return SearchStrings.replaceForHistory()
  }
  return SearchStrings.replace()
}
