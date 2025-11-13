import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const removeIndex = async (state: SearchState, searchResult: SearchResult, index: number): Promise<SearchState> => {
  // TODO
  return {
    ...state,
  }
}
