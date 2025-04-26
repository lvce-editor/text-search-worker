import type { SearchState } from '../SearchState/SearchState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const focusSearchValue = async (state: SearchState): Promise<SearchState> => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
  }
}
