import type { SearchState } from '../SearchState/SearchState.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const focusMatchCase = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchMatchCase }
}
