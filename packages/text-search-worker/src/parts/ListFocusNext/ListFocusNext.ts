import type { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusNext = (state: SearchState): SearchState => {
  const { focusedIndex, items } = state
  const nextIndex = ListIndex.next(items, focusedIndex)
  return focusIndex(state, nextIndex)
}
