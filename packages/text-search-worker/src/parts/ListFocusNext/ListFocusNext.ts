import * as ListIndex from '../ListIndex/ListIndex.js'
import { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusNext = (state: SearchState) => {
  const { focusedIndex, items } = state
  const nextIndex = ListIndex.next(items, focusedIndex)
  return focusIndex(state, nextIndex)
}
