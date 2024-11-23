import * as GetPreviousFocus from '../GetPreviousFocus/GetPreviousFocus.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const focusPreviousInput = (state: SearchState): SearchState => {
  const previousFocus = GetPreviousFocus.getPreviousFocus(state.focus, state.flags)
  return {
    ...state,
    focus: previousFocus,
    focusSource: InputSource.Script,
  }
}
