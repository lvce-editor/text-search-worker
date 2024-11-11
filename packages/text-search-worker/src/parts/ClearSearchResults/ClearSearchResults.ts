import type { SearchState } from '../SearchState/SearchState.ts'

export const clearSearchResults = (state: SearchState): SearchState => {
  return {
    ...state,
    value: '',
    items: [],
    minLineY: 0,
    maxLineY: 0,
    message: '',
  }
}
