import type { SearchState } from '../SearchState/SearchState.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const focusSearchValue = async (state: SearchState): Promise<SearchState> => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
  }
}
