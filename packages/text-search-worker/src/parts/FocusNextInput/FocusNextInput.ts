import * as GetNextFocus from '../GetNextFocus/GetNextFocus.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const focusNextInput = (state: SearchState): SearchState => {
  const nextFocus = GetNextFocus.getNextFocus(state.focus, state.flags)
  return {
    ...state,
    focus: nextFocus,
    focusSource: InputSource.Script,
  }
}
