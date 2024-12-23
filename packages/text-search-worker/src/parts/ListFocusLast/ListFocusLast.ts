import type { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusLast = (state: SearchState): SearchState => {
  const { items } = state
  const lastIndex = ListIndex.last(items)
  return focusIndex(state, lastIndex)
}
