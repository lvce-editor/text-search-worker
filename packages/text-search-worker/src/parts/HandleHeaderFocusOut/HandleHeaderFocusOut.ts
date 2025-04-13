import type { SearchState } from '../SearchState/SearchState.ts'

export const handleHeaderFocusOut = (state: SearchState): SearchState => {
  if (!state.focus) {
    return state
  }
  return {
    ...state,
    focused: false,
    focus: 0,
  }
}
