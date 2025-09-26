import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetNextFocus from '../GetNextFocus/GetNextFocus.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const focusNextInput = (state: SearchState): SearchState => {
  const nextFocus = GetNextFocus.getNextFocus(state.focus, state.flags)
  const isListFocus = nextFocus === WhenExpression.FocusSearchResults
  return {
    ...state,
    focus: nextFocus,
    focusSource: InputSource.Script,
    listFocused: isListFocus,
  }
}
