import type { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusPreviousPage = (state: SearchState): SearchState => {
  const { focusedIndex, minLineY, maxLineY } = state
  if (focusedIndex === 0 || focusedIndex === -1) {
    return state
  }
  const indexPreviousPage = Math.max(minLineY - (maxLineY - minLineY) + 1, 0)
  return focusIndex(state, indexPreviousPage)
}
