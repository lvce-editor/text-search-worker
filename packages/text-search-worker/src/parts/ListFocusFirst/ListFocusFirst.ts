import * as ListIndex from '../ListIndex/ListIndex.ts'
import { SearchState } from '../SearchState/SearchState.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusFirst = (state: SearchState) => {
  const firstIndex = ListIndex.first()
  return focusIndex(state, firstIndex)
}
