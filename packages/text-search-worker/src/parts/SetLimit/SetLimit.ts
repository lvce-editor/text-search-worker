import type { SearchState } from '../SearchState/SearchState.ts'

export const setLimit = (state: SearchState, limit: number): SearchState => {
  // TODO update search results
  return {
    ...state,
    limit,
  }
}
