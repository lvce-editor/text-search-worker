import type { SearchState } from '../SearchState/SearchState.ts'

export const handleUpdateEmpty = (state: SearchState, update: Partial<SearchState>): SearchState => {
  const partialNewState = { ...state, ...update }
  return {
    ...partialNewState,
    minLineY: 0,
    maxLineY: 0,
    deltaY: 0,
    items: [],
    listItems: [],
    matchCount: 0,
    message: '',
    loaded: true,
    searchInputErrorMessage: '',
  }
}
