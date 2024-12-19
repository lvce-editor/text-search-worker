import type { SearchState } from '../SearchState/SearchState.ts'
import * as Arrays from '../Arrays/Arrays.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusNextPage = (state: SearchState): SearchState => {
  const { focusedIndex, items, maxLineY, minLineY } = state
  if (Arrays.isLastIndex(items, focusedIndex)) {
    return state
  }
  const indexNextPage = Math.min(maxLineY + (maxLineY - minLineY) - 2, Arrays.lastIndex(items))
  return focusIndex(state, indexNextPage)
}
