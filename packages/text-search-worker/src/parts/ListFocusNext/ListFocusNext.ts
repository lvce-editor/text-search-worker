import * as ListIndex from '../ListIndex/ListIndex.ts'
import { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusNext = (state: SearchState): SearchState => {
  const { focusedIndex, items } = state
  const nextIndex = ListIndex.next(items, focusedIndex)
  return focusIndex(state, nextIndex)
}
