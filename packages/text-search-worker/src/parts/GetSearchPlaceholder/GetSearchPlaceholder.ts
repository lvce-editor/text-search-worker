import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const getSearchPlaceholder = (focus: number): string => {
  if (focus === WhenExpression.FocusSearchInput) {
    return SearchStrings.searchForHistory()
  }
  return SearchStrings.search()
}
