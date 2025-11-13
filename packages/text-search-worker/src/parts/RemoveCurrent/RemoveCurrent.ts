import type { SearchState } from '../SearchState/SearchState.ts'

export const removeCurrent = async (state: SearchState): Promise<SearchState> => {
  // TODO
  // 1. get focused index
  // 2. if it is -1, do nothing
  // 3. get search result at focused index
  // 4. call removeIndex with state, searchResult, index
  return {
    ...state,
  }
}
