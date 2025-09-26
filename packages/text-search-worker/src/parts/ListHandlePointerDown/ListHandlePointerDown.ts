import type { SearchState } from '../SearchState/SearchState.ts'

export const handleListPointerDown = async (state: SearchState): Promise<SearchState> => {
  // TODO set list to focused and render focus outline
  return {
    ...state,
    listFocused: true,
  }
}
