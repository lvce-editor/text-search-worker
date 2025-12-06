import type { SearchState } from '../SearchState/SearchState.ts'

export const handleHeaderFocusOut = (state: SearchState): SearchState => {
  if (!state.focus) {
    return state
  }
  return {
    ...state,
    focus: 0,
    focused: false,
  }
}
