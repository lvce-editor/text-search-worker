import type { SearchState } from '../SearchState/SearchState.ts'

export const handleListFocus = async (state: SearchState): Promise<SearchState> => {
  const { listFocused } = state

  console.log({ listFocused })
  if (listFocused) {
    return state
  }
  return {
    ...state,
    listFocused: true,
  }
}
