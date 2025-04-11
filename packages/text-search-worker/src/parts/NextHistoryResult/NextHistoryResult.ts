import type { SearchState } from '../SearchState/SearchState.ts'

export const nextHistoryResult = async (state: SearchState): Promise<SearchState> => {
  return {
    ...state,
  }
}
