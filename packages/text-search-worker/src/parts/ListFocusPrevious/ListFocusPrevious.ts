import * as ListIndex from '../ListIndex/ListIndex.ts'
import { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusPrevious = (state: SearchState): SearchState => {
  const { focusedIndex, items } = state
  if (focusedIndex === 0 || focusedIndex === -1) {
    return state
  }
  const previousIndex = ListIndex.previous(items, focusedIndex)
  return focusIndex(state, previousIndex)
}
