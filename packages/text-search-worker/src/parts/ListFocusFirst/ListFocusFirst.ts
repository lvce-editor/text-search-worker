import * as ListIndex from '../ListIndex/ListIndex.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusFirst = (state: SearchState):SearchState => {
  const firstIndex = ListIndex.first()
  return focusIndex(state, firstIndex)
}
