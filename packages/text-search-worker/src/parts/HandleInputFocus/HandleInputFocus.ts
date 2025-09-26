import { WhenExpression } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleInputFocus = (state: SearchState): SearchState => {
  return {
    ...state,
    listFocused: false,
    focus: WhenExpression.FocusSearchInput,
    focused: true,
  }
}
