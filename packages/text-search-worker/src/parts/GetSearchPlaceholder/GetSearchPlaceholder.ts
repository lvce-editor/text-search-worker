import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getSearchPlaceholder = (focus: number): string => {
  if (focus === WhenExpression.FocusSearchInput) {
    return SearchStrings.searchForHistory()
  }
  return SearchStrings.search()
}
