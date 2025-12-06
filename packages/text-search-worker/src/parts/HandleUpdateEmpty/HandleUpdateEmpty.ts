import type { SearchState } from '../SearchState/SearchState.ts'

export const handleUpdateEmpty = (state: SearchState, update: Partial<SearchState>): SearchState => {
  const partialNewState = { ...state, ...update }
  return {
    ...partialNewState,
    deltaY: 0,
    items: [],
    listItems: [],
    loaded: true,
    matchCount: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    searchInputErrorMessage: '',
  }
}
