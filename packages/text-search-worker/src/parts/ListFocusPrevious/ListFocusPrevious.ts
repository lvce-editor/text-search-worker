import type { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusPrevious = (state: SearchState): SearchState => {
  const { focusedIndex, items } = state
  if (focusedIndex === 0 || focusedIndex === -1) {
    return state
  }
  const previousIndex = ListIndex.previous(items, focusedIndex)
  return focusIndex(state, previousIndex)
}
