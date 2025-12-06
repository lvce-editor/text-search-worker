import type { SearchState } from '../SearchState/SearchState.ts'

export const handleUpdateError = async (state: SearchState, update: Partial<SearchState>, error: any): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  return {
    ...partialNewState,
    fileCount: 0,
    items: [],
    listItems: [],
    matchCount: 0,
    maxLineY: 0,
    message: `${error}`,
    minLineY: 0,
  }
}
