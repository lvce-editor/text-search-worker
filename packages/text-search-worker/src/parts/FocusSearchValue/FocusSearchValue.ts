import type { SearchState } from '../SearchState/SearchState.ts'
import * as Focus from '../Focus/Focus.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const focusSearchValue = async (state: SearchState): Promise<SearchState> => {
  await Focus.setFocus(WhenExpression.FocusSearchInput)
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
  }
}
