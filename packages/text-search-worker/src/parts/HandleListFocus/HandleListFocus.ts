import type { SearchState } from '../SearchState/SearchState.ts'

export const handleListFocus = async (state: SearchState): Promise<SearchState> => {
  const { listFocused: isListFocused } = state
  if (isListFocused) {
    return state
  }
  return {
    ...state,
    listFocused: true,
  }
}
