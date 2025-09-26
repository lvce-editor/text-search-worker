import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const getReplacePlaceholder = (focus: number): string => {
  if (focus === WhenExpression.FocusSearchReplaceInput) {
    return SearchStrings.replaceForHistory()
  }
  return SearchStrings.replace()
}
