import type { SearchState } from '../SearchState/SearchState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const focusSearchValue = (state: SearchState): SearchState => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
  }
}
