import type { SearchState } from '../SearchState/SearchState.ts'

export const handleUpdateError = async (state: SearchState, update: Partial<SearchState>, error: any): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  return {
    ...partialNewState,
    message: `${error}`,
    items: [],
    listItems: [],
    matchCount: 0,
    fileCount: 0,
    minLineY: 0,
    maxLineY: 0,
  }
}
